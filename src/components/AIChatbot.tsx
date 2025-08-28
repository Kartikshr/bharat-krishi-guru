import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Mic, MicOff, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import chatbotIcon from "@/assets/chatbot-icon.png";
import { useLocation } from "@/contexts/LocationContext";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "नमस्कार! मैं आपका कृषि सहायक हूँ। आप मुझसे फसल, उर्वरक, सिंचाई, या सरकारी योजनाओं के बारे में पूछ सकते हैं।",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { selectedLocation } = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userQuery = input;
    setInput("");
    setIsLoading(true);

    // Real Gemini API integration
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': 'AIzaSyAL2-SMsbV4m_Ztt2dwe8_lQSx9bTQ1cKU'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an agricultural assistant for Indian farmers in ${selectedLocation}. Answer in Hindi and English as appropriate. Focus on practical farming advice, crop management, fertilizers, government schemes, and agricultural best practices specific to ${selectedLocation} region. Consider local climate, soil conditions, and regional farming practices. User query: ${userQuery}`
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response. Please try again.";
      
      const botResponse: Message = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Fallback to local responses if API fails
      const fallbackResponse: Message = {
        id: Date.now() + 1,
        text: generateLocalFallback(userQuery),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fallbackResponse]);
      
      toast({
        title: "Using Offline Mode",
        description: "AI service temporarily unavailable. Using local knowledge base.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }

    setTimeout(scrollToBottom, 100);
  };

  const generateLocalFallback = (userInput: string): string => {
    // Fallback responses when Gemini API is unavailable
    const lowerInput = userInput.toLowerCase();
    const locationContext = `for ${selectedLocation} region`;
    
    if (lowerInput.includes('fertilizer') || lowerInput.includes('उर्वरक')) {
      return `मैं ${selectedLocation} के लिए उर्वरक के बारे में बता सकता हूँ। आपकी फसल के लिए NPK उर्वरक (नाइट्रोजन, फास्फोरस, पोटेशियम) का संतुलित उपयोग करें। धान के लिए यूरिया 120 kg/हेक्टेयर, DAP 60 kg/हेक्टेयर की सिफारिश की जाती है।`;
    } else if (lowerInput.includes('irrigation') || lowerInput.includes('सिंचाई')) {
      return `${selectedLocation} में सिंचाई के लिए मिट्टी की नमी जांचें। ड्रिप इरिगेशन सबसे बेहतर है - यह 30-50% पानी बचाता है। स्थानीय जलवायु के अनुसार सिंचाई करें।`;
    } else if (lowerInput.includes('scheme') || lowerInput.includes('योजना')) {
      return `${selectedLocation} में उपलब्ध सरकारी कृषि योजनाएं: PM किसान सम्मान निधि (₹6000/वर्ष), फसल बीमा योजना, मृदा स्वास्थ्य कार्ड योजना, किसान क्रेडिट कार्ड। स्थानीय कृषि कार्यालय से संपर्क करें।`;
    } else {
      return `मैं ${selectedLocation} के लिए कृषि सहायक हूँ। आप फसल की बीमारी, उर्वरक, सिंचाई, बाजार की कीमत और स्थानीय सरकारी योजनाओं के बारे में पूछ सकते हैं।`;
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input implementation would go here
    toast({
      title: "Voice Input",
      description: isListening ? "Voice input stopped" : "Voice input started"
    });
  };

  const speakMessage = (text: string) => {
    // Text-to-speech implementation would go here
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <section id="chatbot" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <img src={chatbotIcon} alt="AI Chatbot" className="w-20 h-20 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            AI Agricultural Assistant
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ask questions in Hindi or English about farming, fertilizers, government schemes, and more
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-feature">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                Chat with AI Krishi Guru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Messages Area */}
                <div className="h-96 overflow-y-auto space-y-3 p-4 bg-muted/30 rounded-lg">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card text-card-foreground shadow-card'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        {message.sender === 'bot' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => speakMessage(message.text)}
                            className="mt-2 p-1 h-auto"
                          >
                            <Volume2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-card text-card-foreground p-3 rounded-lg shadow-card">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="flex space-x-2">
                  <Button
                    variant={isListening ? "destructive" : "outline"}
                    size="sm"
                    onClick={toggleVoiceInput}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about crops, fertilizers, schemes... (Hindi/English)"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Questions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInput("धान की फसल के लिए कौन सा उर्वरक बेहतर है?")}
                  >
                    Rice Fertilizer
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInput("PM किसान योजना की जानकारी दें")}
                  >
                    PM Kisan Scheme
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInput("गेहूं की बुवाई का सही समय क्या है?")}
                  >
                    Wheat Sowing
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIChatbot;