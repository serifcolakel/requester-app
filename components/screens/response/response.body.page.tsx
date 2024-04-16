import React from "react";

import CopyText from "@/components/copy-text";
import { Editor } from "@monaco-editor/react";

type Props = {
  data: unknown;
};

export default function ResponseBodyPage({ data }: Props) {
  return (
    <>
      <div className="flex w-full justify-end">
        <CopyText text={JSON.stringify(data, null, 2)} />
      </div>
      <Editor
        className="border overflow-hidden rounded-lg shadow-sm"
        defaultLanguage="json"
        height="60vh"
        options={{
          readOnly: true,
        }}
        value={JSON.stringify(data, null, 2)}
      />
    </>
  );
}
