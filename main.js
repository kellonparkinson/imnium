const promptForm = document.querySelector('.prompt-form')
const generateBtn = document.querySelector('.generate')

const resultsContainer = document.querySelector('.results-container')
const favoritesContainer = document.querySelector('.favorites-container')
const downloadBtn = document.querySelector('.download')
const deleteBtn = document.querySelector('.delete')
const favBtn = document.querySelector('.heart')

const baseURL = `http://localhost:4040`

// const openAiURL = `https://api.openai.com/v1`
// openai endpoints: /images/generations
            //  /images/edits
            //  /images/variations

function generateImage(e) {
    e.preventDefault()

    let inputPrompt = document.querySelector('.prompt').value

    let body = {
        prompt: inputPrompt,
        n: 3,
        size: "512x512"
    }
    
    axios
    .post(`${baseURL}/images/generations`, body)
    .then((res) => {
        displayResults(res.data)
        // console.log(res.data)
    })
    .catch((err) => {
        alert('Did you enter a prompt first?')
        console.log(err)
    })
}

// Delete button removes that result image from the DOM
const deleteResult = (id) => {
    axios
    .delete(`${baseURL}/images/${id}`)
    .then((res) => {
        displayAfterDelete(res.data)
        // console.log(res.data)
    })
    .catch(() => console.log('Error deleting image'))
}

// Heart button styling gets changed,
    // and favorites column is updated in the database
    // by calling makeFavTrue or makeFavFalse functions
function toggleFavs(event, id) {
    let theFavBtn = event.target
    // console.log(theFavBtn)

    if (theFavBtn.classList.contains('heart')){
        theFavBtn.classList.remove('heart')
        theFavBtn.classList.add('favorite')
        makeFavTrue(id)
    } else {
        theFavBtn.classList.remove('favorite')
        theFavBtn.classList.add('heart')
        makeFavFalse(id)
    }
}

// "Favorites" axios functions
// Takes in the id and sends to backend to match with results table id
    // Makes favorite = true
function makeFavTrue(resultId) {
    console.log(resultId);
    
    let body = {
        id: resultId,
        favorite: true
    }
    
    axios
    .post(`${baseURL}/images/favorites`, body)
    .then(() => console.log('Added to favorites'))
    .catch((err) => console.log(err))
}
    // Makes favorite = false
function makeFavFalse(resultId) {
    console.log(resultId)
    
    let body = {
        id: resultId,
        favorite: false
    }
    
    axios
    .post(`${baseURL}/images/favorites`, body)
    .then(() => console.log('Removed from favorites'))
    .catch((err) => console.log(err))
}

// Create divs for each result image
function createResultCard(obj) {
    const resultCard = document.createElement('div')
    resultCard.classList.add('result')

    resultCard.innerHTML = `<img src="${obj.url}" alt="result image">
    <div class="result-btns">
        <a class="download" href="${obj.url}" download="Imnium-result">
            <i class="fa-solid fa-circle-down"></i>Download</a>
        <button class="res-btn heart" onclick="toggleFavs(event, ${obj.result_id})">
            <i class="fa-solid fa-heart"></i></button>
        <button class="res-btn delete" onclick="deleteResult(${obj.result_id})">
            <i class="fa-solid fa-trash-can"></i></button>
    </div>`

    resultsContainer.appendChild(resultCard)
}

// Invoke createResultCard and display results from the api's response
function displayResults(arr) {
    resultsContainer.innerHTML = ``

    for (let i = 0; i < arr.length; i++) {
        createResultCard(arr[i])
    }
}
// We only want the last two items in the array after one is deleted so that we only have the current results being displayed
function displayAfterDelete(arr) {
    resultsContainer.innerHTML = ``

    for (let i = 0; i < arr.length; i++) {
        createResultCard(arr[i])
    }
}

// Display favorites on the favorites page
// function displayFavorites() {

// }

// Event Listeners
promptForm.addEventListener('submit', generateImage)