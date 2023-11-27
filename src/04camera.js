import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  // camera
  // 화각  -- 시야각(object가 보이는 각도)
  const fov = 75
  // 종횡비
  const aspect = window.innerWidth / window.innerHeight
  // 카메라가 보이는 가까운 면
  const near = 0.1
  // 카메라가 보이는 먼 면
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  // 카메라 위치값 선정
  camera.position.x = 1
  camera.position.y = 1
  camera.position.z = 1
  // 카메라 바라보는 방향 설정
  camera.lookAt(new THREE.Vector3(0, 0, 0))

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

  // texture add
  const textureLoader = new THREE.TextureLoader()
  const textureBaseColor = textureLoader.load(
    '../static/img/Abstract_009_basecolor.jpg'
  )
  const textureNormal = textureLoader.load(
    '../static/img/Abstract_009_normal.jpg'
  )
  const textureRoughness = textureLoader.load(
    '../static/img/Abstract_009_roughness.jpg'
  )

  const textureHeight = textureLoader.load(
    '../static/img/Abstract_009_height.png'
  )

  // 바닥 추가

  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5
  scene.add(plane)

  // mesh
  const geometry = new THREE.SphereGeometry(0.3, 32, 16)
  const material01 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
  })
  const obj01 = new THREE.Mesh(geometry, material01)

  const material02 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormal,
  })
  const obj02 = new THREE.Mesh(geometry, material02)

  const material03 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormal,
    displacementMap: textureHeight,
    displacementScale: 0.03,
  })
  const obj03 = new THREE.Mesh(geometry, material03)

  const material04 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormal,
    displacementMap: textureHeight,
    displacementScale: 0.03,
    roughnessMap: textureRoughness,
    roughness: 0.9,
  })
  const obj04 = new THREE.Mesh(geometry, material04)

  function render(time) {
    time *= 0.0002

    scene.add(obj01)
    obj01.position.x = -2

    scene.add(obj02)
    obj02.position.x = -1

    scene.add(obj03)
    obj03.position.x = 0

    scene.add(obj04)
    obj04.position.x = 1

    // camera
    camera.position.z = 5

    // animate
    obj01.rotation.y = time

    obj02.rotation.y = time

    obj03.rotation.y = time

    obj04.rotation.y = time

    renderer.render(scene, camera)

    requestAnimationFrame(render)

    // 반응형 처리
  }

  // 반응형 처리
  window.addEventListener('resize', () => {
    // 종횡비 유지
    camera.aspect = window.innerWidth / window.innerHeight
    // 카메라 변화에 따라 반응형 처리
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  requestAnimationFrame(render)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
