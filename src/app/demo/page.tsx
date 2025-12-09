'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'

interface Project {
  _id: string
  title: string
  description: string
  imgSrc: string
  demoUrl: string
  gitUrl: string
  createdAt: string
  updatedAt: string
}

export default function Demo() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/projects')
      const data = await response.json()

      if (data.success) {
        setProjects(data.data)
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

  const handleDelete = async (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
        })
        const data = await response.json()

        if (data.success) {
          setProjects(projects.filter((p) => p._id !== id))
          alert('프로젝트가 삭제되었습니다.')
        }
      } catch (err) {
        alert('삭제 중 오류가 발생했습니다.')
        console.error(err)
      }
    }
  }

  const boxHoverStyle =
    'shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'

  const ProjectBox = ({ project }: { project: Project }) => (
    <div
      className={`group bg-white border-2 border-black rounded-2xl ${boxHoverStyle} mx-6 lg:mx-10`}
    >
      <div className="p-10 md:p-14 lg:p-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 items-start">
          {/* 이미지 부분 */}
          <div className="md:col-span-2">
            <div className="w-full relative overflow-hidden">
              <div
                className="relative w-full rounded-xl border-2 border-gray-400 overflow-hidden 
                              cursor-pointer group/image"
              >
                <Image
                  src={project.imgSrc}
                  alt={project.title}
                  width={380}
                  height={280}
                  style={{ objectFit: 'cover' }}
                  className="w-full h-auto group-hover/image:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </div>
          </div>

          {/* 텍스트 부분 */}
          <div className="md:col-span-3 flex flex-col h-full">
            <div className="flex-grow">
              <h1 className="text-2xl md:text-3xl font-bold text-black mb-5">
                {project.title}
              </h1>
              <p
                className="text-sm md:text-base text-gray-600 leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-between items-end">
              <div className="flex flex-wrap gap-2">
                <Link
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-all duration-200 flex items-center space-x-1 hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50"
                >
                  <span>데모 보기</span>
                  <svg
                    className="w-3 h-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>

                <Link
                  href={project.gitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-1 hover:ring-2 hover:ring-gray-300 hover:ring-opacity-50"
                >
                  <svg
                    className="w-3 h-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>소스코드</span>
                </Link>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/demo/edit/${project._id}`}
                  className="px-5 py-2 border-2 border-green-500 text-green-700 font-medium text-sm hover:border-green-600 hover:bg-green-50 transition-all duration-200 flex items-center space-x-1 hover:ring-2 hover:ring-green-500 hover:ring-opacity-50 rounded-lg"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>수정</span>
                </Link>

                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-5 py-2 border-2 border-red-500 text-red-700 font-medium text-sm hover:border-red-600 hover:bg-red-50 transition-all duration-200 flex items-center space-x-1 hover:ring-2 hover:ring-red-500 hover:ring-opacity-50 rounded-lg"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span>삭제</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="w-full">
          {/* 새로운 프로젝트 추가 버튼 */}
          <div className="flex justify-end mb-8">
            <Link
              href="/demo/create"
              className="px-6 py-3 bg-blue-300 text-blue-900 rounded-lg font-medium hover:bg-blue-400 transition-all duration-200 flex items-center space-x-2 hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50 shadow-md hover:shadow-lg"
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>새로운 프로젝트 추가</span>
            </Link>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-32">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">프로젝트 로딩 중...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-8">
              <p className="font-semibold">오류 발생</p>
              <p>{error}</p>
            </div>
          )}

          {!loading && projects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <svg
                className="w-24 h-24 text-blue-300 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="text-4xl font-bold text-gray-400 mb-3">
                아직 프로젝트가 없어요
              </h3>
              <p className="text-lg text-gray-500 mb-8 max-w-md">
                첫 번째 프로젝트를 추가해서 당신의 포트폴리오를 채워보세요!
              </p>
              <Link
                href="/demo/create"
                className="px-8 py-4 bg-gradient-to-r from-blue-300 to-blue-400 text-blue-900 rounded-lg font-semibold hover:from-blue-400 hover:to-blue-500 transition-all duration-200 flex items-center space-x-2 hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>프로젝트 생성하기</span>
              </Link>
            </div>
          )}

          {!loading && projects.length > 0 && (
            <div className="space-y-8">
              {projects.map((project) => (
                <ProjectBox key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
