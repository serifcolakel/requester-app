/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader, Plus, Save } from "lucide-react";

import EmptyState from "@/components/empty-states/empty.state";
import AddBody from "@/components/screens/body/add.body";
import EditBody from "@/components/screens/body/edit.body";
import { Button } from "@/components/ui/button";
import { createNewBody, getRequestBody } from "@/services/body/actions";
import Editor, { OnChange } from "@monaco-editor/react";
import { Body, Request } from "@prisma/client";

type Props = {
  request: Request;
  handleToogle: (condition: boolean) => void;
};

export default function BodyPage({ request, handleToogle }: Props) {
  const [editorValue, setEditorValue] = useState<string | undefined>();

  const [loading, setLoading] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [bodyDetail, setBodyDetail] = useState<Body>();

  const prepareBody = async () => {
    handleToogle(true);
    setLoading(true);
    const res = await getRequestBody(request.id);

    if (res.data && res.data?.[0]) {
      setEditorValue(res.data[0].content);
      setBodyDetail(res.data[0]);
    }

    handleToogle(false);
    setLoading(false);
  };

  useEffect(() => {
    prepareBody();
  }, []);

  const handleEditorChange: OnChange = (value) => {
    setEditorValue(value);
  };

  const hanleCreate = async (formData: FormData) => {
    const res = await createNewBody(formData);

    if (res.success) {
      await prepareBody();
    }
  };

  if (loading) {
    return (
      <EmptyState description="Preparing Body..." title="Please wait...">
        <Loader className="animate-spin" />
      </EmptyState>
    );
  }

  const hasChanged = editorValue !== bodyDetail?.content;

  return (
    <div className="space-y-4 h-full">
      {!bodyDetail ? (
        <EmptyState>
          <AddBody action={hanleCreate} requestId={request.id}>
            <Button tooltip="Add New Body" type="submit">
              <span className="sr-only">Add New Body</span>
              <Plus className="w-4 h-4" />
              Add New Body
            </Button>
          </AddBody>
        </EmptyState>
      ) : (
        <div className="relative w-full">
          <Editor
            className="border overflow-hidden rounded-lg shadow-sm"
            defaultLanguage="json"
            defaultValue={JSON.stringify(request, null, 2)}
            height="60vh"
            onChange={handleEditorChange}
            value={editorValue}
          />
          {bodyDetail && hasChanged && editorValue && (
            <EditBody
              content={editorValue}
              id={bodyDetail.id}
              requestId={request.id}
              type={bodyDetail.type}
            >
              <Button
                className="absolute py-0 px-1 z-50 right-2 top-1/2 transform -translate-y-1/2 hover:text-primary"
                ref={buttonRef}
                size="xs"
                tooltip="You have unsaved changes"
                type="submit"
                variant="icon"
              >
                <Save className="w-4 h-4" />
              </Button>
            </EditBody>
          )}
        </div>
      )}
    </div>
  );
}
