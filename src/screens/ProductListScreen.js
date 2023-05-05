import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct } from '../actions/productAction'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import formatPrice from '../utils/formatPrice'

const ProductListScreen = () => {
  const pageNumber = useParams().pageNumber || 1

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.userLogin)

  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  )

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.productDelete)

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    } else if (!loadingDelete) {
      dispatch(listProducts('', pageNumber))
    }
  }, [dispatch, navigate, userInfo, successDelete, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    navigate(`/admin/product/new-product`)
  }

  return (
    <>
      <Row className='align-items-center justify-content-between'>
        <Col>
          <h1>Foods</h1>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button
            className='my-3'
            onClick={() => navigate(`/admin/product/new-product`)}
          >
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>STOCK</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>{product.category?.name}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => {
                        if (window.confirm('Are you sure')) {
                          dispatch(deleteProduct(product._id))
                        }
                      }}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
