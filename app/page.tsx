import { Archive, Search } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-4">
      <h1 className="text-4xl font-bold">Welcome to the app!</h1>
      <div className="flex flex-col items-center space-y-4">
        <Link href="/login">
          <Archive />
          <span>Go to the login page</span>
        </Link>
        <Link href="/search">
          <Search />
          <span>Go to the search page</span>
        </Link>
      </div>
    </main>
  );
}
