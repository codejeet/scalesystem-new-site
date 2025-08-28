import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Seeded random number generator for consistent particle positions
class SeededRandom {
  constructor(seed = 12345) {
    this.seed = seed
  }
  
  random() {
    const x = Math.sin(this.seed++) * 10000
    return x - Math.floor(x)
  }
}

const ParticleBackground = () => {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const animationIdRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Initialize seeded random generator for consistent particle positions
    const seededRandom = new SeededRandom(144) // New seed for different arrangement

    // Mobile detection and performance settings
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isLowEnd = navigator.hardwareConcurrency <= 4 || window.innerWidth <= 480
    const isHighEndMobile = isMobile && !isLowEnd && navigator.hardwareConcurrency >= 6
    
    // Performance-based settings
    const particleCount = isLowEnd ? 50 : 150 // Full particle count for all except low-end
    const connectionDistance = isMobile ? (isHighEndMobile ? 4 : 3) : 5
    const pixelRatio = isMobile ? (isLowEnd ? 1 : Math.min(window.devicePixelRatio, 2)) : Math.min(window.devicePixelRatio, 2)
    const antialias = !isLowEnd // Enable antialiasing for all except low-end devices
    const enableConnections = !isLowEnd // Enable for high-end mobile and all desktop

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer setup with mobile optimizations
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: antialias,
      powerPreference: isMobile ? 'low-power' : 'high-performance'
    })
    renderer.setPixelRatio(pixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Particle system
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Random positions (smaller range for mobile) - using fixed seed
      const range = isMobile ? 15 : 20
      positions[i3] = (seededRandom.random() - 0.5) * range
      positions[i3 + 1] = (seededRandom.random() - 0.5) * range
      positions[i3 + 2] = (seededRandom.random() - 0.5) * (isMobile ? 8 : 10)

      // Colors (yellow variations) - using fixed seed
      const yellowIntensity = 0.3 + seededRandom.random() * 0.7
      colors[i3] = yellowIntensity // R
      colors[i3 + 1] = yellowIntensity * 0.8 // G
      colors[i3 + 2] = 0.1 // B

      // Sizes (smaller for mobile) - using fixed seed
      sizes[i] = seededRandom.random() * (isMobile ? 2 : 3) + 1
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Particle material with mobile optimizations
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: pixelRatio },
        isMobile: { value: isMobile ? 1.0 : 0.0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float pixelRatio;
        uniform float isMobile;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Reduced animation for mobile
          float animationScale = isMobile > 0.5 ? 0.5 : 1.0;
          mvPosition.y += sin(time * 0.2 + position.x * 0.05) * 0.3 * animationScale;
          mvPosition.x += cos(time * 0.15 + position.y * 0.05) * 0.2 * animationScale;
          
          gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float isMobile;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          
          // Reduced opacity for mobile to improve performance
          float finalAlpha = isMobile > 0.5 ? alpha * 0.6 : alpha * 0.8;
          gl_FragColor = vec4(vColor, finalAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)

    // Connection lines (only for non-low-end devices)
    let lineSystem = null
    if (enableConnections) {
      const lineGeometry = new THREE.BufferGeometry()
      const linePositions = []
      const lineColors = []

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const distance = Math.sqrt(
            Math.pow(positions[i * 3] - positions[j * 3], 2) +
            Math.pow(positions[i * 3 + 1] - positions[j * 3 + 1], 2) +
            Math.pow(positions[i * 3 + 2] - positions[j * 3 + 2], 2)
          )

          if (distance < connectionDistance) {
            linePositions.push(
              positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
              positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
            )
            
            const alpha = 1 - (distance / connectionDistance)
            const mobileAlpha = isHighEndMobile ? alpha * 0.8 : (isMobile ? alpha * 0.5 : alpha)
            lineColors.push(
              1, 0.8, 0.1, mobileAlpha,
              1, 0.8, 0.1, mobileAlpha
            )
          }
        }
      }

      if (linePositions.length > 0) {
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
        lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4))

        const lineMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 }
          },
          vertexShader: `
            attribute vec4 color;
            varying vec4 vColor;
            uniform float time;
            
            void main() {
              vColor = color;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec4 vColor;
            
            void main() {
              gl_FragColor = vec4(vColor.rgb, vColor.a * 0.3);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending
        })

        lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial)
        scene.add(lineSystem)
      }
    }

    // Mouse interaction (reduced for mobile)
    const mouse = new THREE.Vector2()
    const handleMouseMove = (event) => {
      if (!isMobile) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop with mobile optimizations
    const clock = new THREE.Clock()
    let frameCount = 0
    const targetFPS = isMobile ? 30 : 60
    const frameInterval = 1000 / targetFPS
    let lastFrameTime = 0

    const animate = (currentTime) => {
      if (currentTime - lastFrameTime < frameInterval) {
        animationIdRef.current = requestAnimationFrame(animate)
        return
      }
      
      lastFrameTime = currentTime
      frameCount++
      
      const elapsedTime = clock.getElapsedTime()
      
      // Update uniforms
      particleMaterial.uniforms.time.value = elapsedTime
      if (lineSystem && lineSystem.material.uniforms) {
        lineSystem.material.uniforms.time.value = elapsedTime
      }

      // Reduced rotation speed for mobile
      const rotationSpeed = isMobile ? 0.01 : 0.02
      particleSystem.rotation.y = elapsedTime * rotationSpeed
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.015) * 0.05

      // Mouse interaction (disabled for mobile)
      if (!isMobile) {
        const mouseInfluence = 0.2
        particleSystem.rotation.y += mouse.x * mouseInfluence * 0.005
        particleSystem.rotation.x += mouse.y * mouseInfluence * 0.005
      }

      renderer.render(scene, camera)
      animationIdRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Handle resize with strict conditions to prevent scroll jutter
    let resizeTimeout
    let lastKnownWidth = window.innerWidth
    let lastKnownHeight = window.innerHeight
    
    const handleResize = () => {
      // Clear existing timeout to debounce resize events
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const newWidth = window.innerWidth
        const newHeight = window.innerHeight
        
        // Only resize if there's a significant change AND it's been stable for a moment
        const widthChange = Math.abs(newWidth - lastKnownWidth)
        const heightChange = Math.abs(newHeight - lastKnownHeight)
        
        // Only update if there's a significant change (more than 20px difference)
        // and it's not just a minor scroll-related layout shift
        if (widthChange > 20 || heightChange > 20) {
          // Double-check the dimensions haven't changed again (indicating scroll)
          setTimeout(() => {
            if (window.innerWidth === newWidth && window.innerHeight === newHeight) {
              camera.aspect = newWidth / newHeight
              camera.updateProjectionMatrix()
              renderer.setSize(newWidth, newHeight)
              particleMaterial.uniforms.pixelRatio.value = pixelRatio
              
              lastKnownWidth = newWidth
              lastKnownHeight = newHeight
            }
          }, 50) // Additional delay to ensure stability
        }
      }, 300) // Increased debounce delay
    }
    
    // Only listen to actual window resize, not scroll events
    window.addEventListener('resize', handleResize, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      
      // Clear resize timeout
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
      renderer.dispose()
      particles.dispose()
      particleMaterial.dispose()
      
      if (lineSystem) {
        lineSystem.geometry.dispose()
        lineSystem.material.dispose()
      }
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="particle-background"
    />
  )
}

export default ParticleBackground

