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

function handleSubmitBtnClick(){
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

function handleAddToWatchlistClick(id){
    fetch(`http://www.omdbapi.com/?apikey=f379d678&i=${id}`)
        .then(res => res.json())
        .then(movie => {
            watchlist.push(movie)
            localStorage.setItem("movies", JSON.stringify(watchlist))
        }) 
    renderWatchlist() 
}

// console.log(watchlist)
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

// async function getMovieById(id){
//     const res = await fetch(`http://www.omdbapi.com/?apikey=f379d678&i=${id}`)
//     const data = await res.json()
//     console.log(data.Title)
// }

// console.log(getMovieById("tt0107290"))


function getMovieHtml(movie){
    const rating = movie.Ratings[0].Value.slice(0,3)
    return `
        <section class="movie-container">
            <div class="movie-img">
                <img src="${movie.Poster}" alt="${movie.Title}">
            </div>
            <div class="movie-info">
                <div class="movie-heading">
                    <span><h3 class="movie-title">${movie.Title}</h3></span>
                    <span><i class="fa-solid fa-star"></i></span>
                    <span class="movie-rating">${rating}</span>
                </div>
                <div class="movie-details">
                    <p>${movie.Runtime}</p>
                    <p>${movie.Genre}</p>
                    <p>
                    <i class="fa-solid fa-circle-plus add-remove-btn" id="add-btn" data-id=${movie.imdbID}></i>Watchlist</p>
                </div>
                <div class="movie-description">
                    <p>${movie.Plot}
                    </p>
                </div>
            </div>
        </section>
        `
}

function getWatchlistHtml(movie){
    const rating = movie.Ratings[0].Value.slice(0,3)
    return `
        <section class="movie-container">
            <div class="movie-img">
                <img src="${movie.Poster}" alt="${movie.Title}">
            </div>
            <div class="movie-info">
                <div class="movie-heading">
                    <span><h3 class="movie-title">${movie.Title}</h3></span>
                    <span><i class="fa-solid fa-star"></i></span>
                    <span class="movie-rating">${rating}</span>
                </div>
                <div class="movie-details">
                    <p>${movie.Runtime}</p>
                    <p>${movie.Genre}</p>
                    <p>
                    <i class="fa-solid fa-circle-minus add-remove-btn" id="add-btn" data-id=${movie.imdbID}></i>Remove</p>
                </div>
                <div class="movie-description">
                    <p>${movie.Plot}
                    </p>
                </div>
            </div>
        </section>
        `
}

function getEmptyWatchlistHtml() {
    let html = `
    <div class="explore-container">
        <p class="empty-watchlist-text">Your watchlist is looking a little empty...</p>
        <div class="empty-watchlist">
            <a href="index.html"><i class="fa-solid fa-circle-plus add-remove-btn" data-page="index"></i></a>
            <p>Let's add some movies!</p>
        </div>
    </div>
    `
    return html
}

function getMissingMovieHtml(){
    return `
    <div class="explore-container no-movies">
        <p>Unable to find what you're looking for. Please try another search.</p>
    </div>
    `
}
