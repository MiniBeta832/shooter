import * as THREE from "three";

export function createBossModel() {
  const group = new THREE.Group();

  const armor = new THREE.MeshStandardMaterial({
    color: 0x37141a,
    roughness: 0.48,
    metalness: 0.66,
  });

  const core = new THREE.MeshStandardMaterial({
    color: 0xff8c42,
    emissive: 0xff8c42,
    emissiveIntensity: 0.92,
    roughness: 0.14,
    metalness: 0.9,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.4, 2.2), armor);
  body.position.y = 2.5;
  group.add(body);

  const chest = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 0.22), core);
  chest.position.set(0, 2.45, 1.22);
  group.add(chest);

  const head = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.95, 1.05), armor);
  head.position.set(0, 4.1, 0.2);
  group.add(head);

  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.18, 0.14), core);
  visor.position.set(0, 4.08, 0.76);
  group.add(visor);

  const shoulderGeometry = new THREE.BoxGeometry(0.9, 0.9, 1.6);
  const leftShoulder = new THREE.Mesh(shoulderGeometry, armor);
  leftShoulder.position.set(-2.22, 3.02, 0);
  group.add(leftShoulder);

  const rightShoulder = leftShoulder.clone();
  rightShoulder.position.x = 2.22;
  group.add(rightShoulder);

  const cannonGeometry = new THREE.CylinderGeometry(0.16, 0.2, 1.8, 12);
  const leftCannon = new THREE.Mesh(cannonGeometry, core);
  leftCannon.rotation.x = Math.PI / 2;
  leftCannon.position.set(-2.22, 2.74, 1.12);
  group.add(leftCannon);

  const rightCannon = leftCannon.clone();
  rightCannon.position.x = 2.22;
  group.add(rightCannon);

  const armGeometry = new THREE.BoxGeometry(0.8, 2, 0.86);
  const leftArm = new THREE.Mesh(armGeometry, armor);
  leftArm.position.set(-2.18, 1.52, 0);
  group.add(leftArm);

  const rightArm = leftArm.clone();
  rightArm.position.x = 2.18;
  group.add(rightArm);

  const hip = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.7, 1.5), armor);
  hip.position.set(0, 0.92, 0);
  group.add(hip);

  const legGeometry = new THREE.BoxGeometry(0.78, 1.95, 0.92);
  const leftLeg = new THREE.Mesh(legGeometry, armor);
  leftLeg.position.set(-0.78, -0.2, 0);
  group.add(leftLeg);

  const rightLeg = leftLeg.clone();
  rightLeg.position.x = 0.78;
  group.add(rightLeg);

  const footGeometry = new THREE.BoxGeometry(1.1, 0.36, 1.46);
  const leftFoot = new THREE.Mesh(footGeometry, armor);
  leftFoot.position.set(-0.78, -1.28, 0.14);
  group.add(leftFoot);

  const rightFoot = leftFoot.clone();
  rightFoot.position.x = 0.78;
  group.add(rightFoot);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.5, 0.1, 12, 42),
    core,
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 2.5;
  group.add(ring);

  group.userData.leftArm = leftArm;
  group.userData.rightArm = rightArm;
  group.userData.ring = ring;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
