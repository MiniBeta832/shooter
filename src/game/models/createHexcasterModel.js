import * as THREE from "three";

export function createHexcasterModel() {
  const group = new THREE.Group();

  const shell = new THREE.MeshStandardMaterial({
    color: 0x1b1530,
    roughness: 0.24,
    metalness: 0.82,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0x9f86ff,
    emissive: 0x9f86ff,
    emissiveIntensity: 0.9,
    roughness: 0.08,
    metalness: 0.92,
  });

  const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.72, 0), shell);
  core.position.y = 1.28;
  group.add(core);

  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), glow);
  eye.position.set(0, 1.28, 0.56);
  group.add(eye);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.02, 0.08, 12, 28),
    glow,
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 1.2;
  group.add(ring);

  const lowerRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.62, 0.05, 10, 24),
    shell,
  );
  lowerRing.rotation.z = Math.PI / 2;
  lowerRing.position.y = 0.96;
  group.add(lowerRing);

  const crystalOffsets = [
    new THREE.Vector3(-0.92, 1.12, 0),
    new THREE.Vector3(0.92, 1.12, 0),
    new THREE.Vector3(0, 1.98, 0),
  ];
  const crystals = [];
  for (const offset of crystalOffsets) {
    const crystal = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.26, 0),
      glow,
    );
    crystal.position.copy(offset);
    crystal.scale.set(0.8, 1.36, 0.8);
    group.add(crystal);
    crystals.push(crystal);
  }

  group.userData.ring = ring;
  group.userData.lowerRing = lowerRing;
  group.userData.crystals = crystals;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
