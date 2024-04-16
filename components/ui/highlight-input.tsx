/* eslint-disable react/no-array-index-key */
import { PropsWithChildren, useId } from "react";
import { InfoIcon } from "lucide-react";

import CopyText from "@/components/copy-text";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const REGEX = /({{.*?}})/g;

type Props = {
  options: {
    value: string;
    name: string;
  }[];
  label?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const replaceValue = (word: string) => {
  return word.replace(REGEX, (match) =>
    match.replace("{{", "").replace("}}", "")
  );
};

export const getOption = (word: string, options: Props["options"]) => {
  return options.find((option) => option.name === replaceValue(word));
};

export const getOptionValue = (value: string, options: Props["options"]) => {
  return value
    .split(REGEX)
    .map((word) => {
      if (word.match(REGEX) !== null) {
        const foundOption = options.find(
          (option) => option.name === replaceValue(word)
        );

        return foundOption?.value || "";
      }

      return word;
    })
    .join("");
};

export default function HighlightedInput({
  options,
  label,
  value = "",
  onChange,
  onBlur,
}: PropsWithChildren<Props>) {
  // const [value, setValue] = useState(defaultValue);

  const id = `higlight-${useId()}`;

  return (
    <div className="flex flex-col gap-y-3 w-full rounded-lg">
      {label && (
        <Label className="select-none" htmlFor={id} variant="h6">
          {label}
        </Label>
      )}
      <div className="input-container">
        <input
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          id={id}
          onBlur={onBlur}
          onChange={onChange}
          placeholder="Enter URL or paste text"
          value={value}
        />
        <div className="input-renderer">
          {value ? (
            value.split(REGEX).map((word, i) => {
              if (word.match(REGEX) !== null) {
                const foundOption = getOption(word, options);

                return (
                  <HoverCard key={i}>
                    <HoverCardTrigger asChild>
                      <span
                        className={
                          foundOption
                            ? "text-primary z-20 hover:text-primary/70 cursor-pointer"
                            : "text-red-500 z-20 hover:text-red-500/70 cursor-pointer"
                        }
                      >
                        {word}
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent
                      className={cn(
                        "w-full",
                        foundOption ? "bg-white" : "bg-red-50"
                      )}
                    >
                      {foundOption ? (
                        <div className="flex flex-col space-y-4 divide-y">
                          <div className="flex flex-row items-center justify-between gap-x-12">
                            <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-lg text-white">
                              G
                            </div>
                            <span className="text-sm font-bold text-gray-800">
                              {foundOption.name}
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-between pt-3 gap-x-4">
                            <span className="text-sm text-primary-600 dark:text-gray-100">
                              INITIAL
                            </span>
                            <span className="text-sm text-gray-800 flex items-center gap-x-2 justify-center">
                              <span className="font-bold line-clamp-1 w-60 truncate text-right">
                                {foundOption.value || "-"}
                              </span>
                              <CopyText text={foundOption.value} />
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-between pt-3 gap-x-4">
                            <span className="text-sm text-primary-600 dark:text-gray-100">
                              CURRENT
                            </span>
                            <span className="text-sm font-bold text-gray-800 flex items-center gap-x-2 justify-center">
                              <span className="font-bold line-clamp-1 w-60 truncate text-right">
                                {foundOption.value || "-"}
                              </span>
                              <CopyText text={foundOption.value} />
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-between pt-3 gap-x-4">
                            <span className="text-sm text-primary-600 dark:text-gray-100">
                              SCOPE
                            </span>
                            <span className="text-sm">Global</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-y-2">
                          <div className="flex flex-row gap-x-4 items-center">
                            <InfoIcon className="w-6 h-6 text-red-600" />
                            <span className="text-base font-bold text-gray-800">
                              Unresolved Variable
                            </span>
                          </div>
                          <div className="flex flex-col gap-y-2">
                            <p className="text-sm text-gray-500">
                              <b>{word}</b> environment variable is not defined.
                            </p>
                            <p className="text-sm text-gray-500">
                              Make sure the variable is defined and enabled in
                              the global scope.
                            </p>
                          </div>
                        </div>
                      )}
                    </HoverCardContent>
                  </HoverCard>
                );
              }

              return <span key={i}>{word}</span>;
            })
          ) : (
            <span className="text-gray-500 text-xs">
              Enter URL or paste text
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
