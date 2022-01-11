let card = undefined;
let monsterContainer = document.querySelector('#monster-container');

document.addEventListener('DOMContentLoaded', getMonsters)
document.querySelector('#forward').addEventListener('click', getMoreMonsters)

function getMoreMonsters() {
    fetch('http://localhost:3000/monsters')
    .then(res => res.json())
    .then(data => data.slice(50, 100).forEach(data => displayMonsters(data)))
}

function getMonsters() {
    fetch('http://localhost:3000/monsters')
    .then(res => res.json())
    .then(data => data.slice(0, 50).forEach(data => displayMonsters(data)))
}

function displayMonsters(data) {
    card = document.createElement('div')
    card.className = 'monster'
    card.innerHTML = `
        <h3>${data.name}</h3>
        <p>Age: ${data.age}</p>
        <p>${data.description}</p>
        <hr></hr>
    `
    monsterContainer.appendChild(card);
}

document.querySelector('#monsterForm').addEventListener('submit', createMonster)

function createMonster(e) {
    e.preventDefault()
    let monsterObj = {
        name: e.target.nameInput.value,
        age: e.target.ageInput.value,
        description: e.target.description.value
    }
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(monsterObj)
        
    })
}