'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { ZodType } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FIELD_NAMES, FIELD_TYPES } from '@/constants';
import FileUpload from './file-upload';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { Loader2Icon } from 'lucide-react';

type AuthFormPropsType<T extends FieldValues> = {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: 'SIGN_IN' | 'SIGN_UP';
};

export default function AuthForm<T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Readonly<AuthFormPropsType<T>>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';
  const [isPending, startTransition] = useTransition();
  const isSignIn = type === 'SIGN_IN';
  const message = isSignIn ? 'Sign in' : 'Sign up';

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    startTransition(async () => {
      const result = await onSubmit(data);

      if (result.success) {
        toast.success('Welcome to BookWise', {
          description: `You have successfully ${isSignIn ? 'Signed in' : 'Signed up'} to BookWise.`,
        });

        router.replace(callbackUrl);
      } else {
        toast.error(`Error ${isSignIn ? 'Signing in' : 'Signing up'}`, {
          description: result.error ?? 'An error occurred. Please try again.',
        });
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? 'Welcome back to BookWise' : 'Create your library account'}
      </h1>

      <p className="text-light-100">
        {isSignIn
          ? 'Access the vast collection of resources, and stay updated!'
          : 'Please complete all fields and upload a valid university ID to gain access to the library.'}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === 'universityCard' ? (
                      <FileUpload
                        type="image"
                        accept="image/*"
                        placeholder="Upload your ID Card"
                        folder="ids"
                        variant="dark"
                        onFileChange={field.onChange}
                        value={field.value}
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button disabled={isPending} type="submit" className="form-btn">
            {isPending ? (
              <Loader2Icon className="animate-spin" size={24} />
            ) : (
              message
            )}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? 'New to BookWise? ' : 'Already have an account? '}

        <Link
          href={isSignIn ? '/sign-up' : '/sign-in'}
          className="font-bold text-primary"
        >
          {isSignIn ? 'Create an account' : 'Sign in'}
        </Link>
      </p>
    </div>
  );
}
