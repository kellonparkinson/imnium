const promptForm = document.querySelector('.prompt-form')
const generateBtn = document.querySelector('.generate')

const resultsContainer = document.querySelector('.results-container')
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
        size: "1024x1024"
    }
    
    axios
    .post(`${baseURL}/images/generations`, body)
    .then((res) => {
        displayResults(res.data)
        console.log(res.data)
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
        displayResults(res.data)
        console.log(res.data)
    })
    .catch(() => console.log('Error deleting image'))
}

// Favorite button adds result image to a favorites list
function addToFavs() {
    favBtn.classList.remove('heart')
    favBtn.classList.add('favorite')
}

// function removeFromFavs() {
//     favBtn.classList.remove('favorite')
//     favBtn.classList.add('heart')
// }

// Download button saves result image to user's computer OR opens image in another window where it can be saved
// const download = () => {
    
// }

// Create divs for each result image
function createResultCard(obj) {
    const resultCard = document.createElement('div')
    resultCard.classList.add('result')

    resultCard.innerHTML = `<img src="${obj.url}" alt="result image">
    <div class="result-btns">
        <button class="download">Download</button>
        <button class="heart" onclick="addToFavs()">
        <i class="fa-solid fa-heart"></i></button>
        <button class="delete" onclick="deleteResult(${obj.id})">
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

// Display favorites on the favorites page
// function displayFavorites() {

// }

// Event Listeners
promptForm.addEventListener('submit', generateImage)

// favBtn.addEventListener('click', () => {
//     const isNotFavorited = favBtn.classList.contains('heart')

//     if (isNotFavorited) {
//         addToFavs()
//     } else {
//         removeFromFavs()
//     }
// })