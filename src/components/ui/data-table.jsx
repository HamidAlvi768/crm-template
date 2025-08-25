import React from 'react'
import {
  Table,
  TableHeader as ShadcnTableHeader,
  TableRow as ShadcnTableRow,
  TableHead,
  TableBody,
  TableCell as ShadcnTableCell,
} from './table'

/**
 * Reusable DataTable component built on top of shadcn table components
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of data objects to display
 * @param {Array} props.columns - Array of column configurations
 * @param {string} props.className - Additional CSS classes for the table wrapper
 * @param {boolean} props.striped - Whether to apply striped row styling
 * @param {boolean} props.hover - Whether to apply hover effects on rows
 * @param {Function} props.onRowClick - Callback function when a row is clicked
 * @param {string} props.emptyMessage - Message to display when no data is available
 */
export default function DataTable({ 
  data, 
  columns, 
  className = "",
  striped = false,
  hover = true,
  onRowClick,
  emptyMessage = "No data available"
}) {
  if (!data || data.length === 0) {
    return (
      <div className={`text-center py-8 text-muted-foreground ${className}`}>
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <Table>
        <TableHeader columns={columns} />
        <TableBody>
          {data.map((row, index) => (
            <TableRow 
              key={row.id || index} 
              row={row} 
              columns={columns}
              index={index}
              striped={striped}
              hover={hover}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/**
 * Table header component that renders column headers
 */
function TableHeader({ columns }) {
  return (
    <ShadcnTableHeader>
      <ShadcnTableRow>
        {columns.map((column) => (
          <TableHead 
            key={String(column.key)}
            className={column.headerClassName}
          >
            {column.header}
          </TableHead>
        ))}
      </ShadcnTableRow>
    </ShadcnTableHeader>
  )
}

/**
 * Table row component that renders individual data rows
 */
function TableRow({ row, columns, index, striped, hover, onClick }) {
  const rowClasses = [
    hover && "hover:bg-muted/50 cursor-pointer",
    striped && index % 2 === 1 && "bg-muted/30",
    onClick && "cursor-pointer"
  ].filter(Boolean).join(" ")

  return (
    <ShadcnTableRow 
      className={rowClasses}
      onClick={onClick}
    >
      {columns.map((column) => (
        <TableCell
          key={String(column.key)}
          value={row[column.key]}
          render={column.render}
          className={column.cellClassName}
          row={row}
        />
      ))}
    </ShadcnTableRow>
  )
}

  /**
   * Table cell component that renders individual cell values
   */
  function TableCell({ value, render, className = "", row }) {
    return (
      <ShadcnTableCell className={className}>
        {render ? render(value, row) : (value !== null && value !== undefined ? String(value) : '—')}
      </ShadcnTableCell>
    )
  }

/**
 * Column configuration type definition (for reference)
 * 
 * @typedef {Object} ColumnConfig
 * @property {string} key - The data key to access from the row object
 * @property {string} header - The display text for the column header
 * @property {Function} [render] - Optional custom render function for the cell value
 * @property {string} [headerClassName] - Optional CSS classes for the header cell
 * @property {string} [cellClassName] - Optional CSS classes for the data cell
 * @property {number} [width] - Optional width for the column
 * @property {boolean} [sortable] - Whether the column is sortable
 * @property {string} [align] - Text alignment: 'left', 'center', 'right'
 */
