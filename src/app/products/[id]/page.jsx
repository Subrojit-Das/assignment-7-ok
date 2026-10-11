import React, { Suspense } from 'react';
import ProductDetails from '../../itemsDetails/productDetails';

const ProductPage = async ({ params }) => {
  const resolvedParams = await params;
  const id = resolvedParams?.id || '';

  let product = null;

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products/${id}`
    );
    if (res.ok) {
      product = await res.json();
    }
  } catch (error) {
    console.log("Data fetch error:", error);
  }

  return (
    <Suspense fallback={<div>Loading product details...</div>}>
      <ProductDetails product={product} />
    </Suspense>
  );
};

export default ProductPage;