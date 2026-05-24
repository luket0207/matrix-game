# Matrix Game

This project is a lightweight React app built with Vite.

## Available Scripts

- `npm start` starts the local development server.
- `npm run dev` starts the local development server.
- `npm run build` creates the production build in `dist/`.
- `npm run preview` previews the production build locally.
- `npm run deploy` publishes the `dist/` folder to the `gh-pages` branch.

## GitHub Pages Deployment

This project is deployed using GitHub Pages.

- The source code lives on the main branch.
- The deployed build files are published to the `gh-pages` branch.
- The Vite base path is configured for the repository name: `/matrix-game/`.

To deploy future changes:

```bash
npm run build
npm run deploy
```

GitHub Pages should be configured to deploy from:

- Branch: `gh-pages`
- Folder: `/root`
