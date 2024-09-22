import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const router = useRouter();

  return (
    <DefaultLayout>
      <section className="my-auto flex flex-col items-center justify-center gap-10">
        <h1 className="text-5xl font-semibold text-center">👋 Welcome!</h1>
        <h2 className="text-2xl font-medium text-center">
          A book cannot by itself teach how to play. It can only serve as a
          guide, and the rest must be learned by experience
        </h2>
        <Button
          color="primary"
          size="lg"
          onClick={() => router.push("/chess-board")}
        >
          Let&apos;s Play
        </Button>
      </section>
    </DefaultLayout>
  );
}
