'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const LinkIconSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

interface MemberProps {
  name: string
  role: string
  imgSrc: string
  githubUrl: string
  blogUrl: string
}

const TeamMemberCard = ({
  member,
  onOpen,
}: {
  member: MemberProps
  onOpen: () => void
}) => {
  const cardHoverStyle =
    'hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 cursor-pointer'

  return (
    <div
      onClick={onOpen}
      className={`bg-white border-2 border-gray-300 rounded-lg p-4 text-center ${cardHoverStyle}`}
    >
      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3 relative border border-gray-200">
        <Image
          src={member.imgSrc}
          alt={member.name + ' 프로필'}
          fill
          style={{ objectFit: 'cover' }}
          sizes="96px"
          priority={member.role === '팀장 (PM)'}
        />
      </div>

      <h3 className="text-lg font-semibold text-black">{member.name}</h3>
    </div>
  )
}

const MemberModal = ({
  member,
  isOpen,
  onClose,
}: {
  member: MemberProps | null
  isOpen: boolean
  onClose: () => void
}) => {
  if (!isOpen || !member) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="float-right text-gray-500 hover:text-black text-2xl font-bold w-8 h-8 flex items-center justify-center"
        >
          ×
        </button>

        {/* 프로필 이미지 */}
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 relative border-2 border-gray-300">
          <Image
            src={member.imgSrc}
            alt={member.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="128px"
            priority
          />
        </div>

        {/* 정보 */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-black mb-2">{member.name}</h2>
          <p className="text-base text-gray-600 mb-1 font-semibold">
            {member.role}
          </p>
        </div>

        {/* 링크 섹션 */}
        <div className="space-y-3">
          <Link
            href={member.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <GithubIcon className="w-5 h-5" />
            <span>GitHub</span>
          </Link>

          <Link
            href={member.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <LinkIconSVG className="w-5 h-5" />
            <span>개인 사이트</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<MemberProps | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const teamData = [
    {
      name: '정재성',
      role: '팀장 (PM)',
      imgSrc: '/team/interludeal.png',
      githubUrl: 'https://github.com/Interludeal',
      blogUrl: 'https://20252-middle.vercel.app/',
    },
    {
      name: '곽민경',
      role: '팀원 (PA)',
      imgSrc: '/team/kkaturi14.jpg',
      githubUrl: 'https://github.com/kkaturi14',
      blogUrl: 'https://web-server-mid.vercel.app/',
    },
    {
      name: '박혜수',
      role: '팀원 (PA)',
      imgSrc: '/team/Pandyo.png',
      githubUrl: 'https://github.com/Pandyo',
      blogUrl: 'https://web-server-class-project-01.vercel.app/',
    },
    {
      name: '심재훈',
      role: '팀원 (PA)',
      imgSrc: '/team/J4EH00N.png',
      githubUrl: 'https://github.com/J4EH00N',
      blogUrl: 'https://midterm-portfolio-two.vercel.app/',
    },
    {
      name: '정윤서',
      role: '팀원 (PA)',
      imgSrc: '/team/oesp91.jpg',
      githubUrl: 'https://github.com/oesp91',
      blogUrl: 'https://wsvbp1-ixms.vercel.app/',
    },
  ]

  const handleMemberClick = (member: MemberProps) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMember(null)
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-6 text-center">
              동네ON
            </h2>

            <div className="border-t border-b border-gray-200 py-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {teamData.map((member, index) => (
                  <TeamMemberCard
                    key={index}
                    member={member}
                    onOpen={() => handleMemberClick(member)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      <MemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
