'use client'

import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
}

export default function NeonCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef<Point>({ x: 0, y: 0 })
  const trail = useRef<Point[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 캔버스 크기 설정
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 마우스 이동 이벤트
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      trail.current.push({ x: e.clientX, y: e.clientY })

      // 트레일 길이 제한
      if (trail.current.length > 50) {
        trail.current.shift()
      }
    }

    // 마우스 떠남 이벤트
    const handleMouseLeave = () => {
      trail.current = []
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // 애니메이션 루프
    let animationId: number

    const animate = () => {
      // 캔버스 초기화
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 트레일 그리기
      if (trail.current.length > 1) {
        for (let i = 0; i < trail.current.length - 1; i++) {
          const current = trail.current[i]
          const next = trail.current[i + 1]

          // 알파값 계산 (뒤쪽일수록 투명)
          const alpha = (i / trail.current.length) * 1.0

          // 외부 글로우 (네온 효과) - 더 진한 파란색
          ctx.shadowColor = `rgba(10, 40, 120, ${alpha * 1.0})`
          ctx.shadowBlur = 50
          ctx.shadowOffsetX = 0
          ctx.shadowOffsetY = 0

          // 선 그리기 - 더 굵고 진하게
          ctx.strokeStyle = `rgba(20, 60, 150, ${alpha})`
          ctx.lineWidth = 8
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'

          ctx.beginPath()
          ctx.moveTo(current.x, current.y)
          ctx.lineTo(next.x, next.y)
          ctx.stroke()

          // 밝은 내부 선
          ctx.strokeStyle = `rgba(60, 100, 200, ${alpha * 0.8})`
          ctx.lineWidth = 4
          ctx.beginPath()
          ctx.moveTo(current.x, current.y)
          ctx.lineTo(next.x, next.y)
          ctx.stroke()
        }
      }

      // 현재 마우스 위치에 원형 글로우
      ctx.shadowColor = 'rgba(10, 40, 120, 1)'
      ctx.shadowBlur = 60
      ctx.fillStyle = 'rgba(20, 60, 150, 0.8)'
      ctx.beginPath()
      ctx.arc(mousePos.current.x, mousePos.current.y, 12, 0, Math.PI * 2)
      ctx.fill()

      // 밝은 중심
      ctx.fillStyle = 'rgba(80, 140, 220, 1)'
      ctx.beginPath()
      ctx.arc(mousePos.current.x, mousePos.current.y, 6, 0, Math.PI * 2)
      ctx.fill()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
