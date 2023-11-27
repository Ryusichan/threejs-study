import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

if (WEBGL.isWebGLAvailable()) {
  const FogColor = 0x004fff
  const objColor = 0xffffff
  const FloorColor = 0x555555

  // scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(FloorColor)

  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  // 안개 추가
  // fog 거리 조절
  // scene.fog = new THREE.Fog(FogColor, 0.5, 8)
  // fog밀도 조절
  // scene.fog = new THREE.FogExp2(FogColor, 0.4)

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
  // renderer.shadowMap.enabled = true

  // orbitControls 추가
  const controls = new OrbitControls(camera, renderer.domElement)
  // 줌인줌아웃 제한
  controls.minDistance = 20
  controls.maxDistance = 500

  // 최대각 조절
  // controls.maxPolarAngle = Math.PI / 2.2
  // controls.update()

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  // ambientLight.castShadow = true // 그림자 X

  // rectLight
  // const rectLight = new THREE.RectAreaLight(0xffffff, 6, 1, 0.5)
  // rectLight.position.set(0.5, 1, 1)
  // rectLight.lookAt(0, 0, 0)
  // scene.add(rectLight)
  // rectLight.castShadow = true // 그림자 X

  //spotLight
  // const spotLight = new THREE.SpotLight(0xffffff, 0.3)
  // spotLight.position.set(0, 2, 2)
  // spotLight.lookAt(0, 0, 0)
  // scene.add(spotLight)
  // spotLight.castShadow = true // 그림자 0

  const skyMaterialArray = []
  // 도형 mesh

  const textureFT = new THREE.TextureLoader().load(
    '../static/textures/space/humble_ft.jpg'
  )

  const textureBK = new THREE.TextureLoader().load(
    '../static/textures/space/humble_bk.jpg'
  )
  const textureUP = new THREE.TextureLoader().load(
    '../static/textures/space/humble_up.jpg'
  )

  const textureDN = new THREE.TextureLoader().load(
    '../static/textures/space/humble_dn.jpg'
  )

  const textureRT = new THREE.TextureLoader().load(
    '../static/textures/space/humble_rt.jpg'
  )

  const textureLF = new THREE.TextureLoader().load(
    '../static/textures/space/humble_lf.jpg'
  )

  skyMaterialArray.push(new THREE.MeshStandardMaterial({ map: textureFT }))
  skyMaterialArray.push(new THREE.MeshStandardMaterial({ map: textureBK }))
  skyMaterialArray.push(new THREE.MeshStandardMaterial({ map: textureUP }))
  skyMaterialArray.push(new THREE.MeshStandardMaterial({ map: textureDN }))
  skyMaterialArray.push(new THREE.MeshStandardMaterial({ map: textureRT }))
  skyMaterialArray.push(new THREE.MeshStandardMaterial({ map: textureLF }))

  for (let i = 0; i < 6; i++) {
    skyMaterialArray[i].side = THREE.BackSide
  }

  const skyGeometry = new THREE.BoxGeometry(1400, 1400, 1400)
  // const skyMaterial = new THREE.MeshBasicMaterial({
  // color: 0xffffff,
  //   map: textureBK,
  // })
  // skyMaterial.side = THREE.BackSide

  const sky = new THREE.Mesh(skyGeometry, skyMaterialArray)
  scene.add(sky)

  // const obj01 = new THREE.Mesh(geometry, material)
  // obj01.position.x = 0

  // 바닥 추가

  function animate() {
    requestAnimationFrame(animate)

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update()

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

  // requestAnimationFrame(render)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
