import './App.css';
import { useLocation } from 'react-router-dom';
export default function ResultsPage() {


  return (
    <ResultsTable/>
  )
}

function ResultsTable() {
  const location = useLocation();
  const resultsArray = location.state.items
  // console.log('Image src for results', resultsArray[0].volumeInfo.imageLinks.thumbnail)
  // console.log('Location Results:', resultsArray[0].volumeInfo.title)
  // console.log('Location Results:', resultsArray[0].volumeInfo.authors[0])
  // console.log('Location Results:', location.state.items[7].saleInfo.retailPrice.amount)
  // if (location.state.items[0].saleInfo.saleability === "NOT_FOR_SALE") {
  //   console.log('it is not for sale')
  // }

  // condition for random
  const resultsMap =  resultsArray.map((resultsArray, index) =>
    <div className='col-lg-2 col-md-3 col-sm-3 col-6' key={index}>
      <img className='pb-2 results-books' src={resultsArray.volumeInfo.imageLinks ? resultsArray.volumeInfo.imageLinks.thumbnail : 'https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif'} alt={resultsArray.volumeInfo.title} />
      <h6>{resultsArray.volumeInfo.title ? resultsArray.volumeInfo.title : 'Title Unknown'}</h6>
      <p>By: {resultsArray.volumeInfo.authors ? resultsArray.volumeInfo.authors : 'Author Unknown'}</p>
      <p>Price <b>{resultsArray.saleInfo.retailPrice ? resultsArray.saleInfo.retailPrice.amount : `${19.99}`}</b></p>
    </div>
    );

  return (
    <div className="pt-4 row">
      <h3 className="px-4 pb-4">Results for <b>Fences</b></h3>
      <div className='d-flex justify-content-center'>
        <div className="container-fluid row">
          {resultsMap}
        </div>
      </div>
    </div>
  )
}
