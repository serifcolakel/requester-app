import { redirect } from "next/navigation";

import { paths } from "@/constants/paths";
import Register from "@/forms/Register";
import { getUser } from "@/services/auth";

export default async function Page() {
  const user = await getUser();

  if (user) {
    return redirect(paths.dashboard.index);
  }

  return <Register />;
}
