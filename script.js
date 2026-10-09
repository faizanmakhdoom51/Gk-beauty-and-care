// ============================================================
// EDIT YOUR PRODUCTS & PRICES HERE
// ============================================================
const products = [
  {
    id: 1,
    name: "Radiance Vitamin C Serum",
    category: "Skincare",
    price: 38.00, // <-- Edit price here
    currency: "$",
    description: "Brightens and evens skin tone with organic botanicals."
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    category: "Cosmetics",
    price: 24.50, // <-- Edit price here
    currency: "$",
    description: "Long-lasting hydration with richly pigmented botanical oils."
  },
  {
    id: 3,
    name: "Nourishing Argan Hair Oil",
    category: "Haircare",
    price: 32.00, // <-- Edit price here
    currency: "$",
    description: "Restores shine, eliminates frizz, and protects hair."
  },
  {
    id: 4,
    name: "Hydrating Rose Facial Mist",
    category: "Skincare",
    price: 22.00, // <-- Edit price here
    currency: "$",
    description: "Instant hydration refresh made with pure organic rosewater."
  },
  {
    id: 5,
    name: "Botanical Body Exfoliator",
    category: "Body Care",
    price: 28.50, // <-- Edit price here
    currency: "$",
    description: "Gently removes dead skin cells using natural sea salts."
  },
  {
    id: 6,
    name: "Glowing Silk Foundation",
    category: "Cosmetics",
    price: 42.00, // <-- Edit price here
    currency: "$",
    description: "Lightweight coverage for a naturally radiant complexation."
  }
];

// Shopping Cart State
let cart = [];
let selectedCategory = "all";

// DOM Elements
const productsGrid = document.getElementById("productsGrid");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartCount = document.getElementById("cartCount");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
});

// Render Products to Grid
function renderProducts(productList) {
  productsGrid.innerHTML = "";

  if (productList.length === 0) {
    productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888;">No products found in this category.</p>`;
    return;
  }

  productList.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div>
        <div class="product-badge">${product.category}</div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      </div>
      <div class="product-bottom">
        <span class="product-price">${product.currency}${product.price.toFixed(2)}</span>
        <button class="add-cart-btn" onclick="addToCart(${product.id})">Add to Bag</button>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// Filter by Category
function filterCategory(category, buttonElement) {
  selectedCategory = category;

  if (buttonElement) {
    document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
    buttonElement.classList.add("active");
  }

  filterProducts();
}

// Filter by Search Query & Category
function filterProducts() {
  const searchQuery = document.getElementById("searchInput").value.toLowerCase();

  const filtered = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  renderProducts(filtered);
}

// Cart Functions
function addToCart(productId) {
  const item = products.find((p) => p.id === productId);
  if (item) {
    cart.push(item);
    updateCartUI();
  }
}

function updateCartUI() {
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Your bag is currently empty.</p>`;
    cartTotalElement.textContent = "$0.00";
    return;
  }

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.currency}${item.price.toFixed(2)}</p>
      </div>
      <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;">&times;</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your shopping bag is empty!");
    return;
  }
  alert("Thank you for your order from GK Beauty and Care!");
  cart = [];
  updateCartUI();
  cartModal.classList.remove("active");
}

// Modal & Navigation Handlers
cartBtn.addEventListener("click", () => cartModal.classList.add("active"));
closeCart.addEventListener("click", () => cartModal.classList.remove("active"));

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
