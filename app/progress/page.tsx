"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { TrendingUp, Scale, Activity, Calendar } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function ProgressPage() {
  const weightData = [
    { date: "Jan 1", weight: 180 },
    { date: "Jan 8", weight: 179 },
    { date: "Jan 15", weight: 178 },
    { date: "Jan 22", weight: 177 },
    { date: "Jan 29", weight: 176 },
    { date: "Feb 5", weight: 175 },
    { date: "Feb 12", weight: 174 },
  ]

  const workoutData = [
    { week: "Week 1", workouts: 4, calories: 1800 },
    { week: "Week 2", workouts: 5, calories: 2250 },
    { week: "Week 3", workouts: 3, calories: 1350 },
    { week: "Week 4", workouts: 6, calories: 2700 },
    { week: "Week 5", workouts: 4, calories: 1800 },
    { week: "Week 6", workouts: 5, calories: 2250 },
  ]

  const muscleGroupData = [
    { name: "Chest", value: 25, color: "#8884d8" },
    { name: "Back", value: 20, color: "#82ca9d" },
    { name: "Legs", value: 30, color: "#ffc658" },
    { name: "Arms", value: 15, color: "#ff7300" },
    { name: "Shoulders", value: 10, color: "#00ff88" },
  ]

  const stats = [
    {
      title: "Current Weight",
      value: "174 lbs",
      change: "-6 lbs",
      icon: Scale,
      trend: "down",
    },
    {
      title: "Workouts This Month",
      value: "18",
      change: "+3 from last month",
      icon: Activity,
      trend: "up",
    },
    {
      title: "Average Calories Burned",
      value: "450",
      change: "per workout",
      icon: TrendingUp,
      trend: "up",
    },
    {
      title: "Workout Streak",
      value: "5 days",
      change: "Personal best!",
      icon: Calendar,
      trend: "up",
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Progress</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="flex-1 p-4 md:p-6 w-full overflow-x-hidden">
            <div className="mx-auto max-w-7xl space-y-6 w-full">
              {/* Stats Overview */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                      <p className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-blue-600"}`}>
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Weight Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weight Progress</CardTitle>
                    <CardDescription>Your weight loss journey over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] md:h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weightData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="weight"
                            stroke="#8884d8"
                            strokeWidth={2}
                            dot={{ fill: "#8884d8" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Workout Frequency */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Workout Activity</CardTitle>
                    <CardDescription>Workouts completed and calories burned</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] md:h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={workoutData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Bar yAxisId="left" dataKey="workouts" fill="#8884d8" name="Workouts" />
                          <Bar yAxisId="right" dataKey="calories" fill="#82ca9d" name="Calories Burned" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Muscle Group Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Muscle Group Focus</CardTitle>
                    <CardDescription>Distribution of your workout focus areas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] md:h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={muscleGroupData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {muscleGroupData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                    <CardDescription>Your latest milestones and personal records</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="bg-green-500 text-white p-2 rounded-full flex-shrink-0">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium">New Personal Record!</p>
                          <p className="text-sm text-muted-foreground">Bench Press: 185 lbs</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="bg-blue-500 text-white p-2 rounded-full flex-shrink-0">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium">5-Day Streak</p>
                          <p className="text-sm text-muted-foreground">Consistent workout routine</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="bg-purple-500 text-white p-2 rounded-full flex-shrink-0">
                          <Scale className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium">Weight Goal Reached</p>
                          <p className="text-sm text-muted-foreground">Lost 6 lbs this month</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="bg-orange-500 text-white p-2 rounded-full flex-shrink-0">
                          <Activity className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium">Cardio Milestone</p>
                          <p className="text-sm text-muted-foreground">Ran 5K in under 25 minutes</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
