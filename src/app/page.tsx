import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Convert_To_Ascii from "@/components/features/Convert_To_Ascii";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br">
      <Header />
      <div className={"grow"}>
        <Convert_To_Ascii />
      </div>
      <Footer />
    </main>
  );
}
