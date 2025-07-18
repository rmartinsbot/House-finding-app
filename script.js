// Iniciar autenticação
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    loadListings();
  } else {
    document.getElementById('auth').style.display = 'block';
    document.getElementById('app').style.display = 'none';
  }
});

// Função para registar novo utilizador
function register() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Conta criada com sucesso!");
    })
    .catch(error => {
      alert("Erro ao registar: " + error.message);
    });
}

// Função para iniciar sessão
function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {
      alert("Erro ao entrar: " + error.message);
    });
}

// Terminar sessão
function logout() {
  firebase.auth().signOut();
}

// Adicionar novo imóvel
function addListing() {
  const title = document.getElementById('title').value;
  const location = document.getElementById('location').value;
  const price = document.getElementById('price').value;
  const amenities = document.getElementById('amenities').value.split(',');

  const userId = firebase.auth().currentUser.uid;

  firebase.database().ref('listings').push({
    userId,
    title,
    location,
    price,
    amenities
  });

  alert("Imóvel adicionado!");
  loadListings();
}

// Listar imóveis do utilizador
function loadListings() {
  const userId = firebase.auth().currentUser.uid;
  const listingsRef = firebase.database().ref('listings');
  const listingsDiv = document.getElementById('listings');

  listingsRef.once('value', snapshot => {
    listingsDiv.innerHTML = '';

    snapshot.forEach(child => {
      const listing = child.val();
      const id = child.key;

      if (listing.userId === userId) {
        const div = document.createElement('div');
        div.className = 'listing';

        const randomImageUrl = `https://source.unsplash.com/400x200/?house,home&sig=${Math.random()}`;

        div.innerHTML = `
          <img src="${randomImageUrl}" alt="Imagem do imóvel">
          <h3>${listing.title}</h3>
          <p><strong>Localização:</strong> ${listing.location}</p>
          <p><strong>Preço:</strong> ${listing.price}€</p>
          <p><strong>Comodidades:</strong> ${listing.amenities.join(', ')}</p>
          <button onclick="removeListing('${id}')">Remover</button>
        `;
        listingsDiv.appendChild(div);
      }
    });
  });
}

// Remover imóvel
function removeListing(id) {
  firebase.database().ref('listings/' + id).remove()
    .then(() => loadListings());
}

// Tema escuro
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");


window.onload = () => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.body.classList.add("dark");
};
