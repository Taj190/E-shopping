import React from 'react'
import { UseCategory } from '../component/hooks/useCategory'
import Layout from '../component/layout/layout'
import { Link } from 'react-router-dom'


const Categories = () => {
    const categories = UseCategory()
    
  return (
    <Layout title={'All Categories'}>
        <div className="container">
            <h3>All Categories</h3>
        <div className="row justify-content-center align-item-center">
            {categories.map(category => (
                <div className="col-md-3" key={category._id}>
                    <div className="card">
                        <div className="card-body">
                           <Link to={`/category/${category.slug}`}>
                           <h5 className="card-title">{category.name}</h5>
                           </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    </Layout>
  )
}

export default Categories