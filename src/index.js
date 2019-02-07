document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/hogs")
  .then(res => res.json())
  .then(pigs => slapPigsOnDom(pigs))
  const hogContainer = document.querySelector("#hog-container");

  const slapPigsOnDom = pigs => {
    pigs.forEach(addPigtoDom)
  }
  const isGreased = pig => {
    if(pig.greased) {
      return `<input type="checkbox" class="greasy" name="greased" checked></input>`
    } else {
      return `<input type="checkbox" class="greasy" name="greased"></input>`
    }
  }

  const addPigtoDom = pig => {
      hogContainer.innerHTML += `
      <div data-id="${pig.id}" class="hog-card">
        <h1> ${pig.name} </h1>
        <img src="${pig.image}"></img>
        <h2> ${pig.specialty} </h2>
        <p> Weight: ${pig["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]} </p>
        <p> Rank: ${pig["highest medal achieved"]} </p>
        ${isGreased(pig)}
        <button class="delete">X</button>
      <div>
      `
  }

  const createPig = () => {
    const hogForm = document.querySelector("#hog-form");
    hogForm.addEventListener("submit", event => {
      event.preventDefault();
      let name = event.target.name.value;
      let specialty = event.target.specialty.value;
      let medal = event.target.medal.value;
      let weight = event.target.weight.value;
      let image = event.target.img.value;
      let greased = event.target.greased.checked;

      fetch("http://localhost:3000/hogs", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name,
          specialty,
          "highest medal achieved": medal,
          "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": weight,
          image,
          greased
        })
      })
      .then(res => res.json())
      .then(pig => addPigtoDom(pig))

    })
  }

  hogContainer.addEventListener("click", event => {
    const pigID = event.target.parentNode.dataset.id
    if(event.target.classList.contains("greasy")) {
      fetch(`http://localhost:3000/hogs/${pigID}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( {
          greased: event.target.checked
        })
      })
    } else if (event.target.classList.contains("delete")) {
      fetch(`http://localhost:3000/hogs/${pigID}`, {
        method: "Delete"
      })
      .then(event.target.parentNode.remove())
    }


  })




  createPig();


})
