<div align="center">

[![Project Banner](https://github.com/user-attachments/assets/7cff0964-6c02-4af5-aa0c-964b349cc9aa)](https://youtu.be/EZajJGOMWas)

<div>

![next.js](https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6)
![postgresql](https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=4169E1)
![upstash](https://img.shields.io/badge/-Upstash-black?style=for-the-badge&logoColor=white&logo=upstash&color=00E9A3)
![tailwindcss](https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4)

</div>

### A University Library Management System with Admin Panel

<div align="center">

Build this project step by step with our detailed tutorial on
[**JavaScript Mastery**](https://www.youtube.com/@javascriptmastery/videos)
YouTube Join the JSM family!

</div>

</div>

# 📋 <span id="table">Table of Contents</span>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🚀 [More](#more)

# <span id="introduction">🤖 Introduction</span>

Built with Next.js, TypeScript, and Postgres, the University Library Management
System is a production-grade platform featuring a public-facing app and an admin
interface. It offers advanced functionalities like seamless book borrowing with
reminders and receipts, robust user management, automated workflows, and a
modern, optimized tech stack for real-world scalability.

If you're getting started or facing any bugs, feel free to open an **issue** on
my GitHub. It's a place where I can help each other out and resolve issues
together.

[![Open an Issue](https://github.com/sujatagunale/EasyRead/assets/151519281/618f4872-1e10-42da-8213-1d69e486d02e)](https://github.com/AKameni1/university-lms/issues)

# <span id="tech-stack">⚙️ Tech Stack</span>

- Next.js
- PostgreSQL
- Upstash
- ImageKit
- TypeScript
- Resend
- Tailwind CSS

# <span id="features">🔋 Features</span>

## Features of the University Library Management System Project

👉 **Open-source Authentication**: Personalized onboarding flow with email
notifications.

👉 **Home Page**: Highlighted books and newly added books with 3D effects.

👉 **Library Page**: Advanced filtering, search, and pagination for book
discovery.

👉 **Book Detail Pages**: Availability tracking, book summaries, videos, and
suggestions for similar books.

👉 **Profile Page**: Manage accounts, track borrowed books, and download
receipts.

👉 **Onboarding Workflows**: Automated welcome emails when users sign up, with
follow-ups based on inactivity or activity dates.

👉 **Borrow Book Reminder**: Customized email notifications sent before, on, and
after the due date, reminding users to return books or avoid charges.

👉 **Borrow Book Receipt**: Automatically generates a customized PDF receipt
when a book is successfully borrowed.

👉 **Analytics Dashboard**: Statistics, new users, books, borrow requests, and
more.

👉 **All Users Page**: View and manage users, including approving or revoking
access.

👉 **Account Requests Page**: Admin approval for account requests, with email
notifications for user verification.

👉 **All Books Page**: List and manage all library books with advanced search,
pagination, and filters.

👉 **Book Management Forms**: Add new books and edit existing entries.

👉 **Book Details Page**: Detailed book information for administrators.

👉 **Borrow Records Page**: Complete borrow history with pagination and search.

👉 **Role Management**: Change user roles to invite more admins, with email
notifications sent upon role updates.

👉 **Advanced Functionalities**: Caching, rate-limiting, DDoS protection, and
custom notifications.

👉 **Database Management**: Postgres with Neon for scalable and collaborative
database handling.

👉 **Real-time Media Processing**: ImageKit for image and video optimization and
transformations.

👉 **Efficient Caching**: Upstash Redis for caching, workflows, and triggers.

👉 **Database ORM**: Drizzle ORM for simplified and efficient database
interactions.

👉 **Modern UI/UX**: Built with TailwindCSS, ShadCN, and other cutting-edge
tools.

👉 **Technology Stack**: Next.js with TypeScript for scalable development, and
NextAuth for robust authentication.

👉 **Seamless Email Handling**: Resend for automated email communications,
including notifications and updates.

and many more, including code architecture and reusability

# <span id="quick-start">🤸 Quick Start</span>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/adrianhajdin/university-library-jsm.git
cd university-library-jsm
```

**Installation**

Install the project dependencies using npm:

```bash
pnpm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following
content:

```env
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=

NEXT_PUBLIC_API_ENDPOINT=
NEXT_PUBLIC_PROD_API_ENDPOINT=

DATABASE_URL=

UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=

AUTH_SECRET=

# Required for workflow
QSTASH_URL=
QSTASH_TOKEN=

# RESEND_TOKEN=
RESEND_TOKEN=
```

Replace the placeholder values with your actual ImageKit, NeonDB, Upstash, and
Resend credentials. You can obtain these credentials by signing up on the
[ImageKit](https://bit.ly/49zmXkt), [NeonDB](https://fyi.neon.tech/1jsm),
[Upstash](https://upstash.com/?utm_source=jsmastery1), and
[Resend](https://resend.com/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the
project.

# <span id="more">🚀 More</span>

**Advance your skills with Next.js Pro Course**

Enjoyed creating this project? Dive deeper into our PRO courses for a richer
learning adventure. They're packed with detailed explanations, cool features,
and exercises to boost your skills. Give it a go!

[![Project Banner](https://github.com/user-attachments/assets/b8760e69-1f81-4a71-9108-ceeb1de36741)](https://jsmastery.pro/next15)
