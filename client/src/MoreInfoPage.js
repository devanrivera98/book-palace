import { BsFillHeartFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function  MoreInfoPage() {
  return (
    <MoreInfo/>
  )
}

function MoreInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const readBookObject = location.state;

    async function addBook() {
    let book = { title: 'Title Unknown', author: 'Author Unknown', isbn: 'Not Found', rating: 0, image: "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif", price: 19.99, quantity: 1 }
    if (readBookObject.volumeInfo.title) {
      book.title = readBookObject.volumeInfo.title;
    }
    if (readBookObject.volumeInfo.authors) {
      book.author = readBookObject.volumeInfo.authors[0];
    }
    if (readBookObject.volumeInfo.industryIdentifiers[0]) {
      book.isbn = readBookObject.volumeInfo.industryIdentifiers[0].identifier
    }
    if (readBookObject.volumeInfo.averageRating) {
      book.rating = readBookObject.volumeInfo.averageRating;
    }
    if (readBookObject.volumeInfo.imageLinks) {
      book.image = readBookObject.volumeInfo.imageLinks.thumbnail;
    }
    if (readBookObject.saleInfo.retailPrice) {
      book.price = readBookObject.saleInfo.retailPrice.amount.toFixed(2);
    }
    try {
    const response = await fetch((`/api/cart`), {method: 'POST', headers: {"Content-Type" : "application/json"}, body : JSON.stringify(book)})
    if (!response.ok) {
      throw new Error(`Response error: ${response.status}`);
    }
    navigate('/checkout');

    }
    catch (error) {
      console.log(`There was a post error: ${error.message} `);
    }
  }

  async function addToWishlist() {
    let book = { title: 'Title Unknown', author: 'Author Unknown', isbn: 'Not Found', rating: 0, image: "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif", price: 19.99, description: 'There was no description found for this book.'};
    if (readBookObject.volumeInfo.title) {
      book.title = readBookObject.volumeInfo.title;
    }
    if (readBookObject.volumeInfo.authors) {
      book.author = readBookObject.volumeInfo.authors[0];
    }
    if (readBookObject.volumeInfo.industryIdentifiers[0]) {
      book.isbn = readBookObject.volumeInfo.industryIdentifiers[0].identifier;
    }
    if (readBookObject.volumeInfo.averageRating) {
      book.rating = readBookObject.volumeInfo.averageRating;
    }
    if (readBookObject.volumeInfo.imageLinks) {
      book.image = readBookObject.volumeInfo.imageLinks.thumbnail;
    }
    if (readBookObject.saleInfo.retailPrice) {
      book.price = readBookObject.saleInfo.retailPrice.amount.toFixed(2);
    }
    try {
      const response = await fetch((`/api/wishlist`), { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(book) });
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`);
      }
      navigate('/wishlist');

    }
    catch (error) {
      console.log(`There was a post error: ${error.message} `);
    }
  };

  return (
    <div className="container pt-4 text-center">
      <div>
        <h1>{readBookObject.volumeInfo.title ? readBookObject.volumeInfo.title : 'Title Unknown'}</h1>
        <h5>By {readBookObject.volumeInfo.authors ? readBookObject.volumeInfo.authors : 'Author Unknown'}</h5>
        <p>Average Review: {readBookObject.volumeInfo.averageRating ? readBookObject.volumeInfo.averageRating : 'No Rating'}/5</p>
      </div>
      <img className='more-info-image' alt="Fences" src={readBookObject.volumeInfo.imageLinks ? readBookObject.volumeInfo.imageLinks.thumbnail : 'https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif'} />
      <div className='py-3'>
        <button onClick={addToWishlist}><BsFillHeartFill/> Add to Wishlist</button>
      </div>
      <div className='row justify-content-center'>
        <h4>Retail Price ${readBookObject.saleInfo.retailPrice ? readBookObject.saleInfo.retailPrice.amount.toFixed(2) :  '19.99'}</h4>
        <button onClick={addBook} className='col-6 btn btn-block btn-primary'>ADD TO CART</button>
      </div>
      <div className='pt-3 row justify-content-center'>
        <h1>Overview</h1>
        <p className='col-10 '>{readBookObject.volumeInfo.description ? readBookObject.volumeInfo.description : 'Unfortunately, a book description was not found for this book.'}</p>
      </div>
    </div>
  )
}
