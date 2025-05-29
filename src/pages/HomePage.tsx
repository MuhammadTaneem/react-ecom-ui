import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ProductCard from '../components/shop/ProductCard';
import { ArrowRight, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import { useState } from 'react';
import sampleProducts from '../data/sampleProducts';

const HomePage = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use sample products if products is empty
  const allProducts = products.length > 0 ? products : sampleProducts;
  
  // Filter featured products
  const featuredProducts = allProducts.filter(product => product.featured).slice(0, 8);
  
  // Get latest products (using the most recent ones)
  const latestProducts = [...allProducts]
    .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime())
    .slice(0, 4);
  
  // Get products with discount
  const discountProducts = allProducts
    .filter(product => product.discount_price && parseFloat(product.discount_price) < parseFloat(product.base_price))
    .slice(0, 4);

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 py-16 sm:py-24">
        <div className="container-custom relative z-10 text-center">
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Modern Fashion for Modern People
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
            Discover the latest trends and styles that define modern fashion. High-quality clothing for every occasion.
          </p>
          
          {/* Search bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="mx-auto mb-8 flex max-w-md flex-col sm:flex-row"
          >
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for products..."
                className="h-12 w-full rounded-md rounded-r-none border-gray-300 pl-10 pr-4 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:rounded-r-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            <Button type="submit" className="mt-2 rounded-l-none sm:mt-0">
              Search
            </Button>
          </form>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products/man">
              <Button size="lg">Shop Men</Button>
            </Link>
            <Link to="/products/woman">
              <Button variant="outline" size="lg" className="bg-white text-gray-900 border-white hover:bg-gray-100">
                Shop Women
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
      </section>
      
      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="container-custom">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold sm:text-3xl">Featured Products</h2>
              <Link to="/products" className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {featuredProducts.length > 4 && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredProducts.slice(4, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Categories Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-800/50">
        <div className="container-custom">
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">Shop by Category</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link 
              to="/products/man" 
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              <img
                src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Men's Collection"
                className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40">
                <h3 className="text-2xl font-bold text-white">Men</h3>
              </div>
            </Link>
            
            <Link 
              to="/products/woman" 
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              <img
                src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Women's Collection"
                className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40">
                <h3 className="text-2xl font-bold text-white">Women</h3>
              </div>
            </Link>
            
            <Link 
              to="/products/man-tshirt" 
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              <img
                src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="T-Shirts Collection"
                className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40">
                <h3 className="text-2xl font-bold text-white">T-Shirts</h3>
              </div>
            </Link>
            
            <Link 
              to="/products/woman-dress" 
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              <img
                src="https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Dresses Collection"
                className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40">
                <h3 className="text-2xl font-bold text-white">Dresses</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Latest Products */}
      {latestProducts.length > 0 && (
        <section className="py-16">
          <div className="container-custom">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold sm:text-3xl">Latest Arrivals</h2>
              <Link to="/products?sort=newest" className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {latestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Discount Products */}
      {discountProducts.length > 0 && (
        <section className="bg-red-50 py-16 dark:bg-red-900/10">
          <div className="container-custom">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold sm:text-3xl">Special Offers</h2>
              <Link to="/products?discount=true" className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {discountProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Promo Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="overflow-hidden rounded-lg bg-primary-600 dark:bg-primary-900">
            <div className="grid md:grid-cols-2">
              <div className="p-8 sm:p-12 md:p-16">
                <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                  Summer Collection 2025
                </h2>
                <p className="mb-8 text-lg text-primary-100">
                  Get ready for summer with our latest collection. Lightweight fabrics, vibrant colors, and stylish designs for the perfect summer look.
                </p>
                <Link to="/products">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-primary-600"
                  >
                    Shop Now
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block relative h-full w-full">
                <img
                  src="https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Summer Collection"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;