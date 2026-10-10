let products = [];
let cart = [];
let selectedCategory = "all";

const productsGrid = document.getElementById("productsGrid");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartCount = document.getElementById("cartCount");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('products.json');
    const data = await response.json();
    products = data.items || [];
    renderProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
    productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888;">Failed to load products.</p>`;
  }
});

function renderProducts(productList) {
  productsGrid.innerHTML = "";
  if (!productList || productList.length === 0) {
    productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888;">No products found.</p>`;
    return;
  }

  productList.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    
    let actionButtonHTML = product.inStock 
      ? `<button class="add-cart-btn" onclick="addToCart(${product.id})">Add to Bag</button>`
      : `<span class="sold-badge">Sold Out</span>`;

    card.innerHTML = `
      <div>
        <div class="product-img-container">
          <img src="${product.image}" alt="${product.name}" class="product-img" onerror="this.src='https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60'">
        </div>
        <div class="product-badge">${product.category}</div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      </div>
      <div class="product-bottom">
        <span class="product-price">${product.currency}${Number(product.price).toFixed(2)}</span>
        ${actionButtonHTML}
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

function filterCategory(category, buttonElement) {
  selectedCategory = category;
  if (buttonElement) {
    document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
    buttonElement.classList.add("active");
  }
  filterProducts();
}

function filterProducts() {
  const searchQuery = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });
  renderProducts(filtered);
}

function addToCart(productId) {
  const item = products.find((p) => p.id === productId);
  if (item && item.inStock) {
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
    total += Number(item.price);
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.currency}${Number(item.price).toFixed(2)}</p>
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

cartBtn.addEventListener("click", () => cartModal.classList.add("active"));
closeCart.addEventListener("click", () => cartModal.classList.remove("active"));
mobileMenuBtn.addEventListener("click", () => navLinks.classList.toggle("active"));
