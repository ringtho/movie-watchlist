
function getMovieHtml(movie, status){
    let addedEl = ``
    if (!status){
        addedEl = `<p id="added">
        <i class="fa-solid fa-circle-plus add-remove-btn" id="add-btn" 
        data-id=${movie.imdbID}></i>Watchlist</p>`
    } else {
        addedEl = `
        <p id="added" class="added">Added to Watchlist</p>
        `
    }
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
                    ${addedEl}
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
                    <i class="fa-solid fa-circle-minus add-remove-btn" id="remove-btn" 
                    data-id=${movie.imdbID}></i>Remove</p>
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
            <a href="index.html"><i class="fa-solid fa-circle-plus add-remove-btn" 
            data-page="index"></i></a>
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

export {getMissingMovieHtml, getEmptyWatchlistHtml, getWatchlistHtml, getMovieHtml}