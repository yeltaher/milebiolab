/**
 * ============================================================================
 * MILEBIOLAB SHOPIFY OS 2.0 THEME ENGINE — MILE BESPOKE SUITE
 * Complete Client-Side Interactivity Suite:
 * 1. Announcement Bar Multi-Message Carousel
 * 2. Hotspots Interactive Popovers
 * 3. Before & After Comparison Slider (Touch & Drag)
 * 4. Reactive Cart Drawer (Dynamic subtotal, €120 shipping bar, qty, pickup toggle)
 * 5. Quick View Modal with Volume Swatches
 * 6. Interactive Multi-Step Skin Quiz & Routine Generator
 * 7. Predictive Search Overlay
 * 8. PDP Gallery & Volume/Price Switcher & Sticky ATC
 * 9. Verona Local Pickup Checker & Modal
 * 10. Smooth Accordion Component
 * ============================================================================
 */

// Global State
const MilebiolabState = {
  cart: [
    {
      id: 'pdp-cream',
      title: 'Supreme Moisture & Cellular Repair Cream',
      step: 'STEP 03: TRATTAMENTO BARRIERA',
      price: 84.00,
      volume: '50 ml',
      qty: 1,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'pdp-serum',
      title: 'Intense Hyaluronic Power Serum',
      step: 'STEP 02: BOOSTER ATTIVO',
      price: 86.00,
      volume: '30 ml',
      qty: 1,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80'
    }
  ],
  deliveryChoice: 'pickup', // 'pickup' or 'shipping'
  pdp: {
    basePrice: 84.00,
    selectedVolume: '50 ml',
    selectedUnitPrice: '€ 168,00 / 100ml',
    qty: 1
  },
  quiz: {
    skinType: 'secca',
    concern: 'antiage',
    texture: 'vellutata'
  },
  wishlist: [],
  catalog: [
    {
      id: 'daily-cleanser',
      title: 'Daily Cleansing Milk & Soothing Tonic',
      category: 'Detersione',
      step: 'STEP 01',
      price: 38.00,
      volume: '200 ml',
      actives: 'Fieno Greco & Fiori di Camomilla Bio',
      rating: 4.9,
      reviews: 48,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'hyaluronic-serum',
      title: 'Intense Hyaluronic Power Serum',
      category: 'Sieri',
      step: 'STEP 02',
      price: 86.00,
      volume: '30 ml',
      actives: '5 Pesi Molecolari & Biofermentato Mirtillo',
      rating: 5.0,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'supreme-cream',
      title: 'Supreme Moisture & Cellular Repair Cream',
      category: 'Creme',
      step: 'STEP 03',
      price: 84.00,
      volume: '50 ml',
      actives: 'Cellule Staminali Stella Alpina & Ialuronico',
      rating: 4.9,
      reviews: 142,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'eye-contour',
      title: 'Cellular Youth Eye & Lip Contour',
      category: 'Contorno Occhi',
      step: 'STEP 04',
      price: 68.00,
      volume: '15 ml',
      actives: 'Caffeina Verde & Eufrasia Alpina Bio',
      rating: 4.8,
      reviews: 64,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80'
    }
  ]
};

/* ==========================================================================
   1. ANNOUNCEMENT BAR ROTATING CAROUSEL
   ========================================================================== */
let announcementTimer = null;
let currentAnnouncementIndex = 0;

function initAnnouncementCarousel() {
  const slides = document.querySelectorAll('.announcement-slide');
  if (!slides || slides.length === 0) return;

  function showSlide(idx) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === idx);
    });
    currentAnnouncementIndex = idx;
  }

  window.prevAnnouncement = function() {
    let nextIdx = (currentAnnouncementIndex - 1 + slides.length) % slides.length;
    showSlide(nextIdx);
    resetAnnouncementTimer();
  };

  window.nextAnnouncement = function() {
    let nextIdx = (currentAnnouncementIndex + 1) % slides.length;
    showSlide(nextIdx);
    resetAnnouncementTimer();
  };

  function resetAnnouncementTimer() {
    if (announcementTimer) clearInterval(announcementTimer);
    announcementTimer = setInterval(() => {
      let nextIdx = (currentAnnouncementIndex + 1) % slides.length;
      showSlide(nextIdx);
    }, 4500);
  }

  showSlide(0);
  resetAnnouncementTimer();
}

/* ==========================================================================
   2. BUILD YOUR OWN HOTSPOTS
   ========================================================================== */
function toggleHotspot(id) {
  const allPins = document.querySelectorAll('.hotspot-pin');
  const allPopovers = document.querySelectorAll('.hotspot-popover');
  
  allPins.forEach((pin) => {
    const pinId = parseInt(pin.getAttribute('data-hotspot-id'), 10);
    if (pinId === id) {
      pin.classList.toggle('active');
    } else {
      pin.classList.remove('active');
    }
  });

  allPopovers.forEach((pop) => {
    const popId = parseInt(pop.getAttribute('data-hotspot-id'), 10);
    if (popId === id) {
      pop.classList.toggle('active');
    } else {
      pop.classList.remove('active');
    }
  });
}

function closeAllHotspots() {
  document.querySelectorAll('.hotspot-pin').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.hotspot-popover').forEach(p => p.classList.remove('active'));
}

/* ==========================================================================
   3. BEFORE & AFTER INTERACTIVE SLIDER
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('before-after-box');
  const rangeInput = document.getElementById('before-after-range');
  const afterClip = document.getElementById('after-image-layer');
  const dividerLine = document.getElementById('before-after-divider');

  if (!container || !rangeInput || !afterClip || !dividerLine) return;

  function updateSliderPosition(percent) {
    percent = Math.max(0, Math.min(100, percent));
    afterClip.style.clipPath = `polygon(${percent}% 0%, 100% 0%, 100% 100%, ${percent}% 100%)`;
    dividerLine.style.left = `${percent}%`;
    rangeInput.value = percent;
  }

  rangeInput.addEventListener('input', (e) => {
    updateSliderPosition(parseFloat(e.target.value));
  });

  // Mouse & Touch dragging on container
  let isDragging = false;

  function handleDrag(e) {
    if (!isDragging) return;
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const offset = clientX - rect.left;
    const percent = (offset / rect.width) * 100;
    updateSliderPosition(percent);
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    handleDrag(e);
  });
  window.addEventListener('mousemove', handleDrag);
  window.addEventListener('mouseup', () => { isDragging = false; });

  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    handleDrag(e);
  }, { passive: true });
  window.addEventListener('touchmove', handleDrag, { passive: true });
  window.addEventListener('touchend', () => { isDragging = false; });

  // Initial set at 50%
  updateSliderPosition(50);
}

/* ==========================================================================
   4. REACTIVE CART DRAWER ENGINE (SHOPIFY OS 2.0 AJAX SYNC + LOCAL FALLBACK)
   ========================================================================== */
const CART_STORAGE_KEY = 'splendor_cart_state';

// Fetch real Shopify Cart
async function fetchShopifyCart() {
  const cartUrl = (window.routes && window.routes.cart_url) ? window.routes.cart_url : '/cart.js';
  try {
    const res = await fetch(cartUrl, {
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error('Shopify cart endpoint error');
    const data = await res.json();
    if (data && Array.isArray(data.items)) {
      if (data.items.length > 0) {
        MilebiolabState.cart = data.items.map(item => ({
          id: item.id || item.variant_id,
          key: item.key,
          title: item.product_title || item.title,
          step: (item.properties && item.properties['step']) || 'RITUALE BOTANICO',
          price: (item.price / 100),
          volume: item.variant_title || 'Formato Originale',
          qty: item.quantity,
          image: item.featured_image ? (item.featured_image.url || item.featured_image) : (item.image || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80')
        }));
      } else {
        MilebiolabState.cart = [];
      }
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(MilebiolabState.cart));
      } catch (e) {}
    }
  } catch (err) {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        MilebiolabState.cart = JSON.parse(stored);
      }
    } catch (e) {}
  }
  renderCartDrawer();
}

async function addShopifyCartItem(variantId, qty = 1, itemData = {}) {
  const addUrl = (window.routes && window.routes.cart_add_url) ? window.routes.cart_add_url : '/cart/add.js';
  try {
    const payload = {
      id: variantId,
      quantity: qty
    };
    if (itemData && itemData.properties) {
      payload.properties = itemData.properties;
    }
    const res = await fetch(addUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Add to cart API returned ' + res.status);
    await fetchShopifyCart();
    openCartDrawer();
    return true;
  } catch (err) {
    addToCart(itemData && itemData.title ? itemData : {
      id: variantId,
      title: (itemData && itemData.title) || 'Golden Glow Body Oil',
      price: (itemData && itemData.price) || 76.00,
      volume: (itemData && itemData.volume) || '100 ml',
      qty: qty,
      image: (itemData && itemData.image) || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80'
    });
    return false;
  }
}

async function changeShopifyCartQty(itemKeyOrId, newQty) {
  const changeUrl = (window.routes && window.routes.cart_change_url) ? window.routes.cart_change_url : '/cart/change.js';
  try {
    const res = await fetch(changeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: itemKeyOrId,
        quantity: newQty
      })
    });
    if (!res.ok) throw new Error('Change cart API returned ' + res.status);
    await fetchShopifyCart();
    return true;
  } catch (err) {
    const item = MilebiolabState.cart.find(i => i.id == itemKeyOrId || i.key == itemKeyOrId);
    if (item) {
      item.qty = newQty;
      if (item.qty <= 0) {
        MilebiolabState.cart = MilebiolabState.cart.filter(i => i !== item);
      }
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(MilebiolabState.cart));
      } catch (e) {}
      renderCartDrawer();
    }
    return false;
  }
}

window.fetchShopifyCart = fetchShopifyCart;
window.addShopifyCartItem = addShopifyCartItem;
window.changeShopifyCartQty = changeShopifyCartQty;

function renderCartDrawer() {
  const container = document.getElementById('cart-drawer-items-list');
  const counterBadges = document.querySelectorAll('.cart-count-badge');
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const progressFill = document.getElementById('cart-progress-fill');
  const progressText = document.getElementById('cart-progress-text');
  const checkoutBtnPrice = document.getElementById('cart-checkout-price');

  if (!container) return;

  // Calculate totals
  let totalQty = 0;
  let subtotal = 0;

  container.innerHTML = '';

  if (MilebiolabState.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message" style="text-align: center; padding: 3rem 1.5rem; color: #5C5852;">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 1rem;">🌿</span>
        <h4 style="font-family: var(--font-heading); font-size: 1.25rem; margin-bottom: 0.5rem; color: #1A1A1A;">Il Tuo Carrello dei Rituali è Vuoto</h4>
        <p style="font-size: 0.85rem; margin-bottom: 1.5rem;">Esplora le nostre formulazioni botaniche ad altissima efficacia.</p>
        <button type="button" class="btn-primary" onclick="closeCartDrawer(); window.location.hash='#prodotti';">Scopri i Rituali</button>
      </div>
    `;
  } else {
    MilebiolabState.cart.forEach((item, index) => {
      totalQty += item.qty;
      subtotal += item.price * item.qty;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-details">
          <span class="cart-item-step">${item.step || 'RITUALE BOTANICO'}</span>
          <h4 class="cart-item-title">${item.title}</h4>
          <div class="cart-item-price">€ ${item.price.toFixed(2).replace('.', ',')}</div>
          <div class="cart-item-meta">${item.volume} • Milebiolab Haute Couture</div>
          <div class="cart-item-qty">
            <button class="qty-btn" type="button" onclick="updateCartItemQty('${item.key || item.id}', -1)" aria-label="Riduci">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" type="button" onclick="updateCartItemQty('${item.key || item.id}', 1)" aria-label="Aumenta">+</button>
            <button class="qty-remove-btn" type="button" onclick="removeCartItem('${item.key || item.id}')" title="Rimuovi" style="margin-left: auto; font-size: 0.75rem; color: #9E9382; text-decoration: underline; background: none; border: none; cursor: pointer;">Rimuovi</button>
          </div>
        </div>
      `;
      container.appendChild(itemEl);
    });
  }

  // Update badges
  counterBadges.forEach(b => {
    b.textContent = totalQty;
    b.style.display = totalQty > 0 ? 'inline-flex' : 'none';
  });

  // Update Subtotal
  const subtotalFormatted = `€ ${subtotal.toFixed(2).replace('.', ',')}`;
  if (subtotalEl) subtotalEl.textContent = subtotalFormatted;
  if (checkoutBtnPrice) checkoutBtnPrice.textContent = subtotalFormatted;

  // Free shipping & sample progress bar (Threshold: €120)
  const threshold = 120.00;
  const percent = Math.min(100, (subtotal / threshold) * 100);
  if (progressFill) progressFill.style.width = `${percent}%`;

  if (progressText) {
    if (subtotal >= threshold) {
      progressText.innerHTML = `✨ <strong>Complimenti!</strong> Hai sbloccato la Spedizione Gratuita e il <strong>Cofanetto 3 Campioncini Deluxe Omaggio</strong>.`;
    } else {
      const remaining = (threshold - subtotal).toFixed(2).replace('.', ',');
      progressText.innerHTML = `🌿 Aggiungi ancora <strong>€ ${remaining}</strong> per la <em>Spedizione Gratuita</em> e i <em>3 Campioncini Omaggio</em>!`;
    }
  }
}

function openCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (overlay && drawer) {
    overlay.classList.add('active');
    drawer.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  renderCartDrawer();
}

function closeCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (overlay && drawer) {
    overlay.classList.remove('active');
    drawer.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function addToCart(item) {
  if (item && item.id && (!isNaN(Number(item.id)) && Number(item.id) > 100)) {
    addShopifyCartItem(item.id, item.qty || 1, item);
    return;
  }

  const existing = MilebiolabState.cart.find(i => i.id === item.id);
  if (existing) {
    existing.qty += (item.qty || 1);
  } else {
    MilebiolabState.cart.push({
      id: item.id,
      title: item.title,
      step: item.step || 'RITUALE BOTANICO',
      price: item.price,
      volume: item.volume || '50 ml',
      qty: item.qty || 1,
      image: item.image
    });
  }
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(MilebiolabState.cart));
  } catch (e) {}
  openCartDrawer();
}

function updateCartItemQty(id, delta) {
  const item = MilebiolabState.cart.find(i => i.id == id || i.key == id);
  if (!item) return;

  const newQty = item.qty + delta;
  if (item.key || typeof item.id === 'number' || (!isNaN(Number(item.id)) && Number(item.id) > 100)) {
    changeShopifyCartQty(item.key || item.id, newQty);
  } else {
    item.qty = newQty;
    if (item.qty <= 0) {
      MilebiolabState.cart = MilebiolabState.cart.filter(i => i.id !== id && i.key !== id);
    }
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(MilebiolabState.cart));
    } catch (e) {}
    renderCartDrawer();
  }
}

function removeCartItem(id) {
  const item = MilebiolabState.cart.find(i => i.id == id || i.key == id);
  if (!item) return;

  if (item.key || typeof item.id === 'number' || (!isNaN(Number(item.id)) && Number(item.id) > 100)) {
    changeShopifyCartQty(item.key || item.id, 0);
  } else {
    MilebiolabState.cart = MilebiolabState.cart.filter(i => i.id !== id && i.key !== id);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(MilebiolabState.cart));
    } catch (e) {}
    renderCartDrawer();
  }
}

function setDeliveryChoice(choice) {
  MilebiolabState.deliveryChoice = choice;
  const pickupRadio = document.getElementById('delivery-choice-pickup');
  const shippingRadio = document.getElementById('delivery-choice-shipping');
  const pickupLabel = document.getElementById('pickup-label-box');
  const shippingLabel = document.getElementById('shipping-label-box');
  const veronaNotice = document.getElementById('cart-verona-notice');

  if (choice === 'pickup') {
    if (pickupRadio) pickupRadio.checked = true;
    if (pickupLabel) pickupLabel.style.borderColor = 'var(--color-accent-olive)';
    if (shippingLabel) shippingLabel.style.borderColor = 'var(--color-border)';
    if (veronaNotice) veronaNotice.style.display = 'flex';
  } else {
    if (shippingRadio) shippingRadio.checked = true;
    if (shippingLabel) shippingLabel.style.borderColor = 'var(--color-accent-olive)';
    if (pickupLabel) pickupLabel.style.borderColor = 'var(--color-border)';
    if (veronaNotice) veronaNotice.style.display = 'none';
  }
}

function addToCartMock(title, price, image, volume, step) {
  const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
  addToCart({
    id: id,
    title: title,
    step: step || 'RITUALE BOTANICO',
    price: price,
    volume: volume || '50 ml',
    qty: 1,
    image: image || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80'
  });
}

function addRoutineBundleToCart() {
  // Adds 3 items with 15% discount
  addToCart({
    id: 'bundle-01-reset',
    title: 'Daily Cleansing Milk & Soothing Tonic',
    step: '01 RESET • ROUTINE COMPLETA (-15%)',
    price: 32.30, // 38 - 15%
    volume: '200 ml',
    qty: 1,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=200&q=80'
  });
  addToCart({
    id: 'bundle-02-concentrate',
    title: 'Intense Hyaluronic Power Serum',
    step: '02 CONCENTRATE • ROUTINE COMPLETA (-15%)',
    price: 73.10, // 86 - 15%
    volume: '30 ml',
    qty: 1,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80'
  });
  addToCart({
    id: 'bundle-03-hydrate',
    title: 'Supreme Moisture & Cellular Repair Cream',
    step: '03 HYDRATE • ROUTINE COMPLETA (-15%)',
    price: 71.40, // 84 - 15%
    volume: '50 ml',
    qty: 1,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80'
  });
}

function addPdpCrossSellBundle() {
  // Bundle Serum + Cream (-15%)
  addToCart({
    id: 'duo-serum-hyaluronic',
    title: 'Intense Hyaluronic Power Serum (Duo Routine)',
    step: 'FASE 2 • DUO SPECIALE (-15%)',
    price: 73.10,
    volume: '30 ml',
    qty: 1,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80'
  });
  addToCart({
    id: 'duo-cream-supreme',
    title: 'Supreme Moisture Cream (Duo Routine)',
    step: 'FASE 3 • DUO SPECIALE (-15%)',
    price: 71.40,
    volume: '50 ml',
    qty: 1,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80'
  });
}

/* ==========================================================================
   5. QUICK VIEW MODAL
   ========================================================================== */
let activeQuickViewProduct = null;
let activeQuickViewVolume = '50 ml';
let activeQuickViewPrice = 84.00;

function openQuickView(productId) {
  const product = MilebiolabState.catalog.find(p => p.id === productId) || MilebiolabState.catalog[2];
  activeQuickViewProduct = product;
  activeQuickViewVolume = product.volume;
  activeQuickViewPrice = product.price;

  const modal = document.getElementById('quick-view-modal');
  const overlay = document.getElementById('quick-view-overlay');

  if (!modal || !overlay) return;

  document.getElementById('qv-product-img').src = product.image;
  document.getElementById('qv-product-title').textContent = product.title;
  document.getElementById('qv-product-step').textContent = product.step + ' • ' + product.category.toUpperCase();
  document.getElementById('qv-product-actives').textContent = product.actives;
  document.getElementById('qv-product-price').textContent = `€ ${product.price.toFixed(2).replace('.', ',')}`;
  document.getElementById('qv-product-rating').innerHTML = `★★★★★ <span>(${product.reviews} recensioni)</span>`;

  // Render Volume buttons
  const volumes = [
    { size: '30 ml', price: Math.round(product.price * 0.75) },
    { size: product.volume, price: product.price },
    { size: '100 ml', price: Math.round(product.price * 1.65) }
  ];

  const volContainer = document.getElementById('qv-volume-buttons');
  if (volContainer) {
    volContainer.innerHTML = '';
    volumes.forEach((v, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `swatch-volume-btn ${v.size === activeQuickViewVolume ? 'active' : ''}`;
      btn.textContent = `${v.size} — € ${v.price.toFixed(2).replace('.', ',')}`;
      btn.onclick = () => {
        document.querySelectorAll('#qv-volume-buttons .swatch-volume-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeQuickViewVolume = v.size;
        activeQuickViewPrice = v.price;
        document.getElementById('qv-product-price').textContent = `€ ${v.price.toFixed(2).replace('.', ',')}`;
      };
      volContainer.appendChild(btn);
    });
  }

  modal.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  const overlay = document.getElementById('quick-view-overlay');
  if (modal && overlay) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function addQuickViewToCart() {
  if (!activeQuickViewProduct) return;
  addToCart({
    id: activeQuickViewProduct.id + '-' + activeQuickViewVolume.replace(/\s+/g, ''),
    title: activeQuickViewProduct.title,
    step: activeQuickViewProduct.step,
    price: activeQuickViewPrice,
    volume: activeQuickViewVolume,
    qty: 1,
    image: activeQuickViewProduct.image
  });
  closeQuickView();
}

/* ==========================================================================
   6. SKIN QUIZ / ROUTINE FINDER MULTI-STEP MODAL
   ========================================================================== */
let currentQuizStep = 1;

function openSkinQuiz() {
  const modal = document.getElementById('skin-quiz-modal');
  const overlay = document.getElementById('skin-quiz-overlay');
  if (modal && overlay) {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setQuizStep(1);
  }
}

function closeSkinQuiz() {
  const modal = document.getElementById('skin-quiz-modal');
  const overlay = document.getElementById('skin-quiz-overlay');
  if (modal && overlay) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function setQuizStep(step) {
  currentQuizStep = step;
  for (let i = 1; i <= 4; i++) {
    const stepEl = document.getElementById(`quiz-step-${i}`);
    if (stepEl) {
      stepEl.style.display = (i === step) ? 'block' : 'none';
    }
  }

  // Update progress indicator
  const bar = document.getElementById('quiz-progress-bar');
  if (bar) {
    bar.style.width = `${(step / 4) * 100}%`;
  }
}

function selectQuizAnswer(stepName, value, button) {
  MilebiolabState.quiz[stepName] = value;
  const parent = button.closest('.quiz-options-grid');
  if (parent) {
    parent.querySelectorAll('.quiz-option-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  }
}

function nextQuizStep(currentStep) {
  if (currentStep < 3) {
    setQuizStep(currentStep + 1);
  } else {
    // Generate recommendation on step 4
    renderQuizRecommendation();
    setQuizStep(4);
  }
}

function renderQuizRecommendation() {
  const titleEl = document.getElementById('quiz-result-title');
  const descEl = document.getElementById('quiz-result-desc');

  let profile = "Protocollo Nutriente & Riparatore Barriera";
  if (MilebiolabState.quiz.skinType === 'sensibile' || MilebiolabState.quiz.concern === 'barriera') {
    profile = "Protocollo Bio-Lenitivo Stella Alpina & Mirtillo";
  } else if (MilebiolabState.quiz.concern === 'antiage') {
    profile = "Protocollo Cellulare Anti-Age Dalton ad Alta Rigenerazione";
  }

  if (titleEl) titleEl.textContent = profile;
  if (descEl) descEl.textContent = `Calibrato per pelle ${MilebiolabState.quiz.skinType} con obiettivo ${MilebiolabState.quiz.concern} e texture ${MilebiolabState.quiz.texture}. Include codice sconto di benvenuto -15% [MILE15].`;
}

function addQuizBundleToCart() {
  addRoutineBundleToCart();
  closeSkinQuiz();
}

/* ==========================================================================
   7. PREDICTIVE SEARCH MODAL
   ========================================================================== */
function openSearchModal() {
  const modal = document.getElementById('search-modal');
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-predictive-input');
  if (modal && overlay) {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 150);
      filterSearch('');
    }
  }
}

function closeSearchModal() {
  const modal = document.getElementById('search-modal');
  const overlay = document.getElementById('search-overlay');
  if (modal && overlay) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function filterSearch(query) {
  const container = document.getElementById('search-results-list');
  if (!container) return;

  const q = query.trim().toLowerCase();
  const results = q === '' 
    ? MilebiolabState.catalog 
    : MilebiolabState.catalog.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) || 
        p.actives.toLowerCase().includes(q)
      );

  container.innerHTML = '';
  if (results.length === 0) {
    container.innerHTML = `<p style="padding: 1.5rem; color: #5C5852; text-align: center;">Nessun trattamento trovato per "${query}". Prova con "crema", "siero" o "stella alpina".</p>`;
    return;
  }

  results.forEach(p => {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.innerHTML = `
      <img src="${p.image}" alt="${p.title}" class="search-result-thumb">
      <div class="search-result-info">
        <span class="search-result-cat">${p.step} • ${p.category}</span>
        <h5 class="search-result-title">${p.title}</h5>
        <span class="search-result-actives">${p.actives}</span>
        <span class="search-result-price">€ ${p.price.toFixed(2).replace('.', ',')}</span>
      </div>
      <button type="button" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.72rem;" onclick="addToCartMock('${p.title}', ${p.price}, '${p.image}', '${p.volume}', '${p.step}'); closeSearchModal();">+ Carrello</button>
    `;
    container.appendChild(item);
  });
}

/* ==========================================================================
   8. PDP GALLERY, VOLUME SELECTOR & QUANTITY CONTROLS
   ========================================================================== */
function switchGalleryImage(button) {
  const newImageUrl = button.getAttribute('data-image');
  const mainImage = document.getElementById('gallery-main-image');
  if (!mainImage) return;

  mainImage.style.opacity = '0';
  setTimeout(() => {
    mainImage.src = newImageUrl;
    mainImage.style.opacity = '1';
  }, 180);

  const allSwatches = document.querySelectorAll('.swatch-btn');
  allSwatches.forEach(sw => sw.classList.remove('active'));
  button.classList.add('active');
}

function updatePdpVolume(size, price, unitPrice, skuOrButton, barcode, button) {
  let sku = 'MB-SMC-050';
  let bcode = '8054321098509';
  let targetBtn = skuOrButton;

  if (typeof skuOrButton === 'string') {
    sku = skuOrButton;
    bcode = barcode || '8054321098509';
    targetBtn = button;
  }

  MilebiolabState.pdp.selectedVolume = size;
  MilebiolabState.pdp.basePrice = price;
  MilebiolabState.pdp.selectedUnitPrice = unitPrice;

  // Update volume swatches
  document.querySelectorAll('.pdp-volume-swatch').forEach(b => b.classList.remove('active'));
  if (targetBtn) targetBtn.classList.add('active');

  // Update Main Price Display
  const mainPriceEl = document.getElementById('pdp-price-amount');
  const unitPriceEl = document.getElementById('pdp-unit-price');
  const atcPriceEl = document.getElementById('atc-button-price');
  const skuEl = document.getElementById('pdp-sku-display');
  const bcodeEl = document.getElementById('pdp-barcode-display');

  if (mainPriceEl) mainPriceEl.textContent = price.toFixed(2).replace('.', ',');
  if (unitPriceEl) unitPriceEl.textContent = unitPrice;
  if (skuEl) skuEl.textContent = sku;
  if (bcodeEl) bcodeEl.textContent = bcode;

  // Recalculate ATC total
  updatePdpQty(0);
}

function updatePdpQty(delta) {
  const input = document.getElementById('pdp-qty-input');
  const atcPriceEl = document.getElementById('atc-button-price');
  if (!input) return;

  let current = parseInt(input.value, 10) || 1;
  current = Math.max(1, Math.min(10, current + delta));
  input.value = current;
  MilebiolabState.pdp.qty = current;

  if (atcPriceEl) {
    const total = (MilebiolabState.pdp.basePrice * current).toFixed(2).replace('.', ',');
    atcPriceEl.textContent = `€ ${total}`;
  }
}

function addToCartPdp() {
  addToCart({
    id: `pdp-supreme-cream-${MilebiolabState.pdp.selectedVolume.replace(/\s+/g, '')}`,
    title: 'Supreme Moisture & Cellular Repair Cream',
    step: 'STEP 03: TRATTAMENTO BARRIERA',
    price: MilebiolabState.pdp.basePrice,
    volume: MilebiolabState.pdp.selectedVolume,
    qty: MilebiolabState.pdp.qty,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80'
  });
}

/* ==========================================================================
   9. VERONA LOCAL PICKUP MODAL & POSTAL CHECK
   ========================================================================== */
function openVeronaModal() {
  const modal = document.getElementById('verona-modal-overlay');
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeVeronaModal() {
  const modal = document.getElementById('verona-modal-overlay');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function checkVeronaCap() {
  const capInput = document.getElementById('postal-code-input');
  const resultMsg = document.getElementById('postal-result-msg');
  if (!capInput || !resultMsg) return;

  const val = capInput.value.trim();
  if (val.startsWith('37')) {
    resultMsg.className = 'postal-msg-success';
    resultMsg.textContent = `✅ Ritiro all'Istituto di Verona confermato: pronto in 2 ore per il CAP ${val} (Corso Cavour 18).`;
  } else {
    resultMsg.className = 'postal-msg-success';
    resultMsg.textContent = `📍 Il tuo CAP ${val} è fuori provincia di Verona. Puoi comunque ritirare in sede o richiedere la spedizione espressa in 24/48h.`;
  }
}

/* ==========================================================================
   10. SMOOTH ACCORDION COMPONENT
   ========================================================================== */
function toggleAccordion(button) {
  const item = button.closest('.accordion-item');
  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  button.setAttribute('aria-expanded', !isExpanded);
  item.classList.toggle('active', !isExpanded);
}

/* ==========================================================================
   DOM READY INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Init Announcement Bar Carousel
  initAnnouncementCarousel();

  // 2. Init Before/After slider
  initBeforeAfterSlider();

  // 3. Render Cart Drawer initial state & Sync with Shopify AJAX Cart API
  fetchShopifyCart();

  // 4. Cart drawer toggle buttons
  const openCartBtn = document.getElementById('open-cart-btn');
  if (openCartBtn) openCartBtn.addEventListener('click', openCartDrawer);

  const closeCartBtn = document.querySelector('.btn-drawer-close');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

  // 5. Verona modal listeners
  const closeVeronaBtn = document.querySelector('.modal-close-btn');
  const veronaOverlay = document.getElementById('verona-modal-overlay');
  if (closeVeronaBtn) closeVeronaBtn.addEventListener('click', closeVeronaModal);
  if (veronaOverlay) {
    veronaOverlay.addEventListener('click', (e) => {
      if (e.target === veronaOverlay) closeVeronaModal();
    });
  }

  // 6. Sticky ATC Observer on scroll past PDP purchase area
  const mainAtc = document.getElementById('main-add-to-cart');
  const stickyBar = document.getElementById('product-sticky-bar');

  if (mainAtc && stickyBar) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          stickyBar.classList.add('visible');
          stickyBar.setAttribute('aria-hidden', 'false');
        } else {
          stickyBar.classList.remove('visible');
          stickyBar.setAttribute('aria-hidden', 'true');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(mainAtc);
  }

  // 7. Open first accordion by default
  const firstAccordion = document.querySelector('.accordion-item');
  if (firstAccordion) {
    firstAccordion.classList.add('active');
    const btn = firstAccordion.querySelector('.accordion-header');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }

  // 8. Predictive search input listener
  const searchInput = document.getElementById('search-predictive-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterSearch(e.target.value);
    });
  }

  // 9. Initialize Mile Advanced Extensions
  initCountdownTimer();
  initWishlist();
});

/**
 * ============================================================================
 * MILE EXTENSION FUNCTIONS (12 FEATURES)
 * ============================================================================
 */

// FEATURE 1: UGC Gallery Horizontal Scroll
function scrollUgcGallery(direction) {
  const track = document.getElementById('ugc-gallery-track');
  if (!track) return;
  const scrollAmount = 300 * direction;
  track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

// FEATURE 3: Catalog Filter by Skin Concern
function filterCatalogByConcern(concern, button) {
  const buttons = document.querySelectorAll('.catalog-tab-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });
  if (button) {
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
  }

  const cards = document.querySelectorAll('#catalog-products-grid .product-card-luxury');
  cards.forEach(card => {
    const cardConcerns = (card.getAttribute('data-concerns') || '').split(' ');
    if (concern === 'all' || cardConcerns.includes(concern)) {
      card.classList.remove('hidden-by-filter');
      card.style.opacity = '0';
      card.style.transform = 'scale(0.96)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 20);
    } else {
      card.classList.add('hidden-by-filter');
    }
  });
}

// FEATURE 4: Before / After Interactive Hotspots
function toggleBaHotspot(id, event) {
  if (event) event.stopPropagation();
  const pin1 = document.getElementById('ba-pin-1');
  const pin2 = document.getElementById('ba-pin-2');

  if (id === 1) {
    if (pin1) pin1.classList.toggle('active');
    if (pin2) pin2.classList.remove('active');
  } else if (id === 2) {
    if (pin2) pin2.classList.toggle('active');
    if (pin1) pin1.classList.remove('active');
  }
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.ba-hotspot-pin')) {
    const p1 = document.getElementById('ba-pin-1');
    const p2 = document.getElementById('ba-pin-2');
    if (p1) p1.classList.remove('active');
    if (p2) p2.classList.remove('active');
  }
});

function addDualProtocolToCart() {
  addToCart({
    id: 'ba-serum-88',
    title: 'Siero Hyaluron 5 Pesi (Protocollo Prima/Dopo)',
    step: 'STEP 02: BOOSTER ATTIVO',
    price: 88.00,
    volume: '30 ml',
    qty: 1,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80'
  });
  addToCart({
    id: 'ba-cream-115',
    title: 'Crema Rigenerante Supreme (Protocollo Prima/Dopo)',
    step: 'STEP 03: TRATTAMENTO BARRIERA',
    price: 115.00,
    volume: '50 ml',
    qty: 1,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80'
  });
  openCartDrawer();
  showToast('Protocollo Clinico Duo (€203,00) aggiunto al carrello! ✨');
}

// FEATURE 5: Countdown Timer in PDP
let countdownInterval = null;
function initCountdownTimer() {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minEl = document.getElementById('countdown-minutes');
  const secEl = document.getElementById('countdown-seconds');

  if (!daysEl || !hoursEl || !minEl || !secEl) return;

  let totalSeconds = 2 * 86400 + 14 * 3600 + 35 * 60 + 12;

  function updateDisplay() {
    if (totalSeconds <= 0) {
      clearInterval(countdownInterval);
      totalSeconds = 0;
    }
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    daysEl.textContent = String(d).padStart(2, '0');
    hoursEl.textContent = String(h).padStart(2, '0');
    minEl.textContent = String(m).padStart(2, '0');
    secEl.textContent = String(s).padStart(2, '0');

    totalSeconds--;
  }

  updateDisplay();
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(updateDisplay, 1000);
}

// FEATURE 6: Complementary Products Slider in PDP
function addComplementaryItem(name, price, img, vol, button) {
  addToCart({
    id: 'comp-' + name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    title: name,
    step: 'COMPLEMENTARE PDP',
    price: price,
    volume: vol,
    qty: 1,
    image: img
  });

  if (button) {
    const originalText = button.textContent;
    button.textContent = '✓ Aggiunto';
    button.style.background = '#2E7D32';
    button.style.color = '#FFFFFF';
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
      button.style.color = '';
    }, 1800);
  }

  showToast(`${name} aggiunto al carrello!`);
}

// FEATURE 9: Social Sharing & Toast Notification
function copyProductLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    const label = document.getElementById('copy-link-text');
    if (label) label.textContent = '✓ Copiato!';
    showToast('Link al rituale copiato negli appunti! 📋');
    setTimeout(() => {
      if (label) label.textContent = 'Copia Link';
    }, 2000);
  }).catch(() => {
    showToast('Link pronto per essere condiviso!');
  });
}

function showToast(message) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `<span>❖</span> <span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}

// FEATURE 11: Integrated Wishlist System with LocalStorage
function initWishlist() {
  try {
    const saved = localStorage.getItem('milebiolab_wishlist');
    if (saved) {
      MilebiolabState.wishlist = JSON.parse(saved);
    }
  } catch (e) {
    MilebiolabState.wishlist = [];
  }
  updateWishlistUI();
}

function saveWishlist() {
  try {
    localStorage.setItem('milebiolab_wishlist', JSON.stringify(MilebiolabState.wishlist));
  } catch (e) {}
  updateWishlistUI();
}

function updateWishlistUI() {
  const counter = document.getElementById('wishlist-counter');
  const titleCount = document.getElementById('wishlist-title-count');
  const count = MilebiolabState.wishlist.length;

  if (counter) counter.textContent = count;
  if (titleCount) titleCount.textContent = `(${count})`;

  // Update product card heart states
  document.querySelectorAll('.card-wishlist-btn').forEach(btn => {
    const card = btn.closest('[data-product-id]');
    if (card) {
      const pid = card.getAttribute('data-product-id');
      const exists = MilebiolabState.wishlist.some(item => item.id === pid);
      if (exists) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });

  // Update PDP heart state
  const pdpBtn = document.getElementById('pdpWishlistBtn');
  if (pdpBtn) {
    const exists = MilebiolabState.wishlist.some(item => item.id === 'supreme-cream-pdp');
    if (exists) {
      pdpBtn.classList.add('active');
      const t = pdpBtn.querySelector('.pdp-wishlist-text');
      if (t) t.textContent = 'Nei Preferiti ♥';
    } else {
      pdpBtn.classList.remove('active');
      const t = pdpBtn.querySelector('.pdp-wishlist-text');
      if (t) t.textContent = 'Salva nei Preferiti';
    }
  }

  renderWishlistDrawer();
}

function toggleWishlistItem(id, title, price, image, volume, btn) {
  const idx = MilebiolabState.wishlist.findIndex(item => item.id === id);
  if (idx > -1) {
    MilebiolabState.wishlist.splice(idx, 1);
    if (btn) btn.classList.remove('active');
    showToast(`Rimosso dai preferiti: ${title}`);
  } else {
    MilebiolabState.wishlist.push({ id, title, price, image, volume });
    if (btn) btn.classList.add('active');
    showToast(`Aggiunto ai tuoi preferiti: ${title} ❤️`);
  }
  saveWishlist();
}

function togglePdpWishlist(btn) {
  toggleWishlistItem(
    'supreme-cream-pdp',
    'Supreme Moisture & Cellular Repair Cream',
    84.00,
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80',
    MilebiolabState.pdp.selectedVolume || '50 ml',
    btn
  );
}

function openWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer');
  const overlay = document.getElementById('wishlist-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer');
  const overlay = document.getElementById('wishlist-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function openAccountDrawer() {
  const drawer = document.getElementById('account-drawer');
  const overlay = document.getElementById('account-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeAccountDrawer() {
  const drawer = document.getElementById('account-drawer');
  const overlay = document.getElementById('account-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

window.openAccountDrawer = openAccountDrawer;
window.closeAccountDrawer = closeAccountDrawer;

function renderWishlistDrawer() {
  const list = document.getElementById('wishlist-drawer-items-list');
  if (!list) return;

  if (MilebiolabState.wishlist.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--color-text-secondary);">
        <span style="font-size: 2.2rem; display: block; margin-bottom: 0.75rem; opacity: 0.6;">♡</span>
        <h5 style="font-size: 1.1rem; color: var(--color-text-primary); margin-bottom: 0.5rem;">La tua lista desideri è vuota</h5>
        <p style="font-size: 0.8rem; line-height: 1.5;">Esplora i rituali botanici Milebiolab e tocca il cuore per salvare le tue formulazioni preferite.</p>
        <button type="button" class="btn-primary" style="margin-top: 1.25rem; font-size: 0.74rem;" onclick="closeWishlistDrawer()">Esplora il Catalogo &rarr;</button>
      </div>
    `;
    return;
  }

  list.innerHTML = MilebiolabState.wishlist.map(item => `
    <div class="wishlist-item-card">
      <img src="${item.image}" alt="${item.title}" class="wishlist-item-thumb">
      <div class="wishlist-item-info">
        <h5 class="wishlist-item-name">${item.title}</h5>
        <div class="wishlist-item-price">€ ${item.price.toFixed(2).replace('.', ',')} <span style="font-size: 0.7rem; font-weight: 400; color: #8C867D;">(${item.volume || 'Standard'})</span></div>
      </div>
      <div class="wishlist-item-actions">
        <button type="button" class="btn-wishlist-cart" onclick="addWishlistItemToCart('${item.id}')" title="Sposta nel carrello">+ Carrello</button>
        <button type="button" class="btn-wishlist-remove" onclick="removeWishlistItem('${item.id}')" title="Rimuovi">&times;</button>
      </div>
    </div>
  `).join('');
}

function removeWishlistItem(id) {
  const idx = MilebiolabState.wishlist.findIndex(item => item.id === id);
  if (idx > -1) {
    const item = MilebiolabState.wishlist[idx];
    MilebiolabState.wishlist.splice(idx, 1);
    saveWishlist();
    showToast(`Rimosso: ${item.title}`);
  }
}

function addWishlistItemToCart(id) {
  const item = MilebiolabState.wishlist.find(i => i.id === id);
  if (item) {
    addToCart({
      id: item.id,
      title: item.title,
      step: 'PREFERITI WISHLIST',
      price: item.price,
      volume: item.volume || 'Standard',
      qty: 1,
      image: item.image
    });
    removeWishlistItem(id);
    closeWishlistDrawer();
    openCartDrawer();
  }
}

function addAllWishlistToCart() {
  if (MilebiolabState.wishlist.length === 0) return;
  MilebiolabState.wishlist.forEach(item => {
    addToCart({
      id: item.id,
      title: item.title,
      step: 'PREFERITI WISHLIST',
      price: item.price,
      volume: item.volume || 'Standard',
      qty: 1,
      image: item.image
    });
  });
  MilebiolabState.wishlist = [];
  saveWishlist();
  closeWishlistDrawer();
  openCartDrawer();
  showToast('Tutti i preferiti sono stati trasferiti nel carrello! ✨');
}

function clearWishlist() {
  MilebiolabState.wishlist = [];
  saveWishlist();
  showToast('Lista preferiti svuotata');
}

// FEATURE 12: In-Drawer Upsells
function addInDrawerUpsell(title, price, image, vol, button) {
  addToCart({
    id: 'upsell-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    title: title,
    step: 'TRAVEL SIZE UPSELL',
    price: price,
    volume: vol,
    qty: 1,
    image: image
  });

  if (button) {
    const orig = button.textContent;
    button.textContent = '✓ Aggiunto';
    button.style.background = '#2E7D32';
    button.style.color = '#FFFFFF';
    setTimeout(() => {
      button.textContent = orig;
      button.style.background = '';
      button.style.color = '';
    }, 1800);
  }

  showToast(`Aggiunto travel-size: ${title}!`);
}

/* Product Description Accordion Parser */
function renderAccordionDescription(container) {
    if (!container) return;
    const raw = container.querySelector('.raw-description');
    const rendered = container.querySelector('.rendered-description');
    if (!raw || !rendered || raw.dataset.parsed) return;
    
    // Mark as parsed immediately
    raw.dataset.parsed = 'true';

    let html = raw.innerHTML;
    // Replace <p> and <div> with <br> to normalize all block boundaries to <br>
    html = html.replace(/<\/?(p|div)[^>]*>/gi, '<br>');
    
    // Split by <br> (and variants)
    const lines = html.split(/<br\s*\/?>/gi);

    let htmlOut = '';
    let currentAccordion = null;

    lines.forEach(line => {
        let trimmed = line.trim();
        if (!trimmed) return;

        let temp = document.createElement('div');
        temp.innerHTML = trimmed;
        
        // Skip empty lines unless they contain an image or iframe
        if (temp.textContent.trim() === '' && !temp.querySelector('img, iframe, video')) return;

        let isHeading = false;
        let headingText = '';

        // Check if the line is purely a heading (H2-H5)
        const headings = temp.querySelectorAll('h2, h3, h4, h5');
        if (headings.length === 1 && headings[0].textContent.replace(/\s+/g, '') === temp.textContent.replace(/\s+/g, '')) {
            isHeading = true;
            headingText = temp.textContent.trim();
        } else {
            // Check if the line is purely bold text
            const strongs = temp.querySelectorAll('strong, b');
            if (strongs.length > 0) {
                let strongText = Array.from(strongs).map(s => s.textContent).join('').replace(/\s+/g, '');
                let allText = temp.textContent.replace(/\s+/g, '');
                
                // If bold text covers the entire line (ignoring spaces/spans) and is > 3 chars
                if (strongText === allText && allText.length > 3) {
                    isHeading = true;
                    headingText = temp.textContent.trim();
                }
            }
        }

        if (isHeading) {
            if (currentAccordion !== null) {
                htmlOut += currentAccordion + '</div></details>';
            }
            currentAccordion = '';
            htmlOut += `
            <details class="group border-b border-[#E5E0D8]">
                <summary class="flex justify-between items-center cursor-pointer py-3 text-[11px] uppercase tracking-widest font-semibold text-ink list-none [&::-webkit-details-marker]:hidden">
                    ${headingText}
                    <span class="text-lg font-light transition-transform duration-300 group-open:rotate-45">&plus;</span>
                </summary>
                <div class="pt-2 pb-3 text-[11px] text-[#7A7265] leading-relaxed space-y-2">
            `;
        } else {
            // Add margin-bottom to emulate paragraphs
            let textHtml = '<div class="mb-2">' + trimmed + '</div>';
            if (currentAccordion !== null) {
                currentAccordion += textHtml;
            } else {
                htmlOut += textHtml;
            }
        }
    });

    if (currentAccordion !== null) {
        htmlOut += currentAccordion + '</div></details>';
    }

    if (htmlOut.trim() !== '') {
        rendered.innerHTML = htmlOut;
        raw.style.display = 'none';
    }
}

// ============================================================================
// 11. SEAMLESS CUSTOMER AUTHENTICATION & ACCOUNT DRAWER STATE MANAGEMENT
// ============================================================================

function renderCustomerAuthState() {
  try {
    const rawCustomer = localStorage.getItem('mile_customer');
    if (!rawCustomer) return;
    const customer = JSON.parse(rawCustomer);
    if (!customer || !customer.first_name) return;

    // 1. Update Header Greeting
    const headerGreeting = document.getElementById('header-customer-greeting');
    const headerIndicator = document.getElementById('header-customer-indicator');
    if (headerGreeting) {
      headerGreeting.innerText = '🟢 Ciao, ' + customer.first_name;
    }
    if (headerIndicator) {
      headerIndicator.classList.remove('hidden');
    }

    // 2. Update Mobile Menu Greeting
    const mobileGreeting = document.getElementById('mobile-menu-customer-greeting');
    if (mobileGreeting) {
      mobileGreeting.innerText = '🟢 Ciao, ' + customer.first_name + ' (Profilo)';
    }

    // 3. Update Account Drawer Views (Switch from Guest View to Logged In Profile View)
    const loggedInView = document.getElementById('DrawerCustomerLoggedInView');
    const guestView = document.getElementById('DrawerCustomerGuestView');
    
    if (loggedInView && guestView) {
      loggedInView.classList.remove('hidden');
      loggedInView.classList.add('flex');
      guestView.classList.remove('flex');
      guestView.classList.add('hidden');
    }

    // 4. Update Drawer Profile Details
    const nameEl = document.getElementById('DrawerCustomerGreetingName');
    const emailEl = document.getElementById('DrawerCustomerEmail');
    const avatarEl = document.getElementById('DrawerCustomerAvatar');

    if (nameEl) nameEl.innerText = customer.first_name;
    if (emailEl) emailEl.innerText = customer.email || 'Club Mile Member';
    if (avatarEl) {
      const initials = (customer.first_name.charAt(0) + (customer.last_name ? customer.last_name.charAt(0) : '')).toUpperCase();
      avatarEl.innerText = initials || 'MC';
    }

    // 5. Update Full Page Account View (if on /pages/account or /account)
    const pageLoggedInView = document.getElementById('PageAccountLoggedInView');
    const pageGuestView = document.getElementById('PageAccountGuestView');
    if (pageLoggedInView && pageGuestView) {
      pageLoggedInView.classList.remove('hidden');
      pageLoggedInView.classList.add('block');
      pageGuestView.classList.remove('block');
      pageGuestView.classList.add('hidden');
    }

    const pageGreetingName = document.getElementById('PageAccountGreetingName');
    const pageEmail = document.getElementById('PageAccountEmail');
    const pageAvatar = document.getElementById('PageAccountAvatar');

    if (pageGreetingName) pageGreetingName.innerText = customer.first_name;
    if (pageEmail) pageEmail.innerText = customer.email || 'member@milebiolab.it';
    if (pageAvatar) {
      const initials = (customer.first_name.charAt(0) + (customer.last_name ? customer.last_name.charAt(0) : '')).toUpperCase();
      pageAvatar.innerText = initials || 'MC';
    }
  } catch (err) {
    console.error('Error rendering customer auth state:', err);
  }
}

function logoutCustomerSession() {
  try {
    localStorage.removeItem('mile_customer');
  } catch (err) {}
  
  // Redirect to Shopify logout or root
  window.location.href = '/account/logout';
}

// Expose globally
window.renderCustomerAuthState = renderCustomerAuthState;
window.logoutCustomerSession = logoutCustomerSession;

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderCustomerAuthState();
});

// Also run immediately
renderCustomerAuthState();

