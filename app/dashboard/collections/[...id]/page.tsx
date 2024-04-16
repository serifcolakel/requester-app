import Requests from "@/components/screens/requests";
import { getCollectionById } from "@/services/collections";
import { getRequest } from "@/services/requests";
import { Nullable } from "@/types";
import { Request } from "@prisma/client";

export default async function Page({ params }: { params: { id: string[] } }) {
  const [collectionId, requestId] = params.id;

  const { data: collection } = await getCollectionById(collectionId);

  let request: Nullable<Request> = null;

  if (requestId) {
    const response = await getRequest(requestId);

    if (response.data) request = response.data;
  }

  return (
    <div>
      {request && collection ? (
        <Requests collection={collection} request={request} />
      ) : null}
    </div>
  );
}
