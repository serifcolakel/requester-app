import React, { useCallback, useState } from "react";
import { useFormState } from "react-dom";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Trash,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import UpdateCollectionFormWrapper from "@/components/screens/collections/collection.update.form.wrapper";
import RequestIcon from "@/components/screens/requests/request-icon";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { paths } from "@/constants/paths";
import { cn } from "@/lib/utils";
import {
  deleteCollectionAction,
  updateCollection,
} from "@/services/collections/actions";
import {
  CollectionDetailItem,
  UpdateCollectionState,
} from "@/services/collections/types";
import { createNewRequest } from "@/services/requests/actions";
import { REQUEST_TYPE } from "@/services/requests/constants";

const initialState: UpdateCollectionState = {
  errorMessages: {
    name: "",
  },
  data: null,
};

export default function CollectionItem({
  collection,
}: {
  collection: CollectionDetailItem;
}) {
  const { toast } = useToast();

  const [isExpanded, setIsExpanded] = useState(false);

  const [state, formAction] = useFormState(updateCollection, initialState);

  const pathName = usePathname();

  const isCurrentCollection =
    pathName === paths.dashboard.collection.replace(":id", collection.id);

  const requests = collection.requests || [];

  const onToggle = useCallback(() => {
    if (!requests.length) {
      toast({
        title: "No requests found",
        description: "You need to create a request first.",
        variant: "warning",
      });

      return;
    }

    setIsExpanded((prev) => !prev);
  }, [requests.length, toast]);

  return (
    <>
      <div
        className={cn(
          "flex group flex-row gap-x-4 items-center justify-between px-2 rounded-lg hover:bg-gray-100",
          isCurrentCollection ? "border-l-2 border-primary" : "bg-white"
        )}
        key={collection.id}
      >
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 cursor-pointer" onClick={onToggle} />
        ) : (
          <ChevronRight className="w-5 h-5 cursor-pointer" onClick={onToggle} />
        )}
        <Link
          className="flex flex-row items-center gap-x-2 cursor-pointer w-full"
          href={paths.dashboard.collection.replace(":id", collection.id)}
          key={collection.id}
        >
          <div className="flex flex-row items-center gap-x-2 group-hover:text-primary transition-colors duration-300">
            <Label
              className="group-hover:cursor-pointer line-clamp-1"
              variant="label-sm"
            >
              {collection.name}
            </Label>
          </div>
        </Link>
        <div className="flex flex-row gap-x-2 items-center justify-center">
          <div className="group-hover:opacity-100 group-hover:cursor-pointer opacity-0 transition-opacity duration-300 text-center">
            <UpdateCollectionFormWrapper
              collection={collection}
              formAction={formAction}
            />
          </div>
          <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 text-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="h-8 p-0 hover:text-red-500"
                  tooltip="Delete Collection"
                  variant="icon"
                >
                  <span className="sr-only">Delete collection</span>
                  <Trash className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your{" "}
                    <Label className="text-red-600" variant="paragraph-sm">
                      Collection
                    </Label>{" "}
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="w-full flex justify-end">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogCancel asChild>
                    <form action={deleteCollectionAction}>
                      <Input name="id" type="hidden" value={collection.id} />
                      <Button type="submit" variant="destructive">
                        Apply
                      </Button>
                    </form>
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 text-center">
            <form action={createNewRequest}>
              <input name="collectionId" type="hidden" value={collection.id} />
              <input name="name" type="hidden" value="New Request" />
              <input name="method" type="hidden" value={REQUEST_TYPE.GET} />
              <input name="url" type="hidden" value="" />
              <input name="body" type="hidden" value="" />
              <Button
                className="h-8 p-0 hover:text-red-500"
                tooltip="Delete Collection"
                type="submit"
                variant="icon"
              >
                <span className="sr-only">Delete collection</span>
                <Plus className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
      {state.errorMessages.name && (
        <div className="flex items-center gap-x-1 mt-1 w-full text-red-500 bg-red-50 px-4 py-1 rounded-lg">
          <TriangleAlert className="w-4 h-4 mr-1" />
          <Label className="text-red-500" variant="paragraph-xs">
            {state.errorMessages.name}
          </Label>
        </div>
      )}
      {isExpanded && (
        <div className="grid">
          {requests.map((request) => (
            <div
              className={cn(
                "flex flex-row items-center gap-x-2 px-2 py-1 rounded-lg hover:bg-gray-100 pl-9",
                pathName ===
                  paths.dashboard.requests
                    .replace(":collectionId", collection.id)
                    .replace(":requestId", request.id)
                  ? "border-l-2 border-primary"
                  : "bg-white"
              )}
              key={request.id}
            >
              <Link
                className="flex flex-row items-center gap-x-2 cursor-pointer w-full"
                href={paths.dashboard.requests
                  .replace(":collectionId", collection.id)
                  .replace(":requestId", request.id)}
                key={request.id}
              >
                <div className="flex flex-row items-center gap-x-2">
                  <RequestIcon method={request.method} />
                  <Label className="line-clamp-1" variant="label-sm">
                    {request.name}
                  </Label>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
