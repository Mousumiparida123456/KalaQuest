import { Card, CardTitle } from '@/components/ui/card';
import type { LucideProps } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type PlayCardProps = {
  icon: React.ComponentType<LucideProps>;
  title: string;
  href: string;
};

export function PlayCard({ icon: Icon, title, href }: PlayCardProps) {
  return (
    <Link href={href} className="block h-full">
      <Card className="parchment text-center flex flex-col items-center justify-center p-6 h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
        <Icon className="h-12 w-12 text-primary mb-4" />
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
      </Card>
    </Link>
  );
}
