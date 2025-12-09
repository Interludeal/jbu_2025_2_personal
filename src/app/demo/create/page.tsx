'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function CreateProject() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')

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

    if (!imageUrl) {
      setError('이미지를 선택해주세요.')
      return
    }

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      imgSrc: imageUrl,
      demoUrl: formData.get('demoUrl'),
      gitUrl: formData.get('gitUrl'),
    }

    try {
      setLoading(true)
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        alert('프로젝트가 생성되었습니다!')
        router.push('/demo')
      } else {
        setError(result.message || '프로젝트 생성에 실패했습니다.')
      }
    } catch (err) {
      setError('오류가 발생했습니다.')
      console.error(err)
    } finally {
      setLoading(false)
    }
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

        <h1 className="text-3xl font-bold text-black mb-8">프로젝트 생성</h1>

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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white placeholder-gray-500"
              placeholder="프로젝트 설명을 입력하세요 (HTML 태그 사용 가능, 예: &lt;br /&gt;)"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이미지 업로드 *
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
            {imageUrl && (
              <div className="mt-3 text-sm text-green-600">
                ✓ {fileName} 업로드 완료
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              데모 URL *
            </label>
            <input
              type="url"
              name="demoUrl"
              required
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white placeholder-gray-500"
              placeholder="Git 저장소 URL을 입력하세요"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 disabled:bg-gray-400"
            >
              {loading ? '생성 중...' : '프로젝트 생성'}
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
