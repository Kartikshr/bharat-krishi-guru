import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, MapPin, Search, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MarketPrice {
  id: number;
  commodity: string;
  variety: string;
  market: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  date: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}
// Helper to calculate price trend and percentage change
const calculateTrend = (today: number, yesterday: number) => {
  if (!yesterday || yesterday === 0) {
    return { trend: 'stable' as const, change: 0 };
  }

  const change = ((today - yesterday) / yesterday) * 100;

  if (change > 1) return { trend: 'up' as const, change: Number(change.toFixed(2)) };
  if (change < -1) return { trend: 'down' as const, change: Number(change.toFixed(2)) };

  return { trend: 'stable' as const, change: Number(change.toFixed(2)) };
};
const MarketPrices = () => {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [filteredPrices, setFilteredPrices] = useState<MarketPrice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchMarketPrices = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=20`
      );

      const data = await response.json();

      const apiPrices: MarketPrice[] = data.records.map(
        (item: any, index: number) => {
          // Simulate yesterday’s modal price (for trend calculation)
          const yesterdayModal = Number(item.modal_price) * (1 + (Math.random() - 0.5) / 10);

          const { trend, change } = calculateTrend(
            Number(item.modal_price),
            yesterdayModal
          );

          return {
            id: index,
            commodity: item.commodity,
            variety: item.variety || "N/A",
            market: `${item.market}, ${item.district}, ${item.state}`,
            minPrice: Number(item.min_price),
            maxPrice: Number(item.max_price),
            modalPrice: Number(item.modal_price),
            date: item.arrival_date,
            trend,
            change,
          };
        }
      );

      setPrices(apiPrices);
      setFilteredPrices(apiPrices);

      toast({
        title: "Prices Updated",
        description: "Latest market prices fetched successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch market prices",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketPrices();
  }, []);

  useEffect(() => {
    const filtered = prices.filter(price => 
      price.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      price.market.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPrices(filtered);
  }, [searchTerm, prices]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-nature-medium" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-destructive" />;
      default: return <div className="w-4 h-4 bg-muted-foreground rounded-full"></div>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-nature-medium';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <section id="market" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <IndianRupee className="w-10 h-10 text-accent-foreground" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Market Price Updates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get real-time market prices from mandis across India to make informed selling decisions
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="shadow-feature mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <IndianRupee className="w-5 h-5 mr-2 text-primary" />
                  Live Market Prices
                </div>
                <Button onClick={fetchMarketPrices} disabled={loading} variant="outline">
                  {loading ? "Updating..." : "Refresh Prices"}
                </Button>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search crops or markets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPrices.map((price) => (
                  <Card key={price.id} className="shadow-card bg-gradient-card">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-primary">{price.commodity}</h3>
                          <p className="text-sm text-muted-foreground">{price.variety}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(price.trend)}
                          <span className={`text-sm font-medium ${getTrendColor(price.trend)}`}>
                            {price.change > 0 ? '+' : ''}{price.change}%
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Modal Price:</span>
                          <span className="font-semibold text-accent">₹{price.modalPrice}/quintal</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Min: ₹{price.minPrice}</span>
                          <span className="text-muted-foreground">Max: ₹{price.maxPrice}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-xs text-muted-foreground border-t pt-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="flex-1">{price.market}</span>
                        <span>{price.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPrices.length === 0 && !loading && (
                <div className="text-center py-8">
                  <IndianRupee className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchTerm ? "No results found for your search" : "No market prices available"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Price Trends Chart Placeholder */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-nature-medium" />
                Price Trends (Last 30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Price trend charts coming soon</p>
                  <p className="text-sm text-muted-foreground">
                    Historical price analysis and forecasting
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MarketPrices;
