/* Mandatiq — Marketing Site JS */

/* Scroll animation observer */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') })
}, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' })
document.querySelectorAll('.fu').forEach(el => observer.observe(el))

/* Nav scroll effect */
const nav = document.getElementById('nav')
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30)
}, { passive: true })

/* FAQ accordion */
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q')
  const a = item.querySelector('.faq-a')
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open')
    document.querySelectorAll('.faq-item.open').forEach(i => {
      i.classList.remove('open')
      i.querySelector('.faq-a').style.maxHeight = '0'
    })
    if (!isOpen) {
      item.classList.add('open')
      a.style.maxHeight = a.scrollHeight + 'px'
    }
  })
})

/* Mobile nav toggle */
const hamburger = document.querySelector('.hamburger')
const mobileNav = document.getElementById('mobile-nav')
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.style.display === 'block'
    mobileNav.style.display = open ? 'none' : 'block'
    hamburger.querySelectorAll('span')[0].style.transform = open ? '' : 'rotate(45deg) translate(5px,5px)'
    hamburger.querySelectorAll('span')[1].style.opacity = open ? '1' : '0'
    hamburger.querySelectorAll('span')[2].style.transform = open ? '' : 'rotate(-45deg) translate(5px,-5px)'
  })
  document.querySelectorAll('#mobile-nav a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.style.display = 'none'
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1' })
    })
  })
}

/* Smooth counter animation for hero stats */
function animateCounter(el, target, prefix = '', suffix = '') {
  let start = 0
  const step = target / 40
  const timer = setInterval(() => {
    start = Math.min(start + step, target)
    el.textContent = prefix + Math.floor(start) + suffix
    if (start >= target) clearInterval(timer)
  }, 40)
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = '1'
      const counters = e.target.querySelectorAll('[data-count]')
      counters.forEach(c => {
        const target = parseInt(c.dataset.count)
        const prefix = c.dataset.prefix || ''
        const suffix = c.dataset.suffix || ''
        animateCounter(c, target, prefix, suffix)
      })
    }
  })
}, { threshold: 0.5 })
document.querySelectorAll('.pain-stats').forEach(el => statsObserver.observe(el))
