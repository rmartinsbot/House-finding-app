function addListing() {
  const title = document.getElementById('title').value;
  const location = document.getElementById('location').value;
  const price = document.getElementById('price').value;
  const amenities = document.getElementById('amenities').value.split(',');
  
  const user = firebase.auth().currentUser;
  if (!user) return;

  db.ref('listings').push({
    userId: user.uid,  // ← ISTO é essencial!
    title,
    location,
    price,
    amenities
  });
}function toggleForm() {
  document.getElementById('login-screen').style.display =
    document.getElementById('login-screen').style.display === 'none' ? 'block' : 'none';
  document.getElementById('register-screen').style.display =
    document.getElementById('register-screen').style.display === 'none' ? 'block' : 'none';
}

function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert('Conta criada com sucesso!');
      showApp(); // mostra o conteúdo da app
    })
    .catch(error => {
      alert('Erro ao criar conta: ' + error.message);
    });
}

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => showApp())
    .catch(err => alert(err.message));
}

function logout() {
  auth.signOut().then(() => showLogin());
}

auth.onAuthStateChanged(user => {
  if (user) showApp();
  else showLogin();
});

function showApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('register-screen').style.display = 'none';
  document.getElementById('app-screen').style.display = 'block';
  loadListings();
}

function showLogin() {
  document.getElementById('app-screen').style.display = 'none';
  document.getElementById('login-screen').style.display = 'block';
}

function addListing() {
  const title = document.getElementById('title').value;
  const location = document.getElementById('location').value;
  const price = document.getElementById('price').value;
  const amenities = document.getElementById('amenities').value.split(',');

  const user = auth.currentUser;
  if (!user) return;

  db.ref('listings').push({
    userId: user.uid,
    title,
    location,
    price,
    amenities
  });
  loadListings();
}

function loadListings() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  const listingsRef = db.ref('listings');
  listingsRef.once('value', (snapshot) => {
    const listings = snapshot.val();
    const container = document.getElementById('listings');
    container.innerHTML = '';

    for (let id in listings) {
      const listing = listings[id];

      // Mostrar só os imóveis do utilizador atual
      if (listing.userId === user.uid) {
        const div = document.createElement('div');
        div.classList.add('listing');
        div.innerHTML = `
          <h3>${listing.title}</h3>
          <p><strong>Localização:</strong> ${listing.location}</p>
          <p><strong>Preço:</strong> ${listing.price}€</p>
          <p><strong>Comodidades:</strong> ${listing.amenities.join(', ')}</p>
          <button onclick="removeListing('${id}')">Remover</button>
        `;
        container.appendChild(div);
      }
    }
  });
}

function filterListings() {
  const query = document.getElementById('search').value.toLowerCase();
  const listings = document.querySelectorAll('#listings li');
  listings.forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(query) ? 'block' : 'none';
  });
}
function removeListing(id) {
  const user = firebase.auth().currentUser;
  if (!user) return;

  const ref = db.ref(`listings/${id}`);

  ref.once('value', (snapshot) => {
    const data = snapshot.val();

    if (data.userId === user.uid) {
      ref.remove()
        .then(() => {
          alert('Imóvel removido.');
          loadListings(); // Atualiza a lista
        })
        .catch(err => {
          console.error(err);
          alert('Erro ao remover.');
        });
    } else {
      alert('Não tens permissão para remover este imóvel.');
    }
  });
}
div.innerHTML = `
  <h3>${listing.title}</h3>
  <p><strong>Localização:</strong> ${listing.location}</p>
  <p><strong>Preço:</strong> ${listing.price}€</p>
  <p><strong>Comodidades:</strong> ${listing.amenities.join(', ')}</p>
  <button onclick="removeListing('${id}')">Remover</button>
`;
