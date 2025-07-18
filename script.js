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
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert('Conta criada!'))
    .catch(err => alert(err.message));
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
  const listingsEl = document.getElementById('listings');
  listingsEl.innerHTML = '';
  db.ref('listings').once('value', snapshot => {
    snapshot.forEach(child => {
      const item = child.val();
      const li = document.createElement('li');
      li.innerHTML = `<strong>${item.title}</strong><br/>${item.location} - ${item.price}<br/><small>${item.amenities?.join(', ')}</small>`;
      listingsEl.appendChild(li);
    });
  });
}

function filterListings() {
  const query = document.getElementById('search').value.toLowerCase();
  const listings = document.querySelectorAll('#listings li');
  listings.forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(query) ? 'block' : 'none';
  });
}
