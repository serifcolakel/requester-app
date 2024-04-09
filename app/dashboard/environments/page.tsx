import React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <ResizablePanelGroup
      className="h-screen items-stretch"
      direction="horizontal"
    >
      <ResizablePanel collapsible className="" minSize={15}>
        <Tabs defaultValue="all">
          <div className="flex items-center px-4 py-2 h-[52px]">
            <h1 className="text-xl font-bold">Inbox</h1>
            <TabsList className="ml-auto">
              <TabsTrigger
                className="text-zinc-600 dark:text-zinc-200"
                value="all"
              >
                All mail
              </TabsTrigger>
              <TabsTrigger
                className="text-zinc-600 dark:text-zinc-200"
                value="unread"
              >
                Unread
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Label htmlFor="search">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                </Label>
                <Input className="pl-8" id="search" placeholder="Search" />
              </div>
            </form>
          </div>
          <TabsContent className="m-0" value="all">
            {/* <MailList items={mails} /> */}
          </TabsContent>
          <TabsContent className="m-0" value="unread">
            <div>Unread</div>
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="p-4" minSize={70}>
        <div>content</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
