import * as THREE from "three";

export function createVortexBossModel() {
  const group = new THREE.Group();

  const shell = new THREE.MeshStandardMaterial({
    color: 0x162321,
    roughness: 0.28,
    metalness: 0.88,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0x7cff91,
    emissive: 0x7cff91,
    emissiveIntensity: 0.92,
    roughness: 0.12,
    metalness: 0.92,
  });

  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.08, 0), glow);
  core.position.set(0, 2.56, 0);
  group.add(core);

  const topRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.42, 0.16, 16, 40),
    shell,
  );
  topRing.position.y = 3.24;
  topRing.rotation.x = Math.PI / 2;
  group.add(topRing);

  const bottomRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.88, 0.12, 14, 38),
    glow,
  );
  bottomRing.position.y = 1.96;
  bottomRing.rotation.z = Math.PI / 2;
  group.add(bottomRing);

  const podGeometry = new THREE.CapsuleGeometry(0.54, 1.82, 6, 12);
  const leftPod = new THREE.Mesh(podGeometry, shell);
  leftPod.position.set(-2.7, 2.46, 0);
  leftPod.rotation.z = Math.PI / 2;
  group.add(leftPod);

  const rightPod = leftPod.clone();
  rightPod.position.x = 2.7;
  group.add(rightPod);

  const podCoreGeometry = new THREE.CylinderGeometry(0.14, 0.14, 1.4, 10);
  const leftPodCore = new THREE.Mesh(podCoreGeometry, glow);
  leftPodCore.position.set(-2.7, 2.46, 0);
  leftPodCore.rotation.z = Math.PI / 2;
  group.add(leftPodCore);

  const rightPodCore = leftPodCore.clone();
  rightPodCore.position.x = 2.7;
  group.add(rightPodCore);

  const strutGeometry = new THREE.BoxGeometry(1.44, 0.16, 0.16);
  for (const x of [-1.38, 1.38]) {
    const strut = new THREE.Mesh(strutGeometry, shell);
    strut.position.set(x, 2.46, 0);
    group.add(strut);
  }

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(1.12, 0.05, 10, 24),
    glow,
  );
  halo.position.y = 2.56;
  group.add(halo);

  group.userData.core = core;
  group.userData.topRing = topRing;
  group.userData.bottomRing = bottomRing;
  group.userData.leftPod = leftPod;
  group.userData.rightPod = rightPod;
  group.userData.halo = halo;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
