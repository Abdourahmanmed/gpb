"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

interface MychartPropos {
    BpPetit: number
    BpMoyen: number
    BpGrand: number
}

export function PieChartDonutWithText({ BpPetit, BpMoyen, BpGrand }: MychartPropos) {
    const chartData = [
        { browser: "PetitBoitPostal", visitors: Number(BpPetit), fill: "var(--color-PetitBoitPostal)" },
        { browser: "MoyenBoitPostal", visitors: Number(BpMoyen), fill: "var(--color-MoyenBoitPostal)" },
        { browser: "GrandBoitPostal", visitors: Number(BpGrand), fill: "var(--color-GrandBoitPostal)" },
    ]


    const chartConfig = {
        visitors: {
            label: "Livraison",
        },
        PetitBoitPostal: {
            label: "Petite boite postal",
            color: "#002B5B",
        },
        MoyenBoitPostal: {
            label: "Moyen boite postal",
            color: "#17C10E",
        },
        GrandBoitPostal: {
            label: "Grand boite postale",
            color: "#6D0B0B",
        },
    } satisfies ChartConfig

    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [BpPetit, BpMoyen, BpGrand])

    return (
        <Card className="flex flex-col shadow-blue">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-blue">Evolution des livraisons</CardTitle>
                <CardDescription ><span className="text-orange-800">Boite postals : Grand</span> - <span className="text-lime-500">Boite postals : Moyen</span>- <span className="text-primary">Boite postals : Petit</span></CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold text-blue"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground text-blue"
                                                >
                                                    Boite postals
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="leading-none text-muted-foreground flex gap-2 text-orange-700">
                    Afficher le total des Boites postals  <TrendingUp className="h-4 w-4" />
                </div>
            </CardFooter>
        </Card>
    )
}
