"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

import {
  ListHoverEffect,
  ListHoverEffectItem,
} from "@/components/list-hover-effect";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ContactLink } from "@/components/contact-link";

const navItems = [
  {
    label: "Home",
    href: "/",
    scrollEffect: true,
  },
  {
    label: "Cars",
    href: "/cars",
    scrollEffect: false,
  },
  {
    label: "Bikes",
    href: "/bikes",
    scrollEffect: false,
  },
  {
    label: "Shop",
    href: "/shop",
    scrollEffect: true,
  },
];

export const Header = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Memoize navItems with active state
  const navItemsWithActive = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        isActive: pathname === item.href,
      })),
    [pathname],
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;
      const scrollPosition = Math.min(window.scrollY, scrollThreshold);
      const progress = scrollPosition / scrollThreshold;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[999] flex flex-col gap-y-4 overflow-y-scroll bg-black p-4 transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <Button
          className="size-12 self-end rounded-full bg-transparent p-0 text-base text-white hover:bg-white/10 hover:text-white md:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <RiCloseLine className="size-7" />
        </Button>

        <nav className="h-full w-full self-center">
          <ListHoverEffect className="flex h-full flex-col">
            {navItemsWithActive.map((item) => (
              <ListHoverEffectItem
                key={item.href}
                className={cn(
                  "flex flex-1 items-center justify-center px-10 font-semibold text-white",
                  item.isActive && "!opacity-100",
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </ListHoverEffectItem>
            ))}
          </ListHoverEffect>
        </nav>

        <Button
          variant="outline"
          className="h-16 w-full rounded-full bg-transparent text-base text-white hover:bg-white/10 hover:text-white"
          asChild
        >
          <Link href="mailto:contact@ridepeek.com">Contact</Link>
        </Button>
      </div>

      <header className="fixed inset-x-0 top-0 z-50 flex h-20 w-full items-center px-4 transition-colors duration-200">
        <div
          className="absolute inset-x-0 top-0 z-10 bg-black shadow-sm backdrop-blur-sm transition-transform"
          style={{
            height: "100%",
            transform: `scaleY(${navItemsWithActive.some((item) => item.isActive && item.scrollEffect) ? scrollProgress : 1})`,
            transformOrigin: "top",
          }}
        />

        <div className="relative z-10 flex size-full items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Image
              src="/logo.svg"
              alt="logo"
              width={45}
              height={45}
              className="invert-100"
            />
            <span className="text-xl font-bold">RidePeek</span>
          </Link>

          <nav className="hidden h-full md:block">
            <ListHoverEffect className="flex h-full">
              {navItemsWithActive.map((item) => (
                <ListHoverEffectItem
                  key={item.href}
                  className={cn(
                    "flex h-full items-center px-10 font-semibold text-white",
                    item.isActive && "!opacity-100",
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </ListHoverEffectItem>
              ))}
            </ListHoverEffect>
          </nav>

          <Button
            variant="outline"
            className="hidden h-12 w-32 rounded-full bg-transparent text-base text-white hover:bg-white/10 hover:text-white md:flex"
            asChild
          >
            <ContactLink>Contact</ContactLink>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="flex size-12 items-center justify-center rounded-full bg-transparent text-base text-white hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <RiMenu3Line className="size-6" />
          </Button>
        </div>
      </header>
    </>
  );
};
