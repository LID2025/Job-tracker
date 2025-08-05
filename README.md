# Job Application Tracker

A full-stack job tracking application built with **Angular** and **Flask**, designed to help users efficiently organize, track, and manage their job applications in one place.

## 🚀 Features

-  **Search Applications** – Instantly filter jobs by company name.
-  **Sort by Date Applied** – Automatically organize job entries by application date.
-  **Tagging System** – Label applications with custom tags like `Remote`, `Urgent`, or `Internship`.
-  **Collapsible Job Cards** – Expand or collapse each card to view or hide job details.
-  **File Uploads** – Upload and manage resumes or cover letters for each job.

## 🛠 Tech Stack

- **Frontend:** Angular (using standalone components)
- **Backend:** Flask (Python)
- **Database:** SQLite

## 🧪 How to Run the Project

### Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

### Backend (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate    
pip install -r requirements.txt
flask run
```

## 📁 File Uploads

Each job entry allows for optional file attachments:
- Resume (PDF or DOCX)
- Cover Letter

Files are handled by the Flask backend and stored on the server.
