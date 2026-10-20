import type { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { FormField } from '@/shared/components/form/form-field';
import { Input } from '@/shared/components/ui/input';

type TextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
  readonly label: string;
  readonly type?: 'email' | 'password' | 'search' | 'text';
  readonly placeholder?: string;
};

export function TextField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  label,
  type = 'text',
  placeholder,
  ...props
}: TextFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      {...props}
      label={label}
      renderInput={(field) => (
        <Input
          id={field.name}
          type={type}
          placeholder={placeholder}
          {...field}
          value={typeof field.value === 'string' ? field.value : ''}
        />
      )}
    />
  );
}
