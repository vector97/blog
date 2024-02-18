export const getChangedData = (fields, data) => {
  const changedData = {}

  Object.keys(fields).forEach((key) => {
    if (fields[key] !== data[key] && fields[key] !== '') {
      changedData[key] = fields[key]
    }
  })

  return changedData
}
