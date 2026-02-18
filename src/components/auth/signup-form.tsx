'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { useToast } from '@/hooks/use-toast';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PasswordInput } from '../ui/password-input';
import { useAuth } from '@/firebase';
import { cn } from '@/lib/utils';

type SignupRole = 'user' | 'artisan';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export function SignupForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<SignupRole>('user');
  const auth = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('loginRole', role);
      }

      toast({
        title: 'Account Created',
        description: role === 'artisan'
          ? "Your artisan account is ready."
          : "Welcome! You've been successfully signed up.",
      });

      router.push(role === 'artisan' ? '/artisan-account' : '/account');
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'There was a problem with your request.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <FormLabel>Sign Up As</FormLabel>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={role === 'user' ? 'default' : 'outline'}
              onClick={() => setRole('user')}
              className={cn('w-full')}
            >
              User
            </Button>
            <Button
              type="button"
              variant={role === 'artisan' ? 'default' : 'outline'}
              onClick={() => setRole('artisan')}
              className={cn('w-full')}
            >
              Artisan
            </Button>
          </div>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : `Create ${role === 'artisan' ? 'Artisan' : 'User'} Account`}
        </Button>
      </form>
    </Form>
  );
}
