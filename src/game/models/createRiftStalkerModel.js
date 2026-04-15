import * as THREE from "three";

export function createRiftStalkerModel() {
  const group = new THREE.Group();

  const shell = new THREE.MeshStandardMaterial({
    color: 0x121d19,
    roughness: 0.34,
    metalness: 0.72,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0x7cff91,
    emissive: 0x7cff91,
    emissiveIntensity: 0.92,
    roughness: 0.1,
    metalness: 0.86,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.72, 2.1), shell);
  body.position.y = 0.5;
  group.add(body);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.54, 0.92), shell);
  head.position.set(0, 0.74, 1.18);
  group.add(head);

  const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.12, 0.54), glow);
  jaw.position.set(0, 0.52, 1.54);
  group.add(jaw);

  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.28, 1.34, 8), glow);
  tail.position.set(0, 0.62, -1.62);
  tail.rotation.x = -Math.PI / 2;
  group.add(tail);

  const clawGeometry = new THREE.CylinderGeometry(0.05, 0.08, 1.12, 6);
  const legOffsets = [
    [-0.48, 0.08, 0.72],
    [0.48, 0.08, 0.72],
    [-0.48, 0.08, -0.3],
    [0.48, 0.08, -0.3],
  ];
  const frontClaws = [];
  for (const [index, [x, y, z]] of legOffsets.entries()) {
    const leg = new THREE.Mesh(clawGeometry, shell);
    leg.position.set(x, y, z);
    leg.rotation.z = x < 0 ? 0.42 : -0.42;
    leg.rotation.x = z > 0 ? -0.3 : 0.3;
    group.add(leg);

    if (index < 2) {
      frontClaws.push(leg);
    }
  }

  const fin = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.06, 10, 24), glow);
  fin.rotation.x = Math.PI / 2;
  fin.position.set(0, 0.76, 0.2);
  group.add(fin);

  group.userData.tail = tail;
  group.userData.fin = fin;
  group.userData.frontLeftClaw = frontClaws[0];
  group.userData.frontRightClaw = frontClaws[1];

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
