import * as THREE from "three";

export function createNeonCasterModel() {
  const group = new THREE.Group();

  const frame = new THREE.MeshStandardMaterial({
    color: 0x121c2a,
    roughness: 0.4,
    metalness: 0.72,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0xffa41b,
    emissive: 0xffa41b,
    emissiveIntensity: 0.9,
    roughness: 0.12,
    metalness: 0.92,
  });

  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.2, 10), frame);
  core.position.set(0, 1.2, 0);
  group.add(core);

  const lens = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 12), glow);
  lens.position.set(0, 1.3, 0.56);
  group.add(lens);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(0.76, 0.08, 12, 24),
    glow,
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.set(0, 1.3, 0.1);
  group.add(halo);

  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.6, 0.9), frame);
  fin.position.set(0, 1.44, -0.5);
  group.add(fin);

  group.userData.halo = halo;
  group.userData.core = lens;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
