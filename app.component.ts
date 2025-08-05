import { Component } from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { JobFormComponent } from './job-form.component';
import { JobListComponent } from './job-list.component';

/* ---------- shared job model ---------- */
export interface Job {
  id:          number;
  company:     string;
  role:        string;
  dateApplied: string;
  status:      string;
  remote:      boolean;
  urgent:      boolean;
  internship:  boolean;
  resume?:     File | null;
  coverLetter?:File | null;
  notes?:      string;
  open?:       boolean;          // for UI expand/collapse
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, JobFormComponent, JobListComponent],
  styles: [`
    :host{
      display:block;
      max-width:780px;
      margin:2rem auto;
      font-family:Inter,Arial,Helvetica,sans-serif;
      color:#1f2937;
    }
    h1{
      font-size:1.9rem;
      margin:0 0 1.25rem;
      text-align:center;
    }
  `],
  template: `
    <h1>Job Application Tracker</h1>

    <app-job-form (jobAdded)="addJob($event)"></app-job-form>

    <app-job-list
      [jobs]="jobs"
      (editJob)="editJob($event)"
      (deleteJob)="deleteJob($event)">
    </app-job-list>
  `
})
export class AppComponent {

  jobs: Job[] = [];

  addJob(job: Job): void {
    this.jobs = [job, ...this.jobs];   // immutable update
  }

  editJob(updated: Job): void {
    this.jobs = this.jobs.map(j => j.id === updated.id ? updated : j);
  }

  deleteJob(id: number): void {
    this.jobs = this.jobs.filter(j => j.id !== id);
  }
}