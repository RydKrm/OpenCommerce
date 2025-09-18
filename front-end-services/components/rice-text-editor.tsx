"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import { Jodit } from "jodit-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// ✅ Load JoditEditor dynamically to avoid SSR issues
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter description...",
}: RichTextEditorProps) {
  const editor = useRef<any>(null);

  return (
    <div className="space-y-2">
      <Label>Description *</Label>
      <JoditEditor
        ref={editor}
        value={value}
        tabIndex={1}
        // @ts-ignore
        placeholder={placeholder}
        onBlur={(newContent) => onChange(newContent)}
        config={{
          readonly: false,
          height: 200,
          toolbarSticky: true,
          toolbarButtonSize: "middle",
          buttons: [
            "bold",
            "italic",
            "underline",
            "|",
            "ul",
            "ol",
            "|",
            "link",
            "image",
            "|",
            "undo",
            "redo",
            "|",
            "source",
          ],
          showXPathInStatusbar: false,
        }}
      />
      <div className="text-xs text-muted-foreground">
        {value.replace(/<[^>]*>/g, "").length} characters
      </div>
    </div>
  );
}
