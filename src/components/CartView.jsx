/* CartView.jsx — the shopping cart page.
   Props: items (the cart array held in App), setView, and the three line handlers.

   Receives the array as a prop and uses .map() to render one CartItem per line —
   the spec names .map() explicitly for the cart, same as for ProductList.

   The subtotal and the total item count are both COMPUTED from the array here with
   reduce(). Nothing is stored separately, which is the rule the spec sets: the count
   and subtotal must be derived from cart state, not kept as their own variables.

   Empty cart gets its own short view instead of an empty list. */

import CartItem from './CartItem'

function CartView({ items, onIncrease, onDecrease, onRemove, setView }) {
  if (items.length === 0) {
    return (
      <section className="bk-section">
        <div className="container text-center">
          <h2 className="bk-section-title">Your cart is empty</h2>
          <p className="bk-section-sub">Nothing in here yet.</p>
          <button className="btn btn-bk" onClick={() => setView('shop')}>
            Shop the collection
          </button>
        </div>
      </section>
    )
  }

  // itemCount — how many pairs in total (quantities summed)
  // subtotal  — the money: unit price x quantity, per line
  const itemCount = items.reduce((n, item) => n + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)

  return (
    <section className="bk-section">
      <div className="container">
        <h2 className="bk-section-title">Your cart</h2>
        <p className="bk-section-sub">
          {itemCount} {itemCount === 1 ? 'pair' : 'pairs'} in your cart
        </p>

        <div className="bk-cart-list">
          {items.map((item) => (
            <CartItem
              key={item.id + '-' + item.size + '-' + item.color}
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          ))}
        </div>

        <div className="bk-cart-total">
          <div className="bk-cart-total-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="bk-cart-total-row">
            <span>Items</span>
            <strong>{itemCount}</strong>
          </div>

          <button className="btn btn-bk w-100 mt-3" onClick={() => setView('shop')}>
            Keep shopping
          </button>
        </div>
      </div>
    </section>
  )
}

export default CartView
