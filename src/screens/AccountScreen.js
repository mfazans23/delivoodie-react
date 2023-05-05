import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Row, Col, Nav, Tab } from 'react-bootstrap'
import ProfileScreen from './ProfileScreen'
import OrderListMyScreen from './OrderListMyScreen'
import AddressListScreen from './AddressListScreen'
import { logout } from '../actions/userAction'

const AccountScreen = () => {
  const dispatch = useDispatch()

  const [activeTabKey, setActiveTabKey] = useState(
    useLocation().state?.activeTabKey || 'profile'
  )

  return (
    <div className='mt-4'>
      <Tab.Container
        id='left-tabs-example'
        activeKey={activeTabKey}
        onSelect={(e) => setActiveTabKey(e)}
      >
        <Row>
          <Col sm={3}>
            <Nav variant='pills' className='flex-column'>
              <Nav.Item>
                <Nav.Link
                  className='rounded border border-2'
                  eventKey='profile'
                >
                  Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='rounded border border-2' eventKey='order'>
                  Order
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className='rounded border border-2'
                  eventKey='address'
                >
                  Address
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={(e) => {
                    if (window.confirm('Are you sure?')) {
                      dispatch(logout())
                    }
                  }}
                  className='rounded border border-2'
                >
                  Logout
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey='profile'>
                <ProfileScreen />
              </Tab.Pane>
              <Tab.Pane eventKey='order'>
                <OrderListMyScreen />
              </Tab.Pane>
              <Tab.Pane eventKey='address'>
                <AddressListScreen />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default AccountScreen
