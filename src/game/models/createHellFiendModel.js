import * as THREE from "three";

export function createHellFiendModel() {
  const group = new THREE.Group();

  const shell = new THREE.MeshStandardMaterial({
    color: 0x1b0d0b,
    roughness: 0.35,
    metalness: 0.7,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0xff6b2f,
    emissive: 0xff6b2f,
    emissiveIntensity: 1.2,
    roughness: 0.12,
    metalness: 0.88,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.62, 1.75), shell);
  body.position.set(0, 0.78, 0);
  group.add(body);

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 12), glow);
  core.position.set(0, 0.9, 0.38);
  group.add(core);

  const hornGeometry = new THREE.ConeGeometry(0.08, 0.32, 6);
  const leftHorn = new THREE.Mesh(hornGeometry, glow);
  leftHorn.position.set(-0.38, 1.05, 0.2);
  leftHorn.rotation.z = 0.8;
  group.add(leftHorn);

  const rightHorn = leftHorn.clone();
  rightHorn.position.x = 0.38;
  rightHorn.rotation.z = -0.8;
  group.add(rightHorn);

  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.22, 0.9), glow);
  fin.position.set(0, 1.02, -0.45);
  group.add(fin);

  group.userData.leftHorn = leftHorn;
  group.userData.rightHorn = rightHorn;
  group.userData.core = core;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
