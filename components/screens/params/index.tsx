/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useCallback, useEffect, useState } from "react";

import Table from "@/components/screens/params/table";
import {
  createNewParams,
  deleteParams,
  getRequestParams,
  updateParams,
} from "@/services/params/actions";
import { Params, Request } from "@prisma/client";

type Props = {
  request: Request;
};

export default function ParamsPage({ request }: Props) {
  const [params, setParams] = useState<Params[]>([]);

  const [loading, setLoading] = useState(false);

  const prepareRequest = useCallback(async (id: string) => {
    const response = await getRequestParams(id);

    if (response.success && response.data) {
      setParams(response.data);
    }
  }, []);

  const handleAdd = async (data: FormData) => {
    setLoading(true);
    const res = await createNewParams(data);

    if (res.success) {
      await prepareRequest(request.id);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  };

  const handleUpdate = async (data: FormData) => {
    const res = await updateParams(data);

    if (res.data) {
      await prepareRequest(request.id);
    }
  };

  const onDelete = async (formData: FormData) => {
    const res = await deleteParams(formData);

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
        loading={loading}
        onAdd={handleAdd}
        onDelete={onDelete}
        onEdit={handleUpdate}
        params={params}
        requestId={request.id}
      />
    </div>
  );
}
