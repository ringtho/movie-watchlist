import {
    getMissingMovieHtml, getEmptyWatchlistHtml, getWatchlistHtml, getMovieHtml
} from "/utils.js"

const mainContainer = document.getElementById("container")
const watchlistContainer = document.getElementById("watchlist-container")
// let watchlist = []
let watchlist = JSON.parse(localStorage.getItem("movies"))
// console.log(typeof(watchlist))
// localStorage.setItem("movies", JSON.stringify(watchlist));
// localStorage.clear()

document.addEventListener('click', function(e){
    e.preventDefault()
    if (e.target.id === 'submit'){
        handleSubmitBtnClick()
    }

    if (e.target.id === "add-btn"){
        handleAddToWatchlistClick(e.target.dataset.id)
    }

    if (e.target.dataset.page){
        window.location.replace(`${e.target.dataset.page}.html`)
    }
})

async function handleSubmitBtnClick(){
    const searchText = document.getElementById('input-search').value
    let html = ``
    if(searchText) {
        fetch(`http://www.omdbapi.com/?apikey=f379d678&s=${searchText}`)
        .then(res => res.json())
        .then(data => {
            if (data.Response==="True") {
                data.Search.forEach(searchedMovie => {
                    fetch(`http://www.omdbapi.com/?apikey=f379d678&i=${searchedMovie.imdbID}`)
                        .then(res => res.json())
                        .then(movie => {
                            html += getMovieHtml(movie)
                            mainContainer.innerHTML = html
                        })
                })
            } else {
                mainContainer.innerHTML = getMissingMovieHtml()
            }        
            
        })
    } else {
        alert ("Please provide a movie title in the input field")
    }
    
}

async function handleAddToWatchlistClick(id){
    const movie = await getMovieById(id)
    watchlist.push(movie)
    localStorage.setItem("movies", JSON.stringify(watchlist))
}

async function getMovieById(id){
    const res = await fetch(`http://www.omdbapi.com/?apikey=f379d678&i=${id}`)
    const data = await res.json()
    return data
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