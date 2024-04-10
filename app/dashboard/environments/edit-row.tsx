import React, { FormHTMLAttributes, useEffect, useRef, useState } from "react";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props<T extends object> = {
  row: T;
  name: keyof T;
  action: FormHTMLAttributes<HTMLFormElement>["action"];
};

export default function EditRow<T extends object>({
  row,
  name,
  action,
}: Props<T>) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const formKeys = Object.keys(row) as (keyof T)[];

  const initialValue = String(row[name]);

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const hasChanged = initialValue !== value;

  const className = hasChanged ? " text-red-500 " : "";

  return (
    <form action={action} className="relative w-full">
      <Input
        className={`h-8 ${className}`}
        name={String(name)}
        onBlur={() => {
          if (hasChanged) {
            setTimeout(() => {
              buttonRef.current?.click();
            }, 500);
          }
        }}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
      />
      {hasChanged && (
        <Button
          className="absolute py-0 px-1 right-2 top-1/2 transform -translate-y-1/2 hover:text-primary"
          ref={buttonRef}
          size="xs"
          tooltip="You have unsaved changes"
          type="submit"
          variant="icon"
        >
          <Save className="w-4 h-4" />
        </Button>
      )}

      {formKeys
        ?.filter((key) => key !== name)
        .map((key) => (
          <Input
            key={String(key)}
            name={String(key)}
            type="hidden"
            value={String(row[key])}
          />
        ))}
    </form>
  );
}
