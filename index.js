
const baseUrl = 'http://localhost:9200'

const actor = document.querySelector('#acteur')
const theme = document.querySelector('#theme')
const submit = document.querySelector('#submit')
const result = document.querySelector('#result')

const research = () => {
    resetFilmDisplayed()
    const actorSearched = actor.value
    const themeSearched = theme.value
    fetchFilms(actorSearched,themeSearched)
}

// constructor objet Film avec les champs title, year et plot
function Film(title,plot,year){
    this.title = title
    this.plot = plot
    this.year = year
}


const sortFilms = (title,plot,year) => {
    let filmSorted = []
    // Créer un nouvel objet Film avec les champs title, year et plot
     let film = new Film(title,plot,year)
    // Pousse le Film dans l'array 
    filmSorted.push(film)
    // Affiche les films
    displayFilms(filmSorted)
    filmSorted.length = 0
}

const resetFilmDisplayed = () => {
    result.innerHTML = ''
}

const displayFilms = (filmSorted) => {
    
    filmSorted.forEach(film => {
        let div = document.createElement("div")
        div.className = "result-item"
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

const fetchFilms = (actor, theme= null) => {

    let query;
       query = 
        {
            "size": 100,
            "query":{
                "bool": {
                    "must": [
                        { "match": { "fields.actors": `${actor}`}}
                    ],
                    "should": [
                        { "match": { "fields.plot": `${theme}` }}
                    ]
                }
            }
        }
    
    let data = JSON.stringify(query)
    fetch(baseUrl + `/movies2/movie/_search?source_content_type=application/json&source=+${data}`)
    .then(response => response.json())
    .then(data => data.hits.hits.map(data =>
        sortFilms(data._source.fields.title,data._source.fields.plot,data._source.fields.year)
    ))
    
}

submit.addEventListener('click',research,false)

