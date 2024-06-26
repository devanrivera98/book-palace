import './App.css';
import { useLocation, useNavigate } from 'react-router-dom';
export default function ResultsPage() {

  document.body.scrollTop = document.documentElement.scrollTop = 0;


  return (
    <ResultsTable/>
  )
}

function ResultsTable() {
  const location = useLocation();
  const resultsArray = location.state.items;
  const ourFavoritesArray = location.state;
  const navigate = useNavigate();

  const handleClick = (resultsArray) => {
    navigate("/info", {state: resultsArray});
  }

  let resultsMap = null;
  if (resultsArray && resultsArray.length) {
    resultsMap = resultsArray.map((resultsArray, index) =>
      <div className="col-lg-2 col-md-3 col-sm-4 col-6 d-flex flex-column align-items-center" key={index}>
        <img className="pb-2 results-books hover-button" onClick={() => handleClick(resultsArray)} src={resultsArray.volumeInfo.imageLinks ? resultsArray.volumeInfo.imageLinks.thumbnail : 'images/placeholder-cover.png'} alt={resultsArray.volumeInfo.title} />
        <h6 className='pointer-finger text-center' onClick={() => handleClick(resultsArray)}>{resultsArray.volumeInfo.title ? resultsArray.volumeInfo.title : 'Title Unknown'}</h6>
      <p className='text-center'>By: {resultsArray.volumeInfo.authors ? resultsArray.volumeInfo.authors : 'Author Unknown'}</p>
      <p className='text-center'>Price <b>${resultsArray.saleInfo.retailPrice ? resultsArray.saleInfo.retailPrice.amount.toFixed(2) : `${19.99}`}</b></p>
    </div>
    );
  }

  if ((ourFavoritesArray && ourFavoritesArray.length)) {
    resultsMap = ourFavoritesArray.map((item) =>
      <div className="col-lg-2 col-md-3 col-sm-4 col-6 d-flex flex-column align-items-center" key={item.isbn}>
        <img className="pb-2 results-books hover-button" onClick={() => handleClick(item)} src={item.image ? item.image : 'images/placeholder-cover.png'} alt={item.title} />
        <h6 className='pointer-finger text-center' onClick={() => handleClick(item)}>{item.title ? item.title : 'Title Unknown'}</h6>
        <p className='text-center'>By: {item.author ? item.author : 'Author Unknown'}</p>
        <p className='text-center'>Price <b>${item.price ? item.price.toFixed(2) : `${19.99}`}</b></p>
      </div>
    )
  }

  return (
    <div className="pt-4 row m-0">
      <h3 className="px-4 pb-4">Your Results</h3>
      <div className="d-flex justify-content-center">
        <div className="container-fluid row">
          {resultsMap ? resultsMap :
            <div className="text-center">
            <h2>Your search term was not found</h2>
          </div>}
        </div>
      </div>
    </div>
  )
}
