const indexToys = "http://localhost:3000/toys"
const showToy = "http://localhost:3000/toys/:id"

const toyCollectionDiv = document.getElementById("toy-collection")
const form = document.getElementsByClassName("add-toy-form")[0]
let nameInput = form.childNodes[3]
let urlInput = form.childNodes[7]

// fetches 

function fetchToys(){
  return fetch(indexToys)
  .then(resp => resp.json())
  .then(toys => {
    loadToys(toys)
  })
}

function fetchNewToy(e){
  e.preventDefault()
  let toy = {name: nameInput.value, image: urlInput.value, likes: 0}

  return fetch(indexToys, {
    method: "POST",
    headers:{ 'Content-Type': 'application/json', Accept: "application/json"},
    body: JSON.stringify(toy)
  })
  .then(resp => resp.json())
  .then(toy => buildCard(toy))
}


// builders 

function loadToys(toys){ 
  toys.forEach(toy => buildCard(toy)) //for in does not provide full element
}

function buildCard(toy){
  
  let div = document.createElement("div")
  div.classList.add("card")
  let h2 = document.createElement("h2")
  let img = document.createElement("img")
  let p = document.createElement("p")
  let btn = document.createElement("button")
  let deleteBtn = document.createElement("button")

  h2.innerText = toy.name
  img.src = toy.image
  img.classList.add("toy-avatar")
  p.textContent = `${toy.likes} Likes` 
  btn.classList.add("like-btn")
  btn.innerText = "Like!"
  // btn.onclick = addLike
  btn.addEventListener("click", addLike)
  deleteBtn.innerText = "Delete"
  deleteBtn.onclick = deleteToy
  console.log(btn)
  div.innerHTML += h2.outerHTML + img.outerHTML + p.outerHTML + btn.outerHTML + deleteBtn.outerHTML

  toyCollectionDiv.append(div)
  
}

// listeners
function formListener(){
  form.addEventListener("submit", fetchNewToy)
}

// handlers

function addLike(e){
  console.log('HII')
  debugger 

}

function deleteToy(e){
  console.log("hi")
  debugger
}

// prewritten script

let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// invoke functions 

fetchToys()
formListener()
