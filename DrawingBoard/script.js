const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const slider = document.querySelector('.slider')

canvas.width = innerWidth
canvas.height = innerHeight
context.strokeStyle = '#FFFFFF'
context.lineWidth = slider.value
const canvasRect = canvas.getBoundingClientRect() // not required in this case

slider.addEventListener('input', () => {
    context.lineWidth = slider.value
})

let paint = false

function draw(e) {
    if (!paint) {
        return
    }

    const x = e.clientX - canvasRect.left
    const y = e.clientY - canvasRect.top

    context.lineCap = 'round'
    context.lineTo(x, y)
    context.stroke()
}

canvas.addEventListener('mousedown', () => {
    paint = true
}) 
canvas.addEventListener('mouseup', () => {
    paint = false
    context.beginPath()
})
canvas.addEventListener('mousemove', draw)

window.addEventListener('resize', () => {
    const canvasCopy = document.createElement('canvas')
    canvasCopy.width = canvas.width
    canvasCopy.height = canvas.height
    canvasCopy.getContext('2d').drawImage(canvas, 0, 0)

    canvas.width = innerWidth
    canvas.height = innerHeight

    context.drawImage(canvasCopy, 0, 0)
})

const btns = [...document.querySelectorAll('.circle')]

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color')
        context.strokeStyle = color
    })
})

const erasorIcon = document.querySelector('.eraserIcon')

erasorIcon.addEventListener('click', () => {
    context.strokeStyle = 'rgb(36, 36, 36)'
})