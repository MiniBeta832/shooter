import * as THREE from "three";

export function createWardenModel() {
  const group = new THREE.Group();

  const armor = new THREE.MeshStandardMaterial({
    color: 0x2a2f3d,
    roughness: 0.46,
    metalness: 0.72,
  });

  const shield = new THREE.MeshStandardMaterial({
    color: 0xffd166,
    emissive: 0xffd166,
    emissiveIntensity: 0.78,
    roughness: 0.14,
    metalness: 0.88,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 1.2), armor);
  body.position.y = 1.4;
  group.add(body);

  const chest = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.46, 0.16), shield);
  chest.position.set(0, 1.42, 0.66);
  group.add(chest);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.52, 0.7), armor);
  head.position.set(0, 2.36, 0.06);
  group.add(head);

  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.14, 0.1), shield);
  visor.position.set(0, 2.34, 0.42);
  group.add(visor);

  const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.18, 0.5), armor);
  leftLeg.position.set(-0.42, 0.36, 0);
  group.add(leftLeg);

  const rightLeg = leftLeg.clone();
  rightLeg.position.x = 0.42;
  group.add(rightLeg);

  const shieldPlate = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 1.5, 0.18),
    shield,
  );
  shieldPlate.position.set(0, 1.36, 1.02);
  group.add(shieldPlate);

  const sideGuardGeometry = new THREE.BoxGeometry(0.18, 1.2, 0.84);
  const leftGuard = new THREE.Mesh(sideGuardGeometry, armor);
  leftGuard.position.set(-0.98, 1.26, 0.44);
  group.add(leftGuard);

  const rightGuard = leftGuard.clone();
  rightGuard.position.x = 0.98;
  group.add(rightGuard);

  group.userData.shieldPlate = shieldPlate;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
