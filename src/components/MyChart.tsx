"use client"

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

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

interface MychartPropos {
    AbonneTotal:number
    Abonne_a_jour:number
    Abonne_non_a_jour: number
}

export function MyBetterChart({AbonneTotal,Abonne_a_jour,Abonne_non_a_jour}:MychartPropos) {
  const chartData = [
    { browser: "AbonneTotal", visitors: AbonneTotal, fill: "var(--color-AbonneTotal)" },
    { browser: "AbonneAjour", visitors: Abonne_a_jour, fill: "var(--color-AbonneAjour)" },
    { browser: "AbonneNonAjour", visitors: Abonne_non_a_jour, fill: "var(--color-AbonneNonAjour)" },
  ]

  const chartConfig = {
    visitors: {
      label: "Appels",
    },
    AbonneTotal: {
      label: "Abonnes Total",
      color: "#024C54",
    },
    AbonneAjour: {
      label: "Abonnes a jour",
      color: "#A95705",
    },
    AbonneNonAjour: {
      label: "Abonnes non a jour",
      color: "#480590",
    }
  } satisfies ChartConfig
  return (
    <Card className="w-full bg-white shadow-blue">
      <CardHeader>
        <CardTitle className="text-blue">Vue d&#39;ensemble</CardTitle>
        <CardDescription className="text-blue">visualisation de l&#39;evolution des abonnes</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}

      </CardFooter>
    </Card>
  )
}
