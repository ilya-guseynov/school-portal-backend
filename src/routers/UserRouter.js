import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User.js'

const UserRouter = express.Router()

/**
 * Get all users.
 */
UserRouter.get('/', async (_, response) => {
  try {
    const users = await User.find()

    response.status(200).json({
      success: true,
      data: {
        users,
      },
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      data: {
        message: 'Failed to load users',
      },
    })
  }
})

/**
 * Get user by id.
 */
UserRouter.get('/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id)

    if (!user) {
      response.status(400).json({
        success: false,
        data: {
          message: 'User not found',
        },
      })
    }

    response.status(200).json({
      success: true,
      data: {
        user,
      },
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      data: {
        message: 'Failed to load user',
      },
    })
  }
})

/**
 * Delete user by id.
 */
UserRouter.delete('/:id', async (request, response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(request.params.id)

    response.status(200).json({
      success: true,
      data: {
        user: deletedUser,
      },
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      data: {
        message: 'Failed to remove User',
      },
    })
  }
})

/**
 * Create new user.
 */
UserRouter.post('/register', async (request, response) => {
  const {
    login,
    password,
    userType,
    firstName,
    lastName,
    middleName,
  } = request.body

  if (
    !login
    || !password
    || !userType
    || !firstName
    || !lastName
    || !middleName
  ) {
    response.status(400).json({
      success: false,
      data: {
        message: 'Bad input',
      },
    })

    return
  }

  try {
    const loginCheckList = await User.find({ login })

    if (loginCheckList.length > 0) {
      request.status(400).json({
        success: false,
        data: {
          message: `User with login "${login} already exists"`,
        },
      })

      return
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      login,
      password: passwordHash,
      userType,
      firstName,
      lastName,
      middleName,
    })

    await newUser.save()

    response.status(200).json({
      success: true,
      data: {
        user: newUser,
      },
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      data: {
        message: 'Failed to create User',
      },
    })
  }
})

/**
 * Login user.
 */
UserRouter.post('/login', async (request, response) => {
  const {
    login,
    password,
  } = request.body

  if (!login || !password) {
    response.status(400).json({
      success: false,
      data: {
        message: 'Bad input',
      },
    })

    return
  }

  try {
    const candidate = await User.findOne({ login })

    if (!candidate) {
      response.status(400).json({
        success: false,
        data: {
          message: `User with login "${login} doesn't exists"`,
        },
      })

      return
    }

    const passwordCorrect = await bcrypt.compare(password, candidate.password)

    if (!passwordCorrect) {
      response.status(400).json({
        success: false,
        data: {
          message: 'Bad input',
        },
      })

      return
    }

    response.status(200).json({
      success: true,
      data: {
        user: candidate,
      },
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      data: {
        message: 'Failed to create User',
      },
    })
  }
})

export {
  UserRouter,
}
