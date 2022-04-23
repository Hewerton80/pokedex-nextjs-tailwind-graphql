export const removeFromArray = ([...array]: any[], item: any) => {
  const index = array.indexOf(item)
  if (index >= 0) {
    array.splice(index, 1)
  }
  return array
}
