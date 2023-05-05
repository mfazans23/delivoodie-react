import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productAction'
import { addToCart } from '../actions/cartAction'
import formatPrice from '../utils/formatPrice'
import { CART_ADD_ITEM_RESET } from '../constants/cartConstants'

const ProductScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [qty, setQty] = useState(1)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, product, error } = productDetails

  const {
    loading: addItemLoading,
    success,
    error: addItemError,
  } = useSelector((state) => state.cartAddItem)

  const { id } = useParams()

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  useEffect(() => {
    if (success) {
      navigate('/cart')
      dispatch({ type: CART_ADD_ITEM_RESET })
    }
  }, [success])

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty))
  }

  return loading || addItemLoading ? (
    <Loader />
  ) : error || addItemError ? (
    <Message variant='danger'>{error || addItemError}</Message>
  ) : (
    product !== null && (
      <>
        <Link className='btn btn-dark my-3' to='/'>
          Back
        </Link>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Price: {formatPrice(product.price)}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>
                      <strong>{formatPrice(product.price)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty: </Col>
                      <Col>
                        <Form.Select
                          type='select'
                          onChange={(e) => {
                            setQty(Number(e.target.value))
                          }}
                          style={{ paddingRight: '10px', fontSize: '1rem' }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option className='p-3' key={x + 1} value={+x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  )
}

export default ProductScreen
