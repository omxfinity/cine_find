import { useState } from 'react'
import { Footer, Navbar } from '../components/Site.jsx'

export default function MovieDetails({ movie, navigate }) {
  const [showTrailer, setShowTrailer] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const searchLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.title} official trailer`)}`

  return (
    <>
      <Navbar navigate={navigate} activePage="details" />
      <main className="page-width details-page">
        <button className="back-link" onClick={() => navigate('/')}>← Back to home</button>
        <div className="detail-layout">
          <div className="detail-poster">
            {imageFailed
              ? <div className="poster-fallback"><span className="fallback-mark">CF</span><span>{movie.title}</span></div>
              : <img src={movie.poster} alt={`${movie.title} poster`} onError={() => setImageFailed(true)} />}
            <span className="detail-rating"><span>★</span> {movie.rating.toFixed(1)} <small>sample rating</small></span>
          </div>
          <div className="detail-copy">
            <p className="eyebrow">CINEFIND MOVIE GUIDE</p>
            <h1>{movie.title}</h1>
            <div className="detail-meta">
              <span>{movie.year}</span><i />
              {movie.genre.map((item) => <span className="genre-tag" key={item}>{item}</span>)}
              <i /><span>{movie.duration}</span>
            </div>
            <p className="detail-description">{movie.description}</p>
            <div className="credits">
              <div><span>DIRECTOR</span><strong>{movie.director}</strong></div>
              <div><span>CAST</span><strong>{movie.cast.join(', ')}</strong></div>
            </div>
            {movie.trailerId
              ? <button className="button button-primary trailer-action" onClick={() => setShowTrailer(true)}>▶ Watch trailer</button>
              : <a className="button button-primary trailer-action" href={searchLink} target="_blank" rel="noreferrer">▶ Find trailer on YouTube</a>}
          </div>
        </div>

        {showTrailer && movie.trailerId && (
          <section className="trailer-section">
            <div className="trailer-heading"><div><p className="eyebrow">A FIRST LOOK</p><h2>Watch the trailer</h2></div><a href={searchLink} target="_blank" rel="noreferrer">Open on YouTube ↗</a></div>
            <div className="video-frame">
              <iframe src={`https://www.youtube.com/embed/${movie.trailerId}?autoplay=1&rel=0`} title={`${movie.title} trailer`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            </div>
            <p className="embed-note">If the video doesn’t load, <a href={searchLink} target="_blank" rel="noreferrer">search on YouTube</a>.</p>
          </section>
        )}
        <p className="sample-note">Movie ratings and information are sample data.</p>
      </main>
      <Footer navigate={navigate} />
    </>
  )
}
