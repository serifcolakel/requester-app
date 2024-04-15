import { FormHTMLAttributes } from "react";

import { BodyType } from "@prisma/client";

export default function EditBody({
  action,
  requestId,
  children,
  type,
  content,
  id,
}: {
  action: FormHTMLAttributes<HTMLFormElement>["action"];
  requestId: string;
  children: React.ReactNode;
  type: BodyType;
  content: string;
  id: string;
}) {
  return (
    <form action={action}>
      <input defaultValue={type} name="type" type="hidden" />
      <input defaultValue={content} name="content" type="hidden" />
      <input defaultValue={requestId} name="requestId" type="hidden" />
      <input defaultValue={id} name="id" type="hidden" />
      {children}
    </form>
  );
}
