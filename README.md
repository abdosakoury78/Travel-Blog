✈️ Travel Blog

A responsive single-page travel blog application built with Angular 18, featuring blog post browsing, user authentication, profile management, and post creation.

🚀 Live Demo

🔗 https://travel-blog-sorbet-884aab.netlify.app/

📸 Features
🏠 Home Page — Landing section with a hero banner and a preview of the 3 latest blog posts
📝 Blog Page — Paginated list of travel posts fetched from a remote JSON API (6 posts per page, 3 pages)
📄 Post Detail Page — Full post view with like toggle, comment thread, and reply support
🔐 Auth System — Flip-card Login / Sign-up form with client-side validation using localStorage
👤 Profile Page — View and edit account details, and create new blog posts with optional image upload
📬 Contact Page — Static contact/inquiry section
📱 Responsive Navbar — Mobile hamburger menu with active link highlighting
🛠️ Tech Stack
Technology	Purpose
Angular 18	Frontend framework (standalone components)
TypeScript	Type-safe development
Bootstrap 5	Responsive layout and UI utilities
Font Awesome 6	Icon library
Angular HttpClient	REST API consumption
Angular Router	Client-side navigation with route params
LocalStorage	Client-side user persistence
Karma + Jasmine	Unit testing
📁 Project Structure
src/
├── app/
│   ├── app.component.*          # Root shell (navbar + router outlet)
│   ├── app.config.ts            # App-level providers (HttpClient, Router)
│   ├── app.routes.ts           # Route definitions
│   ├── login.service.ts        # Singleton auth state service
│   │
│   ├── navbar/                # Top navigation bar
│   ├── home/                  # Landing page + latest posts preview
│   ├── blog/                  # Paginated blog listing
│   ├── post-page/             # Individual post view (comments, likes)
│   ├── login/                 # Login + signup flip-card
│   ├── profile/               # User profile editor + post creator
│   ├── contact/               # Contact page
│   └── footer/                # Shared footer component
│
├── assets/
│   └── images/                # Static image assets
├── styles.css                 # Global styles
└── index.html                 # App entry point
⚙️ Getting Started
Prerequisites
Node.js v18+
Angular CLI v18
npm install -g @angular/cli
Installation
git clone https://github.com/abdosakoury78/travel-blog.git
cd travel-blog
npm install
Running Locally
npm start
# or
ng serve

Open http://localhost:4200
 in your browser.

Building for Production
ng build

Output will be in dist/travel-blog/browser/.

Running Tests
ng test
🔌 Data Source

Blog posts are fetched from a public GitHub JSON file:

https://raw.githubusercontent.com/abdosakoury78/my-json-files/refs/heads/master/posts.json

Each post contains:
id, title, description, details, image, date, category.

🔐 Authentication Notes

Authentication is handled client-side only using localStorage:

Users stored under users
Current session stored under user
LoginService manages auth state
User-created posts are saved inside the user object

⚠️ This is a frontend-only demo. Passwords are stored in plain text and should not be used in production.

📦 Scripts Reference
Command	Description
npm start	Run development server
npm run build	Production build
npm run watch	Watch mode build
npm test	Run unit tests
📄 License

This project is open source and intended for educational use.
