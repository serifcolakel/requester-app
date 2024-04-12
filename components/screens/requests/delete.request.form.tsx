import React from "react";

import { deleteRequest } from "@/services/requests/actions";

type Props = {
  collectionId: string;
  requestId: string;
  children: React.ReactNode;
  className?: string;
};

export default function DeleteRequestForm({
  children,
  collectionId,
  requestId,
  className,
}: Props) {
  return (
    <form action={deleteRequest} className={className}>
      <input name="collectionId" type="hidden" value={collectionId} />
      <input name="id" type="hidden" value={requestId} />
      {children}
    </form>
  );
}
