import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, LogOut, Sprout, Cloud, TrendingUp, Book, Bot, Camera } from "lucide-react";

interface Profile {
  id: string;
  full_name: string;
  farm_name: string;
  location: string;
  farm_size: number;
  crops: string[];
}

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication and get user data
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);
      await fetchProfile(session.user.id);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate("/auth");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      setProfile(data);
    } catch (error: any) {
      toast.error("Error fetching profile: " + error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
    } catch (error: any) {
      toast.error("Error signing out: " + error.message);
    }
  };

  const dashboardStats = [
    { title: "Disease Detections", count: "12", icon: Camera, color: "bg-destructive" },
    { title: "AI Consultations", count: "8", icon: Bot, color: "bg-primary" },
    { title: "Weather Alerts", count: "3", icon: Cloud, color: "bg-accent" },
    { title: "Knowledge Articles", count: "25", icon: Book, color: "bg-nature-medium" },
  ];

  const quickActions = [
    { title: "Detect Disease", description: "Upload crop image for AI analysis", icon: Camera, href: "/#disease-detection" },
    { title: "Ask AI Assistant", description: "Get farming advice", icon: Bot, href: "/#ai-chatbot" },
    { title: "Check Weather", description: "View weather recommendations", icon: Cloud, href: "/#weather" },
    { title: "Market Prices", description: "Check current crop prices", icon: TrendingUp, href: "/#market-prices" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Welcome, {profile?.full_name || user?.email}
              </h1>
              <p className="text-sm text-muted-foreground">
                {profile?.farm_name || "Farmer"} • {profile?.location || "Location not set"}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.count}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Farm Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Farm Name</p>
                <p className="font-medium">{profile?.farm_name || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{profile?.location || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Farm Size</p>
                <p className="font-medium">{profile?.farm_size ? `${profile.farm_size} acres` : "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Crops</p>
                <div className="flex flex-wrap gap-2">
                  {profile?.crops?.length ? (
                    profile.crops.map((crop, index) => (
                      <Badge key={index} variant="secondary">
                        <Sprout className="h-3 w-3 mr-1" />
                        {crop}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No crops added</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Access your farming tools quickly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="border-2 hover:border-primary transition-colors cursor-pointer" onClick={() => window.location.href = action.href}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <action.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{action.title}</h3>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest farming activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Camera className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Disease detection on tomato crops</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Bot className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Asked about pest control methods</p>
                  <p className="text-sm text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Cloud className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Checked weather forecast</p>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;