const promptForm = document.querySelector('.prompt-form')
const generateBtn = document.querySelector('.generate')

const resultsContainer = document.querySelector('.results-container')
const downloadBtn = document.querySelector('.download')
const deleteBtn = document.querySelector('.delete')
const favBtn = document.querySelector('.fav')

// const openAiURL = `https://api.openai.com/v1`
// const openAiURL = `http://localhost:3000`

// openai endpoints: /images/generations
            //  /images/edits
            //  /images/variations

function generateImage(e) {
    e.preventDefault()

    let prompt = document.querySelector('.prompt')

    // let body = {
    //     prompt: prompt.value,
    //     n: 3,
    //     size: "1024x1024"
    // }


    let body = {
        prompt: "big red dog",
        n: 3,
        size: "1024x1024"
    }
    
    axios
    .post(`http://localhost:4040/images/generations`, body)
    .then((res) => {
        displayResults(res.data)
        // console.log(res.data.data[0].url)
    })
    .catch((err) => console.log(err))
    // axios
    // .get('http://localhost:4040/hello')
    // .then((res) => console.log(res.data))
}



// When user's input is processed, render the image results to the DOM
// const showResults = () => {

// }

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
        <button class="fav" onclick="">F</button>
        <button class="delete" onclick="">X</button>
    </div>`


    resultsContainer.appendChild(resultCard)
}

// Display all of the results from the api's response
function displayResults(arr) {
    resultsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createResultCard(arr[i])
    }
}

// Event Listeners
promptForm.addEventListener('submit', generateImage)