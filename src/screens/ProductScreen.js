import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import moment from 'moment'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  listProductDetails,
  createReview,
  deleteReview,
  updateReview,
} from '../actions/productAction'
import { addToCart } from '../actions/cartAction'
import formatPrice from '../utils/formatPrice'
import {
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_DELETE_REVIEW_RESET,
  PRODUCT_DETAILS_REMOVE,
  PRODUCT_UPDATE_REVIEW_RESET,
} from '../constants/productConstants'
import { CART_ADD_ITEM_RESET } from '../constants/cartConstants'

const ProductScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [updateReviewMode, setUpdateReviewMode] = useState(false)

  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  )
  const {
    loading: loadingCreateReview,
    success: successCreateReview,
    error: errorCreateReview,
  } = useSelector((state) => state.productCreateReview)
  const {
    loading: loadingDeleteReview,
    success: successDeleteReview,
    error: errorDeleteReview,
  } = useSelector((state) => state.productDeleteReview)
  const {
    loading: loadingUpdateReview,
    success: successUpdateReview,
    error: errorUpdateReview,
  } = useSelector((state) => state.productUpdateReview)
  const { success } = useSelector((state) => state.cartAddItem)

  const { id } = useParams()

  useEffect(() => {
    dispatch(listProductDetails(id))

    const removeProductDetails = () => {
      dispatch({
        type: PRODUCT_DETAILS_REMOVE,
      })
    }

    return removeProductDetails
  }, [dispatch, id])

  useEffect(() => {
    if (success) {
      navigate('/cart')
      dispatch({ type: CART_ADD_ITEM_RESET })
    }
  }, [success])

  useEffect(() => {
    if (successCreateReview || successDeleteReview || successUpdateReview) {
      dispatch(listProductDetails(id))
      setTimeout(() => {
        successCreateReview
          ? dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
          : successDeleteReview
          ? dispatch({ type: PRODUCT_DELETE_REVIEW_RESET })
          : dispatch({ type: PRODUCT_UPDATE_REVIEW_RESET })
      }, 2500)
    } else if (errorCreateReview || errorDeleteReview || errorUpdateReview) {
      setTimeout(() => {
        errorCreateReview
          ? dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
          : errorDeleteReview
          ? dispatch({ type: PRODUCT_DELETE_REVIEW_RESET })
          : dispatch({ type: PRODUCT_UPDATE_REVIEW_RESET })
      }, 2500)
    }
  }, [
    successCreateReview,
    successDeleteReview,
    successUpdateReview,
    errorCreateReview,
    errorDeleteReview,
  ])

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (rating && comment) {
      !updateReviewMode
        ? dispatch(createReview(id, { rating, comment }))
        : dispatch(updateReview(id, { rating, comment }))
      setRating(0)
      setComment('')
      setUpdateReviewMode(false)
    }
  }

  return (
    <>
      {loading && !product ? (
        <Loader />
      ) : (
        product && (
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
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option
                                    className='p-3'
                                    key={x + 1}
                                    value={+x + 1}
                                  >
                                    {x + 1}
                                  </option>
                                )
                              )}
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
            <Row>
              <Col md={6}>
                <h3 className='mt-4'>Reviews</h3>
                {(loading ||
                  loadingCreateReview ||
                  loadingDeleteReview ||
                  loadingUpdateReview) && <Loader />}
                {(successCreateReview ||
                  successDeleteReview ||
                  successUpdateReview) && (
                  <Message>
                    {`Your review has been ${
                      successCreateReview
                        ? 'created'
                        : successDeleteReview
                        ? 'deleted'
                        : 'updated'
                    } succesfully`}
                  </Message>
                )}
                {(errorCreateReview || errorDeleteReview) && (
                  <Message variant='danger'>
                    {errorCreateReview || errorDeleteReview}
                  </Message>
                )}

                <ListGroup variant='flush'>
                  {product.reviews.length > 0 ? (
                    product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <Row>
                          <Col md={review.user === userInfo._id && 10}>
                            <div>{review.name}</div>
                            <Rating value={review.rating} />
                            <div className='pb-2'>
                              {moment(review.updatedAt).format(
                                'YYYY-MM-DD HH:mm'
                              )}
                            </div>
                            <p>{review.comment}</p>
                          </Col>
                          {review.user === userInfo._id && (
                            <Col
                              md={2}
                              className='d-flex flex-column justify-content-start align-items-end gap-4 pt-4'
                            >
                              <i
                                className='fa-solid fa-trash'
                                style={{ cursor: 'pointer', color: '#1a1a1a' }}
                                onClick={() => dispatch(deleteReview(id))}
                              ></i>

                              <i
                                className='fa-solid fa-pen-to-square'
                                style={{ cursor: 'pointer', color: '#1a1a1a' }}
                                onClick={() => {
                                  const myReview = product.reviews.find(
                                    (review) => review.user === userInfo._id
                                  )

                                  setRating(myReview.rating)
                                  setComment(myReview.comment)
                                  setUpdateReviewMode(true)
                                }}
                              ></i>
                            </Col>
                          )}
                        </Row>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <Message>No review yet</Message>
                  )}
                  <ListGroup.Item>
                    <h3>Write your review</h3>
                    <Form onSubmit={(e) => submitHandler(e)}>
                      <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Select
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                          required
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          value={comment}
                          placeholder='write your review'
                          onChange={(e) => setComment(e.target.value)}
                          required
                        ></Form.Control>
                      </Form.Group>
                      <Button className='mt-2' type='submit'>
                        Submit
                      </Button>
                    </Form>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )
      )}
    </>
  )
}

export default ProductScreen
