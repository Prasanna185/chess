import { ChessBoard } from "@/components/chess-board";
import DefaultLayout from "@/layouts/default";

export default function ChessBoardPage() {
  return (
    <DefaultLayout>
      <section
        className="w-full m-auto grid gap-4"
        style={{ maxWidth: "470px" }}
      >
        <ChessBoard />
      </section>
    </DefaultLayout>
  );
}
