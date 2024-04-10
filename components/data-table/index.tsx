"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableToolbar } from "@/components/data-table/toolbar";
import TableEmptyState from "@/components/empty-states/table.empty.state";
import TableSkeleton from "@/components/skeletons/table.skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    duplicateRow: (rowIndex: number) => void;
    removeRow: (rowIndex: number) => void;
    getRowData: (rowIndex: number) => TData;
    addRow: (row: TData) => void;
    addEmptyRow: () => void;
    getData: () => TData[];
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  setData?: React.Dispatch<React.SetStateAction<TData[]>>;
  toolbarProps?: Omit<
    React.ComponentProps<typeof DataTableToolbar<TData>>,
    "table"
  >;
}

function useSkipper() {
  const shouldSkipRef = React.useRef(true);

  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  toolbarProps,
  setData,
  loading,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    autoResetPageIndex,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData?.((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }

            return row;
          })
        );
      },
      duplicateRow: (rowIndex) => {
        skipAutoResetPageIndex();
        setData?.((old) => {
          const newRow = { ...old[rowIndex]! };

          return [...old.slice(0, rowIndex), newRow, ...old.slice(rowIndex)];
        });
      },
      removeRow: (rowIndex) => {
        skipAutoResetPageIndex();
        setData?.((old) => [
          ...old.slice(0, rowIndex),
          ...old.slice(rowIndex + 1),
        ]);
      },
      getRowData: (rowIndex) => data[rowIndex],
      addRow: (row) => {
        skipAutoResetPageIndex();
        setData?.((old) => [...old, row]);
      },
      addEmptyRow: () => {
        skipAutoResetPageIndex();
        setData?.((old) => [
          ...old,
          Object.fromEntries(columns.map((column) => [column.id, ""])),
        ]);
      },
      getData: () => data,
    },
  });

  const columnsLength = columns.length;

  const showSections = data.length > 0 && !loading;

  return (
    <div className="space-y-4 border rounded-md p-2 shadow-md relative">
      {loading && (
        <div className="w-full absolute inset-0 z-50 bg-white/50 overflow-hidden">
          <TableSkeleton gridTemplateColumns={columnsLength} />
        </div>
      )}
      <DataTableToolbar table={table} {...toolbarProps} />
      <div className="rounded-md border">
        <Table>
          {showSections && (
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead colSpan={header.colSpan} key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
          )}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="hover:bg-gray-100 transition-colors h-8"
                  data-state={row.getIsSelected() && "selected"}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <TableEmptyState />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showSections && <DataTablePagination table={table} />}
    </div>
  );
}
