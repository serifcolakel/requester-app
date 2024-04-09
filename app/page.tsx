import { Archive, Navigation } from "lucide-react";
import Link from "next/link";

import { paths } from "@/constants/paths";

export default async function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-4">
      <h1 className="text-4xl font-bold">Welcome to the app!</h1>
      <div className="flex flex-col items-center space-y-4">
        <Link
          className="w-40 flex flex-col items-center gap-y-4 text-primary bg-gray-100 rounded-lg p-2"
          href={paths.login}
        >
          <Archive />
          <span>Login page</span>
        </Link>
        <Link
          className="w-40 flex flex-col items-center gap-y-4 text-primary bg-gray-100 rounded-lg p-2"
          href={paths.register}
        >
          <Navigation />
          <span>Register page</span>
        </Link>
      </div>
    </main>
  );
}
