const products = [
    { name: "منتج 1", image: "https://via.placeholder.com/250x250?text=منتج+1", price: 15.99, rating: 5 },
    { name: "منتج 2", image: "https://via.placeholder.com/250x250?text=منتج+2", price: 29.99, rating: 4 },
    { name: "منتج 3", image: "https://via.placeholder.com/250x250?text=منتج+3", price: 9.99, rating: 4 },
    { name: "منتج 4", image: "https://via.placeholder.com/250x250?text=منتج+4", price: 24.99, rating: 5 },
    { name: "منتج 5", image: "https://via.placeholder.com/250x250?text=منتج+5", price: 39.99, rating: 3 },
    { name: "منتج 6", image: "https://via.placeholder.com/250x250?text=منتج+6", price: 89.99, rating: 5 },
];

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    const name = document.createElement('h3');
    name.textContent = product.name;

    const rating = document.createElement('div');
    rating.className = 'rating';
    rating.innerHTML = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);

    const price = document.createElement('p');
    price.textContent = `${product.price.toFixed(2)} د.ت`;

    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'add-to-cart';
    addToCartBtn.textContent = 'أضف إلى السلة';
    addToCartBtn.addEventListener('click', () => {
        addToCart(product);
    });

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(rating);
    card.appendChild(price);
    card.appendChild(addToCartBtn);

    return card;
}

function populateProducts() {
    const productGrid = document.getElementById('productGrid');
    products.forEach((product, index) => {
        const card = createProductCard(product);
        card.style.animationDelay = `${index * 0.1}s`;
        productGrid.appendChild(card);
    });
}

function addToCart(product) {
    const cartCount = document.getElementById('cart-count');
    const currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + 1;

    // Animation for cart icon
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
        cartIcon.style.animation = '';
    }, 500);

    // Show added to cart message
    const message = document.createElement('div');
    message.textContent = 'تمت الإضافة إلى السلة';
    message.style.position = 'fixed';
    message.style.top = '20px';
    message.style.right = '20px';
    message.style.backgroundColor = 'var(--primary-color)';
    message.style.color = 'white';
    message.style.padding = '10px 20px';
    message.style.borderRadius = '5px';
    message.style.zIndex = '1000';
    message.style.opacity = '0';
    message.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    document.body.appendChild(message);

    setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = 'translateY(20px)';
    }, 10);

    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(0)';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    populateProducts();

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const hero = document.getElementById('hero');
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // Add hover effect to social media icons
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.animation = 'pulse 0.5s infinite';
        });
        icon.addEventListener('mouseout', () => {
            icon.style.animation = '';
        });
    });

    // Add scroll reveal effect to product cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});