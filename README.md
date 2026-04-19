# ✈️ Travel Blog

A responsive single-page travel blog application built with **Angular 18**, featuring blog post browsing, user authentication, profile management, and post creation.

---

## 🚀 Live Demo

> https://travel-blog-sorbet-884aab.netlify.app/

---

## 📸 Features

- 🏠 **Home Page** — Landing section with a hero banner and a preview of the 3 latest blog posts
- 📝 **Blog Page** — Paginated list of travel posts fetched from a remote JSON API (6 posts per page, 3 pages)
- 📄 **Post Detail Page** — Full post view with like toggle, comment thread, and reply support
- 🔐 **Auth System** — Flip-card Login / Sign-up form with client-side validation using `localStorage`
- 👤 **Profile Page** — View and edit account details, and create new blog posts with optional image upload
- 📬 **Contact Page** — Static contact/inquiry section
- 📱 **Responsive Navbar** — Mobile hamburger menu with active link highlighting

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Angular 18 | Frontend framework (standalone components) |
| TypeScript | Type-safe development |
| Bootstrap 5 | Responsive layout and UI utilities |
| Font Awesome 6 | Icon library |
| Angular HttpClient | REST API consumption |
| Angular Router | Client-side navigation with route params |
| LocalStorage | Client-side user persistence |
| Karma + Jasmine | Unit testing |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── app.component.*          # Root shell (navbar + router outlet)
│   ├── app.config.ts            # App-level providers (HttpClient, Router)
│   ├── app.routes.ts            # Route definitions
│   ├── login.service.ts         # Singleton auth state service
│   │
│   ├── navbar/                  # Top navigation bar
│   ├── home/                    # Landing page + latest posts preview
│   ├── blog/                    # Paginated blog listing
│   ├── post-page/               # Individual post view (comments, likes)
│   ├── login/                   # Login + signup flip-card
│   ├── profile/                 # User profile editor + post creator
│   ├── contact/                 # Contact page
│   └── footer/                  # Shared footer component
│
├── assets/
│   └── images/                  # Static image assets
├── styles.css                   # Global styles
└── index.html                   # App entry point
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Angular CLI](https://angular.dev/tools/cli) v18

```bash
npm install -g @angular/cli
```

### Installation

```bash
# Clone the repository
git clone https://github.com/abdosakoury78/travel-blog.git
cd travel-blog

# Install dependencies
npm install
```

### Running Locally

```bash
npm start
# or
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### Building for Production

```bash
ng build
```

Output is placed in `dist/travel-blog/browser/`.

### Running Tests

```bash
ng test
```

---

## 🔌 Data Source

Blog posts are fetched from a public GitHub-hosted JSON file:

```
https://raw.githubusercontent.com/abdosakoury78/my-json-files/refs/heads/master/posts.json
```

Each post object contains: `id`, `title`, `description`, `details`, `image`, `date`, and `category`.

---

## 🔐 Authentication Notes

Authentication is handled **client-side only** using `localStorage`:

- Registered users are stored under the `users` key in `localStorage`
- The currently logged-in user session is stored under the `user` key
- The `LoginService` singleton manages the in-memory login state across components
- User-created posts are stored inside the user object in `localStorage`

> ⚠️ This is a frontend-only demo. Do not use real passwords — credentials are stored in plain text in the browser.

---

## 📦 Scripts Reference

| Command | Description |
|---|---|
| `npm start` | Start dev server at localhost:4200 |
| `npm run build` | Production build |
| `npm run watch` | Build in watch mode (development) |
| `npm test` | Run unit tests via Karma |

---

## 📄 License

This project is open source and available for educational purposes.
