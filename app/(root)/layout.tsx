"use client"
import Navbar from "@/Components/Navbar";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Pathname = usePathname()
  return (
    
      <AnimatePresence mode="wait">
        <div key={Pathname}>

          <Navbar />
          {children}
        </div>
      </AnimatePresence>

    


  );
}
