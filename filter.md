To add filtering to an existing data table component, you'll need to update your `<DataTable>` component to manage filter state and render an input field for filtering.

Here's a step-by-step guide based on the provided sources:

1.  **Update `<DataTable>` Component (`app/payments/data-table.tsx`)**
    You need to import `ColumnFiltersState`, `getFilteredRowModel`, and `Input` from your components. Then, introduce a state for `columnFilters` and update the `useReactTable` hook to include filter-related properties.

    ```tsx
    "use client"
    import * as React from "react"
    import {
      ColumnDef,
      ColumnFiltersState, // Import ColumnFiltersState
      flexRender,
      getCoreRowModel,
      getFilteredRowModel, // Import getFilteredRowModel
      getPaginationRowModel,
      getSortedRowModel,
      SortingState,
      useReactTable,
    } from "@tanstack/react-table"
    import { Button } from "@/components/ui/button" // Assuming Button is already imported for pagination/sorting
    import { Input } from "@/components/ui/input" // Import Input component

    import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from "@/components/ui/table"

    interface DataTableProps<TData, TValue> {
      columns: ColumnDef<TData, TValue>[]
      data: TData[]
    }

    export function DataTable<TData, TValue>({
      columns,
      data,
    }: DataTableProps<TData, TValue>) {
      const [sorting, setSorting] = React.useState<SortingState>([])
      // Initialize columnFilters state
      const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

      const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        // Add filter-related properties
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(), // Add this to enable filtering
        state: {
          sorting,
          columnFilters, // Include columnFilters in the table state
        },
      })

      return (
        <div>
          {/* Add a div for the filter input */}
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter emails..."
              // Get current filter value for the "email" column
              value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
              // Set filter value for the "email" column on change
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <div className="overflow-hidden rounded-md border">
            <Table> {/* ... existing table structure ... */} </Table>
          </div>
          {/* ... existing pagination controls ... */}
        </div>
      )
    }
    ```
    This code snippet demonstrates enabling filtering for the `email` column specifically. You can extend this logic to other columns as needed.

2.  **Explanation of Changes:**
    *   **`ColumnFiltersState` and `setColumnFilters`**: A new state variable `columnFilters` is introduced to manage the filter state of all columns. The `setColumnFilters` function is used to update this state.
    *   **`getFilteredRowModel()`**: This function is passed to `useReactTable` to enable the filtering functionality provided by TanStack Table.
    *   **`onColumnFiltersChange: setColumnFilters`**: This links the table's internal filter state changes to your React state.
    *   **`Input` Component**: An `<Input>` component is added to your UI.
        *   Its `value` prop is bound to the current filter value of the "email" column using `table.getColumn("email")?.getFilterValue()`.
        *   Its `onChange` prop updates the filter value for the "email" column using `table.getColumn("email")?.setFilterValue(event.target.value)`.

After implementing these changes, a search input will appear, allowing users to filter the table rows based on the "email" column. The source notes that filtering is automatically enabled for the `email` column with these changes, and you can add filters to other columns as well.