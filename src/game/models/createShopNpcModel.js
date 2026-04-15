import * as THREE from "three";

export function createShopNpcModel() {
  const group = new THREE.Group();

  const shell = new THREE.MeshStandardMaterial({
    color: 0x263148,
    roughness: 0.34,
    metalness: 0.78,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0xffd166,
    emissive: 0xffd166,
    emissiveIntensity: 0.9,
    roughness: 0.12,
    metalness: 0.86,
  });

  const robe = new THREE.Mesh(
    new THREE.CylinderGeometry(0.9, 1.25, 2.4, 12),
    shell,
  );
  robe.position.y = 1.35;
  group.add(robe);

  const chest = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.55, 0.22),
    glow,
  );
  chest.position.set(0, 1.68, 0.82);
  group.add(chest);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.58, 16, 16), shell);
  head.position.set(0, 3.02, 0);
  group.add(head);

  const visor = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.16, 0.12),
    glow,
  );
  visor.position.set(0, 3.02, 0.5);
  group.add(visor);

  const armGeometry = new THREE.BoxGeometry(0.34, 1.55, 0.34);
  const leftArm = new THREE.Mesh(armGeometry, shell);
  leftArm.position.set(-1.02, 1.7, 0);
  group.add(leftArm);

  const rightArm = leftArm.clone();
  rightArm.position.x = 1.02;
  group.add(rightArm);

  const handGeometry = new THREE.SphereGeometry(0.2, 12, 12);
  const leftHand = new THREE.Mesh(handGeometry, glow);
  leftHand.position.set(-1.02, 0.92, 0.12);
  group.add(leftHand);

  const rightHand = leftHand.clone();
  rightHand.position.x = 1.02;
  group.add(rightHand);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(1.15, 0.06, 12, 28),
    glow,
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 3.18;
  group.add(halo);

  group.userData.leftArm = leftArm;
  group.userData.rightArm = rightArm;
  group.userData.leftHand = leftHand;
  group.userData.rightHand = rightHand;
  group.userData.halo = halo;
  group.userData.head = head;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
