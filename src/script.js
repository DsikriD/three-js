import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import { Sky } from "three/addons/objects/Sky.js";

console.log(Sky);

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

//Textures
const textureLoader = new THREE.TextureLoader();

//Floor
const floorAlphaTexture = textureLoader.load("/floor/alpha.jpg");

const floordiffTexture = textureLoader.load(
  "./floor/aerial_rocks_02_diff_1k.jpg"
);
const floorRoughTexture = textureLoader.load(
  "./floor/aerial_rocks_02_rough_1k.jpg"
);
const floorArmTexture = textureLoader.load(
  "./floor/aerial_rocks_02_disp_1k.jpg"
);

const floorDispTexture = textureLoader.load(
  "./floor/aerial_rocks_02_disp_1k.jpg"
);

const floorNormalTexture = textureLoader.load(
  "./floor/aerial_rocks_02_nor_gl_1k.jpg"
);

const stoneDiffTexture = textureLoader.load("./stone/riet_01_diff_1k.jpg");
const stoneDispTexture = textureLoader.load("/stone/riet_01_disp_1k.jpg");
const stoneArmTexture = textureLoader.load("/stone/riet_01_arm_1k.jpg");
const stoneNormalTexture = textureLoader.load("/stone/riet_01_nor_gl_1k.jpg");
const stoneRoughTexture = textureLoader.load("/stone/riet_01_rough_1k.jpg");
const stoneSpecTexture = textureLoader.load("/stone/riet_01_spec_1k.jpg");

const rockArmTexture = textureLoader.load("./rock/lichen_rock_ao_1k.jpg");
const rockDiffTexture = textureLoader.load("./rock/lichen_rock_diff_1k.jpg");
const rockDispTexture = textureLoader.load("./rock/seaside_rock_disp_1k.jpg");
const rockRoughTexture = textureLoader.load("./rock/seaside_rock_rough_1k.jpg");
const rockNormalTexture = textureLoader.load(
  "./rock/seaside_rock_nor_gl_1k.jpg"
);

//static/wall/rock_wall_07_arm_1k.jpg
const wallArmTexture = textureLoader.load("./wall/rock_wall_07_arm_1k.jpg");
const wallDiffTexture = textureLoader.load("./wall/rock_wall_07_diff_1k.jpg");
const wallDispTexture = textureLoader.load("./wall/rock_wall_07_disp_1k.jpg");
const wallNormalTexture = textureLoader.load(
  "./wall/rock_wall_07_nor_gl_1k.jpg"
);
const wallRoughTexture = textureLoader.load("./wall/rock_wall_07_rough_1k.jpg");

const roofArmTexture = textureLoader.load(
  "./roof/box_profile_metal_sheet_arm_1k.jpg"
);
const roofDiffTexture = textureLoader.load(
  "./roof/box_profile_metal_sheet_diff_1k.jpg"
);
const roofDispTexture = textureLoader.load(
  "./roof/box_profile_metal_sheet_disp_1k.jpg"
);
const roofNormalTexture = textureLoader.load(
  "./roof/box_profile_metal_sheet_nor_gl_1k.jpg"
);
const roofRoughTexture = textureLoader.load(
  "./roof/box_profile_metal_sheet_rough_1k.jpg"
);

// Door
const doorColorTexture = textureLoader.load("./door/color.jpg");
const doorAlphaTexture = textureLoader.load("./door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./door/height.jpg");
const doorNormalTexture = textureLoader.load("./door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("./door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("./door/roughness.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

// Scene
const scene = new THREE.Scene();

/**
 * House
 */
// Temporary sphere
// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(1, 32, 32),
//   new THREE.MeshStandardMaterial({ roughness: 0.7 })
// );
// scene.add(sphere);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * House
 */

const houseMeasurements = {
  width: 4,
  height: 2.5,
  depth: 4,
};
//floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    aoMap: floorArmTexture,
    map: floordiffTexture,
    roughnessMap: floorRoughTexture,
    displacementMap: floorDispTexture,
    normalMap: floorNormalTexture,
    displacementScale: 0.3,
    displacementBias: -0.2,
    transparent: true,
  })
);

floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

const house = new THREE.Group();
// Door light
const doorLight = new THREE.PointLight("#ff0f0f", 5);
doorLight.position.set(0, 2.2, 2.5);
house.add(doorLight);

scene.add(house);

const wallMaterial = new THREE.MeshStandardMaterial({
  map: wallDiffTexture,
  displacementMap: wallDispTexture,
  displacementScale: 0,
  displacementBias: 0,
  roughnessMap: wallRoughTexture,
  normalMap: wallNormalTexture,
  aoMap: wallArmTexture,
});

//wals
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(
    houseMeasurements.width,
    houseMeasurements.height,
    houseMeasurements.depth
  ),
  wallMaterial
);
walls.position.y = houseMeasurements.height / 2;

const roofMaterial = new THREE.MeshBasicMaterial({
  map: roofDiffTexture,
  normalMap: roofNormalTexture,
  displacementMap: roofDispTexture,
  displacementScale: 0.15,
  displacementBias: -0.03,
  roughnessMap: roofRoughTexture,
  aoMap: roofArmTexture,
});

const roof = new THREE.Mesh(new THREE.ConeGeometry(3.5, 1.5, 4), roofMaterial);

roof.position.y = houseMeasurements.height + 0.75;
roof.rotation.y = Math.PI / 4;
house.add(roof);
house.add(walls);

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.position.y = 1;
door.position.z = 2.01;
house.add(door);

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshBasicMaterial({
  map: stoneDiffTexture,
  displacementMap: stoneDispTexture,
  aoMap: stoneArmTexture,
  specularMap: stoneSpecTexture,
  normalMap: stoneNormalTexture,
  roughnessMap: stoneRoughTexture,
  transparent: true,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.setScalar(0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.setScalar(0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.setScalar(0.4);
bush3.position.set(-0.7, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.setScalar(0.15);
bush4.position.set(-1, 0.05, 2.6);
house.add(bush1, bush2, bush3, bush4);

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: rockDiffTexture,
  displacementMap: rockDispTexture,
  aoMap: rockArmTexture,
  roughnessMap: rockRoughTexture,
  normalMap: rockNormalTexture,
});
const graves = new THREE.Group();

for (let i = 0; i < 30; i++) {
  // Coordinates
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  // Mesh
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  //Position
  grave.position.x = x;
  grave.position.y = Math.random() * 0.4;
  grave.position.z = z;
  //Rotation
  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  // Add to the graves group

  grave.castShadow = true;
  grave.receiveShadow = true;
  graves.add(grave);
}

scene.add(graves);

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#ff0088", 6);
const ghost3 = new THREE.PointLight("#ff0000", 6);

// Cast and receive
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
scene.add(ghost1, ghost2, ghost3);

walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
floor.receiveShadow = true;

//
/**
 * Sky
 */
const sky = new Sky();
sky.scale.setScalar(100);
scene.add(sky);

sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

scene.fog = new THREE.FogExp2("#04343f", 0.1);
/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  const ghost1Angle = elapsedTime;
  ghost1.position.x = Math.cos((2 * Math.PI) / 3 + ghost1Angle) * 5;
  ghost1.position.z = Math.sin((2 * Math.PI) / 3 + ghost1Angle) * 5;
  ghost2.position.x = Math.cos((2 * (2 * Math.PI)) / 3 + ghost1Angle) * 5;
  ghost2.position.z = Math.sin((2 * (2 * Math.PI)) / 3 + ghost1Angle) * 5;
  ghost3.position.x = Math.cos(2 * Math.PI + ghost1Angle) * 5;
  ghost3.position.z = Math.sin(2 * Math.PI + ghost1Angle) * 5;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
