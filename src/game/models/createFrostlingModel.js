import * as THREE from "three";

export function createFrostlingModel() {
  const group = new THREE.Group();

  const frame = new THREE.MeshStandardMaterial({
    color: 0x121b2a,
    roughness: 0.42,
    metalness: 0.72,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0xb9f7ff,
    emissive: 0xb9f7ff,
    emissiveIntensity: 0.9,
    roughness: 0.12,
    metalness: 0.92,
  });

  const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.64, 0), frame);
  core.scale.set(1, 0.7, 1);
  group.add(core);

  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), glow);
  eye.position.set(0, 0, 0.6);
  group.add(eye);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.76, 0.05, 10, 24),
    glow,
  );
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 0.82), frame);
  fin.position.set(0, 0.18, -0.5);
  group.add(fin);

  group.userData.spinPart = ring;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
