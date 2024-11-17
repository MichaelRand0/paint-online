function calculatePx(screenWidth: number, targetPx: number) {
  const currentWidth = window.innerWidth
  const proportion = currentWidth / screenWidth
  return Math.round(targetPx * proportion)
}

export default calculatePx
