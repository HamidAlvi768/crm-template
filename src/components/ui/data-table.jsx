import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader as ShadcnTableHeader,
  TableRow as ShadcnTableRow,
  TableHead,
  TableBody,
  TableCell as ShadcnTableCell,
} from "./table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "./pagination";
import { Input } from "./input";
import { Button } from "./button";

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
 * @param {number} props.itemsPerPage - Number of items to show per page (default: 10)
 * @param {boolean} props.showPagination - Whether to show pagination controls (default: true)
 * @param {Array} props.filterableColumns - Array of column keys that should have filter inputs (default: ['email'])
 */
export default function DataTable({ 
  data, 
  columns, 
  className = "",
  striped = false,
  hover = true,
  onRowClick,
  emptyMessage = "No data available",
  itemsPerPage = 10,
  showPagination = true,
  filterableColumns = ["email"],
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [columnFilters, setColumnFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});

  // Apply filters to data
  const filteredData = useMemo(() => {
    if (!data || Object.keys(appliedFilters).length === 0) {
      return data;
    }

    return data.filter((row) => {
      return Object.entries(appliedFilters).every(
        ([columnKey, filterValue]) => {
          if (!filterValue || filterValue.trim() === "") return true;

          const cellValue = row[columnKey];
          if (cellValue === null || cellValue === undefined) return false;

          return String(cellValue)
            .toLowerCase()
            .includes(filterValue.toLowerCase().trim());
        }
      );
    });
  }, [data, appliedFilters]);

  // Calculate pagination based on filtered data
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData?.slice(startIndex, endIndex) || [];

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters]);

  // Reset to first page if current page is out of bounds
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (columnKey, value) => {
    setColumnFilters((prev) => ({
      ...prev,
      [columnKey]: value,
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(columnFilters);
  };

  const handleClearFilters = () => {
    setColumnFilters({});
    setAppliedFilters({});
  };

  const renderFilters = () => {
    if (!filterableColumns || filterableColumns.length === 0) return null;

    // Check if any filter has text
    const hasFilterText = Object.values(columnFilters).some(
      (value) => value && value.trim() !== ""
    );

    return (
      <div className="space-y-4 py-4">
        <div className="flex gap-4">
          {filterableColumns.map((columnKey) => {
            const column = columns.find((col) => col.key === columnKey);
            if (!column) return null;

            return (
              <div key={columnKey} className="flex flex-col space-y-2 flex-1">
                <label className="text-sm font-medium text-foreground">
                  Filter {column.header || columnKey}
                </label>
                <Input
                  placeholder={`Filter ${column.header || columnKey}...`}
                  value={columnFilters[columnKey] || ""}
                  onChange={(event) =>
                    handleFilterChange(columnKey, event.target.value)
                  }
                  className="w-full"
                />
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 justify-end">
          {hasFilterText && (
            <Button onClick={handleClearFilters} variant="outline">
              Clear Filters
            </Button>
          )}
          <Button
            onClick={handleApplyFilters}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    );
  };

  const renderPagination = () => {
    if (!showPagination || totalPages <= 1) return null;

    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, "...");
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push("...", totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    return (
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {getVisiblePages().map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(page)}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className={`${className}`}>
        {renderFilters()}
        <div className="text-center py-8 text-muted-foreground">
          {Object.keys(appliedFilters).length > 0 &&
          Object.values(appliedFilters).some((v) => v && v.trim() !== "")
            ? "No results match your filters. Try adjusting your search criteria."
            : emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {renderFilters()}

      <div className="overflow-x-auto">
      <Table>
        <TableHeader columns={columns} />
        <TableBody>
            {currentData.map((row, index) => (
            <TableRow 
              key={row.id || index} 
              row={row} 
              columns={columns}
                index={startIndex + index}
              striped={striped}
              hover={hover}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            />
          ))}
        </TableBody>
      </Table>
    </div>

      {renderPagination()}

      {showPagination && totalPages > 1 && (
        <div className="text-sm text-muted-foreground text-center mt-2">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)}{" "}
          of {filteredData.length} results
          {Object.keys(appliedFilters).length > 0 &&
            Object.values(appliedFilters).some((v) => v && v.trim() !== "") && (
              <span className="block text-xs mt-1">
                (filtered from {data.length} total items)
              </span>
            )}
        </div>
      )}
    </div>
  );
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
  );
}

/**
 * Table row component that renders individual data rows
 */
function TableRow({ row, columns, index, striped, hover, onClick }) {
  const rowClasses = [
    hover && "hover:bg-muted/50 cursor-pointer",
    striped && index % 2 === 1 && "bg-muted/30",
    onClick && "cursor-pointer",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ShadcnTableRow className={rowClasses} onClick={onClick}>
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
  );
}

  /**
   * Table cell component that renders individual cell values
   */
  function TableCell({ value, render, className = "", row }) {
    return (
      <ShadcnTableCell className={className}>
      {render
        ? render(value, row)
        : value !== null && value !== undefined
        ? String(value)
        : "—"}
      </ShadcnTableCell>
  );
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
