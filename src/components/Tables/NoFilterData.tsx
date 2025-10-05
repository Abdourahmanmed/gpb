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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserSchema } from "@/Schema/schema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importer les styles de react-toastify
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Store/store";
import { addUserSuccess } from "@/Store/Slices/CrudUserManagement";
import * as XLSX from "xlsx"; // Importer la librairie SheetJS
import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  typeName: string;
}

// Exemple de type pour les données de la ligne
interface RowData {
  id: number;
  // autres propriétés ici si nécessaire
}

interface DocumentData {
  Abonnement: string;
  Identite: string;
  Patent_Quitance: string;
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
  const [pageSize, setPageSize] = useState(10); // Nombre de lignes par page
  const [pageIndex, setPageIndex] = useState(0); // Ajout de pageIndex dans l'état

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
      pagination: {
        pageSize,
        pageIndex, // Utilisation de pageIndex depuis l'état
      },
    },
  });

  const path = usePathname();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDocsDialogOpen, setIsDocsDialogOpen] = useState(false);
  const [isPending] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [documents, setDocuments] = useState<DocumentData | null>(null);
  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      Nom: "",
      Email: "",
      Password: "",
      Telephone: "",
      Adresse: "",
      role: "",
    },
  });

  //fonction pour ajouter les informations d'un agents
  const onEditSubmit = async (values: z.infer<typeof EditUserSchema>) => {
    const api = `http://192.168.0.12/gbp_backend/api.php?method=CreateAgentsByResponsable`;
    try {
      const response = await fetch(api, {
        method: "POST",
        body: JSON.stringify(values),
      });
      console.log(values);

      if (!response.ok) {
        console.log("erreur de l'execution de l'api");
      }

      const responseData = await response.json();
      if (responseData.error) {
        toast.error(responseData.error);
        setIsEditDialogOpen(false);
      }

      if (responseData.success) {
        dispatch(
          addUserSuccess({
            id: crypto.randomUUID(), // 🔥 Générer un ID unique
            Nom: values.Nom,
            Email: values.Email,
            Telephone: values.Telephone,
            Adresse: values.Adresse,
            password: values.Password, // 🔥 Mettre la bonne casse
            Role: values.role, // 🔥 Mettre la bonne casse
          })
        );

        toast.success(responseData.success);
        // setIsEditDialogOpen(false);
        form.reset();
      }
    } catch (error) {
      console.log("erreur de ", error);
    }
  };

  // Fonction d'exportation des données en Excel
  const exportToExcel = () => {
    const exportData = table.getRowModel().rows.map((row) =>
      row.getVisibleCells().reduce((acc, cell) => {
        acc[cell.column.id] = cell.getContext().getValue();
        return acc;
      }, {} as { [key: string]: any })
    );

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, "Raport");
    XLSX.writeFile(wb, "Raport.xlsx");
  };
  // Fonction d'exportation des données en PDF
  // Fonction d'exportation des données en PDF
  // Fonction d'exportation des données en PDF
  const exportToPDF = () => {
    // Récupérer uniquement les colonnes visibles et valides
    const visibleColumns = table.getAllColumns().filter(
      (col) =>
        col.getIsVisible() &&
        col.id !== "select" &&
        col.id.toLowerCase() !== "facture" &&
        col.id.toLowerCase() !== "reçue" // ou "recu" selon ton id exact
    );

    // Construire les headers
    const headers = visibleColumns.map((col) =>
      typeof col.columnDef.header === "string" ? col.columnDef.header : col.id
    );

    // Construire les lignes
    const rows = table.getRowModel().rows.map((row: any) =>
      visibleColumns.map((col) => {
        const cell = row.getAllCells().find((c: any) => c.column.id === col.id);
        return cell ? String(cell.getValue() ?? "") : "";
      })
    );

    // Création du document en mode paysage
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    // Titre
    doc.setFontSize(16);
    doc.text("Rapport des données", 40, 40);

    // Génération du tableau
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 60,
      theme: "grid",
      tableWidth: "auto",
      headStyles: {
        fillColor: [22, 160, 133],
        halign: "center",
      },
      styles: {
        fontSize: 8,
        cellPadding: 4,
        overflow: "linebreak",
      },
      didDrawPage: (data: any) => {
        const pageNumber = doc.internal.getNumberOfPages?.() || 1;
        doc.setFontSize(8);
        doc.text(
          `Page ${pageNumber}`,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      },
    });

    doc.save("Rapport.pdf");
  };

  // Fonction pour récupérer l'ID des lignes sélectionnées
  const getSelectedRowIds = (): number[] => {
    return table
      .getRowModel()
      .rows.filter(
        (row, index) => rowSelection[index as keyof typeof rowSelection]
      )
      .map((row) => (row.original as RowData).id);
  };

  const AfficherDocument = async () => {
    const selectedRowIds = getSelectedRowIds();
    if (selectedRowIds.length === 0) return;

    const clientId = selectedRowIds[0]; // on prend le premier client sélectionné
    const apiUrl = `http://192.168.0.12/gbp_backend/api.php?method=AfficherDocument&Id=${clientId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Erreur lors de l'exécution de la requête.");
        return;
      }

      const responseData = await response.json();

      if (responseData.error) {
        console.error(responseData.error);
      } else {
        setDocuments(responseData[0]); // car c'est un tableau avec un objet
        setIsDocsDialogOpen(true);
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <ScrollArea className="h-full w-[98%] rounded">
      <div className="flex items-center gap-8 bg-white w-full h-max rounded-lg shadow-blue p-2">
        {/* <ToastContainer /> */}
        {/* c'est uniqument pour les agents guichets  */}
        {path &&
          [
            "/Agent_guiche/Recaputilations/Ajoute_client",
            "/Agent_guiche/Recaputilations/Changer_nom",
            "/Agent_guiche/Recaputilations/Achat_cle",
            "/Agent_guiche/Recaputilations/Ajout_sous_couverte",
            "/Agent_guiche/Recaputilations/Ajout_livraison",
            "/Agent_guiche/Recaputilations/Ajout_collection",
          ].includes(path) && (
            <>
              <Input
                placeholder="Filtrer par N. Boîte postale"
                value={
                  table
                    .getColumn("boite_postal_numero")
                    ?.getFilterValue()
                    ?.toString() ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("boite_postal_numero")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
              <Input
                placeholder="Filtrer par statut d'abonnement"
                value={
                  table
                    .getColumn("abonnement_status")
                    ?.getFilterValue()
                    ?.toString() ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("abonnement_status")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
              <Input
                placeholder="Filtrer par nom"
                value={
                  table.getColumn(typeName)?.getFilterValue()?.toString() ?? ""
                }
                onChange={(event) =>
                  table.getColumn(typeName)?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
            </>
          )}

        {/* c'est uniquement pour les agents commercials  */}
        {path &&
          [
            "/Agent_commercial/Les_abonnes",
            "/Agent_commercial/Resiliation",
          ].includes(path) && (
            <>
              <Input
                placeholder="Filtrer par N. Boîte postale"
                value={
                  table
                    .getColumn("boite_postal_numero")
                    ?.getFilterValue()
                    ?.toString() ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("boite_postal_numero")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
              <Input
                placeholder="Filtrer par statut d'abonnement"
                value={
                  table
                    .getColumn("abonnement_status")
                    ?.getFilterValue()
                    ?.toString() ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("abonnement_status")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
              <Input
                placeholder="Filtrer par nom"
                value={
                  table.getColumn(typeName)?.getFilterValue()?.toString() ?? ""
                }
                onChange={(event) =>
                  table.getColumn(typeName)?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
            </>
          )}

        {path &&
          [
            "/Agent_commercial/Recaputilation/Rapport/Redevance",
            "/Agent_commercial/Recaputilation/Rapport/Changer_nom",
            "/Agent_commercial/Recaputilation/Rapport/Achat_cle",
            "/Agent_commercial/Recaputilation/Rapport/Sous_couverte",
            "/Agent_commercial/Recaputilation/Rapport/Livraison",
            "/Agent_commercial/Recaputilation/Rapport/Collection",
          ].includes(path) && (
            <>
              <Input
                placeholder="Filtrer par N. Boîte postale"
                value={
                  table
                    .getColumn("boite_postal_numero")
                    ?.getFilterValue()
                    ?.toString() ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("boite_postal_numero")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
              <Input
                placeholder="Filtrer par statut d'abonnement"
                value={
                  table
                    .getColumn("abonnement_status")
                    ?.getFilterValue()
                    ?.toString() ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("abonnement_status")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
              <Input
                placeholder="Filtrer par nom"
                value={
                  table.getColumn(typeName)?.getFilterValue()?.toString() ?? ""
                }
                onChange={(event) =>
                  table.getColumn(typeName)?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
              <Input
                placeholder="filtre par nom"
                value={
                  (table.getColumn(typeName)?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn(typeName)?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
              <Input
                placeholder="Filtrer par jour (YYYY-MM-DD)"
                onChange={(e) =>
                  table.getColumn("Date_payement")?.setFilterValue({
                    type: "day",
                    value: e.target.value,
                  })
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
              <Select
                onValueChange={(val) =>
                  table.getColumn("Date_payement")?.setFilterValue({
                    type: "month",
                    value: val,
                  })
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Mois" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Janvier",
                    "Février",
                    "Mars",
                    "Avril",
                    "Mai",
                    "Juin",
                    "Juillet",
                    "Août",
                    "Septembre",
                    "Octobre",
                    "Novembre",
                    "Décembre",
                  ].map((mois, index) => (
                    <SelectItem
                      key={index}
                      value={String(index + 1).padStart(2, "0")}
                    >
                      {mois}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(val) =>
                  table.getColumn("Date_payement")?.setFilterValue({
                    type: "year",
                    value: val,
                  })
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Année" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(
                    { length: 10 },
                    (_, i) => new Date().getFullYear() - i
                  ).map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="bg-primary" onClick={exportToExcel}>
                Exportation en excel
              </Button>
              <Button className="bg-primary" onClick={exportToPDF}>
                Exportation en pdf
              </Button>
            </>
          )}
        {path &&
          path === "/Agent_commercial/Recaputilation/Rapport/Resilier" && (
            <>
              <Input
                placeholder="filtre par numero boite postale"
                value={
                  (table.getColumn("Numero")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("Numero")?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
              <Input
                placeholder="filtre par nom"
                value={
                  (table.getColumn(typeName)?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn(typeName)?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
              <Input
                placeholder="Filtrer par jour (YYYY-MM-DD)"
                onChange={(e) =>
                  table.getColumn("Date_resilier")?.setFilterValue({
                    type: "day",
                    value: e.target.value,
                  })
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
              <Select
                onValueChange={(val) =>
                  table.getColumn("Date_resilier")?.setFilterValue({
                    type: "month",
                    value: val,
                  })
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Mois" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Janvier",
                    "Février",
                    "Mars",
                    "Avril",
                    "Mai",
                    "Juin",
                    "Juillet",
                    "Août",
                    "Septembre",
                    "Octobre",
                    "Novembre",
                    "Décembre",
                  ].map((mois, index) => (
                    <SelectItem
                      key={index}
                      value={String(index + 1).padStart(2, "0")}
                    >
                      {mois}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(val) =>
                  table.getColumn("Date_resilier")?.setFilterValue({
                    type: "year",
                    value: val,
                  })
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Année" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(
                    { length: 10 },
                    (_, i) => new Date().getFullYear() - i
                  ).map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="bg-primary" onClick={exportToExcel}>
                Exportation en excel
              </Button>
              <Button className="bg-primary" onClick={exportToPDF}>
                Exportation en pdf
              </Button>
            </>
          )}

        {/* c'est uniquement la page superviseur du gestion agent */}
        {path && path === "/Superviseur/Les_Agents" && (
          <>
            <Input
              placeholder="filtre par nom"
              value={
                (table.getColumn(typeName)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(typeName)?.setFilterValue(event.target.value)
              }
              className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
            />
            <Input
              placeholder="filtre par Telephone"
              value={
                (table.getColumn("Telephone")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("Telephone")?.setFilterValue(event.target.value)
              }
              className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
            />
            <Input
              placeholder="filtre par Role"
              value={
                (table.getColumn("Role")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("Role")?.setFilterValue(event.target.value)
              }
              className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
            />
          </>
        )}
        {path && path === "/Superviseur/Les_Abonnes" && (
          <>
            <Input
              placeholder="Filtrer par N. Boîte postale"
              value={
                table
                  .getColumn("boite_postal_numero")
                  ?.getFilterValue()
                  ?.toString() ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("boite_postal_numero")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
            />
            <Input
              placeholder="Filtrer par statut d'abonnement"
              value={
                table
                  .getColumn("abonnement_status")
                  ?.getFilterValue()
                  ?.toString() ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("abonnement_status")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
            />
            <Input
              placeholder="Filtrer par nom"
              value={
                table.getColumn(typeName)?.getFilterValue()?.toString() ?? ""
              }
              onChange={(event) =>
                table.getColumn(typeName)?.setFilterValue(event.target.value)
              }
              className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
            />
            {/* bouton pour voir les documents il faut mettre a condition qu'un ligne est selectionner*/}

            <button
              className="w-full bg-blue-700 text-white hover:bg-blue-500 duration-500 rounded-lg p-1"
              onClick={() => {
                AfficherDocument(); // exécute ta fonction
              }}
            >
              Voir les documents
            </button>
            {/* Document dialog */}
            <Dialog open={isDocsDialogOpen} onOpenChange={setIsDocsDialogOpen}>
              <DialogContent className="bg-white max-h-[90vh] overflow-y-auto">
                <ToastContainer />
                <DialogHeader>
                  <DialogTitle className="text-blue text-2xl mb-1 text-center">
                    Les documents du client
                  </DialogTitle>
                  <DialogDescription />
                </DialogHeader>

                {documents ? (
                  <div className="space-y-6">
                    {[
                      { label: "Abonnement", file: documents.Abonnement },
                      { label: "Identité", file: documents.Identite },
                      {
                        label: "Patente / Quittance",
                        file: documents.Patent_Quitance,
                      },
                    ].map(({ label, file }, index) => {
                      const fileUrl = `http://192.168.0.15/gbp_backend/${file}`;
                      const isPDF = file.toLowerCase().endsWith(".pdf");

                      return (
                        <div key={index}>
                          <p className="font-semibold">{label} :</p>
                          {isPDF ? (
                            <iframe
                              src={fileUrl}
                              title={label}
                              className="w-full h-[500px] border rounded"
                            />
                          ) : (
                            <img
                              src={fileUrl}
                              alt={label}
                              className="w-full max-w-md border rounded"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center">
                    Chargement ou aucun document trouvé.
                  </p>
                )}
              </DialogContent>
            </Dialog>
          </>
        )}
        {path &&
          (path === "/Superviseur/Liste_Boite_Postal" ||
            path === "/Agent_commercial/Liste_Boite_postal") && (
            <>
              <Input
                placeholder="filtre par Numero"
                value={
                  (table.getColumn(typeName)?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn(typeName)?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
              <Input
                placeholder="filtre par type"
                value={
                  (table.getColumn("Type")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("Type")?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
            </>
          )}

        {path && path === "/Superviseur/Notifications" && (
          <>
            <Input
              placeholder="filtre par Nom agents"
              value={
                (table.getColumn(typeName)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(typeName)?.setFilterValue(event.target.value)
              }
              className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
            />
          </>
        )}

        {/* c'est uniquement pour les responsable */}
        {path &&
          path === "/Responsable_commerciale/Creation_des_utilisateur" && (
            <>
              <button
                className="w-full bg-blue-700 text-white hover:bg-blue-500 duration-500 rounded-lg p-1"
                onClick={() => setIsEditDialogOpen(true)}
              >
                Ajouter
              </button>
              {/* Edit dialog */}
              <Dialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
              >
                <DialogContent className="bg-white">
                  <ToastContainer />
                  <DialogHeader>
                    <DialogTitle className="text-blue text-2xl mb-1 ml-[15%]">
                      Ajouter un utilisateur
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onEditSubmit)}
                      className="w-full max-w-xs mx-auto"
                    >
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="Nom"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue">Nom</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="example:fatouma"
                                  type="text"
                                  disabled={isPending}
                                  className="text-blue font-bold"
                                />
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
                                <Input
                                  {...field}
                                  placeholder="fatouma@example.com"
                                  type="email"
                                  disabled={isPending}
                                  className="text-blue font-bold"
                                />
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
                              <FormLabel className="text-blue">
                                Password
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="***********"
                                  type="password"
                                  disabled={isPending}
                                  className="text-blue font-bold"
                                />
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
                              <FormLabel className="text-blue">
                                Telephone
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="example:77101010"
                                  type="text"
                                  disabled={isPending}
                                  className="text-blue font-bold"
                                />
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
                              <FormLabel className="text-blue">
                                Adresse
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="example:quartier 1"
                                  type="text"
                                  disabled={isPending}
                                  className="text-blue font-bold"
                                />
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
                              <FormLabel className="text-blue">
                                Adresse
                              </FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(value)
                                  }
                                  value={field.value}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choisissez une méthode" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="superviseur">
                                      supersiveur
                                    </SelectItem>
                                    <SelectItem value="agent_commercial">
                                      agent commerciale
                                    </SelectItem>
                                    <SelectItem value="agent_guichet">
                                      agent guichets
                                    </SelectItem>
                                    <SelectItem value="agent_comptable">
                                      agent comptable
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full mt-2 bg-blue-700 text-white"
                        disabled={isPending}
                      >
                        Enregistrer
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </>
          )}
        {path &&
          [
            "/Responsable_commerciale/Enleve_les_penalites",
            "/Responsable_commerciale/Recaputilations/Redevance",
            "/Responsable_commerciale/Recaputilations/Changer_nom",
            "/Responsable_commerciale/Recaputilations/Achat_cle",
            "/Responsable_commerciale/Recaputilations/Sous_couverte",
            "/Responsable_commerciale/Recaputilations/Livraison",
            "/Responsable_commerciale/Recaputilations/Collection",
            "/Responsable_commerciale/Les_Abonnes",
            "/Responsable_commerciale/Exonorer",
            "/Responsable_commerciale/Compte_Resilier",
            "/Responsable_commerciale/Compte_Exonorer",
          ].includes(path) && (
            <>
              <Input
                placeholder="Filtrer par N. Boîte postale"
                value={
                  table
                    .getColumn("boite_postal_numero")
                    ?.getFilterValue()
                    ?.toString() ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("boite_postal_numero")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
              <Input
                placeholder="Filtrer par statut d'abonnement"
                value={
                  table
                    .getColumn("abonnement_status")
                    ?.getFilterValue()
                    ?.toString() ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("abonnement_status")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />
              <Input
                placeholder="Filtrer par nom"
                value={
                  table.getColumn(typeName)?.getFilterValue()?.toString() ?? ""
                }
                onChange={(event) =>
                  table.getColumn(typeName)?.setFilterValue(event.target.value)
                }
                className="max-w-sm focus:ring-2 focus:ring-blue text-blue"
              />

              <Button className="bg-primary" onClick={exportToExcel}>
                Exportation en excel
              </Button>
              <Button className="bg-primary" onClick={exportToPDF}>
                Exportation en pdf
              </Button>
              <button
                className="w-full bg-blue-700 text-white hover:bg-blue-500 duration-500 rounded-lg p-1"
                onClick={() => {
                  AfficherDocument(); // exécute ta fonction
                }}
              >
                Voir les documents
              </button>
              {/* Document dialog */}
              <Dialog
                open={isDocsDialogOpen}
                onOpenChange={setIsDocsDialogOpen}
              >
                <DialogContent className="bg-white max-h-[90vh] overflow-y-auto">
                  <ToastContainer />
                  <DialogHeader>
                    <DialogTitle className="text-blue text-2xl mb-1 text-center">
                      Les documents du client
                    </DialogTitle>
                    <DialogDescription />
                  </DialogHeader>

                  {documents ? (
                    <div className="space-y-6">
                      {[
                        { label: "Abonnement", file: documents.Abonnement },
                        { label: "Identité", file: documents.Identite },
                        {
                          label: "Patente / Quittance",
                          file: documents.Patent_Quitance,
                        },
                      ].map(({ label, file }, index) => {
                        const fileUrl = `http://192.168.0.15/gbp_backend/${file}`;
                        const isPDF = file.toLowerCase().endsWith(".pdf");

                        return (
                          <div key={index}>
                            <p className="font-semibold">{label} :</p>
                            {isPDF ? (
                              <iframe
                                src={fileUrl}
                                title={label}
                                className="w-full h-[500px] border rounded"
                              />
                            ) : (
                              <img
                                src={fileUrl}
                                alt={label}
                                className="w-full max-w-md border rounded"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-center">
                      Chargement ou aucun document trouvé.
                    </p>
                  )}
                </DialogContent>
              </Dialog>
            </>
          )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto bg-primary text-white hover:bg-blue-600 duration-500">
              Triage
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
                );
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
        <div className="flex items-center justify-end space-x-2 py-4">
          {/* Sélecteur de lignes par page */}
          <div className="flex items-center space-x-2">
            <label htmlFor="rows-per-page" className="text-sm">
              Lignes par page :
            </label>
            <select
              id="rows-per-page"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[10, 20, 30, 40, 50, 100, 500, 1000, 2000, 6000, 10000].map(
                (size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Nombre de lignes sélectionnées */}
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} sur{" "}
            {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s).
          </div>

          {/* Pagination */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Page précédente"
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Page suivante"
          >
            Suivant
          </Button>
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
