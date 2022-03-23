import express from 'express'
import { Group } from '../models/Group.js'

const GroupRouter = express.Router()

/**
 * Get all groups.
 */
GroupRouter.get('/', async (_, response) => {
  try {
    const groups = await Group.find()

    response.status(200).json({
      success: true,
      data: {
        groups,
      },
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      data: {
        message: 'Failed to load groups',
      },
    })
  }
})

/**
 * Get group by id.
 */
GroupRouter.get('/:id', async (request, response) => {
  try {
    const group = await Group.findById(request.params.id)

    if (!group) {
      response.status(400).json({
        success: false,
        data: {
          message: 'Group not found',
        },
      })
    }

    response.status(200).json({
      success: true,
      data: {
        group,
      },
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      data: {
        message: 'Failed to load group',
      },
    })
  }
})

/**
 * Delete group by id.
 */
GroupRouter.delete('/:id', async (request, response) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(request.params.id)

    response.status(200).json({
      success: true,
      data: {
        group: deletedGroup,
      },
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      data: {
        message: 'Failed to delete group',
      },
    })
  }
})

/**
 * Create new group.
 */
GroupRouter.post('/', async (request, response) => {
  const { title } = request.body

  if (!title) {
    response.status(400).json({
      success: false,
      data: {
        message: 'Bad input',
      },
    })

    return
  }

  try {
    const titleCheckList = await Group.find({ title })

    if (titleCheckList.length > 0) {
      response.status(400).json({
        success: false,
        data: {
          message: 'Group with provided title already exists',
        },
      })

      return
    }

    const newGroup = new Group({ title })
    await newGroup.save()

    response.status(200).json({
      success: true,
      data: {
        group: newGroup,
      },
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      data: {
        message: 'Failed to create group',
      },
    })
  }
})

export {
  GroupRouter,
}
