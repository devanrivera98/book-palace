export const handleImageClick = async (title, isbn, navigateFunction) => {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+isbn:${isbn}&key=${process.env.REACT_APP_API_KEY}`)
    if (!response.ok) {
      throw new Error(`Response error: ${response.status}`)
    }
    const jsonData = await response.json();
    const navigate = navigateFunction;
    return navigate("/info", { state: jsonData.items[0] })

  }
  catch (error) {
    console.error('Error fetching image data', error)
  }
}
