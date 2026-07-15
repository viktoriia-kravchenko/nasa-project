# NASA Mission Control

Full-stack app for scheduling and tracking space launches. The React frontend is served as a static build from the Express backend.

## Project Structure

```
nasa/
├── client/   # React frontend (Create React App)
└── server/   # Express API + static file server
```

## Prerequisites

- Node.js 18+

## Setup

Install dependencies for all packages at once:

```bash
npm run install-all
```

## Available Scripts (run from root)

| Script | Description |
|---|---|
| `npm run watch` | Start server (with nodemon) and client dev server concurrently |
| `npm run server` | Start only the backend with nodemon |
| `npm run client` | Start only the React dev server |
| `npm run deploy` | Build the React app and start the production server |

## Development

```bash
npm run watch
```

- Frontend: http://localhost:3000
- API: http://localhost:8000

## Production

```bash
npm run deploy
```

Builds the React app into `server/public/`, then starts the Express server which serves both the API and the static frontend on port 8000.

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/planets` | List habitable exoplanets |
| GET | `/launches` | List all scheduled launches |
| POST | `/launches` | Schedule a new launch |
| DELETE | `/launches/:id` | Abort a launch |
