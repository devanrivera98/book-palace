import {useState} from 'react'
import {BsFillCartFill} from 'react-icons/bs'
import { BsFillSuitHeartFill } from 'react-icons/bs'
import { ImSearch } from 'react-icons/im'
import {Link, Outlet, useNavigate} from 'react-router-dom'

export default function Header() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${process.env.REACT_APP_API_KEY}`)
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`)
      }
      const jsonData = await response.json();
      navigate("/results", {state: jsonData})
      setSearch('')
      return console.log('GET: My book requests', jsonData);
    }
    catch (error) {
      console.error('Error fetching image data', error)
    }
  }

  return (
    <>
      <nav className="navbar justify-content-between d-lg-flex d-none py-3" style={{ backgroundColor: '#617143' }}>
        <div>
          <Link to="/" className="px-3 text-decoration-none navbar-brand text-white" style={{fontSize: '30px'}}>Book Palace</Link>
          <Link to="/wishlist" className='pr-3 text-white' style={{fontSize: '20px'}}>Wishlist</Link>
          <Link to="/checkout" className='px-3 text-white' style={{ fontSize: '20px' }}>Cart</Link>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="form-inline d-flex px-2 py-2">
            <input className="form-control mr-sm-2 mx-2" onChange={handleChange} value={search} type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-light btn-outline-dark my-2 mx-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    <nav className="navbar d-md-block d-lg-none" style={{ backgroundColor: '#617143'}}>
      <div className="container-fluid">
        <Link to="/wishlist" className="nav-link heart-icon"><BsFillSuitHeartFill/></Link>
          <Link to="/" className="navbar-brand" style={{ fontSize: '30px', color: 'white' }}>Book Palace</Link>
          <Link to="/checkout" className="nav-link cart-icon"><BsFillCartFill/></Link>
      </div>
      <div className="container-fluid justify-content-center">
        <div className='justify-content-center col-10' style={{ backgroundColor: '#EDE9D5'}}>
          <form onSubmit={handleSubmit} className="d-flex justify-content-center">
            <input className="search-bar col-10" placeholder="Search by Title" onChange={handleChange} value={search} />
            <button className="btn btn-outline-dark"><ImSearch/></button>
          </form>
        </div>
      </div>
    </nav>
    <Outlet />
    </>
  )
}
