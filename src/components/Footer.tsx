import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Globe, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">🌾</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Bharat Krishi Guru</h3>
                <p className="text-xs opacity-80">कृषि का डिजिटल साथी</p>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Empowering Indian farmers with AI-powered solutions for better crop management, 
              disease detection, and market insights.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Globe className="w-4 h-4 mr-2" />
                हिंदी
              </Button>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#crop-detection" className="hover:opacity-100 transition-opacity">Disease Detection</a></li>
              <li><a href="#chatbot" className="hover:opacity-100 transition-opacity">AI Assistant</a></li>
              <li><a href="#weather" className="hover:opacity-100 transition-opacity">Weather Recommendations</a></li>
              <li><a href="#market" className="hover:opacity-100 transition-opacity">Market Prices</a></li>
              <li><a href="#knowledge" className="hover:opacity-100 transition-opacity">Knowledge Hub</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Help Center</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">User Guide</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Tutorials</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">FAQs</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Contact Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm opacity-80">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>+91 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>support@bharatkrishiguru.in</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                <span>Agricultural Technology Center, New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
          <p>© 2024 Bharat Krishi Guru. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 mx-1 text-accent" />
            <span>for Indian Farmers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;