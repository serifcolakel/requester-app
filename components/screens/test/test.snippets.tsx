/* eslint-disable max-len */
import React from "react";
import { useAtom } from "jotai";
import { Keyboard, SquareBottomDashedScissors } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { editorValuesAtom } from "@/store/atoms";

const snippets = [
  {
    label: "Status code: Code is 200",
    snippet: `requester.test("Status code: Code is 200", function () {requester.response.to.have.status(200);});`,
  },
  {
    label: "Response body: Contains text",
    snippet: `requester.test("Response First Email is", function () {requester.helpers.isEqual(data?.value, 'YOUR_VALUE');});`,
  },
  {
    label: "Response body: Equal text with expect",
    snippet: `requester.test("Response First Email is Eliseo@gardner.biz with expect", function () {requester.expect(data?.value).to.be.equal('YOUR_VALUE');});`,
  },
  {
    label: "Response body: Not Equal text with expect",
    snippet: `requester.test("Response First Email is Eliseo@gardner.biz with expect", function () {requester.expect(data?.value).to.not.be.equal('YOUR_VALUE');});`,
  },
  {
    label: "Set an environment variable",
    snippet: `requester.environment.set('TOKEN', data?.value);`,
  },
  {
    label: "Replace an environment variable",
    snippet: `requester.environment.replace('TOKEN', data?.value);`,
  },
  {
    label: "Get an environment variable",
    snippet: `const token = requester.environment.get('TOKEN');`,
  },
  {
    label: "Unset an environment variable",
    snippet: `requester.environment.unset('TOKEN');`,
  },
  {
    label: "ResponseTime: Below 100ms",
    snippet: `requester.test("Response time is less than 100ms", function () {requester.expect(requester.response.responseTime).to.be.below(100);});`,
  },
  {
    label: "ResponseTime: Above 100ms",
    snippet: `requester.test("Response time is greater than 100ms", function () {requester.expect(requester.response.responseTime).to.be.above(100);});`,
  },
  {
    label: "ResponseTime: Equal 100ms",
    snippet: `requester.test("Response time is equal to 100ms", function () {requester.expect(requester.response.responseTime).to.be.equal(100);});`,
  },
];

export default function TestSnippets() {
  const [editorValues, setEditorValues] = useAtom(editorValuesAtom);

  const insertSnippet = (snippet: string) => {
    setEditorValues({
      ...editorValues,
      test: editorValues.test ? `${editorValues.test}\n${snippet}` : snippet,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="absolute p-4 z-50 bottom-4 right-20 hover:text-primary"
          size="xs"
          tooltip="Insert Snippet"
          variant="icon"
        >
          <SquareBottomDashedScissors />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <DropdownMenuLabel>Test Scripts</DropdownMenuLabel>
        <article className="px-2">
          <Label className="!leading-normal" variant="subheading-xxs">
            Test Scripts are written in JavaScript/Typescript, you can use the
            following snippets to quickly insert common test scripts.
          </Label>
        </article>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Select a snippet</DropdownMenuLabel>
        <DropdownMenuGroup>
          {snippets.map((snippet) => (
            <DropdownMenuItem
              key={snippet.label}
              onClick={() => insertSnippet(snippet.snippet)}
            >
              <div className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-lg mr-4">
                <Keyboard className="!h-4" />
              </div>
              <Label variant="paragraph-xs">{snippet.label}</Label>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
