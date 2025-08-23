import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { create } from 'zustand';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Zustand store for form state management
const useFormStore = create((set, get) => ({
  // Form data storage
  formData: {},
  
  // Actions
  updateFormData: (data) => set((state) => ({ 
    formData: { ...state.formData, ...data } 
  })),
  
  setFormData: (data) => set({ formData: data }),
  
  resetFormData: () => set({ formData: {} }),
  
  getFormData: () => get().formData,
  
  // Field-specific updates
  updateField: (fieldName, value) => set((state) => ({
    formData: { ...state.formData, [fieldName]: value }
  })),
  
  // Array field operations
  addArrayItem: (fieldName, item) => set((state) => ({
    formData: {
      ...state.formData,
      [fieldName]: [...(state.formData[fieldName] || []), item]
    }
  })),
  
  removeArrayItem: (fieldName, index) => set((state) => ({
    formData: {
      ...state.formData,
      [fieldName]: (state.formData[fieldName] || []).filter((_, i) => i !== index)
    }
  })),
  
  updateArrayItem: (fieldName, index, item) => set((state) => ({
    formData: {
      ...state.formData,
      [fieldName]: (state.formData[fieldName] || []).map((existingItem, i) => 
        i === index ? item : existingItem
      )
    }
  })),
}));

// Helper to render input fields based on type
const renderInput = (field, fieldConfig) => {
  if (fieldConfig.type === 'number') {
    return (
      <Input
        type="number"
        placeholder={`Enter ${fieldConfig.label.toLowerCase()}`}
        {...field}
        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
      />
    );
  }
  return <Input placeholder={`Enter ${fieldConfig.label.toLowerCase()}`} {...field} />;
};

// Build Zod schema from config
const buildZodSchema = (sections) => {
  const shape = {};
  sections.forEach(section => {
    section.fields.forEach(field => {
      if (field.type === 'array') {
        const itemShape = {};
        field.itemFields.forEach(subField => {
          itemShape[subField.name] = subField.validation || (subField.type === 'text' ? z.string() : z.number());
        });
        shape[field.name] = z.array(z.object(itemShape));
      } else {
        shape[field.name] = field.validation || (field.type === 'text' ? z.string() : z.number());
      }
    });
  });
  return z.object(shape);
};

// Compute default values
const computeDefaultValues = (sections) => {
  const defaults = {};
  const getDefault = (type) => (type === 'number' ? 0 : '');
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

// DynamicForm component with Zustand integration
function DynamicForm({ config }) {
  const { 
    formData, 
    updateFormData, 
    setFormData, 
    resetFormData,
    updateField,
    addArrayItem,
    removeArrayItem 
  } = useFormStore();

  const schema = buildZodSchema(config.sections);
  const defaultValues = computeDefaultValues(config.sections);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues, ...formData },
    mode: 'onChange',
  });

  // Watch form values and sync with Zustand store
  const watchedValues = form.watch();
  
  useEffect(() => {
    updateFormData(watchedValues);
  }, [watchedValues, updateFormData]);

  // Load existing form data on mount
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      form.reset({ ...defaultValues, ...formData });
    }
  }, []);

  const onSubmit = (values) => {
    console.log('Form submitted:', values);
    console.log('Zustand store data:', formData);
    // You could also clear the store after successful submission
    // resetFormData();
  };

  const handleReset = () => {
    resetFormData();
    form.reset(defaultValues);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Dynamic Form</h2>
        <div className="space-x-2">
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset Form
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => console.log('Current Zustand State:', formData)}
          >
            Log State
          </Button>
        </div>
      </div>

      <Form {...form}>
        <div onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {config.sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">{section.title}</h3>
              {section.fields.map((field) => {
                if (field.type === 'array') {
                  const { fields: arrayFields, append, remove } = useFieldArray({
                    control: form.control,
                    name: field.name,
                  });

                  const emptyItem = {};
                  field.itemFields.forEach(subField => {
                    emptyItem[subField.name] = subField.type === 'number' ? 0 : '';
                  });

                  return (
                    <div key={field.name} className="space-y-4">
                      <h4 className="font-medium text-gray-700">{field.label}</h4>
                      {arrayFields.map((item, index) => (
                        <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            {field.itemFields.map(subField => (
                              <FormField
                                key={subField.name}
                                control={form.control}
                                name={`${field.name}.${index}.${subField.name}`}
                                render={({ field: formField }) => (
                                  <FormItem className="flex-1">
                                    <FormLabel>{subField.label}</FormLabel>
                                    <FormControl>{renderInput(formField, subField)}</FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            ))}
                            <div className="flex items-end">
                              <Button 
                                type="button" 
                                variant="destructive" 
                                size="sm"
                                onClick={() => {
                                  remove(index);
                                  removeArrayItem(field.name, index);
                                }}
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
                        onClick={() => {
                          append(emptyItem);
                          addArrayItem(field.name, emptyItem);
                        }}
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
                        <FormItem>
                          <FormLabel>{field.label}</FormLabel>
                          <FormControl>{renderInput(formField, field)}</FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                }
              })}
            </div>
          ))}
          <div className="flex space-x-4">
            <Button type="submit" className="flex-1">
              Submit Form
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

// State Display Component
function StateDisplay() {
  const formData = useFormStore(state => state.formData);
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Current Zustand State:</h3>
      <pre className="text-xs overflow-x-auto bg-white p-2 rounded border">
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  );
}

// Example usage
export default function App() {
  const exampleConfig = {
    sections: [
      {
        title: 'Personal Information',
        fields: [
          { name: 'firstName', label: 'First Name', type: 'text', validation: z.string().min(1, 'Required') },
          { name: 'lastName', label: 'Last Name', type: 'text', validation: z.string().min(1, 'Required') },
          { name: 'email', label: 'Email', type: 'text', validation: z.string().email('Invalid email') },
          { name: 'age', label: 'Age', type: 'number', validation: z.number().min(0, 'Must be >= 0') },
        ],
      },
      {
        title: 'Friends',
        fields: [
          {
            name: 'friends',
            label: 'Friends',
            type: 'array',
            itemFields: [
              { name: 'name', label: 'Name', type: 'text', validation: z.string().min(1, 'Required') },
              { name: 'age', label: 'Age', type: 'number', validation: z.number().min(0, '>=0') },
            ],
          },
        ],
      },
      {
        title: 'Work Experience',
        fields: [
          {
            name: 'workExperience',
            label: 'Work Experience',
            type: 'array',
            itemFields: [
              { name: 'company', label: 'Company', type: 'text', validation: z.string().min(1, 'Required') },
              { name: 'position', label: 'Position', type: 'text', validation: z.string().min(1, 'Required') },
              { name: 'years', label: 'Years', type: 'number', validation: z.number().min(0, '>=0') },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Dynamic Form with Zustand</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <DynamicForm config={exampleConfig} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <StateDisplay />
          </div>
        </div>
      </div>
    </div>
  );
}