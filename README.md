# QuickHire - Job Portal Application

A modern job portal built with Next.js, Firebase, and Tailwind CSS.

## Features

- User authentication (Email/Password & Google Sign-in)
- Job browsing and search
- Job application system
- Admin dashboard for job management
- Role-based access control
- Application tracking

## Tech Stack

- **Frontend:** Next.js 16, React 19
- **Authentication:** Firebase Auth
- **Styling:** Tailwind CSS, DaisyUI
- **Icons:** Lucide React
- **Backend API:** Node.js/Express (separate repository)

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account
- Backend API running on port 4000

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd quickhire
```

2. Install dependencies
```bash
npm install
```

3. Configure Firebase
Create `.env.local` file in the root directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Start development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Backend Setup

The application requires a backend API running on `https://quick-hire-server-side-jmmo.vercel.app`

### Required Endpoints:

**Users:**
- `POST /users` - Create user
- `GET /users/:uid` - Get user by Firebase UID

**Jobs:**
- `GET /jobs` - Get all jobs
- `GET /jobs/:id` - Get job by ID
- `POST /jobs` - Create job (admin)
- `PUT /jobs/:id` - Update job (admin)
- `DELETE /jobs/:id` - Delete job (admin)

**Applications:**
- `GET /applications` - Get all applications (admin)
- `POST /applications` - Submit application
- `PATCH /applications/:id` - Update application status (admin)

## User Roles

- **user** - Default role, can browse and apply for jobs
- **admin** - Can access admin dashboard and manage jobs/applications

### Making a User Admin

Update the user's role in your database:

**MongoDB:**
```javascript
db.users.updateOne(
  { uid: "firebase-uid" },
  { $set: { role: "admin" } }
)
```

**SQL:**
```sql
UPDATE users SET role = 'admin' WHERE uid = 'firebase-uid';
```

Then logout and login again.

## Project Structure

```
src/
├── app/
│   ├── (admin)/          # Admin routes
│   │   ├── admin/
│   │   │   ├── page.jsx           # Dashboard
│   │   │   ├── jobs/page.jsx      # Manage jobs
│   │   │   └── applications/page.jsx  # View applications
│   │   └── layout.jsx    # Admin layout
│   ├── (auth)/           # Auth routes
│   │   ├── login/
│   │   └── register/
│   ├── (main)/           # Public routes
│   │   ├── find-jobs/
│   │   ├── jobs/[id]/
│   │   └── page.jsx
│   └── layout.jsx
├── components/           # Reusable components
├── context/             # React context
│   └── AuthContext.jsx
├── firebase/            # Firebase config
├── utils/               # Utility functions
└── styles/
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Features Overview

### For Job Seekers:
- Browse available jobs
- Search and filter jobs
- View detailed job descriptions
- Apply for jobs with resume upload
- Track application status

### For Admins:
- Dashboard with statistics
- Add/Edit/Delete jobs
- View all applications
- Update application status
- Role-based access control

## Troubleshooting

### Admin Access Not Working
1. Ensure backend is running on port 4000
2. Check user role in database is set to "admin"
3. Logout and login again
4. Check browser console for errors

### Backend Connection Issues
- Verify backend is running: `https://quick-hire-server-side-jmmo.vercel.app`
- Check CORS is enabled on backend
- Ensure all required endpoints exist

### Firebase Authentication Issues
- Verify Firebase config in `.env.local`
- Enable Email/Password and Google auth in Firebase Console
- Check Firebase Auth domain is authorized

## License

MIT

## Support

For issues and questions, please open an issue in the repository.
