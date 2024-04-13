import { authorizationTypes } from "@/components/screens/authorization/constants";
import { createNewAuthorization } from "@/services/authorization/actions";

export default function AddAuthorization({
  requestId,
  children,
}: {
  requestId: string;
  children: React.ReactNode;
}) {
  return (
    <form action={createNewAuthorization}>
      <input
        defaultValue={authorizationTypes[0].value}
        name="type"
        type="hidden"
      />
      <input defaultValue="Token" name="token" type="hidden" />
      <input defaultValue={requestId} name="requestId" type="hidden" />
      {children}
    </form>
  );
}
