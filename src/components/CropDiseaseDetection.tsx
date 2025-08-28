import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Camera, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import cropDiseaseIcon from "@/assets/crop-disease-icon.png";
import { useLocation } from "@/contexts/LocationContext";

const CropDiseaseDetection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  const { selectedLocation } = useLocation();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
    }
  };

  const analyzeCropImage = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis - Replace with actual AI model integration
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResult = {
        disease: "Late Blight",
        confidence: 87,
        description: `A serious disease affecting potato and tomato crops in ${selectedLocation}, caused by Phytophthora infestans. Common in this region's climate conditions.`,
        treatments: {
          chemical: [
            `Apply Mancozeb 75% WP @ 2-2.5 kg/ha (suitable for ${selectedLocation} conditions)`, 
            "Use Copper Oxychloride 50% WP @ 2.5-3 kg/ha"
          ],
          organic: [
            "Neem oil spray 3ml/liter", 
            "Bordeaux mixture application", 
            `Improve field drainage (important for ${selectedLocation} climate)`
          ]
        },
        prevention: [
          `Plant resistant varieties suitable for ${selectedLocation}`, 
          "Ensure proper spacing for local climate", 
          "Remove infected plant debris"
        ]
      };
      
      setResult(mockResult);
      toast({
        title: "Analysis Complete",
        description: "Crop disease detected successfully!",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please try again with a clearer image.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="crop-detection" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <img src={cropDiseaseIcon} alt="Crop Disease Detection" className="w-20 h-20 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Crop Disease Detection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a photo of your crop and get instant AI-powered disease diagnosis with treatment recommendations for {selectedLocation}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-primary" />
                  Upload Crop Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    id="crop-image"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label htmlFor="crop-image" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Click to upload crop image</p>
                    <p className="text-sm text-muted-foreground">Supports JPG, PNG files</p>
                  </label>
                </div>

                {selectedFile && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Selected: {selectedFile.name}
                    </p>
                    <Button 
                      onClick={analyzeCropImage}
                      disabled={isAnalyzing}
                      className="w-full"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Analyze Crop Disease
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-accent" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
                      <h3 className="font-bold text-lg text-accent mb-2">{result.disease}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Confidence: {result.confidence}%
                      </p>
                      <p className="text-sm">{result.description}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-nature-dark mb-2">Chemical Treatment:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {result.treatments.chemical.map((treatment: string, index: number) => (
                            <li key={index} className="text-sm text-foreground">{treatment}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-nature-medium mb-2">Organic Treatment:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {result.treatments.organic.map((treatment: string, index: number) => (
                            <li key={index} className="text-sm text-foreground">{treatment}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-earth-dark mb-2">Prevention Tips:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {result.prevention.map((tip: string, index: number) => (
                            <li key={index} className="text-sm text-foreground">{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      Upload an image to see analysis results
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CropDiseaseDetection;