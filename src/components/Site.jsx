import { useState } from 'react'

export function Brand({ navigate }) {
  return (
    <a className="brand" href="/" onClick={(event) => { event.preventDefault(); navigate('/') }} aria-label="CineFind home">
      <span className="brand-mark">C</span>
      <span>cine<span>find</span></span>
    </a>
  )
}

export function Navbar({ navigate, activePage }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function go(path) {
    setMenuOpen(false)
    navigate(path)
  }

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Brand navigate={navigate} />
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a className={activePage === 'home' ? 'active' : ''} href="/" onClick={(event) => { event.preventDefault(); go('/') }}>Home</a>
          <a href="/#explore" onClick={(event) => {
            event.preventDefault()
            go('/')
            window.setTimeout(() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' }), 0)
          }}>Explore</a>
          <a className={`login-nav ${activePage === 'login' ? 'active' : ''}`} href="/login" onClick={(event) => { event.preventDefault(); go('/login') }}>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 10a3.2 3.2 0 1 0 0-6.4A3.2 3.2 0 0 0 10 10Zm-5.6 6.2c.3-2.5 2.6-4.2 5.6-4.2s5.3 1.7 5.6 4.2a.8.8 0 0 1-.8.9H5.2a.8.8 0 0 1-.8-.9Z" fill="currentColor" /></svg>
            Login
          </a>
        </nav>
      </div>
    </header>
  )
}

export function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="page-width footer-inner">
        <div><Brand navigate={navigate} /><p>Good stories. Great movie nights.</p></div>
        <span>Made for movie lovers, everywhere. <span className="footer-heart">♥</span></span>
        <span className="footer-disclaimer">Movie details and ratings are sample data.</span>
      </div>
    </footer>
  )
}

export function SearchBar({ value, onChange, onSubmit, onClear }) {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <svg className="search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
        <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <input type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search for a movie..." aria-label="Search movies by title" />
      {value && <button className="clear-search" type="button" onClick={onClear} aria-label="Clear search">×</button>}
      <button className="search-submit" type="submit">Search</button>
    </form>
  )
}

export function MovieCard({ movie, onSelect }) {
  const [imageFailed, setImageFailed] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <button className="movie-card" type="button" onClick={() => onSelect(movie)} aria-label={`View details for ${movie.title}`}>
      <span className="poster-wrap">
        {imageFailed ? (
          <span className="poster-fallback"><span className="fallback-mark">CF</span><span>{movie.title}</span></span>
        ) : (
          <>
            {!imageLoaded && <span className="poster-skeleton" aria-hidden="true" />}
            <img className={imageLoaded ? 'poster-loaded' : ''} src={movie.poster} alt={`${movie.title} poster`} loading="lazy" onLoad={() => setImageLoaded(true)} onError={() => setImageFailed(true)} />
          </>
        )}
        <span className="poster-overlay"><span className="play-badge">↗</span><span>View details</span></span>
        <span className="rating-pill"><span>★</span> {movie.rating.toFixed(1)}</span>
      </span>
      <span className="movie-card-info">
        <span className="movie-card-title">{movie.title}</span>
        <span className="movie-card-meta">{movie.year}<i />{movie.genre[0]}</span>
      </span>
    </button>
  )
}

export function MovieSection({ title, eyebrow, movies, onSelect, id }) {
  if (!movies.length) return null

  return (
    <section className="movie-section" id={id}>
      <div className="section-heading">
        <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
        <a className="text-link" href="#explore" onClick={(event) => {
          event.preventDefault()
          document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })
        }}>Explore all <span>↗</span></a>
      </div>
      <div className="movie-grid">
        {movies.map((movie) => <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />)}
      </div>
    </section>
  )
}
