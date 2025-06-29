import type { PropsWithChildren } from "react";
import { ActivityIcon } from "lucide-react";

import Link from "next/link";
import { Geist } from "next/font/google";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const Page = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={`my-9 max-w-[1000px] mx-auto px-6 lg:px-0 ${geistSans.className}`}
    >
      <header className="flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="mr-3">
              <ActivityIcon />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/data">Data</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu className="ml-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Button variant="outline">
                  <Link
                    target="_blank"
                    href="https://github.com/searchtheoryio/signatures"
                  >
                    Edit on GitHub
                  </Link>
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <main className="py-9">{children}</main>
      <footer>
        <>bots.searchtheory.io</>
        <>&nbsp;/&nbsp;</>
        <>
          Maintained by
          <>&nbsp;</>
          <Link
            className="underline"
            href="https://www.linkedin.com/in/simon-thompson/"
          >
            Simon
          </Link>
          <>.</>
        </>
      </footer>
    </div>
  );
};
