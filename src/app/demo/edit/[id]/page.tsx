'use client'

import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

interface Project {
  _id: string
  title: string
  description: string
  imgSrc: string
  demoUrl: string
  gitUrl: string
}

export default function EditProject() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [project, setProject] = useState<Project | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')

  useEffect(() => {
    if (id) {
      fetchProject()
    }
  }, [id])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${id}`)
      const data = await response.json()

      if (data.success) {
        setProject(data.data)
        setImageUrl(data.data.imgSrc)
      } else {
        setError('프로젝트를 불러올 수 없습니다.')
      }
    } catch (err) {
      setError('오류가 발생했습니다.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setImageUrl(result.url)
        setFileName(file.name)
      } else {
        setError(result.message || '이미지 업로드에 실패했습니다.')
      }
    } catch (err) {
      setError('이미지 업로드 중 오류가 발생했습니다.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      imgSrc: imageUrl,
      demoUrl: formData.get('demoUrl'),
      gitUrl: formData.get('gitUrl'),
    }

    try {
      setSubmitting(true)
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        alert('프로젝트가 수정되었습니다!')
        router.push('/demo')
      } else {
        setError(result.message || '프로젝트 수정에 실패했습니다.')
      }
    } catch (err) {
      setError('오류가 발생했습니다.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-600">로딩 중...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-red-600">프로젝트를 찾을 수 없습니다.</p>
          <Link
            href="/demo"
            className="text-blue-600 hover:text-blue-700 mt-4 inline-block"
          >
            돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/demo"
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mb-8"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          돌아가기
        </Link>

        <h1 className="text-3xl font-bold text-black mb-8">프로젝트 수정</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-black rounded-2xl p-8"
        >
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프로젝트 제목 *
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={project.title}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white placeholder-gray-500"
              placeholder="프로젝트 제목을 입력하세요"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프로젝트 설명 *
            </label>
            <textarea
              name="description"
              required
              rows={5}
              defaultValue={project.description}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white placeholder-gray-500"
              placeholder="프로젝트 설명을 입력하세요 (HTML 태그 사용 가능, 예: &lt;br /&gt;)"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이미지 업로드
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-black bg-white"
              />
              {uploading && (
                <div className="absolute inset-0 bg-white bg-opacity-50 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-600">업로드 중...</span>
                </div>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              {fileName
                ? `✓ ${fileName} 업로드 완료`
                : '현재 이미지: ' + imageUrl?.split('/').pop()}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              데모 URL *
            </label>
            <input
              type="url"
              name="demoUrl"
              required
              defaultValue={project.demoUrl}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white placeholder-gray-500"
              placeholder="데모 URL을 입력하세요"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Git 저장소 URL *
            </label>
            <input
              type="url"
              name="gitUrl"
              required
              defaultValue={project.gitUrl}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white placeholder-gray-500"
              placeholder="Git 저장소 URL을 입력하세요"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 disabled:bg-gray-400"
            >
              {submitting ? '수정 중...' : '프로젝트 수정'}
            </button>
            <Link
              href="/demo"
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 text-center"
            >
              취소
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
