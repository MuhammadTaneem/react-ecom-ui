import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSelectedProduct } from '../store/slices/productSlice';
import { ShoppingCart, Heart, Share2, ArrowLeft, Tag } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../hooks/useCart';
import { ProductVariant } from '../types';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { products, selectedProduct, loading } = useSelector((state: RootState) => state.products);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedVariantValues, setSelectedVariantValues] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (id) {
      const product = products.find((p) => p.id === Number(id));
      if (product) {
        dispatch(setSelectedProduct(product));
      }
    }
    
    return () => {
      dispatch(setSelectedProduct(null));
    };
  }, [id, products, dispatch]);

  useEffect(() => {
    if (selectedProduct?.skus.length) {
      setSelectedVariant(selectedProduct.skus[0]);
      setSelectedVariantValues(selectedProduct.skus[0].variants_dict);
    }
  }, [selectedProduct]);
  
  if (loading || !selectedProduct) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  const handleVariantChange = (key: string, value: string) => {
    const newVariantValues = { ...selectedVariantValues, [key]: value };
    setSelectedVariantValues(newVariantValues);

    // Find matching SKU
    const matchingSku = selectedProduct.skus.find(sku => {
      const variantDict = sku.variants_dict;
      return Object.entries(newVariantValues).every(
        ([k, v]) => variantDict[k] === v
      );
    });

    if (matchingSku) {
      setSelectedVariant(matchingSku);
    }
  };
  
  const handleAddToCart = () => {
    if (selectedProduct.has_variants && !selectedVariant) {
      alert('Please select product variants');
      return;
    }
    
    addItem({
      ...selectedProduct,
      price: Number(selectedVariant?.price || selectedProduct.base_price),
      selectedVariant,
    }, quantity);
  };
  
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(price));
  };

  // Get unique variant options
  const variantOptions = selectedProduct.has_variants
    ? selectedProduct.skus.reduce((acc, sku) => {
        Object.entries(sku.variants_dict).forEach(([key, value]) => {
          if (!acc[key]) {
            acc[key] = new Set();
          }
          acc[key].add(value);
        });
        return acc;
      }, {} as Record<string, Set<string>>)
    : {};
  
  return (
    <div>
      <Link 
        to="/products" 
        className="mb-6 inline-flex items-center text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Products
      </Link>
      
      <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800">
        <div className="grid md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="aspect-square overflow-hidden">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          
          <div className="p-6 lg:col-span-2">
            <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
              {selectedProduct.name}
            </h1>
            
            <div className="mb-4 flex items-center">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-5 w-5 ${
                      i < selectedProduct.average_rating
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  ({selectedProduct.rating_count} reviews)
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {formatPrice(selectedVariant?.price || selectedProduct.base_price)}
              </p>
              {(selectedVariant?.discount_price || selectedProduct.discount_price) && (
                <p className="mt-1 text-sm text-gray-500 line-through dark:text-gray-400">
                  {formatPrice(selectedVariant?.discount_price || selectedProduct.discount_price)}
                </p>
              )}
            </div>

            {selectedProduct.short_description && (
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                {selectedProduct.short_description}
              </p>
            )}

            {selectedProduct.has_variants && (
              <div className="mb-6 space-y-4">
                {Object.entries(variantOptions).map(([key, values]) => (
                  <div key={key}>
                    <label className="mb-2 block font-medium">{key}</label>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(values).map((value) => (
                        <button
                          key={value}
                          onClick={() => handleVariantChange(key, value)}
                          className={`rounded-md border px-4 py-2 text-sm ${
                            selectedVariantValues[key] === value
                              ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20'
                              : 'border-gray-200 hover:border-primary-500 dark:border-gray-700'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mb-6">
              <p className="mb-2 font-medium">Quantity</p>
              <div className="flex w-32 items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center border-r hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="h-10 w-12 border-none text-center focus:outline-none dark:bg-gray-800"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center border-l hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button
                onClick={handleAddToCart}
                className="flex-1"
                disabled={!selectedProduct.stock_quantity}
              >
                <ShoppingCart size={16} className="mr-2" />
                {selectedProduct.stock_quantity ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button variant="outline" aria-label="Add to wishlist">
                <Heart size={16} />
              </Button>
              <Button variant="outline" aria-label="Share product">
                <Share2 size={16} />
              </Button>
            </div>

            {selectedProduct.tags.length > 0 && (
              <div className="mb-6">
                <p className="mb-2 font-medium">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      <Tag size={12} className="mr-1" />
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {Object.keys(selectedProduct.key_features).length > 0 && (
              <div className="mb-6">
                <h3 className="mb-2 font-medium">Key Features</h3>
                <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-400">
                  {Object.entries(selectedProduct.key_features).map(([key, value]) => (
                    <li key={key}>{value}</li>
                  ))}
                </ul>
              </div>
            )}

            {Object.keys(selectedProduct.description).length > 0 && (
              <div className="mb-6">
                <h3 className="mb-2 font-medium">Description</h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                  {Object.entries(selectedProduct.description).map(([key, value]) => (
                    <p key={key}>{value}</p>
                  ))}
                </div>
              </div>
            )}

            {Object.keys(selectedProduct.additional_info).length > 0 && (
              <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                <h3 className="mb-2 font-medium">Additional Information</h3>
                <dl className="space-y-2">
                  {Object.entries(selectedProduct.additional_info).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">{key}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;