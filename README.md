# Branchle

Branchle is a SvelteKit web application for working with shared tables and an AI-style chat interface. The app includes account registration and login, a tables dashboard, table creation, and individual table pages.

> **Project status:** Early development. Some features and integrations are still being built.

## What is included

- Home page with the Branchle chat interface
- Email and password registration
- Email and password login
- Persistent client-side user session state
- Authenticated tables dashboard
- Create a new table from the dashboard
- View individual tables by ID
- Loading and error states for authentication and table requests
- Svelte components and SCSS-based styling

## Application routes

| Route | Purpose | Authentication |
| --- | --- | --- |
| `/` | Home page and chat interface | Optional |
| `/login` | Sign in to an existing account | Public |
| `/register` | Create a new account | Public |
| `/tables` | View and create the current user's tables | Required |
| `/table/:id` | Open a specific table | Required |
| `/chat` | Chat route | In development |

## Tech stack

- [SvelteKit](https://svelte.dev/docs/kit)
- [Svelte 5](https://svelte.dev/)
- [Vite](https://vite.dev/)
- TypeScript
- SCSS/Sass
- `svelte-check` for static analysis
- `@sveltejs/adapter-auto` for deployment configuration

## Requirements

- Node.js 18 or newer
- npm 9 or newer

Check your installed versions:

```bash
node --version
npm --version
```

## Local development

Clone the repository and install dependencies:

```bash
git clone https://github.com/isie0rjn/branchle_front_pub.git
cd branchle_front_pub
npm ci
```

Start the development server:

```bash
npm run dev
```

To open the app automatically in your default browser:

```bash
npm run dev -- --open
```

The app is normally available at [http://localhost:5173](http://localhost:5173).

## Backend API

The frontend currently communicates with the Branchle API at:

```text
https://bubuieci.com
```

The current client uses the following API areas:

- `POST /user` for registration and login
- `POST /table` for loading and creating tables

The API URL is currently referenced directly in the Svelte components. For local development, staging, and production deployments, it would be safer to move this value into a public environment variable such as `PUBLIC_API_URL`:

```env
PUBLIC_API_URL=https://bubuieci.com
```

Do not place private credentials or secrets in a `PUBLIC_` environment variable. Values exposed to a SvelteKit browser bundle must be treated as public.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run dev -- --open` | Start the development server and open a browser |
| `npm run check` | Run Svelte and TypeScript validation |
| `npm run check:watch` | Run validation continuously while files change |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run prepare` | Synchronize generated SvelteKit files |

Before submitting changes, run:

```bash
npm run check
npm run build
```

## Project structure

```text
.
├── src/
│   ├── lib/
│   │   ├── components/   # Reusable Svelte UI components
│   │   ├── classes/      # Shared application classes
│   │   ├── messages.ts   # Chat message stores
│   │   ├── store.ts      # User and application state
│   │   └── user.ts       # User-related types or helpers
│   ├── routes/
│   │   ├── +page.svelte  # Home page and chat shell
│   │   ├── login/        # Login page
│   │   ├── register/     # Registration page
│   │   ├── tables/       # Tables dashboard
│   │   ├── table/[id]/   # Individual table view
│   │   └── chat/         # Chat route
│   ├── app.html          # HTML document template
│   └── *.scss            # Global and page styles
├── static/               # Icons, images, and loading assets
├── package.json          # Scripts and dependencies
├── svelte.config.js      # SvelteKit configuration
└── vite.config.ts        # Vite configuration
```

## Authentication state

The current user is stored in a Svelte writable store and persisted in browser `localStorage`. This keeps the user signed in across page refreshes in the same browser.

This client-side state should not be treated as a security boundary. The backend must validate the user's identity and permissions for every protected request.

## Deployment

Build the application with:

```bash
npm run build
```

Preview the build locally with:

```bash
npm run preview
```

The project uses `@sveltejs/adapter-auto`. For a specific hosting provider, follow the [SvelteKit adapter documentation](https://svelte.dev/docs/kit/adapters) and configure the adapter required by that platform.

## Contributing

1. Create a branch from `main`.
2. Install dependencies with `npm ci`.
3. Make your changes.
4. Run `npm run check` and `npm run build`.
5. Open a pull request describing the user-facing and technical changes.

## License

No license has been added to this repository yet. Until a license is included, all rights are reserved by the copyright holder.
