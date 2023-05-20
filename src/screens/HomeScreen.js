import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import Product from '../components/Product'
import ProductCarousel from '../components/ProductCarousel'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productAction'
import { getCartDetails } from '../actions/cartAction'

const HomeScreen = () => {
  const keyword = useParams().keyword || ''
  const pageNumber = useParams().pageNumber || 1

  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.userLogin)

  const { loading, products, page, pages, error } = useSelector(
    (state) => state.productList
  )

  const { cartItems } = useSelector((state) => state.cartDetails)

  useEffect(() => {
    if (userInfo) {
      dispatch(getCartDetails())
    }
    dispatch(listProducts(keyword, pageNumber))
  }, [])

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-dark'>
          Back
        </Link>
      )}
      <h1>Find Your Meal</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className='mb-4'
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </>
      )}
    </>
  )
}

export default HomeScreen
