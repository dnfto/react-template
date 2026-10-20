import type { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Label } from '@/shared/components/ui/label';

type FormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
  readonly label: string;
  readonly renderInput: (field: {
    value: unknown;
    onChange: (...event: unknown[]) => void;
    onBlur: () => void;
    name: string;
  }) => React.ReactNode;
};

export function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  label,
  renderInput,
  ...controllerProps
}: FormFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      {...controllerProps}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{label}</Label>
          {renderInput(field)}
          {fieldState.error ? (
            <p className="text-sm text-destructive">{fieldState.error.message}</p>
          ) : null}
        </div>
      )}
    />
  );
}
