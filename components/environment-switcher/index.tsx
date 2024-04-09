/* eslint-disable max-len */

"use client";

import * as React from "react";
import { Check } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const defaultAccounts = [
  {
    label: "Personal",
    email: "serif@gmail.com",
    icon: <Check />,
  },
  {
    label: "Work",
    email: "serif2@gmail.com",
    icon: <Check />,
  },
];

export function EnvironmentSwitcher() {
  const [selectedAccount, setSelectedAccount] = React.useState<string>(
    defaultAccounts[0].email
  );

  const { icon, label } =
    defaultAccounts.find((account) => account.email === selectedAccount) || {};

  return (
    <Select defaultValue={selectedAccount} onValueChange={setSelectedAccount}>
      <SelectTrigger
        aria-label="Select account"
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
        )}
      >
        <SelectValue placeholder="Select an account">
          {icon}
          <span className={cn("ml-2")}>{label}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {defaultAccounts.map((account) => (
          <SelectItem key={account.email} value={account.email}>
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              {account.email}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
