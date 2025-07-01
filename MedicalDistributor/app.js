const products = [
    { id: 1, name: "Digital Thermometer", price: 10.99, description: "Accurate and fast temperature readings.", image: "images/11.jpeg" },
    { id: 2, name: "Blood Pressure Monitor", price: 39.99, description: "Easy-to-use digital BP monitor.", image: "images/12.jpeg" },
    { id: 3, name: "Face Mask (50 pcs)", price: 7.99, description: "Disposable 3-ply face masks.", image: "images/13.jpeg" },
    { id: 4, name: "Hand Sanitizer (500ml)", price: 4.99, description: "Kills 99.9% of germs.", image: "images/14.jpeg" }
];

localStorage.setItem('products', JSON.stringify(products));

let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width:100px;height:100px;object-fit:cover;border-radius:8px;display:block;margin-bottom:8px;" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>₹${product.price.toFixed(2)}</strong></p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
}

function addToCart(id) {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const product = products.find(p => p.id === id);
    if (product) {
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.qty = (cartItem.qty || 1) + 1;
        } else {
            cart.push({ ...product, qty: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart!');
    }
}

renderProducts();
