export const changeScrollPosition = (container, itemW, direction) => {
  if (container.current) {
    const currentScrollPosition = container.current.scrollLeft;
    console.log(currentScrollPosition)
    let newScrollPosition;
    if (direction === 'next') {
      newScrollPosition = currentScrollPosition + itemW;
    } else {
      newScrollPosition = currentScrollPosition - itemW;
    }
    container.current.scrollLeft = newScrollPosition;
  }
};
