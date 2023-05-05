import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
// import ShippingScreen from './screens/ShippingScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import NewAddressScreen from './screens/NewAddressScreen'
import UpdateAddressScreen from './screens/UpdateAddressScreen'
import AddressListScreen from './screens/AddressListScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductCreateScreen from './screens/ProductCreateScreen'
import ProductEditScreen from './screens/ProductEditScreen'

// redux
import { Provider } from 'react-redux'
import store from './store'
import AccountScreen from './screens/AccountScreen'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/order/:id' element={<OrderScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              {/* <Route path='/shipping' element={<ShippingScreen />} /> */}
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/cart'>
                <Route index element={<CartScreen />} />
                <Route path=':id' element={<CartScreen />} />
              </Route>
              <Route path='/' element={<HomeScreen />} exact />
              <Route path='/page/:pageNumber' element={<HomeScreen />} />
              <Route path='/search/:keyword'>
                <Route index element={<HomeScreen />} />
                <Route path='page/:pageNumber' element={<HomeScreen />} />
              </Route>
              <Route path='/account' element={<AccountScreen />} />
              <Route path='/newaddress' element={<NewAddressScreen />} />
              <Route
                path='/update-address/:id'
                element={<UpdateAddressScreen />}
              />
              <Route path='/select-address' element={<AddressListScreen />} />
              <Route
                path='/admin/productlist'
                element={<ProductListScreen />}
              />
              <Route
                path='/admin/productlist/:pageNumber'
                element={<ProductListScreen />}
              />
              <Route
                path='/admin/product/new-product'
                element={<ProductCreateScreen />}
              />
              <Route
                path='/admin/product/:id/edit'
                element={<ProductEditScreen />}
              />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
