"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Charts
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

// ================= TYPES =================

type PaiementRaw = {
  numero_recu?: string;
  nom_client?: string;
  numero_boite_postale?: string;
  Methode_paiement?: string;
  Wallet?: string | null;
  Numero_wallet?: string | null;
  Numero_cheque?: string | null;
  Nom_bank?: string | null;
  montant_redevance?: string | number | null;
  Penalite?: string | number | null;
  annee?: string | number | null;
  categorie_service?: string | null;
  montant_service?: string | number | null;
  montant_timbre?: string | number | null;
  date_paiement?: string | null;
};

type ApiResponse = {
  paiements: PaiementRaw[];
  total_redevance?: number | string | null;
  total_timbre?: number | string | null;
  total_services?: { Categories: string; total_par_categorie: number }[];
};

type Row = {
  id: string;
  numero_recu: string;
  nom_client: string;
  numero_boite_postale: string;
  methode_paiement: string;
  type: "redevance" | "service" | "timbre";
  categorie?: string | null;
  montant: number;
  montant_timbre?: number;
  date_paiement?: string | null;
};

const API_BASE = "http://192.168.0.12/gbp_backend/api.php?method=";

// ================= COMPONENT =================

export default function ReportTable() {
  const [filterType, setFilterType] = useState<
    "journalier" | "mensuel" | "annuel" | "single" | "range"
  >("journalier");
  const [singleDate, setSingleDate] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<Row[]>([]);

  // impression
  const printAreaRef = useRef<HTMLDivElement>(null);
  const [PrintJS, setPrintJS] = useState<any>(null);
  const [showPrintBlock, setShowPrintBlock] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("print-js").then((m) => setPrintJS(() => m.default));
    }
  }, []);

  const handleImprint = () => {
    if (!PrintJS || !printAreaRef.current) return;

    setShowPrintBlock(true);
    setTimeout(() => {
      PrintJS({
        printable: printAreaRef.current,
        type: "html",
        targetStyles: ["*"],
      });

      setTimeout(() => setShowPrintBlock(false), 300);
    }, 50);
  };

  // Pagination / tri / recherche
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState<
    "date_paiement" | "montant" | "nom_client"
  >("date_paiement");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");

  const [totalRedevance, setTotalRedevance] = useState(0);
  const [totalTimbre, setTotalTimbre] = useState(0);
  const [totalServicesByCat, setTotalServicesByCat] = useState<
    { category: string; total: number }[]
  >([]);

  function buildUrl() {
    switch (filterType) {
      case "journalier":
        return `${API_BASE}getJournalierReport`;
      case "mensuel":
        return `${API_BASE}getMensuelReport`;
      case "annuel":
        return `${API_BASE}getAnnuelReport`;
      case "single":
        return `${API_BASE}getReportBySingleDate&Date=${encodeURIComponent(
          singleDate
        )}`;
      case "range":
        return `${API_BASE}getReportByDateRange&debut=${encodeURIComponent(
          dateStart
        )}&fin=${encodeURIComponent(dateEnd)}`;
    }
  }

  async function fetchReport() {
    setError(null);
    setLoading(true);
    setRows([]);
    setTotalRedevance(0);
    setTotalTimbre(0);
    setTotalServicesByCat([]);

    try {
      const res = await fetch(buildUrl()!, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: ApiResponse = await res.json();

      const normalized: Row[] = [];

      json.paiements?.forEach((p) => {
        const base = {
          numero_recu: p.numero_recu ?? "-",
          nom_client: p.nom_client ?? "-",
          numero_boite_postale: p.numero_boite_postale ?? "-",
          methode_paiement: p.Methode_paiement ?? "-",
          date_paiement: p.date_paiement ?? null,
        };

        const montant = Number(p.montant_redevance ?? 0);
        const penalite = Number(p.Penalite ?? 0);
        const totalR = montant + penalite;

        if (totalR > 0) {
          normalized.push({
            id: nanoid(),
            ...base,
            type: "redevance",
            montant: totalR,
          });
        }

        const service = Number(p.montant_service ?? 0);
        if (service > 0) {
          normalized.push({
            id: nanoid(),
            ...base,
            type: "service",
            montant: service,
            categorie: p.categorie_service ?? null,
          });
        }

        const timbre = Number(p.montant_timbre ?? 0);
        if (timbre > 0) {
          normalized.push({
            id: nanoid(),
            ...base,
            type: "timbre",
            montant: timbre,
            montant_timbre: timbre,
          });
        }
      });

      setRows(normalized);
      setTotalRedevance(Number(json.total_redevance ?? 0) || 0);
      setTotalTimbre(Number(json.total_timbre ?? 0) || 0);

      if (Array.isArray(json.total_services)) {
        setTotalServicesByCat(
          json.total_services.map((s) => ({
            category: s.Categories ?? "-",
            total: Number(s.total_par_categorie ?? 0),
          }))
        );
      }

      setPage(1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (filterType === "single" && !singleDate) return;
    if (filterType === "range" && (!dateStart || !dateEnd)) return;
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType]);

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    const sorted = rows
      .filter(
        (r) =>
          !s ||
          r.numero_recu.toLowerCase().includes(s) ||
          r.nom_client.toLowerCase().includes(s) ||
          (r.categorie ?? "").toLowerCase().includes(s)
      )
      .sort((a, b) => {
        let v = 0;
        if (sortKey === "date_paiement") {
          v =
            (new Date(a.date_paiement ?? 0).getTime() || 0) -
            (new Date(b.date_paiement ?? 0).getTime() || 0);
        } else if (sortKey === "montant") {
          v = a.montant - b.montant;
        } else {
          v = a.nom_client.localeCompare(b.nom_client);
        }
        return sortOrder === "asc" ? v : -v;
      });

    return sorted;
  }, [rows, search, sortKey, sortOrder]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <Card className="p-4">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <CardTitle>Rapports & Statistiques</CardTitle>
          <div className="text-sm text-muted-foreground">
            Choisis un filtre puis clique sur Charger
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Select
            onValueChange={(v) => setFilterType(v as any)}
            defaultValue={filterType}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Type de rapport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="journalier">Journalier</SelectItem>
              <SelectItem value="mensuel">Mensuel</SelectItem>
              <SelectItem value="annuel">Annuel</SelectItem>
              <SelectItem value="single">Date unique</SelectItem>
              <SelectItem value="range">Intervalle dates</SelectItem>
            </SelectContent>
          </Select>

          {filterType === "single" && (
            <Input
              type="date"
              value={singleDate}
              onChange={(e) => setSingleDate(e.target.value)}
            />
          )}

          {filterType === "range" && (
            <>
              <Input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
              />
              <Input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </>
          )}

          <Button onClick={fetchReport}>Charger</Button>
          <Button variant="outline" onClick={handleImprint}>
            Imprimer
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {error && <div className="text-red-600 mb-4">Erreur : {error}</div>}

        {/* Search / Sort / PageSize */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Rechercher... (reçu, client, catégorie)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Tri</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    setSortKey("date_paiement");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Date
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSortKey("montant");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Montant
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSortKey("nom_client");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Client
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <div>Afficher</div>
            <Select
              onValueChange={(v) => setPageSize(Number(v))}
              defaultValue={String(pageSize)}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="500">500</SelectItem>
                <SelectItem value="1000">1000</SelectItem>
                <SelectItem value="10000">10000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tableau */}
        <div className="w-full" ref={printAreaRef}>
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">N° Reçu</th>
                <th className="border p-2">Client</th>
                <th className="border p-2">Boîte postale</th>
                <th className="border p-2">Méthode</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Catégorie</th>
                <th className="border p-2">Montant</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                Array.from({ length: pageSize }).map((_, i) => (
                  <tr key={`skel-${i}`}>
                    <td className="border p-2 animate-pulse">&nbsp;</td>
                    <td className="border p-2 animate-pulse">&nbsp;</td>
                    <td className="border p-2 animate-pulse">&nbsp;</td>
                    <td className="border p-2 animate-pulse">&nbsp;</td>
                    <td className="border p-2 animate-pulse">&nbsp;</td>
                    <td className="border p-2 animate-pulse">&nbsp;</td>
                    <td className="border p-2 animate-pulse">&nbsp;</td>
                    <td className="border p-2 animate-pulse">&nbsp;</td>
                  </tr>
                ))
              ) : pageData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center p-6 border">
                    Aucune donnée
                  </td>
                </tr>
              ) : (
                pageData.map((r) => (
                  <tr key={r.id}>
                    <td className="border p-2">{r.numero_recu}</td>
                    <td className="border p-2">{r.nom_client}</td>
                    <td className="border p-2">{r.numero_boite_postale}</td>
                    <td className="border p-2">{r.methode_paiement}</td>
                    <td
                      className={`border p-2 ${
                        r.type === "redevance" ? "font-semibold" : "italic"
                      }`}
                    >
                      {r.type}
                    </td>
                    <td className="border p-2">{r.categorie ?? "-"}</td>
                    <td className="border p-2">
                      {r.montant.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>

                    <td className="border p-2">
                      {r.date_paiement
                        ? new Date(r.date_paiement).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Bloc visible uniquement lors de l'impression */}
          {showPrintBlock && (
            <div className="mt-36 p-4  flex flex-col">
              {/* Tableau récapitulatif */}
              <div className="flex flex-col items-end">
                <h2 className="text-xl font-semibold mb-3">
                  Récapitulatif des Totaux
                </h2>

                <table className="border mb-6 w-56">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2 text-left">Type</th>
                      <th className="border p-2 text-right">Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">Total Redevances</td>
                      <td className="border p-2 text-right">
                        {totalRedevance.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2">Total Services</td>
                      <td className="border p-2 text-right">
                        {totalServicesByCat
                          .reduce((a, b) => a + b.total, 0)
                          .toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2">Total Timbre</td>
                      <td className="border p-2 text-right">
                        {totalTimbre !== null && totalTimbre !== 0
                          ? totalTimbre.toLocaleString()
                          : ""}
                      </td>
                    </tr>
                    <tr className="font-bold bg-gray-100">
                      <td className="border p-2">Total Général</td>
                      <td className="border p-2 text-right">
                        {(
                          totalRedevance +
                          totalTimbre +
                          totalServicesByCat.reduce((a, b) => a + b.total, 0)
                        ).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between mt-10">
                <div className="text-center">
                  <div className="font-semibold">Signature Caissier</div>
                  <div className="mt-12">______________________</div>
                </div>

                <div className="text-center">
                  <div className="font-semibold">Signature Agent</div>
                  <div className="mt-12">______________________</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div>
            Page {page} / {pageCount} • {filtered.length} lignes
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Préc
            </Button>
            <Button
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
            >
              Suiv
            </Button>
          </div>
        </div>

        {/* Totaux sous le tableau */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <CardTitle>Total global (somme des lignes) </CardTitle>
            <CardContent>
              <div className="text-2xl font-bold">
                {rows.reduce((acc, r) => acc + r.montant, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardTitle>Total redevance</CardTitle>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalRedevance.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardTitle>Nombre de lignes</CardTitle>
            <CardContent>
              <div className="text-2xl font-bold">{rows.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Totaux par service (cartes) */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Total par catégorie (services additionnels)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {totalServicesByCat.length === 0 ? (
              <div className="text-sm text-muted-foreground">Aucun service</div>
            ) : (
              totalServicesByCat.map((s, i) => (
                <Card key={s.category} className="p-4">
                  <CardTitle className="text-base">{s.category}</CardTitle>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {s.total.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          {/* <div className="mt-12 flex justify-between">
              <div className="text-center">
                <div className="font-semibold">Signature Caissier</div>
                <div className="mt-12">______________________</div>
              </div>

              <div className="text-center">
                <div className="font-semibold">Signature Agent</div>
                <div className="mt-12">______________________</div>
              </div>
            </div> */}
        </div>

        {/* Charts */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <CardTitle>Répartition par catégorie (services)</CardTitle>
            <CardContent style={{ height: 300 }}>
              {totalServicesByCat.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  Aucun service
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={totalServicesByCat}
                      dataKey="total"
                      nameKey="category"
                      outerRadius={90}
                      label
                    >
                      {totalServicesByCat.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ReTooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardTitle>Redevance vs Services (barres)</CardTitle>
            <CardContent style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={[
                    { name: "Redevance", value: totalRedevance },
                    {
                      name: "Services",
                      value: totalServicesByCat.reduce(
                        (a, b) => a + b.total,
                        0
                      ),
                    },
                  ]}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ReTooltip />
                  <Legend />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
