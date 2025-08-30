import React, { useState } from 'react'
import { AppLayout, PageLayout } from '@/components/layout'
import { DynamicForm } from '@/components/forms/dynamic-form'
import { formConfigs } from '@/lib/form-configs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { 
  UsersIcon, 
  BuildingIcon, 
  TrendingUpIcon,
  UserPlusIcon
} from 'lucide-react'

function FormsDemoPage() {
  const [formData, setFormData] = useState({})

  const handleFormSubmit = (entityType, data) => {
    setFormData(prev => ({ ...prev, [entityType]: data }))
    toast.success(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} form submitted successfully!`)
    console.log(`${entityType} data:`, data)
  }

  const handleFormReset = (entityType) => {
    setFormData(prev => {
      const newData = { ...prev }
      delete newData[entityType]
      return newData
    })
    toast.info(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} form has been reset`)
  }

  const entityConfigs = [
    {
      key: 'customer',
      label: 'Customer',
      icon: UsersIcon,
      description: 'Add new customers with personal and company information',
      config: formConfigs.customer
    },
    {
      key: 'company',
      label: 'Company',
      icon: BuildingIcon,
      description: 'Create company profiles with industry and metrics',
      config: formConfigs.company
    },
    {
      key: 'deal',
      label: 'Deal',
      icon: TrendingUpIcon,
      description: 'Track sales opportunities and deal progress',
      config: formConfigs.deal
    },
    {
      key: 'lead',
      label: 'Lead',
      icon: UserPlusIcon,
      description: 'Manage potential customers and lead sources',
      config: formConfigs.lead
    }
  ]

  return (
    <AppLayout>
      <PageLayout
        title="Dynamic Forms Demo"
        description="Experience the power of configurable forms for different CRM entities"
      >
        <div className="space-y-6">
          {/* Forms Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Entity Forms</CardTitle>
              <CardDescription>
                Select an entity type to see its dynamic form in action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="customer" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  {entityConfigs.map((entity) => (
                    <TabsTrigger key={entity.key} value={entity.key} className="flex items-center gap-2">
                      <entity.icon className="size-4" />
                      {entity.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {entityConfigs.map((entity) => (
                  <TabsContent key={entity.key} value={entity.key} className="mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{entity.label} Form</h3>
                          <p className="text-sm text-muted-foreground">{entity.description}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFormReset(entity.key)}
                        >
                          Reset Form
                        </Button>
                      </div>
                      
                      <DynamicForm
                        config={entity.config}
                        onSubmit={(data) => handleFormSubmit(entity.key, data)}
                        submitLabel={`Add ${entity.label}`}
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Submitted Data Display */}
          {Object.keys(formData).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Submitted Form Data</CardTitle>
                <CardDescription>
                  View the data submitted from each form
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={Object.keys(formData)[0]} className="w-full">
                  <TabsList>
                    {Object.keys(formData).map((key) => (
                      <TabsTrigger key={key} value={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {Object.keys(formData).map((key) => (
                    <TabsContent key={key} value={key} className="mt-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">{key.charAt(0).toUpperCase() + key.slice(1)} Data:</h4>
                        <pre className="text-sm overflow-x-auto bg-background p-3 rounded border">
                          {JSON.stringify(formData[key], null, 2)}
                        </pre>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </PageLayout>
    </AppLayout>
  )
}

export default FormsDemoPage
