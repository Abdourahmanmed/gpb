"use client";

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  typeName: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  typeName,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const path = usePathname();
  const hasFilters = columnFilters.some(
    (filter) => filter.value?.toString().trim() !== ""
  );

  return (
    <ScrollArea className="h-full max-w-[80%]">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-white w-full h-max rounded-lg shadow-blue p-2">
        {/* Filtres dynamiques selon le type */}
        {path &&
          (path.includes("Agent_guiche") ||
            path.includes("Agent_commercial")) && (
            <div className="w-full flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              {[{ placeholder: "Filtrer par Nom...", column: typeName }]
                .concat(
                  path === "/Agent_guiche/Rechercher"
                    ? [
                      { placeholder: "Filtrer par Etat...", column: "Etat" },
                      {
                        placeholder: "Filtrer par sous couvert...",
                        column: "sous_couvert",
                      },
                    ]
                    : []
                )
                .map(({ placeholder, column }) => (
                  <Input
                    key={column}
                    placeholder={placeholder}
                    value={
                      (table.getColumn(column)?.getFilterValue() as string) ??
                      ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn(column)
                        ?.setFilterValue(event.target.value)
                    }
                    className="w-full sm:max-w-sm focus:ring-2 focus:ring-blue text-blue"
                  />
                ))}
            </div>
          )}
      </div>

      {/* Ajout d'un conteneur avec scroll horizontal sur mobile */}
      {hasFilters && (
        <div className="rounded-md bg-white w-full h-max shadow-blue mt-3">
          <div className="w-full min-w-[600px]">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="border-b border-blue"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="border-b border-blue text-blue"
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
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Aucun résultat.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
