# Muslim Matrimonial Profiles

A modern web application built with Next.js 14 that helps Muslim individuals create and browse matrimonial profiles in a clean, organized way.

## Features

* 🚀 Create detailed matrimonial profiles with a multi-step form
* 🔍 Advanced filtering and search capabilities
* 💾 Save profiles for later viewing
* 👀 Track seen/unseen profiles
* 📱 Fully responsive design
* 🌙 Dark mode support
* 🔒 Privacy-focused with Reddit usernames for communication

## Tech Stack

* **Framework:** Next.js 14 with App Router
* **Language:** TypeScript
* **Database:** SQLite with Prisma ORM
* **Styling:** Tailwind CSS
* **Components:** Radix UI with shadcn/ui
* **State Management:** React Hooks + URL State with nuqs
* **Form Handling:** React Hook Form + Zod
* **Deployment:** [To be implemented]

## Getting Started

### Prerequisites

* Node.js 18+ 
* npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/muslim-matrimonial.git
cd muslim-matrimonial
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up the database:
```bash
npm run db:push
npm run db:seed
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open `http://localhost:3000` in your browser.

## Project Structure

```
muslim-matrimonial/
├── app/                    # Next.js app directory
│   ├── add-profile/       # Profile creation form
│   ├── saved/             # Saved profiles page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ProfileCard.tsx   # Profile display component
├── lib/                  # Utility functions and hooks
│   ├── actions/         # Server actions
│   └── hooks/           # Custom React hooks
├── prisma/              # Database schema and migrations
└── public/              # Static assets
```

## Development

### Key Conventions

* Use TypeScript for all code files
* Follow functional programming patterns
* Implement responsive design with Tailwind CSS
* Optimize for Core Web Vitals
* Keep client components minimal; prefer Server Components
* Use URL state management with nuqs for filters

### Database Schema

The main Profile model includes:
* Basic info (age, gender, location)
* Preferences (age range, relocation)
* Background (ethnicity, education)
* Religious aspects (religiosity)
* Personal details (hobbies, interesting facts)

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests and linting: `npm run lint`
5. Commit changes: `git commit -m 'Add feature'`
6. Push to branch: `git push origin feature/your-feature`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

* Next.js (https://nextjs.org/)
* Radix UI (https://www.radix-ui.com/)
* shadcn/ui (https://ui.shadcn.com/)
* Tailwind CSS (https://tailwindcss.com/)
* Prisma (https://www.prisma.io/)

---

Made with ❤️ by the Muslim Matrimonial team