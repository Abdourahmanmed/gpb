"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AchatCleSchema,
  MontantSaiasiSchema,
} from "@/Schema/schema";
import HeaderImprimary from "./HeaderImprimary";
import Imprimery from "./Imprimery";
import { GetLastReferenceOfCLE } from "@/actions/All_references/GetLastReferenceOfCLE";
import { ChangementClePaiement } from "@/actions/paiement/ClePaiement";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Importer les styles de react-toastify





interface PaymentFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  UserId: string;
}

export const DepotResilierForm: React.FC<PaymentFormProps> = ({
  isOpen,
  setIsOpen,
  UserId,
}) => {





  const onSubmit = (values) => {
   
  };


  return (
    <>
      {/* formulaire principale */}
      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogContent>
          <div>
            <DialogHeader>
              <DialogTitle className="text-primary text-xl">
                Depot de resiliation
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                <form
                  onSubmit={onSubmit}
                  className="space-y-4"
                >
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      className="bg-slate-500 text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Annuler
                    </Button>
                    <Button type="submit" className="bg-primary text-white">
                      Deposer
                    </Button>
                  </div>
                </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
