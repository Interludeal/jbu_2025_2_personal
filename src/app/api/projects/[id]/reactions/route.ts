import { connectToDatabase } from '@/lib/mongodb'
import Project from '@/models/Project'
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { type } = await request.json()

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid project ID' },
        { status: 400 }
      )
    }

    if (!['like', 'dislike'].includes(type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid type' },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const updateData =
      type === 'like' ? { $inc: { likes: 1 } } : { $inc: { dislikes: 1 } }

    const project = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    })

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error('Error updating reaction:', error)
    return NextResponse.json(
      { success: false, message: 'Error updating reaction' },
      { status: 500 }
    )
  }
}
