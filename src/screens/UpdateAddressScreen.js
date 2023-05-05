import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getAddressDetails, updateAddress } from '../actions/addressAction'
import {
  ADDRESS_DETAILS_RESET,
  ADDRESS_UPDATE_RESET,
} from '../constants/addressConstants'

const UpdateAddressScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')

  const addressId = useParams().id

  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading, address, error } = useSelector(
    (state) => state.addressDetails
  )
  const { loading: updateLoading, success: updateSuccess } = useSelector(
    (state) => state.addressUpdate
  )

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedVillage, setSelectedVillage] = useState('')
  const [otherDetails, setOtherDetails] = useState('')

  const [provinceList, setProvinceList] = useState([])
  const [cityList, setCityList] = useState([])
  const [districtList, setDistrictList] = useState([])
  const [villageList, setVillageList] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateAddress(addressId, {
        name,
        phoneNumber,
        province: provinceList.find((x) => x.id === selectedProvince).name,
        city: cityList.find((x) => x.id === selectedCity).name,
        district: districtList.find((x) => x.id === selectedDistrict).name,
        village: villageList.find((x) => x.id === selectedVillage).name,
        otherDetails,
      })
    )
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      dispatch(getAddressDetails(addressId))
    }
  }, [userInfo, dispatch, navigate])

  useEffect(() => {
    const getProvinceList = async () => {
      const { data } = await axios.get('/api/address/province')

      setProvinceList(data)
    }
    const getCityList = async () => {
      const { data } = await axios.get(`/api/address/city/${selectedProvince}`)
      setCityList(data)
    }

    const getDistrictList = async () => {
      const { data } = await axios.get(`/api/address/district/${selectedCity}`)
      setDistrictList(data)
    }

    const getVillageList = async () => {
      const { data } = await axios.get(
        `/api/address/village/${selectedDistrict}`
      )
      setVillageList(data)
    }

    if (provinceList.length === 0) {
      getProvinceList()
    }
    if (selectedProvince && cityList.length === 0) {
      getCityList()
    }
    if (selectedCity && districtList.length === 0) {
      getDistrictList()
    }
    if (selectedDistrict) {
      getVillageList()
    }
  }, [selectedProvince, selectedCity, selectedDistrict])

  useEffect(() => {
    if (address) {
      setName(address.name)
      setPhoneNumber(address.phoneNumber)
      setOtherDetails(address.otherDetails)
      if (provinceList && provinceList.length !== 0) {
        const selectedProvinceId = provinceList.find(
          (province) => province.name === address.province
        ).id

        setSelectedProvince(selectedProvinceId)
      }
      if (cityList && cityList.length !== 0) {
        const selectedCityId = cityList.find(
          (city) => city.name === address.city
        ).id
        setSelectedCity(selectedCityId)
      }
      if (districtList && districtList.length !== 0) {
        const selectedDistrictId = districtList.find(
          (district) => district.name === address.district
        ).id
        setSelectedDistrict(selectedDistrictId)
      }
      if (villageList && villageList.length !== 0) {
        const selectedVillageId = villageList.find(
          (village) => village.name === address.village
        ).id
        setSelectedVillage(selectedVillageId)
      }
      if (selectedVillage) {
        dispatch({ type: ADDRESS_DETAILS_RESET })
      }
    }
  }, [
    address,
    provinceList,
    cityList,
    districtList,
    villageList,
    selectedVillage,
    dispatch,
  ])

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: ADDRESS_UPDATE_RESET })
      if (redirect === 'account') {
        navigate('/account', {
          state: { activeTabKey: 'address' },
        })
      } else {
        navigate(`/${redirect}`)
      }
    }
  }, [updateSuccess, navigate])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <FormContainer>
      <h1>Edit Address</h1>
      <Form
        onSubmit={(e) => {
          submitHandler(e)
        }}
      >
        <Row>
          <Col>
            <Form.Group controlId='name' className='mb-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                value={name}
                required
                onChange={(e) => {
                  setName(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='phoneNumber' className='mb-2'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Phone Number'
                value={phoneNumber}
                required
                onChange={(e) => {
                  setPhoneNumber(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='province'>
          <Form.Label>Province</Form.Label>
          <Form.Control
            as='select'
            value={selectedProvince}
            required
            onChange={(e) => {
              setSelectedProvince(e.target.value)
              setCityList([])
              setDistrictList([])
              setVillageList([])
              setSelectedCity('')
              setSelectedDistrict('')
              setSelectedVillage('')
            }}
            disabled={provinceList.length === 0}
          >
            <option value=''>Choose Province</option>
            {provinceList.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            as='select'
            value={selectedCity}
            required
            onChange={(e) => {
              setSelectedCity(e.target.value)
              setDistrictList([])
              setVillageList([])
              setSelectedDistrict('')
              setSelectedVillage('')
            }}
            disabled={cityList.length === 0}
          >
            <option value=''>Choose City</option>
            {cityList.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='district'>
          <Form.Label>District</Form.Label>
          <Form.Control
            as='select'
            value={selectedDistrict}
            required
            onChange={(e) => {
              setSelectedDistrict(e.target.value)
              setVillageList([])
              setSelectedVillage('')
            }}
            disabled={districtList.length === 0}
          >
            <option value=''>Choose District</option>
            {districtList.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='village'>
          <Form.Label>Village</Form.Label>
          <Form.Control
            as='select'
            value={selectedVillage}
            required
            onChange={(e) => {
              setSelectedVillage(e.target.value)
            }}
            disabled={villageList.length === 0}
          >
            <option value=''>Choose Village</option>
            {villageList.map((village) => (
              <option key={village.id} value={village.id}>
                {village.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='otherDetails' className='mb-2'>
          <Form.Label>Additional Details</Form.Label>
          <Form.Control
            type='text'
            placeholder='Additional details (example: street name, house number, block/unit, landmark)'
            value={otherDetails}
            required
            onChange={(e) => {
              setOtherDetails(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default UpdateAddressScreen
