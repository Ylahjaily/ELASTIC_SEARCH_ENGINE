
const baseUrl = 'http://localhost:9200'

fetch(baseUrl)
.then(async (response) => {
    let data = await response.json()
    document.getElementById('cluster_name').innerText = data.cluster_name
    document.getElementById('cluster_version').innerText = data.version.number
})

const actor = document.querySelector('#acteur')
const theme = document.querySelector('#theme')
const submit = document.querySelector('#submit')
const result = document.querySelector('#result')

let query = 

{"query":{
    "bool": {
        "should": [
            { "match": { "fields.actors": "Harrison Ford" }},
            { "match_phrase": { "_all": "stars" }}
        ]
}}}

const research = () => {
    const actorSearched = actor.value
    const themeSearched = theme.value


    fetchFilms()
}



let film = {}

function Film(title,plot,year){
    this.title = title
    this.plot = plot
    this.year = year
}


let filmSorted = []

const sortFilms = (title,plot,year) => {
    // créer un objet Film avec les champs
     let film = new Film(title,plot,year)
    
    // pousse le Film dans l'array 
    filmSorted.push(film)
}

const displayFilms = () => {
    
    filmSorted.forEach(film => {
        console.log(film.plot)
        let div = document.createElement("div")
        result.appendChild(div)
        p = document.createElement("p")
        p.textContent = film.title
        div.appendChild(p)
        p = document.createElement("p")
        p.textContent = film.year
        div.appendChild(p)
        p = document.createElement("p")
        p.textContent = film.plot
        div.appendChild(p)
    })
}

//console.log(query.query.match.fields.title)


const fetchFilms = () => {
    let data = JSON.stringify(query)
    fetch(baseUrl + `/movies2/movie/_search?source_content_type=application/json&source=+${data}`)
    .then(response => response.json())
    .then(data => data.hits.hits.map(data =>
        sortFilms(data._source.fields.title,data._source.fields.plot,data._source.fields.year)
    ))
    .then(displayFilms())
   console.log(filmSorted)
   //displayFilms()
}

submit.addEventListener('click',research,false)

