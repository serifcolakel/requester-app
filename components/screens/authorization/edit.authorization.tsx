import { FormHTMLAttributes } from "react";

import { Auth } from "@prisma/client";

export default function EditAuthorization({
  auth,
  action,
  children,
}: {
  auth: Auth;
  action: FormHTMLAttributes<HTMLFormElement>["action"];
  children: React.ReactNode;
}) {
  return (
    <form action={action}>
      {Object.entries(auth).map(([key, value]) => (
        <input
          defaultValue={String(value)}
          key={key}
          name={key}
          type="hidden"
        />
      ))}
      {children}
    </form>
  );
}
