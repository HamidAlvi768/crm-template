import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Helper to render input fields based on type
const renderInput = (field, fieldConfig) => {
  switch (fieldConfig.type) {
    case "number":
      return (
        <Input
          type="number"
          placeholder={`Enter ${fieldConfig.label.toLowerCase()}`}
          {...field}
          onChange={(e) =>
            field.onChange(e.target.value ? Number(e.target.value) : undefined)
          }
        />
      );
    case "email":
      return <Input type="email" placeholder={`Enter ${fieldConfig.label.toLowerCase()}`} {...field} />;
    case "password":
      return <Input type="password" placeholder={`Enter ${fieldConfig.label.toLowerCase()}`} {...field} />;
    case "phone":
      return <Input type="tel" placeholder={`Enter ${fieldConfig.label.toLowerCase()}`} {...field} />;
    case "url":
      return <Input type="url" placeholder={`Enter ${fieldConfig.label.toLowerCase()}`} {...field} />;
    case "textarea":
      return <Textarea placeholder={`Enter ${fieldConfig.label.toLowerCase()}`} {...field} />;
    case "select":
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${fieldConfig.label.toLowerCase()}`} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {fieldConfig.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "radio":
      return (
        <div className="space-y-2">
          {fieldConfig.options?.map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
              <input
                type="radio"
                value={option.value}
                checked={field.value === option.value}
                onChange={() => field.onChange(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      );
    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          <span className="text-sm text-muted-foreground">{fieldConfig.label}</span>
        </div>
      );
    case "switch":
      return <Checkbox checked={field.value} onCheckedChange={field.onChange} />;
    case "color":
      return <Input type="color" {...field} />;
    case "search":
      return <Input type="search" {...field} />;
    case "week":
      return <Input type="week" {...field} />;
    case "month":
      return <Input type="month" {...field} />;
    case "time":
      return <Input type="time" {...field} />;
    case "datetime-local":
      return <Input type="datetime-local" {...field} />;
    case "file":
      return <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} />;
    case "hidden":
      return <Input type="hidden" {...field} />;
    default:
      return <Input placeholder={`Enter ${fieldConfig.label.toLowerCase()}`} {...field} />;
  }
};

// Build Zod schema from config
const buildZodSchema = (sections) => {
  const shape = {};
  sections.forEach((section) => {
    section.fields.forEach((field) => {
      if (field.type === "array") {
        const itemShape = {};
        field.itemFields.forEach((subField) => {
          if (subField.validation) {
            itemShape[subField.name] = subField.validation;
          } else {
            switch (subField.type) {
              case "text":
              case "password":
              case "date":
              case "email":
              case "phone":
              case "url":
              case "textarea":
              case "color":
              case "hidden":
              case "search":
              case "week":
              case "month":
              case "time":
              case "datetime-local":
                itemShape[subField.name] = z.string().min(1, "Required");
                break;
              case "number":
              case "range":
                itemShape[subField.name] = z.number().min(0, "Must be >= 0");
                break;
              case "select":
              case "radio":
                itemShape[subField.name] = z.string().min(1, "Required");
                break;
              case "checkbox":
              case "switch":
                itemShape[subField.name] = z.boolean();
                break;
              case "file":
                itemShape[subField.name] = z
                  .any()
                  .refine((file) => file instanceof File || Array.isArray(file), {
                    message: "File is required",
                  });
                break;
              default:
                itemShape[subField.name] = z.string().optional();
            }
          }
        });
        shape[field.name] = z.array(z.object(itemShape));
      } else {
        if (field.validation) {
          shape[field.name] = field.validation;
        } else {
          switch (field.type) {
            case "text":
            case "password":
            case "date":
            case "email":
            case "phone":
            case "url":
            case "textarea":
            case "color":
            case "hidden":
            case "search":
            case "week":
            case "month":
            case "time":
            case "datetime-local":
              shape[field.name] = z.string().min(1, "Required");
              break;
            case "number":
            case "range":
              shape[field.name] = z
                .number({ invalid_type_error: "Must be a number" })
                .min(0, "Must be >= 0");
              break;
            case "select":
            case "radio":
              shape[field.name] = z.string().min(1, "Required");
              break;
            case "checkbox":
            case "switch":
              shape[field.name] = z.boolean();
              break;
            case "file":
              shape[field.name] = z
                .any()
                .refine((file) => file instanceof File || Array.isArray(file), {
                  message: "File is required",
                });
              break;
            default:
              shape[field.name] = z.string().optional();
          }
        }
      }
    });
  });
  return z.object(shape);
};

// Compute default values
const computeDefaultValues = (sections) => {
  const defaults = {};
  const getDefault = (type) => {
    switch (type) {
      case "number":
      case "range":
        return 0;
      case "checkbox":
      case "switch":
        return false;
      case "file":
        return null;
      case "select":
      case "radio":
      case "color":
      case "date":
      case "time":
      case "datetime-local":
      case "month":
      case "week":
      case "search":
      case "email":
      case "phone":
      case "url":
      case "textarea":
      case "text":
      case "password":
      case "hidden":
        return "";
      default:
        return "";
    }
  };

  sections.forEach((section) => {
    section.fields.forEach((field) => {
      if (field.type === "array") {
        const emptyItem = {};
        field.itemFields.forEach((subField) => {
          emptyItem[subField.name] = getDefault(subField.type);
        });
        defaults[field.name] = [emptyItem];
      } else {
        defaults[field.name] = getDefault(field.type);
      }
    });
  });
  return defaults;
};

// DynamicForm component
function DynamicForm({
  config,
  onSubmit,
  onCancel,
  initialData = null,
  submitLabel = "Submit",
  showActions = true,
}) {
  const schema = buildZodSchema(config.sections??config);
  const defaultValues = computeDefaultValues(config.sections);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData
      ? { ...defaultValues, ...initialData }
      : defaultValues,
    mode: "onSubmit",
  });

  const handleSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      console.log("Form submitted:", values);
      toast.success("Form submitted successfully!");
    }
  };

  return (
    <div className={cn("space-y-6", config.className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={cn("space-y-8", config.formClassName)}
        >
          {/* Main Form Card Container */}
          <div className="bg-card rounded-lg border border-border p-6">
            {/* Form Sections */}
            {config.sections.map((section) => (
              <div
                key={section.title}
                className={cn("space-y-4", section.className)}
              >
                <h3
                  className={cn(
                    "text-lg font-semibold border-b pb-2 text-foreground",
                    section.titleClassName
                  )}
                >
                  {section.title}
                </h3>
                <div
                  className={cn("space-y-4", section.fieldsContainerClassName)}
                >
                {section.fields.map((field) => {
                    if (field.type === "array") {
                      const {
                        fields: arrayFields,
                        append,
                        remove,
                      } = useFieldArray({
                      control: form.control,
                      name: field.name,
                    });

                    const emptyItem = {};
                      field.itemFields.forEach((subField) => {
                        emptyItem[subField.name] = computeDefaultValues([
                          { fields: [subField] },
                        ])[subField.name];
                    });

                    return (
                        <div
                          key={field.name}
                          className={cn("space-y-4", field.className)}
                        >
                          <h4
                            className={cn(
                              "font-medium text-foreground",
                              field.labelClassName
                            )}
                          >
                            {field.label}
                          </h4>
                        {arrayFields.map((item, index) => (
                            <div
                              key={item.id}
                              className={cn(
                                "border border-border rounded-lg p-4 bg-muted/30",
                                field.itemClassName
                              )}
                            >
                              <div
                                className={cn(
                                  "flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0",
                                  field.itemContainerClassName
                                )}
                              >
                                {field.itemFields.map((subField) => (
                                <FormField
                                  key={subField.name}
                                  control={form.control}
                                  name={`${field.name}.${index}.${subField.name}`}
                                  render={({ field: formField }) => (
                                      <FormItem
                                        className={cn(
                                          "flex-1",
                                          subField.itemClassName
                                        )}>
                                        {subField.type !== 'checkbox' && (
                                          <FormLabel className={subField.labelClassName}>
                                            {subField.label}
                                          </FormLabel>
                                        )}
                                        <FormControl className={subField.controlClassName}>
                                          {renderInput(formField, subField)}
                                        </FormControl>
                                        <FormMessage className={subField.messageClassName} />
                                    </FormItem>
                                  )}
                                />
                              ))}
                                <div
                                  className={cn(
                                    "flex items-end",
                                    field.removeButtonContainerClassName
                                  )}
                                >
                                <Button 
                                  type="button" 
                                  variant="destructive" 
                                  size="sm"
                                    className={field.removeButtonClassName}
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button 
                          type="button" 
                          variant="outline"
                            className={field.addButtonClassName}
                          onClick={() => append(emptyItem)}
                        >
                          Add {field.label.slice(0, -1)}
                        </Button>
                      </div>
                    );
                  } else {
                    return (
                      <FormField
                        key={field.name}
                        control={form.control}
                        name={field.name}
                        render={({ field: formField }) => (
                            <FormItem className={field.itemClassName}>
                              {field.type !== 'checkbox' && (
                                <FormLabel className={field.labelClassName}>
                                  {field.label}
                                </FormLabel>
                              )}
                              <FormControl className={field.controlClassName}>
                                {renderInput(formField, field)}
                              </FormControl>
                              <FormMessage className={field.messageClassName} />
                          </FormItem>
                        )}
                      />
                    );
                  }
                })}
                </div>
              </div>
            ))}
            
            {/* Custom Actions - Show if provided in config */}
            {config.customActions && (
              <div className="mb-4">
                {config.customActions}
              </div>
            )}
            
            {/* Form Actions - Only show if showActions is true */}
            {showActions && (
              <div
                className={cn(
                  "flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
                  config.actionsClassName
                )}
              >
                {onCancel && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className={config.cancelButtonClassName}
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                )}
                <Button 
                  type="submit" 
                  className={config.submitButtonClassName}
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Submitting..." : submitLabel}
                </Button>
              </div>
            )}
            
            {/* Custom Footer - Show if provided in config */}
            {config.footer && (
              <div className="mt-4">
                {config.footer}
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

export { DynamicForm, buildZodSchema, computeDefaultValues };
