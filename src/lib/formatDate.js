export const formatDate = (date) => {
  const dateToFormat = new Date(date)
  const day = dateToFormat.getDate()
  const month = dateToFormat.getMonth() + 1
  const year = dateToFormat.getFullYear()

  const formatedDate = `${day}/${month}/${year}`
  return formatedDate
}
