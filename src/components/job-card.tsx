"use client";

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { JobOpportunity } from '@/lib/data';
import { Calendar, Mail, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type JobCardProps = {
  job: JobOpportunity;
};

export function JobCard({ job }: JobCardProps) {
  const [open, setOpen] = useState(false);

  const postedDate = useMemo(() => new Date(job.postedDate), [job.postedDate]);
  const timeDiff = new Date().getTime() - postedDate.getTime();
  const daysAgo = Math.floor(timeDiff / (1000 * 3600 * 24));
  const postedDateLabel = postedDate.toLocaleDateString();

  return (
    <Card className="flex flex-col parchment transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="font-headline text-2xl">{job.title}</CardTitle>
            <CardDescription className="text-primary font-semibold">{job.company}</CardDescription>
          </div>
          <Badge variant="secondary">{job.employmentType}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        <p className="text-sm text-foreground/80 line-clamp-4">{job.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Posted {daysAgo} day{daysAgo !== 1 ? 's' : ''} ago</span>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Apply Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{job.title}</DialogTitle>
              <DialogDescription>
                Application details for {job.company}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 text-sm">
              <p><span className="font-semibold">Location:</span> {job.location}</p>
              <p><span className="font-semibold">Employment Type:</span> {job.employmentType}</p>
              <p><span className="font-semibold">Posted On:</span> {postedDateLabel}</p>
              <p><span className="font-semibold">Contact Email:</span> {job.contactEmail}</p>
              <div>
                <p className="font-semibold">What to include in your application</p>
                <p className="text-muted-foreground">
                  Share your portfolio links, relevant experience, availability, and expected compensation.
                </p>
              </div>
            </div>

            <DialogFooter className="flex-col gap-3 sm:flex-col sm:items-stretch sm:space-x-0">
              <Button asChild>
                <a href={`mailto:${job.contactEmail}?subject=Application for ${encodeURIComponent(job.title)}`}>
                  Continue to Email Application
                </a>
              </Button>
              <ol className="list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
                <li>Write your message body.</li>
                <li>Attach portfolio/CV files.</li>
                <li>Send the email.</li>
              </ol>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
