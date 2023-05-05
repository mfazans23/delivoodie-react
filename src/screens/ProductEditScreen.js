import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productAction'
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DETAILS_REMOVE,
  PRODUCT_UPDATE_RESET,
} from '../constants/productConstants'

const ProductEditScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useParams().id

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState([])
  const [countInStock, setCountInStock] = useState('')
  const [description, setDescription] = useState('')

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  )

  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.productUpdate)

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      navigate('/admin/productlist')
      dispatch({ type: PRODUCT_UPDATE_RESET })
    }
  }, [dispatch, navigate, successUpdate])

  useEffect(() => {
    if (!product || !product.name) {
      dispatch(listProductDetails(id))
    } else {
      setName(product.name)
      setPrice(product.price)
      setDescription(product.description)
      setCountInStock(product.countInStock)
      setCategory(product.category.name)
      let tags = product.tags.map((tag) => tag.name)
      setTags(tags)
    }
  }, [dispatch, product])

  useEffect(() => {
    return () => {
      dispatch({ type: PRODUCT_DETAILS_REMOVE })
    }
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct(id, {
        name,
        price: Number(price),
        image,
        description,
        countInStock: Number(countInStock),
        category,
        tags,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {(loading || loadingUpdate) && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='file'
              label='Choose File'
              onChange={(e) => setImage(e.target.files[0])}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter stock'
              min={1}
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='tags'>
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter tags, separated by comma (,)'
              value={tags.join(',')}
              onChange={(e) => setTags(e.target.value.split(','))}
            />
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
