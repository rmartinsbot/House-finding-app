const listings = [
  {
    id: 1,
    title: "Apartamento 2 quartos",
    location: "São Paulo",
    price: "R$ 1.200/mês",
    amenities: ["Parque", "Estacionamento", "Perto da escola"],
  },
  {
    id: 2,
    title: "Casa familiar acessível",
    location: "Rio de Janeiro",
    price: "R$ 950/mês",
    amenities: ["Creche próxima", "Mercado", "Aceita animais"],
  },
];

const searchInput = document.getElementById("searchInput");
const listingsEl = document.getElementById("listings");
const addBtn = document.getElementById("addBtn");
const addForm = document.getElementById("addForm");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

const newTitle = document.getElementById("newTitle");
const newLocation = document.getElementById("newLocation");
const newPrice = document.getElementById("newPrice");
const newAmenities = document.getElementById("newAmenities");

function renderListings(filter = "") {
  listingsEl.innerHTML = "";

  const filtered = listings.filter(({ title, location }) => {
    const searchText = filter.toLowerCase();
    return (
      title.toLowerCase().includes(searchText) ||
      location.toLowerCase().includes(searchText)
    );
  });

  if (filtered.length === 0) {
    listingsEl.innerHTML = "<li>Nenhum imóvel encontrado.</li>";
    return;
  }

  filtered.forEach(({ id, title, location, price, amenities }) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <h3>${title}</h3>
      <p><strong>Cidade:</strong> ${location}</p>
      <p><strong>Preço:</strong> ${price}</p>
      <p><strong>Amenidades:</strong> ${amenities.join(", ")}</p>
    `;

    listingsEl.appendChild(li);
  });
}

searchInput.addEventListener("input", () => {
  renderListings(searchInput.value);
});

addBtn.addEventListener("click", () => {
  addForm.classList.remove("hidden");
  addBtn.disabled = true;
});

cancelBtn.addEventListener("click", () => {
  addForm.classList.add("hidden");
  addBtn.disabled = false;
  clearForm();
});

saveBtn.addEventListener("click", () => {
  const title = newTitle.value.trim();
  const location = newLocation.value.trim();
  const price = newPrice.value.trim();
  const amenities = newAmenities.value
    .split(",")
    .map((a) => a.trim())
    .filter((a) => a);

  if (!title || !location || !price) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  listings.push({
    id: listings.length + 1,
    title,
    location,
    price,
    amenities,
  });

  renderListings(searchInput.value);
  addForm.classList.add("hidden");
  addBtn.disabled = false;
  clearForm();
});

function clearForm() {
  newTitle.value = "";
  newLocation.value = "";
  newPrice.value = "";
  newAmenities.value = "";
}

renderListings();
