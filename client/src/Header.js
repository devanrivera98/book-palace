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
      // remember to swap the title search
      // const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${search}&key=${process.env.REACT_APP_API_KEY}`)
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`)
      }
      const jsonData = await response.json();
      navigate("/results", {state: jsonData})
      setSearch('')
    }
    catch (error) {
      console.error('Error fetching image data', error)
    }
  }

  return (
    <>
      <nav className="navbar sticky-top" style={{ backgroundColor: '#617143' }}>
        <div className="d-md-block d-none">
          <Link to="/" className="px-3 text-decoration-none navbar-brand text-white" style={{ fontSize: '35px' }}>Book Palace</Link>
          <Link to="/wishlist" className="pr-3 text-white" style={{ fontSize: '25px' }}>Wishlist</Link>
          <Link to="/checkout" className="px-3 text-white" style={{ fontSize: '25px' }}>Cart</Link>
        </div>
        <div className="d-md-block d-none">
          <form onSubmit={handleSubmit} className="d-flex px-2 py-2">
            <input className="form-control mx-2" onChange={handleChange} value={search} type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-light btn-outline-dark my-2 mx-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
        <div className="container-fluid d-md-none">
          <Link to="/wishlist" className="nav-link heart-icon"><BsFillSuitHeartFill /></Link>
          <Link to="/" className="navbar-brand" style={{ fontSize: '30px', color: 'white' }}>Book Palace</Link>
          <Link to="/checkout" className="nav-link cart-icon"><BsFillCartFill /></Link>
          <div className="container-fluid d-flex justify-content-center">
            <div className="col-10" style={{ backgroundColor: '#EDE9D5' }}>
              <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                <input className="col-10" placeholder="Search by Title" onChange={handleChange} value={search} />
                <button className="btn btn-outline-dark"><ImSearch /></button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    <Outlet />
    </>
  )
}
