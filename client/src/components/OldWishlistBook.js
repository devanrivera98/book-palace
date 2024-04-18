// export default function OldWishlistBook({ book, index }) {
//   const { wishlistId, title, author, image, price, rating, isbn } = book;
//   const bookId = `book-id-${wishlistId}`;

//   return (
//     <li key={bookId} id={wishlistId} className="py-2 my-3" style={{ backgroundColor: '#F8F4EA' }}>
//       <div className="row px-2">
//         <div className="col-lg-3 col-md-3 col-3 d-flex justify-content-center" >
//           <img className="wishlist-image img-fluid" alt={title} src={image} onClick={() => NavigateToBook(navigate, title, isbn)} style={{ maxHeight: '205px', minHeight: '137px' }} />
//         </div>
//         <div className="col-lg-9 col-md-9 col-9 pt-1 d-flex flex-column justify-content-between">
//           <div>
//             <div className="d-flex justify-content-end align-items-center">
//               <RxCross1 className="hover-button" onClick={deleteItem} />
//             </div>
//             <div className="row">
//               <div className="col-12">
//                 <h5>{title}</h5>
//               </div>
//             </div>
//             <div>
//               <h6>By: {author}</h6>
//               <ul className="list-inline">Rating: {stars}</ul>
//             </div>
//           </div>
//           <div className="d-flex justify-content-end align-items-end">
//             <div>
//               <h4>Price: ${price}</h4>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row mx-1 pt-2">
//         {isTooMany === false && (
//           <button type="button" className="dark-purple-button btn-lg btn-block rounded" onClick={addToCart}>ADD TO CART
//           </button>
//         )}
//         {isTooMany === true && (
//           <button type="button" className="dark-purple-button btn-lg btn-block rounded" onClick={viewCart}>VIEW CART
//           </button>)}
//       </div>

//     </li>
//   )
// }
