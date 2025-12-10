'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Footer from '@/components/Footer'

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
  description: string
  skills: string[]
  imgSrc: string
  githubUrl: string
  blogUrl: string
}

const TeamMemberCard = ({
  member,
  isSelected,
  onToggle,
}: {
  member: MemberProps
  isSelected: boolean
  onToggle: () => void
}) => {
  const cardHoverStyle =
    'hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 cursor-pointer'

  return (
    <div
      onClick={onToggle}
      className={`bg-white border-2 rounded-lg p-4 text-center ${cardHoverStyle} ${
        isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-300'
      }`}
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

const MemberDetailPanel = ({ member }: { member: MemberProps }) => {
  return (
    <div className="bg-white rounded-xl p-8 border-2 border-[#5d76b3] overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* 왼쪽: 프로필 이미지 */}
        <div className="flex justify-center md:justify-start">
          <div className="w-48 h-56 rounded-lg overflow-hidden border-4 border-[#5d76b3] relative shadow-lg">
            <Image
              src={member.imgSrc}
              alt={member.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="192px"
              priority
            />
          </div>
        </div>

        {/* 오른쪽: 정보 */}
        <div className="md:col-span-2 flex flex-col">
          <h3 className="text-4xl font-bold text-black mb-2">{member.name}</h3>
          <p className="text-xl text-[#5d76b3] font-bold mb-4">{member.role}</p>
          <p className="text-gray-700 text-sm mb-6 leading-relaxed flex-grow">
            {member.description}
          </p>

          {/* 버튼 섹션 - 우측 끝 */}
          <div className="flex gap-3 justify-end">
            <Link
              href={member.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#5d76b3] text-[#5d76b3] rounded hover:bg-[#5d76b3] hover:text-white transition-colors font-medium text-sm"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Github</span>
            </Link>

            <Link
              href={member.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#5d76b3] text-[#5d76b3] rounded hover:bg-[#5d76b3] hover:text-white transition-colors font-medium text-sm"
            >
              <LinkIconSVG className="w-4 h-4" />
              <span>Page</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Team() {
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null)

  const teamData: MemberProps[] = [
    {
      name: '정재성',
      role: 'Leader',
      description: '지역 게시판 및 프로젝트 관리.',
      skills: ['Leadership', 'System Security', 'Python'],
      imgSrc: '/team/interludeal.png',
      githubUrl: 'https://github.com/Interludeal',
      blogUrl: 'https://20252-middle.vercel.app/',
    },
    {
      name: '곽민경',
      role: 'Design & Database Support',
      description:
        'UI/UX 디자인 (Tailwind CSS), PPT 작성 및 데이터베이스 지원.',
      skills: ['TailwindCSS', 'Figma', 'MongoDB'],
      imgSrc: '/team/kkaturi14.jpg',
      githubUrl: 'https://github.com/kkaturi14',
      blogUrl: 'https://web-server-mid.vercel.app/',
    },
    {
      name: '박혜수',
      role: 'Backend / Board Core',
      description: '지역 게시판, CRUD 및 카테고리 관리.',
      skills: ['Python', 'FastAPI', 'MySQL'],
      imgSrc: '/team/Pandyo.png',
      githubUrl: 'https://github.com/Pandyo',
      blogUrl: 'https://web-server-class-project-01.vercel.app/',
    },
    {
      name: '심재훈',
      role: 'Main / SC / Auth',
      description: '메인 페이지, 인증 시스템 (로그인/회원가입) 및 웹 보안.',
      skills: ['React', 'Next.js', 'WebSecurity'],
      imgSrc: '/team/J4EH00N.png',
      githubUrl: 'https://github.com/J4EH00N',
      blogUrl: 'https://midterm-portfolio-two.vercel.app/',
    },
    {
      name: '정윤서',
      role: 'Map API / Interaction',
      description: '대화형 지도 API 및 위치 기반 네비게이션 로직.',
      skills: ['KakaoMap', 'JavaScript', 'Geolocation'],
      imgSrc: '/team/oesp91.jpg',
      githubUrl: 'https://github.com/oesp91',
      blogUrl: 'https://wsvbp1-ixms.vercel.app/',
    },
  ]

  const handleToggleMember = (index: number) => {
    setSelectedMemberId(selectedMemberId === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-lg">
            <div className="mb-6 flex justify-center">
              <div className="h-12 relative w-auto">
                <Image
                  src="/team/ehdsponlogo.png"
                  alt="동네ON 로고"
                  height={48}
                  width={150}
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {teamData.map((member, index) => (
                  <TeamMemberCard
                    key={index}
                    member={member}
                    isSelected={selectedMemberId === index}
                    onToggle={() => handleToggleMember(index)}
                  />
                ))}
              </div>
            </div>

            {/* 상세 정보 토글 패널 */}
            {selectedMemberId !== null && (
              <div className="mt-6">
                <MemberDetailPanel member={teamData[selectedMemberId]} />
              </div>
            )}
          </div>

          {/* 프로젝트 박스 */}
          <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-lg mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* 이미지 */}
              <div className="flex justify-center">
                <div className="w-full max-w-sm h-48 rounded-lg overflow-hidden border-4 border-[#5d76b3] relative shadow-lg">
                  <Image
                    src="/team/ehdspon.png"
                    alt="동네ON 프로젝트"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              </div>

              {/* 프로젝트 정보 */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-4">동네ON</h2>
                <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                  이웃과 연결되는 새로운 일상. 지도 기반의 동네 소통 및 커뮤니티
                  플랫폼입니다. Next.js와 Kakao Map API를 활용하여 위치 기반의
                  다양한 서비스를 제공합니다.
                </p>

                {/* 버튼 */}
                <div className="flex gap-3">
                  <Link
                    href="https://github.com/neighborhood-on/neighborhood_on"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#5d76b3] text-[#5d76b3] rounded hover:bg-[#5d76b3] hover:text-white transition-colors font-medium text-sm"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Github</span>
                  </Link>

                  <Link
                    href="https://neighborhood-on-cu5h.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#5d76b3] text-[#5d76b3] rounded hover:bg-[#5d76b3] hover:text-white transition-colors font-medium text-sm"
                  >
                    <LinkIconSVG className="w-4 h-4" />
                    <span>Page</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
