import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ConvertToAscii from "@/components/features/ConvertToAscii";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br">
      <Header />
      <div className={"grow"}>
        <ConvertToAscii />
      </div>
      <Footer />
    </main>
  );
}
