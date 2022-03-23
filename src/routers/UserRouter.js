import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User.js'

const UserRouter = express.Router()

UserRouter.get('/', async (req, res) => {
  try {
    const users = await User.find()

    res.status(200).json({
      success: true,
      data: {
        users,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: 'Failed to load Users',
    })
  }
})

UserRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: 'Failed to load User',
    })
  }
})

UserRouter.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: 'Failed to remove User',
    })
  }
})

UserRouter.post('/register', async (req, res) => {
  const {
    login,
    password,
    userType,
    firstName,
    lastName,
    middleName,
  } = req.body

  if (
    !login
    || !password
    || !userType
    || !firstName
    || !lastName
    || !middleName
  ) {
    res.status(400).json({
      success: false,
      data: {
        message: 'Bad input'
      },
    })

    return
  }

  try {
    const loginCheckList = await User.find({ login })

    if (loginCheckList.length > 0) {
      req.status(400).json({
        success: false,
        data: {
          message: `User with login "${login} already exists"`
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

    newUser.save()

    res.status(200).json({
      success: true,
      data: {
        user: newUser,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {
        message: 'Failed to create User',
      },
    })
  }
})

UserRouter.post('/login', async (req, res) => {
  const {
    login,
    password,
  } = req.body

  if (!login || !password) {
    res.status(400).json({
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
      res.status(400).json({
        success: false,
        data: {
          message: `User with login "${login} doesn't exists"`,
        },
      })

      return
    }

    const passwordCorrect = await bcrypt.compare(password, candidate.password)

    if (!passwordCorrect) {
      res.status(400).json({
        success: false,
        data: {
          message: 'Bad input',
        },
      })

      return
    }

    res.status(200).json({
      success: true,
      data: {
        user: candidate,
      },
    })
  } catch (error) {
    res.status(500).json({
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
