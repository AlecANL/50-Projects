const apiKey = 'e70145e68e88aaeb8c58b058d3e881db'
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`
const imgPoster = 'https://image.tmdb.org/t/p/w1280/'

const $form = document.getElementById('form')
const $search = document.getElementById('search')

getMovies(API_URL)

export async function getMovies(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    showMovies(data.results)
  } catch (error) {
    console.log(error)
  }
}
/**
 *
 * @param {[]} movies
 */
export function showMovies(movies) {
  window.main.innerHTML = ''
  const movieEl = document.createElement('div')
  if (!movies) {
    movieEl.innerHTML = `<h1><Whoops cannot found that movie :(/h1>`
    window.main.append(movieEl)
    return
  }

  if (Array.isArray(movies)) {
    movies.forEach(movie => {
      const { title, poster_path, vote_average, overview } = movie
      movieEl.innerHTML = movieTemplate({ title, poster_path, vote_average, overview })
      window.main.append(movieEl.firstElementChild)
    })
  }
}

export function calcVoteAverage(voteAverage) {
  if (voteAverage >= 7) {
    return 'green'
  } else if (voteAverage >= 5 && voteAverage < 7) {
    return 'orange'
  } else {
    return 'red'
  }
}

export function movieTemplate(movie) {
  return `
    <div class="movie">
        <img
          src="${imgPoster}${movie.poster_path}"
          alt="${movie.title}"
        />
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <span class="${calcVoteAverage(movie.vote_average)}">${movie.vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          <p>
            ${movie.overview}
          </p>
        </div>
    </div>
    `
}

$form.addEventListener('submit', e => {
  e.preventDefault()
  const searchTerm = $search.value

  if (!searchTerm) {
    //   window.location.reload()
    console.log('whoops the box is empty')
  }

  getMovies(`${SEARCH_URL}${searchTerm}`)
  $search.value = ''
})
