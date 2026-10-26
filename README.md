# CineFind

CineFind is a frontend-only movie discovery website built with React and Vite. Browse a small local movie collection, search by title, filter by genre, read movie details, and open available YouTube trailers.

## Run locally

1. Install a current Node.js LTS release.
2. In the project folder, run `npm install`.
3. Run `npm run dev` and open the local URL printed by Vite.

To create a production build, run `npm run build`. To run the configured linter, use `npm run lint`.

## How it works

- `src/data/movies.js` contains the sample movie information, poster URLs, ratings, and verified trailer IDs where supplied.
- `src/App.jsx` reads the URL and chooses which page to show.
- `src/pages/Home.jsx` contains movie search, genre filters, and movie lists.
- `src/pages/MovieDetails.jsx` shows one movie and its trailer.
- `src/pages/AuthPage.jsx` contains the simulated login and registration forms.
- `src/components/Site.jsx` contains shared parts such as the navigation bar, footer, search bar, and movie cards.
- `src/App.css` and `src/index.css` define the responsive dark theme and component styling.
- The app uses browser history for its home, movie-detail, login, and registration URLs; no routing package is required.

The movie catalogue, descriptions, and IMDb-style ratings are sample data. Poster artwork and embedded trailers are hosted externally, so those assets require an internet connection. Movies without a known trailer ID link to a YouTube search instead.

Login and registration are demonstrations only. Form input is validated in the browser, but no account is authenticated or created, no user details are sent to a server, and passwords are not persisted.
