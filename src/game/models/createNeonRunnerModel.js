import * as THREE from "three";

export function createNeonRunnerModel() {
  const group = new THREE.Group();

  const frame = new THREE.MeshStandardMaterial({
    color: 0x101722,
    emissive: 0x0b1f2a,
    emissiveIntensity: 0.35,
    roughness: 0.38,
    metalness: 0.72,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0x25ffd7,
    emissive: 0x25ffd7,
    emissiveIntensity: 1.35,
    roughness: 0.12,
    metalness: 0.92,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 1.6), frame);
  body.position.set(0, 0.78, 0);
  group.add(body);

  const stripGeometry = new THREE.BoxGeometry(0.08, 0.18, 1.5);
  const leftStrip = new THREE.Mesh(stripGeometry, glow);
  leftStrip.position.set(-0.54, 0.78, 0);
  group.add(leftStrip);

  const rightStrip = leftStrip.clone();
  rightStrip.position.x = 0.54;
  group.add(rightStrip);

  const topStrip = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 1.5), glow);
  topStrip.position.set(0, 1.05, 0);
  group.add(topStrip);

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), glow);
  core.position.set(0, 0.84, 0.36);
  group.add(core);

  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.9), glow);
  fin.position.set(0, 1.02, -0.4);
  group.add(fin);

  const bladeGeometry = new THREE.BoxGeometry(0.12, 0.32, 0.72);
  const leftBlade = new THREE.Mesh(bladeGeometry, glow);
  leftBlade.position.set(-0.6, 0.78, 0.06);
  leftBlade.rotation.z = 0.4;
  group.add(leftBlade);

  const rightBlade = leftBlade.clone();
  rightBlade.position.x = 0.6;
  rightBlade.rotation.z = -0.4;
  group.add(rightBlade);

  group.userData.leftBlade = leftBlade;
  group.userData.rightBlade = rightBlade;
  group.userData.core = core;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
