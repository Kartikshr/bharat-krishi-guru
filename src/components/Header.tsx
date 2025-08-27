import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, Mic, Globe, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">🌾</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Bharat Krishi Guru</h1>
              <p className="text-xs text-muted-foreground">कृषि का डिजिटल साथी</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/#crop-detection" className="text-foreground hover:text-primary transition-colors">
              Disease Detection
            </a>
            <a href="/#chatbot" className="text-foreground hover:text-primary transition-colors">
              AI Assistant
            </a>
            <a href="/#weather" className="text-foreground hover:text-primary transition-colors">
              Weather
            </a>
            <a href="/#market" className="text-foreground hover:text-primary transition-colors">
              Market Prices
            </a>
            <a href="/#knowledge" className="text-foreground hover:text-primary transition-colors">
              Knowledge Hub
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Avatar className="h-8 w-8 cursor-pointer" onClick={() => navigate("/dashboard")}>
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {user.email?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
                  Sign In
                </Button>
                <Button variant="default" size="sm" onClick={() => navigate("/auth")}>
                  Sign Up
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Globe className="w-4 h-4 mr-2" />
              हिंदी
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Mic className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;