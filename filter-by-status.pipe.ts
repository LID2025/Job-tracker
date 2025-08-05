import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByStatus',
  standalone: true
})
export class FilterByStatusPipe implements PipeTransform {
  transform(jobs: any[], status: string): any[] {
    if (!status) return jobs;
    return jobs.filter(job => job.status === status);
  }
}
