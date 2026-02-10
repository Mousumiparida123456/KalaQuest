import { SignupForm } from '@/components/auth/signup-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-8 md:px-6 md:py-12">
      <Card className="w-full max-w-md parchment">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Begin Your Journey</CardTitle>
          <CardDescription>
            Create an account to start exploring.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
