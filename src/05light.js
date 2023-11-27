import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  // camera
  // 화각  -- 시야각(object가 보이는 각도)
  const fov = 120
  // 종횡비
  const aspect = window.innerWidth / window.innerHeight
  // 카메라가 보이는 가까운 면
  const near = 0.1
  // 카메라가 보이는 먼 면
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  // 카메라 위치값 선정
  camera.position.x = 0
  camera.position.y = 2.7
  camera.position.z = 2
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
  const material = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
  })

  const obj01 = new THREE.Mesh(geometry, material)
  obj01.position.x = 0
  // 빛

  // 전체를 비쳐주는 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
  // scene.add(ambientLight)

  // 특정방향으로 빛 방출
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4)
  directionalLight.position.set(-1, 1, 1)
  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  )
  // scene.add(dlHelper)
  // scene.add(directionalLight)

  // hemisphereLight 주변 빛
  const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.3)
  // scene.add(hemisphereLight)

  // pintLight 점빛 전구
  const pointLight2 = new THREE.PointLight(0xffffff, 0.3)
  pointLight2.position.set(-3, 2, 2)
  // scene.add(pointLight2)

  const pointLight3 = new THREE.PointLight(0xffffff, 0.3)
  pointLight3.position.set(3, 2, 2)
  // scene.add(pointLight3)

  const plhelper = new THREE.PointLightHelper(pointLight2, 0.2)
  // scene.add(plhelper)

  const plhelper2 = new THREE.PointLightHelper(pointLight3, 0.2)
  // scene.add(plhelper2)

  // rectLight
  const rectLight = new THREE.RectAreaLight(0xffffff, 6, 1, 0.5)
  rectLight.position.set(0.5, 1, 1)
  rectLight.lookAt(0, 0, 0)
  // scene.add(rectLight)

  //spotLight
  const spotLight = new THREE.SpotLight(0xffffff, 0.3)
  spotLight.position.set(0, 2, 2)
  spotLight.lookAt(0, 0, 0)
  scene.add(spotLight)

  function render(time) {
    time *= 0.0002

    scene.add(obj01)

    // camera
    camera.position.z = 5

    // animate

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
