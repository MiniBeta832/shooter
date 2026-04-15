import * as THREE from "three";

export function createVoidSeerModel() {
  const group = new THREE.Group();

  const shell = new THREE.MeshStandardMaterial({
    color: 0x10132a,
    roughness: 0.3,
    metalness: 0.74,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0x7a5cff,
    emissive: 0x7a5cff,
    emissiveIntensity: 1.05,
    roughness: 0.12,
    metalness: 0.9,
  });

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.7, 1.6, 8), shell);
  body.position.set(0, 0.92, 0);
  group.add(body);

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 12), glow);
  core.position.set(0, 1.12, 0.1);
  group.add(core);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.06, 10, 24), glow);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(0, 0.9, 0);
  group.add(ring);

  const shardGeometry = new THREE.ConeGeometry(0.1, 0.38, 6);
  const shards = [];
  for (let i = 0; i < 3; i += 1) {
    const shard = new THREE.Mesh(shardGeometry, glow);
    const angle = (i / 3) * Math.PI * 2;
    shard.position.set(Math.cos(angle) * 0.82, 1.2, Math.sin(angle) * 0.82);
    shard.rotation.z = Math.PI / 2;
    group.add(shard);
    shards.push(shard);
  }

  group.userData.core = core;
  group.userData.ring = ring;
  group.userData.shards = shards;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
