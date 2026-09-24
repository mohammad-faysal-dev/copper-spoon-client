import Footer from "@/components/layout/Footer";
import { Navbar1 } from "@/components/layout/navbar1";
import { CartProvider } from "@/providers/cart-provider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

      <div className="flex min-h-screen flex-col">
        <Navbar1 />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </div>
  
  );
}