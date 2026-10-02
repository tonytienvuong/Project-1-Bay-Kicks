/* ProductCard.jsx — one product, drawn from one object.
   Props: product (the object), onOpen (called with the product id when clicked).

   Kept deliberately plain: name, description, price, rating. No brand eyebrow and
   no "New" badge — fewer elements per card reads calmer. */

function ProductCard({ product, onOpen }) {
  // salePrice is null for most products, so only strike through a price on sale.
  const onSale = product.salePrice !== null && product.salePrice < product.price

  return (
    <article
      className="bk-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(product.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(product.id)
        }
      }}
      aria-label={'View details for ' + product.name}
    >
      <div className="bk-card-media">
        <img className="bk-card-img" src={product.image} alt={product.name} />
      </div>

      <div className="bk-card-body">
        <h3 className="bk-card-name">{product.name}</h3>
        <p className="bk-card-desc">{product.description}</p>

        <div className="bk-card-foot">
          <span className="bk-price">
            ${onSale ? product.salePrice.toFixed(2) : product.price.toFixed(2)}
            {onSale && <span className="bk-price-was">${product.price.toFixed(2)}</span>}
          </span>
          <span className="bk-rating">★ {product.rating}</span>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
