import * as THREE from "three";

export function createScoutModel() {
  const group = new THREE.Group();

  const frame = new THREE.MeshStandardMaterial({
    color: 0x1d2742,
    roughness: 0.38,
    metalness: 0.72,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0x5cf2ff,
    emissive: 0x5cf2ff,
    emissiveIntensity: 0.9,
    roughness: 0.08,
    metalness: 0.92,
  });

  const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.7, 0), frame);
  core.scale.set(1, 0.68, 1);
  group.add(core);

  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 14), glow);
  eye.position.set(0, 0, 0.64);
  group.add(eye);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.8, 0.06, 10, 26),
    glow,
  );
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  const wingGeometry = new THREE.BoxGeometry(0.16, 0.12, 0.9);
  const leftWing = new THREE.Mesh(wingGeometry, frame);
  leftWing.position.set(-0.92, -0.06, 0);
  leftWing.rotation.z = -0.3;
  group.add(leftWing);

  const rightWing = leftWing.clone();
  rightWing.position.x = 0.92;
  rightWing.rotation.z = 0.3;
  group.add(rightWing);

  const thrusterGeometry = new THREE.CylinderGeometry(0.09, 0.14, 0.3, 8);
  const thrusterLeft = new THREE.Mesh(thrusterGeometry, glow);
  thrusterLeft.rotation.x = Math.PI / 2;
  thrusterLeft.position.set(-0.56, -0.38, -0.34);
  group.add(thrusterLeft);

  const thrusterRight = thrusterLeft.clone();
  thrusterRight.position.x = 0.56;
  group.add(thrusterRight);

  group.userData.spinPart = ring;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
