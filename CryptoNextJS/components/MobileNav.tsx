'use client'
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'

const MobileNav = ({user}:MobileNavProps) => {
    const pathName = usePathname();
  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
            <SheetTrigger>
                <Image src='/icons/hamburger.svg' width={30} height={30} alt='menu' className='cursor-pointer' />
            </SheetTrigger>
            <SheetContent side="left" className='border-none bg-white'>
                <Link href='/' className='mb-12 cursor-pointer flex flex-row items-center gap-1 px-4'>
                    <Image src='/icons/logo.svg' width={34} height={34} alt={'App Logo'} />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
                </Link>
                <div className='mobilelnav-sheet'>
                    <SheetClose asChild>
                        <nav className='flex h-full flex-col gap-6 pt-16 text-white'>
                        {sidebarLinks.map((item)=>{
                            const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)
                            return(
                            <SheetClose asChild key={item.route}>
                                <Link href={item.route} key={item.label} className="mobilenav-sheet_close"
                                style={isActive ? {background:"linear-gradient(90deg, #0179FE 0%, #4893FF 100%)"} : {}}>
                                    <Image width={20} height={20} src={item.imgURL} alt={item.label} style={isActive ? {filter:'brightness(3) invert(0)'} : {}} />
                                    <p className='text-16 font-semibold text-black-2' style={isActive ? {color:"white"} : {}}>
                                        {item.label}
                                    </p>
                                </Link>
                            </SheetClose>
                        )})}
                        USER INFORMATION
                        </nav>
                    </SheetClose>
                    FOOTER
                </div>
            </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav