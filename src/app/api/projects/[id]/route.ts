import { connectToDatabase } from '@/lib/mongodb'
import Project from '@/models/Project'
import { NextRequest, NextResponse } from 'next/server'
import { Types } from 'mongoose'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()

    const { id } = params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid project ID',
        },
        { status: 400 }
      )
    }

    const project = await Project.findById(id)

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: 'Project not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch project',
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()

    const { id } = params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid project ID',
        },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { title, description, imgSrc, demoUrl, gitUrl } = body

    const project = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        imgSrc,
        demoUrl,
        gitUrl,
      },
      { new: true, runValidators: true }
    )

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: 'Project not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update project',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()

    const { id } = params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid project ID',
        },
        { status: 400 }
      )
    }

    const project = await Project.findByIdAndDelete(id)

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: 'Project not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Project deleted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete project',
      },
      { status: 500 }
    )
  }
}
