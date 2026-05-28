// Shopping Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayCartItems();
});

// Add to cart function
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${productName} added to cart!`);
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        if (cartContent) cartContent.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        return;
    }

    if (cartContent) cartContent.style.display = 'grid';
    if (emptyCart) emptyCart.style.display = 'none';

    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" 
                       onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });

    updateCartSummary();
}

// Update quantity
function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity) || 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

// Update cart summary
function updateCartSummary() {
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    if (!subtotalEl) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const shipping = 5;
    const total = subtotal + tax + shipping;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Proceeding to checkout... This is a demo. Thank you for your interest!');
    // In a real application, redirect to payment gateway
}

// Contact form handler
function handleContactForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // In a real application, send this to a server
    console.log('Form submitted:', { name, email, message });
    alert(`Thank you, ${name}! We'll get back to you soon at ${email}`);
    event.target.reset();
}

// Filter by category
function filterCategory(category) {
    console.log('Filter by:', category);
    // In a real application, implement actual filtering
    alert('Filtering by: ' + category);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        }
    });
}

// Animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Price range filter
const priceRange = document.getElementById('priceRange');
if (priceRange) {
    priceRange.addEventListener('input', function() {
        document.getElementById('priceValue').textContent = this.value;
    });
}

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        alert(`Thank you for subscribing with ${email}!`);
        this.reset();
    });
}
