import './App.css';

export default function Homepage() {

  return (
    <>
      <HomepageImage/>
      <RecommendationThisWeek/>
      <RecommendationThisMonth/>
      <AboutUs/>
    </>
  )
}

function HomepageImage() {
  return (
    <div className='image-holder d-flex justify-content-center'>
     <div>
        <img className='img library img-fluid justify-content-center' alt='library' src='https://img.freepik.com/free-vector/literature-book-club-twitch-banner-template_23-2149730151.jpg'></img>
     </div>
    </div>

  )
}

function RecommendationThisWeek() {

  return (
    <div className='pt-5 px-3'>
      <div className='our-recommendations'>
        <h3>Top Books This Week</h3>
      </div>
      <div style={{ backgroundColor: '#D9D9D9'}}>
        <div className='px-3 row justify-content-between'>
          <img className='p-2 img-fluid recommended-books' alt='book' src='https://books.google.com/books/content?id=HE-iDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'/>
          <img className='p-2 img-fluid recommended-books' alt='book' src='http://books.google.com/books/content?id=h9jafQb1TrMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'/>
          <img className='p-2 img-fluid recommended-books' alt='book' src='http://books.google.com/books/content?id=NMASp7Sv2TYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'/>
          <img className='p-2 img-fluid recommended-books' alt='book' src='http://books.google.com/books/content?id=9rGTCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'/>
          <img className='p-2 img-fluid recommended-books' alt='book' src='http://books.google.com/books/content?id=Zh3tCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'/>
          <img className='p-2 img-fluid recommended-books' alt='book' src='http://books.google.com/books/content?id=9rGTCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'/>
          <img className='p-2 img-fluid recommended-books' alt='book' src='http://books.google.com/books/content?id=p45kD3s5WEAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'/>
          <img className='p-2 img-fluid recommended-books' alt='book' src='https://books.google.com/books/content?id=HE-iDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'/>
        </div>
      </div>
    </div>
  )
}

function RecommendationThisMonth() {

  return (
    <div className='pt-5 px-3'>
      <div className='our-recommendations'>
        <h3>Top Books This Month</h3>
      </div>
      <div style={{ backgroundColor: '#D9D9D9' }}>
        <div className='px-3 row justify-content-between'>
          <img className='p-2 img-fluid recommended-books' alt='book' src='https://books.google.com/books/content?id=HE-iDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' />
          <img className='p-2 img-fluid recommended-books' alt='book' src='http://books.google.com/books/content?id=h9jafQb1TrMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' />
          <img className='p-2 img-fluid recommended-books' alt='book' src='http://books.google.com/books/content?id=NMASp7Sv2TYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' />
          <img className='p-2 img-fluid recommended-books' alt='book' src='http://books.google.com/books/content?id=9rGTCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' />
          <img className='p-2 img-fluid recommended-books' alt='book' src='http://books.google.com/books/content?id=Zh3tCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' />
          <img className='p-2 img-fluid recommended-books' alt='book' src='http://books.google.com/books/content?id=9rGTCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' />
          <img className='p-2 img-fluid recommended-books' alt='book' src='http://books.google.com/books/content?id=p45kD3s5WEAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' />
          <img className='p-2 img-fluid recommended-books' alt='book' src='https://books.google.com/books/content?id=HE-iDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' />
        </div>
      </div>
    </div>
  )
}



function AboutUs() {
  return (
    <div className='pt-5 px-5 about-us d-flex'>
      <div className='justify-content-center text-center' style={{ backgroundColor: '#F6F1E9' }}>
        <h3 className='text-align-center'>Our Promise</h3>
        <p>We will have all your favorite books. No matter what you’re a fan of, from Mystery to Romance, Adventure, History, Anime, and more. Discover books including classics like Brave New World to modern favorites like Gone Girl.</p>
      </div>
    </div>
  )
}
