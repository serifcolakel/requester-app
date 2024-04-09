import React from "react";
import { Link } from "lucide-react";
import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import { paths } from "@/constants/paths";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between">
      <Image alt="Logo" height={40} src="/favicon.ico" width={40} />
      <Link
        className={cn(buttonVariants({ variant: "link" }))}
        href={paths.home}
      >
        Back to home
      </Link>
    </header>
  );
}
