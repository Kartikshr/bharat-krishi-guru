import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, FileText, Award, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "@/contexts/LocationContext";

interface Article {
  id: number;
  title: string;
  titleHindi: string;
  category: string;
  content: string;
  readTime: number;
  date: string;
  icon: any;
}

interface Scheme {
  id: number;
  name: string;
  nameHindi: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  application: string;
}

const KnowledgeHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<'articles' | 'schemes'>('articles');
  const { toast } = useToast();
  const { selectedLocation } = useLocation();

  const articles: Article[] = [
    {
      id: 1,
      title: "Organic Farming Best Practices",
      titleHindi: `${selectedLocation} में जैविक खेती की सर्वोत्तम प्रथाएं`,
      category: "Organic Farming",
      content: `Learn sustainable farming techniques specific to ${selectedLocation} that improve soil health and crop yield while protecting the environment...`,
      readTime: 5,
      date: "2024-12-20",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Integrated Pest Management",
      titleHindi: `${selectedLocation} में एकीकृत कीट प्रबंधन`,
      category: "Crop Protection",
      content: `Effective strategies to control pests in ${selectedLocation} using biological, cultural, and chemical methods in harmony...`,
      readTime: 7,
      date: "2024-12-18",
      icon: FileText
    },
    {
      id: 3,
      title: "Water Conservation Techniques",
      titleHindi: `${selectedLocation} में जल संरक्षण तकनीकें`,
      category: "Irrigation",
      content: `Modern irrigation methods and water-saving techniques for efficient farming in ${selectedLocation}...`,
      readTime: 6,
      date: "2024-12-15",
      icon: BookOpen
    },
    {
      id: 4,
      title: "Soil Health Management",
      titleHindi: `${selectedLocation} में मिट्टी स्वास्थ्य प्रबंधन`,
      category: "Soil Science",
      content: `Understanding soil composition, testing, and improvement strategies for better productivity in ${selectedLocation}...`,
      readTime: 8,
      date: "2024-12-12",
      icon: FileText
    }
  ];

  const schemes: Scheme[] = [
    {
      id: 1,
      name: "PM Kisan Samman Nidhi",
      nameHindi: "पीएम किसान सम्मान निधि",
      description: "Direct financial support of ₹6000 per year to eligible farmers",
      eligibility: ["Small and marginal farmers", "Land holding up to 2 hectares", "Valid Aadhaar card"],
      benefits: ["₹2000 every 4 months", "Direct bank transfer", "No paperwork after registration"],
      application: `Visit nearest CSC in ${selectedLocation} or online at pmkisan.gov.in`
    },
    {
      id: 2,
      name: "Pradhan Mantri Fasal Bima Yojana",
      nameHindi: "प्रधानमंत्री फसल बीमा योजना",
      description: "Crop insurance scheme providing financial support against crop loss",
      eligibility: ["All farmers (sharecroppers & tenant farmers)", "Notified crops", "Valid land documents"],
      benefits: ["Premium subsidy up to 95%", "Coverage for natural calamities", "Quick claim settlement"],
      application: `Through banks, CSCs in ${selectedLocation}, or insurance company portals`
    },
    {
      id: 3,
      name: "Soil Health Card Scheme",
      nameHindi: "मृदा स्वास्थ्य कार्ड योजना",
      description: "Free soil testing and nutrient-based fertilizer recommendations",
      eligibility: ["All farmers", "Valid land records", "Soil samples from registered fields"],
      benefits: ["Free soil testing", "Customized fertilizer recommendations", "Improved crop productivity"],
      application: `Contact local agriculture department in ${selectedLocation} or soil testing labs`
    }
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.titleHindi.includes(searchTerm) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSchemes = schemes.filter(scheme =>
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.nameHindi.includes(searchTerm) ||
    scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openArticle = (article: Article) => {
    toast({
      title: "Opening Article",
      description: `Reading: ${article.title}`
    });
  };

  const applyScheme = (scheme: Scheme) => {
    toast({
      title: "Application Info",
      description: `Application process: ${scheme.application}`
    });
  };

  return (
    <section id="knowledge" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Knowledge Hub
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access comprehensive farming guides, best practices, and government schemes for {selectedLocation} in Hindi and English
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="shadow-feature">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-primary" />
                  Digital Library
                </CardTitle>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search articles or schemes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
                <Button
                  variant={activeTab === 'articles' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('articles')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Articles
                </Button>
                <Button
                  variant={activeTab === 'schemes' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('schemes')}
                >
                  <Award className="w-4 h-4 mr-2" />
                  Schemes
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              {activeTab === 'articles' ? (
                <div className="space-y-4">
                  {filteredArticles.map((article) => (
                    <Card key={article.id} className="shadow-card hover:shadow-feature transition-shadow cursor-pointer" onClick={() => openArticle(article)}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-nature-light rounded-lg">
                            <article.icon className="w-6 h-6 text-nature-dark" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-lg text-primary mb-1">{article.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{article.titleHindi}</p>
                                <span className="inline-block px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                                  {article.category}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-sm text-foreground mb-3 line-clamp-2">
                              {article.content}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  <span>{article.date}</span>
                                </div>
                                <div className="flex items-center">
                                  <BookOpen className="w-3 h-3 mr-1" />
                                  <span>{article.readTime} min read</span>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="text-xs h-auto p-1">
                                Read More →
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSchemes.map((scheme) => (
                    <Card key={scheme.id} className="shadow-card">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-accent/20 rounded-lg">
                            <Award className="w-6 h-6 text-accent" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-bold text-lg text-primary mb-1">{scheme.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{scheme.nameHindi}</p>
                                <p className="text-sm text-foreground">{scheme.description}</p>
                              </div>
                              <Button onClick={() => applyScheme(scheme)} variant="accent" size="sm">
                                <Users className="w-4 h-4 mr-2" />
                                Apply
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold text-nature-dark mb-2">Eligibility:</h4>
                                <ul className="space-y-1">
                                  {scheme.eligibility.map((item, index) => (
                                    <li key={index} className="text-xs text-foreground flex items-center">
                                      <div className="w-1 h-1 bg-nature-medium rounded-full mr-2"></div>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-accent mb-2">Benefits:</h4>
                                <ul className="space-y-1">
                                  {scheme.benefits.map((item, index) => (
                                    <li key={index} className="text-xs text-foreground flex items-center">
                                      <div className="w-1 h-1 bg-accent rounded-full mr-2"></div>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {((activeTab === 'articles' && filteredArticles.length === 0) || 
                (activeTab === 'schemes' && filteredSchemes.length === 0)) && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchTerm ? "No results found for your search" : `No ${activeTab} available`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHub;