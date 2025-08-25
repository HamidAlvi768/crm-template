import {
    Table,
    TableHeader as ShadcnTableHeader,
    TableRow as ShadcnTableRow,
    TableHead,
    TableBody,
    TableCell as ShadcnTableCell,
  } from "@/components/ui/table"
  
  export default function DataTable({ data, columns }) {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader columns={columns} />
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} row={row} columns={columns} />
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
  
  function TableHeader({ columns }) {
    return (
      <ShadcnTableHeader>
        <ShadcnTableRow>
          {columns.map((column) => (
            <TableHead key={String(column.key)}>{column.header}</TableHead>
          ))}
        </ShadcnTableRow>
      </ShadcnTableHeader>
    )
  }
  
  function TableRow({ row, columns }) {
    return (
      <ShadcnTableRow key={row.id}>
        {columns.map((column) => (
          <TableCell
            key={String(column.key)}
            value={row[column.key]}
            render={column.render}
          />
        ))}
      </ShadcnTableRow>
    )
  }
  
  function TableCell({ value, render }) {
    return (
      <ShadcnTableCell>
        {render ? render(value) : String(value)}
      </ShadcnTableCell>
    )
  }
  

  import DataTable from './components/DataTable'

function App() {
  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    {
      key: 'email',
      header: 'Email',
      render: (value) => (
        <a
          href={`mailto:${value}`}
          className="text-blue-600 hover:underline"
        >
          {value}
        </a>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (value) => (
        <span className="rounded-full bg-gray-100 px-2 py-1 text-sm">
          {value}
        </span>
      ),
    },
  ]

  const dummyData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Developer',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Designer',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Manager',
    },
  ]

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">
        Employee Table
      </h1>
      <DataTable data={dummyData} columns={columns} />
    </div>
  )
}

export default App
