import uniqid from 'uniqid'

export const addIdForTags = (arr) => arr.map((tag) => ({ tag, id: uniqid() }))
