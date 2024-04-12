/* eslint-disable max-len */

"use client";

import * as React from "react";
import { FaPiedPiper } from "react-icons/fa";
import { useAtom } from "jotai";

import CopyText from "@/components/copy-text";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getVariablesAtom, useSelectedEnvironment } from "@/store/async-atoms";
import { Environment } from "@prisma/client";

type Props = {
  environments: Environment[];
};

export function EnvironmentSwitcher({ environments }: Props) {
  const [selectedEnvironment, setselectedEnvironment] =
    useSelectedEnvironment();

  const [response] = useAtom(getVariablesAtom);

  const variableText =
    response.state === "hasData"
      ? response.data.map((variable) => variable.name)
      : [];

  return (
    <>
      <div className="w-full" />
      <div className="w-full" />
      <div className="w-full" />

      <Select
        defaultValue={selectedEnvironment?.id}
        onValueChange={(value) => {
          const environment = environments.find((env) => env.id === value);

          if (environment) {
            setselectedEnvironment(environment);
          }
        }}
      >
        <SelectTrigger
          aria-label="Select an Environment"
          className={cn(
            "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
          )}
        >
          <SelectValue placeholder="Select an Environment">
            <FaPiedPiper />
            <span className={cn("ml-2")}>{selectedEnvironment?.name}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {environments.map((environment) => (
            <div className="flex flex-row flex-wrap gap-x-2 group">
              <SelectItem
                className="group-hover:bg-gray-50 w-full"
                itemIndicator={<FaPiedPiper />}
                key={environment.id}
                value={environment.id}
              >
                <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                  {environment.name}
                </div>
              </SelectItem>
              {environment.id === selectedEnvironment?.id && (
                <div className="flex flex-row gap-x-4 items-center justify-center pl-8 group-hover:bg-gray-50 w-full rounded-b-lg">
                  <span className="sr-only">
                    Selected Variables: {variableText.join(", ")}
                  </span>
                  {variableText.map((text) => (
                    <div
                      className="flex flex-row gap-x-2 items-center w-full"
                      key={text}
                    >
                      <Label>{text}</Label>
                      <CopyText text={`{{${text}}}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
