import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface QuestionsSectionProps {
  newComment: string;
  setNewComment: (c: string) => void;
}

const QuestionsSection: React.FC<QuestionsSectionProps> = ({ newComment, setNewComment }) => (
  <div className="mt-12">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Questions & Answers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="comment">Ask a question</Label>
          <Textarea
            id="comment"
            placeholder="Ask anything about this product..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button>Post Question</Button>
        </div>
        <Separator />
        {/* Comments List can be added here */}
      </CardContent>
    </Card>
  </div>
);

export default QuestionsSection; 