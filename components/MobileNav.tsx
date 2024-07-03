"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { links } from "./LeftNav";
import { useUser } from "@clerk/nextjs";

const MobileNavbar = () => {
  const { user } = useUser();
  const Id = user?.id;
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src='/icons/hamburger.svg'
          width={30}
          height={30}
          alt='hamburger'
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="border-none bg-black-1"
      >
        <Link 
          href="/" 
          className='flex items-center gap-3 pb-10 pl-4'>
          <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
          <h1 className='text-[24px] font-extrabold text-white-1 ml-2'> PodText AI </h1>
        </Link>

        <div className="flex h-[calc(100vh-72px)] flex-col justify-between oveflow-y-auto">
          <SheetClose className="text-white-1">
            {links.map(({ route, label, imageURL }, index) => {
              const isActive = pathname === route || pathname.startsWith(`${route}/`);
                return (
                <SheetClose asChild key={index}>
                  <Link 
                    className={`${isActive && "bg-nav-focus border-r-4 border-sakura-1"} 
                      flex gap-3 py-6 items-center max-lg:px-4 justify-start lg:justify-start`}
                    href={route==="/profile" ? `/profile/${Id}` : route}
                    key={label}>
                    <Image src={imageURL} alt={label} width={30} height={30} />
                    <p>{label}</p>
                  </Link>
                </SheetClose>
              )
            })}
          </SheetClose>
        </div>

      </SheetContent>
    </Sheet>
  )
}

export default MobileNavbar