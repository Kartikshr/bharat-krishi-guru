import { Button } from "@/components/ui/button";
import { Menu, Mic, Globe } from "lucide-react";

const Header = () => {
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
            <a href="#crop-detection" className="text-foreground hover:text-primary transition-colors">
              Disease Detection
            </a>
            <a href="#chatbot" className="text-foreground hover:text-primary transition-colors">
              AI Assistant
            </a>
            <a href="#weather" className="text-foreground hover:text-primary transition-colors">
              Weather
            </a>
            <a href="#market" className="text-foreground hover:text-primary transition-colors">
              Market Prices
            </a>
            <a href="#knowledge" className="text-foreground hover:text-primary transition-colors">
              Knowledge Hub
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Globe className="w-4 h-4 mr-2" />
              हिंदी
            </Button>
            <Button variant="outline" size="sm">
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