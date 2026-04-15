import * as THREE from "three";

export function createLancerModel() {
  const group = new THREE.Group();

  const shell = new THREE.MeshStandardMaterial({
    color: 0x18263f,
    roughness: 0.28,
    metalness: 0.82,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0x8df9ff,
    emissive: 0x8df9ff,
    emissiveIntensity: 0.92,
    roughness: 0.08,
    metalness: 0.94,
  });

  const core = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.34, 1.1, 6, 12),
    shell,
  );
  core.rotation.z = Math.PI / 2;
  group.add(core);

  const spear = new THREE.Mesh(
    new THREE.ConeGeometry(0.2, 0.95, 10),
    glow,
  );
  spear.rotation.z = -Math.PI / 2;
  spear.position.set(1.06, 0, 0);
  group.add(spear);

  const tail = new THREE.Mesh(
    new THREE.ConeGeometry(0.18, 0.7, 10),
    shell,
  );
  tail.rotation.z = Math.PI / 2;
  tail.position.set(-0.96, 0, 0);
  group.add(tail);

  const finGeometry = new THREE.BoxGeometry(0.12, 0.88, 0.36);
  const topFin = new THREE.Mesh(finGeometry, shell);
  topFin.position.set(0.1, 0.54, 0);
  topFin.rotation.z = 0.2;
  group.add(topFin);

  const bottomFin = topFin.clone();
  bottomFin.position.y = -0.54;
  bottomFin.rotation.z = -0.2;
  group.add(bottomFin);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.56, 0.05, 12, 26),
    glow,
  );
  ring.rotation.y = Math.PI / 2;
  group.add(ring);

  group.userData.ring = ring;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
