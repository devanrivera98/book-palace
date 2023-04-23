import { BsFillHeartFill } from 'react-icons/bs'
import { useLocation } from 'react-router-dom'

export default function  MoreInfoPage() {
  return (
    <MoreInfo/>
  )
}

function MoreInfo() {
  const location = useLocation();
  const readBookObject = location.state
  console.log(location.state)

  return (
    <div className="container pt-4 text-center">
      <div>
        <h1>{readBookObject.volumeInfo.title ? readBookObject.volumeInfo.title : 'Title Unknown'}</h1>
        <h5>By {readBookObject.volumeInfo.authors ? readBookObject.volumeInfo.authors : 'Author Unknown'}</h5>
        <p>Average Review: {readBookObject.volumeInfo.averageRating ? readBookObject.volumeInfo.averageRating : 'No Rating'}/5</p>
      </div>
      <img className='more-info-image' alt="Fences" src={readBookObject.volumeInfo.imageLinks ? readBookObject.volumeInfo.imageLinks.thumbnail : 'https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif'} />
      <div className='pt-3'>
        <p><BsFillHeartFill /> Add to Wishlist</p>
      </div>
      <div className='row justify-content-center'>
        <h4>Retail Price ${readBookObject.saleInfo.retailPrice ? readBookObject.saleInfo.retailPrice.amount :  '19.99'}</h4>
        <button className='col-6 btn btn-block btn-primary'>ADD TO CART</button>
      </div>
      <div className='pt-3 row justify-content-center'>
        <h1>Overview</h1>
        <p className='col-10 '>{readBookObject.volumeInfo.description ? readBookObject.volumeInfo.description : 'Unfortunately, a book description was not found for this book.'}</p>
      </div>
    </div>
  )
}
