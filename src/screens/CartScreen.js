import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  getCartDetails,
  addToCart,
  removeFromCart,
} from '../actions/cartAction'
import formatPrice from '../utils/formatPrice'
import {
  CART_ADD_ITEM_RESET,
  CART_REMOVE_ITEM_RESET,
} from '../constants/cartConstants'

const CartScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [firstMount, setFirstMount] = useState(true)

  const { userInfo } = useSelector((state) => state.userLogin)

  const { loading, cartItems, error } = useSelector(
    (state) => state.cartDetails
  )

  const {
    loading: loadingAddItem,
    success: successAddItem,
    error: errorAddItem,
  } = useSelector((state) => state.cartAddItem)

  const {
    loading: loadingRemoveItem,
    success: successRemoveItem,
    error: errorRemoveItem,
  } = useSelector((state) => state.cartRemoveItem)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      dispatch(getCartDetails())
      setFirstMount(false)
    }
  }, [])

  useEffect(() => {
    if (successAddItem) {
      dispatch(getCartDetails())
      setTimeout(() => {
        dispatch({ type: CART_ADD_ITEM_RESET })
      }, [3000])
    } else if (successRemoveItem) {
      dispatch(getCartDetails())
      setTimeout(() => {
        dispatch({ type: CART_REMOVE_ITEM_RESET })
      }, [3000])
    }
  }, [dispatch, successAddItem, successRemoveItem])

  const checkoutHandler = () => {
    navigate('/login?redirect=placeorder')
  }

  return (
    cartItems && (
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {loading && <Loader width='4rem' heigth='4rem' />}
          {error && <Message variant='danger'>{error}</Message>}
          {successAddItem && !loading && (
            <Message>Item quantity updated</Message>
          )}
          {successRemoveItem && !loading && <Message>Item removed</Message>}
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product} className='ps-0'>
                  <Row className='position-relative'>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3} className='pt-3 pe-0'>
                      <Link
                        to={`/product/${item.product}`}
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: 400,
                          textUnderlineOffset: '1px',
                        }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col
                      md={2}
                      className='pt-3'
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 400,
                      }}
                    >
                      {formatPrice(item.price)}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                        style={{
                          fontSize: '1.1rem',
                          color: '#000',
                          fontWeight: 400,
                          cursor: 'pointer',
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option
                            key={x + 1}
                            value={x + 1}
                            style={{
                              fontSize: '1.1rem',
                              color: '#000',
                            }}
                          >
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => dispatch(removeFromCart(item.product))}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                {formatPrice(
                  cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    )
  )
}

export default CartScreen
