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
import { addToCart, getCartDetails } from '../actions/cartAction'
import { CART_ADD_ITEM_RESET } from '../constants/cartConstants'

const HomeScreen = () => {
  const keyword = useParams().keyword || ''
  const pageNumber = useParams().pageNumber || 1

  const dispatch = useDispatch()

  // state to know which product 'add to cart' button is clicked
  const [itemToCart, setItemToCart] = useState('')

  const { userInfo } = useSelector((state) => state.userLogin)

  const { loading, products, page, pages, error } = useSelector(
    (state) => state.productList
  )

  const { loading: loadingAddItem, success } = useSelector(
    (state) => state.cartAddItem
  )
  const { cartItems } = useSelector((state) => state.cartDetails)

  const addToCartHandler = (id, qty) => {
    dispatch(addToCart(id, qty))
  }

  const isAddedToCart = (productId) => {
    return cartItems?.some((item) => item.product === productId) || false
  }

  useEffect(() => {
    if (userInfo) {
      dispatch(getCartDetails())
    }
    dispatch(listProducts(keyword, pageNumber))
  }, [])

  useEffect(() => {
    if (success) {
      dispatch(getCartDetails())
      dispatch({ type: CART_ADD_ITEM_RESET })
    }
  }, [success])

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
                <Product
                  product={product}
                  loading={loadingAddItem}
                  addToCart={addToCartHandler}
                  itemToCart={itemToCart}
                  setItemToCart={setItemToCart}
                  isAddedToCart={isAddedToCart}
                />
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
