import { FormHTMLAttributes } from "react";

/**
       * console.log(requester.environment.get("PHOTOS_URL"));
        requester.environment.set("PHOTOS_URL", "https://google.com");
       */

const script = `requester.test("Status code is 201", function () {
  requester.response.to.have.status(201);
  requester.response.to.have.status(201);
});

requester.test("Status code is 500 or 501", function () {
  requester.response.to.have.status(500);
  requester.response.to.have.status(501);
});

console.log({
  data: requester.response.data, 
  status: requester.response.status
});
`;

export default function AddTest({
  requestId,
  children,
  action,
}: {
  requestId: string;
  children: React.ReactNode;
  action: FormHTMLAttributes<HTMLFormElement>["action"];
}) {
  return (
    <form action={action}>
      <input defaultValue={script} name="script" type="hidden" />
      <input defaultValue={requestId} name="requestId" type="hidden" />
      {children}
    </form>
  );
}
