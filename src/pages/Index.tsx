import Hero from "@/components/Hero";
import CropDiseaseDetection from "@/components/CropDiseaseDetection";
import AIChatbot from "@/components/AIChatbot";
import WeatherRecommendations from "@/components/WeatherRecommendations";
import MarketPrices from "@/components/MarketPrices";
import KnowledgeHub from "@/components/KnowledgeHub";

const Index = () => {
  return (
    <>
      <Hero />
      <CropDiseaseDetection />
      <AIChatbot />
      <WeatherRecommendations />
      <MarketPrices />
      <KnowledgeHub />
    </>
  );
};

export default Index;
