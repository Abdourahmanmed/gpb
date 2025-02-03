"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";






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





  const onSubmit = () => {
   console.log(UserId)
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
