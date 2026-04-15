import * as THREE from "three";

export function createHarbingerBossModel() {
  const group = new THREE.Group();

  const armor = new THREE.MeshStandardMaterial({
    color: 0x2d1217,
    roughness: 0.38,
    metalness: 0.72,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0xff5d7a,
    emissive: 0xff5d7a,
    emissiveIntensity: 0.96,
    roughness: 0.12,
    metalness: 0.9,
  });

  const torso = new THREE.Mesh(new THREE.BoxGeometry(2.9, 1.8, 2.45), armor);
  torso.position.set(0, 2.26, 0);
  group.add(torso);

  const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.88, 0), glow);
  core.position.set(0, 2.34, 0.2);
  core.scale.set(0.95, 1.18, 0.95);
  group.add(core);

  const head = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.5, 5), armor);
  head.position.set(0, 3.78, 0.62);
  head.rotation.x = Math.PI / 2;
  head.rotation.z = Math.PI;
  group.add(head);

  const jaw = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.24, 0.74), glow);
  jaw.position.set(0, 3.35, 1.06);
  group.add(jaw);

  const shoulderGeometry = new THREE.BoxGeometry(0.82, 0.82, 1.52);
  const leftShoulder = new THREE.Mesh(shoulderGeometry, armor);
  leftShoulder.position.set(-2.06, 2.58, 0.12);
  group.add(leftShoulder);

  const rightShoulder = leftShoulder.clone();
  rightShoulder.position.x = 2.06;
  group.add(rightShoulder);

  const bladeGeometry = new THREE.ConeGeometry(0.32, 2.9, 6);
  const leftBlade = new THREE.Mesh(bladeGeometry, glow);
  leftBlade.position.set(-2.46, 1.8, 0.52);
  leftBlade.rotation.z = 0.96;
  leftBlade.rotation.x = Math.PI / 2;
  group.add(leftBlade);

  const rightBlade = leftBlade.clone();
  rightBlade.position.x = 2.46;
  rightBlade.rotation.z = -0.96;
  group.add(rightBlade);

  const hip = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.56, 1.8), armor);
  hip.position.set(0, 1.08, -0.06);
  group.add(hip);

  const legGeometry = new THREE.BoxGeometry(0.44, 1.78, 0.52);
  const legOffsets = [
    [-1.08, 0.18, 0.78],
    [1.08, 0.18, 0.78],
    [-0.92, 0.18, -0.82],
    [0.92, 0.18, -0.82],
  ];
  for (const [x, y, z] of legOffsets) {
    const leg = new THREE.Mesh(legGeometry, armor);
    leg.position.set(x, y, z);
    leg.rotation.z = x < 0 ? 0.16 : -0.16;
    group.add(leg);
  }

  const spine = new THREE.Mesh(
    new THREE.TorusGeometry(1.42, 0.08, 12, 32),
    glow,
  );
  spine.position.set(0, 2.66, -0.34);
  spine.rotation.x = Math.PI / 2;
  group.add(spine);

  group.userData.leftBlade = leftBlade;
  group.userData.rightBlade = rightBlade;
  group.userData.core = core;
  group.userData.spine = spine;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
