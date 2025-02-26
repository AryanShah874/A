import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { 
  fetchProducts, 
  fetchCategories, 
  fetchProductsByCategory,
  setActiveCategory,
  setSortBy
} from '../redux/slices/productsSlice';
import ProductCard from './ProductCard';
import { AppDispatch } from '../redux/store';

const ProductSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, categories, status, activeCategory, sortBy } = useSelector(
    (state: RootState) => state.products
  );
  const [sortValue, setSortValue] = useState(sortBy || '');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category: string) => {
    dispatch(setActiveCategory(category));
    dispatch(fetchProductsByCategory(category));
  };

  const showAllProducts = () => {
    dispatch(setActiveCategory(null));
    dispatch(fetchProducts());
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortValue(value);
    dispatch(setSortBy(value === 'default' ? null : value));
  };

  // Group products by category
  const productsByCategory: Record<string, any[]> = {};
  
  if (activeCategory) {
    productsByCategory[activeCategory] = items;
  } else {
    categories.forEach(category => {
      productsByCategory[category] = items.filter(product => product.category === category);
    });
  }

  return (
    <section className="products-section">
      <div className="container">
        <div className="category-section">
          <div className="category-container">
            <div 
              className={`category-item ${activeCategory === null ? 'active' : ''}`}
              onClick={showAllProducts}
            >
              All
            </div>
            {categories.map((category) => (
              <div
                key={category}
                className={`category-item ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        <div className="filter-bar">
          <select value={sortValue} onChange={handleSortChange}>
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>

        {status === 'loading' ? (
          <div>Loading...</div>
        ) : status === 'failed' ? (
          <div>Error loading products</div>
        ) : (
          <>
            {activeCategory ? (
              <>
                <h2 className="category-title">
                  {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                </h2>
                <div className="products-container">
                  {productsByCategory[activeCategory]?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              Object.entries(productsByCategory).map(([category, products]) => (
                products.length > 0 && (
                  <div key={category}>
                    <h2 className="category-title">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h2>
                    <div className="products-container">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                )
              ))
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductSection;