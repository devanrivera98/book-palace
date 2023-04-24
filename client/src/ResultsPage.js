import './App.css';
import { useLocation, useNavigate } from 'react-router-dom';
export default function ResultsPage() {


  return (
    <ResultsTable/>
  )
}

function ResultsTable() {
  const location = useLocation();
  const resultsArray = location.state.items
  // console.log('This is resultsArray', resultsArray)
  const navigate = useNavigate()

  const handleClick = (resultsArray) => {
    navigate("/info", {state: resultsArray})
  }

  const resultsMap =  resultsArray.map((resultsArray, index) =>
    <div className='col-lg-2 col-md-3 col-sm-3 col-6' key={index}>
      <img className='pb-2 results-books' onClick={() => handleClick(resultsArray)} src={resultsArray.volumeInfo.imageLinks ? resultsArray.volumeInfo.imageLinks.thumbnail : 'https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif'} alt={resultsArray.volumeInfo.title} />
      <h6>{resultsArray.volumeInfo.title ? resultsArray.volumeInfo.title : 'Title Unknown'}</h6>
      <p>By: {resultsArray.volumeInfo.authors ? resultsArray.volumeInfo.authors : 'Author Unknown'}</p>
      <p>Price <b>{resultsArray.saleInfo.retailPrice ? resultsArray.saleInfo.retailPrice.amount : `${19.99}`}</b></p>
    </div>
    );


  return (
    <div className="pt-4 row">
      <h3 className="px-4 pb-4">Your Results</h3>
      <div className='d-flex justify-content-center'>
        <div className="container-fluid row">
          {resultsMap}
        </div>
      </div>
    </div>
  )
}
