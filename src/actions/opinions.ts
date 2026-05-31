export const sendRatingForm = (values: unknown): void => {
  console.log('inACTION', values)
}

export const verifyTaggedUser = async (value: unknown, userId: string): Promise<boolean> => {
  // TODO: check existence, friendship, and photo-tagging consent
  return true
}
