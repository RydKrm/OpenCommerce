"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Code,
  Undo,
  Redo,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter description...",
  className,
}: RichTextEditorProps) {
  const [isFocused, setIsFocused] = useState(false);

  const executeCommand = useCallback(
    (command: string, value?: string) => {
      document.execCommand(command, false, value);
      // Trigger onChange to update the parent component
      const editor = document.getElementById("rich-editor");
      if (editor) {
        onChange(editor.innerHTML);
      }
    },
    [onChange]
  );

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      onChange(target.innerHTML);
    },
    [onChange]
  );

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  }, []);

  const toolbarButtons = [
    { icon: Bold, command: "bold", title: "Bold" },
    { icon: Italic, command: "italic", title: "Italic" },
    { icon: Underline, command: "underline", title: "Underline" },
    { type: "separator" },
    { icon: AlignLeft, command: "justifyLeft", title: "Align Left" },
    { icon: AlignCenter, command: "justifyCenter", title: "Align Center" },
    { icon: AlignRight, command: "justifyRight", title: "Align Right" },
    { type: "separator" },
    { icon: List, command: "insertUnorderedList", title: "Bullet List" },
    { icon: ListOrdered, command: "insertOrderedList", title: "Numbered List" },
    { type: "separator" },
    {
      icon: Quote,
      command: "formatBlock",
      value: "blockquote",
      title: "Quote",
    },
    { icon: Code, command: "formatBlock", value: "pre", title: "Code Block" },
    { type: "separator" },
    {
      icon: Link,
      command: "createLink",
      title: "Insert Link",
      requiresInput: true,
    },
    {
      icon: ImageIcon,
      command: "insertImage",
      title: "Insert Image",
      requiresInput: true,
    },
    { icon: Undo, command: "undo", title: "Undo" },
    { icon: Redo, command: "redo", title: "Redo" },
  ];

  const handleButtonClick = (button: any) => {
    if (button.requiresInput) {
      const input = prompt("Enter URL or Image URL:");
      if (input) {
        executeCommand(button.command, input);
      }
    } else if (button.value) {
      executeCommand(button.command, button.value);
    } else {
      executeCommand(button.command);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label>Description *</Label>
      <div
        className={cn(
          "border rounded-lg overflow-hidden transition-colors",
          isFocused ? "ring-2 ring-ring ring-offset-2" : ""
        )}>
        {/* Toolbar */}
        <div className="border-b bg-muted/30 p-2">
          <div className="flex items-center gap-1 flex-wrap">
            {toolbarButtons.map((button, index) => {
              if (button.type === "separator") {
                return <div key={index} className="w-px h-6 bg-border mx-1" />;
              }

              const Icon = button.icon;
              return (
                <Button
                  key={index}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleButtonClick(button)}
                  title={button.title}>
                  {/* <Icon className="h-4 w-4" /> */}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Editor */}
        <div
          id="rich-editor"
          contentEditable
          className={cn(
            "min-h-[120px] p-3 focus:outline-none",
            "prose prose-sm max-w-none",
            "[&_p]:my-2 [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base",
            "[&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6",
            "[&_blockquote]:border-l-4 [&_blockquote]:border-muted-foreground [&_blockquote]:pl-4 [&_blockquote]:italic",
            "[&_pre]:bg-muted [&_pre]:p-2 [&_pre]:rounded [&_pre]:font-mono [&_pre]:text-sm",
            "[&_a]:text-primary [&_a]:underline"
          )}
          dangerouslySetInnerHTML={{ __html: value }}
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onPaste={handlePaste}
          data-placeholder={placeholder}
          style={{
            minHeight: "120px",
          }}
        />

        {/* Placeholder */}
        {!value && (
          <div className="absolute inset-0 top-[52px] left-3 text-muted-foreground pointer-events-none">
            {placeholder}
          </div>
        )}
      </div>

      {/* Character count and formatting help */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Use the toolbar above to format your description</span>
        <span>{value.replace(/<[^>]*>/g, "").length} characters</span>
      </div>
    </div>
  );
}
