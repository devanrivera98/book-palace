import { BsFillHeartFill } from 'react-icons/bs'
import { useLocation } from 'react-router-dom'

export default function  MoreInfoPage() {
  return (
    <MoreInfo/>
  )
}

function MoreInfo() {

  return (
    <div className="container pt-4 text-center">
      <div>
        <h1>Title</h1>
        <h5>By August Wilson</h5>
        <p>Average Review: 4.5</p>
      </div>
      <img className='more-info-image' alt="Fences" src="http://books.google.com/books/content?id=HE-iDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" />
      <div className='pt-3'>
        <p><BsFillHeartFill /> Add to Wishlist</p>
      </div>
      <div className='row justify-content-center'>
        <h4>Retail Price $20.99</h4>
        <button className='col-6 btn btn-block btn-primary'>ADD TO CART</button>
      </div>
      <div className='pt-3 row justify-content-center'>
        <h1>Overview</h1>
        <p className='col-8 '>There should be some information placed here about the book but for now here is just some empty text until I can implement some details in here.</p>
      </div>
    </div>
  )
}
