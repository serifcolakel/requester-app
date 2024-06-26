import React from "react";
import { useFormState } from "react-dom";
import { CircleCheck, Folder, Trash, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import UpdateEnvironmentFormWrapper from "@/components/screens/environments/environments.update.form.wrapper";
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
import { paths } from "@/constants/paths";
import { cn } from "@/lib/utils";
import {
  deleteEnvironment,
  updateEnvironment,
} from "@/services/environments/actions";
import { UpdateEnvironmentState } from "@/services/environments/types";
import { useSelectedEnvironment } from "@/store/async-atoms";
import { Environment } from "@prisma/client";

const initialState: UpdateEnvironmentState = {
  errorMessages: {
    name: "",
  },
  data: null,
};

export default function EnvironmentItem({
  environment,
}: {
  environment: Environment;
}) {
  const [selectedEnvironment, setselectedEnvironment] =
    useSelectedEnvironment();

  const [state, formAction] = useFormState(updateEnvironment, initialState);

  const pathName = usePathname();

  const isCurrentEnvironment = pathName.includes(environment.id);

  return (
    <>
      <div
        className={cn(
          "flex group flex-row gap-x-4 items-center justify-between px-2 rounded-lg hover:bg-gray-100",
          isCurrentEnvironment ? "border-l-2 border-primary" : "bg-white"
        )}
        key={environment.id}
      >
        <Link
          className="flex flex-row items-center gap-x-2 cursor-pointer w-full"
          href={paths.dashboard.environment.replace(":id", environment.id)}
          key={environment.id}
        >
          <div className="flex flex-row items-center gap-x-2 group-hover:text-primary transition-colors duration-300">
            <Folder className="w-6 h-6" />
            <Label
              className="group-hover:cursor-pointer line-clamp-1"
              variant="label-sm"
            >
              {environment.name}
            </Label>
          </div>
        </Link>
        <div className="flex flex-row gap-x-1 items-center justify-center">
          <div
            className={cn(
              "group-hover:opacity-100 group-hover:cursor-pointer transition-opacity duration-300 w-8 text-center",
              selectedEnvironment?.id === environment.id
                ? "opacity-100"
                : "opacity-0"
            )}
          >
            <Button
              className="h-8 w-8 p-0 hover:text-red-500"
              onClick={() =>
                setselectedEnvironment(
                  selectedEnvironment?.id === environment.id
                    ? null
                    : environment
                )
              }
              tooltip={
                selectedEnvironment?.id === environment.id
                  ? "Deselect Environment"
                  : "Select Environment"
              }
              variant="icon"
            >
              <span className="sr-only">Select Environment</span>
              {selectedEnvironment?.id === environment.id ? (
                <CircleCheck className="w-5 h-5 fill-gray-500 text-white" />
              ) : (
                <CircleCheck
                  className={cn(
                    "w-4 h-4",
                    selectedEnvironment?.id === environment.id
                      ? "w-5 h-5 fill-gray-500 text-white"
                      : ""
                  )}
                />
              )}
            </Button>
          </div>
          <div className="group-hover:opacity-100 group-hover:cursor-pointer opacity-0 transition-opacity duration-300 w-8 text-center">
            <UpdateEnvironmentFormWrapper
              environment={environment}
              formAction={formAction}
            />
          </div>
          <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 w-8 text-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="h-8 w-8 p-0 hover:text-red-500"
                  tooltip="Delete Environment"
                  variant="icon"
                >
                  <span className="sr-only">Delete Environment</span>
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
                      Environment
                    </Label>{" "}
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="w-full flex justify-end">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogCancel asChild>
                    <form action={deleteEnvironment}>
                      <Input name="id" type="hidden" value={environment.id} />
                      <Button type="submit" variant="destructive">
                        Apply
                      </Button>
                    </form>
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
    </>
  );
}
