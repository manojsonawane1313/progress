// Get modal elements
const modal = document.getElementById('notification-modal');
const closeBtn = document.querySelector('.close-btn');
const confirmCancelBtn = document.getElementById('confirm-cancel');
const confirmOkBtn = document.getElementById('confirm-ok');

// Ensure modal and buttons exist before adding event listeners
if (modal && closeBtn && confirmCancelBtn && confirmOkBtn) {
    // Show the modal with a message
    function showModal(message) {
        const notificationMessage = document.getElementById('notification-message');
        if (notificationMessage) {
            notificationMessage.innerText = message;
            modal.style.display = 'flex'; // Show the modal
            modal.setAttribute('aria-hidden', 'false');
            closeBtn.focus(); // Focus on close button for accessibility
        }
    }

    // Hide the modal
    function hideModal() {
        modal.style.display = 'none'; // Hide the modal
        modal.setAttribute('aria-hidden', 'true');
    }

    // Get the cart from localStorage
    function getCart() {
        try {
            const cart = localStorage.getItem('cart');
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Failed to retrieve cart from localStorage:', error);
            return [];
        }
    }

    // Save the cart to localStorage
    function saveCart(cart) {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }

    // Handle adding product to cart
    function handleAddToCart(productName, price) {
        const cart = getCart();
        const existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += 1; // Update quantity
        } else {
            cart.push({ name: productName, price: price, quantity: 1 }); // Add new product
        }

        saveCart(cart); // Save updated cart
    }

    // Event listeners for 'add-to-cart' buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product') || 'Product';
            const price = parseFloat(this.getAttribute('data-price')) || 0;
            
            handleAddToCart(productName, price);
            showModal(`Product "${productName}" added to cart.`);
        });
    });

    // Event listeners for modal buttons
    closeBtn.addEventListener('click', hideModal);
    confirmCancelBtn.addEventListener('click', hideModal);
    confirmOkBtn.addEventListener('click', hideModal);

    // Close modal when clicking outside of modal-content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            hideModal();
        }
    });

} else {
    console.error('One or more required elements are missing.');
}

// Get the header element
const header = document.querySelector('header');

// Variables to track scroll position
let lastScrollTop = 0;
const delta = 5; // Minimum scroll amount to trigger show/hide
const headerHeight = header.offsetHeight;

// Handle scroll events
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > headerHeight) {
        if (scrollTop > lastScrollTop && (scrollTop - lastScrollTop) > delta) {
            header.classList.remove('header-visible');
        } else if (scrollTop < lastScrollTop && (lastScrollTop - scrollTop) > delta) {
            header.classList.add('header-visible');
        }
    }

    lastScrollTop = Math.max(scrollTop, 0);
}

// Initial setup: Ensure the header is visible on load
function initHeader() {
    header.classList.add('header-visible');
}

// Run initial setup
initHeader();

// Throttle scroll events for better performance
let scrollTimeout;
function throttleScroll() {
    if (!scrollTimeout) {
        scrollTimeout = requestAnimationFrame(() => {
            handleScroll();
            scrollTimeout = null;
        });
    }
}

// Event listener for scroll events
window.addEventListener('scroll', throttleScroll);


// Get menu elements
const menuIcon = document.getElementById('menu-icon');
const menu = document.getElementById('menu');

// Function to toggle the menu visibility
function toggleMenu() {
    if (menu.classList.contains('hidden') || menu.classList.contains('show')) {
        menu.classList.toggle('hidden'); // Toggle hidden class
        menu.classList.toggle('show');   // Toggle show class
    }
}

// Add event listener to menu icon
menuIcon.addEventListener('click', toggleMenu);

// Optional: Hide the menu when clicking outside of it
window.addEventListener('click', function(event) {
    if (!menuIcon.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.add('hidden');
        menu.classList.remove('show');
    }
});

