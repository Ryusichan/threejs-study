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

  // mesh
  const geometry01 = new THREE.IcosahedronGeometry(1, 1)
  const material01 = new THREE.MeshStandardMaterial({ color: 0x999999 })
  const obj01 = new THREE.Mesh(geometry01, material01)

  // mesh
  const geometry02 = new THREE.ConeGeometry(0.4, 0.6, 6)
  const material02 = new THREE.MeshStandardMaterial({ color: 0x999999 })
  const obj02 = new THREE.Mesh(geometry02, material02)

  // mesh
  const geometry03 = new THREE.BoxGeometry(1, 1, 1)
  const material03 = new THREE.MeshStandardMaterial({ color: 0x999999 })
  const obj03 = new THREE.Mesh(geometry03, material03)

  // mesh
  const geometry04 = new THREE.BoxGeometry(1, 1, 1)
  const material04 = new THREE.MeshStandardMaterial({ color: 0x999999 })
  const obj04 = new THREE.Mesh(geometry04, material04)

  function render(time) {
    time *= 0.0005

    scene.add(obj01)
    obj01.position.x = 2
    obj01.position.y = 2

    scene.add(obj02)
    obj02.position.x = -2
    obj02.position.y = 2

    scene.add(obj03)
    obj03.position.x = 2
    obj03.position.y = -2

    scene.add(obj04)
    obj04.position.x = -2
    obj04.position.y = -2

    // camera
    camera.position.z = 5

    // animate
    obj01.rotation.x = time
    obj01.rotation.y = time

    obj02.rotation.x = time
    obj02.rotation.y = time

    obj03.rotation.x = time
    obj03.rotation.y = time

    obj04.rotation.x = time
    obj04.rotation.y = time

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
