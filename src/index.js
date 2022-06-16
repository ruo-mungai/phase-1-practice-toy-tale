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
  getFetch();
  handleForm();
});

function renderToyObj(toy){
  
  let cardDiv = document.createElement('div');
  cardDiv.className = 'card'

  let h2 = document.createElement('h2');
  
  h2.textContent = toy['name'];

 
  let img = document.createElement('img');

  img.className = 'toy-avatar';
  
  img.src = toy['image'];

  
  let p = document.createElement('p');
  p.textContent = `${toy['likes']} likes`;
  let btn = document.createElement('button');
  btn.className = 'like-btn';
  btn.id = toy['id'];
  btn.textContent = 'Like';
  
  btn.addEventListener('click', ()=>{
    patchFetch(toy, p)
  });

  
  cardDiv.appendChild(h2);
  cardDiv.appendChild(img);
  cardDiv.appendChild(p);
  cardDiv.appendChild(btn);

 
  let toyCollection = document.querySelector('#toy-collection');
  toyCollection.appendChild(cardDiv);
}

// GET 
function getFetch(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toyArr => handleArr(toyArr))
}

function handleArr(toyArr){
  for (let toy of toyArr){
    renderToyObj(toy)
  }
}

//Post
function handleForm(){
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    let addToy = false;
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const newToy = {
      name: e.target.childNodes[3].value,
      image: e.target.childNodes[7].value,
      likes: 0
    }
    postFetch(newToy);
  })
}

function postFetch(newToy){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(newToy)
  })
  .then(res => res.json())
  .then(newToyObj => renderToyObj(newToyObj))
}

// patch
function patchFetch(toy, p){
  toy['likes'] = toy['likes'] + 1;
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({'likes': toy['likes']})
  })
  .then(res => res.json())
  .then(updatedToy => {
    p.textContent = `${updatedToy['likes']} likes`;
  })
}