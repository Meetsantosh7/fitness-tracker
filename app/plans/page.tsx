"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Clock, Users, Target, Star, Play } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WorkoutPlan {
  id: string
  name: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  targetMuscles: string[]
  exercises: Exercise[]
  rating: number
  participants: number
}

interface Exercise {
  name: string
  sets: string
  reps: string
  rest: string
}

export default function PlansPage() {
  const { toast } = useToast()

  const workoutPlans: WorkoutPlan[] = [
    {
      id: "1",
      name: "Push Day Power",
      description: "Focus on chest, shoulders, and triceps with compound movements",
      duration: "45-60 min",
      difficulty: "Intermediate",
      targetMuscles: ["Chest", "Shoulders", "Triceps"],
      rating: 4.8,
      participants: 1250,
      exercises: [
        { name: "Bench Press", sets: "4", reps: "8-10", rest: "2-3 min" },
        { name: "Overhead Press", sets: "3", reps: "10-12", rest: "2 min" },
        { name: "Incline Dumbbell Press", sets: "3", reps: "10-12", rest: "90 sec" },
        { name: "Lateral Raises", sets: "3", reps: "12-15", rest: "60 sec" },
        { name: "Tricep Dips", sets: "3", reps: "10-12", rest: "90 sec" },
        { name: "Push-ups", sets: "2", reps: "To failure", rest: "60 sec" },
      ],
    },
    {
      id: "2",
      name: "Pull Day Strength",
      description: "Target your back and biceps with pulling movements",
      duration: "50-65 min",
      difficulty: "Intermediate",
      targetMuscles: ["Back", "Biceps", "Rear Delts"],
      rating: 4.7,
      participants: 980,
      exercises: [
        { name: "Deadlifts", sets: "4", reps: "6-8", rest: "3 min" },
        { name: "Pull-ups", sets: "3", reps: "8-10", rest: "2 min" },
        { name: "Barbell Rows", sets: "3", reps: "10-12", rest: "2 min" },
        { name: "Lat Pulldowns", sets: "3", reps: "10-12", rest: "90 sec" },
        { name: "Bicep Curls", sets: "3", reps: "12-15", rest: "60 sec" },
        { name: "Face Pulls", sets: "3", reps: "15-20", rest: "60 sec" },
      ],
    },
    {
      id: "3",
      name: "Leg Day Destroyer",
      description: "Complete lower body workout for strength and size",
      duration: "60-75 min",
      difficulty: "Advanced",
      targetMuscles: ["Quadriceps", "Hamstrings", "Glutes", "Calves"],
      rating: 4.9,
      participants: 750,
      exercises: [
        { name: "Squats", sets: "4", reps: "8-10", rest: "3 min" },
        { name: "Romanian Deadlifts", sets: "3", reps: "10-12", rest: "2-3 min" },
        { name: "Bulgarian Split Squats", sets: "3", reps: "10-12 each", rest: "90 sec" },
        { name: "Leg Press", sets: "3", reps: "12-15", rest: "2 min" },
        { name: "Leg Curls", sets: "3", reps: "12-15", rest: "90 sec" },
        { name: "Calf Raises", sets: "4", reps: "15-20", rest: "60 sec" },
      ],
    },
    {
      id: "4",
      name: "Full Body Beginner",
      description: "Perfect introduction to weight training",
      duration: "30-40 min",
      difficulty: "Beginner",
      targetMuscles: ["Full Body"],
      rating: 4.6,
      participants: 2100,
      exercises: [
        { name: "Goblet Squats", sets: "3", reps: "10-12", rest: "90 sec" },
        { name: "Push-ups", sets: "3", reps: "8-12", rest: "90 sec" },
        { name: "Bent-over Rows", sets: "3", reps: "10-12", rest: "90 sec" },
        { name: "Overhead Press", sets: "2", reps: "8-10", rest: "2 min" },
        { name: "Plank", sets: "3", reps: "30-45 sec", rest: "60 sec" },
      ],
    },
    {
      id: "5",
      name: "HIIT Cardio Blast",
      description: "High-intensity interval training for fat loss",
      duration: "20-25 min",
      difficulty: "Intermediate",
      targetMuscles: ["Cardiovascular", "Full Body"],
      rating: 4.5,
      participants: 1800,
      exercises: [
        { name: "Burpees", sets: "4", reps: "30 sec", rest: "30 sec" },
        { name: "Mountain Climbers", sets: "4", reps: "30 sec", rest: "30 sec" },
        { name: "Jump Squats", sets: "4", reps: "30 sec", rest: "30 sec" },
        { name: "High Knees", sets: "4", reps: "30 sec", rest: "30 sec" },
        { name: "Plank Jacks", sets: "4", reps: "30 sec", rest: "30 sec" },
      ],
    },
    {
      id: "6",
      name: "Core Crusher",
      description: "Strengthen your core with targeted ab exercises",
      duration: "25-30 min",
      difficulty: "Beginner",
      targetMuscles: ["Core", "Abs", "Obliques"],
      rating: 4.4,
      participants: 1400,
      exercises: [
        { name: "Plank", sets: "3", reps: "45-60 sec", rest: "60 sec" },
        { name: "Russian Twists", sets: "3", reps: "20-30", rest: "45 sec" },
        { name: "Bicycle Crunches", sets: "3", reps: "20 each side", rest: "45 sec" },
        { name: "Dead Bug", sets: "3", reps: "10 each side", rest: "60 sec" },
        { name: "Mountain Climbers", sets: "3", reps: "30 sec", rest: "45 sec" },
        { name: "Leg Raises", sets: "3", reps: "12-15", rest: "60 sec" },
      ],
    },
  ]

  const startWorkout = (planName: string) => {
    toast({
      title: "Workout Started!",
      description: `${planName} has been added to your workout log.`,
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
                  <BreadcrumbPage>Workout Plans</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="flex-1 p-4 md:p-6 w-full overflow-x-hidden">
            <div className="mx-auto max-w-7xl space-y-6 w-full">
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Workout Plans</h1>
                <p className="text-muted-foreground">
                  Choose from our curated workout routines designed by fitness experts
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {workoutPlans.map((plan) => (
                  <Card key={plan.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg md:text-xl mb-2 leading-tight">{plan.name}</CardTitle>
                          <CardDescription className="text-sm">{plan.description}</CardDescription>
                        </div>
                        <Badge className={`${getDifficultyColor(plan.difficulty)} ml-2 flex-shrink-0`}>
                          {plan.difficulty}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mt-3 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 md:h-4 md:w-4" />
                          <span className="whitespace-nowrap">{plan.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 md:h-4 md:w-4" />
                          <span className="whitespace-nowrap">{plan.participants.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                          <span>{plan.rating}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Target Muscles
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {plan.targetMuscles.map((muscle, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold mb-3">Exercises ({plan.exercises.length})</h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {plan.exercises.map((exercise, index) => (
                            <div key={index} className="text-sm p-2 bg-muted/50 rounded">
                              <div className="font-medium">{exercise.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {exercise.sets} sets × {exercise.reps} • Rest: {exercise.rest}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full" onClick={() => startWorkout(plan.name)}>
                        <Play className="h-4 w-4 mr-2" />
                        Start Workout
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
