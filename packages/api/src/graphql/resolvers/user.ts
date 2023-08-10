// Queries
const getUsers = async (_: any, _args: any, { request }: { request: any }) => {
  const {
    response: { data, error }
  } = await request('/users')

  if (data.length > 0) {
    return {
      __typename: 'UserResponse',
      users: data
    }
  }

  return {
    __typename: 'Error',
    error
  }
}

const getUser = async (_: any, { at }: { at: string }, { request }: { request: any }) => {
  const {
    response: { data, error }
  } = await request('/users/validate', {
    method: 'POST',
    body: {
      at
    }
  })

  if (data) {
    return {
      __typename: 'UserResponse',
      users: [data]
    }
  }

  return {
    __typename: 'Error',
    error
  }
}

// Mutations
const createUser = async (
  _: any,
  { input: body }: { input: any },
  { request }: { request: any }
) => {
  const {
    response: { data, error }
  } = await request('/users/create', {
    method: 'POST',
    body
  })

  if (data) {
    return {
      __typename: 'UserResponse',
      users: [data]
    }
  }

  return {
    __typename: 'Error',
    error
  }
}

const login = async (_: any, { input }: { input: any }, { request }: { request: any }) => {
  const {
    response: { data, error }
  } = await request('/users/login', {
    method: 'POST',
    body: input
  })

  if (!data) {
    return {
      __typename: 'Error',
      error
    }
  }

  return {
    __typename: 'Token',
    token: data.token
  }
}

const editUser = async (
  _: any,
  { id, input }: { id: any; input: any },
  { request }: { request: any }
) => {
  const {
    response: { data, error }
  } = await request(`/users/${id}`, {
    method: 'PUT',
    body: input
  })

  if (!data) {
    return {
      __typename: 'Error',
      error
    }
  }

  return {
    __typename: 'UserResponse',
    users: [data]
  }
}

const deleteUser = async (_: any, { id }: { id: any }, { request }: { request: any }) => {
  const {
    response: { data, error }
  } = await request(`/users/${id}`, {
    method: 'DELETE'
  })

  if (!data) {
    return {
      __typename: 'Error',
      error
    }
  }

  return {
    __typename: 'UserResponse',
    users: [data]
  }
}

export default {
  Query: {
    getUsers,
    getUser
  },
  Mutation: {
    createUser,
    login,
    editUser,
    deleteUser
  }
}
