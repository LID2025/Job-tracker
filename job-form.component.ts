import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles:[`
    .card{
      background:#ffffff;border:1px solid #e5e7eb;border-radius:6px;
      padding:1rem;margin-bottom:1.25rem;box-shadow:0 1px 2px rgba(0,0,0,.04);
    }
    .grid{display:grid;gap:.75rem;}
    h2{font-size:1.25rem;margin:0 0 .75rem;}
    input,select{padding:.35rem .5rem;border:1px solid #e5e7eb;border-radius:4px;width:100%;}
    label.checkbox{font-size:.85rem;display:flex;align-items:center;gap:.4rem;}
    button{
      margin-top:.5rem;
      padding:.4rem .9rem;border:none;border-radius:4px;
      background:#4f46e5;color:#fff;cursor:pointer;
    }
  `],
  template: `
    <div class="card">
      <h2>Add / Edit Job</h2>

      <form (ngSubmit)="submitForm()" #jobForm="ngForm" class="grid">
        <input type="text"  [(ngModel)]="job.company" name="company"  placeholder="Company"  required />
        <input type="text"  [(ngModel)]="job.role"    name="role"     placeholder="Role"     required />
        <input type="date"  [(ngModel)]="job.dateApplied" name="dateApplied" required />

        <select [(ngModel)]="job.status" name="status">
          <option *ngFor="let s of statuses" [value]="s">{{ s }}</option>
        </select>

        <div class="grid" style="grid-template-columns:repeat(3,auto);gap:.5rem;">
          <label class="checkbox"><input type="checkbox" [(ngModel)]="job.remote"     name="remote">Remote</label>
          <label class="checkbox"><input type="checkbox" [(ngModel)]="job.urgent"     name="urgent">Urgent</label>
          <label class="checkbox"><input type="checkbox" [(ngModel)]="job.internship" name="internship">Internship</label>
        </div>

        <label>Resume <input type="file" (change)="pickFile($event,'resume')"></label>
        <label>Cover letter <input type="file" (change)="pickFile($event,'coverLetter')"></label>

        <button type="submit">Save</button>
      </form>
    </div>
  `
})
export class JobFormComponent {
  @Output() jobAdded = new EventEmitter<any>();

  statuses = ['Applied','Interview','Offer','Rejected'];

  job:any = {
    company:'', role:'', dateApplied:'', status:'Applied',
    remote:false, urgent:false, internship:false,
    resume:null, coverLetter:null
  };

  pickFile(evt:any, field:'resume'|'coverLetter'){
    const file = evt.target.files?.[0] ?? null;
    this.job[field] = file;
  }

  submitForm(){
    this.job.id = Date.now();
    this.jobAdded.emit({ ...this.job });
    this.job = { ...this.job, company:'', role:'', dateApplied:'',
                 remote:false, urgent:false, internship:false,
                 resume:null, coverLetter:null };
  }
}