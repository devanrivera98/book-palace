import Header from './Header';
import Homepage from './Homepage';
import ResultsPage from './ResultsPage';
import MoreInfoPage from './MoreInfoPage';
import CheckoutCart from './CheckoutPage';
import ViewWishlist from './WishListPage';
import PaymentPage from './PaymentPage';
import ConfirmationPage from './ConfirmationPage';
import Footer from './Footer';
import './App.css';
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div className='app-container'>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Homepage />}/>
          <Route path='results' element={<ResultsPage/>}/>
          <Route path='info' element={<MoreInfoPage/>}/>
          <Route path='checkout' element={<CheckoutCart/>}/>
          <Route path='wishlist' element={<ViewWishlist/>}/>
          <Route path='payment' element={<PaymentPage/>}/>
          <Route path='confirmation' element={<ConfirmationPage/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
