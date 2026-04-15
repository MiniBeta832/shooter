import * as THREE from "three";

export function createEmberHoundModel() {
  const group = new THREE.Group();

  const armor = new THREE.MeshStandardMaterial({
    color: 0x2b1a14,
    roughness: 0.44,
    metalness: 0.72,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0xff7a3d,
    emissive: 0xff7a3d,
    emissiveIntensity: 0.9,
    roughness: 0.14,
    metalness: 0.92,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.7, 1.9), armor);
  body.position.set(0, 0.9, 0);
  group.add(body);

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 12), glow);
  core.position.set(0, 0.95, 0.25);
  group.add(core);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.46, 0.7), armor);
  head.position.set(0, 1.05, 1.1);
  group.add(head);

  const snout = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.46, 8), glow);
  snout.rotation.x = Math.PI / 2;
  snout.position.set(0, 0.96, 1.48);
  group.add(snout);

  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.8, 8), glow);
  tail.rotation.x = -Math.PI / 2;
  tail.position.set(0, 1.0, -1.16);
  group.add(tail);

  const legGeometry = new THREE.BoxGeometry(0.22, 0.5, 0.26);
  for (const [x, z] of [
    [-0.52, 0.6],
    [0.52, 0.6],
    [-0.52, -0.45],
    [0.52, -0.45],
  ]) {
    const leg = new THREE.Mesh(legGeometry, armor);
    leg.position.set(x, 0.3, z);
    group.add(leg);
  }

  group.userData.tail = tail;
  group.userData.core = core;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
