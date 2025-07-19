"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Plus, Trash2, Calendar, Clock, Dumbbell } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  weight: number
}

export default function WorkoutsPage() {
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [workoutType, setWorkoutType] = useState("")
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: 1,
    reps: 1,
    weight: 0,
  })

  const workoutTypes = ["Chest", "Back", "Shoulders", "Arms", "Legs", "Cardio", "Full Body", "Core"]

  const addExercise = () => {
    if (!newExercise.name) return

    const exercise: Exercise = {
      id: Date.now().toString(),
      ...newExercise,
    }

    setExercises([...exercises, exercise])
    setNewExercise({ name: "", sets: 1, reps: 1, weight: 0 })
  }

  const removeExercise = (id: string) => {
    setExercises(exercises.filter((ex) => ex.id !== id))
  }

  const saveWorkout = () => {
    if (!workoutType || exercises.length === 0) {
      toast({
        title: "Error",
        description: "Please select a workout type and add at least one exercise.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Workout Saved!",
      description: `Your ${workoutType} workout has been logged successfully.`,
    })

    // Reset form
    setWorkoutType("")
    setExercises([])
  }

  const recentWorkouts = [
    {
      date: "2024-01-15",
      type: "Push Day",
      exercises: ["Bench Press", "Shoulder Press", "Tricep Dips"],
      duration: "45 min",
    },
    {
      date: "2024-01-14",
      type: "Cardio",
      exercises: ["Treadmill", "Cycling", "Rowing"],
      duration: "30 min",
    },
    {
      date: "2024-01-13",
      type: "Pull Day",
      exercises: ["Pull-ups", "Rows", "Bicep Curls"],
      duration: "50 min",
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
                  <BreadcrumbPage>Workouts</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="flex-1 p-4 md:p-6 w-full overflow-x-hidden">
            <div className="mx-auto max-w-7xl space-y-6 w-full">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Log New Workout */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                      <Dumbbell className="h-5 w-5" />
                      Log New Workout
                    </CardTitle>
                    <CardDescription>Record your training session</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="workout-type">Workout Type</Label>
                        <Select value={workoutType} onValueChange={setWorkoutType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {workoutTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-base font-semibold">Add Exercise</Label>
                      <div className="space-y-3 mt-2">
                        <Input
                          placeholder="Exercise name"
                          value={newExercise.name}
                          onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            type="number"
                            placeholder="Sets"
                            min="1"
                            value={newExercise.sets}
                            onChange={(e) =>
                              setNewExercise({ ...newExercise, sets: Number.parseInt(e.target.value) || 1 })
                            }
                          />
                          <Input
                            type="number"
                            placeholder="Reps"
                            min="1"
                            value={newExercise.reps}
                            onChange={(e) =>
                              setNewExercise({ ...newExercise, reps: Number.parseInt(e.target.value) || 1 })
                            }
                          />
                          <Input
                            type="number"
                            placeholder="Weight"
                            min="0"
                            value={newExercise.weight}
                            onChange={(e) =>
                              setNewExercise({ ...newExercise, weight: Number.parseInt(e.target.value) || 0 })
                            }
                          />
                        </div>
                      </div>
                      <Button onClick={addExercise} className="mt-3 w-full bg-transparent" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Exercise
                      </Button>
                    </div>

                    {exercises.length > 0 && (
                      <div>
                        <Label className="text-base font-semibold">Today's Exercises</Label>
                        <div className="space-y-2 mt-2">
                          {exercises.map((exercise) => (
                            <div
                              key={exercise.id}
                              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                            >
                              <div className="min-w-0 flex-1">
                                <p className="font-medium truncate">{exercise.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {exercise.sets} sets × {exercise.reps} reps @ {exercise.weight}lbs
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeExercise(exercise.id)}
                                className="ml-2"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button onClick={saveWorkout} className="w-full">
                      Save Workout
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Workouts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Recent Workouts
                    </CardTitle>
                    <CardDescription>Your workout history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentWorkouts.map((workout, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{workout.type}</h4>
                            <Badge variant="secondary">
                              <Clock className="h-3 w-3 mr-1" />
                              {workout.duration}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{workout.date}</p>
                          <div className="flex flex-wrap gap-1">
                            {workout.exercises.map((exercise, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {exercise}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
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
