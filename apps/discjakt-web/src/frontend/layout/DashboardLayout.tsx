import React from "react";

import clsx from "clsx";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { LoadingPage } from "../components";

type LinkType = {
  href: string;
  label: React.ReactNode;
  color: {
    hover: string;
    border: string;
  };
};

type Props = React.PropsWithChildren<{
  className?: string;
}>;

const links: LinkType[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    color: {
      hover: "hover:border-pink-500",
      border: "border-pink-500",
    },
  },
  {
    href: "/dashboard/data-cleaning",
    label: "Data Cleaning",
    color: {
      hover: "hover:border-sky-500",
      border: "border-sky-500",
    },
  },
  {
    href: "/dashboard/brands",
    label: "Brands",
    color: {
      hover: "hover:border-amber-500",
      border: "border-amber-500",
    },
  },
  {
    href: "/dashboard/discs",
    label: "Discs",
    color: {
      hover: "hover:border-lime-500",
      border: "border-lime-500",
    },
  },
  {
    href: "/dashboard/plastics",
    label: "Plastics",
    color: {
      hover: "hover:border-red-500",
      border: "border-red-500",
    },
  },
];

const DashboardLayout: React.FC<Props> = ({ className, children }) => {
  const router = useRouter();
  const { pathname } = router;

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (session?.user.role?.toLowerCase() !== "admin") {
    return (
      <div>
        <p>no authorized</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="bg-slate-200 w-full lg:min-h-screen lg:w-48">
        <div className="flex flex-col">
          <ul className="flex flex-col flex-wrap py-3 px-2">
            {links.map((link) => (
              <li key={link.href} className="mr-3 flex-1">
                <Link
                  href={link.href}
                  className={clsx(
                    "block py-3 pl-1 align-middle no-underline hover:text-slate-900 border-b-2",
                    link.color.hover,

                    pathname === link.href
                      ? `${link.color.border} text-slate-900`
                      : "border-slate-200 text-slate-500"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className={clsx("flex-1 p-4 overflow-x-auto", className)}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
