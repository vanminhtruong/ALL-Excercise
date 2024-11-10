<template>
  <canvas ref="matrixCanvas" class="matrix-canvas"></canvas>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

// Tham chiếu đến canvas
const matrixCanvas = ref(null)
let animationId = null

// Định nghĩa màu sắc cho pháo hoa
const fireworkColors = [
  '#FF1461', '#18FF92', '#5A87FF', '#FBF38C',
  '#FF6B6B', '#C44D58', '#00FF00', '#FFD700',
  '#FF69B4', '#8A2BE2', '#FF4500', '#00CED1',
  '#ADFF2F', '#FF1493', '#7FFF00'
]

// Định nghĩa lớp Pháo Hoa
class Firework {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.particles = []
    this.createParticles()
    this.life = 0
    this.maxLife = 100 // Tăng thời gian tồn tại
  }

  createParticles() {
    const numberOfParticles = 50 // Tăng số lượng hạt pháo hoa
    for (let i = 0; i < numberOfParticles; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 6 + 4 // Tăng vận tốc
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        radius: Math.random() * 3 + 2, // Tăng kích thước hạt pháo hoa
        color: fireworkColors[Math.floor(Math.random() * fireworkColors.length)],
      })
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.1 // Gravity tăng
      p.alpha -= 0.015 // Giảm độ trong suốt chậm hơn
    })
    this.life++
  }

  draw(ctx) {
    this.particles.forEach(p => {
      if (p.alpha > 0) {
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }
    })
  }

  isDead() {
    return this.life >= this.maxLife
  }
}

// Định nghĩa lớp Rắn
class Snake {
  constructor(x, y, width, height, speed, scale) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speedX = speed.x
    this.speedY = speed.y
    this.scale = scale
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale(this.scale, this.scale)
    ctx.fillStyle = '#0F0' // Màu xanh lá cây Matrix
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
    ctx.restore()
  }

  update(canvas, fireworks) {
    this.x += this.speedX
    this.y += this.speedY

    // Kiểm tra va chạm với cạnh canvas để bật hướng
    let collided = false
    if (this.x + this.width / 2 >= canvas.width || this.x - this.width / 2 <= 0) {
      this.speedX *= -1
      collided = true
    }
    if (this.y + this.height / 2 >= canvas.height || this.y - this.height / 2 <= 0) {
      this.speedY *= -1
      collided = true
    }

    // Nếu va chạm, tạo pháo hoa tại vị trí va chạm
    if (collided) {
      for (let i = 0; i < 11; i++) { // Tạo 10 pháo hoa cho mỗi va chạm
        fireworks.push(new Firework(this.x, this.y))
      }
    }
  }
}

// Đối tượng chứa tất cả pháo hoa
const fireworks = []

// Hàm vẽ ma trận ký tự
function drawMatrix(ctx, canvas, drops, chars, fontSize) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#0F0'
  ctx.font = `${fontSize}px monospace`

  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length))
    ctx.fillText(text, i * fontSize, drops[i] * fontSize)

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0
    }

    drops[i]++
  }
}

// Hàm vẽ Rắn
function drawSnakes(ctx, snakes) {
  snakes.forEach(snake => snake.draw(ctx))
}

// Hàm cập nhật vị trí Rắn
function updateSnakes(canvas, snakes, fireworks) {
  snakes.forEach(snake => snake.update(canvas, fireworks))
}

// Hàm thay đổi hướng dựa trên sự kiện chuột
function changeDirection(event, snakes) {
  const { clientX, clientY, button } = event
  snakes.forEach(snake => {
    if (button === 0) { // Chuột trái
      const deltaX = clientX - snake.x
      const deltaY = clientY - snake.y
      const angle = Math.atan2(deltaY, deltaX)
      const speed = 4
      snake.speedX = speed * Math.cos(angle)
      snake.speedY = speed * Math.sin(angle)
      // Tạo pháo hoa khi thay đổi hướng
      for (let i = 0; i < 15; i++) { // Tạo 15 pháo hoa khi thay đổi hướng
        fireworks.push(new Firework(snake.x, snake.y))
      }
    }
  })
}

// Hàm xử lý phóng to/phóng nhỏ rắn
function handleZoom(event, snakes) {
  event.preventDefault()
  snakes.forEach(snake => {
    if (event.deltaY < 0) {
      // Phóng to
      snake.scale += 0.1
      if (snake.scale > 3) snake.scale = 3
    } else {
      // Phóng nhỏ
      snake.scale -= 0.1
      if (snake.scale < 0.5) snake.scale = 0.5
    }
  })
}

onMounted(() => {
  const canvas = matrixCanvas.value
  const ctx = canvas.getContext('2d')

  // Thiết lập kích thước Canvas
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|`]}'
  const fontSize = 16
  const columns = canvas.width / fontSize
  const drops = Array(Math.floor(columns)).fill(1)

  // Khởi tạo 5 con rắn với vị trí và hướng ngẫu nhiên
  const snakes = []
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const width = 40
    const height = 20
    // Hướng di chuyển ngẫu nhiên theo đường tứ tung (góc vuông)
    const direction = Math.floor(Math.random() * 4)
    let speedX = 0
    let speedY = 0
    const speedValue = 2
    switch(direction) {
      case 0: // Đi lên
        speedY = -speedValue
        break
      case 1: // Đi xuống
        speedY = speedValue
        break
      case 2: // Đi trái
        speedX = -speedValue
        break
      case 3: // Đi phải
        speedX = speedValue
        break
    }
    const speed = { x: speedX, y: speedY }
    const scale = 1
    snakes.push(new Snake(x, y, width, height, speed, scale))
  }

  // Thêm sự kiện chuột và bánh xe chuột
  canvas.addEventListener('contextmenu', (e) => e.preventDefault()) // Ngăn chặn menu mặc định
  canvas.addEventListener('mousedown', (e) => {
    if (e.button === 0) { // Chuột trái
      changeDirection(e, snakes)
    }
  })

  canvas.addEventListener('wheel', (e) => {
    handleZoom(e, snakes)
  })

  function animate() {
    drawMatrix(ctx, canvas, drops, chars, fontSize)
    drawSnakes(ctx, snakes)
    updateSnakes(canvas, snakes, fireworks)

    // Cập nhật và vẽ pháo hoa
    for (let i = fireworks.length - 1; i >= 0; i--) {
      const firework = fireworks[i]
      firework.update()
      firework.draw(ctx)
      if (firework.isDead()) {
        fireworks.splice(i, 1)
      }
    }

    animationId = requestAnimationFrame(animate)
  }

  animate()

  const handleResize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const newColumns = canvas.width / fontSize
    drops.length = Math.floor(newColumns)
    drops.fill(1)
  }

  window.addEventListener('resize', handleResize)

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', handleResize)
    canvas.removeEventListener('contextmenu', (e) => e.preventDefault())
    canvas.removeEventListener('mousedown', () => {})
    canvas.removeEventListener('wheel', () => {})
  })
})
</script>

<style scoped>
.matrix-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; 
  background: black;
}
</style>