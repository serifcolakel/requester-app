import { FormHTMLAttributes } from "react";

export default function AddBody({
  requestId,
  children,
  action,
}: {
  requestId: string;
  children: React.ReactNode;
  action: FormHTMLAttributes<HTMLFormElement>["action"];
}) {
  return (
    <form action={action}>
      <input defaultValue="RAW" name="type" type="hidden" />
      <input defaultValue="{}" name="content" type="hidden" />
      <input defaultValue={requestId} name="requestId" type="hidden" />
      {children}
    </form>
  );
}
