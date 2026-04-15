import * as THREE from "three";

export function createSlagGunnerModel() {
  const group = new THREE.Group();

  const armor = new THREE.MeshStandardMaterial({
    color: 0x2a1f19,
    roughness: 0.46,
    metalness: 0.74,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0xffb347,
    emissive: 0xffb347,
    emissiveIntensity: 0.9,
    roughness: 0.14,
    metalness: 0.92,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 1.4), armor);
  body.position.set(0, 1.1, 0);
  group.add(body);

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.36, 12, 12), glow);
  core.position.set(0, 1.24, 0.32);
  group.add(core);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.44, 0.64), armor);
  head.position.set(0, 1.72, 0.12);
  group.add(head);

  const cannon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.2, 1.3, 10),
    glow,
  );
  cannon.rotation.x = Math.PI / 2;
  cannon.position.set(0, 1.34, 1.02);
  group.add(cannon);

  const drumGeometry = new THREE.CylinderGeometry(0.36, 0.42, 0.8, 10);
  const leftDrum = new THREE.Mesh(drumGeometry, armor);
  leftDrum.rotation.z = Math.PI / 2;
  leftDrum.position.set(-0.84, 1.04, 0.1);
  group.add(leftDrum);

  const rightDrum = leftDrum.clone();
  rightDrum.position.x = 0.84;
  group.add(rightDrum);

  const legGeometry = new THREE.BoxGeometry(0.32, 0.9, 0.36);
  for (const [x, z] of [
    [-0.46, 0.5],
    [0.46, 0.5],
    [-0.46, -0.46],
    [0.46, -0.46],
  ]) {
    const leg = new THREE.Mesh(legGeometry, armor);
    leg.position.set(x, 0.35, z);
    group.add(leg);
  }

  group.userData.cannon = cannon;
  group.userData.leftDrum = leftDrum;
  group.userData.rightDrum = rightDrum;
  group.userData.core = core;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
