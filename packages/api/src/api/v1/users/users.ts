import { responseHandler, security, is } from '@fixitshopcontrol/utils'
import { createToken, jwtVerify } from '@fixitshopcontrol/authentication'
import { db } from '../../../db/knexfile'

type User = {
  username: string
  password?: string
  email: string
  role: string
  active: boolean
}

type Login = {
  emailOrUsername: string
  password: string
}

export const getUserData = async (accessToken: any): Promise<any> => {
  const UserPromise = new Promise((resolve) => jwtVerify(accessToken, (user: any) => resolve(user)))

  const user = await UserPromise

  return user
}

export const getUserBy = async (where: any, roles: string[]): Promise<any> => {
  const [user] = await db('users')
    .select({
      id: 'id',
      username: 'username',
      password: 'password',
      email: 'email',
      role: 'role',
      active: 'active'
    })
    .where(where)

  if (user && roles.includes(user.role)) {
    return user
  }

  return null
}

export const authenticate = async (emailOrUsername: string, password: string): Promise<any> => {
  const where = is.Email(emailOrUsername)
    ? { email: emailOrUsername }
    : { username: emailOrUsername }

  const user = await getUserBy(where, ['god', 'admin', 'editor', 'user'])

  if (!user) {
    return responseHandler({
      error: {
        code: 'INVALID_LOGIN',
        message: 'Invalid Login'
      },
      status: 403
    })
  }

  const passwordMatch = is.PasswordMatch(security.encrypt(password), user.password)
  const isActive = user.active

  if (!passwordMatch) {
    return responseHandler({
      error: {
        code: 'INVALID_LOGIN',
        message: 'Invalid Login'
      },
      status: 403
    })
  }

  if (!isActive) {
    return responseHandler({
      error: {
        code: 'ACCOUNT_NOT_ACTIVATED',
        message: 'Your account is not activated yet'
      },
      status: 403
    })
  }

  const [token] = await createToken(user)

  return responseHandler({
    data: {
      token
    }
  })
}

export const getUser = async (at: string) => {
  const connectedUser = await getUserData(at)

  if (connectedUser) {
    // Re-validating if the user is still valid
    const user = await getUserBy(
      {
        id: connectedUser.id,
        email: connectedUser.email,
        active: connectedUser.active
      },
      [connectedUser.role]
    )

    if (user) {
      return responseHandler({
        data: connectedUser
      })
    }
  }

  return responseHandler({
    error: {
      code: 'INVALID_TOKEN',
      message: 'Invalid Token'
    }
  })
}

export const getUsers = async () => {
  try {
    const usersData = await db('users').select({
      id: 'id',
      username: 'username',
      email: 'email',
      role: 'role',
      active: 'active'
    })

    if (usersData) {
      return responseHandler({
        data: usersData
      })
    }
  } catch (error) {
    return responseHandler({ error })
  }

  return null
}

export const deleteUser = async (id: string) => {
  try {
    const user = await db('users').select().where({ id })

    if (user.length === 0) {
      return responseHandler({
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        },
        status: 404
      })
    }

    await db('users').delete().where({ id })

    return responseHandler({
      data: {
        ...user[0]
      }
    })
  } catch (error) {
    return responseHandler({
      error: {
        code: 'SERVER_ERROR',
        message: 'An error occurred, please try again later.'
      }
    })
  }
}

export const editUser = async (id: string, { password = '', active = false, role = '' }: User) => {
  const encryptedPassword = security.encrypt(password)

  try {
    const user = await db('users')
      .select({
        id: 'id',
        username: 'username',
        email: 'email',
        role: 'role',
        active: 'active'
      })
      .where({ id })

    if (user.length === 0) {
      return responseHandler({
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        },
        status: 404
      })
    }

    const userToEdit = {
      password: encryptedPassword,
      active,
      role
    }

    await db('users').update(userToEdit).where({ id })

    const editedUserData = await db('users')
      .select({
        id: 'id',
        username: 'username',
        email: 'email',
        role: 'role',
        active: 'active'
      })
      .where({ id })

    return responseHandler({
      data: editedUserData[0]
    })
  } catch (error) {
    return responseHandler({
      error: {
        code: 'SERVER_ERROR',
        message: 'An error occurred, please try again later.'
      }
    })
  }
}

export const createUser = async ({
  username = '',
  password = '',
  email = '',
  role = '',
  active = false
}: User) => {
  const encryptedPassword = security.encrypt(password)

  // Check if required fields are filled out
  try {
    if (username === '' || password === '' || email === '' || role === '') {
      return responseHandler({
        error: {
          code: 'MISSING_FIELDS',
          message:
            'Username, password, email and role are required. Please fill out all required fields.'
        },
        status: 400
      })
    }

    // Check if username or email already exists
    const userData = await db('users').select({ id: 'id' }).where({ username }).orWhere({ email })

    if (userData.length > 0) {
      return responseHandler({
        error: {
          code: 'USERNAME_OR_EMAIL_EXISTS',
          message:
            'Username or email already exists. Please try again with a different username or email.'
        },
        status: 400
      })
    }

    // Create new user
    const userToInsert = {
      username,
      password: encryptedPassword,
      email,
      role,
      active
    }

    await db('users').insert(userToInsert)

    const newUserData = await db('users')
      .select({
        id: 'id',
        username: 'username',
        email: 'email',
        role: 'role',
        active: 'active'
      })
      .where({ email })

    return responseHandler({
      data: newUserData[0]
    })
  } catch (error) {
    return responseHandler({
      error: {
        code: 'SERVER_ERROR',
        message: 'An error occurred, please try again later.'
      }
    })
  }
}

export const login = async ({ emailOrUsername = '', password = '' }: Login) =>
  authenticate(emailOrUsername, password)
