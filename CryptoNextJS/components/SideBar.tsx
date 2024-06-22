'use client'
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideBar = ({user}: SideBarProps) => {
    const pathName = usePathname();
  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4 '>
            <Link href='/' className='mb-12 cursor-pointer flex flex-row items-center gap-2'>
                <Image src='/icons/logo.svg' width={34} height={34} alt={'App Logo'} 
                className='size-[24px] max-xl:size-14' />
                <h1 className='sidebar-logo'>Horizon</h1>
            </Link>
            {sidebarLinks.map((item)=>{
                const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)
                return(
                <Link href={item.route} key={item.label} className="sidebar-link"  
                style={isActive ? {background:"linear-gradient(90deg, #0179FE 0%, #4893FF 100%)"} : {}}>
                    <div className='relative size-6'>
                        <Image width={24} height={24} src={item.imgURL} alt={item.label} style={isActive ? {filter:'brightness(3) invert(0)'} : {}} />
                    </div>
                    <p className='sidebar-label' style={isActive ? {color:"white"} : {}}>
                        {item.label}
                    </p>
                </Link>)
            })}
            !!USER INFORMATION!!
        </nav>
        FOOTER
    </section>
  )
}

export default SideBar