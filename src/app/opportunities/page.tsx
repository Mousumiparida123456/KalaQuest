import { jobOpportunities } from '@/lib/data';
import { JobCard } from '@/components/job-card';
import { Briefcase } from 'lucide-react';

export default function OpportunitiesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline tracking-wide flex items-center justify-center gap-4">
          <Briefcase className="h-10 w-10 text-primary" />
          Artisan Opportunities
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Discover freelance projects, commissions, and job openings to empower your craft and business.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {jobOpportunities.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
