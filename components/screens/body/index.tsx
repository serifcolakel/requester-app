/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */

"use client";

import React, { useState } from "react";

import Editor, { OnChange } from "@monaco-editor/react";
import { Request } from "@prisma/client";

type Props = {
  request: Request;
  handleToogle: (condition: boolean) => void;
};

export default function BodyPage({ request, handleToogle }: Props) {
  const [editorValue, setEditorValue] = useState<string | undefined>();

  const handleEditorChange: OnChange = (value) => {
    setEditorValue(value);
  };

  return (
    <div className="space-y-4 h-full">
      <button
        className="hidden"
        onClick={() => handleToogle(false)}
        type="button"
      >
        +
      </button>
      <Editor
        className="border overflow-hidden rounded-lg shadow-sm"
        defaultLanguage="json"
        defaultValue={JSON.stringify(request, null, 2)}
        height="60vh"
        onChange={handleEditorChange}
        value={editorValue}
      />
    </div>
  );
}
