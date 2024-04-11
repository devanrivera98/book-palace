export default function HomepageCarousel() {

  const carouselImages = [{ name: 'carousel-image-three', desktopImage: 'images/homepage-slider-three.png', mobileImage: 'images/homepage-slider-three-mini.png' }, { name: 'carousel-image-two', desktopImage: 'images/homepage-slider-two.png', mobileImage: 'images/homepage-slider-two-mini.png' }, { name: 'carousel-image-one', desktopImage: 'images/homepage-slider-one.png', mobileImage: 'images/homepage-slider-one-mini.png' }];

 return (
  <>
    <picture>
      <source srcSet={carouselImages[0].mobileImage} media="(max-width: 761px)"></source>
       <source srcSet={carouselImages[0].desktopImage} media="(max-width: 1200px)"></source>
      <img src={carouselImages[0].desktopImage} />
    </picture>
  </>
 )
}


// function HomepageScroller() {

//   return (
//     <>
//       <picture>
//         <source srcSet="images/homepage-slider-one-mini.png" media="(max-width: 761px)"></source>
//         <source srcSet="images/homepage-slider-one.png" media="(max-width: 1200px)"></source>
//         <img src="images/homepage-slider-one.png" />
//       </picture>
//     </>
//   )
// }
