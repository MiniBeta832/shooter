import * as THREE from "three";

export function createSpecterModel() {
  const group = new THREE.Group();

  const shell = new THREE.MeshStandardMaterial({
    color: 0x23314e,
    roughness: 0.28,
    metalness: 0.74,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0xffd166,
    emissive: 0xffd166,
    emissiveIntensity: 0.88,
    roughness: 0.12,
    metalness: 0.82,
  });

  const spine = new THREE.Mesh(
    new THREE.CylinderGeometry(0.34, 0.42, 2.2, 12),
    shell,
  );
  spine.position.y = 1.4;
  group.add(spine);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 16), shell);
  head.position.set(0, 2.72, 0);
  group.add(head);

  const eye = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.12, 0.1), glow);
  eye.position.set(0, 2.72, 0.38);
  group.add(eye);

  const upperRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.92, 0.07, 12, 28),
    glow,
  );
  upperRing.rotation.x = Math.PI / 2;
  upperRing.position.y = 2.02;
  group.add(upperRing);

  const lowerRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.06, 12, 28),
    glow,
  );
  lowerRing.rotation.z = Math.PI / 2;
  lowerRing.position.y = 1.08;
  group.add(lowerRing);

  const antennaGeometry = new THREE.BoxGeometry(0.14, 0.9, 0.14);
  const leftAntenna = new THREE.Mesh(antennaGeometry, shell);
  leftAntenna.position.set(-0.62, 2.54, 0);
  leftAntenna.rotation.z = -0.42;
  group.add(leftAntenna);

  const rightAntenna = leftAntenna.clone();
  rightAntenna.position.x = 0.62;
  rightAntenna.rotation.z = 0.42;
  group.add(rightAntenna);

  group.userData.upperRing = upperRing;
  group.userData.lowerRing = lowerRing;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
