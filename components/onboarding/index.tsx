import React from "react";
import { BiLogoTypescript } from "react-icons/bi";
import { CircleDotDashed, TestTubeDiagonal } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Video from "@/components/video";

const cards: {
  title: string;
  descriptions: { text: string; code?: string }[];
  icon: React.ElementType;
}[] = [
  {
    title: "Manage your Environments",
    descriptions: [
      {
        text: "Create, update, and delete your environments.",
      },
      {
        text: "Add environment variables to your environments, and use them in your requests.",
      },
      {
        text: "Change environment variables for your requests.",
      },
      {
        text: `Pick the environment for your requests and access the environment variables in your requests.`,
        code: `{{ENVIRONMENT_VARIABLE}}`,
      },
    ],
    icon: TestTubeDiagonal,
  },
  {
    title: "Collections",
    descriptions: [
      {
        text: "Create, update, and delete your collections.",
      },
      {
        text: "You can add requests to your collections.",
      },
      {
        text: "You can change the name, description, and order of your collections.",
      },
    ],
    icon: TestTubeDiagonal,
  },
  {
    title: "Requests",
    descriptions: [
      {
        text: "Create, update, and delete your requests.",
      },
      {
        text: "You can change the name, method, url, and body of your requests.",
      },
      {
        text: "You can access the environment variables in your requests.",
      },
    ],
    icon: TestTubeDiagonal,
  },
  {
    title: "Authentication",
    descriptions: [
      {
        text: "You can add authentication to your requests. Currently, we support Bearer Token.",
      },
    ],
    icon: TestTubeDiagonal,
  },
  {
    title: "Write and run your tests",
    descriptions: [
      {
        text: "You can easily write and run your tests for your api.",
      },
      {
        text: "Test your api with different scenarios.",
      },
      {
        text: 'Generate test with snippets like "Test for 200 status code".',
      },
      {
        text: 'Set response time for your tests like "Test for response time < 100ms".',
        code: `requester.test("Response time is less than 100ms", function () {
          requester.expect(requester.response.responseTime).to.be.below(100);
        });`,
      },
      {
        text: 'Set Environment variables for your tests like "Test for environment variable"',
        code: "requester.environment.set('ENVIROMENT_VARIABLE', requester.response.data?.id);",
      },
      {
        text: "See All the available snippets in the snippets dropdown.",
      },
    ],
    icon: TestTubeDiagonal,
  },
  {
    title: "Generate Response Types",
    descriptions: [
      {
        text: "After getting the response from the api, you can generate the types for the response.",
      },
      {
        text: "You can copy the generated types and use them in your code.",
      },
    ],
    icon: BiLogoTypescript,
  },
];

export default function Onboarding() {
  return (
    <main className="p-4 w-full h-full">
      <header className="flex flex-col mb-4">
        <Label variant="h4">Discover what you can do in Requester</Label>
        <Label variant="label-xs">
          Requester, a platform that allows you to create, manage, and share
          your collections, environments, and requests.
        </Label>
      </header>
      <div className="w-full border p-4 rounded-lg bg-primary/5">
        <Video videoId="QhMwxfCzHkw" />
      </div>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 py-4 mx-auto">
        {cards.map((card) => (
          <Card className="col-span-1 bg-gradient-to-b from-primary/5 to-accent shadow-sm rounded-lg overflow-hidden">
            <CardHeader className="gap-2">
              <section className="mx-auto grid items-center rounded-full p-2 bg-gradient-to-b from-primary/50 to-accent">
                <card.icon className="bg-white rounded-full border p-2 h-12 w-12" />
              </section>
              <CardTitle className="text-center">{card.title}</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex h-full p-4 flex-col gap-4 w-full bg-white">
              {card.descriptions.map((description) => (
                <Label className="flex flex-col" variant="label-xs">
                  <span className="flex flex-row gap-x-4 items-center ">
                    <CircleDotDashed className="text-primary" />
                    {description.text}
                  </span>
                  {description.code && (
                    <code className="bg-gray-50 p-2 rounded-lg text-primary ml-10 overflow-hidden">
                      {description.code}
                    </code>
                  )}
                </Label>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
