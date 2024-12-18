import LinksDecoration from "@/components/AgentGuiche/LinksDecoration"
import { ScrollArea } from "@/components/ui/scroll-area"
export default function Layout({ children }: { children: React.ReactNode }) {

    return (

        <div>
            <LinksDecoration />
            {children}
        </div>

    )
}
