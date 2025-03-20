import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ReactNode } from "react"; 

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Header />

      
      <main className="container mx-auto p-6 bg-gray-800">{children}</main>

      <Footer backgroundColor="bg-gray-800" />
      
    </div>
  );
}
