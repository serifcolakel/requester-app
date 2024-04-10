import React from "react";
import { GripHorizontal, ListFilter, Plus, Search } from "lucide-react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { paths } from "@/constants/paths";
import {
  createNewEnvironment,
  getEnvironments,
} from "@/services/environments/actions";

export default function EnvironmentFilter() {
  const onCreate = async (formData: FormData) => {
    const res = await createNewEnvironment(formData);

    if (!res?.success || !res?.data?.id) {
      return;
    }

    redirect(paths.dashboard.environment.replace(":id", res.data.id));
  };

  return (
    <div className="flex flex-row items-center justify-between px-2 py-4 gap-x-1">
      <form action={onCreate}>
        <Input name="name" type="hidden" value="New Environment" />
        <Button
          className="mt-1"
          size="xs"
          tooltip="Add New Environment"
          type="submit"
          variant="icon"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </form>
      <form action={getEnvironments} className="relative w-full">
        <ListFilter className="w-4 h-4 absolute top-1/2 left-2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          className="h-8 px-8"
          name="search"
          placeholder="Please enter a search term"
        />
        <Button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-1 text-muted-foreground"
          size="xs"
          type="submit"
          variant="icon"
        >
          <Search className="w-4 h-4" />
        </Button>
      </form>

      <form action={onCreate}>
        <Input name="name" type="hidden" value="New Environment" />
        <Button className="mt-1" size="xs" type="submit" variant="icon">
          <GripHorizontal className="w-6 h-6" />
        </Button>
      </form>
    </div>
  );
}
