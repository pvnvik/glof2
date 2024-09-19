"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Camera,
  CloudRain,
  Droplets,
  Home,
  Layers,
  Settings,
  Thermometer,
  Upload
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter, useSearchParams } from "next/navigation"

export function AdminDashboard() {
  const [alertMessage, setAlertMessage] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would send the alert to relevant systems/personnel
    console.log("Alert sent:", alertMessage)
    setAlertMessage("")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0])
      // In a real application, you would upload and analyze the image here
      console.log("Image uploaded:", e.target.files[0].name)
    }
  }

  const router = useRouter()
  const searchParams = useSearchParams()
  const showDialog = searchParams.get('dialog') === 'alert'

  const openDialog = () => {
    router.push('?dialog=alert')
  }

  const closeDialog = () => {
    router.push('/')
  }

  const sendAlert = () => {
    // Add your emergency alert logic here
    console.log("Emergency alert sent!")
    closeDialog()
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-zinc-950">
      <aside className="w-64 bg-white dark:bg-gray-800 p-4">
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Layers className="mr-2 h-4 w-4" />
            Sensor Data
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CloudRain className="mr-2 h-4 w-4" />
            Weather
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Bell className="mr-2 h-4 w-4" />
            Alerts
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-zinc-950">GLOF Monitoring Dashboard</h1>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={openDialog}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Emergency Alert
          </Button>
        </div>
        <Dialog open={showDialog} onOpenChange={closeDialog}>
        <DialogContent className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">Emergency Alert</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300 mt-2">
              This will send an emergency alert to all affected areas. Are you sure you want to proceed?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="default" onClick={closeDialog}>Cancel</Button>
            <Button variant="destructive" onClick={sendAlert}>
              Send Alert
            </Button>
          </div>
        </DialogContent>
      </Dialog>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Level</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15.2m</div>
              <p className="text-xs text-muted-foreground">+0.5m from last hour</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7°C</div>
              <p className="text-xs text-muted-foreground">-2°C from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Precipitation</CardTitle>
              <CloudRain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.5mm</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GLOF Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">Moderate</div>
              <p className="text-xs text-muted-foreground">Increased from Low</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Geographic Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md overflow-hidden">
                <img
                  src="https://www.researchgate.net/publication/339772246/figure/fig3/AS:866679114461237@1583643811852/GLOF-damage-extents-of-Barah-village-habitat.jpg"
                  alt="Geographic map showing potential GLOF impact areas"
                  className="object-cover w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Predictive Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-red-500 mr-2" />
                  High risk of GLOF in next 48 hours
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-yellow-500 mr-2" />
                  Increased glacial melt rate detected
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-green-500 mr-2" />
                  Stable conditions in southern region
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Tabs defaultValue="alerts">
            <TabsList>
              <TabsTrigger value="alerts">Emergency Alerts</TabsTrigger>
              <TabsTrigger value="upload">Image Upload & Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="alerts">
              <Card>
                <CardHeader>
                  <CardTitle>Issue Emergency Alert</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAlertSubmit}>
                    <div className="grid w-full gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="alert-message">Alert Message</Label>
                        <Textarea
                          id="alert-message"
                          placeholder="Enter emergency alert message"
                          value={alertMessage}
                          onChange={(e) => setAlertMessage(e.target.value)}
                        />
                      </div>
                      <Button type="submit" onClick={openDialog} >Send Alert</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Image for Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="image-upload">Select Image</Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                    {selectedImage && (
                      <div className="flex items-center space-x-2">
                        <Camera className="h-4 w-4" />
                        <span>{selectedImage.name}</span>
                      </div>
                    )}
                    <Button disabled={!selectedImage}>
                      <Upload className="mr-2 h-4 w-4" />
                      Analyze Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}