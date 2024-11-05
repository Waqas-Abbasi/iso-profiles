# ISO Profiles

A helper tool for Reddit's Muslim Marriage ISO profiles. You can browse profiles, sort, filter, save profiles you're interested in and create profiles.

We collect no data except for the profile data, and everything-else is stored locally on your device. 

This project was created because I found it frustrating to browse the ISO threads using Reddit's default interface.

## Tech Stack

* **Framework:** Next.js 14 with App Router
* **Language:** TypeScript
* **Database:** SQLite with Prisma ORM
* **Styling:** Tailwind CSS
* **Components:** Radix UI with shadcn/ui
* **State Management:** React Hooks + URL State with nuqs
* **Form Handling:** React Hook Form + Zod
* **Deployment:** Vercel + Neon Tech

## Getting Started

### Prerequisites

* Node.js 18+ 
* npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Waqas-Abbasi/iso-profiles
cd iso-profiles
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up your database:
   - Create a PostgreSQL database (locally or using a service like Neon Tech)
   - Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/your-database-name"
```

4. Initialize the database:
```bash
npm run db:push
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open `http://localhost:3000` in your browser.

## Project Structure

```
iso-profiles/
├── app/                    # Next.js app directory
│   ├── add-profile/       # Profile creation form
│   ├── saved/             # Saved profiles page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
├── lib/                  # Utility functions and hooks
│   ├── actions/         # Server actions
│   └── hooks/           # Custom React hooks
├── prisma/              # Database schema and migrations
└── public/              # Static assets
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests and linting: `npm run lint`
5. Commit changes: `git commit -m 'Add feature'`
6. Push to branch: `git push origin feature/your-feature`
7. Submit a pull request

---