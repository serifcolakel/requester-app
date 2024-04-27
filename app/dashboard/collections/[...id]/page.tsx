import EmptyState from "@/components/empty-states/empty.state";
import Requests from "@/components/screens/requests";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
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

  const collectionInfo = [
    {
      title: "Name",
      value: collection?.name,
    },
    {
      title: "Created At",
      value: collection?.createdAt
        ? new Date(collection?.createdAt).toLocaleDateString()
        : null,
    },
    {
      title: "Updated At",
      value: collection?.updatedAt
        ? new Date(collection?.updatedAt).toLocaleDateString()
        : null,
    },
  ];

  return (
    <div className="w-full h-full">
      {request && collection ? (
        <Requests collection={collection} request={request} />
      ) : (
        <section className="flex h-full p-4 flex-col">
          <Card className="bg-white shadow-sm rounded-lg mb-4">
            <ul>
              {collectionInfo.map((info, index) => (
                <li
                  className={cn(
                    "border-b py-2 flex flex-row items-center justify-between px-4",
                    index === collectionInfo.length - 1 ? "border-none" : ""
                  )}
                  key={info.title}
                >
                  <Label variant="h6">{info.title}</Label>
                  <Label className="text-xl">{info.value}</Label>
                </li>
              ))}
            </ul>
          </Card>

          <EmptyState
            className="flex items-center justify-center h-full w-full"
            description="You can make a request by selecting a request from the left."
            imageProps={{
              className: "md:mt-0",
              height: 200,
              width: 200,
            }}
            src="/illustration-search.svg"
            title="No Request Selected"
          >
            <div className="flex gap-x-2">
              <Label variant="h3">Select a request from the left</Label>
            </div>
          </EmptyState>
        </section>
      )}
    </div>
  );
}
