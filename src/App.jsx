/* App.jsx — the shell of the whole site.
   Holds which view is showing and which product is open.
   NavBar sits above everything; the footer sits below. */

import { useState } from 'react'
import './App.css'
import products from './data/products.json'

import NavBar from './components/NavBar'
import HomeView from './components/HomeView'
import ShopView from './components/ShopView'
import ProductDetailView from './components/ProductDetailView'

function App() {
  // Which screen is showing. Changing it with setView re-draws the page.
  const [view, setView] = useState('home')

  // Which product the detail view is showing (null = none picked yet).
  const [selectedId, setSelectedId] = useState(null)

  // The shopping cart. cartItems is the array of lines; the count below is
  // COMPUTED from it rather than kept as a separate variable (the spec forbids
  // tracking the count on its own — it must follow the state).
  const [cartItems, setCartItems] = useState([])

  const cartCount = cartItems.reduce((n, item) => n + item.quantity, 0)

  // find() returns undefined until something is selected, which is why the
  // detail block below checks for it before rendering.
  const selectedProduct = products.find((p) => p.id === selectedId)

  function openProduct(id) {
    setSelectedId(id)
    setView('detail')
    window.scrollTo({ top: 0 })
  }

  // Called by the detail view once size and color are both chosen. If the same
  // product+size+color is already in the cart, bump its quantity instead of
  // adding a duplicate line.
  function addToCart(line) {
    setCartItems((current) => {
      const match = current.find(
        (i) => i.id === line.id && i.size === line.size && i.color === line.color,
      )
      if (match) {
        return current.map((i) => (i === match ? { ...i, quantity: i.quantity + line.quantity } : i))
      }
      return [...current, line]
    })
  }

  return (
    <>
      <NavBar view={view} setView={setView} cartCount={cartCount} />

      <main>
        {view === 'home' && <HomeView setView={setView} />}

        {view === 'shop' && <ShopView products={products} onOpen={openProduct} />}

        {view === 'detail' && selectedProduct && (
          <ProductDetailView product={selectedProduct} onAddToCart={addToCart} />
        )}

        {/* every other view is still a placeholder */}
        {view !== 'home' && view !== 'shop' && view !== 'detail' && (
          <div className="container py-5">
            <h2 className="text-capitalize">{view}</h2>
            <p className="text-muted">This view gets built in a later step.</p>
          </div>
        )}
      </main>

      <footer className="bk-footer">
        <div className="container text-center">
          © 2026 Bay Kicks · CS351 Project 1 · Tien Vuong
        </div>
      </footer>
    </>
  )
}

export default App
