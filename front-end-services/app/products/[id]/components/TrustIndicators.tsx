import React from "react";
import { Truck, Shield, RotateCcw } from "lucide-react";

const TrustIndicators: React.FC = () => (
  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
    <div className="text-center space-y-2">
      <Truck className="w-6 h-6 mx-auto text-muted-foreground" />
      <div className="text-xs">
        <div className="font-medium">Free Shipping</div>
        <div className="text-muted-foreground">Orders over $50</div>
      </div>
    </div>
    <div className="text-center space-y-2">
      <Shield className="w-6 h-6 mx-auto text-muted-foreground" />
      <div className="text-xs">
        <div className="font-medium">2 Year Warranty</div>
        <div className="text-muted-foreground">Full coverage</div>
      </div>
    </div>
    <div className="text-center space-y-2">
      <RotateCcw className="w-6 h-6 mx-auto text-muted-foreground" />
      <div className="text-xs">
        <div className="font-medium">Easy Returns</div>
        <div className="text-muted-foreground">30-day policy</div>
      </div>
    </div>
  </div>
);

export default TrustIndicators; 