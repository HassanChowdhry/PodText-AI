import LeftNavbar from "@/components/LeftNav";
import MobileNavbar from "@/components/MobileNav";
import RightNavbar from "@/components/RightNav";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <main className="flex bg-black-3 justify-between">
        <LeftNavbar />
        
        <section className=" w-full min-h-screen flex flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
            <div className="flex h-16 justify-between md:hidden items-center">
              <Image src="/icons/logo.svg" alt="menu" width={30} height={30} />
              <MobileNavbar />
            </div>
            <div className="flex md:pb-14">
              Toaster
              {children}
            </div>
          </div>
        </section>

        <RightNavbar />
      </main>
    </div>
  );
}
