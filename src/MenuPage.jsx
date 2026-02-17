import { useState, useEffect } from "react";
import "./MenuPage.css";

const MenuPage = ({
  tableNumber,
  onBackToTables,
  onBackToHome,
  onPlaceOrder,
  orderHistory,
}) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [animation, setAnimation] = useState("");
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  // Menu data with 30+ items
  const menuItems = [
    // Breakfast (7 items)
    {
      id: 1,
      name: "Classic Pancakes",
      category: "breakfast",
      price: 8.99,
      image: "🥞",
      description: "Fluffy pancakes with maple syrup",
    },
    {
      id: 2,
      name: "Belgian Waffle",
      category: "breakfast",
      price: 9.99,
      image: "🧇",
      description: "Crispy waffle with berries",
    },
    {
      id: 3,
      name: "French Toast",
      category: "breakfast",
      price: 8.49,
      image: "🍞",
      description: "Brioche with cinnamon",
    },
    {
      id: 4,
      name: "Breakfast Burrito",
      category: "breakfast",
      price: 10.99,
      image: "🌯",
      description: "Eggs, bacon, cheese",
    },
    {
      id: 5,
      name: "Omelette",
      category: "breakfast",
      price: 7.99,
      image: "🍳",
      description: "Three-egg with vegetables",
    },
    {
      id: 6,
      name: "Avocado Toast",
      category: "breakfast",
      price: 6.99,
      image: "🥑",
      description: "Sourdough with avocado",
    },
    {
      id: 7,
      name: "Granola Bowl",
      category: "breakfast",
      price: 5.99,
      image: "🥣",
      description: "Yogurt with granola",
    },

    // Beverages (8 items)
    {
      id: 8,
      name: "Espresso",
      category: "beverages",
      price: 2.99,
      image: "☕",
      description: "Single shot espresso",
    },
    {
      id: 9,
      name: "Cappuccino",
      category: "beverages",
      price: 3.99,
      image: "☕",
      description: "Espresso with steamed milk",
    },
    {
      id: 10,
      name: "Latte",
      category: "beverages",
      price: 4.49,
      image: "🥛",
      description: "Smooth and creamy",
    },
    {
      id: 11,
      name: "Mocha",
      category: "beverages",
      price: 4.99,
      image: "🍫",
      description: "Chocolate espresso",
    },
    {
      id: 12,
      name: "Hot Chocolate",
      category: "beverages",
      price: 3.99,
      image: "🍫",
      description: "Rich and creamy",
    },
    {
      id: 13,
      name: "Fresh Juice",
      category: "beverages",
      price: 4.99,
      image: "🧃",
      description: "Orange, apple or carrot",
    },
    {
      id: 14,
      name: "Smoothie",
      category: "beverages",
      price: 5.99,
      image: "🥤",
      description: "Berry or mango",
    },
    {
      id: 15,
      name: "Iced Tea",
      category: "beverages",
      price: 3.49,
      image: "🧋",
      description: "Peach or lemon",
    },

    // Appetizers (6 items)
    {
      id: 16,
      name: "Nachos",
      category: "appetizers",
      price: 7.99,
      image: "🫓",
      description: "With cheese and salsa",
    },
    {
      id: 17,
      name: "Spring Rolls",
      category: "appetizers",
      price: 6.99,
      image: "🥟",
      description: "Vegetable or chicken",
    },
    {
      id: 18,
      name: "Mozzarella Sticks",
      category: "appetizers",
      price: 7.49,
      image: "🧀",
      description: "With marinara sauce",
    },
    {
      id: 19,
      name: "Chicken Wings",
      category: "appetizers",
      price: 9.99,
      image: "🍗",
      description: "Buffalo or BBQ",
    },
    {
      id: 20,
      name: "Garlic Bread",
      category: "appetizers",
      price: 4.99,
      image: "🥖",
      description: "With herbs",
    },
    {
      id: 21,
      name: "Bruschetta",
      category: "appetizers",
      price: 6.49,
      image: "🍅",
      description: "Tomato and basil",
    },

    // Main Course (7 items)
    {
      id: 22,
      name: "Chicken Burger",
      category: "mains",
      price: 12.99,
      image: "🍔",
      description: "Grilled chicken with fries",
    },
    {
      id: 23,
      name: "Beef Burger",
      category: "mains",
      price: 13.99,
      image: "🍔",
      description: "Angus beef with cheddar",
    },
    {
      id: 24,
      name: "Club Sandwich",
      category: "mains",
      price: 11.99,
      image: "🥪",
      description: "Triple-decker with bacon",
    },
    {
      id: 25,
      name: "Caesar Salad",
      category: "mains",
      price: 9.99,
      image: "🥗",
      description: "With grilled chicken",
    },
    {
      id: 26,
      name: "Pasta Alfredo",
      category: "mains",
      price: 11.99,
      image: "🍝",
      description: "Creamy parmesan",
    },
    {
      id: 27,
      name: "Pizza Margherita",
      category: "mains",
      price: 13.99,
      image: "🍕",
      description: "Fresh basil and mozzarella",
    },
    {
      id: 28,
      name: "Fish & Chips",
      category: "mains",
      price: 14.99,
      image: "🐟",
      description: "Beer-battered cod",
    },

    // Desserts (7 items)
    {
      id: 29,
      name: "Cheesecake",
      category: "desserts",
      price: 5.99,
      image: "🍰",
      description: "New York style",
    },
    {
      id: 30,
      name: "Chocolate Cake",
      category: "desserts",
      price: 5.49,
      image: "🍫",
      description: "Rich chocolate layers",
    },
    {
      id: 31,
      name: "Ice Cream",
      category: "desserts",
      price: 3.99,
      image: "🍦",
      description: "Vanilla, chocolate or strawberry",
    },
    {
      id: 32,
      name: "Brownie",
      category: "desserts",
      price: 4.49,
      image: "🍪",
      description: "With walnuts",
    },
    {
      id: 33,
      name: "Apple Pie",
      category: "desserts",
      price: 4.99,
      image: "🥧",
      description: "With cinnamon",
    },
    {
      id: 34,
      name: "Tiramisu",
      category: "desserts",
      price: 6.49,
      image: "🍮",
      description: "Italian classic",
    },
    {
      id: 35,
      name: "Crème Brûlée",
      category: "desserts",
      price: 5.99,
      image: "🍮",
      description: "Vanilla bean",
    },
  ];

  const categories = [
    { id: "all", name: "All", icon: "🍽️" },
    { id: "breakfast", name: "Breakfast", icon: "🍳" },
    { id: "beverages", name: "Beverages", icon: "☕" },
    { id: "appetizers", name: "Appetizers", icon: "🥟" },
    { id: "mains", name: "Main Course", icon: "🍔" },
    { id: "desserts", name: "Desserts", icon: "🍰" },
  ];

  // Filter items based on category and search
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart functions
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    setAnimation("cart-bump");
    setTimeout(() => setAnimation(""), 300);
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, change) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) {
              return null;
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const getCartTotal = () => {
    return cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const placeOrder = () => {
    if (cart.length === 0) return;

    const orderData = {
      items: cart,
      total: getCartTotal(),
      itemCount: getCartItemCount(),
      timestamp: new Date().toISOString(),
    };

    onPlaceOrder(orderData);
    setCart([]);
    setShowCart(false);
    setShowOrderSuccess(true);
    setTimeout(() => setShowOrderSuccess(false), 3000);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const getOrderTotal = (order) => {
    return order.items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="menu-page-container">
      {/* Background Animation */}
      <div className="menu-emoji-cloud">
        <span>🥐</span> <span>🍕</span> <span>🥗</span> <span>☕</span>{" "}
        <span>🍰</span>
        <span>🍔</span> <span>🍣</span> <span>🥑</span> <span>🍩</span>{" "}
        <span>🥪</span>
      </div>

      {/* Header */}
      <div className="menu-header">
        <div className="menu-header-left">
          <button onClick={onBackToTables} className="menu-back-btn">
            <span>←</span> Tables
          </button>
          <button onClick={onBackToHome} className="menu-home-btn">
            <span>🏠</span>
          </button>
        </div>

        <div className="menu-header-center">
          <h1 className="menu-title">
            <span className="menu-title-icon">🍽️</span>
            Table {tableNumber} · Menu
          </h1>
        </div>

        <div className="menu-header-right">
          {/* Orders Icon */}
          <button
            className={`orders-icon-btn ${orderHistory.length > 0 ? "has-orders" : ""}`}
            onClick={() => setShowOrders(!showOrders)}
          >
            <span className="orders-icon">📋</span>
            {orderHistory.length > 0 && (
              <span className="orders-badge">{orderHistory.length}</span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            className={`cart-icon-btn ${animation}`}
            onClick={() => setShowCart(!showCart)}
          >
            <span className="cart-icon">🛒</span>
            {getCartItemCount() > 0 && (
              <span className="cart-badge">{getCartItemCount()}</span>
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="menu-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Categories */}
      <div className="categories-container">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? "active" : ""}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="menu-grid-container">
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="menu-item-card">
              <div className="menu-item-image">
                <span className="menu-item-emoji">{item.image}</span>
              </div>
              <div className="menu-item-content">
                <h3 className="menu-item-name">{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                <div className="menu-item-footer">
                  <span className="menu-item-price">
                    ${item.price.toFixed(2)}
                  </span>
                  {cart.find((i) => i.id === item.id) ? (
                    <div className="grid-quantity-container">
                      <button
                        className="grid-quantity-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="grid-quantity-number">
                        {cart.find(i => i.id === item.id).quantity}
                      </span>
                      <button
                        className="grid-quantity-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  ) : (
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(item)}
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="no-items">
            <span className="no-items-icon">🔍</span>
            <p>No items found</p>
          </div>
        )}
      </div>

      {/* Order Success Popup */}
      {showOrderSuccess && (
        <div className="order-success-popup">
          <div className="order-success-content">
            <div className="order-success-icon">✓</div>
            <h3>Order Placed!</h3>
            <p>Your order has been sent to the kitchen</p>
          </div>
        </div>
      )}

      {/* Orders Sidebar */}
      {showOrders && (
        <div className="orders-sidebar">
          <div className="orders-header">
            <h2 className="orders-title">
              <span className="orders-title-icon">📋</span>
              Order History · Table {tableNumber}
            </h2>
            <button
              className="orders-close"
              onClick={() => setShowOrders(false)}
            >
              ✕
            </button>
          </div>

          <div className="orders-items">
            {orderHistory.length === 0 ? (
              <div className="orders-empty">
                <span className="orders-empty-icon">📭</span>
                <h3>No previous orders</h3>
                <p>Your order history will appear here</p>
              </div>
            ) : (
              orderHistory.map((order, index) => (
                <div key={index} className="order-history-card">
                  <div className="order-history-header">
                    <div className="order-history-info">
                      <span className="order-history-time">
                        {formatTime(order.timestamp)}
                      </span>
                      <span className="order-history-date">
                        {formatDate(order.timestamp)}
                      </span>
                    </div>
                    <span className="order-history-total">${order.total}</span>
                  </div>

                  <div className="order-history-items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-history-item">
                        <span className="order-history-item-emoji">
                          {item.image}
                        </span>
                        <span className="order-history-item-name">
                          {item.name}{" "}
                          <span className="order-history-item-qty">
                            x{item.quantity}
                          </span>
                        </span>
                        <span className="order-history-item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="order-history-footer">
                    <span className="order-history-status">✓ Completed</span>
                    <span className="order-history-items-count">
                      {order.items.length} item
                      {order.items.length > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {orderHistory.length > 0 && (
            <div className="orders-footer">
              <div className="orders-total-spent">
                <span>Total spent today:</span>
                <span className="orders-total-amount">
                  $
                  {orderHistory
                    .reduce((sum, order) => sum + parseFloat(order.total), 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="cart-sidebar">
          <div className="cart-header">
            <h2 className="cart-title">
              <span className="cart-title-icon">🛒</span>
              Your Cart · Table {tableNumber}
            </h2>
            <button className="cart-close" onClick={() => setShowCart(false)}>
              ✕
            </button>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="cart-empty">
                <span className="cart-empty-icon">🛒</span>
                <p>Your cart is empty</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-emoji">{item.image}</span>
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <span className="cart-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-quantity">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="quantity-number">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span className="cart-total-amount">${getCartTotal()}</span>
              </div>
              <button className="place-order-btn" onClick={placeOrder}>
                Place Order · Table {tableNumber}
              </button>
              <p className="cart-note">✓ Free delivery to your table</p>
            </div>
          )}
        </div>
      )}

      {/* Overlay when cart or orders is open */}
      {(showCart || showOrders) && (
        <div
          className="cart-overlay"
          onClick={() => {
            setShowCart(false);
            setShowOrders(false);
          }}
        />
      )}
    </div>
  );
};

export default MenuPage;
