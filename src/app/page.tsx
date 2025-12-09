import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function Home() {
  const boxHoverStyle =
    'shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center">
        <div className="w-full">
          <div className="mx-auto max-w-5xl">
            <div
              className={`group bg-white border-2 border-black rounded-2xl ${boxHoverStyle}`}
            >
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 items-center">
                  <div className="md:col-span-2">
                    <div className="aspect-square w-full max-w-[320px] mx-auto md:mx-0 rounded-xl border-2 border-gray-400 bg-gray-100 overflow-hidden relative">
                      <Image
                        src="/home.png"
                        alt="웹서버보안프로그래밍 포트폴리오 메인 화면"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">
                      웹서버보안프로그래밍 01분반 정재성
                    </h1>

                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      해당 페이지는 지금까지 배운{' '}
                      <strong className="font-semibold">
                        Next.js 프레임워크, MongoDB
                      </strong>
                      를 이용하여 제작한 최종 포트폴리오입니다!!!
                    </p>
                    <div className="h-10 md:h-12"></div>
                  </div>
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
