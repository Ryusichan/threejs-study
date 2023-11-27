import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
  camera.position.x = 0
  camera.position.y = 1
  camera.position.z = 2.8
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

  // 그림자 사용하겟다
  renderer.shadowMap.enabled = true

  // orbitControls 추가
  const controls = new OrbitControls(camera, renderer.domElement)
  // 줌인줌아웃 제한
  controls.minDistance = 2
  controls.maxDistance = 5

  // 최대각 조절
  controls.maxPolarAngle = Math.PI / 2.2
  controls.update()

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  // ambientLight.castShadow = true // 그림자 X

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  // 빛 방향 조절 그림자 길이 차이
  directionalLight.position.set(-1.5, 2.5, 5.5)
  scene.add(directionalLight)
  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  )
  scene.add(dlHelper)
  directionalLight.castShadow = true // 그림자 O
  // 그림자 해상도 조절
  // directionalLight.shadow.mapSize.width = 1024
  // directionalLight.shadow.mapSize.height = 1024
  // 그림자 블러처리
  directionalLight.shadow.radius = 8

  //여러 빛방향에서 그림자를 받을 수 있게
  // const pointLight = new THREE.PointLight(0xffffff, 0.5)
  // pointLight.position.set(-1, 1, 0.5)
  // scene.add(pointLight)
  // pointLight.castShadow = true // 그림자 O

  // rectLight
  const rectLight = new THREE.RectAreaLight(0xffffff, 6, 1, 0.5)
  rectLight.position.set(0.5, 1, 1)
  rectLight.lookAt(0, 0, 0)
  // scene.add(rectLight)
  // rectLight.castShadow = true // 그림자 X

  //spotLight
  // const spotLight = new THREE.SpotLight(0xffffff, 0.3)
  // spotLight.position.set(0, 2, 2)
  // spotLight.lookAt(0, 0, 0)
  // scene.add(spotLight)
  // spotLight.castShadow = true // 그림자 0

  // 도형 mesh
  // const geometry = new THREE.SphereGeometry(0.5, 32, 16)
  const geometry = new THREE.IcosahedronGeometry(0.5, 0)
  // const geometry = new THREE.ConeGeometry(0.5, 1, 32)
  const material = new THREE.MeshStandardMaterial({
    color: 0x004fff,
  })

  const geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material2 = new THREE.MeshStandardMaterial({
    color: 0x004fff,
  })

  // 그림자 생성
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.x = 0.5
  cube.position.y = 0.5
  scene.add(cube)
  cube.castShadow = true
  // 물체에도 그림자 생성되게 처리
  cube.receiveShadow = true

  const cube2 = new THREE.Mesh(geometry2, material2)
  cube2.position.set(-0.3, 1.4, 1.5)
  scene.add(cube2)
  cube2.castShadow = true

  // const obj01 = new THREE.Mesh(geometry, material)
  // obj01.position.x = 0

  // 바닥 추가

  const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.3
  scene.add(plane)
  // 그림자를 받는 면을 만들어줌
  plane.receiveShadow = true

  function animate() {
    requestAnimationFrame(animate)

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update()

    cube.rotation.y += 0.01
    cube2.rotation.x += 0.01
    cube2.rotation.y += 0.01

    renderer.render(scene, camera)
  }
  animate()

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
