import LinksDecoration from "@/components/AgentGuiche/LinksDecoration"
export default function Layout({ children }: { children: React.ReactNode }) {

    return (

        <div>
            <LinksDecoration />
            {children}
        </div>

    )
}
