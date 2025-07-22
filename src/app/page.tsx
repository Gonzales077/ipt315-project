import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="">
      <SignedOut>
       <div className="h-full w-full text-center text-2xl">
          Please Sign In Above to Continue!
       </div>
      </SignedOut>
      <SignedIn>
         <div className="h-full w-full text-center text-2xl">
            Welcome Back!
       </div>
      </SignedIn>
    </main>
  );
}
