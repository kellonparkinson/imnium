const promptForm = document.querySelector('.prompt-form')
const generateBtn = document.querySelector('.generate')

const resultsContainer = document.querySelector('.results-container')
const downloadBtn = document.querySelector('.download')
const deleteBtn = document.querySelector('.delete')
const favBtn = document.querySelector('.fav')

// const openAiURL = `https://api.openai.com/v1`
const baseURL = `http://localhost:4040`

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
    })
    .catch(() => alert('Did you enter a prompt first?'))
}

// Delete button removes that result image from the DOM
// const deleteResult = () => {

// }

// Favorite button adds reuslt image to a favorites list
// const addToFavs = () => {

// }

// Download button saves result image to user's computer OR opens image in another window where it can be saved
// const download = () => {
    
// }

// Create divs for each result image
function createResultCard(imageURL) {
    const resultCard = document.createElement('div')
    resultCard.classList.add('result')

    resultCard.innerHTML = `<img src="${imageURL}" alt="result image">
    <div class="result-btns">
        <button class="download" onclick="">Download</button>
        <button class="fav" onclick="">
        <i class="fa-solid fa-heart"></i></button>
        <button class="delete" onclick="">
        <i class="fa-solid fa-trash-can"></i></button>
    </div>`


    resultsContainer.appendChild(resultCard)
}

// Display all of the result cards from the api's response
function displayResults(arr) {
    resultsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createResultCard(arr[i])
    }
}

// Event Listeners
promptForm.addEventListener('submit', generateImage)