// DOM elements
document.addEventListener('DOMContentLoaded', function() {
  // Current year for footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      const isOpen = mobileMenu.classList.contains('active');
      menuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  }
  
  // Initialize cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let rentals = JSON.parse(localStorage.getItem('rentals')) || [];
  
  // Update cart count
  updateCartCount();
  
  // Initialize page based on URL path
  const pathName = window.location.pathname;
  
  if (pathName.endsWith('index.html') || pathName.endsWith('/')) {
    initializeHomePage();
  } else if (pathName.endsWith('products.html')) {
    initializeProductsPage();
  } else if (pathName.endsWith('product-detail.html')) {
    initializeProductDetailPage();
  } else if (pathName.endsWith('cart.html')) {
    initializeCartPage();
  }
  
  // Add image error handling
  document.addEventListener('error', function(event) {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
      console.log('Image error occurred, using fallback:', target.src);
      target.src = 'images/product-placeholder.svg';
    }
  }, true);
  
  // Initialize product quick add functionality
  document.addEventListener('click', function(e) {
    if (e.target.closest('.product-quick-add')) {
      const productCard = e.target.closest('.product-card');
      const productId = productCard.dataset.id;
      addToCart(productId, 1);
      e.preventDefault();
    }
  });
});

// Initialize Home Page
function initializeHomePage() {
  // Load featured products
  const featuredProductsContainer = document.querySelector('.featured-products');
  if (featuredProductsContainer) {
    const featuredProducts = products.filter(product => product.featured);
    featuredProductsContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
  }
  
  // Load categories
  const categoryGrid = document.querySelector('.category-grid');
  if (categoryGrid) {
    categoryGrid.innerHTML = categories.map(category => `
      <a href="products.html?category=${category.id}" class="category-card">
        ${category.name}
      </a>
    `).join('');
  }
  
  // Load testimonials
  const testimonialGrid = document.querySelector('.testimonial-grid');
  if (testimonialGrid) {
    testimonialGrid.innerHTML = testimonials.map(testimonial => `
      <div class="testimonial-card">
        <div class="testimonial-rating">
          ${createStarRating(testimonial.rating)}
        </div>
        <p class="testimonial-text">${testimonial.text}</p>
        <div class="testimonial-author">
          <span class="testimonial-name">${testimonial.name}</span>
          <span class="testimonial-location">${testimonial.location}</span>
        </div>
      </div>
    `).join('');
  }
}

// Initialize Products Page
function initializeProductsPage() {
  // Load all products
  const productsGrid = document.getElementById('products-grid');
  if (productsGrid) {
    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
  }
  
  // Load category filters
  const categoriesFilter = document.querySelector('.categories-filter');
  if (categoriesFilter) {
    categoriesFilter.innerHTML = categories.map(category => `
      <div class="filter-checkbox">
        <input type="checkbox" id="category-${category.id}" name="category" value="${category.id}">
        <label for="category-${category.id}">${category.name}</label>
      </div>
    `).join('');
  }
  
  // Set up availability filter
  const availabilityRadios = document.querySelectorAll('.filter-radio');
  availabilityRadios.forEach(radio => {
    radio.addEventListener('click', function() {
      // Remove active class from all radios
      availabilityRadios.forEach(r => r.classList.remove('active'));
      // Add active class to clicked radio
      this.classList.add('active');
    });
  });
  
  // Set up price range filter
  const minPriceInput = document.getElementById('min-price');
  const maxPriceInput = document.getElementById('max-price');
  
  if (minPriceInput && maxPriceInput) {
    // Update price range display when inputs change
    minPriceInput.addEventListener('input', updatePriceRangeDisplay);
    maxPriceInput.addEventListener('input', updatePriceRangeDisplay);
    
    function updatePriceRangeDisplay() {
      const minPrice = parseInt(minPriceInput.value) || 0;
      const maxPrice = parseInt(maxPriceInput.value) || 6000;
      
      const priceRange = document.querySelector('.price-range');
      if (priceRange) {
        priceRange.innerHTML = `<span>₹${minPrice}</span><span>₹${maxPrice}</span>`;
      }
    }
  }
  
  // Apply filters button
  const applyFiltersBtn = document.getElementById('apply-filters');
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', applyFilters);
  }
  
  // Clear filters button
  const clearFiltersBtn = document.getElementById('clear-filters');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearFilters);
  }
  
  // Parse URL parameters on page load
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  
  if (categoryParam) {
    // Pre-select the category checkbox
    const checkbox = document.getElementById(`category-${categoryParam}`);
    if (checkbox) {
      checkbox.checked = true;
      applyFilters();
    }
  }
  
  function applyFilters() {
    // Get selected categories
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
      .map(input => input.value);
    
    // Get price range
    const minPrice = parseInt(minPriceInput.value) || 0;
    const maxPrice = parseInt(maxPriceInput.value) || 6000;
    
    // Get rentable filter
    const rentableRadio = document.querySelector('.filter-radio[data-rentable="true"].active');
    const purchaseOnlyRadio = document.querySelector('.filter-radio[data-rentable="false"].active');
    let rentableFilter = null;
    
    if (rentableRadio) {
      rentableFilter = true;
    } else if (purchaseOnlyRadio) {
      rentableFilter = false;
    }
    
    // Filter products
    let filteredProducts = products;
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedCategories.includes(product.category.toLowerCase().replace(/\s+/g, '-'))
      );
    }
    
    // Apply price filter
    filteredProducts = filteredProducts.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
    
    // Apply rentable filter
    if (rentableFilter !== null) {
      filteredProducts = filteredProducts.filter(product => 
        product.isRentable === rentableFilter
      );
    }
    
    // Display filtered products
    productsGrid.innerHTML = filteredProducts.length > 0 
      ? filteredProducts.map(product => createProductCard(product)).join('')
      : '<div class="no-products">No products found matching your criteria.</div>';
  }
  
  function clearFilters() {
    // Clear category checkboxes
    document.querySelectorAll('input[name="category"]').forEach(input => {
      input.checked = false;
    });
    
    // Reset price range
    if (minPriceInput && maxPriceInput) {
      minPriceInput.value = 0;
      maxPriceInput.value = 6000;
      updatePriceRangeDisplay();
    }
    
    // Clear rentable filter
    document.querySelectorAll('.filter-radio').forEach(radio => {
      radio.classList.remove('active');
    });
    
    // Reset display to all products
    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
  }
}

// Initialize Product Detail Page
function initializeProductDetailPage() {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (!productId) {
    window.location.href = 'products.html';
    return;
  }
  
  // Find product by ID
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    window.location.href = 'products.html';
    return;
  }
  
  // Update product details in the DOM
  document.getElementById('product-breadcrumb-name').textContent = product.name;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-category').textContent = product.category;
  document.getElementById('product-price').textContent = `₹${product.price.toLocaleString()}`;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-origin').textContent = product.origin;
  
  const productImage = document.getElementById('product-image');
  if (productImage) {
    productImage.src = product.image;
    productImage.alt = product.name;
    productImage.onerror = function() { handleImageError(this); };
  }
  
  if (product.originalPrice) {
    document.getElementById('product-original-price').textContent = `₹${product.originalPrice.toLocaleString()}`;
    document.getElementById('product-original-price').style.display = 'inline';
  } else {
    document.getElementById('product-original-price').style.display = 'none';
  }
  
  // Add to cart button
  const addToCartButton = document.getElementById('add-to-cart');
  if (addToCartButton) {
    addToCartButton.addEventListener('click', function() {
      addToCart(product.id, 1);
    });
  }
  
  // Buy now button
  const buyNowButton = document.getElementById('buy-now');
  if (buyNowButton) {
    buyNowButton.addEventListener('click', function() {
      addToCart(product.id, 1);
      window.location.href = 'cart.html';
    });
  }
  
  // Rental options
  const rentalOptions = document.getElementById('rental-options');
  if (rentalOptions) {
    // Check if product is rentable
    if (product.isRentable && product.rentalPrices) {
      rentalOptions.style.display = 'block';
      
      // Set initial rental price display
      const rentalPriceElement = document.getElementById('rental-price');
      if (rentalPriceElement) {
        rentalPriceElement.textContent = `₹${product.rentalPrices.daily} / day`;
      }
      
      // Set up rental tabs
      const rentalTabs = document.querySelectorAll('.rental-tab');
      rentalTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          // Remove active class from all tabs
          rentalTabs.forEach(t => t.classList.remove('active'));
          // Add active class to clicked tab
          this.classList.add('active');
          
          // Update price display based on selected duration
          const duration = this.dataset.duration;
          const price = product.rentalPrices[duration];
          rentalPriceElement.textContent = `₹${price} / ${duration.slice(0, -2)}`;
          
          // Update end date if start date is selected
          updateRentalEndDate();
        });
      });
      
      // Set up date inputs
      const today = new Date();
      const todayFormatted = today.toISOString().split('T')[0];
      const startDateInput = document.getElementById('start-date');
      const endDateInput = document.getElementById('end-date');
      
      if (startDateInput) {
        startDateInput.min = todayFormatted;
        startDateInput.addEventListener('change', updateRentalEndDate);
      }
      
      function updateRentalEndDate() {
        const startDate = startDateInput.value;
        if (!startDate) {
          const durationElement = document.getElementById('rental-duration');
          if (durationElement) {
            durationElement.textContent = '';
          }
          return;
        }
        
        // Get selected duration
        const activeTab = document.querySelector('.rental-tab.active');
        const duration = activeTab.dataset.duration;
        let days;
        
        switch (duration) {
          case 'daily':
            days = 1;
            break;
          case 'weekly':
            days = 7;
            break;
          case 'monthly':
            days = 30;
            break;
          default:
            days = 1;
        }
        
        // Calculate end date
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + days);
        endDateInput.value = endDate.toISOString().split('T')[0];
        
        // Update rental duration text
        const durationText = `${days} ${days === 1 ? 'day' : 'days'} rental from ${formatDate(new Date(startDate))}`;
        const durationElement = document.getElementById('rental-duration');
        if (durationElement) {
          durationElement.textContent = durationText;
        }
        
        // Enable book rental button
        const bookRentalButton = document.getElementById('book-rental');
        if (bookRentalButton) {
          bookRentalButton.classList.remove('disabled');
        }
      }
      
      // Book rental button
      const bookRentalButton = document.getElementById('book-rental');
      if (bookRentalButton) {
        bookRentalButton.addEventListener('click', function() {
          if (this.classList.contains('disabled')) {
            return;
          }
          
          // Get selected duration and dates
          const activeTab = document.querySelector('.rental-tab.active');
          const duration = activeTab.dataset.duration;
          const startDate = document.getElementById('start-date').value;
          const endDate = document.getElementById('end-date').value;
          
          // Add to rentals
          addToRentals(product.id, duration, startDate, endDate);
          
          // Redirect to cart page
          window.location.href = 'cart.html';
        });
      }
    } else {
      rentalOptions.style.display = 'none';
    }
  }
  
  // Related products
  const relatedProductsGrid = document.getElementById('related-products-grid');
  if (relatedProductsGrid) {
    // Get products in the same category
    const relatedProducts = products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
    
    if (relatedProducts.length > 0) {
      relatedProductsGrid.innerHTML = relatedProducts.map(product => createProductCard(product)).join('');
    } else {
      document.querySelector('.related-products').style.display = 'none';
    }
  }
}

// Initialize Cart Page
function initializeCartPage() {
  // Get cart and rentals from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const rentals = JSON.parse(localStorage.getItem('rentals')) || [];
  
  // Show/hide empty states
  const emptyCart = document.getElementById('empty-cart');
  const cartContent = document.getElementById('cart-content');
  
  if (cart.length === 0) {
    emptyCart.style.display = 'block';
    cartContent.style.display = 'none';
  } else {
    emptyCart.style.display = 'none';
    cartContent.style.display = 'grid';
    renderCartItems();
  }
  
  // Show/hide empty rentals
  const rentalSection = document.getElementById('rental-section');
  const emptyRentals = document.getElementById('empty-rentals');
  const rentalItems = document.getElementById('rental-items');
  
  if (rentals.length === 0) {
    emptyRentals.style.display = 'block';
    rentalItems.style.display = 'none';
  } else {
    emptyRentals.style.display = 'none';
    rentalItems.style.display = 'block';
    renderRentalItems();
  }
  
  // Clear cart button
  const clearCartBtn = document.getElementById('clear-cart-btn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.setItem('cart', JSON.stringify([]));
        updateCartCount();
        window.location.reload();
      }
    });
  }
  
  // Checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      alert('Thank you for your purchase! This is a demo website, so no actual purchase will be made.');
      localStorage.setItem('cart', JSON.stringify([]));
      updateCartCount();
      window.location.reload();
    });
  }
  
  function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    
    let cartItemsHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (product) {
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        cartItemsHTML += `
          <div class="cart-item" data-id="${product.id}">
            <div class="cart-item-image">
              <img src="${product.image}" alt="${product.name}" onerror="handleImageError(this)">
            </div>
            <div class="cart-item-info">
              <h3>${product.name}</h3>
              <div class="cart-item-category">${product.category}</div>
              <div class="cart-item-price">₹${product.price.toLocaleString()}</div>
              <div class="cart-item-quantity">
                <button class="quantity-btn decrease-quantity">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10">
                <button class="quantity-btn increase-quantity">+</button>
              </div>
            </div>
            <button class="cart-item-remove"><i class="fas fa-trash"></i></button>
          </div>
        `;
      }
    });
    
    cartItemsContainer.innerHTML = cartItemsHTML;
    
    // Calculate and update order summary
    const shipping = cart.length > 0 ? 150 : 0;
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + shipping + tax;
    
    document.getElementById('cart-subtotal').textContent = `₹${subtotal.toLocaleString()}`;
    document.getElementById('cart-shipping').textContent = `₹${shipping.toLocaleString()}`;
    document.getElementById('cart-tax').textContent = `₹${tax.toLocaleString()}`;
    document.getElementById('cart-total').textContent = `₹${total.toLocaleString()}`;
    
    // Add event listeners to quantity buttons and remove buttons
    cartItemsContainer.querySelectorAll('.decrease-quantity').forEach(button => {
      button.addEventListener('click', function() {
        const cartItem = this.closest('.cart-item');
        const productId = cartItem.dataset.id;
        const quantityInput = cartItem.querySelector('.quantity-input');
        
        if (quantityInput.value > 1) {
          quantityInput.value = parseInt(quantityInput.value) - 1;
          updateCartItemQuantity(productId, parseInt(quantityInput.value));
        }
      });
    });
    
    cartItemsContainer.querySelectorAll('.increase-quantity').forEach(button => {
      button.addEventListener('click', function() {
        const cartItem = this.closest('.cart-item');
        const productId = cartItem.dataset.id;
        const quantityInput = cartItem.querySelector('.quantity-input');
        
        if (quantityInput.value < 10) {
          quantityInput.value = parseInt(quantityInput.value) + 1;
          updateCartItemQuantity(productId, parseInt(quantityInput.value));
        }
      });
    });
    
    cartItemsContainer.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', function() {
        const cartItem = this.closest('.cart-item');
        const productId = cartItem.dataset.id;
        
        // Ensure quantity is between 1 and 10
        let quantity = parseInt(this.value);
        if (isNaN(quantity) || quantity < 1) quantity = 1;
        if (quantity > 10) quantity = 10;
        
        this.value = quantity;
        updateCartItemQuantity(productId, quantity);
      });
    });
    
    cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(button => {
      button.addEventListener('click', function() {
        const cartItem = this.closest('.cart-item');
        const productId = cartItem.dataset.id;
        
        removeFromCart(productId);
        cartItem.remove();
        
        // Refresh the page if cart is empty
        const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
        if (updatedCart.length === 0) {
          window.location.reload();
        } else {
          renderCartItems(); // Re-render to update totals
        }
      });
    });
  }
  
  function renderRentalItems() {
    const rentalItemsContainer = document.getElementById('rental-items');
    if (!rentalItemsContainer) return;
    
    let rentalItemsHTML = '';
    
    rentals.forEach(rental => {
      const product = products.find(p => p.id === rental.id);
      if (product && product.rentalPrices) {
        const rentalPrice = product.rentalPrices[rental.duration];
        const durationText = rental.duration === 'daily' ? 'day' : 
                            rental.duration === 'weekly' ? 'week' : 'month';
        
        rentalItemsHTML += `
          <div class="rental-item" data-id="${product.id}">
            <div class="cart-item-image">
              <img src="${product.image}" alt="${product.name}" onerror="handleImageError(this)">
            </div>
            <div class="cart-item-info">
              <h3>${product.name}</h3>
              <div class="cart-item-category">${product.category}</div>
              <div class="cart-item-price">₹${rentalPrice.toLocaleString()} / ${durationText}</div>
              <div class="rental-item-details">
                Rental period: <span class="rental-period">${formatDate(new Date(rental.startDate))} to ${formatDate(new Date(rental.endDate))}</span>
              </div>
            </div>
            <button class="cart-item-remove remove-rental"><i class="fas fa-trash"></i></button>
          </div>
        `;
      }
    });
    
    rentalItemsContainer.innerHTML = rentalItemsHTML;
    
    // Add event listeners to remove buttons
    rentalItemsContainer.querySelectorAll('.remove-rental').forEach(button => {
      button.addEventListener('click', function() {
        const rentalItem = this.closest('.rental-item');
        const productId = rentalItem.dataset.id;
        
        removeFromRentals(productId);
        rentalItem.remove();
        
        // Refresh the page if rentals is empty
        const updatedRentals = JSON.parse(localStorage.getItem('rentals')) || [];
        if (updatedRentals.length === 0) {
          window.location.reload();
        }
      });
    });
  }
}

// Helper Functions
function createProductCard(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image">
        <a href="product-detail.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}">
        </a>
        <div class="product-quick-add">
          <i class="fas fa-shopping-cart"></i>
        </div>
        ${product.originalPrice ? `<div class="product-badge">Sale</div>` : ''}
      </div>
      <div class="product-info">
        <h3 class="product-name">
          <a href="product-detail.html?id=${product.id}">${product.name}</a>
        </h3>
        <p class="product-category">${product.category}</p>
        <div class="product-price-row">
          <div>
            <span class="product-price">₹${product.price.toLocaleString()}</span>
            ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString()}</span>` : ''}
          </div>
          ${product.isRentable ? `<span class="rentable-badge">Rentable</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

function createStarRating(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<i class="fas fa-star star"></i>';
    } else {
      stars += '<i class="far fa-star star"></i>';
    }
  }
  return stars;
}

function formatDate(date) {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  document.querySelectorAll('.cart-count').forEach(element => {
    element.textContent = cartCount;
  });
}

function addToCart(productId, quantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product already exists in cart
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    // Update quantity (max 10)
    existingItem.quantity = Math.min(existingItem.quantity + quantity, 10);
  } else {
    // Add new item
    cart.push({ id: productId, quantity });
  }
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart count
  updateCartCount();
  
  // Show confirmation message
  alert('Product added to cart!');
}

function updateCartItemQuantity(productId, quantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Find the item and update quantity
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
  }
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart count
  updateCartCount();
  
  // If on cart page, re-render to update totals
  if (window.location.pathname.endsWith('cart.html')) {
    renderCartItems();
  }
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Filter out the item
  cart = cart.filter(item => item.id !== productId);
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart count
  updateCartCount();
}

function addToRentals(productId, duration, startDate, endDate) {
  let rentals = JSON.parse(localStorage.getItem('rentals')) || [];
  
  // Add new rental
  rentals.push({
    id: productId,
    duration,
    startDate,
    endDate
  });
  
  // Save to localStorage
  localStorage.setItem('rentals', JSON.stringify(rentals));
  
  // Show confirmation message
  alert('Rental added to cart!');
}

function removeFromRentals(productId) {
  let rentals = JSON.parse(localStorage.getItem('rentals')) || [];
  
  // Filter out the item
  // Note: This removes all rentals for the same product
  rentals = rentals.filter(rental => rental.id !== productId);
  
  // Save to localStorage
  localStorage.setItem('rentals', JSON.stringify(rentals));
} 