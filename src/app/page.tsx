import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br">
      <Header />
      <div className={"grow"}>TEST</div>
      <Footer />
    </main>
  );
}
