import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cursor = document.querySelector('.cursor')
    const follower = document.querySelector('.cursor-follower')
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0, fx = 0, fy = 0
    let rafId

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
    }
    document.addEventListener('mousemove', onMove)

    const animate = () => {
      fx += (mouseX - fx) * 0.12
      fy += (mouseY - fy) * 0.12
      follower.style.left = fx + 'px'
      follower.style.top = fy + 'px'
      rafId = requestAnimationFrame(animate)
    }
    animate()

    const targets = document.querySelectorAll('a, button, .service-card, .fleet-card, .fleet-item-card, .filter-btn')
    const enter = () => {
      cursor.style.width = '18px'
      cursor.style.height = '18px'
      cursor.style.background = 'transparent'
      cursor.style.border = '2px solid var(--red)'
      follower.style.width = '54px'
      follower.style.height = '54px'
      follower.style.opacity = '1'
    }
    const leave = () => {
      cursor.style.width = '10px'
      cursor.style.height = '10px'
      cursor.style.background = 'var(--red)'
      cursor.style.border = 'none'
      follower.style.width = '36px'
      follower.style.height = '36px'
      follower.style.opacity = '0.5'
    }
    targets.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave) })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div className="cursor"></div>
      <div className="cursor-follower"></div>
    </>
  )
}