/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { InfoIcon, Loader, Save } from "lucide-react";

import { authorizationTypes } from "@/components/screens/authorization/constants";
import EditAuthorization from "@/components/screens/authorization/edit.authorization";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import HighlightedInput from "@/components/ui/highlight-input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  getAuthorizationByRequestId,
  updateAuthorization,
} from "@/services/authorization/actions";
import { getVariablesAtom } from "@/store/async-atoms";
import { Auth, Request } from "@prisma/client";

type Props = {
  request: Request;
};

export default function AuthorizationPage({ request }: Props) {
  const [response] = useAtom(getVariablesAtom);

  const [authDetail, setAuthDetail] = useState<Auth>();

  const [token, setToken] = useState<string>("");

  const [selectedAuthorization] = useState(authorizationTypes[0].value);

  const [saving, setSaving] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const getAuthorization = async () => {
    const { data, success } = await getAuthorizationByRequestId(request.id);

    if (data.length === 0 || !data[0].token || !success) {
      return;
    }

    setAuthDetail(data[0]);
    setToken(data[0].token);
  };

  useEffect(() => {
    getAuthorization();
  }, []);

  const { label } =
    authorizationTypes.find(
      (option) => option.value === selectedAuthorization
    ) || {};

  const isEqual = token === authDetail?.token;

  const autoSubmit = () => {
    if (isEqual) return;

    setSaving(true);
    buttonRef.current?.click();

    getAuthorization();

    setTimeout(() => {
      setSaving(false);
    }, 250);
  };

  const hasChanged = token !== authDetail?.token;

  const options =
    response.state === "hasData"
      ? response.data.map((i) => ({
          value: i.value,
          name: i.name,
        }))
      : [];

  return (
    <div className="space-y-4 h-full">
      <div className="flex flex-col lg:flex-row justify-center gap-x-4">
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-r-0 mb-4 p-4 lg:pr-4 space-y-8">
          <div className="w-full flex flex-col lg:flex-row gap-4 lg:items-center justify-center">
            <Label
              className="text-primary-600 dark:text-gray-100"
              variant="paragraph-sm"
            >
              Type
            </Label>
            <Select disabled value={authorizationTypes[0].value}>
              <SelectTrigger
                aria-label="Select Method"
                className={cn(
                  "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
                )}
              >
                <SelectValue placeholder="Select Method">
                  <span className={cn("ml-2")}>{label}</span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {authorizationTypes.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <article>
            <Label className="text-gray-500" variant="label-sm">
              The authorization header will be automatically generated when you
              send the request. Learn more about authorization.
            </Label>
          </article>
        </div>
        <div className="w-full flex flex-col p-4 items-start space-y-4">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              These parameters hold sensitive data. To keep this data secure
              while working in a collaborative environment, we recommend using
              variables.
            </AlertDescription>
          </Alert>
          <div className="w-full flex flex-col lg:flex-row gap-4 items-center">
            <Label
              className="text-primary-600 dark:text-gray-100"
              variant="paragraph-sm"
            >
              Token
            </Label>
            <div className="relative w-full">
              <HighlightedInput
                onBlur={autoSubmit}
                onChange={(event) => setToken(event.target.value)}
                options={options}
                value={token}
              />
              {authDetail && hasChanged && (
                <EditAuthorization
                  action={updateAuthorization}
                  auth={{
                    ...authDetail,
                    token,
                  }}
                >
                  <Button
                    className="absolute py-0 px-1 z-50 right-2 top-1/2 transform -translate-y-1/2 hover:text-primary"
                    ref={buttonRef}
                    size="xs"
                    tooltip="You have unsaved changes"
                    type="submit"
                    variant="icon"
                  >
                    {saving ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                  </Button>
                </EditAuthorization>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
