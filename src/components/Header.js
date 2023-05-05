import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userAction'
import SearchBox from './SearchBox'
import { useEffect } from 'react'

const Header = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const [showSearchBox, setShowSearchBox] = useState(true)

  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register') {
      setShowSearchBox(false)
    } else {
      setShowSearchBox(true)
    }
  }, [location.pathname])

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand href='/'>Eduwork-MERN</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {showSearchBox && <SearchBox />}
          <Nav className='ms-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/account'>
                  <NavDropdown.Item>Account</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fas fa-user'></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
