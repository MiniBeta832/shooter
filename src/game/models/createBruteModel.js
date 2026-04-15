import * as THREE from "three";

export function createBruteModel() {
  const group = new THREE.Group();

  const armor = new THREE.MeshStandardMaterial({
    color: 0x4a1820,
    roughness: 0.52,
    metalness: 0.46,
  });

  const accent = new THREE.MeshStandardMaterial({
    color: 0xff6b57,
    emissive: 0xff6b57,
    emissiveIntensity: 0.78,
    roughness: 0.2,
    metalness: 0.82,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.3, 1.3), armor);
  body.position.y = 1.2;
  group.add(body);

  const chest = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.55, 0.24), accent);
  chest.position.set(0, 1.18, 0.78);
  group.add(chest);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.5, 0.72), armor);
  head.position.set(0, 2.04, 0.08);
  group.add(head);

  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.12, 0.1), accent);
  visor.position.set(0, 2.04, 0.44);
  group.add(visor);

  const armGeometry = new THREE.BoxGeometry(0.48, 0.48, 1.2);
  const leftArm = new THREE.Mesh(armGeometry, armor);
  leftArm.position.set(-1.24, 1.22, 0);
  group.add(leftArm);

  const rightArm = leftArm.clone();
  rightArm.position.x = 1.24;
  group.add(rightArm);

  const cannonGeometry = new THREE.CylinderGeometry(0.12, 0.12, 1.05, 12);
  const leftCannon = new THREE.Mesh(cannonGeometry, accent);
  leftCannon.rotation.x = Math.PI / 2;
  leftCannon.position.set(-1.24, 1.06, 0.58);
  group.add(leftCannon);

  const rightCannon = leftCannon.clone();
  rightCannon.position.x = 1.24;
  group.add(rightCannon);

  const legGeometry = new THREE.BoxGeometry(0.48, 1.1, 0.52);
  const leftLeg = new THREE.Mesh(legGeometry, armor);
  leftLeg.position.set(-0.52, 0.42, 0);
  group.add(leftLeg);

  const rightLeg = leftLeg.clone();
  rightLeg.position.x = 0.52;
  group.add(rightLeg);

  const footGeometry = new THREE.BoxGeometry(0.68, 0.28, 0.86);
  const leftFoot = new THREE.Mesh(footGeometry, armor);
  leftFoot.position.set(-0.52, -0.08, 0.12);
  group.add(leftFoot);

  const rightFoot = leftFoot.clone();
  rightFoot.position.x = 0.52;
  group.add(rightFoot);

  group.userData.leftArm = leftArm;
  group.userData.rightArm = rightArm;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
