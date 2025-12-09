import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || ''
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN || ''

async function getGitHubData(): Promise<{
  publicRepos: string
  profileUrl: string
  error: boolean
}> {
  if (!GITHUB_USERNAME) {
    return { publicRepos: 'N/A', profileUrl: 'https://github.com', error: true }
  }

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: {
        Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return {
        publicRepos: '로드 오류',
        profileUrl: `https://github.com/${GITHUB_USERNAME}`,
        error: true,
      }
    }

    const data = await res.json()
    return {
      publicRepos: data.public_repos?.toLocaleString() || '0',
      profileUrl: data.html_url || `https://github.com/${GITHUB_USERNAME}`,
      error: false,
    }
  } catch (error) {
    return {
      publicRepos: '로드 실패',
      profileUrl: `https://github.com/${GITHUB_USERNAME}`,
      error: true,
    }
  }
}

async function getGithubRepos(): Promise<
  {
    id: number
    name: string
    description: string
    url: string
    language: string
    createdAt: string
    updatedAt: string
  }[]
> {
  if (!GITHUB_USERNAME) return []

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
      {
        headers: {
          Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
        },
        next: { revalidate: 3600 },
      }
    )

    if (!res.ok) {
      console.error(`Failed to fetch repositories: ${res.status}`)
      return []
    }

    const repos = await res.json()
    return repos.map(
      (repo: {
        id: number
        name: string
        description: string
        html_url: string
        language: string
        created_at: string
        updated_at: string
      }) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language || 'Unknown',
        createdAt: new Date(repo.created_at).toLocaleDateString('ko-KR'),
        updatedAt: new Date(repo.updated_at).toLocaleDateString('ko-KR'),
      })
    )
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}

const experienceData = [
  { title: '정보보안 동아리 S.C.P 2025 임원', date: '2025.09' },
  { title: '2024 제12회 창업경진대회 참여 및 입상', date: '2024.03' },
  { title: '2025 사이버공격방어대회(CCE) CTF 참여', date: '2025.08' },
  { title: '제 3회 JBU-CTF 문제 출제', date: '2022.10' },
  { title: '2025 핵테온 세종 CTF 참여', date: '2025.04' },
  { title: '정보보안 동아리 S.C.P 활동', date: '2022.04' },
  { title: '제 6회 JBU-CTF 장려상 수상', date: '2025.10' },
  { title: '정보보안 동아리 S.C.P 2026 임원', date: '2026.XX' },
]

const webProjects = [
  <>
    <strong className="font-semibold">CVE-2023-50447 분석</strong> :{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      ImageMath
    </span>{' '}
    모듈의 취약점이{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      dunder 체인
    </span>{' '}
    공격을 통해 악용될 수 있음을 알고 PoC 해석을 토대로 CTF 문제 풀이를
    진행하였습니다.
  </>,
  <>
    <strong className="font-semibold">PHP +MySQL 게시판 모의해킹</strong> : 직접
    환경 구축을 하며{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      DB
    </span>{' '}
    이해력을 올리고, 웹 취약점을 토대로{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      모의해킹
    </span>
    을 하며 방어 로직을 짜는 실습을 진행했습니다.
  </>,
  <>
    <strong className="font-semibold">Shadow API</strong> :
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      API
    </span>{' '}
    기본 공부 후, 직접 구현한{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      Node.js
    </span>
    서버 에서{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      Burp Suite{' '}
    </span>
    를 활용하여 로그 탈취 방어 실습을 진행했습니다.
  </>,
  <>
    <strong className="font-semibold">HTTP Desync Attacks</strong> : HTTP 요청{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      파싱 불일치
    </span>
    경우를{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      Nginx
    </span>{' '}
    Proxy 로 구현하고{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      Flask
    </span>{' '}
    서버 보호 로직을 짜보며 실습을 진행했습니다.
  </>,
  <>
    <strong className="font-semibold">URL Redirection</strong> :{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      Open Redirection
    </span>{' '}
    취약점과 피싱 공격 연계 위험성을 알고{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      Flask
    </span>{' '}
    기반의 공격 및 방어 실습을 진행했습니다.
  </>,
]

const otherProjects = [
  <>
    <strong className="font-semibold">Dev(Sec)Ops Pipeline 구축</strong> :
    클라우드적 역량을 기르고 DevOps문화를 이해하고자{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      AWS
    </span>
    , Jenkins 등 다양한 서비스를 사용했습니다.
  </>,
  <>
    <strong className="font-semibold">Fire Wall / Spoofing</strong> : Dos,
    스니핑/스푸핑 위험을 알고{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      프로토콜
    </span>
    역할을 공부하여{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      VPN
    </span>
    으로 네트워크 보호 실습을 하였습니다.
  </>,
  <>
    <strong className="font-semibold">LCA 알고리즘</strong> : 트리 구조에서
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      LCA
    </span>
    를 찾는 알고리즘을 구현하여{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      이진 리프팅
    </span>{' '}
    을 이해하였습니다.
  </>,
  <>
    <strong className="font-semibold">Abstract Data Type</strong> : push/pop
    연산을 알고 더 나아가{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      LIFO, FIFO
    </span>
    구조 를 이해하고 실제로 구현해보았습니다.
  </>,
  <>
    <strong className="font-semibold">Python Board Game 구현</strong> : 플레이어
    관리, 턴 기반 진행,{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      매트릭스 기반
    </span>{' '}
    게임 보드를 구축해보며{' '}
    <span className="inline-block bg-gray-200 px-1 rounded text-xs font-medium text-gray-800">
      Python
    </span>{' '}
    활용 능력을 높였습니다.
  </>,
]

const leftColumn = [
  experienceData[7],
  experienceData[1],
  experienceData[3],
  experienceData[5],
]
const rightColumn = [
  experienceData[6],
  experienceData[0],
  experienceData[2],
  experienceData[4],
]

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const TistoryIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      ry="5"
      fill="rgb(239 68 68)"
    />
    <circle cx="12" cy="7" r="1.5" fill="#fff" />
    <circle cx="8" cy="7" r="1.5" fill="#fff" />
    <circle cx="16" cy="7" r="1.5" fill="#fff" />
    <circle cx="12" cy="12" r="1.5" fill="#fff" />
    <circle cx="12" cy="17" r="1.5" fill="#fff" />
  </svg>
)

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const ExperienceItem = ({ title, date }: { title: string; date: string }) => (
  <div className="flex justify-between items-center p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 hover:border-blue-400 hover:shadow-md transition-colors duration-200">
    <span className="text-black font-semibold text-sm mr-2">{title}</span>
    <span className="text-gray-700 text-xs flex-shrink-0">{date}</span>
  </div>
)

const TechIcon = ({
  src,
  alt,
  w = 64,
  h = 64,
}: {
  src: string
  alt: string
  w?: number
  h?: number
}) => (
  <div className="flex items-center justify-center w-24 h-24 p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 hover:border-blue-400 hover:shadow-md transition-colors duration-200">
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      className="object-contain"
    />
  </div>
)

const RepoCard = ({
  name,
  description,
  url,
  language,
}: {
  name: string
  description: string
  url: string
  language: string
}) => {
  // 언어별 색상 정의
  const languageColors: Record<string, { bg: string; text: string }> = {
    TypeScript: { bg: 'bg-blue-100', text: 'text-blue-700' },
    JavaScript: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    Python: { bg: 'bg-blue-500/20', text: 'text-blue-600' },
    C: { bg: 'bg-slate-100', text: 'text-slate-700' },
    PHP: { bg: 'bg-purple-100', text: 'text-purple-700' },
    Shell: { bg: 'bg-green-100', text: 'text-green-700' },
    HTML: { bg: 'bg-orange-100', text: 'text-orange-700' },
    CSS: { bg: 'bg-pink-100', text: 'text-pink-700' },
  }

  const langColor =
    language !== 'Unknown'
      ? languageColors[language] || { bg: 'bg-gray-100', text: 'text-gray-700' }
      : null

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col p-5 border border-gray-300 rounded-xl bg-white hover:border-blue-500 hover:shadow-xl transition-all duration-300 h-full"
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <h4 className="font-bold text-black text-lg line-clamp-2 flex-1">
          {name}
        </h4>
        {langColor && (
          <span
            className={`px-3 py-1 ${langColor.bg} ${langColor.text} text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0`}
          >
            {language}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 line-clamp-3 flex-grow">
        {description || '설명이 없습니다.'}
      </p>
      <div className="mt-4 pt-3 border-t border-gray-200">
        <svg
          className="w-4 h-4 text-blue-500 inline mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM15.657 14.243a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM11 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM5.757 15.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zM5.757 4.343a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707z" />
        </svg>
        <span className="text-xs text-gray-500">저장소 방문</span>
      </div>
    </Link>
  )
}

export default async function About() {
  const githubData = await getGitHubData()
  const repos = await getGithubRepos()

  const hoverStyle =
    'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300'

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center">
        <div className="w-full">
          <div className="mx-auto max-w-5xl">
            <div className="space-y-8">
              <div
                className={`bg-white border-2 border-black rounded-2xl p-8 ${hoverStyle}`}
              >
                <h2 className="text-2xl font-bold text-black mb-6">프로필</h2>
                <div className="flex items-start space-x-8">
                  <div className="w-32 h-40 border-2 border-gray-400 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src="/team/interludeal.png"
                      alt=""
                      width={128}
                      height={160}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-black inline-block mr-2">
                        정재성
                      </h3>
                      <span className="text-lg font-normal text-gray-500">
                        Jung Jae Seong (鄭宰成)
                      </span>
                    </div>

                    <div className="text-lg text-gray-800 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                      <p>
                        <strong>생년월일:</strong>{' '}
                        <span className="text-gray-700 font-light">
                          2003.07.28 (만 22세)
                        </span>
                      </p>
                      <p>
                        <strong>전화번호:</strong>{' '}
                        <span className="text-gray-700 font-light">
                          010-4253-6405
                        </span>
                      </p>
                      <p>
                        <strong>E-mail:</strong>{' '}
                        <span className="text-gray-700 font-light">
                          akrehtk1151@naver.com
                        </span>
                      </p>
                      <p>
                        <strong>거주지:</strong>{' '}
                        <span className="text-gray-700 font-light">
                          경기도 시흥시 은행동 (현재 기숙사)
                        </span>
                      </p>
                    </div>

                    <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
                      <div className="grid grid-cols-4 divide-x divide-gray-300 text-center text-sm">
                        <div className="p-2 border-b border-gray-300 bg-gray-50 font-semibold text-black">
                          소속
                        </div>
                        <div className="p-2 border-b border-gray-300 bg-white text-black font-normal">
                          중부대학교
                        </div>
                        <div className="p-2 border-b border-gray-300 bg-gray-50 font-semibold text-black">
                          전공
                        </div>
                        <div className="p-2 border-b border-gray-300 bg-white text-black font-normal">
                          정보보호학전공
                        </div>
                      </div>

                      <div className="grid grid-cols-4 divide-x divide-gray-300 text-center text-sm">
                        <div className="p-2 bg-gray-50 font-semibold text-black">
                          학번
                        </div>
                        <div className="p-2 bg-white text-black font-normal">
                          92213093
                        </div>
                        <div className="p-2 bg-gray-50 font-semibold text-black">
                          학년
                        </div>
                        <div className="p-2 bg-white text-black font-normal">
                          2학년
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`bg-white border-2 border-black rounded-2xl p-8 shadow-md ${hoverStyle}`}
              >
                <h2 className="text-2xl font-bold text-black mb-6">
                  관심 분야
                </h2>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-300 rounded-lg p-4 text-black font-semibold hover:bg-gray-50 hover:border-blue-400 hover:shadow-md transition-colors duration-300">
                    웹 해킹 / 보안
                  </div>
                  <div className="bg-white border border-gray-300 rounded-lg p-4 text-black font-semibold hover:bg-gray-50 hover:border-blue-400 hover:shadow-md transition-colors duration-300">
                    다양히 하고 싶어하는 편
                  </div>
                  <div className="bg-white border border-gray-300 rounded-lg p-4 text-black font-semibold hover:bg-gray-50 hover:border-blue-400 hover:shadow-md transition-colors duration-300">
                    네트워크, 클라우드, 개발 등
                  </div>
                </div>
              </div>

              <div
                className={`bg-white border-2 border-black rounded-2xl p-8 ${hoverStyle}`}
              >
                <h2 className="text-2xl font-bold text-black mb-6">
                  학력 및 경력
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-4">
                    {leftColumn.map((item, index) => (
                      <ExperienceItem
                        key={`left-${index}`}
                        title={item.title}
                        date={item.date}
                      />
                    ))}
                  </div>

                  <div className="space-y-4">
                    {rightColumn.map((item, index) => (
                      <ExperienceItem
                        key={`right-${index}`}
                        title={item.title}
                        date={item.date}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`bg-white border-2 border-black rounded-2xl p-8 ${hoverStyle}`}
              >
                <h2 className="text-2xl font-bold text-black mb-6">
                  기술 스택
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-3">
                      Language
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      <TechIcon src="/tech/C.png" alt="C" w={64} h={64} />
                      <TechIcon src="/tech/PHP.png" alt="PHP" w={72} h={72} />
                      <TechIcon src="/tech/PY.png" alt="PY" w={64} h={64} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-black mb-3">
                      Frontend
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      <TechIcon src="/tech/HTML.png" alt="HTML" w={64} h={64} />
                      <TechIcon src="/tech/CSS.png" alt="CSS" w={64} h={64} />
                      <TechIcon src="/tech/JS.png" alt="JS" w={64} h={64} />
                      <TechIcon
                        src="/tech/NEXTJS.png"
                        alt="NEXTJS"
                        w={72}
                        h={72}
                      />
                      <TechIcon
                        src="/tech/TAILWINDCSS.png"
                        alt="TAILWINDCSS"
                        w={72}
                        h={72}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-black mb-3">
                      Backend
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      <TechIcon
                        src="/tech/NODEJS.png"
                        alt="NODEJS"
                        w={64}
                        h={64}
                      />
                      <TechIcon src="/tech/FLA.png" alt="FLA" w={72} h={72} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-black mb-3">
                      Other
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      <TechIcon src="/tech/GCP.png" alt="GCP" w={72} h={72} />
                      <TechIcon src="/tech/MY.png" alt="MY" w={72} h={72} />
                      <TechIcon src="/tech/UNI.png" alt="UNI" w={72} h={72} />
                      <TechIcon src="/tech/AWS.png" alt="AWS" w={72} h={72} />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`bg-white border-2 border-black rounded-2xl p-8 ${hoverStyle}`}
              >
                <h2 className="text-2xl font-bold text-black mb-6">
                  개인 프로젝트
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Web 분야
                    </h3>
                    <ul className="space-y-2 text-black">
                      {webProjects.map((project, index) => (
                        <li
                          key={`web-${index}`}
                          className="border border-gray-200 bg-gray-50 rounded-md p-3 text-sm hover:bg-gray-100 hover:border-blue-400 hover:shadow-md transition-colors duration-200"
                        >
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold text-black mb-2">
                      기타
                    </h3>
                    <ul className="space-y-2 text-black">
                      {otherProjects.map((project, index) => (
                        <li
                          key={`other-${index}`}
                          className="border border-gray-200 bg-gray-50 rounded-md p-3 text-sm hover:bg-gray-100 hover:border-blue-400 hover:shadow-md transition-colors duration-200"
                        >
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className={`bg-white border-2 border-black rounded-2xl p-8 ${hoverStyle}`}
              >
                <h2 className="text-2xl font-bold text-black mb-6 flex items-center space-x-2">
                  <span className="text-gray-800">GitHub Repositories</span>
                </h2>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-md text-gray-700 leading-relaxed">
                    강의 중 배운 Github api를 활용했습니다.
                  </p>
                  <Link
                    href={githubData.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors font-medium ml-4 flex-shrink-0"
                  >
                    <span>프로필 보기</span>
                    <GithubIcon className="w-4 h-4 flex-shrink-0" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {repos.length > 0 ? (
                    repos.map((repo) => (
                      <RepoCard
                        key={repo.id}
                        name={repo.name}
                        description={repo.description || '설명 없음'}
                        url={repo.url}
                        language={repo.language}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">
                      리포지토리를 불러오는 중이거나 표시할 리포지토리가
                      없습니다.
                    </p>
                  )}
                </div>
                {githubData.error && (
                  <p className="text-sm text-red-500 mt-4">
                    *API 연결 오류: 환경 변수(&apos;.env.local&apos;)와 토큰
                    권한을 확인해주세요.
                  </p>
                )}
              </div>

              <p className="text-center text-2xl font-bold text-black italic">
                <span className="cursor-pointer hover:text-blue-600 transition-colors duration-300">
                  &apos;Act as if you have already achieved&apos;
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
