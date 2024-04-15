import { FormHTMLAttributes } from "react";

export default function EditBody({
  action,
  requestId,
  children,
  script,
  id,
}: {
  requestId: string;
  children: React.ReactNode;
  script: string;
  id: string;
  action: FormHTMLAttributes<HTMLFormElement>["action"];
}) {
  return (
    <form action={action}>
      <input defaultValue={script} name="script" type="hidden" />
      <input defaultValue={requestId} name="requestId" type="hidden" />
      <input defaultValue={id} name="id" type="hidden" />
      {children}
    </form>
  );
}
