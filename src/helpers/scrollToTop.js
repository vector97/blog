export function ScrollToTop() {
  const move = () => {
    window.scrollTo({
      top: 0,
      left: 0,
    })
  }
  return <div>{move()}</div>
}
