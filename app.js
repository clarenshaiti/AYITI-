const categories = [
  { id: 'mode', label: 'Mode', count: '320', icon: '♢' },
  { id: 'tech', label: 'Tech', count: '186', icon: '◫' },
  { id: 'home', label: 'Maison', count: '412', icon: '⌂' },
  { id: 'beauty', label: 'Beauté', count: '241', icon: '✦' },
  { id: 'vehicles', label: 'Auto', count: '97', icon: '◈' },
  { id: 'others', label: 'Divers', count: '128', icon: '…' }
];

const listings = [
  {
    id: 1,
    title: 'Canapé 3 places',
    category: 'home',
    condition: 'Très bon état',
    price: 18000,
    currency: 'HTG',
    estimate: 'Environ 22 000 HTG',
    city: 'Pétion-Ville',
    neighborhood: 'Delmas 33',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    favorite: true
  },
  {
    id: 2,
    title: 'Vélo électrique',
    category: 'vehicles',
    condition: 'Comme neuf',
    price: 36000,
    currency: 'HTG',
    estimate: 'Environ 40 000 HTG',
    city: 'Port-au-Prince',
    neighborhood: 'Turgeau',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=900&q=80',
    favorite: false
  },
  {
    id: 3,
    title: 'iPhone 13 Pro',
    category: 'tech',
    condition: 'Très bon état',
    price: 95000,
    currency: 'HTG',
    estimate: 'Environ 110 000 HTG',
    city: 'Pétion-Ville',
    neighborhood: 'Clercine',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    favorite: true
  },
  {
    id: 4,
    title: 'Sac à main cuir',
    category: 'mode',
    condition: 'Neuf',
    price: 6200,
    currency: 'HTG',
    estimate: 'Environ 7 500 HTG',
    city: 'Santo Domingo',
    neighborhood: 'Distrito Nacional',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
    favorite: false
  },
  {
    id: 5,
    title: 'Chaise de bureau',
    category: 'home',
    condition: 'Bon état',
    price: 5200,
    currency: 'HTG',
    estimate: 'Environ 6 000 HTG',
    city: 'Cap-Haïtien',
    neighborhood: 'Bassin bleu',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    favorite: false
  },
  {
    id: 6,
    title: 'Ensemble de beauté',
    category: 'beauty',
    condition: 'Nouvelle collection',
    price: 3300,
    currency: 'HTG',
    estimate: 'Environ 4 200 HTG',
    city: 'Port-au-Prince',
    neighborhood: 'Carrefour',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    favorite: true
  },
  {
    id: 7,
    title: 'Console portable',
    category: 'tech',
    condition: 'Comme neuf',
    price: 43000,
    currency: 'HTG',
    estimate: 'Environ 50 000 HTG',
    city: 'Pétion-Ville',
    neighborhood: 'Petion-Ville',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80',
    favorite: false
  },
  {
    id: 8,
    title: 'Veste en denim',
    category: 'mode',
    condition: 'Très bon état',
    price: 7000,
    currency: 'HTG',
    estimate: 'Environ 8 500 HTG',
    city: 'Port-au-Prince',
    neighborhood: 'Bel Air',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    favorite: false
  }
];

const state = {
  activeView: 'homeView',
  activeFilter: 'all',
  language: 'fr',
  searchQuery: '',
  user: null,
  authMode: 'signup',
  supabase: null,
};

const supabaseConfig = {
  url: (window.ayitiSupabase && window.ayitiSupabase.url) || 'https://YOUR_PROJECT_REF.supabase.co',
  key: (window.ayitiSupabase && window.ayitiSupabase.key) || 'YOUR_SUPABASE_ANON_KEY',
};

async function initSupabase() {
  if (!window.supabase || supabaseConfig.url.includes('YOUR_PROJECT_REF') || supabaseConfig.key.includes('YOUR_')) {
    return null;
  }

  const { createClient } = window.supabase;
  const client = createClient(supabaseConfig.url, supabaseConfig.key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  state.supabase = client;
  return client;
}

async function handleSupabaseResponse(response, successMessage) {
  if (response?.error) {
    throw new Error(response.error.message || 'Une erreur est survenue.');
  }

  if (successMessage) {
    showToast(successMessage);
  }

  return response;
}

const translations = {
  fr: {
    greeting: 'BONJOU, MARIE',
    discover: 'Trouvez votre prochaine trouvaille.',
    new: 'Nouveau',
    sellBanner: 'Vendez ce qui ne vous sert plus.',
    sellSub: 'Donnez une seconde vie à vos objets, près de chez vous.',
    sellNow: 'Vendre maintenant',
    categories: 'Catégories',
    seeAll: 'Tout voir',
    nearby: 'Près de vous',
    recent: 'Ajoutés récemment',
    searchTitle: 'Tout près, tout simplement.',
    home: 'Accueil',
    search: 'Rechercher',
    sell: 'Vendre',
    messages: 'Messages',
    profile: 'Profil',
    messagesTitle: 'Vos échanges',
    safety: 'Achetez en sécurité',
    safetySub: 'Restez dans la messagerie Ayiti et choisissez un lieu public.',
    sellTitle: 'Votre objet mérite une nouvelle histoire.',
    sellIntro: 'Publiez gratuitement et échangez en toute confiance.',
    addPhotos: 'Ajouter des photos',
    searchPlaceholder: 'Rechercher un article...'
  },
  en: {
    greeting: 'HELLO, MARIE',
    discover: 'Find your next favorite thing.',
    new: 'NEW',
    sellBanner: 'Sell what you no longer use.',
    sellSub: 'Give your items a second life close to home.',
    sellNow: 'Sell now',
    categories: 'Categories',
    seeAll: 'See all',
    nearby: 'Nearby',
    recent: 'Recently added',
    searchTitle: 'Close by, just simpler.',
    home: 'Home',
    search: 'Search',
    sell: 'Sell',
    messages: 'Messages',
    profile: 'Profile',
    messagesTitle: 'Your conversations',
    safety: 'Buy safely',
    safetySub: 'Stay in Ayiti chat and choose a public place.',
    sellTitle: 'Your item deserves a new story.',
    sellIntro: 'List it free and trade with confidence.',
    addPhotos: 'Add photos',
    searchPlaceholder: 'Search an item...'
  }
};

function formatPrice(value, currency) {
  return new Intl.NumberFormat('fr-FR').format(value) + ' ' + currency;
}

function getVisibleListings() {
  const query = state.searchQuery.trim().toLowerCase();
  const filtered = listings.filter((item) => {
    const matchesCategory = state.activeFilter === 'all' || item.category === state.activeFilter;
    const matchesQuery = !query || item.title.toLowerCase().includes(query) || item.city.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  return filtered;
}

function renderCategories() {
  const categoryGrid = document.getElementById('categoryGrid');
  categoryGrid.innerHTML = categories.map((item) => `
    <button class="category-card" data-category="${item.id}" type="button">
      <span class="category-badge">${item.icon}</span>
      <span>
        <strong>${item.label}</strong>
        <span>${item.count} annonces</span>
      </span>
    </button>
  `).join('');
}

function renderListingCard(item) {
  return `
    <article class="listing-card" data-id="${item.id}">
      <div class="listing-media">
        <img src="${item.image}" alt="${item.title}" />
        <div class="card-actions">
          <button class="heart-button ${item.favorite ? 'is-active' : ''}" type="button" aria-label="Mettre en favori" data-favorite="${item.id}">♥</button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span>${item.condition}</span>
          <span>${item.city}</span>
        </div>
        <h3 class="card-title">${item.title}</h3>
        <div class="card-footer">
          <div class="price">${formatPrice(item.price, item.currency)}<small></small></div>
          <span class="card-tag">${item.category}</span>
        </div>
      </div>
    </article>
  `;
}

function renderHomeListings() {
  const nearby = getVisibleListings().slice(0, 4);
  const recent = getVisibleListings().slice(1, 5);
  document.getElementById('nearbyListings').innerHTML = nearby.map(renderListingCard).join('');
  document.getElementById('recentListings').innerHTML = recent.map(renderListingCard).join('');
}

function renderProfileListings() {
  const items = listings.slice(0, 4);
  document.getElementById('profileListings').innerHTML = items.map(renderListingCard).join('');
}

function renderBrowseListings() {
  const visibleItems = getVisibleListings();
  document.getElementById('allListings').innerHTML = visibleItems.map(renderListingCard).join('');
  document.getElementById('resultCount').textContent = `${visibleItems.length} annonce${visibleItems.length > 1 ? 's' : ''}`;
}

function openView(viewId) {
  state.activeView = viewId;
  document.querySelectorAll('.view').forEach((view) => {
    view.classList.toggle('active', view.id === viewId);
  });

  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.view === viewId);
  });
}

function toggleLanguage() {
  state.language = state.language === 'fr' ? 'en' : 'fr';
  const current = translations[state.language];

  document.documentElement.lang = state.language;
  document.getElementById('languageToggle').textContent = state.language.toUpperCase();

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (current[key]) {
      node.textContent = current[key];
    }
  });

  document.querySelectorAll('[data-placeholder="search"]').forEach((input) => {
    input.placeholder = current.searchPlaceholder;
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => toast.classList.remove('show'), 1800);
}

function openDetail(itemId) {
  const item = listings.find((entry) => entry.id === Number(itemId));
  if (!item) return;

  const modal = document.getElementById('detailModal');
  document.getElementById('detailImage').src = item.image;
  document.getElementById('detailImage').alt = item.title;
  document.getElementById('detailCondition').textContent = item.condition;
  document.getElementById('detailTitle').textContent = item.title;
  document.getElementById('detailPrice').textContent = formatPrice(item.price, item.currency);
  document.getElementById('detailEstimate').textContent = item.estimate;
  document.getElementById('detailCity').textContent = `${item.city} · ${item.neighborhood}`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeDetail() {
  const modal = document.getElementById('detailModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function updateFavorites(id) {
  const item = listings.find((entry) => entry.id === Number(id));
  if (!item) return;
  item.favorite = !item.favorite;
  const savedCount = document.getElementById('savedCount');
  const count = listings.filter((entry) => entry.favorite).length;
  if (savedCount) savedCount.textContent = count;
  renderHomeListings();
  renderBrowseListings();
  renderProfileListings();
}

function loadUser() {
  const user = localStorage.getItem('ayiti-user');
  if (user) {
    state.user = JSON.parse(user);
  }
}

function saveUser(user) {
  state.user = user;
  localStorage.setItem('ayiti-user', JSON.stringify(user));
  updateProfileHeader();
}

function updateProfileHeader() {
  const profileName = document.querySelector('#profileView h1');
  const profileMeta = document.querySelector('#profileView .profile-header p');
  if (state.user && profileName) {
    profileName.textContent = state.user.name || 'Utilisateur';
    profileMeta.innerHTML = `⌖ ${state.user.city || 'Pétion-Ville'} · ★ 4.9 <span class="muted">(18 avis)</span>`;
    document.getElementById('profileShortcut').textContent = (state.user.name || 'U').charAt(0).toUpperCase();
  }
}

function openAuthModal(mode = 'signup') {
  state.authMode = mode;
  const modal = document.getElementById('authModal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  setAuthView(mode);
}

function closeAuthModal() {
  document.getElementById('authModal').classList.remove('open');
  document.getElementById('authModal').setAttribute('aria-hidden', 'true');
}

function setAuthView(mode) {
  state.authMode = mode;
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  const authTitle = document.getElementById('authTitle');
  const tabs = document.querySelectorAll('.auth-tab');

  const isSignup = mode === 'signup';
  signupForm.classList.toggle('auth-form-hidden', !isSignup);
  signupForm.classList.toggle('auth-form-visible', isSignup);
  loginForm.classList.toggle('auth-form-hidden', isSignup);
  loginForm.classList.toggle('auth-form-visible', !isSignup);

  authTitle.textContent = isSignup ? 'Créez votre compte Ayiti' : 'Bon retour sur Ayiti';
  tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.authMode === mode));
}

function bindEvents() {
  document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => openView(button.dataset.view));
  });

  document.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'search') openView('searchView');
      if (action === 'sell') openView('sellView');
      if (action === 'safety') openView('safetyView');
      if (action === 'admin') openView('adminView');
    });
  });

  document.getElementById('profileShortcut').addEventListener('click', () => openView('profileView'));
  document.getElementById('authButton').addEventListener('click', () => openAuthModal('signup'));
  document.getElementById('switchToLogin').addEventListener('click', () => openAuthModal('login'));
  document.querySelectorAll('.auth-tab').forEach((tab) => {
    tab.addEventListener('click', () => setAuthView(tab.dataset.authMode));
  });
  document.getElementById('filterButton').addEventListener('click', () => openView('searchView'));
  document.getElementById('languageToggle').addEventListener('click', toggleLanguage);

  document.getElementById('searchInput').addEventListener('input', (event) => {
    state.searchQuery = event.target.value;
    renderHomeListings();
  });

  document.getElementById('browseSearch').addEventListener('input', (event) => {
    state.searchQuery = event.target.value;
    renderBrowseListings();
  });

  document.querySelectorAll('.filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      state.activeFilter = chip.dataset.filter;
      document.querySelectorAll('.filter-chip').forEach((btn) => btn.classList.toggle('active', btn === chip));
      renderBrowseListings();
      renderHomeListings();
    });
  });

  document.querySelectorAll('[data-category]').forEach((button) => {
    button.addEventListener('click', () => {
      state.activeFilter = button.dataset.category;
      document.querySelectorAll('.filter-chip').forEach((chip) => {
        chip.classList.toggle('active', chip.dataset.filter === state.activeFilter);
      });
      openView('searchView');
      renderBrowseListings();
    });
  });

  document.getElementById('sellForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = form.get('title') || 'Nouvelle annonce';
    showToast(`${title} a été publiée.`);
    event.currentTarget.reset();
    openView('homeView');
  });

  document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!state.supabase) {
      const form = new FormData(event.currentTarget);
      const user = {
        name: form.get('name') || 'Nouvel utilisateur',
        email: form.get('email') || '',
        city: form.get('city') || 'Port-au-Prince',
        createdAt: new Date().toISOString(),
      };
      saveUser(user);
      closeAuthModal();
      event.currentTarget.reset();
      showToast(`Bienvenue, ${user.name}!`);
      openView('profileView');
      return;
    }

    try {
      const form = new FormData(event.currentTarget);
      const email = String(form.get('email') || '').trim();
      const password = String(form.get('password') || '');
      const name = String(form.get('name') || '').trim();
      const city = String(form.get('city') || 'Port-au-Prince');

      const { data, error } = await state.supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name, city },
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;
      if (data?.user) {
        saveUser({ name, email, city, createdAt: new Date().toISOString() });
      }

      closeAuthModal();
      event.currentTarget.reset();
      showToast('Compte créé. Vérifiez votre email pour confirmer votre inscription.');
      openView('profileView');
    } catch (error) {
      showToast(error.message || 'Échec de l’inscription.');
    }
  });

  document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!state.supabase) {
      showToast('Configurez Supabase pour activer la connexion réelle.');
      return;
    }

    try {
      const form = new FormData(event.currentTarget);
      const email = String(form.get('email') || '').trim();
      const password = String(form.get('password') || '');
      const { data, error } = await state.supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;
      const user = data?.user;
      const profile = user?.user_metadata || {};

      saveUser({
        name: profile.full_name || 'Utilisateur',
        email: user?.email || email,
        city: profile.city || 'Port-au-Prince',
        createdAt: new Date().toISOString(),
      });

      closeAuthModal();
      event.currentTarget.reset();
      showToast('Connexion réussie.');
      openView('profileView');
    } catch (error) {
      showToast(error.message || 'Connexion impossible.');
    }
  });

  document.getElementById('resetPasswordBtn').addEventListener('click', async () => {
    if (!state.supabase) {
      showToast('Configurez Supabase pour réinitialiser le mot de passe.');
      return;
    }

    const email = window.prompt('Entrez votre adresse email pour recevoir le lien de réinitialisation :');
    if (!email) return;

    try {
      const { error } = await state.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      showToast('Lien de réinitialisation envoyé.');
    } catch (error) {
      showToast(error.message || 'Impossible d’envoyer le lien.');
    }
  });

  document.querySelectorAll('[data-close-auth]').forEach((element) => {
    element.addEventListener('click', closeAuthModal);
  });

  document.getElementById('locationButton').addEventListener('click', () => showToast('Localisation : Port-au-Prince'));
  document.getElementById('messageSeller').addEventListener('click', () => showToast('Message envoyé au vendeur.'));
  document.getElementById('reportListing').addEventListener('click', () => showToast('Annonce signalée.'));

  document.querySelectorAll('[data-close-modal]').forEach((element) => {
    element.addEventListener('click', closeDetail);
  });

  document.addEventListener('click', (event) => {
    const favoriteButton = event.target.closest('[data-favorite]');
    if (favoriteButton) {
      updateFavorites(favoriteButton.dataset.favorite);
      return;
    }

    const listingCard = event.target.closest('.listing-card');
    if (listingCard) {
      const itemId = listingCard.dataset.id;
      openDetail(itemId);
    }
  });
}

async function init() {
  loadUser();
  renderCategories();
  renderHomeListings();
  renderBrowseListings();
  renderProfileListings();
  bindEvents();
  updateProfileHeader();
  await initSupabase();
  toggleLanguage();
  openView('homeView');
}

init();
