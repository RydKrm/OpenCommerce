import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => (
  <div className="mt-12">
    <Card>
      <CardHeader>
        <CardTitle>Product Description</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="prose prose-sm max-w-none [&_h3]:text-lg [&_h4]:text-base [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_blockquote]:border-l-4 [&_blockquote]:border-muted-foreground [&_blockquote]:pl-4 [&_blockquote]:italic [&_strong]:font-semibold"
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />
      </CardContent>
    </Card>
  </div>
);

export default ProductDescription; 