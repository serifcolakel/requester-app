"use client";

import React, { useState } from "react";

import Authorization from "@/components/screens/authorization";
import Headers from "@/components/screens/headers";
import Params from "@/components/screens/params";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Request } from "@prisma/client";

type Props = {
  request: Request;
};

export default function RequestTabs({ request }: Props) {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleToogle = () => {
    setIsDisabled((prev) => !prev);
  };

  return (
    <Tabs defaultValue="params">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger disabled={isDisabled} value="params">
          Params
        </TabsTrigger>
        <TabsTrigger disabled={isDisabled} value="authorization">
          Authorization
        </TabsTrigger>
        <TabsTrigger disabled={isDisabled} value="headers">
          Headers
        </TabsTrigger>
        <TabsTrigger disabled={isDisabled} value="body">
          Body
        </TabsTrigger>
      </TabsList>
      <TabsContent className="overflow-y-auto" value="params">
        <Params handleToogle={handleToogle} request={request} />
      </TabsContent>
      <TabsContent value="headers">
        <Headers handleToogle={handleToogle} request={request} />
      </TabsContent>
      <TabsContent value="authorization">
        <Authorization handleToogle={handleToogle} request={request} />
      </TabsContent>
      <TabsContent value="body">Body</TabsContent>
    </Tabs>
  );
}
