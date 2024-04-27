import { Navigation, User } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/assets/Icons";
import Onboarding from "@/components/onboarding";
import { Button } from "@/components/ui/button";
import { paths } from "@/constants/paths";

export default async function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-4 relative">
      <header className="flex flex-row items-center justify-between w-full sticky top-0 bg-white p-4 shadow-md z-10">
        <Link href={paths.home}>
          <Logo className="h-12 w-12 text-primary border p-1 rounded-full" />
        </Link>
        <div>
          <Button asChild className="gap-x-2" variant="none">
            <Link href={paths.login}>
              <User />
              Login
            </Link>
          </Button>
          <Button asChild className="gap-x-2" variant="none">
            <Link href={paths.register}>
              <Navigation />
              Register
            </Link>
          </Button>
        </div>
      </header>
      <Onboarding />
    </main>
  );
}
