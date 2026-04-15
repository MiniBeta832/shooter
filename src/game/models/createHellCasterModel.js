import * as THREE from "three";

export function createHellCasterModel() {
  const group = new THREE.Group();

  const shell = new THREE.MeshStandardMaterial({
    color: 0x1a0f12,
    roughness: 0.3,
    metalness: 0.72,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0xff8a3d,
    emissive: 0xff6b2f,
    emissiveIntensity: 1.15,
    roughness: 0.1,
    metalness: 0.88,
  });

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.7, 1.7, 8), shell);
  body.position.set(0, 0.94, 0);
  group.add(body);

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), glow);
  core.position.set(0, 1.16, 0.08);
  group.add(core);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.06, 10, 24), glow);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(0, 0.98, 0);
  group.add(ring);

  const shardGeometry = new THREE.ConeGeometry(0.1, 0.4, 6);
  const shards = [];
  for (let i = 0; i < 3; i += 1) {
    const shard = new THREE.Mesh(shardGeometry, glow);
    const angle = (i / 3) * Math.PI * 2;
    shard.position.set(Math.cos(angle) * 0.86, 1.28, Math.sin(angle) * 0.86);
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
