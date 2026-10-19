# Branchle Frontend

The frontend application for **Branchle**, built with [SvelteKit](https://svelte.dev/docs/kit) and [Vite](https://vite.dev/).

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer
- npm

## Getting started

Clone the repository and install the dependencies:

```bash
git clone https://github.com/isie0rjn/branchle_front_pub.git
cd branchle_front_pub
npm install
```

Start the development server:

```bash
npm run dev
```

To start the server and open the application in your browser automatically:

```bash
npm run dev -- --open
```

The local development server is typically available at [http://localhost:5173](http://localhost:5173).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run dev -- --open` | Start the development server and open it in a browser |
| `npm run check` | Run Svelte and TypeScript checks |
| `npm run check:watch` | Run checks continuously while files change |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run prepare` | Synchronize SvelteKit-generated files |

## Production build

Create an optimized production build with:

```bash
npm run build
```

Preview the generated build locally with:

```bash
npm run preview
```

This project uses `@sveltejs/adapter-auto`. For deployment to a specific hosting provider, configure the appropriate [SvelteKit adapter](https://svelte.dev/docs/kit/adapters).

## Development checks

Before opening a pull request, run the project checks:

```bash
npm run check
npm run build
```

## Project structure

The main application code is located in `src/`. SvelteKit routes are generally organized under `src/routes/`, while reusable components and utilities can be placed under `src/lib/`.

## Contributing

1. Create a branch for your changes.
2. Install dependencies with `npm install`.
3. Make your changes and run `npm run check`.
4. Confirm that `npm run build` succeeds.
5. Open a pull request with a clear description of your changes.

## License

No license has been specified yet. Add a `LICENSE` file and update this section when a license is chosen.
