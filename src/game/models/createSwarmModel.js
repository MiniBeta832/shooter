import * as THREE from "three";

export function createSwarmModel() {
  const group = new THREE.Group();

  const shell = new THREE.MeshStandardMaterial({
    color: 0x2b1531,
    roughness: 0.34,
    metalness: 0.64,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0xff78d1,
    emissive: 0xff78d1,
    emissiveIntensity: 0.9,
    roughness: 0.08,
    metalness: 0.86,
  });

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.44, 16, 16), shell);
  group.add(core);

  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), glow);
  eye.position.set(0, 0, 0.38);
  group.add(eye);

  const legGeometry = new THREE.CylinderGeometry(0.04, 0.04, 1.05, 6);
  for (let i = 0; i < 6; i += 1) {
    const leg = new THREE.Mesh(legGeometry, shell);
    const angle = (i / 6) * Math.PI * 2;
    leg.position.set(Math.cos(angle) * 0.46, -0.12, Math.sin(angle) * 0.46);
    leg.rotation.z = Math.cos(angle) * 0.95;
    leg.rotation.x = Math.sin(angle) * 0.55;
    group.add(leg);
  }

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(0.7, 0.05, 10, 24),
    glow,
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 0.04;
  group.add(halo);

  group.userData.halo = halo;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
