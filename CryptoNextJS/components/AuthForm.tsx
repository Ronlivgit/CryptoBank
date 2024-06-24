'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldValues } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CustomFormField from './FormField';
import { signUpSchema, signInSchema } from '@/constants';

type SignUpFormValues = z.infer<typeof signUpSchema>;
type SignInFormValues = z.infer<typeof signInSchema>;

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);

  const formSchema = type === 'sign-up' ? signUpSchema : signInSchema;
  const defaultValues = type === 'sign-up'
    ? { firstName: '', lastName: '', email: '', password: '' }
    : { email: '', password: '' };

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(values: FieldValues) {
    console.log(values);
  }

  return (
    <div className='flex flex-row w-screen h-screen justify-center'>
      <section className='flex flex-col justify-center w-[40vw] h-[55vh] bg-blue-500 rounded-3xl absolute top-[20vh] text-center'>
        <header className='flex flex-col gap-5 md:gap-8 bg-green-200'>
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
            {type === 'sign-up' ? (
              <div className='flex flex-col justify-center gap-2 relative left-[20%] w-3/5 mt-10'>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-center space-y-2'>
                    <CustomFormField
                      control={form.control}
                      name='firstName'
                      formLabel='First Name : '
                      placeholder='Enter your first name : '
                    />
                    <CustomFormField
                      control={form.control}
                      name='lastName'
                      formLabel='Last Name : '
                      placeholder='Enter your last name : '
                    />
                    <CustomFormField
                      control={form.control}
                      name='email'
                      formLabel='Email Address : '
                      placeholder='Enter your email address : '
                    />
                    <CustomFormField
                      control={form.control}
                      name='password'
                      formLabel='Password : '
                      placeholder='Enter your password : '
                    />
                    <Button type='submit'>Submit</Button>
                  </form>
                </Form>
              </div>
            ) : (
              <div className='flex flex-col justify-center gap-2 relative left-[20%] w-3/5 mt-10'>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-center space-y-2'>
                    <CustomFormField
                      control={form.control}
                      name='email'
                      formLabel='Email Address : '
                      placeholder='Enter your email address : '
                    />
                    <CustomFormField
                      control={form.control}
                      name='password'
                      formLabel='Password : '
                      placeholder='Enter your password : '
                    />
                    <Button type='submit'>Submit</Button>
                  </form>
                </Form>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default AuthForm;
