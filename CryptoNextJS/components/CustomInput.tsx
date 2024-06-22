import React from 'react'
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

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>,
  label: string,
  placeholder: string
}

const CustomInput = ({control , label , placeholder}:CustomInput) => {
  return (
    <div>CustomInput</div>
  )
}

export default CustomInput