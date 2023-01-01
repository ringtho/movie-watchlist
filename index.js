import {
    getMissingMovieHtml, getEmptyWatchlistHtml, getWatchlistHtml, getMovieHtml
} from "/utils.js"

const mainContainer = document.getElementById("container")
const watchlistContainer = document.getElementById("watchlist-container")


let watchlist = JSON.parse(localStorage.getItem("movies"))
if (!watchlist){
    let watchlist = []
    localStorage.setItem("movies", JSON.stringify(watchlist));
}

document.addEventListener('click', function(e){
    e.preventDefault()
    if (e.target.id === 'submit'){
        handleSubmitBtnClick()
    }

    if (e.target.id === "add-btn"){
        handleAddToWatchlistClick(e.target.dataset.id)
    }

    if (e.target.id === "remove-btn"){
        handleRemoveFromWatchlistClick(e.target.dataset.id)
    }

    if (e.target.dataset.page){
        window.location.replace(`${e.target.dataset.page}.html`)
    }
})


async function handleSubmitBtnClick(){
    const searchText = document.getElementById('input-search').value
    if(searchText) {
        const data = await getMovieByTitleSearch(searchText)
        if (data.Response === "True"){
            let html = ""
            data.Search.forEach( async searchedMovie=>{
                const movie = await getMovieById(searchedMovie.imdbID)
                const addedStatus = checkSearchMovieinWatchlist(movie)
                html += getMovieHtml(movie, addedStatus)
                mainContainer.innerHTML = html
            })
        } else {
            mainContainer.innerHTML = getMissingMovieHtml()
        }      
    } else {
        alert ("Please provide a movie title in the input field")
    }
}

async function handleAddToWatchlistClick(id){
    const movie = await getMovieById(id)
    watchlist.unshift(movie)
    localStorage.setItem("movies", JSON.stringify(watchlist))
    const addedEl = document.getElementById(movie.imdbID)
    addedEl.textContent = "Added to Watchlist"
    addedEl.classList.add("added")
}

function handleRemoveFromWatchlistClick(id){
    const filteredMovies = watchlist.filter(function(movie){
        return movie.imdbID != id
    }) 
    localStorage.setItem("movies", JSON.stringify(filteredMovies))
    location.reload()
}

async function getMovieById(id){
    const res = await fetch(`https://www.omdbapi.com/?apikey=f379d678&i=${id}`)
    const data = await res.json()
    return data
}

async function getMovieByTitleSearch(searchText) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=f379d678&s=${searchText}`)
    const data = await response.json()
    return data
}

function checkSearchMovieinWatchlist(movie){
    let movieIdArr = []
    watchlist.forEach(movie => movieIdArr.push(movie.imdbID))
    return movieIdArr.includes(movie.imdbID)
}

function renderWatchlist(){
    let html = ""
    if (watchlist.length){
        watchlist.forEach(movie => html += getWatchlistHtml(movie))
        watchlistContainer.innerHTML = html
    } else {
        watchlistContainer.innerHTML = getEmptyWatchlistHtml()
    }  
}
renderWatchlist()