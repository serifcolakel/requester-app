import React from "react";

import CopyText from "@/components/copy-text";
import { getDataType } from "@/utils/generate.types.utils";
import { Editor } from "@monaco-editor/react";

type Props = {
  data: unknown;
};

export default function ResponseTypePage({ data }: Props) {
  const value = getDataType(data);

  return (
    <>
      <div className="flex w-full justify-end">
        <CopyText text={value} />
      </div>
      <Editor
        className="border overflow-hidden rounded-lg shadow-sm"
        defaultLanguage="typescript"
        height="60vh"
        options={{
          readOnly: true,
        }}
        value={value}
      />
    </>
  );
}
