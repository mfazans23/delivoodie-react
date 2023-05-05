import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartAction'

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart)

  const [address, setAddress] = useState(
    shippingAddress.address ? shippingAddress.address : ''
  )

  const [province, setProvince] = useState(
    shippingAddress.province ? shippingAddress.province : ''
  )

  const [city, setCity] = useState(
    shippingAddress.city ? shippingAddress.city : ''
  )

  const [district, setDistrict] = useState(
    shippingAddress.district ? shippingAddress.district : ''
  )
  const [village, setVillage] = useState(
    shippingAddress.village ? shippingAddress.village : ''
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({ province, city, district, village, address })
    )
    navigate('/placeorder')
  }

  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1>Shipping</h1>
        <Form
          onSubmit={(e) => {
            submitHandler(e)
          }}
        >
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Address'
              value={address}
              required
              onChange={(e) => {
                setAddress(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='province'>
            <Form.Label>Province</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter province'
              value={province}
              required
              onChange={(e) => {
                setProvince(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter city'
              value={city}
              required
              onChange={(e) => {
                setCity(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='district'>
            <Form.Label>District</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter district'
              value={district}
              required
              onChange={(e) => {
                setDistrict(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='village'>
            <Form.Label>Village</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter village'
              value={village}
              required
              onChange={(e) => {
                setVillage(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ShippingScreen
