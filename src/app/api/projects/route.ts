import { connectToDatabase } from '@/lib/mongodb'
import Project from '@/models/Project'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectToDatabase()

    const projects = await Project.find({}).sort({ createdAt: -1 })

    return NextResponse.json(
      {
        success: true,
        data: projects,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch projects',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()

    const body = await request.json()

    const { title, description, imgSrc, demoUrl, gitUrl } = body

    if (!title || !description || !imgSrc || !demoUrl || !gitUrl) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      )
    }

    const project = await Project.create({
      title,
      description,
      imgSrc,
      demoUrl,
      gitUrl,
    })

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create project',
      },
      { status: 500 }
    )
  }
}
