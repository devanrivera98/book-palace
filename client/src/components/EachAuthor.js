import { useNavigate } from "react-router-dom";

export default function EachAuthor({author, image, alt  }) {
  const navigate = useNavigate();

  async function findBooks(author) {
    try {
      console.log(author)
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&key=${process.env.REACT_APP_API_KEY}`)
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`)
      }
      const jsonData = await response.json();
      navigate("/results", { state: jsonData })
    }
    catch (error) {
      console.error('Error fetching image data', error)
    }
  }

  return (
    <>
      <div className="pointer-finger col-4 mx-2 d-flex flex-column" onClick={() => findBooks(author)}>
        <img className="w-100 rounded" src={image} alt={alt}></img>
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <h5>{author}</h5>
        </div>
      </div>
    </>
  )
}
