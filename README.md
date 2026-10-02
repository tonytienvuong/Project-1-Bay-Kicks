# Bay Kicks — CS351 Project 1

A single-page storefront for a fictional sneaker shop, built with React, Vite and
Bootstrap 5. Everything runs in the browser — no server, no database.

## Run it locally

    npm install
    npm run dev

Then open the URL Vite prints (http://localhost:5173 by default).

## Build for deployment

    npm run build      # writes dist/
    npm run preview    # serves dist/ locally to check it

## What is in here

    index.html                 page shell — Vite mounts React into #root
    src/main.jsx               entry point; imports Bootstrap CSS + JS, then App
    src/App.jsx                holds the current view and the cart state (useState)
    src/index.css              colour palette
    src/App.css                component styling for every view
    src/data/products.json     25 products, one category (sneakers)
    src/components/
      NavBar.jsx               Home / Shop / Account / Cart + live cart count
      HomeView.jsx             entrance page
      ShopView.jsx             product grid with pagination, 10 per page
      ProductList.jsx          renders one ProductCard per product with .map()
      ProductCard.jsx          one product in the grid
      ProductDetailView.jsx    full product page: options, quantity, Add to Cart

## Product images

The 25 product photos in `public/images/` come from Wikimedia Commons. Each one's
author, licence and source page is recorded in `public/images/CREDITS.json`.

## Notes

Vite + React scaffold generated with `npm create vite@latest`.
