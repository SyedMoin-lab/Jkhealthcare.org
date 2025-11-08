"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { route } from "@/common/config/route";
import { GlobalSearch } from "@/common/search/global-search";
import { ModeToggle } from "@/common/theme/dark-mode";

const serviceLinks = [
  { label: "Find Centers", href: route.findCenters.path },
  { label: "Doctors", href: route.doctors.path },
  { label: "Doctors List", href: route.doctorsList.path },
  { label: "Lab Tests", href: route.labTests.path },
];

const relationshipLinks = [
  { label: "Patients", href: route.patients.path },
  { label: "Partnerships", href: route.partnerships.path },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileRelationsOpen, setIsMobileRelationsOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
    setIsMobileRelationsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3">
        <div className="flex h-16 items-center gap-4">
          <Link
            href={route.home.path}
            className="text-lg font-semibold gradient-text"
          >
            jkhealthcare.org
          </Link>

          <nav className="hidden lg:flex flex-1 items-center gap-6">
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                Services
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 mt-3 min-w-[12rem] rounded-xl border bg-background p-2 text-sm shadow-lg opacity-0 transition-all duration-150 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {serviceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                Patients & Partnerships
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 mt-3 min-w-[12rem] rounded-xl border bg-background p-2 text-sm shadow-lg opacity-0 transition-all duration-150 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {relationshipLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href={route.doctorsList.path}
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              Doctors List
            </Link>
            <Link
              href={route.emergencyCare.path}
              className="rounded-md px-3 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              Emergency Care
            </Link>
          </nav>
          <div className="hidden lg:flex flex-1 items-center justify-end gap-3">
            <GlobalSearch className="w-full max-w-md xl:max-w-xl" />
            <ModeToggle />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="ml-auto lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-3 flex items-center gap-3 lg:hidden">
          <GlobalSearch />
          <ModeToggle />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex h-screen w-full flex-col bg-background lg:hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-4 shrink-0">
            <span className="text-lg font-semibold text-foreground">Menu</span>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <nav className="flex-1 flex flex-col gap-2 px-4 py-4 overflow-y-auto">
            <Link
              href={route.home.path}
              onClick={closeMobileMenu}
              className="rounded-lg px-4 py-3 text-base font-semibold text-foreground transition hover:bg-primary/10"
            >
              Home
            </Link>

            <div className="rounded-lg border border-border bg-muted/30">
              <button
                type="button"
                onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium text-foreground"
              >
                <span>Services</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    isMobileServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isMobileServicesOpen && (
                <div className="space-y-1 border-t border-border bg-muted/50 px-3 py-2">
                  {serviceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={route.doctorsList.path}
              onClick={closeMobileMenu}
              className="rounded-lg px-4 py-3 text-base font-semibold text-foreground transition hover:bg-primary/10"
            >
              Doctors List
            </Link>

            <div className="rounded-lg border border-border bg-muted/30">
              <button
                type="button"
                onClick={() => setIsMobileRelationsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium text-foreground"
              >
                <span>Patients & Partnerships</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    isMobileRelationsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isMobileRelationsOpen && (
                <div className="space-y-1 border-t border-border bg-muted/50 px-3 py-2">
                  {relationshipLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={route.emergencyCare.path}
              onClick={closeMobileMenu}
              className="rounded-lg bg-red-50 px-4 py-3 text-base font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50"
            >
              Emergency Care
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
