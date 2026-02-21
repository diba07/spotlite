# 🗺️ Spotlite - Auth Flow & Technical Setup

Following the visual flowchart provided, Spotlite uses **Supabase Auth** with a **Role-Based Access Control (RBAC)** system.

## 🔄 The Flow
1. **Landing Page**: Public access.
2. **Login / Sign Up**: Users enter email/password. 
   - New users are automatically assigned the `user` role.
3. **Session Management**: Handled by Next.js Middleware. Session is refreshed on every request.
4. **Intelligent Redirection**:
   - Post-login, everyone hits `/dashboard`.
   - If user is an `admin`, they are instantly redirected to `/dashboard/admin`.
   - If user is a `user`, they stay in `/dashboard`.

## 🛠️ Tech Stack
| Layer | Tech |
|-------|------|
| Auth & DB | Supabase (@supabase/ssr) |
| Frontend | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |

## 📁 Key Files
- `utils/supabase/`: SSR client, browser client, and middleware session logic.
- `middleware.ts`: Guard for protected routes.
- `app/login/page.tsx`: Unified Auth UI.
- `app/dashboard/page.tsx`: Entry point & User view.
- `app/dashboard/admin/page.tsx`: Admin-only command center.
- `supabase_setup.sql`: Database schema & triggers for automatic profile creation.

## 🚀 Pro-tip
To make someone an admin, simply change their `role` to `'admin'` in the `profiles` table via the Supabase Dashboard.
