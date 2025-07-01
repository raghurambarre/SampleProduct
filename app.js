const products = [
    { id: 1, name: "Digital Thermometer", price: 10.99, description: "Accurate and fast temperature readings.", image: "images/11.jpeg", images: ["images/11.jpeg", "images/11_2.jpeg"] },
    { id: 2, name: "Blood Pressure Monitor", price: 39.99, description: "Easy-to-use digital BP monitor.", image: "images/12.jpeg", images: ["images/12.jpeg", "images/12_2.jpeg"] },
    { id: 3, name: "Face Mask (50 pcs)", price: 7.99, description: "Disposable 3-ply face masks.", image: "images/13.jpeg", images: ["images/13.jpeg", "images/13_2.jpeg"] },
    { id: 4, name: "Hand Sanitizer (500ml)", price: 4.99, description: "Kills 99.9% of germs.", image: "images/14.jpeg", images: ["images/14.jpeg", "images/14_2.jpeg"] }
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
            <img src="${product.image}" alt="${product.name}" style="width:100%;max-width:100%;height:auto;object-fit:cover;border-radius:8px;display:block;margin:0 auto 8px auto;box-sizing:border-box;cursor:pointer;" onclick="showImageModal(${product.id})" />
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

window.showImageModal = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalThumbs = document.getElementById('modal-thumbnails');
    let currentIndex = 0;
    function showImage(idx) {
        modalImg.src = product.images[idx];
        currentIndex = idx;
    }
    showImage(0);
    modalThumbs.innerHTML = '';
    product.images.forEach((img, idx) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.style.width = '60px';
        thumb.style.height = '60px';
        thumb.style.objectFit = 'cover';
        thumb.style.borderRadius = '6px';
        thumb.style.cursor = 'pointer';
        thumb.onclick = () => showImage(idx);
        modalThumbs.appendChild(thumb);
    });
    // Add slider controls
    let leftBtn = document.getElementById('modal-left');
    let rightBtn = document.getElementById('modal-right');
    if (!leftBtn) {
        leftBtn = document.createElement('span');
        leftBtn.id = 'modal-left';
        leftBtn.innerHTML = '&#8592;';
        leftBtn.style.position = 'absolute';
        leftBtn.style.left = '10px';
        leftBtn.style.top = '50%';
        leftBtn.style.fontSize = '2rem';
        leftBtn.style.cursor = 'pointer';
        leftBtn.style.userSelect = 'none';
        leftBtn.style.transform = 'translateY(-50%)';
        leftBtn.onclick = function(e) {
            e.stopPropagation();
            showImage((currentIndex - 1 + product.images.length) % product.images.length);
        };
        modalImg.parentNode.appendChild(leftBtn);
    }
    if (!rightBtn) {
        rightBtn = document.createElement('span');
        rightBtn.id = 'modal-right';
        rightBtn.innerHTML = '&#8594;';
        rightBtn.style.position = 'absolute';
        rightBtn.style.right = '10px';
        rightBtn.style.top = '50%';
        rightBtn.style.fontSize = '2rem';
        rightBtn.style.cursor = 'pointer';
        rightBtn.style.userSelect = 'none';
        rightBtn.style.transform = 'translateY(-50%)';
        rightBtn.onclick = function(e) {
            e.stopPropagation();
            showImage((currentIndex + 1) % product.images.length);
        };
        modalImg.parentNode.appendChild(rightBtn);
    }
    modal.style.display = 'flex';
};

document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    // Remove slider controls when modal closes
    const closeModal = document.getElementById('close-modal');
    if (closeModal) {
        closeModal.onclick = function() {
            document.getElementById('image-modal').style.display = 'none';
            let leftBtn = document.getElementById('modal-left');
            let rightBtn = document.getElementById('modal-right');
            if (leftBtn) leftBtn.remove();
            if (rightBtn) rightBtn.remove();
        };
    }
    document.getElementById('image-modal').onclick = function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            let leftBtn = document.getElementById('modal-left');
            let rightBtn = document.getElementById('modal-right');
            if (leftBtn) leftBtn.remove();
            if (rightBtn) rightBtn.remove();
        }
    };
});

renderProducts();
