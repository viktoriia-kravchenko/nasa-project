# NASA Mission Control

Full-stack app for scheduling and tracking space launches. The React frontend is served as a static build from the Express backend.

## Project Structure

```
nasa-project/
├── client/                        # React frontend (Create React App)
└── server/                        # Express API + static file server
    ├── data/
    │   └── kepler_data.csv        # Kepler exoplanet survey data, seeded into MongoDB on startup
    └── src/
        ├── models/
        │   ├── launches.mongo.js  # Mongoose schema for the `launches` collection
        │   ├── launches.model.js  # Launch persistence/query logic
        │   ├── planets.mongo.js   # Mongoose schema for the `planets` collection
        │   └── planets.model.js   # Planet persistence/query logic + CSV seeding
        ├── routes/                # Express routers + controllers (launches, planets)
        ├── app.js                 # Express app configuration
        └── server.js              # Entry point: opens the MongoDB connection, then starts the HTTP server
```

## Prerequisites

- Node.js 18+
- A MongoDB Atlas cluster (or any MongoDB 5+ instance) reachable via connection string

## Data storage

Persistent data is stored in MongoDB Atlas, in a cluster named **NASAProjectCluster**, across two collections:

| Collection | Populated by | Document shape |
|---|---|---|
| `planets` | `loadPlanets()`, run once on server startup from `server/data/kepler_data.csv` | `keplerName` — habitable exoplanets, filtered from the Kepler survey by disposition, insolation, and radius thresholds |
| `launches` | `POST /launches` | `flightNumber`, `launchDate`, `mission`, `rocket`, `target`, `customers`, `upcoming`, `success` |

Both collections are defined as Mongoose schemas (`server/src/models/planets.mongo.js`, `server/src/models/launches.mongo.js`). Route controllers never talk to Mongoose directly — all reads/writes go through the model layer (`planets.model.js`, `launches.model.js`), which upserts on natural keys (`keplerName`, `flightNumber`) so re-seeding or rescheduling is idempotent.

On boot, `server.js` establishes the Mongoose connection and waits for the planets seed to finish before the HTTP server starts accepting requests, so the API never serves a request against an empty or half-seeded database.

## Setup

1. Install dependencies for all packages:

   ```bash
   npm run install-all
   ```

2. Create `server/.env` with your MongoDB Atlas connection string:

   ```
   MONGODB_URI=mongodb+srv://<user>:<password>@nasaprojectcluster.xxxxx.mongodb.net/?appName=NASAProjectCluster
   PORT=8000
   ```

   `server/.env` is git-ignored — never commit real credentials. `MONGODB_URI` is required; the server will not start without a reachable database.

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
