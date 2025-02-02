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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserSchema } from "@/Schema/schema";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Importer les styles de react-toastify

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  typeName: string;
}

export function NoFilterDataTable<TData, TValue>({
  columns,
  data,
  typeName,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pageSize, setPageSize] = useState(10);

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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      Nom: '',
      Email: '',
      Password: '',
      Telephone: '',
      Adresse: '',
      role: '',
    },
  });

  //fonction pour editer les informations du compagne
  const onEditSubmit = async (values: z.infer<typeof EditUserSchema>) => {
    const api = `http://localhost/gbp_backend/api.php?method=CreateUser`;
    try {
      const response = await fetch(api, {
        method: "POST",
        body: JSON.stringify(values)
      })

      if (!response.ok) {
        console.log("erreur de l'execution de l'api");
      }

      const responseData = await response.json();
      if (responseData.error) {
        toast.error(responseData.error);
        setIsEditDialogOpen(false);
      }

      if (responseData.success) {
        toast.success(responseData.success);
        setIsEditDialogOpen(false);
        form.reset();
      }

    } catch (error) {
      console.log('erreur de ', error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-8 bg-white w-full h-max rounded-lg shadow-blue p-2">
        <ToastContainer />
        <Input
          placeholder="filtre par nom"
          value={(table.getColumn(typeName)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(typeName)?.setFilterValue(event.target.value)}
          className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
        />
        {/* c'est uniquement pour les pages superviser du depot resiliation et tous les abonnes */}
        {path &&
          ['/Superviseur/Depot_de_resiliation', '/Superviseur/Les_Abonnes'].some((route) => path.includes(route)) && (
            <div className="w-full flex items-center gap-8">
              {[
                { placeholder: "Filtrer par Nom...", column: typeName },
                { placeholder: "Filtrer par Etat...", column: "Etat" },
                { placeholder: "Filtrer par type boite postal...", column: "Type_boite_postale" },
              ].map(({ placeholder, column }) => (
                <Input
                  key={column}
                  placeholder={placeholder}
                  value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
                  onChange={(event) => table.getColumn(column)?.setFilterValue(event.target.value)}
                  className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
                />
              ))}
            </div>
          )}

        {/* c'est uniquement la page superviseur du gestion agent */}
        {path && path === '/Superviseur/Les_Agents' && (
          <Input
            placeholder="filtre par nom"
            value={(table.getColumn(typeName)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(typeName)?.setFilterValue(event.target.value)}
            className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
          />
        )}
        {path && path === '/Superviseur/Liste_Boite_Postal' && (
          <Input
            placeholder="filtre par nom"
            value={(table.getColumn(typeName)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(typeName)?.setFilterValue(event.target.value)}
            className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
          />
        )}
        {path && path === '/Responsable_commerciale/Creation_des_utilisateur' && (
          <>
            <button
              className="w-full bg-blue-700 text-white hover:bg-blue-500 duration-500 rounded-lg p-1"
              onClick={() => setIsEditDialogOpen(true)}
            >
              Ajouter
            </button>
            {/* Edit dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-blue text-2xl mb-1 ml-[15%]">Ajouter un utilisateur</DialogTitle>
                  <DialogDescription >
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onEditSubmit)} className="w-full max-w-xs mx-auto">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="Nom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue">Nom</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="example:fatouma" type="text" disabled={isPending} className="text-blue font-bold" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="Email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue">Email</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="fatouma@example.com" type="email" disabled={isPending} className="text-blue font-bold" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="Password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue">Password</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="***********" type="password" disabled={isPending} className="text-blue font-bold" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="Telephone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue">Telephone</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="example:77101010" type="text" disabled={isPending} className="text-blue font-bold" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="Adresse"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue">Adresse</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="example:quartier 1" type="text" disabled={isPending} className="text-blue font-bold" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue">Adresse</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value) => field.onChange(value)}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Choisissez une méthode" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="supersiveur">supersiveur</SelectItem>
                                  <SelectItem value="agent_commerciale">agent commerciale</SelectItem>
                                  <SelectItem value="agent_guichets">agent guichets</SelectItem>
                                  <SelectItem value="agent_comptable">agent comptable</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" className="w-full mt-2 bg-blue-700 text-white" disabled={isPending}>Enregistrer</Button>
                  </form>

                </Form>
              </DialogContent>
            </Dialog>
          </>
        )}



        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto bg-primary text-white hover:bg-blue-600 duration-500">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Affichage du tableau uniquement si un filtre est appliqué */}
      <div className="rounded-md bg-white w-full h-max shadow-blue mt-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-blue">
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
        {/* paginations */}
        <div className="flex items-center justify-end space-x-2 py-4 px-4">
          {/* rows per page selector */}
          <div className="flex items-center space-x-2">
            <label htmlFor="rows-per-page" className="text-sm">
              Rows per page:
            </label>
            <select
              id="rows-per-page"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border rounded-md p-1"
            >
              {[10, 20, 30, 40, 50, 100, 500, 1000].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          {/* show selected row  */}
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

    </>
  );
}
