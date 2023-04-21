import './App.css';
export default function ResultsPage() {

  return (
    <ResultsTable/>
  )
}

function ResultsTable() {
  return (
    <div className="pt-4 row">
      <h3 className="px-3">Results for <b>Fences</b></h3>
      <div className='d-flex justify-content-center'>
        <div className="container-fluid row">
          <div className='col-lg-2 col-md-3 col-sm-3 col-6'>
            <img className="p-2 results-books " alt="bird" src="http://books.google.com/books/content?id=dvuK7isszLIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'" />
            <h6>The GoldFinch</h6>
            <p>By Someone</p>
            <p>Price <b>$20.99</b></p>
          </div>
          <div className='col-lg-2 col-md-3 col-sm-3 col-6'>
            <img className="results-books " alt="bird" src="http://books.google.com/books/content?id=bm-KDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'" />
            <h6>The GoldFinch</h6>
            <p>By Someone</p>
            <p>Price <b>$20.99</b></p>
          </div>
          <div className='col-lg-2 col-md-3 col-sm-3 col-6'>
          <img className="p-2 results-books" alt="bird" src="http://books.google.com/books/content?id=Al4NEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" />
            <h6>The GoldFinch</h6>
            <p>By Someone</p>
            <p>Price <b>$20.99</b></p>
          </div>
          <div className='col-lg-2 col-md-3 col-sm-3 col-6'>
            <img className="p-2 results-books " alt="bird" src="http://books.google.com/books/content?id=dvuK7isszLIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'" />
            <h6>The GoldFinch</h6>
            <p>By Someone</p>
            <p>Price <b>$20.99</b></p>
          </div>
          <div className='col-lg-2 col-md-3 col-sm-3 col-6'>
            <img className="results-books" alt="bird" src="http://books.google.com/books/content?id=bm-KDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'" />
            <h6>The GoldFinch</h6>
            <p>By Someone</p>
            <p>Price <b>$20.99</b></p>
          </div>
          <div className='col-lg-2 col-md-3 col-sm-3 col-6'>
            <img className="p-2 results-books" alt="bird" src="http://books.google.com/books/content?id=Al4NEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" />
            <h6>The GoldFinch</h6>
            <p>By Someone</p>
            <p>Price <b>$20.99</b></p>
          </div>
        </div>
      </div>
    </div>
  )
}
