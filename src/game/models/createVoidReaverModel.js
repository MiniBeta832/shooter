import * as THREE from "three";

export function createVoidReaverModel() {
  const group = new THREE.Group();

  const shell = new THREE.MeshStandardMaterial({
    color: 0x0a1018,
    roughness: 0.32,
    metalness: 0.78,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0x8a6cff,
    emissive: 0x8a6cff,
    emissiveIntensity: 1.1,
    roughness: 0.1,
    metalness: 0.9,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.5, 1.6), shell);
  body.position.set(0, 0.78, 0);
  group.add(body);

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), glow);
  core.position.set(0, 0.88, 0.3);
  group.add(core);

  const bladeGeometry = new THREE.BoxGeometry(0.12, 0.28, 0.9);
  const leftBlade = new THREE.Mesh(bladeGeometry, glow);
  leftBlade.position.set(-0.56, 0.74, 0.08);
  leftBlade.rotation.z = 0.5;
  group.add(leftBlade);

  const rightBlade = leftBlade.clone();
  rightBlade.position.x = 0.56;
  rightBlade.rotation.z = -0.5;
  group.add(rightBlade);

  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.2, 0.8), glow);
  fin.position.set(0, 0.98, -0.5);
  group.add(fin);

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
