/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { Loader, Plus, Save } from "lucide-react";

import EmptyState from "@/components/empty-states/empty.state";
import AddTest from "@/components/screens/test/add.test";
import EditTest from "@/components/screens/test/edit.test";
import { Button } from "@/components/ui/button";
import {
  createNewTest,
  getRequestTest,
  updateTest,
} from "@/services/test/actions";
import { editorValuesAtom } from "@/store/atoms";
import Editor, { OnChange } from "@monaco-editor/react";
import { Request, Test } from "@prisma/client";

type Props = {
  request: Request;
  handleToogle: (condition: boolean) => void;
};

export default function TestPage({ request, handleToogle }: Props) {
  const [editorValues, setEditorValues] = useAtom(editorValuesAtom);

  const [loading, setLoading] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [testDetail, setTestDetail] = useState<Test>();

  const prepareTest = async () => {
    handleToogle(true);
    setLoading(true);
    const res = await getRequestTest(request.id);

    if (res.data) {
      setEditorValues({
        ...editorValues,
        test: editorValues.test || res.data.script,
      });
      setTestDetail(res.data);
    }

    handleToogle(false);
    setLoading(false);
  };

  useEffect(() => {
    prepareTest();
  }, []);

  const handleEditorChange: OnChange = (value) => {
    setEditorValues({
      ...editorValues,
      test: value,
    });
  };

  const handleCreate = async (formData: FormData) => {
    const res = await createNewTest(formData);

    if (res.data) {
      await prepareTest();
    }
  };

  const handleUpdate = async (formData: FormData) => {
    const res = await updateTest(formData);

    if (res.data) {
      await prepareTest();
    }
  };

  if (loading) {
    return (
      <EmptyState description="Preparing Test..." title="Please wait...">
        <Loader className="animate-spin" />
      </EmptyState>
    );
  }

  const hasChanged = editorValues.test !== testDetail?.script;

  return (
    <div className="space-y-4 h-full">
      {!testDetail ? (
        <EmptyState>
          <AddTest action={handleCreate} requestId={request.id}>
            <Button tooltip="Add New Test" type="submit">
              <span className="sr-only">Add New Test</span>
              <Plus className="w-4 h-4" />
              Add New Test
            </Button>
          </AddTest>
        </EmptyState>
      ) : (
        <div className="relative w-full">
          <Editor
            className="border overflow-hidden rounded-lg shadow-sm"
            defaultLanguage="typescript"
            defaultPath="test.ts"
            defaultValue={JSON.stringify(request, null, 2)}
            height="60vh"
            onChange={handleEditorChange}
            value={editorValues.test}
          />
          {testDetail && hasChanged && editorValues.test && (
            <EditTest
              action={handleUpdate}
              id={testDetail.id}
              requestId={request.id}
              script={editorValues.test}
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
            </EditTest>
          )}
        </div>
      )}
    </div>
  );
}
