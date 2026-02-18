import { AuthGuard } from "@/components/auth/auth-guard";
import { UserNav } from "@/components/auth/user-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ArtisanAccountPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="flex justify-center">
          <Card className="w-full max-w-md parchment">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl">Artisan Account</CardTitle>
              <CardDescription>Your workspace to manage your artisan profile and activity.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <p>Welcome to your artisan dashboard.</p>
              <div className="text-center">
                <UserNav />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  );
}
