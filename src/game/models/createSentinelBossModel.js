import * as THREE from "three";

export function createSentinelBossModel() {
  const group = new THREE.Group();

  const shell = new THREE.MeshStandardMaterial({
    color: 0x102438,
    roughness: 0.34,
    metalness: 0.82,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0x7cf5ff,
    emissive: 0x7cf5ff,
    emissiveIntensity: 0.98,
    roughness: 0.1,
    metalness: 0.94,
  });

  const body = new THREE.Mesh(new THREE.CylinderGeometry(2.68, 2.92, 0.82, 22), shell);
  body.position.y = 2.42;
  group.add(body);

  const crown = new THREE.Mesh(new THREE.CylinderGeometry(1.24, 1.74, 1.18, 12), shell);
  crown.position.y = 3.38;
  group.add(crown);

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.84, 18, 18), glow);
  core.position.set(0, 2.48, 0);
  group.add(core);

  const outerRing = new THREE.Mesh(
    new THREE.TorusGeometry(3.06, 0.18, 16, 44),
    glow,
  );
  outerRing.position.y = 2.48;
  outerRing.rotation.x = Math.PI / 2;
  group.add(outerRing);

  const lowerRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.12, 0.12, 12, 36),
    shell,
  );
  lowerRing.position.y = 1.98;
  lowerRing.rotation.x = Math.PI / 2;
  group.add(lowerRing);

  const antennaGeometry = new THREE.BoxGeometry(0.24, 2.32, 0.28);
  const leftAntenna = new THREE.Mesh(antennaGeometry, glow);
  leftAntenna.position.set(-1.18, 4.52, 0);
  leftAntenna.rotation.z = 0.28;
  group.add(leftAntenna);

  const rightAntenna = leftAntenna.clone();
  rightAntenna.position.x = 1.18;
  rightAntenna.rotation.z = -0.28;
  group.add(rightAntenna);

  const finGeometry = new THREE.BoxGeometry(0.22, 1.92, 1.12);
  for (const angle of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) {
    const fin = new THREE.Mesh(finGeometry, shell);
    fin.position.set(Math.cos(angle) * 2.28, 2.52, Math.sin(angle) * 2.28);
    fin.rotation.y = angle;
    group.add(fin);
  }

  group.userData.outerRing = outerRing;
  group.userData.core = core;
  group.userData.leftAntenna = leftAntenna;
  group.userData.rightAntenna = rightAntenna;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
