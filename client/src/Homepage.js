import { useNavigate } from "react-router-dom"
import { useRef } from "react";
import { ourFavoriteBooks } from "./recommended-books/our-favorites-books"
import { trendingBooks } from "./recommended-books/recommended-trending-books";
import EachAuthor from "./components/EachAuthor";
import { recommendationModern } from "./recommended-books/recommended-modern-books";
import { recommendationClassics } from "./recommended-books/recommended-classic-books";
import { changeScrollPosition } from "./functions/changeScrollPosition";
import { handleImageClick } from "./functions/handleImageClick";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Footer from "./Footer";


export default function Homepage() {

  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <>
    {/* <HomepageScroller/> */}
    <div className="">
      <img src="images/homepage-slider-one.png" className="w-100"></img>
      <img src="images/slider-two.png" className="w-100" />
    </div>
    <div className="max">
      {/* <HomepageImage /> */}
      <ViewByAuthor />
      <RecommendationModernClassics />
      <HomepageBanner />
      <RecommendationThisMonth />
    </div>
      {/* <HomepageImage/>
      <ViewByAuthor/>
      <RecommendationModernClassics/>
      <HomepageBanner/>
      <RecommendationThisMonth/> */}
      <Footer />
    </>
  )
}

function HomepageScroller() {

  return (
    <>
      <picture>
        <source srcSet="images/homepage-slider-one-mini.png" media="(max-width: 761px)"></source>
        <source srcSet="images/homepage-slider-one.png" media="(max-width: 1200px)"></source>
        <img src="images/homepage-slider-one.png"/>
      </picture>
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
    <div className="p-2 pt-4">
      <div className="px-2">
        <h3>Shop by Top Authors</h3>
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

  const mapModern = recommendationModern.map(item =>
    <figure key={item.isbn} onClick={() => handleImageClick(item.title, item.isbn, navigate)} >
      <picture>
        <img src={item.image} alt={item.title} />
      </picture>
      <figcaption className="underline">{item.title}</figcaption>
      <p>By {item.author}</p>
      <p>${item.price.toFixed(2)}</p>
    </figure>
  )

  return (
    <div className='pt-4'>
      <hr></hr>
      <div className="row-title ">
        <h3>Modern Favorites</h3>
      </div>
      <div className="position-relative ">
        <FaArrowAltCircleLeft className="left-arrow user-select-none" onClick={() => { changeScrollPosition(containerRef, itemWidth, 'prev'); }} />
        <FaArrowAltCircleRight className="right-arrow user-select-none" onClick={() => { changeScrollPosition(containerRef, itemWidth,'next'); }}  />
        <div className="horizontal-media-scroller mx-auto" ref={containerRef}>
          {mapModern}
        </div>
      </div>
    </div>
  );
}

function RecommendationThisMonth() {
  const navigate = useNavigate()
  const containerRef = useRef(null);
  const itemWidth = 200;


  const mapModern = recommendationClassics.map(item =>
    <figure key={item.isbn} onClick={() => handleImageClick(item.title, item.isbn, navigate)} >
      <picture>
        <img src={item.image} alt={item.title} />
      </picture>
      <figcaption className="underline">{item.title}</figcaption>
      <p>By {item.author}</p>
      <p>${item.price.toFixed(2)}</p>
    </figure>
  )

  return (
    <div className='pt-4'>
      <hr></hr>
      <div className="row-title ">
        <h3>Instant Classics</h3>
      </div>
      <div className="position-relative ">
        <FaArrowAltCircleLeft className="left-arrow user-select-none" onClick={() => { changeScrollPosition(containerRef, itemWidth, 'prev'); }} />
        <FaArrowAltCircleRight className="right-arrow user-select-none" onClick={() => { changeScrollPosition(containerRef, itemWidth, 'next'); }} />
        <div className="horizontal-media-scroller mx-auto" ref={containerRef}>
          {mapModern}
        </div>
      </div>
    </div>
  );
}

function HomepageBanner() {
  const navigate = useNavigate();

  function viewTrendingBooks() {
    navigate('/results', { state: trendingBooks })
  }

  return (
    <>
    <div className="homepage-second-banner mt-4 mt-md-2 mx-auto">
      <div className="homepage-two-columns row ">
        <div className="col-md-5 trending-banner my-auto">
          <h1 className="trending-first-title col-11 mx-auto text-white">Trending Favorites of 2023</h1>
          <h5 className="col-11 mx-auto text-white">Discover the most popular books from this past year!</h5>
          <button className="trending-button" onClick={viewTrendingBooks}>Check them out!</button>
        </div>
        <div className="col-md-7 d-flex justify-content-center">
            <div className="trending-image-container">
              <img className="trending-image" src="images/book-row-one.png" />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
