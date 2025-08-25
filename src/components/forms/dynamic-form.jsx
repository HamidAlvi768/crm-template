import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

/**
 * DynamicForm Component with CSS Class Support
 * 
 * This component supports extensive CSS class customization through the config object.
 * 
 * CONFIG CLASS OPTIONS:
 * 
 * Form Level:
 * - className: Main form container classes
 * - formClassName: Form element classes
 * - actionsClassName: Form actions container classes
 * - submitButtonClassName: Submit button classes
 * - resetButtonClassName: Reset button classes
 * - cancelButtonClassName: Cancel button classes
 * 
 * Section Level:
 * - className: Section container classes
 * - titleClassName: Section title classes
 * - fieldsContainerClassName: Fields wrapper classes (useful for grid layouts)
 * 
 * Field Level:
 * - itemClassName: FormItem wrapper classes
 * - labelClassName: FormLabel classes
 * - controlClassName: FormControl classes
 * - messageClassName: FormMessage classes
 * 
 * Array Field Level:
 * - className: Array field container classes
 * - labelClassName: Array field label classes
 * - itemClassName: Individual array item classes
 * - itemContainerClassName: Array item content container classes
 * - removeButtonClassName: Remove button classes
 * - removeButtonContainerClassName: Remove button wrapper classes
 * - addButtonClassName: Add button classes
 * 
 * Array Item Sub-Fields:
 * - itemClassName: Sub-field FormItem classes
 * - labelClassName: Sub-field FormLabel classes
 * - controlClassName: Sub-field FormControl classes
 * - messageClassName: Sub-field FormMessage classes
 * 
 * EXAMPLE USAGE:
 * ```js
 * const config = {
 *   className: "max-w-4xl mx-auto",
 *   sections: [{
 *     title: "Personal Info",
 *     className: "bg-card p-6 rounded-lg",
 *     fieldsContainerClassName: "grid grid-cols-2 gap-4",
 *     fields: [{
 *       name: "firstName",
 *       itemClassName: "col-span-1",
 *       labelClassName: "font-bold"
 *     }]
 *   }]
 * };
 * ```
 */

// Helper to render input fields based on type
const renderInput = (field, fieldConfig) => {
  switch (fieldConfig.type) {
    case 'number':
      return (
        <Input
          type="number"
          placeholder={`Enter ${fieldConfig.label.toLowerCase()}`}
          {...field}
          onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
        />
      );
    case 'email':
      return (
        <Input
          type="email"
          placeholder={`Enter ${fieldConfig.label.toLowerCase()}`}
          {...field}
        />
      );
    case 'phone':
      return (
        <Input
          type="tel"
          placeholder={`Enter ${fieldConfig.label.toLowerCase()}`}
          {...field}
        />
      );
    case 'url':
      return (
        <Input
          type="url"
          placeholder={`Enter ${fieldConfig.label.toLowerCase()}`}
          {...field}
        />
      );
    case 'textarea':
      return (
        <Textarea
          placeholder={`Enter ${fieldConfig.label.toLowerCase()}`}
          {...field}
        />
      );
    case 'select':
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
    case 'checkbox':
      return (
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      );
    default:
      return (
        <Input
          placeholder={`Enter ${fieldConfig.label.toLowerCase()}`}
          {...field}
        />
      );
  }
};

// Build Zod schema from config
const buildZodSchema = (sections) => {
  const shape = {};
  sections.forEach(section => {
    section.fields.forEach(field => {
      if (field.type === 'array') {
        const itemShape = {};
        field.itemFields.forEach(subField => {
          if (subField.validation) {
            itemShape[subField.name] = subField.validation;
          } else {
            switch (subField.type) {
              case 'text':
              case 'email':
              case 'phone':
              case 'url':
              case 'textarea':
                itemShape[subField.name] = z.string().min(1, 'Required');
                break;
              case 'number':
                itemShape[subField.name] = z.number().min(0, 'Must be >= 0');
                break;
              case 'select':
                itemShape[subField.name] = z.string().min(1, 'Required');
                break;
              case 'checkbox':
                itemShape[subField.name] = z.boolean();
                break;
              default:
                itemShape[subField.name] = z.string();
            }
          }
        });
        shape[field.name] = z.array(z.object(itemShape));
      } else {
        if (field.validation) {
          shape[field.name] = field.validation;
        } else {
          switch (field.type) {
            case 'text':
            case 'email':
            case 'phone':
            case 'url':
            case 'textarea':
              shape[field.name] = z.string().min(1, 'Required');
              break;
            case 'number':
              shape[field.name] = z.number().min(0, 'Must be >= 0');
              break;
            case 'select':
              shape[field.name] = z.string().min(1, 'Required');
              break;
            case 'checkbox':
              shape[field.name] = z.boolean();
              break;
            default:
              shape[field.name] = z.string();
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
      case 'number':
        return 0;
      case 'checkbox':
        return false;
      case 'select':
        return '';
      default:
        return '';
    }
  };
  
  sections.forEach(section => {
    section.fields.forEach(field => {
      if (field.type === 'array') {
        const emptyItem = {};
        field.itemFields.forEach(subField => {
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
function DynamicForm({ config, onSubmit, onCancel, initialData = null, submitLabel = "Submit" }) {
  const schema = buildZodSchema(config.sections);
  const defaultValues = computeDefaultValues(config.sections);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData ? { ...defaultValues, ...initialData } : defaultValues,
    mode: 'onChange',
  });

  const handleSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      console.log('Form submitted:', values);
      toast.success('Form submitted successfully!');
    }
  };

  const handleReset = () => {
    form.reset(defaultValues);
    toast.info('Form has been reset');
  };

  return (
    <div className={cn("space-y-6", config.className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className={cn("space-y-8", config.formClassName)}>
          {config.sections.map((section) => (
            <div key={section.title} className={cn("space-y-4", section.className)}>
              <h3 className={cn("text-lg font-semibold border-b pb-2 text-foreground", section.titleClassName)}>
                {section.title}
              </h3>
              <div className={cn("space-y-4", section.fieldsContainerClassName)}>
                {section.fields.map((field) => {
                if (field.type === 'array') {
                  const { fields: arrayFields, append, remove } = useFieldArray({
                    control: form.control,
                    name: field.name,
                  });

                  const emptyItem = {};
                  field.itemFields.forEach(subField => {
                    emptyItem[subField.name] = subField.type === 'number' ? 0 : 
                                             subField.type === 'checkbox' ? false : '';
                  });

                  return (
                    <div key={field.name} className={cn("space-y-4", field.className)}>
                      <h4 className={cn("font-medium text-foreground", field.labelClassName)}>{field.label}</h4>
                      {arrayFields.map((item, index) => (
                        <div key={item.id} className={cn("border border-border rounded-lg p-4 bg-muted/30", field.itemClassName)}>
                          <div className={cn("flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0", field.itemContainerClassName)}>
                            {field.itemFields.map(subField => (
                              <FormField
                                key={subField.name}
                                control={form.control}
                                name={`${field.name}.${index}.${subField.name}`}
                                render={({ field: formField }) => (
                                  <FormItem className={cn("flex-1", subField.itemClassName)}>
                                    <FormLabel className={subField.labelClassName}>{subField.label}</FormLabel>
                                    <FormControl className={subField.controlClassName}>{renderInput(formField, subField)}</FormControl>
                                    <FormMessage className={subField.messageClassName} />
                                  </FormItem>
                                )}
                              />
                            ))}
                            <div className={cn("flex items-end", field.removeButtonContainerClassName)}>
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
                          <FormLabel className={field.labelClassName}>{field.label}</FormLabel>
                          <FormControl className={field.controlClassName}>{renderInput(formField, field)}</FormControl>
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
          
          {/* Form Actions */}
          <div className={cn("flex flex-col-reverse gap-3 sm:flex-row sm:justify-end", config.actionsClassName)}>
            <Button 
              type="button" 
              variant="outline" 
              className={config.resetButtonClassName}
              onClick={handleReset}
            >
              Reset Form
            </Button>
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
              {form.formState.isSubmitting ? 'Submitting...' : submitLabel}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export { DynamicForm, buildZodSchema, computeDefaultValues };
