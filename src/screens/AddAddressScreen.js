import React, { useState } from 'react'

import { Button, Form, Overlay, Popover } from 'react-bootstrap'

const AddressForm = () => {
  const [showPopover, setShowPopover] = useState(false)

  const handlePopoverClose = () => setShowPopover(false)
  const handlePopoverShow = () => setShowPopover(!showPopover)

  return (
    <>
      <Button variant='primary' onClick={handlePopoverShow}>
        Open Address Form
      </Button>
      <Overlay
        trigger='click'
        placement='auto'
        show={showPopover}
        onHide={handlePopoverClose}
      >
        <Popover id='address-form-popover' className='centered-popover'>
          <Popover.Header as='h3'>Enter Address</Popover.Header>
          <Popover.Body>
            <Form>
              <Form.Group controlId='formAddress1'>
                <Form.Label>Address Line 1</Form.Label>
                <Form.Control type='text' placeholder='Enter address line 1' />
              </Form.Group>

              <Form.Group controlId='formAddress2'>
                <Form.Label>Address Line 2</Form.Label>
                <Form.Control type='text' placeholder='Enter address line 2' />
              </Form.Group>

              <Form.Group controlId='formCity'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder='Enter city' />
              </Form.Group>

              <Form.Group controlId='formState'>
                <Form.Label>State</Form.Label>
                <Form.Control type='text' placeholder='Enter state' />
              </Form.Group>

              <Form.Group controlId='formZip'>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control type='text' placeholder='Enter zip code' />
              </Form.Group>

              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  )
}

export default AddressForm
