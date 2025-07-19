"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Users, Activity, TrendingUp, Calendar, Edit, Trash2, Plus, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  email: string
  role: "User" | "Admin"
  joinDate: string
  lastActive: string
  workoutsCompleted: number
  status: "Active" | "Inactive"
}

export default function AdminPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "User",
      joinDate: "2024-01-15",
      lastActive: "2024-01-20",
      workoutsCompleted: 25,
      status: "Active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      joinDate: "2024-01-10",
      lastActive: "2024-01-19",
      workoutsCompleted: 18,
      status: "Active",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Admin",
      joinDate: "2023-12-01",
      lastActive: "2024-01-20",
      workoutsCompleted: 45,
      status: "Active",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "User",
      joinDate: "2024-01-05",
      lastActive: "2024-01-18",
      workoutsCompleted: 12,
      status: "Inactive",
    },
  ])

  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    difficulty: "Beginner",
    duration: "",
    targetMuscles: "",
  })

  const adminStats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12% from last month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: "987",
      change: "80% of total users",
      icon: Activity,
      color: "text-green-600",
    },
    {
      title: "Total Workouts",
      value: "15,678",
      change: "+8% from last week",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "New Signups",
      value: "45",
      change: "This week",
      icon: Calendar,
      color: "text-orange-600",
    },
  ]

  const deleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
    toast({
      title: "User Deleted",
      description: "User has been removed from the system.",
    })
  }

  const toggleUserRole = (userId: string) => {
    setUsers(
      users.map((user) => (user.id === userId ? { ...user, role: user.role === "User" ? "Admin" : "User" } : user)),
    )
    toast({
      title: "Role Updated",
      description: "User role has been changed successfully.",
    })
  }

  const createWorkoutPlan = () => {
    if (!newPlan.name || !newPlan.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Workout Plan Created!",
      description: `${newPlan.name} has been added to the workout plans.`,
    })

    setNewPlan({
      name: "",
      description: "",
      difficulty: "Beginner",
      duration: "",
      targetMuscles: "",
    })
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
                  <BreadcrumbPage>Admin Panel</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="flex-1 p-4 md:p-6 w-full overflow-x-hidden">
            <div className="mx-auto max-w-7xl space-y-6 w-full">
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                  <Shield className="h-6 w-6 md:h-8 md:w-8" />
                  Admin Panel
                </h1>
                <p className="text-muted-foreground">Manage users, workout plans, and system settings</p>
              </div>

              {/* Admin Stats */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                {adminStats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Tabs defaultValue="users" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="users">User Management</TabsTrigger>
                  <TabsTrigger value="plans">Workout Plans</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="users" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>Manage gym members and their access levels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* User Management Cards */}
                      <div className="space-y-4">
                        {users.map((user) => (
                          <div
                            key={user.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4"
                          >
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <div className="bg-gray-200 rounded-full p-3 flex-shrink-0">
                                <Users className="h-5 w-5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-semibold truncate">{user.name}</h4>
                                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                                  <Badge variant={user.status === "Active" ? "default" : "outline"}>
                                    {user.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col sm:text-right w-full sm:w-auto">
                              <p className="text-sm font-medium">{user.workoutsCompleted} workouts</p>
                              <p className="text-xs text-muted-foreground">Joined {user.joinDate}</p>
                              <div className="flex gap-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => toggleUserRole(user.id)}
                                  className="text-xs"
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  Toggle Role
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteUser(user.id)}
                                  className="text-xs"
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="plans" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create New Workout Plan</CardTitle>
                      <CardDescription>Add new workout routines for gym members</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="plan-name">Plan Name</Label>
                          <Input
                            id="plan-name"
                            placeholder="e.g., Upper Body Strength"
                            value={newPlan.name}
                            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="difficulty">Difficulty</Label>
                          <select
                            id="difficulty"
                            className="w-full p-2 border rounded-md"
                            value={newPlan.difficulty}
                            onChange={(e) => setNewPlan({ ...newPlan, difficulty: e.target.value })}
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          placeholder="Brief description of the workout plan"
                          value={newPlan.description}
                          onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="duration">Duration</Label>
                          <Input
                            id="duration"
                            placeholder="e.g., 45-60 min"
                            value={newPlan.duration}
                            onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="target-muscles">Target Muscles</Label>
                          <Input
                            id="target-muscles"
                            placeholder="e.g., Chest, Shoulders, Triceps"
                            value={newPlan.targetMuscles}
                            onChange={(e) => setNewPlan({ ...newPlan, targetMuscles: e.target.value })}
                          />
                        </div>
                      </div>

                      <Button onClick={createWorkoutPlan} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Workout Plan
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>User Activity</CardTitle>
                        <CardDescription>Recent user engagement metrics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Daily Active Users</span>
                            <span className="font-semibold">847</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Weekly Active Users</span>
                            <span className="font-semibold">1,234</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Average Session Duration</span>
                            <span className="font-semibold">24 min</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Workout Completion Rate</span>
                            <span className="font-semibold">87%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Popular Workout Plans</CardTitle>
                        <CardDescription>Most used workout routines</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Push Day Power</span>
                            <Badge>1,250 users</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Full Body Beginner</span>
                            <Badge>2,100 users</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">HIIT Cardio Blast</span>
                            <Badge>1,800 users</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Pull Day Strength</span>
                            <Badge>980 users</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
