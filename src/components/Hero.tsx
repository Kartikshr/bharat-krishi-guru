import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, MessageCircle, CloudRain } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Indian Agriculture - Farmers using modern technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center text-primary-foreground">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t('hero.title')}
            <span className="block text-2xl md:text-3xl mt-2 opacity-90">
              {t('hero.subtitle')}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent-hover"
              onClick={() => document.getElementById('crop-detection')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Camera className="w-5 h-5 mr-2" />
              {t('hero.detectDisease')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t('hero.askAI')}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <Camera className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Disease Detection</h3>
              <h3 className="font-semibold mb-2">{t('features.diseaseDetection')}</h3>
              <p className="text-sm opacity-80">{t('features.diseaseDesc')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Multilingual Assistant</h3>
              <h3 className="font-semibold mb-2">{t('features.multilingualAssistant')}</h3>
              <p className="text-sm opacity-80">{t('features.assistantDesc')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <CloudRain className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Smart Recommendations</h3>
              <h3 className="font-semibold mb-2">{t('features.smartRecommendations')}</h3>
              <p className="text-sm opacity-80">{t('features.recommendationsDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;