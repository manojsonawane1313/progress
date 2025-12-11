document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    // Define a mapping of product names to image URLs
    const productImages = {
        tomato: 'tomato.jpg',
        carrot: 'carrot.jpg',
        beans: 'beans.jpg',
        bitterGourd: 'bitterGourd.jpg',
        bottleGourd: 'bottleGourd.jpg',
        brinjal: 'brinjal.jpg',
        cabbage: 'cabbage.jpg',
        cauliflower: 'cauliflower.jpg',
        clusterBeans: 'clusterBeans.jpg',
        cowPeas: 'cowPeas.jpg',
        drumsticks: 'drumsticks.jpg',
        onion: 'onion.jpg',
        potato: 'potato.jpg',
        ridgeGourd: 'ridgeGourd.jpg',
        sweetPotato: 'sweetPotato.jpg',
        yam: 'yam.jpg'
    };

    // Function to get the cart from localStorage
    function getCart() {
        try {
            const cart = localStorage.getItem('cart');
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Failed to retrieve cart from localStorage:', error);
            return [];
        }
    }

    // Function to save the cart to localStorage
    function saveCart(cart) {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }

    // Function to handle removing a product from the cart
    function removeFromCart(productName) {
        const cart = getCart();
        const updatedCart = cart.filter(item => item.name !== productName);
        saveCart(updatedCart);
        displayCartItems(); // Update the display after removing
    }

    // Function to display cart items
    function displayCartItems() {
        const cart = getCart();

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartItemsContainer.innerHTML = ''; // Clear any previous content
        } else {
            emptyCartMessage.style.display = 'none';
            cartItemsContainer.innerHTML = ''; // Clear any previous content

            let totalPrice = 0;
            let totalQuantity = 0;

            cart.forEach(item => {
                if (item && item.name && item.price !== undefined && item.quantity !== undefined) {
                    totalPrice += item.price * item.quantity;
                    totalQuantity += item.quantity;

                    const itemElement = document.createElement('div');
                    itemElement.classList.add('cart-item');
                    
                    // Get the product image URL
                    const imageUrl = productImages[item.name] || 'default.jpg';

                    itemElement.innerHTML = `
                        <img src="${imageUrl}" alt="${item.name}" class="product-image">
                        <div class="item-details">
                            <h2>${item.name}</h2>
                            <p>Price: Rs.${item.price} per kg</p>
                            <p>Quantity: ${item.quantity}</p>
                            <p>Total: Rs.${item.price * item.quantity}</p>
                            <button class="remove-btn" data-product="${item.name}">Remove</button>
                        </div>
                    `;
                    cartItemsContainer.appendChild(itemElement);
                } else {
                    console.warn('Skipping invalid item:', item);
                }
            });

            // Add a summary section
            const summaryElement = document.createElement('div');
            summaryElement.classList.add('cart-summary');
            summaryElement.innerHTML = `
                <h2>Cart Summary</h2>
                <p>Total Quantity: ${totalQuantity}</p>
                <p>Total Price: Rs.${totalPrice}</p>
            `;
            cartItemsContainer.appendChild(summaryElement);

            // Add event listeners for remove buttons
            document.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const productName = this.getAttribute('data-product');
                    removeFromCart(productName);
                });
            });
        }
    }

    // Initial setup
    displayCartItems();
});
