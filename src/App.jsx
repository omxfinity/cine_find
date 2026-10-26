import { useEffect, useState } from 'react'
import './App.css'
import { movies } from './data/movies.js'
import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import AuthPage from './pages/AuthPage.jsx'

function readPage() {
  const [, page = 'home', id] = window.location.pathname.split('/')
  return { page, id }
}

export default function App() {
  const [current, setCurrent] = useState(readPage)

  useEffect(() => {
    function goBack() {
      setCurrent(readPage())
    }

    window.addEventListener('popstate', goBack)
    return () => window.removeEventListener('popstate', goBack)
  }, [])

  function navigate(path) {
    window.history.pushState({}, '', path)
    setCurrent(readPage())
    window.scrollTo(0, 0)
  }

  const movie = movies.find((item) => item.id === current.id)

  if (current.page === 'movie' && movie) {
    return <MovieDetails movie={movie} navigate={navigate} />
  }

  if (current.page === 'login' || current.page === 'register') {
    return <AuthPage mode={current.page} navigate={navigate} />
  }

  if (current.page === 'movie') {
    return <main className="not-found"><h1>Movie not found</h1><button className="button button-primary" onClick={() => navigate('/')}>Back to home</button></main>
  }

  return <Home navigate={navigate} />
}
