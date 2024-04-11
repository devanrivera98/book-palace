import { useState, useEffect } from "react";

export default function HomepageCarousel() {
  const carouselImages = [{ name: 'carousel-image-three', desktopImage: 'images/homepage-slider-three.png', mobileImage: 'images/homepage-slider-three-mini.png' }, { name: 'carousel-image-two', desktopImage: 'images/homepage-slider-two.png', mobileImage: 'images/homepage-slider-two-mini.png' }, { name: 'carousel-image-one', desktopImage: 'images/homepage-slider-one.png', mobileImage: 'images/homepage-slider-one-mini.png' }];

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

 return (
  <>
    <picture>
      <source srcSet={carouselImages[carouselCount].mobileImage} media="(max-width: 761px)"></source>
       <source srcSet={carouselImages[carouselCount].desktopImage} media="(max-width: 1200px)"></source>
      <img src={carouselImages[carouselCount].desktopImage} />
    </picture>
  </>
 )
}
