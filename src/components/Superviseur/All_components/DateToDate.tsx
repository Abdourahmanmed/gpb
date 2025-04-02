"use client";

import { NoFilterDataTable } from "@/components/Tables/NoFilterData";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/Spinner";
import { ClientColumns, ClientType } from "../columns/ClientCol";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const dateSchema = z.object({
  startDate: z.string().nonempty("La date de début est requise"),
  endDate: z.string().nonempty("La date de fin est requise"),
});

type DateFormType = z.infer<typeof dateSchema>;

const DateToDate = () => {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DateFormType>({
    resolver: zodResolver(dateSchema),
  });

  const onSubmit = (data: DateFormType) => {
    setLoading(true);
    setError("");

    // Simulation d'un filtrage des clients selon la plage de dates
    setTimeout(() => {
      // Ici, vous pouvez implémenter un appel API réel pour récupérer les clients selon la plage de dates
      console.log(
        "Filtrage des clients entre :",
        data.startDate,
        "et",
        data.endDate
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-4"
      >
        <div>
          <Input type="date" {...register("startDate")} />
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate.message}</p>
          )}
        </div>
        <div>
          <Input type="date" {...register("endDate")} />
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate.message}</p>
          )}
        </div>
        <Button type="submit">Rechercher</Button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <NoFilterDataTable
          data={clients}
          columns={ClientColumns}
          typeName="Nom"
        />
      )}
    </div>
  );
};

export default DateToDate;
