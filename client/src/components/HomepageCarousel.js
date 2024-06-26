import { cheerfullyRefuseBook } from "../recommended-books/cheerfully-refuse";
import { awardBooks } from "../recommended-books/national-award-books";
import { ourFavoriteBooks } from "../recommended-books/our-favorites-books";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoDot, GoDotFill } from "react-icons/go";


export default function HomepageCarousel() {
  const carouselImages = [{ name: 'carousel-image-three', desktopImage: 'images/homepage-slider-three.png', mobileImage: 'images/homepage-slider-three-mini.png', list: awardBooks, navType: '/results' }, { name: 'carousel-image-two', desktopImage: 'images/homepage-slider-two.png', mobileImage: 'images/homepage-slider-two-mini.png', list: ourFavoriteBooks, navType: '/results' }, { name: 'carousel-image-one', desktopImage: 'images/homepage-slider-one.png', mobileImage: 'images/homepage-slider-one-mini.png', list: cheerfullyRefuseBook, navType: '/info' }];

  const navigate = useNavigate();
  const [carouselCount, setCarouselCount] = useState(0)

  useEffect(() => {

    function IncreaseCount() {
      setCarouselCount(((carouselCount + 1) % carouselImages.length));
    }


    const interval = setInterval(IncreaseCount, 3500)
    return () => {
      clearInterval(interval)
    }
  }, [carouselCount])

  function viewBooks(navType, list) {
    navigate(navType, { state: list })
  }

 return (
  <>
    <picture className="pointer-finger">
      <source srcSet={carouselImages[carouselCount].mobileImage} media="(max-width: 761px)"></source>
       <source srcSet={carouselImages[carouselCount].desktopImage} media="(max-width: 1200px)"></source>
      <img src={carouselImages[carouselCount].desktopImage} onClick={() => viewBooks(carouselImages[carouselCount].navType, carouselImages[carouselCount].list)} />
    </picture>
    <div className="mx-auto">
       <HomepageCarouselButton currentCount={carouselCount} value={0} onClick={() => setCarouselCount(0)}/>
       <HomepageCarouselButton currentCount={carouselCount} value={1} onClick={() => setCarouselCount(1)} />
       <HomepageCarouselButton currentCount={carouselCount} value={2} onClick={() => setCarouselCount(2)} />
    </div>
  </>
 )
}


function HomepageCarouselButton({currentCount, value, onClick}) {

    return (
      <>
      {currentCount === value ?
          <GoDotFill className="pointer-finger" style={{ fontSize: '35px', margin: '0 10px' }} onClick={onClick} />
        :
          <GoDot className="pointer-finger" style={{ fontSize: '35px', margin: '0 10px' }} onClick={onClick} />
      }
      </>
    )
}
