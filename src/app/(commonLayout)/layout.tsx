import Footer from "@/components/layout/Footer";
import { Navbar1 } from "@/components/layout/navbar1";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar1></Navbar1>
      <main className="flex-grow">{children}</main>
      <Footer></Footer>
    </div>
  )
}