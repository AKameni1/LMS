'use client';

import AuthForm from '@/components/auth-form';
import { signUp } from '@/lib/actions/auth';
import { signUpSchema } from '@/lib/validations';

export default function Page() {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: '',
        password: '',
        fullName: '',
        universityId: 0,
        universityCard: '',
      }}
      onSubmit={signUp}
    />
  );
}
