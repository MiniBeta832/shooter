import * as THREE from "three";

export function createWeaponModel() {
  const group = new THREE.Group();

  const shellMaterial = new THREE.MeshStandardMaterial({
    color: 0x15273d,
    roughness: 0.42,
    metalness: 0.78,
  });

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: 0x5cf2ff,
    emissive: 0x5cf2ff,
    emissiveIntensity: 0.8,
    roughness: 0.15,
    metalness: 0.9,
  });

  const barrelMaterial = new THREE.MeshStandardMaterial({
    color: 0xe4f5ff,
    roughness: 0.18,
    metalness: 1,
  });

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.22, 0.88),
    shellMaterial,
  );
  body.position.set(0, -0.06, -0.32);
  group.add(body);

  const casing = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.15, 0.42),
    shellMaterial,
  );
  casing.position.set(0.02, 0.08, -0.1);
  group.add(casing);

  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.06, 0.7, 10),
    barrelMaterial,
  );
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, -0.01, -0.74);
  group.add(barrel);

  const vent = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.04, 0.54),
    accentMaterial,
  );
  vent.position.set(0, 0.12, -0.38);
  group.add(vent);

  const grip = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.32, 0.14),
    shellMaterial,
  );
  grip.position.set(0.04, -0.26, -0.12);
  grip.rotation.z = -0.35;
  group.add(grip);

  const sight = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.06, 0.12),
    accentMaterial,
  );
  sight.position.set(0, 0.16, -0.06);
  group.add(sight);

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
