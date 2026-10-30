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
      title: 'Crema Riparatrice Cellulare Suprema',
      step: 'STEP 03: TRATTAMENTO BARRIERA',
      price: 84.00,
      volume: '50 ml',
      qty: 1,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'pdp-serum',
      title: "Siero Concentrato all'Acido Ialuronico Puro",
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
      title: 'Latte Detergente & Tonico Quotidiano',
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
      title: "Siero Concentrato all'Acido Ialuronico Puro",
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
      title: 'Crema Riparatrice Cellulare Suprema',
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
      title: 'Contorno Occhi & Labbra Giovinezza Cellulare',
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
        const localCompareMap = (() => {
          try {
            return JSON.parse(localStorage.getItem('mile_variant_compare_prices') || '{}');
          } catch(e) { return {}; }
        })();
        window.mileComparePrices = Object.assign({}, localCompareMap, window.mileComparePrices || {});

        MilebiolabState.cart = data.items.map(item => {
          const itemId = item.id || item.variant_id;
          const isBundle = item.properties && (
            item.properties['_bundle'] === 'routine_15' ||
            item.properties['bundle'] === 'routine_15' ||
            item.properties['_bundle_discount'] === '15%'
          );

          const rawPrice = item.price / 100;
          let finalPrice = rawPrice;

          // Lookup compare_at_price
          let compPrice = (item.compare_at_price ? (item.compare_at_price / 100) : 0) ||
                          (item.properties && item.properties['_compare_at_price'] ? parseFloat(item.properties['_compare_at_price']) : 0) ||
                          (window.mileComparePrices && window.mileComparePrices[itemId] ? parseFloat(window.mileComparePrices[itemId]) : 0) ||
                          (item.original_price > item.price ? (item.original_price / 100) : 0);

          if (isBundle) {
            compPrice = compPrice > rawPrice ? compPrice : rawPrice;
            finalPrice = Math.round(rawPrice * 0.85 * 100) / 100;
          }

          if (compPrice > finalPrice) {
            window.mileComparePrices[itemId] = compPrice;
          }

          return {
            id: itemId,
            key: item.key,
            title: translateProductTitleToItalian(item.product_title || item.title),
            step: (item.properties && item.properties['step']) || (isBundle ? 'ROUTINE COMPLETA (-15%)' : 'RITUALE BOTANICO'),
            price: finalPrice,
            compare_at_price: compPrice > finalPrice ? compPrice : 0,
            volume: item.variant_title || 'Formato Originale',
            qty: item.quantity,
            image: item.featured_image ? (item.featured_image.url || item.featured_image) : (item.image || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80'),
            properties: item.properties || {},
            is_bundle: isBundle
          };
        });

        try {
          localStorage.setItem('mile_variant_compare_prices', JSON.stringify(window.mileComparePrices));
        } catch(e) {}
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
  const cleanId = (variantId && variantId !== 'undefined' && variantId !== 'null') ? String(variantId).trim() : '';

  const addDirectToLocalCart = () => {
    const fallbackItem = {
      id: cleanId || Date.now(),
      title: (itemData && itemData.title) ? translateProductTitleToItalian(itemData.title) : 'Prodotto MileBioLab',
      price: (itemData && typeof itemData.price === 'number') ? itemData.price : (parseFloat(itemData && itemData.price) || 75.00),
      compare_at_price: (itemData && itemData.compare_at_price) ? parseFloat(itemData.compare_at_price) : 0,
      volume: (itemData && itemData.volume) || '50 ml',
      step: (itemData && itemData.step) || 'RITUALE BOTANICO',
      qty: qty || 1,
      image: (itemData && itemData.image) || '',
      properties: (itemData && itemData.properties) || {},
      is_bundle: (itemData && itemData.is_bundle) || false
    };
    const existing = MilebiolabState.cart.find(i => i.id == fallbackItem.id || (fallbackItem.title && i.title === fallbackItem.title));
    if (existing) {
      existing.qty += (qty || 1);
    } else {
      MilebiolabState.cart.push(fallbackItem);
    }
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(MilebiolabState.cart));
    } catch (e) {}
    renderCartDrawer();
    openCartDrawer();
    return false;
  };

  if (cleanId && !isNaN(Number(cleanId)) && Number(cleanId) > 100) {
    try {
      const payload = {
        id: Number(cleanId),
        quantity: qty || 1
      };
      if (itemData && itemData.properties) {
        payload.properties = itemData.properties;
      }
      if (itemData && itemData.compare_at_price) {
        const cVal = parseFloat(itemData.compare_at_price);
        if (cVal > (itemData.price || 0)) {
          if (!payload.properties) payload.properties = {};
          if (!payload.properties['_compare_at_price']) {
            payload.properties['_compare_at_price'] = cVal.toFixed(2);
          }
          window.mileComparePrices = window.mileComparePrices || {};
          window.mileComparePrices[cleanId] = cVal;
          try {
            const map = JSON.parse(localStorage.getItem('mile_variant_compare_prices') || '{}');
            map[cleanId] = cVal;
            localStorage.setItem('mile_variant_compare_prices', JSON.stringify(map));
          } catch(e) {}
        }
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
      console.warn('Shopify Cart API add failed or offline, adding directly to local cart without recursion:', err);
      return addDirectToLocalCart();
    }
  } else {
    return addDirectToLocalCart();
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
window.addToCart = addToCart;

function renderCartDrawer() {
  const isShippingBarHidden = (typeof window !== 'undefined' && window.mileHideShippingBar === true) ||
                              (typeof localStorage !== 'undefined' && localStorage.getItem('mile_hide_shipping_bar') === 'true');
  const drawerBarEl = document.getElementById('drawer-shipping-bar') || document.querySelector('.shipping-bar-container');
  if (drawerBarEl) {
    if (isShippingBarHidden) {
      drawerBarEl.style.display = 'none';
    } else if (drawerBarEl.style.display === 'none' && !window.mileHideShippingBar) {
      drawerBarEl.style.display = '';
    }
  }

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

      const isDiscounted = (item.compare_at_price && item.compare_at_price > item.price) ||
                           (item.original_price && item.original_price > item.price) ||
                           (item.compare_price && item.compare_price > item.price);

      const compareVal = item.compare_at_price || item.original_price || item.compare_price || 0;

      let priceHtml = '';
      if (isDiscounted && compareVal > item.price) {
        priceHtml = `
          <div class="cart-item-price flex items-baseline gap-2">
            <span class="cart-item-current-price font-semibold text-[#1A1A1A]">€ ${item.price.toFixed(2).replace('.', ',')}</span>
            <span class="cart-item-compare-price text-xs text-[#7A7265] line-through font-normal">€ ${compareVal.toFixed(2).replace('.', ',')}</span>
            ${item.is_bundle ? '<span class="text-[10px] bg-[#5C6B56]/10 text-[#5C6B56] px-1.5 py-0.5 rounded font-mono font-medium">-15% Routine</span>' : ''}
          </div>
        `;
      } else {
        priceHtml = `
          <div class="cart-item-price">
            <span class="cart-item-current-price font-semibold text-[#1A1A1A]">€ ${item.price.toFixed(2).replace('.', ',')}</span>
          </div>
        `;
      }

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-details">
          <span class="cart-item-step">${item.step || 'RITUALE BOTANICO'}</span>
          <h4 class="cart-item-title">${translateProductTitleToItalian(item.title)}</h4>
          ${priceHtml}
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

  // Update checkout buttons with discount if routine bundle is present
  const hasBundleItem = MilebiolabState.cart.some(item =>
    item.is_bundle ||
    (item.properties && item.properties['_bundle'] === 'routine_15') ||
    (item.id && String(item.id).indexOf('bundle') !== -1)
  );
  const bundleDiscountCode = window.mileBundleDiscountCode ||
                             localStorage.getItem('mile_bundle_discount_code') ||
                             'ROUTINE15';

  const checkoutBtn = document.getElementById('cart-drawer-checkout-btn');
  if (checkoutBtn) {
    if (hasBundleItem) {
      checkoutBtn.setAttribute('href', `/checkout?discount=${encodeURIComponent(bundleDiscountCode)}`);
    } else {
      checkoutBtn.setAttribute('href', '/checkout');
    }
  }

  const pageCheckoutBtn = document.getElementById('cart-page-checkout-btn');
  if (pageCheckoutBtn) {
    if (hasBundleItem) {
      pageCheckoutBtn.setAttribute('href', `/checkout?discount=${encodeURIComponent(bundleDiscountCode)}`);
    } else {
      pageCheckoutBtn.setAttribute('href', '/checkout');
    }
  }
}

function openCartDrawer() {
  const isShippingBarHidden = (typeof window !== 'undefined' && window.mileHideShippingBar === true) ||
                              (typeof localStorage !== 'undefined' && localStorage.getItem('mile_hide_shipping_bar') === 'true');
  const drawerBarEl = document.getElementById('drawer-shipping-bar') || document.querySelector('.shipping-bar-container');
  if (drawerBarEl) {
    if (isShippingBarHidden) {
      drawerBarEl.style.display = 'none';
    } else if (drawerBarEl.style.display === 'none' && !window.mileHideShippingBar) {
      drawerBarEl.style.display = '';
    }
  }

  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (overlay && drawer) {
    overlay.classList.add('active');
    drawer.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-drawer-open');
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
    document.body.classList.remove('cart-drawer-open');
    document.body.style.overflow = '';
  }
}

window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;

function addToCart(itemOrId, maybeTitle, maybePrice, maybeImage, maybeVolume, maybeStep) {
  let item;
  if (itemOrId && typeof itemOrId === 'object') {
    item = Object.assign({}, itemOrId);
  } else {
    item = {
      id: itemOrId,
      title: maybeTitle || 'Prodotto MileBioLab',
      price: (typeof maybePrice === 'number') ? maybePrice : (parseFloat(maybePrice) || 75.00),
      image: maybeImage || '',
      volume: maybeVolume || '50 ml',
      step: maybeStep || 'RITUALE BOTANICO',
      qty: 1
    };
  }

  if (item && item.title) {
    item.title = translateProductTitleToItalian(item.title);
  }

  // If item has a valid numeric Shopify variant ID (> 100), delegate to addShopifyCartItem
  if (item && item.id && (!isNaN(Number(item.id)) && Number(item.id) > 100)) {
    addShopifyCartItem(item.id, item.qty || 1, item);
    return;
  }

  const targetId = item.id || Date.now();
  const existing = MilebiolabState.cart.find(i => i.id == targetId || (item.title && i.title === item.title));
  if (existing) {
    existing.qty += (item.qty || 1);
  } else {
    MilebiolabState.cart.push({
      id: targetId,
      title: item.title || 'Prodotto MileBioLab',
      step: item.step || 'RITUALE BOTANICO',
      price: (typeof item.price === 'number') ? item.price : (parseFloat(item.price) || 75.00),
      volume: item.volume || '50 ml',
      qty: item.qty || 1,
      image: item.image || ''
    });
  }
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(MilebiolabState.cart));
  } catch (e) {}
  renderCartDrawer();
  openCartDrawer();
}

window.addToCart = addToCart;

function quickAddProduct(btn, event) {
  if (event) {
    if (typeof event.preventDefault === 'function') event.preventDefault();
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
  }
  if (!btn) return;

  const variantId = btn.getAttribute('data-variant-id') || btn.dataset.variantId || '';
  const title = btn.getAttribute('data-product-title') || btn.dataset.productTitle || 'Prodotto MileBioLab';
  const price = parseFloat(btn.getAttribute('data-product-price') || btn.dataset.productPrice) || 75.00;
  const volume = btn.getAttribute('data-product-volume') || btn.dataset.productVolume || '50 ml';
  const image = btn.getAttribute('data-product-image') || btn.dataset.productImage || '';
  const step = btn.getAttribute('data-product-step') || btn.dataset.productStep || 'RITUALE BOTANICO';
  const comparePrice = parseFloat(btn.getAttribute('data-product-compare-price') || btn.dataset.productComparePrice) || 0;

  const itemData = {
    id: variantId,
    title: title,
    price: price,
    compare_at_price: comparePrice > price ? comparePrice : 0,
    volume: volume,
    step: step,
    qty: 1,
    image: image
  };

  // Feedback visivo immediato sul pulsante
  const originalHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span>✓ Aggiunto</span>';
  btn.style.transition = 'all 0.25s ease';
  const originalBg = btn.style.backgroundColor;
  const originalColor = btn.style.color;
  btn.style.backgroundColor = '#5C6B56';
  btn.style.color = '#FFFFFF';

  setTimeout(() => {
    btn.innerHTML = originalHtml;
    btn.style.backgroundColor = originalBg;
    btn.style.color = originalColor;
    btn.disabled = false;
  }, 1400);

  if (window.addShopifyCartItem) {
    window.addShopifyCartItem(variantId, 1, itemData);
  } else if (window.addToCart) {
    window.addToCart(itemData);
  }
}
window.quickAddProduct = quickAddProduct;

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
  const discountCode = window.mileBundleDiscountCode || localStorage.getItem('mile_bundle_discount_code') || 'ROUTINE15';
  try {
    localStorage.setItem('mile_bundle_discount_code', discountCode);
    fetch('/discount/' + encodeURIComponent(discountCode));
  } catch(e) {}

  addToCart({
    id: 'bundle-01-reset',
    title: 'Latte Detergente & Tonico Quotidiano',
    step: '01 PURIFICAZIONE • ROUTINE COMPLETA (-15%)',
    price: 32.30, // 38 - 15%
    compare_at_price: 38.00,
    volume: '200 ml',
    qty: 1,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=200&q=80',
    is_bundle: true,
    properties: {
      '_bundle': 'routine_15',
      '_bundle_discount': '15%',
      '_compare_at_price': '38.00'
    }
  });
  addToCart({
    id: 'bundle-02-concentrate',
    title: "Siero Concentrato all'Acido Ialuronico Puro",
    step: '02 CONCENTRATO • ROUTINE COMPLETA (-15%)',
    price: 73.10, // 86 - 15%
    compare_at_price: 86.00,
    volume: '30 ml',
    qty: 1,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80',
    is_bundle: true,
    properties: {
      '_bundle': 'routine_15',
      '_bundle_discount': '15%',
      '_compare_at_price': '86.00'
    }
  });
  addToCart({
    id: 'bundle-03-hydrate',
    title: 'Crema Riparatrice Cellulare Suprema',
    step: '03 IDRATAZIONE • ROUTINE COMPLETA (-15%)',
    price: 71.40, // 84 - 15%
    compare_at_price: 84.00,
    volume: '50 ml',
    qty: 1,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80',
    is_bundle: true,
    properties: {
      '_bundle': 'routine_15',
      '_bundle_discount': '15%',
      '_compare_at_price': '84.00'
    }
  });
}

function addPdpCrossSellBundle() {
  // Bundle Serum + Cream (-15%)
  addToCart({
    id: 'duo-serum-hyaluronic',
    title: "Siero Concentrato all'Acido Ialuronico Puro (Duo Routine)",
    step: 'FASE 2 • DUO SPECIALE (-15%)',
    price: 73.10,
    volume: '30 ml',
    qty: 1,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80'
  });
  addToCart({
    id: 'duo-cream-supreme',
    title: 'Crema Riparatrice Cellulare Suprema (Duo Routine)',
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
    title: 'Crema Riparatrice Cellulare Suprema',
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
  // Deprecato: verifica CAP rimossa su richiesta cliente
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
      if (!Array.isArray(MilebiolabState.wishlist)) {
        MilebiolabState.wishlist = [];
      }
    } else {
      MilebiolabState.wishlist = [];
    }
  } catch (e) {
    MilebiolabState.wishlist = [];
  }
  updateWishlistUI();
}

function saveWishlist() {
  try {
    localStorage.setItem('milebiolab_wishlist', JSON.stringify(MilebiolabState.wishlist || []));
  } catch (e) {}
  updateWishlistUI();
}

function updateWishlistUI() {
  if (!Array.isArray(MilebiolabState.wishlist)) {
    MilebiolabState.wishlist = [];
  }
  const count = MilebiolabState.wishlist.length;

  const counter = document.getElementById('wishlist-counter');
  if (counter) counter.textContent = count;

  const headerCounter = document.getElementById('header-wishlist-counter');
  if (headerCounter) headerCounter.textContent = count;

  const titleCount = document.getElementById('wishlist-title-count');
  if (titleCount) titleCount.textContent = `(${count})`;

  document.querySelectorAll('.wishlist-counter-mobile').forEach(el => {
    el.textContent = count;
  });

  // Sincronizza lo stato del cuore PDP
  const pdpBtn = document.getElementById('wishlist-btn');
  const pdpSvg = document.getElementById('wishlist-svg');
  const pdpId = pdpBtn ? (pdpBtn.getAttribute('data-product-id') || pdpBtn.dataset.productId) : null;
  const isPdpInWishlist = pdpId ? MilebiolabState.wishlist.some(item => String(item.id) === String(pdpId)) : false;

  if (pdpSvg) {
    if (isPdpInWishlist) {
      pdpSvg.setAttribute('fill', 'currentColor');
      pdpSvg.classList.add('text-red-600');
      pdpSvg.classList.remove('text-black');
    } else {
      pdpSvg.setAttribute('fill', 'none');
      pdpSvg.classList.remove('text-red-600');
      pdpSvg.classList.add('text-black');
    }
  }

  // Sincronizza lo stato dei cuori sulle card catalogo (.card-wishlist-btn)
  document.querySelectorAll('.card-wishlist-btn').forEach(btn => {
    const wid = btn.getAttribute('data-wishlist-id') || (btn.closest('[data-product-id]') ? btn.closest('[data-product-id]').getAttribute('data-product-id') : null);
    const inWish = wid ? MilebiolabState.wishlist.some(item => String(item.id) === String(wid)) : false;
    const svg = btn.querySelector('svg');
    if (inWish) {
      btn.classList.add('active', 'text-red-600');
      btn.classList.remove('text-[#1A1A1A]');
      if (svg) svg.setAttribute('fill', 'currentColor');
    } else {
      btn.classList.remove('active', 'text-red-600');
      btn.classList.add('text-[#1A1A1A]');
      if (svg) svg.setAttribute('fill', 'none');
    }
  });

  renderWishlistDrawer();
}

function toggleWishlistItem(id, title, price, image, volume, btn) {
  if (id && typeof id === 'object' && id.nodeType === 1) {
    btn = id;
    id = btn.getAttribute('data-wishlist-id') || btn.dataset.wishlistId;
    title = btn.getAttribute('data-product-title') || btn.dataset.productTitle;
    price = btn.getAttribute('data-product-price') || btn.dataset.productPrice;
    image = btn.getAttribute('data-product-image') || btn.dataset.productImage;
    volume = btn.getAttribute('data-product-volume') || btn.dataset.productVolume;
  }

  const cleanId = String(id || '').trim();
  if (!cleanId) return;

  if (!Array.isArray(MilebiolabState.wishlist)) {
    MilebiolabState.wishlist = [];
  }

  const idx = MilebiolabState.wishlist.findIndex(item => String(item.id) === cleanId);
  if (idx > -1) {
    MilebiolabState.wishlist.splice(idx, 1);
    if (btn) {
      btn.classList.remove('active', 'text-red-600');
      btn.classList.add('text-[#1A1A1A]');
      const svg = btn.querySelector('svg');
      if (svg) svg.setAttribute('fill', 'none');
    }
    showToast('Rimosso dai preferiti: ' + (title || 'Prodotto'));
  } else {
    const parsedPrice = (typeof price === 'number') ? price : (parseFloat(price) || 0);
    MilebiolabState.wishlist.push({
      id: cleanId,
      title: title || 'Prodotto MileBioLab',
      price: parsedPrice,
      image: image || '',
      volume: volume || '50 ml'
    });
    if (btn) {
      btn.classList.add('active', 'text-red-600');
      btn.classList.remove('text-[#1A1A1A]');
      const svg = btn.querySelector('svg');
      if (svg) svg.setAttribute('fill', 'currentColor');
    }
    showToast('Aggiunto ai tuoi preferiti: ' + (title || 'Prodotto') + ' ❤️');
  }
  saveWishlist();
}

function toggleWishlistBtn(btn, event) {
  if (event) {
    if (typeof event.preventDefault === 'function') event.preventDefault();
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
  }
  if (!btn) return;
  const id = btn.getAttribute('data-wishlist-id') || btn.dataset.wishlistId;
  const title = btn.getAttribute('data-product-title') || btn.dataset.productTitle || 'Prodotto MileBioLab';
  const price = parseFloat(btn.getAttribute('data-product-price') || btn.dataset.productPrice) || 0;
  const image = btn.getAttribute('data-product-image') || btn.dataset.productImage || '';
  const volume = btn.getAttribute('data-product-volume') || btn.dataset.productVolume || '50 ml';
  toggleWishlistItem(id, title, price, image, volume, btn);
}

window.toggleWishlistBtn = toggleWishlistBtn;

function togglePdpWishlist(btn) {
  const targetBtn = btn || document.getElementById('wishlist-btn');
  if (!targetBtn) return;

  const id = targetBtn.getAttribute('data-product-id') || targetBtn.dataset.productId;
  const title = targetBtn.getAttribute('data-product-title') || targetBtn.dataset.productTitle || (document.querySelector('h1') ? document.querySelector('h1').textContent.trim() : 'Prodotto MileBioLab');
  const price = targetBtn.getAttribute('data-product-price') || targetBtn.dataset.productPrice || 84.00;
  const image = targetBtn.getAttribute('data-product-image') || targetBtn.dataset.productImage || '';
  const volume = (typeof currentFormatLabel !== 'undefined' && currentFormatLabel)
    ? currentFormatLabel
    : (MilebiolabState.pdp && MilebiolabState.pdp.selectedVolume ? MilebiolabState.pdp.selectedVolume : '50 ml');

  toggleWishlistItem(id, title, price, image, volume, targetBtn);
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

  if (!MilebiolabState.wishlist || MilebiolabState.wishlist.length === 0) {
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

  list.innerHTML = MilebiolabState.wishlist.map(item => {
    const formattedTitle = (typeof translateProductTitleToItalian === 'function')
      ? translateProductTitleToItalian(item.title)
      : (item.title || 'Prodotto MileBioLab');
    const numPrice = (typeof item.price === 'number') ? item.price : (parseFloat(item.price) || 0);
    const priceDisplay = numPrice.toFixed(2).replace('.', ',');
    const imgUrl = item.image || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80';

    return `
      <div class="wishlist-item-card">
        <img src="${imgUrl}" alt="${item.title || 'Prodotto Milebiolab'}" class="wishlist-item-thumb" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80'">
        <div class="wishlist-item-info">
          <h5 class="wishlist-item-name">${formattedTitle}</h5>
          <div class="wishlist-item-price">€ ${priceDisplay} <span style="font-size: 0.7rem; font-weight: 400; color: #8C867D;">(${item.volume || '50 ml'})</span></div>
        </div>
        <div class="wishlist-item-actions">
          <button type="button" class="btn-wishlist-cart" onclick="addWishlistItemToCart('${item.id}')" title="Sposta nel carrello">+ Carrello</button>
          <button type="button" class="btn-wishlist-remove" onclick="removeWishlistItem('${item.id}')" title="Rimuovi">&times;</button>
        </div>
      </div>
    `;
  }).join('');
}

function removeWishlistItem(id) {
  const cleanId = String(id || '').trim();
  const idx = MilebiolabState.wishlist.findIndex(item => String(item.id) === cleanId);
  if (idx > -1) {
    const item = MilebiolabState.wishlist[idx];
    MilebiolabState.wishlist.splice(idx, 1);
    saveWishlist();
    showToast(`Rimosso dai preferiti: ${item.title}`);
  }
}

function addWishlistItemToCart(id) {
  const cleanId = String(id || '').trim();
  const item = MilebiolabState.wishlist.find(i => String(i.id) === cleanId);
  if (item) {
    if (window.addShopifyCartItem) {
      addShopifyCartItem(item.id, 1, item);
    } else if (typeof addToCart === 'function') {
      addToCart({
        id: item.id,
        title: item.title,
        step: 'PREFERITI WISHLIST',
        price: item.price,
        volume: item.volume || '50 ml',
        qty: 1,
        image: item.image
      });
    }
    removeWishlistItem(id);
    closeWishlistDrawer();
    openCartDrawer();
  }
}

function addAllWishlistToCart() {
  if (!MilebiolabState.wishlist || MilebiolabState.wishlist.length === 0) return;
  MilebiolabState.wishlist.forEach(item => {
    if (window.addShopifyCartItem) {
      addShopifyCartItem(item.id, 1, item);
    } else if (typeof addToCart === 'function') {
      addToCart({
        id: item.id,
        title: item.title,
        step: 'PREFERITI WISHLIST',
        price: item.price,
        volume: item.volume || '50 ml',
        qty: 1,
        image: item.image
      });
    }
  });
  MilebiolabState.wishlist = [];
  saveWishlist();
  closeWishlistDrawer();
  openCartDrawer();
  showToast('Tutti i preferiti sono stati aggiunti al carrello! ✨');
}

function clearWishlist() {
  MilebiolabState.wishlist = [];
  saveWishlist();
  showToast('Lista preferiti svuotata');
}

// Window Wishlist API Exposure
window.toggleWishlistItem = toggleWishlistItem;
window.togglePdpWishlist = togglePdpWishlist;
window.openWishlistDrawer = openWishlistDrawer;
window.closeWishlistDrawer = closeWishlistDrawer;
window.removeWishlistItem = removeWishlistItem;
window.addWishlistItemToCart = addWishlistItemToCart;
window.addAllWishlistToCart = addAllWishlistToCart;
window.clearWishlist = clearWishlist;
window.updateWishlistUI = updateWishlistUI;

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

/* ============================================================================
   10. PRODUCT DESCRIPTION ACCORDION & NATURAL PERCENTAGE PARSER
   ============================================================================ */

function translateProductTitleToItalian(title) {
  if (!title || typeof title !== 'string') return title || '';
  return title.trim();
}
window.translateProductTitleToItalian = translateProductTitleToItalian;

function renderAccordionDescription(container) {
  if (!container) return;
  const raw = container.querySelector('.raw-description');
  const rendered = container.querySelector('.rendered-description');
  if (!raw || !rendered || raw.dataset.parsed === 'true') return;

  const rawHtml = raw.innerHTML.trim();
  if (!rawHtml) return;

  raw.dataset.parsed = 'true';

  // 1. Automatic Percentage & Actives Extraction -> Injection in White Boxes (Bullet Points)
  try {
    const textAll = raw.textContent || '';
    const htmlAll = raw.innerHTML || '';
    let naturalBadgeText = null;

    // 1. Naturality & Certification percentage detection (80% - 100%)
    const hasEcocert = /ecocert|cosmos/i.test(textAll) || /ecocert|cosmos/i.test(htmlAll);
    const natContextMatch = textAll.match(/(?:ECOCERT|COSMOS[A-Z\s\-–]*?)?\b(100(?:\.0+)?|[89]\d(?:[.,]\d+)?)\s*%\s*(?:d'origine\s+naturale|d'origine|naturale|natural|biologico|organico|secondo\s+lo\s+standard|standard|iso|formula|ingredienti)/i)
      || textAll.match(/(?:d'origine\s+naturale|naturale|natural|biologico|organico|standard|iso|formula|ingredienti)[\s\w\-–]{0,35}?\b(100(?:\.0+)?|[89]\d(?:[.,]\d+)?)\s*%/i)
      || textAll.match(/(?:ecocert|cosmos)[\s\w\-–]*?\b(100(?:\.0+)?|[89]\d(?:[.,]\d+)?)\s*%/i)
      || textAll.match(/\b(100(?:\.0+)?|[89]\d(?:[.,]\d+)?)\s*%/);

    if (natContextMatch && natContextMatch[1]) {
      const valNum = parseFloat(natContextMatch[1].replace(',', '.'));
      if (valNum >= 80 && valNum <= 100) {
        const p = `${natContextMatch[1].trim()}%`;
        if (hasEcocert) {
          naturalBadgeText = `${p} Naturale (Certificato ECOCERT COSMOS)`;
        } else {
          naturalBadgeText = `${p} d'Origine Naturale Certificata`;
        }
      }
    } else if (hasEcocert) {
      naturalBadgeText = '100% Naturale (Certificato ECOCERT COSMOS)';
    }

    // 2. Cosmetic Active Ingredients Filtering (Concentration 0.1% - 30%, Allowlist & Blocklist)
    const VALID_ACTIVES = [
      'acido ialuronico', 'hyaluronic', 'niacinamide', 'vitamina c', 'vitamin c',
      'ascorbico', 'vitamina e', 'tocoferolo', 'retinolo', 'retinol', 'bio-retinolo',
      'bakuchiol', 'acido salicilico', 'salicylic', 'bha', 'acido glicolico',
      'glycolic', 'aha', 'acido lattico', 'lactic', 'acido azelaico', 'azelaic',
      'acido ferulico', 'ferulic', 'peptidi', 'peptides', 'polipeptidi', 'zinco',
      'zinc', 'ceramidi', 'ceramides', 'caffeina', 'caffeine', 'q10', 'ubiquinone',
      'centella', 'madecassoside', 'cica', 'pantenolo', 'panthenol', 'squalano',
      'squalane', 'resveratrolo', 'resveratrol', 'collagene', 'collagen', 'elastina',
      'elastin', 'ectoina', 'ectoin', 'allantoina', 'allantoin', 'karit', 'shea',
      'argan', 'jojoba', 'rosa mosqueta', 'amamelide', 'hamamelis', 'calendula',
      'aloe', 'alghe', 'algae', 'tea tree', 'bava di lumaca'
    ];

    const NONSENSE_BLOCKLIST = [
      'secondo', 'standard', 'iso', 'rivoluziona', 'concetto', 'soggetti',
      'donne', 'consumatori', 'consumatrici', 'intervistati', 'clienti', 'partecipanti', 'persone',
      'riscontrato', 'notato', 'dichiarano', 'dichiara', 'afferma', 'confermato', 'efficacia',
      'risultati', 'test', 'clinico', 'studio', 'autovalutazione', 'soddisfazione',
      'ingredienti', 'formula', 'composizione', 'prodotto', 'trattamento', 'routine',
      'applicazione', 'in base', 'rispetto', 'come', 'mentre', 'quando', 'dopo',
      'prima', 'grazie', 'attraverso', 'dona', 'rende', 'lascia', 'aiuta', 'migliora',
      'riduce', 'aumenta', 'stimola', 'favorisce', 'sconto', 'naturale', 'natural',
      'biologico', 'organico', "d'origine"
    ];

    const ACTIVE_DISPLAY_NAMES = {
      'acido ialuronico': 'Acido Ialuronico',
      'hyaluronic': 'Acido Ialuronico',
      'niacinamide': 'Niacinamide',
      'vitamina c': 'Vitamina C',
      'vitamin c': 'Vitamina C',
      'ascorbico': 'Acido Ascorbico (Vit. C)',
      'vitamina e': 'Vitamina E',
      'tocoferolo': 'Tocoferolo (Vit. E)',
      'retinolo': 'Retinolo',
      'retinol': 'Retinolo',
      'bio-retinolo': 'Bio-Retinolo',
      'bakuchiol': 'Bakuchiol',
      'acido salicilico': 'Acido Salicilico',
      'salicylic': 'Acido Salicilico',
      'bha': 'BHA',
      'acido glicolico': 'Acido Glicolico',
      'glycolic': 'Acido Glicolico',
      'aha': 'AHA',
      'acido lattico': 'Acido Lattico',
      'lactic': 'Acido Lattico',
      'acido azelaico': 'Acido Azelaico',
      'azelaic': 'Acido Azelaico',
      'acido ferulico': 'Acido Ferulico',
      'ferulic': 'Acido Ferulico',
      'peptidi': 'Peptidi',
      'peptides': 'Peptidi',
      'polipeptidi': 'Polipeptidi',
      'zinco': 'Zinco',
      'zinc': 'Zinco',
      'ceramidi': 'Ceramidi',
      'ceramides': 'Ceramidi',
      'caffeina': 'Caffeina',
      'caffeine': 'Caffeina',
      'q10': 'Coenzima Q10',
      'ubiquinone': 'Coenzima Q10',
      'centella': 'Centella Asiatica',
      'madecassoside': 'Madecassoside',
      'cica': 'Centella Asiatica (CICA)',
      'pantenolo': 'Pantenolo',
      'panthenol': 'Pantenolo',
      'squalano': 'Squalano',
      'squalane': 'Squalano',
      'resveratrolo': 'Resveratrolo',
      'resveratrol': 'Resveratrolo',
      'collagene': 'Collagene',
      'collagen': 'Collagene',
      'elastina': 'Elastina',
      'elastin': 'Elastina',
      'ectoina': 'Ectoina',
      'ectoin': 'Ectoina',
      'allantoina': 'Allantoina',
      'allantoin': 'Allantoina',
      'karit': 'Burro di Karitè',
      'shea': 'Burro di Karitè',
      'argan': 'Olio di Argan',
      'jojoba': 'Olio di Jojoba',
      'rosa mosqueta': 'Rosa Mosqueta',
      'amamelide': 'Amamelide',
      'hamamelis': 'Amamelide',
      'calendula': 'Calendula',
      'aloe': 'Aloe Vera',
      'alghe': 'Estratto di Alghe',
      'algae': 'Estratto di Alghe',
      'tea tree': 'Tea Tree',
      'bava di lumaca': 'Bava di Lumaca'
    };

    const sortedActives = [...VALID_ACTIVES].sort((a, b) => b.length - a.length);

    function isValidActiveCandidate(rawName, valNum) {
      if (isNaN(valNum) || valNum <= 0 || valNum > 30) {
        return null;
      }
      if (!rawName || typeof rawName !== 'string') {
        return null;
      }

      const lower = rawName.toLowerCase();

      const isBlocked = NONSENSE_BLOCKLIST.some(word => lower.includes(word.toLowerCase()));
      if (isBlocked) {
        return null;
      }

      for (const act of sortedActives) {
        let isMatch = false;
        if (act.length <= 4) {
          const re = new RegExp(`\\b${act}\\b`, 'i');
          isMatch = re.test(lower);
        } else {
          isMatch = lower.includes(act);
        }

        if (isMatch) {
          return ACTIVE_DISPLAY_NAMES[act] || (act.charAt(0).toUpperCase() + act.slice(1));
        }
      }

      return null;
    }

    const ingredientBadges = [];
    const activeRegex = /\b(\d{1,2}(?:[.,]\d+)?)\s*%\s+([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s\-–]{2,40})/gi;
    let m;
    while ((m = activeRegex.exec(textAll)) !== null) {
      const valNum = parseFloat(m[1].replace(',', '.'));
      const activeName = isValidActiveCandidate(m[2], valNum);
      if (activeName) {
        const pctStr = `${m[1].trim()}%`;
        const itemText = `${pctStr} ${activeName}`;
        if (!ingredientBadges.some(b => b.toLowerCase().includes(activeName.toLowerCase()))) {
          ingredientBadges.push(itemText);
        }
      }
    }

    const activeSuffixRegex = /\b([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s\-–]{2,30})\s*(?:\(|\:|\-)?\s*(\d{1,2}(?:[.,]\d+)?)\s*%\)?/gi;
    while ((m = activeSuffixRegex.exec(textAll)) !== null) {
      const valNum = parseFloat(m[2].replace(',', '.'));
      const activeName = isValidActiveCandidate(m[1], valNum);
      if (activeName) {
        const pctStr = `${m[2].trim()}%`;
        const itemText = `${pctStr} ${activeName}`;
        if (!ingredientBadges.some(b => b.toLowerCase().includes(activeName.toLowerCase()))) {
          ingredientBadges.push(itemText);
        }
      }
    }

    const bulletList = document.getElementById('pdp-bullet-list') || document.querySelector('.pdp-bullet-list, [data-pdp-bullet-list]');
    if (bulletList) {
      if (naturalBadgeText) {
        let existingBadge = bulletList.querySelector('.pdp-auto-natural-badge');
        if (!existingBadge) {
          const alreadyPresent = Array.from(bulletList.children).some(child =>
            child.textContent.includes("d'Origine Naturale") || child.textContent.includes('ECOCERT')
          );
          if (!alreadyPresent) {
            const badgeDiv = document.createElement('div');
            badgeDiv.className = 'pdp-auto-natural-badge flex items-center gap-2 bg-white/95 rounded-xs p-2 shadow-xs border border-borderLinen';
            badgeDiv.innerHTML = `<span class="text-sage font-bold">✓</span><span class="text-xs text-ink font-medium">${naturalBadgeText}</span>`;
            bulletList.insertBefore(badgeDiv, bulletList.firstChild);
          }
        } else {
          const span = existingBadge.querySelector('span:last-child');
          if (span) {
            const existingPctMatch = span.textContent.match(/\b\d{2,3}%\b/);
            const newPctMatch = naturalBadgeText.match(/\b\d{2,3}%\b/);
            if (!existingPctMatch || (newPctMatch && existingPctMatch[0] !== newPctMatch[0]) || (naturalBadgeText.includes('ECOCERT') && !span.textContent.includes('ECOCERT'))) {
              span.textContent = naturalBadgeText;
            }
          }
        }
      }

      const existingActiveBadges = bulletList.querySelectorAll('.pdp-auto-active-badge');
      existingActiveBadges.forEach(badge => {
        const text = badge.textContent || '';
        const isStillValid = ingredientBadges.some(b => text.toLowerCase().includes(b.toLowerCase()));
        if (!isStillValid) {
          badge.remove();
        }
      });

      ingredientBadges.forEach(ingText => {
        const alreadyPresent = Array.from(bulletList.children).some(child =>
          child.textContent.toLowerCase().includes(ingText.toLowerCase())
        );
        if (!alreadyPresent) {
          const badgeDiv = document.createElement('div');
          badgeDiv.className = 'pdp-auto-active-badge flex items-center gap-2 bg-white/95 rounded-xs p-2 shadow-xs border border-borderLinen';
          badgeDiv.innerHTML = `<span class="text-sage font-bold">✓</span><span class="text-xs text-ink font-medium">${ingText}</span>`;
          const natBadge = bulletList.querySelector('.pdp-auto-natural-badge');
          if (natBadge && natBadge.nextSibling) {
            bulletList.insertBefore(badgeDiv, natBadge.nextSibling);
          } else if (natBadge) {
            bulletList.appendChild(badgeDiv);
          } else {
            bulletList.insertBefore(badgeDiv, bulletList.firstChild);
          }
        }
      });
    }
  } catch (err) {
    console.warn('Percentage & natural badge extraction warning:', err);
  }

  // 2. Subtitle / Benefit Italian Translation Priority
  function translateHeading(str) {
    if (!str) return '';
    let h = str.trim().replace(/^[:\s\-–]+|[:\s\-–]+$/g, '').trim();

    const parenMatch = h.match(/^([^(]+)\(([^)]+)\)$/);
    if (parenMatch) {
      const enPart = parenMatch[1].trim();
      const itPart = parenMatch[2].trim();
      return `${itPart} (${enPart})`;
    }

    const dict = [
      { en: /dark spot corrector/i, it: "Correttore Macchie Scure" },
      { en: /bio-retinol renewal/i, it: "Rinnovamento al Bio-Retinolo" },
      { en: /lifting (?:and|&) plumping effect/i, it: "Effetto Lifting e Rimpolpante" },
      { en: /antioxidant shield (?:&|and) comfort/i, it: "Scudo Antiossidante & Comfort" },
      { en: /texture (?:and|&|e) (?:sensazione|sensation)(?: sulla pelle)?/i, it: "Texture e Sensazione sulla Pelle" },
      { en: /the science of/i, it: "La Scienza del" },
      { en: /^(?:how to use|application ritual|modo d'uso|modalit[aà] d'uso|modi d'uso|come si usa|directions|how to apply|modalit[aà] d'uso e applicazione|modo d'uso e applicazione)$/i, it: "Rituale di Applicazione" },
      { en: /^(?:ingredients?|full inci|inci|ingredienti(\s*[/–-]\s*inci)?|principi attivi|ingredienti e certificazioni)$/i, it: "Principi Attivi & INCI Completo" },
      { en: /^(?:clinical results|risultati clinici|studi clinici|risultati|efficacia)$/i, it: "Risultati Clinici & Efficacia" },
      { en: /hydrating (?:and|&) radiac?e|sublimating conditioner/i, it: "Idratazione e Sublimazione di Luminosità" },
      { en: /hair nourishment|deep repair/i, it: "Nutrizione e Riparazione Capillare" },
      { en: /^benefits$|^benefici$/i, it: "Benefici e Risultati" }
    ];

    for (let item of dict) {
      if (item.en.test(h)) {
        if (item.en.source.startsWith('^') || h.toLowerCase() === item.en.source.toLowerCase().replace(/\\/g, '')) {
          return item.it;
        }
        h = h.replace(item.en, item.it);
      }
    }
    return h.charAt(0).toUpperCase() + h.slice(1);
  }

  // Helper: Format HTML content preserving bold tags, italics, spans, lists, and line breaks
  function formatContentHtml(html) {
    if (!html || typeof html !== 'string') return '';
    let trimmed = html.trim();
    if (!trimmed) return '';

    // If trimmed is wrapped entirely in <p>...</p> or <div>...</div> and has <br>,
    // unwrap the outer container before splitting to prevent malformed nested <p> tags
    if (/(?:<br\s*\/?>|\r?\n)/i.test(trimmed)) {
      if (/^<p\b[^>]*>([\s\S]*?)<\/p>$/i.test(trimmed)) {
        trimmed = trimmed.replace(/^<p\b[^>]*>([\s\S]*?)<\/p>$/i, '$1').trim();
      } else if (/^<div\b[^>]*>([\s\S]*?)<\/div>$/i.test(trimmed)) {
        trimmed = trimmed.replace(/^<div\b[^>]*>([\s\S]*?)<\/div>$/i, '$1').trim();
      }
    }

    // If it contains newlines or <br>, convert to structured paragraphs while keeping all inner formatting
    if (/(?:<br\s*\/?>|\r?\n)/i.test(trimmed)) {
      const parts = trimmed.split(/(?:<br\s*\/?>\s*)+|(?:\r?\n\s*)+/i);
      const out = [];
      parts.forEach(part => {
        let p = part.trim();
        if (!p) return;
        if (/^<(?:p|div|ul|ol|table|blockquote)\b/i.test(p)) {
          out.push(p);
        } else {
          out.push(`<p class="mb-2 leading-relaxed">${p}</p>`);
        }
      });
      if (out.length > 0) return out.join('');
    }

    if (/^<(?:p|div|ul|ol|table|blockquote)\b/i.test(trimmed)) {
      return trimmed;
    }
    return `<p class="mb-2 leading-relaxed">${trimmed}</p>`;
  }

  // 3. Robust HTML DOM parsing for Accordions & Overview
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = rawHtml;

  // Unpack single wrapping containers (e.g. metafield-rich_text_field or single parent div/section)
  while (
    tempDiv.children.length === 1 &&
    ['DIV', 'SECTION', 'ARTICLE', 'MAIN'].includes(tempDiv.children[0].tagName)
  ) {
    tempDiv.innerHTML = tempDiv.children[0].innerHTML;
  }

  // Flatten nested container divs that contain block children
  let flattened = true;
  while (flattened) {
    flattened = false;
    const children = Array.from(tempDiv.children);
    for (const child of children) {
      if (['DIV', 'SECTION', 'ARTICLE'].includes(child.tagName)) {
        if (child.querySelector('p, h2, h3, h4, h5, h6, ul, ol, div')) {
          while (child.firstChild) {
            tempDiv.insertBefore(child.firstChild, child);
          }
          tempDiv.removeChild(child);
          flattened = true;
          break;
        }
      }
    }
  }

  // Split any P or DIV tags that contain double <br> or headings after <br>
  Array.from(tempDiv.children).forEach(child => {
    if (['P', 'DIV'].includes(child.tagName)) {
      const inner = child.innerHTML;
      if (/(?:<br\s*\/?>\s*){2,}/i.test(inner) || /<br\s*\/?>\s*<(?:strong|b|span|h\d)\b/i.test(inner)) {
        const parts = inner.split(/(?:<br\s*\/?>\s*){2,}|(?=<br\s*\/?>\s*<(?:strong|b|span|h\d)\b)/i);
        if (parts.length > 1) {
          const fragment = document.createDocumentFragment();
          parts.forEach(part => {
            const cleanPart = part.replace(/^<br\s*\/?>\s*/i, '').trim();
            if (cleanPart) {
              const newP = document.createElement('p');
              newP.innerHTML = cleanPart;
              fragment.appendChild(newP);
            }
          });
          if (fragment.children.length > 0) {
            tempDiv.replaceChild(fragment, child);
          }
        }
      }
    }
  });

  // If no block tags exist at all, split rawHtml by <br>
  if (tempDiv.querySelectorAll('p, div, h2, h3, h4, h5, h6, ul, ol').length === 0) {
    const parts = rawHtml.split(/<br\s*\/?>/gi);
    tempDiv.innerHTML = '';
    parts.forEach(part => {
      let pTrimmed = part.trim();
      if (!pTrimmed) return;
      let d = document.createElement('p');
      d.innerHTML = pTrimmed;
      if (d.textContent.trim() || d.querySelector('img')) {
        tempDiv.appendChild(d);
      }
    });
  }

  let volumeHtml = '';
  let sections = [];
  let currentSection = null;

  const SECTION_KEYWORDS = [
    "modo d'uso", "modalità d'uso", "modalita d'uso", "modi d'uso", "rituale",
    "applicazione", "come si usa", "come applicare", "how to use", "directions", "how to apply",
    "principi attivi", "attivi chiave", "attivi", "ingredienti", "ingrediente", "inci", "full inci", "formula", "composizione",
    "benefici", "beneficio", "benefit", "risultati", "risultato", "clinical results", "efficacia", "azione",
    "texture", "sensazione", "sensazioni", "la scienza", "the science",
    "consigli", "consigli d'uso", "avvertenze", "avvertenza", "precauzioni",
    "caratteristiche", "adatto a", "tipo di pelle", "skin type"
  ];

  function startsWithSectionKeyword(str) {
    if (!str || typeof str !== 'string') return false;
    const clean = str.trim().toLowerCase().replace(/^[:\s\-–*•]+/, '');
    return SECTION_KEYWORDS.some(kw => {
      if (clean === kw || clean.startsWith(kw + ':') || clean.startsWith(kw + ' ') || clean.startsWith(kw + ' -') || clean.startsWith(kw + ' –')) {
        return true;
      }
      return clean.startsWith(kw);
    });
  }

  function isVolumeOrFormatString(str) {
    if (!str || typeof str !== 'string') return false;
    const s = str.trim();
    return /^\s*\d+\s*(?:ml|g|oz|fl\s*oz|l)\b/i.test(s)
        || /\(\s*\d+\s*(?:ml|g|oz|fl\s*oz|l)\s*\)\s*$/i.test(s)
        || /^\s*(?:formato|volume)\b/i.test(s);
  }

  function isHeadingElement(el) {
    if (!el) return null;
    const tag = el.tagName ? el.tagName.toUpperCase() : '';

    // 1. Standard HTML Headings H2-H6
    if (['H2', 'H3', 'H4', 'H5', 'H6'].includes(tag)) {
      const hText = el.textContent.trim();
      if (hText.length > 2) {
        return {
          title: hText.replace(/:\s*$/, '').trim(),
          inlineContentHtml: ''
        };
      }
      return null;
    }

    // 2. Paragraphs or Divs with Strong or B (or bold styled spans)
    if (tag === 'P' || tag === 'DIV') {
      const strongEl = el.querySelector('strong, b, span[style*="font-weight: bold"], span[style*="font-weight: 700"], span[style*="font-weight: 600"]');
      if (strongEl) {
        let prevText = '';
        let curr = strongEl.previousSibling;
        while (curr) {
          prevText = (curr.textContent || '') + prevText;
          curr = curr.previousSibling;
        }
        let parent = strongEl.parentElement;
        while (parent && parent !== el) {
          let pSib = parent.previousSibling;
          while (pSib) {
            prevText = (pSib.textContent || '') + prevText;
            pSib = pSib.previousSibling;
          }
          parent = parent.parentElement;
        }
        const isLeading = prevText.trim().replace(/^[:\s\-–*•]+/, '').length === 0;

        if (isLeading) {
          const strongText = strongEl.textContent.trim();
          const totalText = el.textContent.trim();
          const restText = totalText.replace(strongText, '').trim();

          const hasColon = strongText.endsWith(':') || restText.startsWith(':') || strongText.indexOf(':') > 0;
          const isEntireBold = (restText.length === 0) && strongText.length <= 80;
          const isDominantBold = (strongText.length >= totalText.length * 0.6) && strongText.length <= 80;
          const isSectionKw = startsWithSectionKeyword(strongText);
          const isVolFormat = isVolumeOrFormatString(strongText) || isVolumeOrFormatString(totalText);

          if (strongText.length > 2 && (isEntireBold || hasColon || isDominantBold || isSectionKw || isVolFormat)) {
            let titlePart = strongText;
            let inlineContentHtml = '';

            const colonInStrong = strongText.indexOf(':');
            if (colonInStrong > 0 && colonInStrong < strongText.length - 1 && !isSectionKw) {
              titlePart = strongText.substring(0, colonInStrong).trim();
              const clone = el.cloneNode(true);
              const clonedStrong = clone.querySelector('strong, b, span[style*="font-weight: bold"], span[style*="font-weight: 700"], span[style*="font-weight: 600"]');
              if (clonedStrong) {
                clonedStrong.innerHTML = clonedStrong.innerHTML.replace(/^[^:]*:\s*/, '');
              }
              inlineContentHtml = clone.innerHTML.trim();
            } else {
              if (colonInStrong > 0 && isSectionKw && colonInStrong < strongText.length - 1) {
                titlePart = strongText.substring(0, colonInStrong).trim();
                const clone = el.cloneNode(true);
                const clonedStrong = clone.querySelector('strong, b, span[style*="font-weight: bold"], span[style*="font-weight: 700"], span[style*="font-weight: 600"]');
                if (clonedStrong) {
                  clonedStrong.innerHTML = clonedStrong.innerHTML.replace(/^[^:]*:\s*/, '');
                }
                inlineContentHtml = clone.innerHTML.trim();
              } else {
                titlePart = strongText.replace(/:\s*$/, '').trim();
                const clone = el.cloneNode(true);
                const clonedStrong = clone.querySelector('strong, b, span[style*="font-weight: bold"], span[style*="font-weight: 700"], span[style*="font-weight: 600"]');
                if (clonedStrong) {
                  clonedStrong.remove();
                }
                let rem = clone.innerHTML.trim();
                rem = rem.replace(/^[:\s\-–&nbsp;]+/, '').trim();
                rem = rem.replace(/^(?:<br\s*\/?>)+/i, '').trim();
                inlineContentHtml = rem;
              }
            }

            return {
              title: titlePart.replace(/:\s*$/, '').trim(),
              inlineContentHtml: inlineContentHtml
            };
          }
        }
      }

      // 3. Paragraphs or Divs WITHOUT Strong (plain text)
      const plainText = el.textContent.trim();
      if (plainText.length > 2) {
        if (isVolumeOrFormatString(plainText) && plainText.length <= 80) {
          return {
            title: plainText.replace(/:\s*$/, '').trim(),
            inlineContentHtml: ''
          };
        }

        if (plainText.endsWith(':') && plainText.length <= 65) {
          return {
            title: plainText.replace(/:\s*$/, '').trim(),
            inlineContentHtml: ''
          };
        }

        const colonIdx = plainText.indexOf(':');
        if (colonIdx > 0 && colonIdx <= 55) {
          const candidate = plainText.substring(0, colonIdx).trim();
          if (startsWithSectionKeyword(candidate) && candidate.length > 2) {
            const remainderHtml = el.innerHTML.replace(/^[^:]*:\s*/, '').trim();
            return {
              title: candidate,
              inlineContentHtml: remainderHtml
            };
          }
        }

        if (startsWithSectionKeyword(plainText) && plainText.length <= 65) {
          return {
            title: plainText.replace(/:\s*$/, '').trim(),
            inlineContentHtml: ''
          };
        }
      }
    }

    // 4. Standalone STRONG or B tags
    if (tag === 'STRONG' || tag === 'B') {
      const txt = el.textContent.trim();
      if (txt.length > 2) {
        return {
          title: txt.replace(/:\s*$/, '').trim(),
          inlineContentHtml: ''
        };
      }
    }

    return null;
  }

  const childNodes = Array.from(tempDiv.childNodes);

  childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const txt = node.textContent.trim();
      if (!txt) return;
      const formatted = formatContentHtml(txt);
      if (!currentSection) {
        currentSection = {
          title: 'Panoramica del Trattamento',
          content: formatted
        };
        sections.push(currentSection);
      } else {
        currentSection.content += formatted;
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const headingCheck = isHeadingElement(node);
    if (headingCheck) {
      let rawHeadingTitle = headingCheck.title;
      let inlineContentHtml = headingCheck.inlineContentHtml || '';

      // FILTER 1: CERTIFICATIONS & PERCENTAGES MUST NEVER CREATE ACCORDIONS
      const isCertOrPct = /ecocert|cosmos|\b\d{1,3}\s*%/i.test(rawHeadingTitle);
      if (isCertOrPct) {
        return;
      }

      // FILTER 2: VOLUME / FORMAT / SIZE HEADINGS MUST NEVER CREATE ACCORDIONS
      const isVolumeOrFormat = isVolumeOrFormatString(rawHeadingTitle);
      if (isVolumeOrFormat) {
        const fullVolText = rawHeadingTitle + (inlineContentHtml ? ` — ${inlineContentHtml}` : '');
        if (!volumeHtml) {
          volumeHtml = `<p class="font-semibold text-ink uppercase tracking-wider text-[11px] mb-3 leading-relaxed">${fullVolText}</p>`;
        }
        return;
      }

      let title = translateHeading(rawHeadingTitle);

      currentSection = {
        title: title,
        content: inlineContentHtml ? formatContentHtml(inlineContentHtml) : ''
      };
      sections.push(currentSection);
    } else {
      const nodeText = (node.textContent || '').trim();
      const nodeHtml = node.outerHTML;

      // Skip standalone certification or percentage paragraphs in body
      if (/^(?:ecocert|cosmos)[\s\w\-–]*?\d{1,3}\s*%[\s\w]*$/i.test(nodeText) || /^\d{1,3}\s*%\s*(?:naturale|natural|biologico)?$/i.test(nodeText)) {
        return;
      }

      // Volume / format line fallback in plain paragraph if not caught by headingCheck
      if (!volumeHtml && isVolumeOrFormatString(nodeText) && nodeText.length <= 100 && !currentSection) {
        volumeHtml = `<p class="font-semibold text-ink uppercase tracking-wider text-[11px] mb-3 leading-relaxed">${nodeText}</p>`;
        return;
      }

      const formattedNodeHtml = formatContentHtml(nodeHtml);

      if (!currentSection) {
        currentSection = {
          title: 'Panoramica del Trattamento',
          content: formattedNodeHtml
        };
        sections.push(currentSection);
      } else {
        currentSection.content += formattedNodeHtml;
      }
    }
  });

  // Filter out any sections that match certifications, percentages, or volume formats
  sections = sections.filter(sec => {
    if (!sec || !sec.title) return false;
    const t = sec.title.trim();
    if (/ecocert|cosmos|\b\d{1,3}\s*%/i.test(t)) return false;
    if (isVolumeOrFormatString(t)) return false;
    return true;
  });

  if (sections.length === 0) {
    if (rawHtml.trim()) {
      sections.push({
        title: 'Panoramica del Trattamento',
        content: formatContentHtml(rawHtml)
      });
    } else {
      rendered.innerHTML = volumeHtml || '';
      raw.style.display = 'none';
      return;
    }
  }

  let outHtml = '';
  if (volumeHtml) {
    outHtml += volumeHtml;
  }

  outHtml += '<div class="pdp-accordions-group space-y-0 border-t border-[#E5E0D8]">';
  sections.forEach((sec) => {
    if (!sec || !sec.title) return;
    outHtml += `
      <details class="group border-b border-[#E5E0D8]">
        <summary class="flex justify-between items-center cursor-pointer py-3.5 text-[11px] uppercase tracking-widest font-semibold text-ink list-none [&::-webkit-details-marker]:hidden hover:text-sage transition-colors select-none">
          <span class="acc-heading-title">${sec.title}</span>
          <span class="text-lg font-light transition-transform duration-300 group-open:rotate-45 ml-2">&plus;</span>
        </summary>
        <div class="pt-1 pb-4 text-xs text-[#7A7265] leading-relaxed space-y-2.5">
          ${sec.content || '<p class="italic text-ash">Dettagli del trattamento in via di aggiornamento da parte dei nostri dermo-specialisti.</p>'}
        </div>
      </details>
    `;
  });
  outHtml += '</div>';

  rendered.innerHTML = outHtml;
  raw.style.display = 'none';
}
window.renderAccordionDescription = renderAccordionDescription;

// Render locally submitted user reviews stored in localStorage
function renderUserReviews(productId) {
  if (!productId) return;
  const storageKey = 'mile_user_reviews_' + productId;
  let userReviews = [];
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) userReviews = JSON.parse(raw);
  } catch (e) {
    userReviews = [];
  }
  if (!Array.isArray(userReviews) || userReviews.length === 0) return;

  const container = document.getElementById('reviews-grid-container');
  if (!container) return;

  const existingInjected = container.querySelectorAll('.user-local-review-card');
  existingInjected.forEach(el => el.remove());

  userReviews.slice().reverse().forEach(rev => {
    const card = document.createElement('div');
    card.className = 'user-local-review-card bg-linen p-6 border border-sage/50 flex flex-col justify-between transition-all duration-500 shadow-xs';

    let starsHtml = '';
    const ratingNum = parseInt(rev.rating, 10) || 5;
    for (let i = 1; i <= ratingNum; i++) starsHtml += '&starf;';
    for (let i = ratingNum + 1; i <= 5; i++) starsHtml += '<span class="text-ash/40">&starf;</span>';

    function escapeHtml(str) {
      if (!str) return '';
      return String(str).replace(/[&<>"']/g, function(m) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
      });
    }

    card.innerHTML = `
      <div>
        <div class="flex flex-wrap justify-between items-center gap-2 mb-3">
          <div class="text-amber text-xs tracking-wider">${starsHtml}</div>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-semibold text-white bg-sage px-2 py-0.5 rounded-xs">
              &bull; La tua recensione &bull; In approvazione
            </span>
            <span class="text-[10px] text-ash">${escapeHtml(rev.date)}</span>
          </div>
        </div>
        <h4 class="font-serif text-base font-semibold text-ink mb-2">${escapeHtml(rev.title)}</h4>
        <p class="text-xs text-ash leading-relaxed font-light">
          &ldquo;${escapeHtml(rev.body)}&rdquo;
        </p>
      </div>
      <div class="pt-4 mt-6 border-t border-borderLinen flex items-center justify-between text-xs">
        <span class="font-medium text-ink">${escapeHtml(rev.author || 'Tu')}</span>
        <span class="text-sage text-[10px] font-semibold flex items-center gap-1">&check; Verifica Acquirente Club Mile</span>
      </div>
    `;
    container.insertBefore(card, container.firstChild);
  });

  const topReviewsText = document.getElementById('pdp-top-reviews-summary');
  if (topReviewsText) {
    const curMatch = topReviewsText.textContent.match(/(\d+(?:\.\d+)?)\/5\s*(?:·|•|&middot;)?\s*(\d+)\s*recension/i);
    if (curMatch) {
      const baseScore = parseFloat(curMatch[1]);
      const baseCount = parseInt(curMatch[2], 10);
      const newCount = baseCount + userReviews.length;
      topReviewsText.innerHTML = `${baseScore.toFixed(1)}/5 &middot; ${newCount} ${newCount === 1 ? 'recensione' : 'recensioni'}`;
    }
  }

  const totalCountEl = document.getElementById('reviews-total-count-display');
  if (totalCountEl) {
    const curTotal = parseInt(totalCountEl.dataset.baseCount, 10) || 0;
    const finalTotal = curTotal + userReviews.length;
    totalCountEl.textContent = finalTotal === 1
      ? 'Basato su 1 recensione certificata da acquirente reale'
      : `Basato su ${finalTotal} recensioni certificate da acquirenti reali`;
  }
}
window.renderUserReviews = renderUserReviews;

// ============================================================================
// 11. SEAMLESS CUSTOMER AUTHENTICATION & ACCOUNT DRAWER STATE MANAGEMENT
// ============================================================================

function renderCustomerAuthState() {
  try {
    const isDesignMode = Boolean(window.Shopify && window.Shopify.designMode);
    let customer = null;
    try {
      const rawCustomer = localStorage.getItem('mile_customer');
      if (rawCustomer) {
        customer = JSON.parse(rawCustomer);
      }
    } catch (e) {}

    if (isDesignMode && (!customer || !customer.first_name)) {
      customer = {
        first_name: 'Milena',
        last_name: 'Tacchella',
        email: 'milesolegirasole@libero.it'
      };
    }

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
window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;
window.renderCustomerAuthState = renderCustomerAuthState;
window.logoutCustomerSession = logoutCustomerSession;

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderCustomerAuthState();
  initWishlist();
  document.querySelectorAll('.product-description-container').forEach(c => renderAccordionDescription(c));
});

// Also run immediately
renderCustomerAuthState();
initWishlist();
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  document.querySelectorAll('.product-description-container').forEach(c => renderAccordionDescription(c));
}

// Shopify Theme Editor Integration
document.addEventListener('shopify:section:load', (event) => {
  if (typeof renderCustomerAuthState === 'function') renderCustomerAuthState();
  if (event.target && event.target.querySelectorAll) {
    event.target.querySelectorAll('.product-description-container').forEach(c => {
      if (typeof renderAccordionDescription === 'function') renderAccordionDescription(c);
    });
  }
});
document.addEventListener('shopify:section:select', () => {
  if (typeof renderCustomerAuthState === 'function') renderCustomerAuthState();
});
document.addEventListener('shopify:block:select', () => {
  if (typeof renderCustomerAuthState === 'function') renderCustomerAuthState();
});
