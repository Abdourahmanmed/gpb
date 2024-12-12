declare module "react-to-print" {
    import * as React from "react";

    export interface UseReactToPrintOptions {
        content: () => React.ReactInstance | null;
        onBeforeGetContent?: () => Promise<void> | void;
        onAfterPrint?: () => void;
        onPrintError?: (errorLocation: string, error: Error) => void;
        documentTitle?: string;
        pageStyle?: string | (() => string);
        removeAfterPrint?: boolean;
    }

    export function useReactToPrint(options: UseReactToPrintOptions): () => void;
}
