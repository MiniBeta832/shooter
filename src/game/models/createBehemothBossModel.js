import * as THREE from "three";

export function createBehemothBossModel() {
  const group = new THREE.Group();

  const armor = new THREE.MeshStandardMaterial({
    color: 0x2b2216,
    roughness: 0.46,
    metalness: 0.78,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0xffd166,
    emissive: 0xffd166,
    emissiveIntensity: 0.9,
    roughness: 0.14,
    metalness: 0.92,
  });

  const hull = new THREE.Mesh(new THREE.BoxGeometry(4.5, 1.62, 3.24), armor);
  hull.position.set(0, 1.18, 0);
  group.add(hull);

  const chest = new THREE.Mesh(new THREE.BoxGeometry(1.86, 0.7, 0.24), glow);
  chest.position.set(0, 1.42, 1.72);
  group.add(chest);

  const turret = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.42, 1.2, 14), armor);
  turret.position.set(0, 2.46, 0.18);
  group.add(turret);

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.72, 16, 16), glow);
  core.position.set(0, 2.72, 0.12);
  group.add(core);

  const cannon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.28, 2.8, 14),
    glow,
  );
  cannon.rotation.x = Math.PI / 2;
  cannon.position.set(0, 2.7, 1.92);
  group.add(cannon);

  const drumGeometry = new THREE.CylinderGeometry(0.62, 0.7, 1.98, 14);
  const leftDrum = new THREE.Mesh(drumGeometry, armor);
  leftDrum.rotation.z = Math.PI / 2;
  leftDrum.position.set(-2.58, 1.32, 0);
  group.add(leftDrum);

  const rightDrum = leftDrum.clone();
  rightDrum.position.x = 2.58;
  group.add(rightDrum);

  const treadGeometry = new THREE.BoxGeometry(0.54, 0.82, 2.82);
  for (const x of [-1.62, -0.54, 0.54, 1.62]) {
    const tread = new THREE.Mesh(treadGeometry, armor);
    tread.position.set(x, 0.1, 0);
    group.add(tread);
  }

  const stabilizerGeometry = new THREE.BoxGeometry(0.26, 1.12, 0.26);
  for (const x of [-1.84, 1.84]) {
    const stabilizer = new THREE.Mesh(stabilizerGeometry, glow);
    stabilizer.position.set(x, 2.18, -1.12);
    group.add(stabilizer);
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
