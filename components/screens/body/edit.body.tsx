import { updateBody } from "@/services/body/actions";
import { BodyType } from "@prisma/client";

export default function EditBody({
  requestId,
  children,
  type,
  content,
  id,
}: {
  requestId: string;
  children: React.ReactNode;
  type: BodyType;
  content: string;
  id: string;
}) {
  return (
    <form action={updateBody}>
      <input defaultValue={type} name="type" type="hidden" />
      <input defaultValue={content} name="content" type="hidden" />
      <input defaultValue={requestId} name="requestId" type="hidden" />
      <input defaultValue={id} name="id" type="hidden" />
      {children}
    </form>
  );
}
