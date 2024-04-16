import { useAtom } from "jotai";

import { fetcher } from "@/services/response";
import {
  createNewVariable,
  deleteVariable,
  updateVariable,
} from "@/services/variables/actions";
import { getVariablesAtom, useSelectedEnvironment } from "@/store/async-atoms";
import { Handler } from "@/types";
import { sleep } from "@/utils/async.utils";
import { executeTests } from "@/utils/tests.util";

type Props = {
  test: string;
  result: Awaited<ReturnType<typeof fetcher>>;
};

export default function useTest() {
  const [response] = useAtom(getVariablesAtom);

  const [selectedEnvironment, setselectedEnvironment] =
    useSelectedEnvironment();

  const revalidateEnvironment = async () => {
    localStorage.setItem(
      "selectedEnvironment",
      JSON.stringify(selectedEnvironment)
    );

    await sleep(20);
    setselectedEnvironment(null);
    await sleep(20);

    setselectedEnvironment(
      JSON.parse(localStorage.getItem("selectedEnvironment")!)
    );
  };

  const variables = response.state === "hasData" ? response.data : [];

  const environment: Handler["environment"] = {
    set: async (key, value) => {
      if (!selectedEnvironment) {
        return;
      }

      const variable = variables.find((v) => v.name === key);

      if (variable) {
        const form = new FormData();

        form.append("id", variable.id);
        form.append("name", key);
        form.append("value", String(value));
        form.append("environmentId", variable.environmentId);

        await updateVariable(form);
      } else {
        const form = new FormData();

        form.append("name", key);
        form.append("value", String(value));
        form.append("environmentId", variables[0].environmentId);

        await createNewVariable(form);
      }

      await revalidateEnvironment();
    },
    replace: async (key, value) => {
      if (!selectedEnvironment) {
        return;
      }

      const variable = variables.find((v) => v.name === key);

      if (variable) {
        setselectedEnvironment(null);
        const form = new FormData();

        form.append("id", variable.id);
        form.append("name", key);
        form.append("value", String(value));
        form.append("environmentId", variable.environmentId);

        await updateVariable(form);

        await revalidateEnvironment();
      }
    },
    get: (key) => {
      const variable = variables.find((v) => v.name === key);

      return variable?.value;
    },
    unset: async (key) => {
      const variable = variables.find((v) => v.name === key);

      if (variable) {
        const form = new FormData();

        form.append("id", variable.id);

        await deleteVariable(form);

        await revalidateEnvironment();
      }
    },
  };

  const executeTest = async ({ test, result }: Props) => {
    return executeTests(test, result, { environment });
  };

  return { executeTest };
}
