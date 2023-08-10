export const responseHandler = ({ data, error, cache = false, status = null }: any) => {
  if (error) {
    return {
      system: { cache, error: true, status: status || 500 },
      response: {
        error
      }
    }
  }

  return {
    system: { cache, error: false, status: status || 200 },
    response: {
      data
    }
  }
}
