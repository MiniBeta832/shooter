import * as THREE from "three";

export function createCryocasterModel() {
  const group = new THREE.Group();

  const frame = new THREE.MeshStandardMaterial({
    color: 0x101a2a,
    roughness: 0.38,
    metalness: 0.72,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0x8df9ff,
    emissive: 0x8df9ff,
    emissiveIntensity: 0.9,
    roughness: 0.12,
    metalness: 0.92,
  });

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.46, 14, 14), glow);
  core.position.set(0, 1.1, 0);
  group.add(core);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.86, 0.08, 10, 24),
    frame,
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.set(0, 1.0, 0);
  group.add(ring);

  const shardGeometry = new THREE.ConeGeometry(0.18, 0.7, 6);
  const shards = [];
  for (let i = 0; i < 3; i += 1) {
    const shard = new THREE.Mesh(shardGeometry, glow);
    shard.position.set(0, 0.6 + i * 0.5, 0);
    shard.rotation.x = Math.PI;
    shard.rotation.y = (i / 3) * Math.PI * 2;
    group.add(shard);
    shards.push(shard);
  }

  group.userData.ring = ring;
  group.userData.shards = shards;
  group.userData.core = core;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
