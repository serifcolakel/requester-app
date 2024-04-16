"use client";

import React, { useState } from "react";

import Authorization from "@/components/screens/authorization";
import BodyPage from "@/components/screens/body";
import Headers from "@/components/screens/headers";
import Params from "@/components/screens/params";
import TestPage from "@/components/screens/test";
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
      <TabsList className="grid w-full grid-cols-5">
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
        <TabsTrigger disabled={isDisabled} value="tests">
          Tests
        </TabsTrigger>
      </TabsList>
      <TabsContent className="overflow-y-auto px-4" value="params">
        <Params handleToogle={handleToogle} request={request} />
      </TabsContent>
      <TabsContent className="overflow-y-auto px-4" value="headers">
        <Headers handleToogle={handleToogle} request={request} />
      </TabsContent>
      <TabsContent value="authorization">
        <Authorization handleToogle={handleToogle} request={request} />
      </TabsContent>
      <TabsContent value="body">
        <BodyPage handleToogle={handleToogle} request={request} />
      </TabsContent>
      <TabsContent value="tests">
        <TestPage handleToogle={handleToogle} request={request} />
      </TabsContent>
    </Tabs>
  );
}
