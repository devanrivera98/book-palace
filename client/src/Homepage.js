import { useNavigate } from "react-router-dom"
import { useRef } from "react";
import { ourFavoriteBooks } from "./recommended-books/our-favorites-books"
import EachAuthor from "./components/EachAuthor";
import { recommendationModern } from "./recommended-books/recommended-modern-books";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";



export default function Homepage() {

  return (
    <>
      <HomepageImage/>
      <ViewByAuthor/>
      <RecommendationModernClassics/>
      <RecommendationThisMonth/>
      <AboutUs/>
    </>
  )
}

function HomepageImage() {
  const navigate = useNavigate();


  function viewOurFavorites(){
    navigate('/results', {state: ourFavoriteBooks})
  }

  return (
    <div className="homepage-banner-container">
      <div className="homepage-banner">
        <div className="banner-left-container">
          <div className="banner-text-container">
            <h2 className="banner-title">Welcome to Our Grand Opening!</h2>
            <h6 className="banner-paragraph">Take a look at our favorite selection!</h6>
            <button className="banner-button" onClick={viewOurFavorites}>Shop our favorites</button>
          </div>
        </div>
        <div className="banner-right-container d-flex justify-content-center">
          <img className="homepage-image" src="images/books2.webp" alt="books" />
        </div>
      </div>
    </div>
  )
}

function ViewByAuthor() {
  return (
    <>
    <div className="p-3">
      <div>
        <h3>Shop by Author</h3>
      </div>
        <div className="d-flex overflow-auto">
          <EachAuthor author={'Mark Twain'} image={"images/mark-twain.png"} alt={'mark-twain'} />
          <EachAuthor author={'Emily Dickinson'} image={"images/emily-dickinson.png"} alt={'emily-dickinson'} />
          <EachAuthor author={'Margaret Atwood'} image={"images/margaret-atwood.png"} alt={'margaret-atwood'} />
          <EachAuthor author={'Edgar Allen Poe'} image={"images/edgar-allen-poe.png"} alt={'edgar-allen-poe'} />
          <EachAuthor author={'Harper Lee'} image={"images/harper-lee.png"} alt={'harper-lee'} />
          <EachAuthor author={'John Steinbeck'} image={"images/john-steinbeck.png"} alt={'john-steinbeck'} />
      </div>
    </div>
    </>
  )
}


function RecommendationModernClassics() {
  const navigate = useNavigate()
  const containerRef = useRef(null);
  const itemWidth = 200;


  const changeScrollPosition = (direction) => {
    if (containerRef.current) {
      const currentScrollPosition = containerRef.current.scrollLeft;
      console.log(currentScrollPosition)
      let newScrollPosition;
      if (direction === 'next') {
        newScrollPosition = currentScrollPosition + itemWidth;
      } else {
        newScrollPosition = currentScrollPosition - itemWidth;
      }
      containerRef.current.scrollLeft = newScrollPosition;
    }
  };

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



  const mapModern = recommendationModern.map(item =>
    <figure key={item.isbn} onClick={() => handleImageClick(item.title, item.isbn)} >
      <picture>
        <img src={item.image} alt={item.title} />
      </picture>
      <figcaption>{item.title}</figcaption>
      <p>{item.author}</p>
      <p>${item.price.toFixed(2)}</p>
    </figure>
  )

  return (
    <div className='pt-4'>
      <hr></hr>
      <div className="row-title ">
        <h3>Modern Classics</h3>
      </div>
      <div className="position-relative ">
        <FaArrowAltCircleLeft className="left-arrow" onClick={() => { changeScrollPosition('prev'); }} />
        <FaArrowAltCircleRight className="right-arrow" onClick={() => { changeScrollPosition('next'); }}  />
        <div className="horizontal-media-scroller mx-auto" ref={containerRef}>
          {mapModern}
        </div>
      </div>
    </div>
  );
}

/* <figure>
          <picture>
            <img src="http://books.google.com/books/content?id=eq0n9Ck79ysC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" alt="fun"/>
          </picture>
          <figcaption>Legend</figcaption>
        </figure> */

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
