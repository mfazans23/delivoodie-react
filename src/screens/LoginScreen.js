import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userAction'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')
    ? searchParams.get('redirect')
    : null

  useEffect(() => {
    if (userInfo) {
      if (redirect) navigate(`/${redirect}`)
      else {
        navigate('/')
      }
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form
        onSubmit={(e) => {
          submitHandler(e)
        }}
      >
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Button className='mt-3' type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='mt-3'>
        <Col>
          New customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
