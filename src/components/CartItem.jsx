/* CartItem.jsx — one line in the shopping cart.
   Props: item (one cart line) plus three handlers passed down from App:
     onIncrease(id, size, color)   add one to this line
     onDecrease(id, size, color)   take one off this line
     onRemove(id, size, color)     drop this line

   A line is identified by product id + size + color, because the same shoe in a
   different size is a different line.

   The line total is unit price times quantity — worked out here, never stored.
   The − and + buttons carry their own limits: − dies at quantity 1, + dies at the
   product's stock. */

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const lineTotal = item.unitPrice * item.quantity

  return (
    <div className="bk-cart-item">
      <img className="bk-cart-img" src={item.image} alt={item.name} />

      <div className="bk-cart-info">
        <h3 className="bk-cart-name">{item.name}</h3>
        <p className="bk-cart-options">Size {item.size} · {item.color}</p>
        <p className="bk-cart-unit">${item.unitPrice.toFixed(2)} each</p>
      </div>

      <div className="bk-cart-qty">
        <button
          className="bk-qty-btn"
          onClick={() => onDecrease(item.id, item.size, item.color)}
          disabled={item.quantity <= 1}
          aria-label={'Decrease quantity of ' + item.name}
        >
          −
        </button>

        <span className="bk-qty-value">{item.quantity}</span>

        <button
          className="bk-qty-btn"
          onClick={() => onIncrease(item.id, item.size, item.color)}
          disabled={item.quantity >= item.stock}
          aria-label={'Increase quantity of ' + item.name}
        >
          +
        </button>
      </div>

      <p className="bk-cart-line-total">${lineTotal.toFixed(2)}</p>

      <button
        className="bk-cart-remove"
        onClick={() => onRemove(item.id, item.size, item.color)}
      >
        Remove
      </button>
    </div>
  )
}

export default CartItem
