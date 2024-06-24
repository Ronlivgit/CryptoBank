import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  formLabel: string;
  placeholder?: string;
  description?: string;
}

const CustomFormField = <T extends FieldValues>({
  control,
  name,
  formLabel,
  placeholder,
  description
}: FormFieldProps<T>) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <FormItem>
      <FormLabel>{formLabel}</FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...field} />
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default CustomFormField;