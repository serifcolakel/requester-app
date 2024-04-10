"use client";

import { atom, useAtom } from "jotai";

import { Environment } from "@prisma/client";

export const selectedEnvironmentAtom = atom<Environment | null>(null);

selectedEnvironmentAtom.debugLabel = "selectedEnvironment";

export function useSelectedEnvironment() {
  return useAtom(selectedEnvironmentAtom);
}
