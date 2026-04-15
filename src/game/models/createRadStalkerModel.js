import * as THREE from "three";

export function createRadStalkerModel() {
  const group = new THREE.Group();

  const frame = new THREE.MeshStandardMaterial({
    color: 0x102217,
    roughness: 0.44,
    metalness: 0.68,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0x8dff7a,
    emissive: 0x8dff7a,
    emissiveIntensity: 0.9,
    roughness: 0.12,
    metalness: 0.92,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.7, 1.7), frame);
  body.position.set(0, 0.86, 0);
  group.add(body);

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 12), glow);
  core.position.set(0, 0.9, 0.36);
  group.add(core);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.42, 0.62), frame);
  head.position.set(0, 1.02, 1.02);
  group.add(head);

  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.78, 8), glow);
  tail.rotation.x = -Math.PI / 2;
  tail.position.set(0, 0.96, -1.06);
  group.add(tail);

  const legGeometry = new THREE.BoxGeometry(0.2, 0.46, 0.24);
  for (const [x, z] of [
    [-0.48, 0.54],
    [0.48, 0.54],
    [-0.48, -0.38],
    [0.48, -0.38],
  ]) {
    const leg = new THREE.Mesh(legGeometry, frame);
    leg.position.set(x, 0.28, z);
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
