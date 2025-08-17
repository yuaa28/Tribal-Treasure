// Load cart items into checkout summary
function loadCheckoutItems() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const checkoutItems = document.getElementById('checkout-items');
  const checkoutTotal = document.getElementById('checkout-total');
  
  checkoutItems.innerHTML = '';
  let total = 0;
  
  cartItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'checkout-item';
    itemElement.innerHTML = `
      <div class="checkout-item-info">
        <div class="checkout-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="checkout-item-name">${item.name}</div>
      </div>
      <div class="checkout-item-price">₹${item.price}</div>
    `;
    checkoutItems.appendChild(itemElement);
    total += item.price;
  });
  
  checkoutTotal.textContent = `₹${total.toFixed(2)}`;
}

// Handle payment method selection
function handlePaymentMethod() {
  const paymentMethods = document.querySelectorAll('input[name="payment"]');
  const creditCardDetails = document.getElementById('credit-card-details');
  const upiDetails = document.getElementById('upi-details');
  
  paymentMethods.forEach(method => {
    method.addEventListener('change', (e) => {
      // Hide all payment details
      creditCardDetails.classList.remove('active');
      upiDetails.classList.remove('active');
      
      // Show selected payment details
      if (e.target.value === 'credit-card' || e.target.value === 'debit-card') {
        creditCardDetails.classList.add('active');
      } else if (e.target.value === 'upi') {
        upiDetails.classList.add('active');
      }
    });
  });
}

// Handle form submission
function handleFormSubmission() {
  const form = document.getElementById('checkout-form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Show success message
    alert('Order placed successfully!');
    
    // Redirect to home page
    window.location.href = 'index.html';
  });
}

// Initialize checkout page
document.addEventListener('DOMContentLoaded', () => {
  loadCheckoutItems();
  handlePaymentMethod();
  handleFormSubmission();
}); 