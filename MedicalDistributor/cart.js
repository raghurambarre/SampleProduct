const products = JSON.parse(localStorage.getItem('products') || '[]');
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function renderCart() {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('cart-total').innerText = '';
        return;
    }
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-product';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:6px;display:inline-block;margin-right:12px;vertical-align:middle;" />
            <span style="vertical-align:middle;"><strong>${item.name}</strong> - ₹${item.price.toFixed(2)}<br>Quantity: ${item.qty || 1}</span>
            <button onclick="removeFromCart(${item.id})" style="margin-left:12px;">Remove</button>
        `;
        cartItems.appendChild(div);
        total += (item.price * (item.qty || 1));
    });
    document.getElementById('cart-total').innerText = `Total Price: ₹${total.toFixed(2)}`;
}

function removeFromCart(id) {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

document.getElementById('checkout-btn').onclick = function() {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Thank you for your purchase!');
        cart.length = 0;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
};

renderCart();
