import { connectToDatabase } from '@/lib/mongodb'
import Project from '@/models/Project'
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { text } = await request.json()

    // Validate
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid project ID' },
        { status: 400 }
      )
    }

    if (!text || text.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Comment text is required' },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const project = await Project.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            _id: new ObjectId(),
            text: text.trim(),
            createdAt: new Date(),
          },
        },
      },
      { new: true }
    )

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
    console.error('Error adding comment:', error)
    return NextResponse.json(
      { success: false, message: 'Error adding comment' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { commentId } = await request.json()

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid project ID' },
        { status: 400 }
      )
    }

    if (!commentId || !ObjectId.isValid(commentId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid comment ID' },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const project = await Project.findByIdAndUpdate(
      id,
      {
        $pull: {
          comments: { _id: new ObjectId(commentId) },
        },
      },
      { new: true }
    )

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
    console.error('Error deleting comment:', error)
    return NextResponse.json(
      { success: false, message: 'Error deleting comment' },
      { status: 500 }
    )
  }
}
