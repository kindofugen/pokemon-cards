const url = "https://pokeapi.co/api/v2/pokemon/";
const btn = document.querySelector("#btn");
const frontCard = document.querySelector(".front");

const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#ff0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#efb549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190ff",
};

const appendTypes = (types) => {
  types.forEach((item) => {
    const span = document.createElement("span");
    span.textContent = item.type.name;
    document.querySelector(".types").appendChild(span);
  });
};

const styleCard = (color) => {
  frontCard.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
  frontCard.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.backgroundColor = color;
  });
};

const generateCard = (data) => {
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;
  const themeColor = typeColor[data.types[0].type.name];

  frontCard.innerHTML = `
                            <p class="hp">
                            <span>HP</span>
                            ${hp}
                            </p>
                            <img src=${imgSrc} />
                            <h2 class="poke-name">${pokeName}</h2>
                            <div class="types">

                            </div>
                            <div class="stats">
                              <div>
                                  <h3>${statAttack}</h3>
                                  <p>Attack</p>
                              </div>
                              <div>
                                  <h3>${statDefense}</h3>
                                  <p>Defense</p>
                              </div>
                              <div>
                                  <h3>${statSpeed}</h3>
                                  <p>Speed</p>
                              </div>
                            </div>
  `;
  appendTypes(data.types);
  styleCard(themeColor);
};

const getPokemon = () => {
  const id = Math.floor(Math.random() * 150) + 1;
  fetch(url + id)
    .then((response) => response.json())
    .then((data) => generateCard(data));
};

const card = document.querySelector("#card");

btn.addEventListener("click", () => {
  card.classList.toggle("flip_card");
  if (!document.querySelector(".flip_card")) {
    getPokemon();
  }
});
