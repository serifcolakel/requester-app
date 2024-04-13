/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useCallback, useEffect, useState } from "react";

import Table from "@/components/screens/headers/table";
import {
  createNewHeader,
  deleteHeader,
  getRequestHeader,
  updateHeader,
} from "@/services/headers/actions";
import { Header, Request } from "@prisma/client";

type Props = {
  request: Request;
  handleToogle: (condition: boolean) => void;
};

export default function HeadersPage({ request, handleToogle }: Props) {
  const [headers, setHeaders] = useState<Header[]>([]);

  const [loading, setLoading] = useState(false);

  const prepareRequest = useCallback(async (id: string) => {
    handleToogle(true);
    const response = await getRequestHeader(id);

    if (response.success && response.data) {
      setHeaders(response.data);
    }

    handleToogle(false);
  }, []);

  const handleAdd = async (data: FormData) => {
    setLoading(true);
    const res = await createNewHeader(data);

    if (res.success) {
      await prepareRequest(request.id);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  };

  const handleUpdate = async (data: FormData) => {
    const res = await updateHeader(data);

    if (res.data) {
      await prepareRequest(request.id);
    }
  };

  const onDelete = async (formData: FormData) => {
    const res = await deleteHeader(formData);

    if (res.data) {
      await prepareRequest(request.id);
    }
  };

  useEffect(() => {
    prepareRequest(request.id);
  }, [prepareRequest, request.id]);

  return (
    <div className="w-full h-full overflow-y-auto">
      <Table
        headers={headers}
        loading={loading}
        onAdd={handleAdd}
        onDelete={onDelete}
        onEdit={handleUpdate}
        requestId={request.id}
      />
    </div>
  );
}
