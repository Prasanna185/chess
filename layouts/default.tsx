import { Link } from "@nextui-org/react";
import clsx from "clsx";
import { useEffect } from "react";

import { Head } from "./head";
import styles from "./Layouts.module.scss";

import { Navbar } from "@/components/navbar";
import { CloudSlashIcon } from "@/components/icons";

const OFFLINE = "offline";

const handleNetworkChange = (): void => {
  const {
    documentElement: { classList },
  } = document;

  if (!navigator.onLine) {
    classList.add(OFFLINE);

    return;
  }

  classList.remove(OFFLINE);
};

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== undefined) {
      handleNetworkChange();

      window.addEventListener("online", handleNetworkChange);
      window.addEventListener("offline", handleNetworkChange);

      return () => {
        window.removeEventListener("online", handleNetworkChange);
        window.removeEventListener("offline", handleNetworkChange);
      };
    }
  }, []);

  return (
    <>
      <div
        className={clsx(
          "items-center justify-center text-sm leading-none text-white bg-danger",
          styles.offline,
        )}
      >
        <CloudSlashIcon /> You are currently browsing in offline mode.
      </div>
      <div className="relative flex flex-col h-screen">
        <Head />
        <Navbar />
        <main className="container mx-auto max-w-7xl p-6 flex items-center justify-center flex-grow">
          {children}
        </main>
        <footer className="w-full flex items-center justify-center py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://www.linkedin.com/in/prasanna-hegde-8583b5a3/"
            title="Prasanna linkedin page"
          >
            <span className="text-default-600">Developed by</span>
            <p className="text-primary">Prasanna Hegde</p>
          </Link>
        </footer>
      </div>
    </>
  );
}
