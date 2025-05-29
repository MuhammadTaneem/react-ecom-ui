import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { Card, CardContent, CardFooter, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import { useCart } from '../../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Prepare product for cart
    const productToAdd = {
      ...product,
      price: parseFloat(product.discount_price || product.base_price),
      image: product.images && product.images.length > 0 
        ? product.images[0].image 
        : product.thumbnail
    };
    
    addItem(productToAdd, 1);
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(price));
  };

  // Check if product has discount
  const hasDiscount = product.discount_price && parseFloat(product.discount_price) < parseFloat(product.base_price);
  
  // Check if product is in stock
  const inStock = product.stock_quantity > 0;
  
  // Get product image
  const productImage = product.images && product.images.length > 0 
    ? product.images[0].image 
    : product.thumbnail;

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={productImage}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform hover:scale-105"
          />
          {product.featured && (
            <span className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-md">
              Featured
            </span>
          )}
          {hasDiscount && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
              Sale
            </span>
          )}
        </div>
        
        <CardContent className="flex-1">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <div className="mt-2 flex items-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {formatPrice(product.discount_price || product.base_price)}
            </p>
            {hasDiscount && (
              <p className="ml-2 text-sm text-gray-500 line-through dark:text-gray-400">
                {formatPrice(product.base_price)}
              </p>
            )}
          </div>
          
          {product.short_description && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {product.short_description}
            </p>
          )}
          
          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map(tag => (
                <span 
                  key={tag.id} 
                  className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  {tag.name}
                </span>
              ))}
              {product.tags.length > 2 && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  +{product.tags.length - 2}
                </span>
              )}
            </div>
          )}
          
          {/* Variants indicator */}
          {product.has_variants && product.skus && product.skus.length > 0 && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {product.skus.length} variants available
            </p>
          )}
        </CardContent>
      </Link>
      
      <CardFooter>
        <Button
          onClick={handleAddToCart}
          className="w-full"
          disabled={!inStock}
        >
          <ShoppingCart size={16} className="mr-2" />
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;