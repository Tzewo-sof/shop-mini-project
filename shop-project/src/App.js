import React, { useState, useEffect } from "react";
import "./App.css";

// --- DATA: UPDATED HOODIE IMAGE ---
const productsData = [
  {
    id: 1,
    category: "FOOTWEAR",
    name: "Nike Air Jordans",
    price: 189,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=700&q=80",
  },
  {
    id: 2,
    category: "JACKETS",
    name: "Leather Biker Jacket",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=700&q=80",
  },
  {
    id: 3,
    category: "TOPS",
    name: "Essential White Tee",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&q=80",
  },
  {
    id: 4,
    category: "ACCESSORIES",
    name: "Silver Chrono Watch",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80",
  },
  {
    id: 5,
    category: "HEADWEAR",
    name: "Street Bucket Hat",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=700&q=80",
  },
  {
    id: 6,
    category: "FOOTWEAR",
    name: "Urban Runners",
    price: 140,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80",
  },
  // 👇 CHANGED THIS IMAGE 👇
  {
    id: 7,
    category: "TOPS",
    name: "Oversized Hoodie",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1512445239398-6d0c4c575b89?w=700&q=80",
  },
  {
    id: 8,
    category: "ACCESSORIES",
    name: "Tortoise Shell Shades",
    price: 160,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=700&q=80",
  },
];

const categories = ["ALL", "FOOTWEAR", "JACKETS", "TOPS", "ACCESSORIES"];

// --- ICONS ---
const TrashIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const MinusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <path d="M5 12h14" />
  </svg>
);

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("shockCart");
    return saved ? JSON.parse(saved) : [];
  });
  const [view, setView] = useState("home");
  const [activeCat, setActiveCat] = useState("ALL");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem("shockCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist) {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setNotification(`${product.name} SECURED.`);
    setTimeout(() => setNotification(null), 2000);
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((x) => x.id !== product.id));
  };

  const updateQuantity = (product, amount) => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist.qty + amount <= 0) {
      removeFromCart(product);
    } else {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + amount } : x,
        ),
      );
    }
  };

  const filteredProducts =
    activeCat === "ALL"
      ? productsData
      : productsData.filter((p) => p.category === activeCat);
  const totalAmount = cart.reduce(
    (acc, curr) => acc + curr.price * curr.qty,
    0,
  );
  const totalItems = cart.reduce((acc, curr) => acc + curr.qty, 0);

  return (
    <div className="app">
      {/* MARQUEE */}
      <div className="marquee-bar">
        <div className="marquee-content">
          <span>
            LIMITED STOCK /// WORLDWIDE SHIPPING /// SECURE THE DROP /// LIMITED
            STOCK /// WORLDWIDE SHIPPING /// SECURE THE DROP ///
          </span>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo" onClick={() => setView("home")}>
          VOLT<span>//FASHION</span>
        </div>

        <button className="nav-cart-btn" onClick={() => setView("cart")}>
          CART <span className="count">[{totalItems}]</span>
        </button>
      </nav>

      {/* NOTIFICATION */}
      {notification && <div className="toast">{notification}</div>}

      {/* HOME PAGE */}
      {view === "home" && (
        <main className="container fade-in">
          <div className="hero">
            <h1>
              NEXT GEN
              <br />
              <span className="outline">STREETWEAR.</span>
            </h1>
          </div>

          <div className="filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={
                  activeCat === cat ? "filter-btn active" : "filter-btn"
                }
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid">
            {filteredProducts.map((product) => (
              <div className="card" key={product.id}>
                <div className="card-image-box">
                  <img src={product.image} alt={product.name} />
                  <div className="hover-overlay"></div>
                </div>
                <div className="card-info">
                  <div>
                    <span className="cat-label">{product.category}</span>
                    <h3>{product.name}</h3>
                  </div>
                  <div className="card-action">
                    <span className="price">${product.price}</span>
                    <button
                      className="add-btn"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* CART PAGE */}
      {view === "cart" && (
        <main className="container fade-in">
          <div className="cart-header">
            <button className="back-btn" onClick={() => setView("home")}>
              ← CONTINUE
            </button>
            <h1>
              YOUR HAUL <span className="neon">///</span>
            </h1>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <h2>VOID.</h2>
              <button className="shop-btn" onClick={() => setView("home")}>
                BROWSE ITEMS
              </button>
            </div>
          ) : (
            <div className="cart-content">
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-row" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div className="row-details">
                      <h4>{item.name}</h4>
                      <p className="unit-price">${item.price}</p>
                    </div>

                    <div className="qty-box">
                      <button onClick={() => updateQuantity(item, -1)}>
                        <MinusIcon />
                      </button>
                      <span className="qty-num">{item.qty}</span>
                      <button onClick={() => updateQuantity(item, 1)}>
                        <PlusIcon />
                      </button>
                    </div>

                    <div className="row-total">${item.price * item.qty}</div>

                    <button
                      className="delete-btn"
                      onClick={() => removeFromCart(item)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>

              <div className="checkout-panel">
                <div className="summary-line">
                  <span>SUBTOTAL</span> <span>${totalAmount}</span>
                </div>
                <div className="total-line">
                  <span>TOTAL</span>
                  <span className="neon-text">${totalAmount}</span>
                </div>
                <button className="checkout-btn">CHECKOUT</button>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
