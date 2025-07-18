
// Mostrar ou esconder a app com base no estado do utilizador
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

// Registar novo utilizador
function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => alert('Conta criada com sucesso!'))
    .catch(error => alert('Erro ao criar conta: ' + error.message));
}

// Iniciar sessão
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => alert('Erro ao iniciar sessão: ' + error.message));
}

// Terminar sessão
function logout() {
  firebase.auth().signOut();
}

// Adicionar um novo imóvel
function addListing() {
  const title = document.getElementById('title').value;
  const location = document.getElementById('location').value;
  const price = document.getElementById('price').value;
  const amenities = document.getElementById('amenities').value.split(',');

  const userId = firebase.auth().currentUser.uid;

  firebase.database().ref('listings').push({
    title,
    location,
    price,
    amenities,
    userId
  }).then(() => {
    alert('Imóvel guardado!');
    loadListings();
  }).catch(error => {
    alert('Erro ao guardar imóvel: ' + error.message);
  });
}

// Carregar imóveis do utilizador autenticado
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
        div.innerHTML = `
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
    .then(() => {
      alert('Imóvel removido!');
      loadListings();
    });
}
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

// Carrega o tema guardado
window.onload = () => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.body.classList.add("dark");
};
  
