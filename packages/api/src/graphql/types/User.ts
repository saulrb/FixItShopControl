import gql from 'graphql-tag'

export default gql`
  type User {
    id: UUID!
    username: String!
    email: String!
    role: String!
    active: Boolean!
    createdAt: Datetime!
    updatedAt: Datetime!
    _DEBUG: JSON
  }

  type UserResponse {
    users: [User!]!
  }

  union UserResult = UserResponse | Error
  union LoginResult = Token | Error

  type Token {
    token: String!
  }

  type Query {
    getUser(at: String!): UserResult
    getUsers: UserResult
  }

  type Mutation {
    createUser(input: ICreateUser): UserResult
    login(input: ILogin): LoginResult!
    editUser(id: UUID!, input: IEditUser): UserResult
    deleteUser(id: UUID!): UserResult
  }

  input IEditUser {
    password: String
    active: Boolean
    role: String
  }

  input ILogin {
    emailOrUsername: String!
    password: String!
  }

  input ICreateUser {
    username: String!
    password: String!
    email: String!
    active: Boolean!
    role: String!
  }

  input ILogin {
    emailOrUsername: String!
    password: String!
  }
`
