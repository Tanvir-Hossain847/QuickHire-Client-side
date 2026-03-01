# Admin Dashboard Guide

## Overview
The QuickHire Admin Dashboard provides a complete interface for managing job postings with a separate layout from the main application.

## Features

### 1. Dashboard Overview (`/admin`)
- **Statistics Cards**: View key metrics
  - Total Jobs
  - Active Jobs
  - Total Applications
  - Average Salary
- **Quick Actions**: Fast access to common tasks
  - Add New Job
  - Manage Jobs
- **Recent Jobs Table**: View the 5 most recent job postings

### 2. Manage Jobs (`/admin/jobs`)
- **View All Jobs**: Complete list of all job postings in a table format
- **Search Functionality**: Filter jobs by title or company name
- **Add New Job**: Create new job postings with a comprehensive form
- **Edit Jobs**: Update existing job information
- **Delete Jobs**: Remove job postings with confirmation

### 3. Admin Layout
- **Sidebar Navigation**: 
  - Dashboard
  - Manage Jobs
  - User profile display
  - Logout button
- **Responsive Design**: Mobile-friendly with collapsible sidebar
- **Protected Routes**: Requires user authentication

## Job Form Fields

When adding or editing a job, the following fields are available:

### Required Fields:
- Job Title
- Company
- Location
- Job Type (Full Time, Part Time, Contract, Internship)
- Description

### Optional Fields:
- Salary
- Company Logo URL
- Requirements (one per line)
- Responsibilities (one per line)
- Tags (comma separated)

## API Endpoints Used

The admin dashboard interacts with the following endpoints:

- `GET http://localhost:4000/jobs` - Fetch all jobs
- `GET http://localhost:4000/jobs/:id` - Fetch single job
- `POST http://localhost:4000/jobs` - Create new job
- `PUT http://localhost:4000/jobs/:id` - Update existing job
- `DELETE http://localhost:4000/jobs/:id` - Delete job

## Access

1. Login to your account at `/login`
2. Navigate to `/admin` or click "Admin" in the navbar
3. The admin dashboard will be accessible to all logged-in users

## Notes

- Currently, all logged-in users can access the admin dashboard
- To restrict access to specific admin users, implement role-based authentication in the AuthContext
- Job data is fetched from and saved to your backend API at `http://localhost:4000`
