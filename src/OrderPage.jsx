import { useState } from 'react';
import './OrderPage.css';

const OrderPage = ({ order, tableNumber, onOrderMore, onBackToHome, orderHistory }) => {
  const [showAllOrders, setShowAllOrders] = useState(false);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getOrderStatus = (orderTime) => {
    const now = new Date();
    const orderDate = new Date(orderTime);
    const diffMinutes = Math.floor((now - orderDate) / 60000);
    
    if (diffMinutes < 5) return { text: 'Preparing', class: 'preparing' };
    if (diffMinutes < 10) return { text: 'Cooking', class: 'cooking' };
    if (diffMinutes < 15) return { text: 'Almost Ready', class: 'almost-ready' };
    return { text: 'Ready', class: 'ready' };
  };

  return (
    <div className="order-page-container">
      {/* Background Animation */}
      <div className="order-emoji-cloud">
        <span>🥐</span> <span>🍕</span> <span>🥗</span> <span>☕</span> <span>🍰</span>
        <span>✓</span> <span>✨</span> <span>🎉</span>
      </div>

      {/* Header */}
      <div className="order-header">
        <button onClick={onBackToHome} className="order-home-btn">
          <span>🏠</span> Home
        </button>
        <h1 className="order-title">
          <span className="order-title-icon">🧾</span>
          Order Confirmation
        </h1>
        <div className="order-table-badge">Table {tableNumber}</div>
      </div>

      {/* Success Animation */}
      <div className="order-success-animation">
        <div className="checkmark-circle">
          <div className="checkmark-stem"></div>
          <div className="checkmark-kick"></div>
        </div>
        <h2 className="order-success-text">Order Placed Successfully!</h2>
        <p className="order-time-text">at {formatTime(order?.timestamp)}</p>
      </div>

      {/* Current Order Card */}
      {order && (
        <div className="current-order-card">
          <div className="order-card-header">
            <h3 className="order-card-title">
              <span className="order-card-icon">🛒</span>
              Current Order #{order.id.toString().slice(-6)}
            </h3>
            <div className={`order-status ${getOrderStatus(order.timestamp).class}`}>
              {getOrderStatus(order.timestamp).text}
            </div>
          </div>

          <div className="order-items-list">
            {order.items.map((item, index) => (
              <div key={index} className="order-item">
                <span className="order-item-emoji">{item.image}</span>
                <div className="order-item-details">
                  <span className="order-item-name">{item.name}</span>
                  <span className="order-item-quantity">x{item.quantity}</span>
                </div>
                <span className="order-item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="order-total-section">
            <div className="order-total-row">
              <span>Subtotal</span>
              <span>${order.total}</span>
            </div>
            <div className="order-total-row">
              <span>Tax (10%)</span>
              <span>${(parseFloat(order.total) * 0.1).toFixed(2)}</span>
            </div>
            <div className="order-grand-total">
              <span>Total</span>
              <span>${(parseFloat(order.total) * 1.1).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Order History Section */}
      {orderHistory.length > 1 && (
        <div className="order-history-section">
          <button 
            className="order-history-toggle"
            onClick={() => setShowAllOrders(!showAllOrders)}
          >
            <span className="history-icon">📋</span>
            {showAllOrders ? 'Hide' : 'Show'} Previous Orders ({orderHistory.length - 1})
          </button>

          {showAllOrders && (
            <div className="order-history-list">
              {orderHistory.slice(1).map((pastOrder, idx) => (
                <div key={idx} className="past-order-card">
                  <div className="past-order-header">
                    <span className="past-order-time">
                      {formatTime(pastOrder.timestamp)}
                    </span>
                    <span className="past-order-total">${pastOrder.total}</span>
                  </div>
                  <div className="past-order-items">
                    {pastOrder.items.map((item, i) => (
                      <span key={i} className="past-order-item">
                        {item.quantity}x {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="order-actions">
        <button className="order-more-btn" onClick={onOrderMore}>
          <span className="btn-icon">➕</span>
          Order More Food
        </button>
        <button className="order-done-btn" onClick={onBackToHome}>
          <span className="btn-icon">✓</span>
          Done
        </button>
      </div>

      {/* Order Summary Footer */}
      <div className="order-footer">
        <p className="order-footer-text">
          ✨ Your order will be delivered to Table {tableNumber} shortly
        </p>
        <p className="order-footer-small">
          Need help? Ask our staff or reorder from the menu
        </p>
      </div>
    </div>
  );
};

export default OrderPage;