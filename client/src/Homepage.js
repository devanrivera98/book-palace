import { useNavigate } from "react-router-dom"

export default function Homepage() {

  return (
    <>
      <HomepageImage/>
      <RecommendationModernClassics/>
      <RecommendationThisMonth/>
      <AboutUs/>
    </>
  )
}

function HomepageImage() {
  return (
    <div className="homepage-banner-container">
      <div className="homepage-banner">
        <div className="banner-left-container">
          <div className="banner-text-container">
            <h2>Welcome to our Grand Opening!</h2>
            <h6>Take a look at our favorite selection!</h6>
            <button className="banner-button">Shop our favorites</button>
          </div>
        </div>
        <div className="w-50 d-flex justify-content-center">
          <img className="homepage-image" src="images/books2.webp" alt="books" />
        </div>
      </div>
    </div>
  )
}

// function HomepageImage() {
//   return (
//     <div className='banner-holder d-flex justify-content-center'>
//      <div className="w-">
//         <img className='img-fluid' alt='library' src='images/BookPalace.png'/>
//      </div>
//     </div>

//   )
// }

function RecommendationModernClassics() {
  const navigate = useNavigate()
  const handleImageClick = async (title, isbn) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+isbn:${isbn}&key=${process.env.REACT_APP_API_KEY}`)
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`)
      }
      const jsonData = await response.json();
      return navigate("/info", { state: jsonData.items[0] })

    }
    catch (error) {
      console.error('Error fetching image data', error)
    }
  }


  const recommendationModern = [{ title: 'The+Overstory', isbn: '9780393356687', image: 'http://books.google.com/books/content?id=AmxFtwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'}, { title: 'Dune', isbn: '9780143111580', image: 'http://books.google.com/books/content?id=ydQiDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, { title: 'Gone+Girl', isbn: '9780553418361', image: 'http://books.google.com/books/content?id=pd6MDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, { title: 'The+Circle', isbn: '9780385351409', image: 'http://books.google.com/books/content?id=sbxWAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, {
    title: 'The+Goldfinch', isbn: '9780316248679', image: 'http://books.google.com/books/content?id=dvuK7isszLIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'}, { title: 'Piranesi', isbn: '9781635575644', image: 'http://books.google.com/books/content?id=FCTYDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, { title: 'Fun+Home', isbn: '9780618871711', image: 'http://books.google.com/books/content?id=eq0n9Ck79ysC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, { title: 'Pachinko+(National+Book+Award+Finalist)', isbn: '9781455563913', image: 'http://books.google.com/books/content?id=cxteDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }]

  const mapModern = recommendationModern.map(recommendationModern =>
    <div className='col-lg-1 col-md-3 col-sm-3 col-3 d-flex justify-content-center' key={recommendationModern.isbn}>
    <img className='p-2 recommended-books' onClick={() => handleImageClick(recommendationModern.title, recommendationModern.isbn)} key={recommendationModern.isbn} alt={recommendationModern.title} src={recommendationModern.image} />
    </div>
  )

  return (
    <div className='pt-5 px-3'>
      <div>
        <h3>Modern Classics</h3>
      </div>
      <div style={{ backgroundColor: '#EDE4E0'}}>
      <div className='row justify-content-around'>
        {mapModern}
      </div>
    </div>
  </div>
);
}

function RecommendationThisMonth() {
  const navigate = useNavigate()
  const handleImageClick = async (title, isbn) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+isbn:${isbn}&key=${process.env.REACT_APP_API_KEY}`)
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`)
      }
      const jsonData = await response.json();
      return navigate("/info", { state: jsonData.items[0] })
    }
    catch (error) {
      console.error('Error fetching image data', error)
    }
  }


  const recommendationClassics = [{ title: 'Fences', isbn: '9780593087589', image: 'http://books.google.com/books/content?id=HE-iDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, { title: 'The Great Gatsby', isbn: '9780143136125', image: 'http://books.google.com/books/content?id=Al4NEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, { title: 'The Outsider', isbn: '9781501180989', image: 'http://books.google.com/books/content?id=yK_iyQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' }, { title: 'Invisible Man', isbn: '9780307743992', image: 'http://books.google.com/books/content?id=iSrI-BQqFf0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, {
    title: 'Beloved', isbn: '9781400033416', image: 'http://books.google.com/books/content?id=bm-KDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'}, { title: 'Little Women', isbn: '9780140390698', image: 'http://books.google.com/books/content?id=MO3SEL6qIsgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, { title: 'On the Road: the Original Scroll', isbn: '9780143105466', image: 'http://books.google.com/books/content?id=DaKMEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' }, { title: 'The Awakening', isbn: '9780553213300', image: 'http://books.google.com/books/content?id=dfdvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'}]

  const mapClassics = recommendationClassics.map(recommendationClassics =>
    <div className='col-lg-1 col-md-3 col-sm-3 col-3 d-flex justify-content-center' key={recommendationClassics.isbn} >
    <img className='p-2 recommended-books' onClick={() => handleImageClick(recommendationClassics.title, recommendationClassics.isbn)} key={recommendationClassics.isbn} alt={recommendationClassics.title} src={recommendationClassics.image}/>
    </div>
  )

  return (
    <div className='pt-5 px-3'>
      <div>
        <h3>Top Books This Month</h3>
      </div>
      <div style={{ backgroundColor: '#EDE4E0' }}>
        <div className='row justify-content-around'>
          {mapClassics}
        </div>
      </div>
    </div>
  )
}



function AboutUs() {
  return (
    <div className='pt-5 pb-3 px-5 d-flex justify-content-center'>
      <div className='text-center pt-1 px-1' style={{ backgroundColor: '#F6F1E9' }}>
        <h3>Our Promise</h3>
        <p>We will have all your favorite books. No matter what you're a fan of, from Mystery to Romance, Adventure, History, Anime, and more. Discover books including classics like Brave New World to modern favorites like Gone Girl.</p>
      </div>
    </div>
  )
}
