"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { Activity, Target, Flame, Trophy, Calendar, Clock, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { toast } = useToast()
  const router = useRouter()

  const handleLogout = () => {
    // Show logout toast
    toast({
      title: "❌ Logged out successfully!",
      description: "You have been signed out of FitTracker Pro.",
      className: "bg-gradient-to-r from-red-50 to-rose-50 border-red-300 text-red-800 shadow-lg",
      duration: 4000,
    })
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      router.push("/")
    }, 1000)
  }
  const todayStats = {
    workoutsCompleted: 1,
    caloriesBurned: 450,
    caloriesConsumed: 1850,
    calorieGoal: 2200,
    waterIntake: 6,
    waterGoal: 8,
    workoutStreak: 5,
  }

  const recentWorkouts = [
    { date: "Today", type: "Push Day", duration: "45 min", exercises: 6 },
    { date: "Yesterday", type: "Cardio", duration: "30 min", exercises: 3 },
    { date: "2 days ago", type: "Pull Day", duration: "50 min", exercises: 7 },
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
                  <BreadcrumbLink href="#">FitTracker Pro</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            {/* Logout Button */}
            <div className="ml-auto">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 hover:text-red-800 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </header>

          <main className="flex-1 p-3 sm:p-4 md:p-6 w-full overflow-x-hidden">
            <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6 w-full">
              {/* Stats Cards */}
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
                <Card className="p-3 sm:p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold truncate">Welcome Back!</h3>
                    <Activity className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600 flex-shrink-0" />
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 mb-1 sm:mb-2">
                    Day {todayStats.workoutStreak}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Current workout streak</p>
                </Card>

                <Card className="p-3 sm:p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold truncate">Today's Calories</h3>
                    <Flame className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-orange-600 flex-shrink-0" />
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600 mb-1 sm:mb-2">
                    {todayStats.caloriesConsumed}/{todayStats.calorieGoal}
                  </p>
                  <Progress
                    value={(todayStats.caloriesConsumed / todayStats.calorieGoal) * 100}
                    className="h-2 sm:h-2.5"
                  />
                </Card>

                <Card className="p-3 sm:p-4 md:p-6 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold truncate">Calories Burned</h3>
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0" />
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 mb-1 sm:mb-2">
                    {todayStats.caloriesBurned}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    From {todayStats.workoutsCompleted} workout
                  </p>
                </Card>
              </div>

              {/* Content Cards */}
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                <Card className="order-2 lg:order-1">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                      Recent Workouts
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Your latest training sessions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    {recentWorkouts.map((workout, index) => (
                      <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-muted/50 rounded-lg">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm sm:text-base truncate">{workout.type}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{workout.date}</p>
                        </div>
                        <div className="text-right ml-2 flex-shrink-0">
                          <Badge variant="secondary" className="mb-1 text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {workout.duration}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{workout.exercises} exercises</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="order-1 lg:order-2">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
                      Weekly Goals
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Track your weekly progress</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs sm:text-sm font-medium">Workouts</span>
                        <span className="text-xs sm:text-sm text-muted-foreground">4/5</span>
                      </div>
                      <Progress value={80} className="h-2 sm:h-2.5" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs sm:text-sm font-medium">Cardio Sessions</span>
                        <span className="text-xs sm:text-sm text-muted-foreground">2/3</span>
                      </div>
                      <Progress value={67} className="h-2 sm:h-2.5" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs sm:text-sm font-medium">Water Intake</span>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {todayStats.waterIntake}/{todayStats.waterGoal} glasses
                        </span>
                      </div>
                      <Progress
                        value={(todayStats.waterIntake / todayStats.waterGoal) * 100}
                        className="h-2 sm:h-2.5"
                      />
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
