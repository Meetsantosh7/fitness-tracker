"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
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
import { Plus, Apple, Target, Flame, Droplets } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FoodItem {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  meal: string
}

export default function NutritionPage() {
  const { toast } = useToast()
  const [foods, setFoods] = useState<FoodItem[]>([
    {
      id: "1",
      name: "Oatmeal with Berries",
      calories: 350,
      protein: 12,
      carbs: 65,
      fat: 8,
      meal: "Breakfast",
    },
    {
      id: "2",
      name: "Grilled Chicken Salad",
      calories: 450,
      protein: 35,
      carbs: 20,
      fat: 25,
      meal: "Lunch",
    },
  ])

  const [newFood, setNewFood] = useState({
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    meal: "Breakfast",
  })

  const dailyGoals = {
    calories: 2200,
    protein: 150,
    carbs: 275,
    fat: 73,
  }

  const totals = foods.reduce(
    (acc, food) => ({
      calories: acc.calories + food.calories,
      protein: acc.protein + food.protein,
      carbs: acc.carbs + food.carbs,
      fat: acc.fat + food.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  )

  const addFood = () => {
    if (!newFood.name || newFood.calories <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid food name and calories.",
        variant: "destructive",
      })
      return
    }

    const food: FoodItem = {
      id: Date.now().toString(),
      ...newFood,
    }

    setFoods([...foods, food])
    setNewFood({
      name: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      meal: "Breakfast",
    })

    toast({
      title: "Food Added!",
      description: `${food.name} has been added to your ${food.meal}.`,
    })
  }

  const mealGroups = foods.reduce(
    (acc, food) => {
      if (!acc[food.meal]) acc[food.meal] = []
      acc[food.meal].push(food)
      return acc
    },
    {} as Record<string, FoodItem[]>,
  )

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
                  <BreadcrumbPage>Nutrition</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="flex-1 p-4 md:p-6 w-full overflow-x-hidden">
            <div className="mx-auto max-w-7xl space-y-6 w-full">
              {/* Hero Section */}
              <Card className="border-0 bg-gradient-to-r from-green-50 to-blue-50 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row items-center gap-6">
                    <div className="flex-1 text-center lg:text-left">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Nutrition Tracking
                      </h1>
                      <p className="text-gray-600 mb-4">
                        Monitor your daily nutritional intake and maintain a balanced diet for optimal health and fitness.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Calorie Tracking
                        </Badge>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          Macro Balance
                        </Badge>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          Meal Planning
                        </Badge>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <img 
                        src="/nutrition-hero.svg" 
                        alt="Nutrition Tracking" 
                        className="w-64 h-48 object-contain"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Daily Overview */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Flame className="h-4 w-4 text-orange-500" />
                      Calories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl md:text-2xl font-bold">{totals.calories}</div>
                    <p className="text-xs text-muted-foreground">of {dailyGoals.calories} goal</p>
                    <Progress value={(totals.calories / dailyGoals.calories) * 100} className="mt-2 h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Target className="h-4 w-4 text-red-500" />
                      Protein
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl md:text-2xl font-bold">{totals.protein}g</div>
                    <p className="text-xs text-muted-foreground">of {dailyGoals.protein}g goal</p>
                    <Progress value={(totals.protein / dailyGoals.protein) * 100} className="mt-2 h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Apple className="h-4 w-4 text-green-500" />
                      Carbs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl md:text-2xl font-bold">{totals.carbs}g</div>
                    <p className="text-xs text-muted-foreground">of {dailyGoals.carbs}g goal</p>
                    <Progress value={(totals.carbs / dailyGoals.carbs) * 100} className="mt-2 h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      Fat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl md:text-2xl font-bold">{totals.fat}g</div>
                    <p className="text-xs text-muted-foreground">of {dailyGoals.fat}g goal</p>
                    <Progress value={(totals.fat / dailyGoals.fat) * 100} className="mt-2 h-2" />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Add Food */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Add Food
                    </CardTitle>
                    <CardDescription>Log your meals and track nutrition</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="food-name">Food Name</Label>
                      <Input
                        id="food-name"
                        placeholder="e.g., Grilled Chicken Breast"
                        value={newFood.name}
                        onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="meal">Meal</Label>
                      <select
                        id="meal"
                        className="w-full p-2 border rounded-md"
                        value={newFood.meal}
                        onChange={(e) => setNewFood({ ...newFood, meal: e.target.value })}
                      >
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snack">Snack</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="calories">Calories</Label>
                        <Input
                          id="calories"
                          type="number"
                          min="0"
                          value={newFood.calories}
                          onChange={(e) => setNewFood({ ...newFood, calories: Number.parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="protein">Protein (g)</Label>
                        <Input
                          id="protein"
                          type="number"
                          min="0"
                          value={newFood.protein}
                          onChange={(e) => setNewFood({ ...newFood, protein: Number.parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="carbs">Carbs (g)</Label>
                        <Input
                          id="carbs"
                          type="number"
                          min="0"
                          value={newFood.carbs}
                          onChange={(e) => setNewFood({ ...newFood, carbs: Number.parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="fat">Fat (g)</Label>
                        <Input
                          id="fat"
                          type="number"
                          min="0"
                          value={newFood.fat}
                          onChange={(e) => setNewFood({ ...newFood, fat: Number.parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>

                    <Button onClick={addFood} className="w-full">
                      Add Food
                    </Button>
                  </CardContent>
                </Card>

                {/* Today's Meals */}
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Meals</CardTitle>
                    <CardDescription>Your food intake for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(mealGroups).map(([meal, items]) => (
                        <div key={meal}>
                          <h4 className="font-semibold mb-2">{meal}</h4>
                          <div className="space-y-2">
                            {items.map((food) => (
                              <div key={food.id} className="p-3 bg-muted/50 rounded-lg">
                                <div className="flex justify-between items-start mb-1">
                                  <p className="font-medium truncate">{food.name}</p>
                                  <Badge variant="secondary" className="ml-2">
                                    {food.calories} cal
                                  </Badge>
                                </div>
                                <div className="text-xs text-muted-foreground grid grid-cols-3 gap-2">
                                  <span>P: {food.protein}g</span>
                                  <span>C: {food.carbs}g</span>
                                  <span>F: {food.fat}g</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      {foods.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">
                          No meals logged yet. Start by adding your first meal!
                        </p>
                      )}
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
