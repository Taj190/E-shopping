import React from 'react';
import Layout from '../component/layout/layout';
import { useSearch } from '../component/context/search';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate()
  const [values, setValues] = useSearch();

  console.log('Search Component Values:', values); // Debugging statement

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values.results && values.results.data && values.results.data.length < 1
              ? "No Products Found"
              : `Found ${values.results.data.length}`}
          </h6>
          <div className="row">
            {values.results && values.results.data && values.results.data.length > 0 ? (
              values.results.data.map((product) => (
                <div className="col-md-4 mb-4" key={product._id}>
                  <div className="card h-100">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/product/get-photo/${product._id}`}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        {product.description.substring(0, 100)}...
                      </p>
                      <p className="card-text">
                        <strong>Quantity:</strong> {product.quantity}
                      </p>
                      <p className="card-text">
                        <strong>Availability for shipping:</strong>{' '}
                        {product.shipping ? 'Yes' : 'No'}
                      </p>
                      <div className="mt-auto">
                        <p className="card-text">
                          <strong>Price:</strong> ${product.price}
                        </p>
                      </div>
                      <button className='btn btn-primary' onClick={()=>navigate(`/product/${product.slug}`)}>More Deatils</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
