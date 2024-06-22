'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Divide } from 'lucide-react'

const formSchema = z.object({
    fullName: z.string().min(2, {
      message: "Full name must be at least 2 characters.",
    }),
    email : z.string().min(4, {
        message : "Email must b at least 4 characters"
    }),
    password: z.string().min(6,{
        message : "Password must be at least 6 characters"
    })
  })

const AuthForm = ({type}: {type:string}) => {

    const [user, setUser] = useState(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email:"",
          password:""
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href='/' className='mb-12 cursor-pointer flex flex-row items-center gap-1 px-4'>
                <Image src='/icons/logo.svg' width={34} height={34} alt={'App Logo'} />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
            </Link>

            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                   {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'} 
                    <p className='text-16 font-normal text-gray-600'>
                        {user ? 'Link your account to get started' : 'please enter your details.'}
                    </p>
                </h1>
            </div>
        </header>
        {user ? (
        <div className='flex flex-col gap-4'>
            {/* {PlaidLink} */}
        </div>
        ) : (
            <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <div className='form-item'>
                            <FormLabel className='form-label'>
                                Email
                            </FormLabel>
                            <div className='flex w-full flex-col'>
                                <FormControl>
                                    <Input 
                                    placeholder='Enter your email '
                                    className='input-class'
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage className='form-message mt-2' />
                            </div>
                        </div>
                    )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
        )}
    </section>
  )
}

export default AuthForm