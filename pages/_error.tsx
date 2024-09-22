"use client";

import { useRouter } from "next/navigation";

import DefaultLayout from "@/layouts/default";

export default function Error() {
  const router = useRouter();

  return (
    <DefaultLayout>
      <section className="my-auto flex flex-col items-center justify-center gap-10">
        <h1>Something went wrong!</h1>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => router.back()
          }
        >
          Try again
        </button>
      </section>
    </DefaultLayout>
  );
}
