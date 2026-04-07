# CareerCompass – Career Assessment Tool
**FSAD-PS30** | Web-based career assessment platform for students

## 🗂 Folder Structure

```
career-assessment/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── ProtectedRoute.jsx       # Role-based route guard
│   │   ├── student/
│   │   │   └── StudentNav.jsx           # Student navbar
│   │   └── admin/
│   │       └── AdminNav.jsx             # Admin navbar
│   ├── context/
│   │   ├── AuthContext.js               # Login/logout state (student + admin)
│   │   └── AssessmentContext.js         # Assessment submission & results state
│   ├── data/
│   │   └── mockData.js                  # Careers, assessments, credentials
│   ├── pages/
│   │   ├── student/
│   │   │   ├── Login.jsx                # Student login
│   │   │   ├── Dashboard.jsx            # Student dashboard
│   │   │   ├── CareerLibrary.jsx        # Browse all careers (search + filter)
│   │   │   ├── CareerDetail.jsx         # Individual career page
│   │   │   ├── AssessmentList.jsx       # All available assessments
│   │   │   ├── AssessmentQuiz.jsx       # Quiz flow with progress bar
│   │   │   └── Results.jsx             # Trait analysis + career recommendations
│   │   └── admin/
│   │       ├── AdminLogin.jsx           # Admin login
│   │       ├── AdminDashboard.jsx       # Overview stats
│   │       ├── ManageCareers.jsx        # CRUD for careers
│   │       └── ManageAssessments.jsx    # Edit assessment questions inline
│   ├── App.js                           # All routes (react-router-dom v6)
│   ├── index.js
│   └── styles.css                       # Full design system (dark theme)
└── package.json
```

## 🚀 Getting Started

```bash
cd career-assessment
npm install
npm start
```

## 🔐 Demo Credentials

**Student Login** → `/login`
- Email: `alex@student.com` | Password: `pass123`
- Email: `priya@student.com` | Password: `pass123`

**Admin Login** → `/admin/login`
- Email: `admin@careerapp.com` | Password: `admin123`

## ✨ Features

### Student
- 🔐 Protected login with role-based routing
- 📊 Dashboard with progress stats and quick actions
- 🗂 Career Library with search + category filter
- 📄 Career Detail pages with salary, outlook, skills, traits
- 🧩 Personality Assessment (5 questions)
- ⚡ Skills Evaluation (4 questions)
- 💻 Software Engineering specific assessment (3 questions)
- 📈 Results page with trait analysis + personalized career recommendations

### Admin
- ⚙️ Secure admin login (separate from student)
- 📊 Dashboard with platform statistics
- 🗂 Full CRUD for careers (add, edit, delete with modal)
- 🧩 Inline question editing for all assessments (add/edit/delete questions)

## 🔧 Tech Stack
- React 18 + Functional Components + Hooks
- React Router DOM v6 (protected routes, nested routing)
- Context API (Auth + Assessment state management)
- CSS (custom design system, dark theme, responsive)
- No backend — all state managed in-memory (swap mockData.js for API calls)

## 🔌 Extending with a Backend
Replace `mockData.js` imports with `fetch()` / `axios` API calls:
- `GET /api/careers` → replace `careers` array
- `POST /api/auth/login` → replace `loginStudent()` / `loginAdmin()`
- `POST /api/assessments/submit` → replace `submitResult()`
- `GET /api/results/:userId` → replace `results` state
