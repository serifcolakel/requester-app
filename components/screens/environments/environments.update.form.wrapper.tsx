import React from "react";
import { Edit } from "lucide-react";

import UpdateEnvironmentForm from "@/components/screens/environments/environments.update.form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Environment } from "@prisma/client";

export default function UpdateEnvironmentFormWrapper({
  environment,
  formAction,
}: {
  environment: Environment;
  formAction: (payload: FormData) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-8 w-8 p-0 hover:text-primary"
          tooltip="Edit Environment"
          variant="icon"
        >
          <span className="sr-only">Edit Environment</span>
          <Edit className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2 flex flex-col">
            <Label variant="label-md" weight="bold">
              Update Environment
            </Label>
            <Label variant="paragraph-xs">
              Set the name of the Environment.
            </Label>
          </div>
          <form action={formAction} className="grid gap-2">
            <UpdateEnvironmentForm environment={environment} />
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
