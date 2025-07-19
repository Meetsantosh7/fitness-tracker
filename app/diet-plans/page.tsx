"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { Search, Flame, Target, Droplets, Leaf, Star } from "lucide-react"
import { useState } from "react"

interface FoodItem {
  id: string
  name: string
  category: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  serving: string
  image: string
  benefits: string[]
  rating: number
}

export default function DietPlansPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const foodItems: FoodItem[] = [
    {
      id: "1",
      name: "Grilled Chicken Breast",
      category: "Protein",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
      serving: "100g",
      image: "/chicken-realistic.svg",
      benefits: ["High Protein", "Low Fat", "Muscle Building"],
      rating: 4.8,
    },
    {
      id: "2",
      name: "Salmon Fillet",
      category: "Protein",
      calories: 208,
      protein: 25,
      carbs: 0,
      fat: 12,
      fiber: 0,
      serving: "100g",
      image: "/salmon-realistic.svg",
      benefits: ["Omega-3", "Heart Healthy", "Anti-inflammatory"],
      rating: 4.9,
    },
    {
      id: "3",
      name: "Beef Steak",
      category: "Protein",
      calories: 250,
      protein: 26,
      carbs: 0,
      fat: 15,
      fiber: 0,
      serving: "100g",
      image: "/beef-steak-realistic.svg",
      benefits: ["High Protein", "Iron", "B Vitamins"],
      rating: 4.7,
    },
    {
      id: "4",
      name: "Tuna Steak",
      category: "Protein",
      calories: 144,
      protein: 23,
      carbs: 0,
      fat: 5,
      fiber: 0,
      serving: "100g",
      image: "/tuna-steak-realistic.svg",
      benefits: ["Omega-3", "Low Fat", "Selenium"],
      rating: 4.6,
    },
    {
      id: "5",
      name: "Greek Yogurt",
      category: "Protein",
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      fiber: 0,
      serving: "100g",
      image: "/greek-yogurt-realistic.svg",
      benefits: ["Probiotics", "High Protein", "Calcium"],
      rating: 4.5,
    },
    {
      id: "6",
      name: "Eggs",
      category: "Protein",
      calories: 155,
      protein: 13,
      carbs: 1.1,
      fat: 11,
      fiber: 0,
      serving: "100g (2 large)",
      image: "/eggs-realistic.svg",
      benefits: ["Complete Protein", "Choline", "Vitamin D"],
      rating: 4.8,
    },
    {
      id: "7",
      name: "Quinoa",
      category: "Carbs",
      calories: 120,
      protein: 4.4,
      carbs: 22,
      fat: 1.9,
      fiber: 2.8,
      serving: "100g cooked",
      image: "/quinoa-realistic.svg",
      benefits: ["Complete Protein", "Gluten-Free", "High Fiber"],
      rating: 4.6,
    },
    {
      id: "8",
      name: "Sweet Potato",
      category: "Carbs",
      calories: 86,
      protein: 1.6,
      carbs: 20,
      fat: 0.1,
      fiber: 3,
      serving: "100g",
      image: "/sweet-potato-realistic.svg",
      benefits: ["Vitamin A", "Complex Carbs", "Antioxidants"],
      rating: 4.7,
    },
    {
      id: "9",
      name: "Brown Rice",
      category: "Carbs",
      calories: 111,
      protein: 2.6,
      carbs: 23,
      fat: 0.9,
      fiber: 1.8,
      serving: "100g cooked",
      image: "/brown-rice-realistic.svg",
      benefits: ["Whole Grain", "B Vitamins", "Sustained Energy"],
      rating: 4.3,
    },
    {
      id: "10",
      name: "Avocado",
      category: "Healthy Fats",
      calories: 160,
      protein: 2,
      carbs: 9,
      fat: 15,
      fiber: 7,
      serving: "100g",
      image: "/avocado-realistic.svg",
      benefits: ["Healthy Fats", "Potassium", "Heart Health"],
      rating: 4.8,
    },
    {
      id: "11",
      name: "Almonds",
      category: "Healthy Fats",
      calories: 579,
      protein: 21,
      carbs: 22,
      fat: 50,
      fiber: 12,
      serving: "100g",
      image: "/almonds-realistic.svg",
      benefits: ["Vitamin E", "Magnesium", "Heart Health"],
      rating: 4.7,
    },
    {
      id: "12",
      name: "Spinach",
      category: "Vegetables",
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
      serving: "100g",
      image: "/spinach-realistic.svg",
      benefits: ["Iron", "Folate", "Antioxidants"],
      rating: 4.4,
    },
    {
      id: "13",
      name: "Broccoli",
      category: "Vegetables",
      calories: 34,
      protein: 2.8,
      carbs: 7,
      fat: 0.4,
      fiber: 2.6,
      serving: "100g",
      image: "/broccoli-realistic.svg",
      benefits: ["Vitamin C", "Vitamin K", "Fiber"],
      rating: 4.2,
    },
    {
      id: "14",
      name: "Blueberries",
      category: "Fruits",
      calories: 57,
      protein: 0.7,
      carbs: 14,
      fat: 0.3,
      fiber: 2.4,
      serving: "100g",
      image: "/blueberries-realistic.svg",
      benefits: ["Antioxidants", "Vitamin C", "Brain Health"],
      rating: 4.6,
    },
    {
      id: "15",
      name: "Strawberries",
      category: "Fruits",
      calories: 32,
      protein: 0.7,
      carbs: 7.7,
      fat: 0.3,
      fiber: 2,
      serving: "100g",
      image: "/strawberries-realistic.svg",
      benefits: ["Vitamin C", "Antioxidants", "Low Calorie"],
      rating: 4.5,
    },
    {
      id: "16",
      name: "Banana",
      category: "Fruits",
      calories: 89,
      protein: 1.1,
      carbs: 23,
      fat: 0.3,
      fiber: 2.6,
      serving: "100g",
      image: "/banana-realistic.svg",
      benefits: ["Potassium", "Natural Sugars", "Energy"],
      rating: 4.4,
    },
  ]

  const categories = ["All", "Protein", "Carbs", "Healthy Fats", "Vegetables", "Fruits"]

  const filteredFoods = foodItems.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Protein":
        return "bg-red-100 text-red-800"
      case "Carbs":
        return "bg-blue-100 text-blue-800"
      case "Healthy Fats":
        return "bg-yellow-100 text-yellow-800"
      case "Vegetables":
        return "bg-green-100 text-green-800"
      case "Fruits":
        return "bg-purple-100 text-purple-800"
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
                  <BreadcrumbPage>Diet Plans</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Diet Plans & Nutrition Guide</h1>
                <p className="text-muted-foreground">
                  Discover nutritious foods and their macro breakdowns to fuel your fitness journey
                </p>
              </div>

              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search foods..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Food Grid */}
              <div className="grid gap-4 grid-cols-4">
                {filteredFoods.map((food) => (
                  <Card key={food.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={food.image || "/placeholder.svg"}
                        alt={food.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className={getCategoryColor(food.category)}>{food.category}</Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{food.name}</CardTitle>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{food.rating}</span>
                        </div>
                      </div>
                      <CardDescription className="text-sm">{food.serving}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Macros */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-orange-100 rounded">
                            <Flame className="h-3 w-3 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Calories</p>
                            <p className="text-sm font-semibold">{food.calories}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-red-100 rounded">
                            <Target className="h-3 w-3 text-red-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Protein</p>
                            <p className="text-sm font-semibold">{food.protein}g</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-blue-100 rounded">
                            <Droplets className="h-3 w-3 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Carbs</p>
                            <p className="text-sm font-semibold">{food.carbs}g</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-yellow-100 rounded">
                            <Droplets className="h-3 w-3 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Fat</p>
                            <p className="text-sm font-semibold">{food.fat}g</p>
                          </div>
                        </div>
                      </div>

                      {food.fiber > 0 && (
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-green-100 rounded">
                            <Leaf className="h-3 w-3 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Fiber: {food.fiber}g</p>
                          </div>
                        </div>
                      )}

                      {/* Benefits */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Benefits:</p>
                        <div className="flex gap-1">
                          {food.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredFoods.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No foods found matching your criteria.</p>
                </div>
              )}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
