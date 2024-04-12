"use client";

import { useState } from "react";
import { Check, CopyIcon } from "lucide-react";

import { Button } from "../ui/button";

type Props = {
  text: string;
  delay?: number;
};

export default function CopyText({ text, delay = 2000 }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), delay);
  };

  return (
    <Button
      className="h-6 p-2"
      onClick={copyToClipboard}
      tooltip={copied ? "Copied!" : "Copy to clipboard"}
      type="button"
      variant="icon"
    >
      {copied ? (
        <Check className="h-4 w-4" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
