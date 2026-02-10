import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { JobOpportunity } from '@/lib/data';
import { Briefcase, Calendar, Mail, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type JobCardProps = {
  job: JobOpportunity;
};

export function JobCard({ job }: JobCardProps) {
  const postedDate = new Date(job.postedDate);
  const timeDiff = new Date().getTime() - postedDate.getTime();
  const daysAgo = Math.floor(timeDiff / (1000 * 3600 * 24));

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
        <Button asChild>
          <a href={`mailto:${job.contactEmail}`}>
            <Mail className="mr-2 h-4 w-4" />
            Apply Now
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
