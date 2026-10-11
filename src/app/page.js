import HeroBanner from "./components/banner";
import PriceUpProducts from "./items/upProducts";
import PriceDownProducts from "./items/downProducts";
import AllProducts from "./items/allProducts";

export default function Home() {
  return (
    <main className="space-y-6 py-4">
      <HeroBanner />
      <PriceUpProducts />
      <PriceDownProducts />
      <AllProducts />
    </main>
  );
}