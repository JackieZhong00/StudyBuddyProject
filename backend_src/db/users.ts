import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  pictureUpload: {
    type: String,
    required: false
  },
  dates: {
    type: [Date],
    required: false,
  },
  locations: {
    type: [String],
    required: false,
  },
  promptResponses: {
    type: [String],
    required: false,
  },
  savedEvents: {
    type: [Object],
    required: false
  },
  contactInfo: {
    type: String,
    required: false
  },
  
  authentication: {
    password: {
      type: String,
      required: true,
      select: false, // avoids fetching all users by fetching entire auth object
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
})

export const UserModel = mongoose.model('User', UserSchema)

export const getUsers = () => {
  return UserModel.find()
}

export const getUserByEmail = (email: string) => {
  return UserModel.findOne({ email })
}

export const getUserBySessionToken = (sessionToken: string) => {
  return UserModel.findOne({
    'authentication.sessionToken': sessionToken,
  })
}

export const getUserById = (id: string) => {
  return UserModel.findById(id)
}

export const createUser = (values: Record<string, any>) => {
 return new UserModel(values).save().then((user) => user.toObject())
}

export const deleteUserById = (id: string) => {
  return UserModel.findOneAndDelete({ _id: id })
}

export const updateUserById = (id: string, values: Record<string, any>) => {
  return UserModel.findByIdAndUpdate(id, values)
}

