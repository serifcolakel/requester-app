import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RequestTabs() {
  return (
    <Tabs defaultValue="params">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="params">Params</TabsTrigger>
        <TabsTrigger value="headers">Headers</TabsTrigger>
        <TabsTrigger value="authorization">Authorization</TabsTrigger>
        <TabsTrigger value="body">Body</TabsTrigger>
      </TabsList>
      <TabsContent value="params">Params</TabsContent>
      <TabsContent value="headers">Headers</TabsContent>
      <TabsContent value="authorization">Authorization</TabsContent>
      <TabsContent value="body">Body</TabsContent>
    </Tabs>
  );
}
