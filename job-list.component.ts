import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import type { Job }     from './app.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    .card{
      background:#ffffff;
      border:1px solid #e5e7eb;
      border-radius:6px;
      padding:1rem;
      box-shadow:0 1px 2px rgba(0,0,0,.04);
    }
    .toolbar{
      display:flex;
      gap:.75rem;
      margin-bottom:.9rem;
    }
    .toolbar input,
    .toolbar select{
      padding:.35rem .5rem;
      border:1px solid #e5e7eb;
      border-radius:4px;
      width:100%;
      max-width:200px;
    }
    ul.jobs{
      list-style:none;
      padding:0;
      margin:0;
    }
    li{
      border-bottom:1px solid #e5e7eb;
      padding:.6rem 0;
    }
    .header{
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      gap:.4rem;
      cursor:pointer;
    }
    .badge{
      font-size:.75rem;
      padding:2px 6px;
      border-radius:4px;
      background:#eef;
      color:#4f46e5;
    }
    .tag{
      font-size:.7rem;
      padding:2px 6px;
      border-radius:4px;
      background:#eef;
      color:#4f46e5;
    }
    .details{
      margin-top:.4rem;
      font-size:.9rem;
      color:#374151;
    }
    button.alt{
      padding:.25rem .6rem;
      margin-right:.4rem;
      border:none;
      border-radius:4px;
      background:transparent;
      color:#4f46e5;
      cursor:pointer;
    }
  `],
  template: `
    <div class="card">
      <h2>Jobs</h2>

      <!-- search & sort -->
      <div class="toolbar">
        <input
          type="text"
          [(ngModel)]="search"
          placeholder="Search by company" />

        <select [(ngModel)]="sortBy">
          <option value="">Sort</option>
          <option value="date">Date Applied</option>
          <option value="status">Status</option>
        </select>
      </div>

      <!-- list -->
      <ul class="jobs">
        <li *ngFor="let job of sortedJobs(); trackBy: trackById">
          <div class="header" (click)="toggle(job)">
            <strong>{{ job.company }}</strong> – {{ job.role }}
            <span class="badge">{{ job.status }}</span>

            <!-- optional tags -->
            <span *ngIf="job.remote"      class="tag">Remote</span>
            <span *ngIf="job.urgent"      class="tag">Urgent</span>
            <span *ngIf="job.internship"  class="tag">Internship</span>
          </div>

          <div *ngIf="job.open" class="details">
            <p>Date applied: {{ job.dateApplied }}</p>
            <p *ngIf="job.notes">Notes: {{ job.notes }}</p>

            <button class="alt" (click)="edit(job)">Edit</button>
            <button class="alt" (click)="remove(job.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  `
})
export class JobListComponent {

  /* ---------- inbound data & events ---------- */
  @Input()  jobs: Job[] = [];
  @Output() editJob   = new EventEmitter<Job>();
  @Output() deleteJob = new EventEmitter<number>();

  /* ---------- local state ---------- */
  search  = '';
  sortBy: 'date' | 'status' | '' = '';

  /* ---------- UI helpers ---------- */
  toggle(job: Job): void { job.open = !job.open; }

  edit(job: Job): void   { this.editJob.emit(job); }

  remove(id: number): void { this.deleteJob.emit(id); }

  trackById(_i: number, j: Job): number { return j.id; }

  /* ---------- computed list ---------- */
  sortedJobs(): Job[] {
    let list = this.jobs
      .filter(j => j.company.toLowerCase().includes(this.search.toLowerCase()));

    if (this.sortBy === 'date')   list = list.slice().sort((a,b) => a.dateApplied > b.dateApplied ? -1 : 1);
    if (this.sortBy === 'status') list = list.slice().sort((a,b) => a.status.localeCompare(b.status));

    return list;
  }
}