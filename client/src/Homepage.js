import './App.css';
import {useState, useEffect} from 'react'

export default function Homepage() {

  // useEffect(() => {
  //   async function fetchBook() {
  //     try {
  //       const response = await fetch(`http https://www.googleapis.com/books/v1/volumes?q=${recommendationClassics.title}+isbn:${recommendationClassics.isbn}key=AIzaSyCQ7EBy8yMIYuOdh350WfDgEwWKGJSWAh4`);
  //       const jsonData = await response.json();
  //       if (response.ok) {
  //         return console.log('My book requests', jsonData)
  //         // do not do anything but console log until more info page is created
  //       }
  //       throw new Error('An error occurred')
  //     }
  //     catch (err) {

  //     }
  //   }
  //   fetchBook();
  // }, [])

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
    <div className='image-holder d-flex justify-content-center'>
     <div>
        <img className='img library img-fluid justify-content-center' alt='library' src='https://img.freepik.com/free-vector/literature-book-club-twitch-banner-template_23-2149730151.jpg'></img>
     </div>
    </div>

  )
}

function RecommendationModernClassics() {

  const handleImageClick = async (title, isbn) => {

    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+isbn:${isbn}&key=AIzaSyCQ7EBy8yMIYuOdh350WfDgEwWKGJSWAh4`)
      console.log(response)
      const jsonData = await response.json();
      if (response.ok) {
        return console.log('My book requests', jsonData);
      }
    }
    catch (error) {
      console.error('Error fetching image data', error)
    }
  }

  const recommendationModern = [{ title: 'The+Overstory', isbn: '9780393356687', image: 'http://books.google.com/books/content?id=AmxFtwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' }, { title: 'Dune', isbn: '9780143111580', image: 'http://books.google.com/books/content?id=ydQiDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, { title: 'Gone+Girl', isbn: '9780553418361', image: 'http://books.google.com/books/content?id=pd6MDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, { title: 'The+Circle', isbn: '9780385351409', image: 'http://books.google.com/books/content?id=sbxWAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, {
    title: 'The+Goldfinch', isbn: '9780316248679', image: 'http://books.google.com/books/content?id=dvuK7isszLIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'}, { title: 'Piranesi', isbn: '9781635575644', image: 'http://books.google.com/books/content?id=FCTYDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, { title: 'Fun+Home', isbn: '9780618871711', image: 'http://books.google.com/books/content?id=eq0n9Ck79ysC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, { title: 'Pachinko+(National+Book+Award+Finalist)', isbn: '9781455563913', image: 'http://books.google.com/books/content?id=cxteDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }]

  const mapModern = recommendationModern.map(recommendationModern =>
    <img className='p-2 img-fluid recommended-books' onClick={() => handleImageClick(recommendationModern.title, recommendationModern.isbn)} key={recommendationModern.isbn} alt={recommendationModern.title} src={recommendationModern.image} />
  )

  return (
    <div className='pt-5 px-3'>
      <div className='our-recommendations'>
        <h3>Modern Classics</h3>
      </div>
      <div style={{ backgroundColor: '#D9D9D9'}}>
        <div className='px-3 row justify-content-between'>
          {mapModern}
        </div>
      </div>
    </div>
  )
}

function RecommendationThisMonth() {


  const handleImageClick = async (title, isbn) => {

    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+isbn:${isbn}&key=AIzaSyCQ7EBy8yMIYuOdh350WfDgEwWKGJSWAh4`)
      console.log(response)
      const jsonData = await response.json();
      if (response.ok) {
        return console.log('My book requests', jsonData);
      }
    }
    catch (error) {
      console.error('Error fetching image data', error)
    }
  }

  // schema might need to change price from text to decimal
  const recommendationClassics = [{ title: 'Fences', isbn: '9780593087589', image: 'http://books.google.com/books/content?id=HE-iDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, { title: 'The Great Gatsby', isbn: '9780143136125', image: 'http://books.google.com/books/content?id=Al4NEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, { title: 'The Outsider', isbn: '9781501180989', image: 'http://books.google.com/books/content?id=yK_iyQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' }, { title: 'Invisible Man', isbn: '9780307743992', image: 'http://books.google.com/books/content?id=iSrI-BQqFf0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, {
    title: 'Beloved', isbn: '9781400033416', image: 'http://books.google.com/books/content?id=bm-KDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'}, { title: 'Little Women', isbn: '9780140390698', image: 'http://books.google.com/books/content?id=MO3SEL6qIsgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }, { title: 'On the Road: the Original Scroll', isbn: '9780143105466', image: 'http://books.google.com/books/content?id=DaKMEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' }, { title: 'The Awakening', isbn: '9780553213300', image: 'http://books.google.com/books/content?id=dfdvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'}]

  const mapClassics = recommendationClassics.map(recommendationClassics =>
    <img className='p-2 img-fluid recommended-books' onClick={() => handleImageClick(recommendationClassics.title, recommendationClassics.isbn)} key={recommendationClassics.isbn} alt={recommendationClassics.title} src={recommendationClassics.image} />
  )

  return (
    <div className='pt-5 px-3'>
      <div className='our-recommendations'>
        <h3>Top Books This Month</h3>
      </div>
      <div style={{ backgroundColor: '#D9D9D9' }}>
        <div className='px-3 row justify-content-between'>
          {mapClassics}
        </div>
      </div>
    </div>
  )
}



function AboutUs() {
  return (
    <div className='pt-5 pb-3 px-5 about-us d-flex'>
      <div className='justify-content-center text-center' style={{ backgroundColor: '#F6F1E9' }}>
        <h3 className='text-align-center'>Our Promise</h3>
        <p>We will have all your favorite books. No matter what you’re a fan of, from Mystery to Romance, Adventure, History, Anime, and more. Discover books including classics like Brave New World to modern favorites like Gone Girl.</p>
      </div>
    </div>
  )
}
