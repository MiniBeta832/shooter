import * as THREE from "three";

export function createSporeBruiserModel() {
  const group = new THREE.Group();

  const frame = new THREE.MeshStandardMaterial({
    color: 0x142419,
    roughness: 0.48,
    metalness: 0.64,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0x77c75a,
    emissive: 0x77c75a,
    emissiveIntensity: 0.88,
    roughness: 0.12,
    metalness: 0.92,
  });

  const torso = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 1.4), frame);
  torso.position.set(0, 1.12, 0);
  group.add(torso);

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 12), glow);
  core.position.set(0, 1.24, 0.4);
  group.add(core);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.7), frame);
  head.position.set(0, 1.74, 0.12);
  group.add(head);

  const pods = [];
  for (const [x, z] of [
    [-0.9, 0.6],
    [0.9, 0.6],
    [-0.9, -0.5],
    [0.9, -0.5],
  ]) {
    const pod = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 10), glow);
    pod.position.set(x, 1.1, z);
    group.add(pod);
    pods.push(pod);
  }

  const legGeometry = new THREE.BoxGeometry(0.34, 0.9, 0.4);
  for (const [x, z] of [
    [-0.56, 0.5],
    [0.56, 0.5],
    [-0.56, -0.46],
    [0.56, -0.46],
  ]) {
    const leg = new THREE.Mesh(legGeometry, frame);
    leg.position.set(x, 0.35, z);
    group.add(leg);
  }

  group.userData.core = core;
  group.userData.pods = pods;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
