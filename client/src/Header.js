import './App.css';
import {BsFillCartFill} from 'react-icons/bs'
import { BsFillSuitHeartFill } from 'react-icons/bs'
import { ImSearch } from 'react-icons/im'

export default function Header() {

  return (
    <nav className="navbar" style={{ backgroundColor: '#617143'}}>
      <div className="container-fluid">
        <a href="this will be the wishlist" className="nav-link heart-icon"><BsFillSuitHeartFill/></a>
        <a href="will be the homepage" className="navbar-brand" style={{fontSize: '30px', color: 'white'}}>Book Palace</a>
        <a href="this will be the cart" className="nav-link cart-icon"><BsFillCartFill/></a>
      </div>
      <div className="container-fluid justify-content-center">
        <div className='justify-content-center col-10' style={{ backgroundColor: '#EDE9D5'}}>
          <form className="d-flex justify-content-center">
            <input className="search-bar col-10" placeholder="Search by Title" />
            <button className="btn btn-outline-dark"><ImSearch/></button>
          </form>
        </div>
      </div>
    </nav>
  )
}
