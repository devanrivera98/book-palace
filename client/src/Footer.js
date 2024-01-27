export default function Footer({placement}) {
  return (
    <>
    <footer className={`${placement} footer-position footer-container mt-5 py-3`}>
      <div className="d-flex justify-content-center  footer-image-box">
          <a href="https://github.com/devanrivera98">
            <img className="mx-3 icon-image" src="images/github-logo-book.png" />
          </a>
          <a href="https://devanrivera.netlify.app/">
            <img className="mx-3 icon-image bg-white" src="images/resume-icon.jpeg" />
          </a>
          <a href="https://www.linkedin.com/in/devanrivera/">
            <img className="mx-3 icon-image" src="images/linkedin-logo.png" />
          </a>
      </div>
      <div className="d-flex py-2 justify-content-center">
        <a href="/home">
          <h4 className="px-3 my-auto footer-title">Home</h4>
        </a>
        <a href="/wishlist">
          <h4 className="px-3 my-auto footer-title">Wishlist</h4>
        </a>
        <a href="/checkout">
          <h4 className="px-3 my-auto footer-title">Cart</h4>
        </a>
      </div>
      <div className="d-flex justify-content-center">
        <h6 className="text-center my-auto">@2024 Devan Rivera | All Rights Reserved</h6>
      </div>
    </footer>
    </>

  )
}
