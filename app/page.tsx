"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, TrendingUp, Users, Calendar, Star, Target, Menu, X } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { toast } = useToast()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 64 // 4rem (h-16) in pixels
      const elementPosition = element.offsetTop - navbarHeight - 20 // Extra 20px margin
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    // Close mobile menu after clicking
    setIsMenuOpen(false)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    toast({
      title: "✅ Welcome back!",
      description: "You have successfully logged in to FitTracker Pro.",
      className: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-800 shadow-lg",
      duration: 4000,
    })
  }

  const handleRegister = () => {
    setIsLoggedIn(true)
    toast({
      title: "✅ Account created successfully!",
      description: "Welcome to FitTracker Pro! Your fitness journey starts now.",
      className: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-800 shadow-lg",
      duration: 4000,
    })
  }

  const handleSignOut = () => {
    setIsLoggedIn(false)
    toast({
      title: "👋 Signed out successfully!",
      description: "You have been logged out. Come back anytime!",
      className: "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 text-blue-800 shadow-lg",
      duration: 3000,
    })
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Navigation Bar for Logged In Users */}
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FitTracker Pro
                </span>
              </div>
              
              {/* Navigation Links and Sign Out */}
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-red-600 text-red-600 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full shadow-lg">
                <Dumbbell className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Welcome to FitTracker Pro
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Your fitness journey starts here</p>
          </div>
          <div className="flex justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="text-lg px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FitTracker Pro
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                About
              </button>
              <Button 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => scrollToSection('auth')}
              >
                Sign In
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                  className="text-gray-600 hover:text-blue-600 transition-colors text-left"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-gray-600 hover:text-blue-600 transition-colors text-left"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('testimonials')} 
                  className="text-gray-600 hover:text-blue-600 transition-colors text-left"
                >
                  Testimonials
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-gray-600 hover:text-blue-600 transition-colors text-left"
                >
                  About
                </button>
                <Button 
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 w-fit"
                  onClick={() => scrollToSection('auth')}
                >
                  Sign In
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 md:p-6 rounded-full shadow-lg">
              <Dumbbell className="h-8 w-8 md:h-12 md:w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6">
            FitTracker Pro
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your fitness journey with our comprehensive tracking system. Log workouts, track nutrition,
            monitor progress, and achieve your goals with professional guidance.
          </p>
        </div>

        {/* Auth Section - Moved after header */}
        <div id="auth" className="flex justify-center mb-20 md:mb-24 scroll-mt-20">
          <div className="w-full max-w-md">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-2xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Get Started Today
                </CardTitle>
                <CardDescription className="text-base">
                  Join thousands of fitness enthusiasts achieving their goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login" className="text-sm md:text-base">
                      Login
                    </TabsTrigger>
                    <TabsTrigger value="register" className="text-sm md:text-base">
                      Register
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <Input id="email" type="email" placeholder="Enter your email" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <Input id="password" type="password" placeholder="Enter your password" className="h-11" />
                    </div>
                    <Button
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-base font-medium"
                      onClick={handleLogin}
                    >
                      Sign In
                    </Button>
                  </TabsContent>

                  <TabsContent value="register" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input id="name" placeholder="Enter your full name" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-reg" className="text-sm font-medium">
                        Email
                      </Label>
                      <Input id="email-reg" type="email" placeholder="Enter your email" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-reg" className="text-sm font-medium">
                        Password
                      </Label>
                      <Input id="password-reg" type="password" placeholder="Create a password" className="h-11" />
                    </div>
                    <Button
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-base font-medium"
                      onClick={handleRegister}
                    >
                      Create Account
                    </Button>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-24 scroll-mt-20 pt-16">
          <div className="col-span-full text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Our Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover powerful tools designed to transform your fitness journey
            </p>
          </div>
          
          <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg md:text-xl">Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm md:text-base">
                Monitor your fitness journey with detailed charts and analytics
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                <Calendar className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              </div>
              <CardTitle className="text-lg md:text-xl">Log Workouts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm md:text-base">Record your daily workouts and nutrition with ease</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                <img 
                  src="/diet-plan-icon.svg" 
                  alt="Diet Plans" 
                  className="w-full h-full object-contain"
                />
              </div>
              <CardTitle className="text-lg md:text-xl">Diet Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm md:text-base">Discover nutritious foods and their macro breakdowns</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 p-3 bg-orange-100 rounded-full w-fit">
                <Users className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
              </div>
              <CardTitle className="text-lg md:text-xl">Gym Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm md:text-base">
                Complete solution for gym staff and member management
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials */}
        <div id="testimonials" className="grid md:grid-cols-3 gap-6 mb-20 md:mb-24 scroll-mt-20 pt-16">
          <div className="col-span-full text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from people who transformed their fitness journey with FitTracker Pro
            </p>
          </div>
          
          <Card className="border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "FitTracker Pro completely transformed my workout routine. The progress tracking is incredible!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div>
                  <p className="font-semibold">Santosh Kumar Thakur</p>
                  <p className="text-sm text-gray-500">Fitness Enthusiast</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The nutrition tracking and diet plans helped me reach my goals faster than ever before."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                  SKT
                </div>
                <div>
                  <p className="font-semibold">Sarah Miller</p>
                  <p className="text-sm text-gray-500">Personal Trainer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "As a gym owner, the admin features make managing members and plans so much easier."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                  MJ
                </div>
                <div>
                  <p className="font-semibold">Mike Johnson</p>
                  <p className="text-sm text-gray-500">Gym Owner</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <div id="about" className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-20 md:mb-24 scroll-mt-20 pt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              About FitTracker Pro
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're dedicated to helping you achieve your fitness goals through innovative technology and comprehensive tracking.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To provide the most comprehensive and user-friendly fitness tracking platform that empowers individuals 
                to take control of their health and achieve their fitness goals through data-driven insights and personalized guidance.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Personalized fitness plans</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Advanced progress tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">Community support</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center p-6">
                <div className="text-2xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-2xl font-bold text-green-600 mb-2">1M+</div>
                <div className="text-sm text-gray-600">Workouts Logged</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-2xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-sm text-gray-600">User Satisfaction</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-2xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">FitTracker Pro</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Transform your fitness journey with our comprehensive tracking system. 
                Professional guidance for achieving your health and fitness goals.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:bg-gray-800">
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:bg-gray-800">
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:bg-gray-800">
                  Instagram
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</Link></li>
                <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/workouts" className="text-gray-400 hover:text-white transition-colors">Workouts</Link></li>
                <li><Link href="/nutrition" className="text-gray-400 hover:text-white transition-colors">Nutrition</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2021 FitTracker Pro. All rights reserved. Built with Santosh Kumar Thakur.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
