import { atom, useAtom } from "jotai";
import { loadable } from "jotai/utils";

import { getVariablesById } from "@/services/variables/actions";
import { Environment, Variable } from "@prisma/client";

export const selectedEnvironmentAtom = atom<Environment | null>(null);

selectedEnvironmentAtom.debugLabel = "selectedEnvironment";

export function useSelectedEnvironment() {
  return useAtom(selectedEnvironmentAtom);
}

/**
 * An atom that fetches the variables for the selected environment.
 * {@link https://rasitcolakel.medium.com/async-atoms-easy-state-management-in-next-js-with-jotai-39fc29adecae Reference}.
 */
const variablesAtom = atom<Promise<Variable[]>>(async (get) => {
  const environment = get(selectedEnvironmentAtom);

  if (!environment?.id) {
    return [];
  }

  const response = await getVariablesById(environment.id);

  return response.data || [];
});

variablesAtom.debugLabel = "variablesAtom";

export const getVariablesAtom = loadable(variablesAtom);

getVariablesAtom.debugLabel = "getVariablesAtom";
