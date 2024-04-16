/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { Loader, Plus, Save } from "lucide-react";

import EmptyState from "@/components/empty-states/empty.state";
import AddBody from "@/components/screens/body/add.body";
import EditBody from "@/components/screens/body/edit.body";
import { Button } from "@/components/ui/button";
import {
  createNewBody,
  getRequestBody,
  updateBody,
} from "@/services/body/actions";
import { editorValuesAtom } from "@/store/atoms";
import Editor, { OnChange } from "@monaco-editor/react";
import { Body, Request } from "@prisma/client";

type Props = {
  request: Request;
  handleToogle: (condition: boolean) => void;
};

export default function BodyPage({ request, handleToogle }: Props) {
  const [editorValues, setEditorValues] = useAtom(editorValuesAtom);

  const [loading, setLoading] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [bodyDetail, setBodyDetail] = useState<Body>();

  const prepareBody = async () => {
    handleToogle(true);
    setLoading(true);
    const res = await getRequestBody(request.id);

    if (res.data && res.data && res.data.content) {
      setEditorValues({
        ...editorValues,
        body: editorValues.body || res.data.content,
      });
      setBodyDetail(res.data);
    }

    handleToogle(false);
    setLoading(false);
  };

  useEffect(() => {
    prepareBody();
  }, []);

  const handleEditorChange: OnChange = (value) => {
    setEditorValues({
      ...editorValues,
      body: value,
    });
  };

  const handleCreate = async (formData: FormData) => {
    const res = await createNewBody(formData);

    if (res.data) {
      await prepareBody();
    }
  };

  const handleUpdate = async (formData: FormData) => {
    const res = await updateBody(formData);

    if (res.data) {
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

  const hasChanged = editorValues.body !== bodyDetail?.content;

  return (
    <div className="space-y-4 h-full">
      {!bodyDetail ? (
        <EmptyState>
          <AddBody action={handleCreate} requestId={request.id}>
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
            height="50vh"
            onChange={handleEditorChange}
            value={editorValues.body}
          />
          {bodyDetail && hasChanged && editorValues.body && (
            <EditBody
              action={handleUpdate}
              content={editorValues.body}
              id={bodyDetail.id}
              requestId={request.id}
              type={bodyDetail.type}
            >
              <Button
                className="absolute p-4 z-50 bottom-4 right-4 hover:text-primary"
                ref={buttonRef}
                size="xs"
                tooltip="You have unsaved changes"
                type="submit"
                variant="icon"
              >
                <Save className="w-6 h-6" />
              </Button>
            </EditBody>
          )}
        </div>
      )}
    </div>
  );
}
