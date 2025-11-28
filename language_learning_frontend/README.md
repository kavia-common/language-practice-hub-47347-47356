This is a Next.js app for the Language Practice Hub.

Routes:
- /           Home
- /lessons    Lessons list
- /lessons/[id]  Lesson detail with Overview, Practice, and Review tabs
- /quiz       Multiple-choice quiz flow with results
- /progress   Progress dashboard

Mock data:
- public/data/lessons.json
- public/data/quiz_questions.json
- public/data/progress.json

Environment:
- NEXT_PUBLIC_API_BASE or NEXT_PUBLIC_BACKEND_URL (optional) to point to an API; if unset or fetch fails, mock JSON is used.

Run:
- npm run dev

Styling:
- Ocean Professional theme implemented via CSS tokens and utilities in src/app/globals.css
