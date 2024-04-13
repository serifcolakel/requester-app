"use client";

import React from "react";

import Params from "@/components/screens/params";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Request } from "@prisma/client";

type Props = {
  request: Request;
};

export default function RequestTabs({ request }: Props) {
  return (
    <Tabs defaultValue="params">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="params">Params</TabsTrigger>
        <TabsTrigger value="headers">Headers</TabsTrigger>
        <TabsTrigger value="authorization">Authorization</TabsTrigger>
        <TabsTrigger value="body">Body</TabsTrigger>
      </TabsList>
      <TabsContent className="overflow-y-auto" value="params">
        <Params request={request} />
      </TabsContent>
      <TabsContent value="headers">Headers</TabsContent>
      <TabsContent value="authorization">Authorization</TabsContent>
      <TabsContent value="body">Body</TabsContent>
    </Tabs>
  );
}
