import { useState } from 'react'
import { movies } from '../data/movies.js'
import { Footer, MovieCard, MovieSection, Navbar, SearchBar } from '../components/Site.jsx'

export default function Home({ navigate }) {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All genres')
  const [showResults, setShowResults] = useState(false)
  const genres = ['All genres', ...new Set(movies.flatMap((movie) => movie.genre))]
  const results = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.trim().toLowerCase()) &&
    (genre === 'All genres' || movie.genre.includes(genre)),
  )

  function search(event) {
    event.preventDefault()
    setShowResults(true)
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })
  }

  function clearSearch() {
    setQuery('')
    setGenre('All genres')
    setShowResults(false)
  }

  function openMovie(movie) {
    navigate(`/movie/${movie.id}`)
  }

  const popular = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 6)
  const trending = movies.filter((movie) => movie.trending).slice(0, 6)

  return (
    <>
      <Navbar navigate={navigate} activePage="home" />
      <main>
        <section className="hero">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-content page-width">
            <p className="hero-kicker"><span /> YOUR NEXT FAVORITE FILM IS HERE</p>
            <h1>Discover Your Next<br /><span>Favourite Movie</span></h1>
            <p className="hero-copy">A little inspiration for your next movie night.<br />Find the stories you’ll love, all in one place.</p>
            <SearchBar value={query} onChange={(value) => { setQuery(value); setShowResults(Boolean(value)) }} onSubmit={search} onClear={clearSearch} />
            <div className="hero-note"><span>✦</span> Curated picks. Endless stories.</div>
          </div>
          <div className="hero-caption"><span>NOW SHOWING</span><i /> STORIES WORTH STAYING IN FOR</div>
          <div className="hero-scroll"><span /> SCROLL TO EXPLORE</div>
        </section>

        <div className="page-width discovery" id="explore">
          {showResults ? (
            <section className="movie-section search-results">
              <div className="section-heading">
                <div><p className="eyebrow">THE MOVIE LIBRARY</p><h2>{query ? `Results for “${query}”` : 'Explore all movies'}</h2></div>
                <button className="reset-link" type="button" onClick={clearSearch}>Clear search ×</button>
              </div>
              <div className="filter-row">
                <span>{results.length} movies found</span>
                <label htmlFor="genre-filter">Genre
                  <select id="genre-filter" value={genre} onChange={(event) => setGenre(event.target.value)}>
                    {genres.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
              </div>
              {results.length ? (
                <div className="movie-grid">{results.map((movie) => <MovieCard key={movie.id} movie={movie} onSelect={openMovie} />)}</div>
              ) : (
                <div className="empty-state">
                  <span className="empty-icon">⌕</span><h3>No movies found</h3>
                  <p>Try a different title or clear your search.</p>
                  <button className="button button-outline" onClick={clearSearch}>Browse all movies</button>
                </div>
              )}
            </section>
          ) : (
            <>
              <MovieSection title="Popular right now" eyebrow="THE CROWD-PLEASERS" movies={popular} onSelect={openMovie} id="popular" />
              <MovieSection title="Trending this week" eyebrow="ON EVERYONE’S WATCHLIST" movies={trending} onSelect={openMovie} id="trending" />
              <section className="discovery-banner">
                <div className="banner-star">✳</div>
                <div><p className="eyebrow">MORE TO DISCOVER</p><h2>Find your next<br />great story.</h2><p>From all-time classics to new favorites,<br />there’s a movie for every mood.</p></div>
                <button className="button button-light" onClick={() => { setShowResults(true); document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' }) }}>Explore the collection →</button>
              </section>
            </>
          )}
        </div>
      </main>
      <Footer navigate={navigate} />
    </>
  )
}
