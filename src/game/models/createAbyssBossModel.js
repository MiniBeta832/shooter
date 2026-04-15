import * as THREE from "three";

export function createAbyssBossModel() {
  const group = new THREE.Group();

  const shell = new THREE.MeshStandardMaterial({
    color: 0x171126,
    roughness: 0.24,
    metalness: 0.88,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0x9f86ff,
    emissive: 0x9f86ff,
    emissiveIntensity: 0.96,
    roughness: 0.08,
    metalness: 0.94,
  });

  const heart = new THREE.Mesh(new THREE.IcosahedronGeometry(1.18, 0), glow);
  heart.position.y = 2.68;
  group.add(heart);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(2.78, 0.18, 16, 42),
    glow,
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 2.62;
  group.add(halo);

  const crown = new THREE.Mesh(
    new THREE.TorusGeometry(1.74, 0.1, 12, 30),
    shell,
  );
  crown.rotation.z = Math.PI / 2;
  crown.position.y = 3.14;
  group.add(crown);

  const shellRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.1, 0.12, 12, 30),
    shell,
  );
  shellRing.rotation.y = Math.PI / 2;
  shellRing.position.y = 2.58;
  group.add(shellRing);

  const tendrils = [];
  for (const angle of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) {
    const tendril = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.18, 2.6, 8),
      shell,
    );
    tendril.position.set(Math.cos(angle) * 1.84, 1.3, Math.sin(angle) * 1.84);
    tendril.rotation.z = Math.cos(angle) * 0.58;
    tendril.rotation.x = Math.sin(angle) * 0.58;
    group.add(tendril);
    tendrils.push(tendril);
  }

  const shardOffsets = [
    new THREE.Vector3(-1.52, 3.68, 0),
    new THREE.Vector3(1.52, 3.68, 0),
    new THREE.Vector3(0, 4.16, 1.46),
    new THREE.Vector3(0, 4.16, -1.46),
  ];
  const shards = [];
  for (const offset of shardOffsets) {
    const shard = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.42, 0),
      glow,
    );
    shard.position.copy(offset);
    shard.scale.set(0.9, 1.6, 0.9);
    group.add(shard);
    shards.push(shard);
  }

  group.userData.heart = heart;
  group.userData.halo = halo;
  group.userData.crown = crown;
  group.userData.shellRing = shellRing;
  group.userData.tendrils = tendrils;
  group.userData.shards = shards;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
