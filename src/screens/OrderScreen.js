import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderAction'
import formatPrice from '../utils/formatPrice'

const OrderScreen = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const { order, loading, error } = useSelector((state) => state.orderDetails)

  useEffect(() => {
    dispatch(getOrderDetails(id))
  }, [dispatch, id])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Your Order</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {order.shippingAddress.otherDetails},{' '}
                {order.shippingAddress.province}, {` `}
                {order.shippingAddress.city}, {` `}
                {order.shippingAddress.district},{' '}
                {order.shippingAddress.village}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Status</h2>
              <strong>
                Status:{' '}
                {order.isPaid ? (
                  order.isDelivered ? (
                    <Badge bg='primary'>On Delivery</Badge>
                  ) : (
                    <Badge bg='primary'>Waiting for delivery</Badge>
                  )
                ) : (
                  <Badge bg='danger'>Waiting for payment</Badge>
                )}
              </strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                          {formatPrice(item.price)} x {item.qty} =
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
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{formatPrice(order.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{formatPrice(order.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{formatPrice(order.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
