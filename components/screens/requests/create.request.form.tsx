import React from "react";

import { createNewRequest } from "@/services/requests/actions";
import { REQUEST_TYPE } from "@/services/requests/constants";

const defaultRequest = {
  method: REQUEST_TYPE.GET,
  url: "",
  body: "",
  name: "New Request",
};

type Props = {
  collectionId: string;
  request?: typeof defaultRequest;
  children: React.ReactNode;
  className?: string;
};

export default function CreateRequestForm({
  children,
  collectionId,
  request = defaultRequest,
  className,
}: Props) {
  return (
    <form action={createNewRequest} className={className}>
      <input name="collectionId" type="hidden" value={collectionId} />
      {Object.entries(request).map(([key, value]) => (
        <input key={key} name={key} type="hidden" value={String(value)} />
      ))}
      {children}
    </form>
  );
}
