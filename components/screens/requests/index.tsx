/* eslint-disable max-len */

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { Loader, Save, Send } from "lucide-react";

import { getRequestColorClass } from "@/components/screens/requests/helpers";
import RequestTabs from "@/components/screens/requests/request.tabs";
import RequestIcon from "@/components/screens/requests/request-icon";
import { Button } from "@/components/ui/button";
import HighlightedInput, {
  getOptionValue,
} from "@/components/ui/highlight-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import useTest from "@/hooks/useTest";
import { cn } from "@/lib/utils";
import { getAuthorizationByRequestId } from "@/services/authorization/actions";
import { getRequestBody } from "@/services/body/actions";
import { getRequestHeader } from "@/services/headers/actions";
import { getRequestParams } from "@/services/params/actions";
import { updateRequest } from "@/services/requests/actions";
import { REQUEST_TYPE_OPTIONS } from "@/services/requests/constants";
import { fetcher } from "@/services/response";
import { getRequestTest } from "@/services/test/actions";
import { getVariablesAtom } from "@/store/async-atoms";
import { isEqual } from "@/utils/comparison.utils";
import { getErrorMessage } from "@/utils/error.utils";
import { replaceSpaces } from "@/utils/string.utils";
import { Collection, Method, Request } from "@prisma/client";

type Props = {
  request: Request;
  collection: Collection;
};

export default function Requests({ request, collection }: Props) {
  const { toast } = useToast();

  const { executeTest } = useTest();

  const [response] = useAtom(getVariablesAtom);

  const [saving, setSaving] = useState(false);

  const [sending, setSending] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [selectedRequest, setSelectedRequest] = useState<Request>(request);

  const { label } =
    REQUEST_TYPE_OPTIONS.find(
      (option) => option.value === selectedRequest.method
    ) || {};

  const handleUpdateRequest = (key: keyof Request, value: string) => {
    setSelectedRequest((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const equal = isEqual(selectedRequest, request);

  useEffect(() => {
    setSelectedRequest(request);
  }, [request]);

  const autoSubmit = () => {
    if (equal) return;

    setSaving(true);
    setTimeout(() => {
      buttonRef.current?.click();

      setSaving(false);
    }, 1000);
  };

  const options =
    response.state === "hasData"
      ? response.data.map((i) => ({
          value: i.value,
          name: i.name,
        }))
      : [];

  const handleSendRequest = async () => {
    try {
      setSending(true);

      const [params, header, auth, body, test] = await Promise.all([
        getRequestParams(selectedRequest.id),
        getRequestHeader(selectedRequest.id),
        getAuthorizationByRequestId(selectedRequest.id),
        getRequestBody(selectedRequest.id),
        getRequestTest(selectedRequest.id),
      ]);

      const url = new URL(getOptionValue(selectedRequest.url, options));

      if (params.data) {
        params.data.forEach((param) => {
          url.searchParams.append(replaceSpaces(param.key), param.value);
        });
      }

      const headers: Record<string, string> = {};

      if (header.data) {
        header.data.forEach((h) => {
          headers[replaceSpaces(h.key)] = h.value;
        });
      }

      if (auth.data) {
        headers.Authorization = `${auth.data[0].type} ${getOptionValue(auth.data[0].token, options)}`;
      }

      let bodyValue = "";

      if (body?.data && body?.data.content) {
        bodyValue = body.data.content;
      }

      const startTime = window.performance.now();

      const result = await fetcher(url, {
        method: selectedRequest.method,
        headers,
        body: bodyValue,
      });

      if (test.data?.script) {
        const testResults = await executeTest({
          test: test.data?.script,
          result,
        });

        window.console.log({ testResults });
      }

      const endTime = window.performance.now();

      // TODO (serif): it will be added for logger db
      const diff = endTime - startTime;

      toast({
        description: `Request completed in ${diff.toFixed(2)}ms`,
        title: result.success ? "Success" : "Error",
        variant: result.success ? "success" : "destructive",
      });
    } catch (error) {
      toast({
        description: getErrorMessage(error, "Failed to send request"),
        variant: "destructive",
        title: "Error",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <header className="flex flex-row gap-y-4 items-center justify-between">
        <div className="flex flex-1 w-full flex-row gap-x-4">
          <div className="border rounded-lg px-2 bg-blue-50 border-blue-800 grid items-center">
            <RequestIcon className="!h-5" />
          </div>
          <div className="text-sm flex flex-row gap-x-2 w-full items-center pr-4">
            <div className="line-clamp-1 w-24">
              <Label variant="paragraph-xs">{collection.name}</Label>
            </div>
            <div>
              <Label variant="gray">/</Label>
            </div>
            <Input
              className="h-6 focus:border border-none px-1 w-auto"
              onBlur={autoSubmit}
              onChange={(e) => handleUpdateRequest("name", e.target.value)}
              placeholder="Request Name"
              value={selectedRequest.name}
            />
          </div>
        </div>
        <form action={updateRequest}>
          {Object.entries(selectedRequest).map(([key, value]) => (
            <input key={key} name={key} type="hidden" value={String(value)} />
          ))}
          <Button
            className="w-full gap-x-2"
            disabled={equal}
            ref={buttonRef}
            type="submit"
            variant="secondary"
          >
            {saving ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span className="sr-only">{saving ? "Saving..." : "Save"}</span>
            {saving ? "Saving..." : "Save"}
          </Button>
        </form>
      </header>
      <div className="grid grid-cols-12 items-center justify-center gap-x-1">
        <div className="col-span-2">
          <Select
            defaultValue={selectedRequest.method}
            onValueChange={(value) => handleUpdateRequest("method", value)}
          >
            <SelectTrigger
              aria-label="Select Method"
              className={cn(
                "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
              )}
            >
              <SelectValue placeholder="Select Method">
                <RequestIcon method={selectedRequest.method} />
                <span className={cn("ml-2")}>{label}</span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {REQUEST_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                    <RequestIcon method={option.value} />
                    <span
                      className={cn(
                        "ml-2",
                        getRequestColorClass(option.value as Method)
                      )}
                    >
                      {option.label}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-8">
          <HighlightedInput
            onBlur={autoSubmit}
            onChange={(event) => handleUpdateRequest("url", event.target.value)}
            options={options}
            value={selectedRequest.url}
          />
        </div>
        <div className="col-span-2">
          <Button
            className="w-full gap-x-4"
            loading={sending}
            loadingContent="Sending..."
            onClick={handleSendRequest}
          >
            <Send className="w-4 h-4" />
            <span className="sr-only">{sending ? "Sending..." : "Send"}</span>
            Send
          </Button>
        </div>
      </div>
      <RequestTabs request={request} />
    </div>
  );
}
