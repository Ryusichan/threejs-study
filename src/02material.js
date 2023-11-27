import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x004ff)

  // camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  // renderer
  const renderer = new THREE.WebGLRenderer({
    // 사이드부분 매끄럽게 처리
    antialias: true,
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  // mesh
  const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40)

  const material01 = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
    metalness: 0.5,
    roughness: 0.1,
  })
  const obj01 = new THREE.Mesh(geometry, material01)

  const material02 = new THREE.MeshStandardMaterial({ color: 0xff7f00 })
  const obj02 = new THREE.Mesh(geometry, material02)

  const material03 = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
    // 빛반사까지 표현
    metalness: 0.5,
    roughness: 0.1,
  })
  const obj03 = new THREE.Mesh(geometry, material03)

  const material04 = new THREE.MeshStandardMaterial({ color: 0xff7f00 })
  const obj04 = new THREE.Mesh(geometry, material04)

  const material05 = new THREE.MeshStandardMaterial({ color: 0xff7f00 })
  const obj05 = new THREE.Mesh(geometry, material05)

  function render(time) {
    time *= 0.0005

    scene.add(obj01)
    obj01.position.x = -2

    scene.add(obj02)
    obj02.position.x = -1

    scene.add(obj03)
    obj03.position.x = 0

    scene.add(obj04)
    obj04.position.x = 1

    scene.add(obj05)
    obj05.position.x = 2

    // camera
    camera.position.z = 5

    // animate
    obj01.rotation.y = time

    obj02.rotation.y = time

    obj03.rotation.y = time

    obj04.rotation.y = time

    obj05.rotation.y = time

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  // 반응형 처리
  window.addEventListener('resize', () => {
    // 종횡비 유지
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  requestAnimationFrame(render)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
