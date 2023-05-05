import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { ListGroup, Row, Col, Badge, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  listMyAddress,
  setMainAddress,
  removeAddress,
} from '../actions/addressAction'
import { setShippingAddress } from '../actions/cartAction'
import { CART_SET_SHIPPING_ADDRESS_RESET } from '../constants/cartConstants'

const AddressListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')
    ? searchParams.get('redirect')
    : null

  const { userInfo } = useSelector((state) => state.userLogin)

  const { loading, addresses, error } = useSelector(
    (state) => state.addressList
  )

  const {
    loading: loadingUpdateMain,
    success: successUpdateMain,
    error: errorUpdateMain,
  } = useSelector((state) => state.addressUpdate)

  const {
    loading: loadingSetAddress,
    success: successSetAddress,
    error: errorSetAddress,
  } = useSelector((state) => state.cartSetShippingAddress)

  const {
    loading: loadingRemove,
    success: successRemove,
    error: errorRemove,
  } = useSelector((state) => state.addressRemove)

  const { shippingAddress } = useSelector((state) => state.cartDetails)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (successSetAddress) {
        navigate(`/${redirect}`)
        dispatch({ type: CART_SET_SHIPPING_ADDRESS_RESET })
      } else if (!loadingRemove && !loadingUpdateMain) {
        dispatch(listMyAddress())
      }
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successSetAddress,
    successUpdateMain,
    successRemove,
  ])

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1 className='text-capitalize'>My Address</h1>
        </Col>
        <Col className='text-end'>
          <LinkContainer
            to={
              redirect
                ? `/newaddress?redirect=${location.pathname.slice(
                    1
                  )}?redirect=${redirect}`
                : `/newaddress?redirect=${location.pathname.slice(1)}`
            }
          >
            <Button>
              <i className='fas fa-plus' /> Add new address
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {(loadingUpdateMain || loadingSetAddress || loadingRemove) && <Loader />}
      {errorUpdateMain && <Message variant='danger'>{errorUpdateMain}</Message>}
      {errorRemove && <Message varinat='danger'>{errorRemove}</Message>}
      {errorSetAddress && <Message varinat='danger'>{errorSetAddress}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <ListGroup variant='flush'>
          {addresses && addresses.length > 0 ? (
            addresses.map((address) => (
              <ListGroup.Item className='ps-0'>
                <Row>
                  <Col sm={9}>
                    <div className='d-flex align-items-center mb-2'>
                      <h4 className='letter-spacing-normal text-capitalize fw-medium p-0 m-0'>
                        {address.name}
                      </h4>{' '}
                      <div className='vertical-line align-self-stretch mx-2'></div>
                      <h5
                        className='letter-spacing-normal fw-normal p-0 pt-1 m-0'
                        style={{ color: '#55595c' }}
                      >
                        {`(+62) ${address.phoneNumber.substring(3)}`}
                      </h5>
                    </div>

                    <p className='fw-normal' style={{ color: '#55595c' }}>
                      {address.otherDetails}, {address.village},{' '}
                      {address.district}, {address.city}, {address.province}, ID
                    </p>
                    {address.isMain && (
                      <Badge bg='info' className='rounded p-2 me-2'>
                        Main
                      </Badge>
                    )}
                    {location.pathname === '/select-address' &&
                      address._id === shippingAddress?._id && (
                        <Badge bg='info' className='rounded p-2'>
                          Current
                        </Badge>
                      )}
                  </Col>
                  <Col sm={3}>
                    <div
                      className='d-flex justify-content-end'
                      style={{ gap: '1rem' }}
                    >
                      {location.pathname === '/select-address' &&
                        shippingAddress?._id !== address._id && (
                          <Button
                            className='d-inline-block text-capitalize fw-medium py-1 px-2 rounded'
                            style={{
                              textDecoration: 'none',
                              border: '1px solid #000',
                              lineHeight: 1.2,
                            }}
                            onClick={() => {
                              dispatch(setShippingAddress(address._id))
                            }}
                          >
                            Select
                          </Button>
                        )}
                      <Button
                        className='d-inline-block text-capitalize fw-medium py-1 px-2 rounded'
                        style={{
                          textDecoration: 'none',
                          border: '1px solid #000',
                          lineHeight: 1.2,
                        }}
                        onClick={() =>
                          navigate(
                            redirect
                              ? `/update-address/${
                                  address._id
                                }?redirect=${location.pathname.slice(
                                  1
                                )}?redirect=${redirect}`
                              : `/update-address/${
                                  address._id
                                }?redirect=${location.pathname.slice(1)}`
                          )
                        }
                      >
                        Edit
                      </Button>
                      {location.pathname !== '/select-address' && (
                        <Button
                          className='d-inline-block text-capitalize fw-medium py-1 px-2 rounded'
                          style={{
                            textDecoration: 'none',
                            border: '1px solid #000',
                            lineHeight: 1.2,
                          }}
                          onClick={() => dispatch(removeAddress(address._id))}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    {!address.isMain && (
                      <div className='d-flex justify-content-end'>
                        <Button
                          variant='outline-light'
                          className='text-dark fw-normal px-2 py-1 mt-2'
                          style={{
                            textDecoration: 'none',
                            textTransform: 'none',
                            border: '1px solid #000',
                          }}
                          onClick={() => dispatch(setMainAddress(address._id))}
                        >
                          Set as main
                        </Button>
                      </div>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          ) : (
            <Message>You dont have any address yet</Message>
          )}
        </ListGroup>
      )}
    </>
  )
}

export default AddressListScreen
