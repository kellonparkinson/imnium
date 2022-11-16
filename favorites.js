const favoritesContainer = document.querySelector('.favorites-container')
const getFavsBtn = document.querySelector('.get-favs')

const downloadBtn = document.querySelector('.download')
const deleteBtn = document.querySelector('.delete')
const favBtn = document.querySelector('.heart')

const baseURL = `http://localhost:4040`

function createFavCard(obj) {
    const favCard = document.createElement('div')
    favCard.classList.add('favorites-card')

    favCard.innerHTML = `<img src="${obj.url}" alt="result image">
    <div class="result-btns">
        <a href="${obj.url}" download="Imnium-result" class="download">
            <i class="fa-solid fa-circle-down"></i>Download</a>
        <button class="res-btn favorite" onclick="toggleFavs(event, ${obj.result_id})">
            <i class="fa-solid fa-heart"></i></button>
        <button class="res-btn delete" onclick="deleteResult(${obj.result_id})">
            <i class="fa-solid fa-trash-can"></i></button>
    </div>`

    favoritesContainer.appendChild(favCard)
}

// Display favorites on the favorites page
function displayFavorites(arr) {
    favoritesContainer.innerHTML = ``

    for (let i = 0; i < arr.length; i++) {
        createFavCard(arr[i])
    }
}

// Get all table items where favorite = true
function getFavorites() {
    console.log('running getFavorites')

    axios
    .get(`${baseURL}/images/favorites`)
    .then((res) => {
        console.log('getFavorites ran')
        displayFavorites(res.data)
    })
    .catch((err) => console.log('Error getting favorites', err))
}

function testGet() {
    axios
    .get(`${baseURL}/images/test`)
    .then((res) => {
        console.log(res.data)
    })
    .catch(err => console.log(err))
}

// Event listeners
// getFavsBtn.addEventListener('click', getFavorites)