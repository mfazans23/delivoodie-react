import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Badge,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getCartDetails, setShippingAddress } from '../actions/cartAction'
import { createOrder } from '../actions/orderAction'
import formatPrice from '../utils/formatPrice'
import {
  CART_DETAILS_RESET,
  CART_SET_SHIPPING_ADDRESS_RESET,
} from '../constants/cartConstants'

import { ORDER_CREATE_RESET } from '../constants/orderConstants'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.userLogin)

  const {
    loading,
    cartItems,
    shippingAddress,
    itemsPrice,
    shippingPrice,
    totalPrice,
    error,
  } = useSelector((state) => state.cartDetails)

  const {
    success: successCreateOrder,
    error: errorCreateOrder,
    order,
  } = useSelector((state) => state.orderCreate)

  const {
    loading: loadingSetAddress,
    success: successSetAddress,
    error: errorSetAddress,
  } = useSelector((state) => state.cartSetShippingAddress)

  const mainAddress =
    localStorage.getItem('mainAddress') &&
    JSON.parse(localStorage.getItem('mainAddress'))

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress._id,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
      })
    )
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    if (successCreateOrder) {
      navigate(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
      dispatch({ type: CART_DETAILS_RESET })
    }
  }, [dispatch, navigate, successCreateOrder])

  useEffect(() => {
    if (!shippingAddress && mainAddress && !successSetAddress && !loading) {
      dispatch(setShippingAddress(mainAddress))
    }
    if (successSetAddress) {
      dispatch(getCartDetails())
      dispatch({ type: CART_SET_SHIPPING_ADDRESS_RESET })
    }
  }, [dispatch, successSetAddress])

  return (
    <>
      {loading && <Loader />}
      <Row className='pt-4'>
        <Col>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Delivery Address</h2>
              {loading || loadingSetAddress ? (
                <Loader />
              ) : error || errorSetAddress ? (
                <Message variant='danger'>{error || errorSetAddress}</Message>
              ) : (
                <Row style={{ gap: '1rem' }}>
                  {shippingAddress ? (
                    <>
                      <Col md={2} className='pe-0'>
                        <h4 className='letter-spacing-normal text-capitalize pt-2 m-0'>
                          <span>{shippingAddress.name} </span>
                          <span>{`(+62) ${shippingAddress.phoneNumber.substring(
                            3
                          )}`}</span>
                        </h4>
                      </Col>
                      <Col md={9} className='p-0'>
                        <p className='fs-4 mb-0'>
                          {shippingAddress.otherDetails},{' '}
                          {shippingAddress.village}, {shippingAddress.district},{' '}
                          {shippingAddress.city}, {shippingAddress.province}, ID
                          {shippingAddress.isMain && (
                            <Badge
                              bg='info'
                              className='d-inline-block rounded ms-4 px-2 py-1'
                            >
                              Main
                            </Badge>
                          )}
                        </p>
                      </Col>
                      <Col className='d-flex align-items-center justify-content-end gap-3 p-0'>
                        <Button
                          className='d-inline-block text-capitalize fw-medium py-1 px-2 rounded'
                          style={{
                            textDecoration: 'none',
                            border: '1px solid #000',
                            lineHeight: 1.2,
                          }}
                          onClick={(e) => {
                            navigate('/select-address?redirect=placeorder')
                          }}
                        >
                          Change
                        </Button>
                      </Col>
                    </>
                  ) : (
                    !mainAddress && (
                      <>
                        <Col md={11}>
                          <Message>
                            To set your shipping address, please click the
                            "Select" button next to the address you want to use
                            or set one of your address as main address.
                          </Message>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-end gap-3 p-0'>
                          <Button
                            className='d-inline-block text-capitalize fw-medium py-1 px-2 rounded'
                            style={{
                              textDecoration: 'none',
                              border: '1px solid #000',
                              lineHeight: 1.2,
                            }}
                            onClick={(e) => {
                              navigate('/select-address?redirect=placeorder')
                            }}
                          >
                            Select
                          </Button>
                        </Col>
                      </>
                    )
                  )}
                </Row>
              )}
            </ListGroup.Item>
            <Row>
              <Col md={7}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method: </strong>Cash/Transfer
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h2>Items</h2>
                    {cartItems.length === 0 ? (
                      <Message>Your cart is empty</Message>
                    ) : (
                      <ListGroup variant='flush'>
                        {cartItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col md={1}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col>
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </Col>
                              <Col md={4}>
                                {formatPrice(item.price)} x {item.qty} = {` `}
                                {formatPrice(item.price * item.qty)}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={5}>
                <Card className='mt-2'>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Items price</Col>
                        <Col>{formatPrice(itemsPrice)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Delivery fee</Col>
                        <Col>{formatPrice(shippingPrice)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>{formatPrice(totalPrice)}</Col>
                      </Row>
                    </ListGroup.Item>
                    {errorCreateOrder && (
                      <ListGroup.Item>
                        <Message variant='danger'>{errorCreateOrder}</Message>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item className='d-grid'>
                      <Button
                        type='button'
                        className='btn-block'
                        disabled={cartItems.length === 0}
                        onClick={(e) => placeOrderHandler(e)}
                      >
                        Place Order
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
