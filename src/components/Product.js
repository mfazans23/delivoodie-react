import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Spinner } from 'react-bootstrap'
import Rating from './Rating'

import formatPrice from '../utils/formatPrice'

const Product = ({
  product,
  loading,
  addToCart,
  itemToCart,
  setItemToCart,
  isAddedToCart,
}) => {
  return (
    <Card
      className='my-3 pb-3 overflow-hidden rounded'
      style={{ height: '100%' }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body className='d-flex flex-column align-items-start'>
        <Link
          to={`/product/${product._id}`}
          style={{ textUnderlineOffset: '2px', textDecorationThickness: '1px' }}
        >
          <Card.Title
            as='div'
            style={{
              fontSize: '1.4rem',
              fontWeight: 300,
            }}
          >
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='h3' className='text-transform-none py-0'>
          {formatPrice(product.price)}
        </Card.Text>
        <Button
          className='mt-auto rounded'
          onClick={() => {
            setItemToCart(product._id)
            addToCart(product._id, 1)
          }}
          disabled={isAddedToCart(product._id)}
        >
          {!isAddedToCart(product._id) ? (
            <>
              <i className='fas fa-shopping-cart me-2'></i>
              Add to cart
            </>
          ) : (
            'Added'
          )}
          {loading && product._id === itemToCart && (
            <Spinner animation='border' size='sm' className='ms-2' />
          )}
        </Button>
      </Card.Body>
    </Card>
  )
}

export default Product
