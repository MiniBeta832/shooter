import * as THREE from "three";
import { createBehemothBossModel } from "./models/createBehemothBossModel.js";
import { createAbyssBossModel } from "./models/createAbyssBossModel.js";
import { createBossModel } from "./models/createBossModel.js";
import { createBruteModel } from "./models/createBruteModel.js";
import { createCryocasterModel } from "./models/createCryocasterModel.js";
import { createHarbingerBossModel } from "./models/createHarbingerBossModel.js";
import { createHexcasterModel } from "./models/createHexcasterModel.js";
import { createLancerModel } from "./models/createLancerModel.js";
import { createEmberHoundModel } from "./models/createEmberHoundModel.js";
import { createFrostlingModel } from "./models/createFrostlingModel.js";
import { createHellCasterModel } from "./models/createHellCasterModel.js";
import { createHellFiendModel } from "./models/createHellFiendModel.js";
import { createNeonCasterModel } from "./models/createNeonCasterModel.js";
import { createNeonRunnerModel } from "./models/createNeonRunnerModel.js";
import { createRadStalkerModel } from "./models/createRadStalkerModel.js";
import { createRiftStalkerModel } from "./models/createRiftStalkerModel.js";
import { createScoutModel } from "./models/createScoutModel.js";
import { createSentinelBossModel } from "./models/createSentinelBossModel.js";
import { createShopNpcModel } from "./models/createShopNpcModel.js";
import { createSlagGunnerModel } from "./models/createSlagGunnerModel.js";
import { createSpecterModel } from "./models/createSpecterModel.js";
import { createSporeBruiserModel } from "./models/createSporeBruiserModel.js";
import { createSwarmModel } from "./models/createSwarmModel.js";
import { createVoidReaverModel } from "./models/createVoidReaverModel.js";
import { createVoidSeerModel } from "./models/createVoidSeerModel.js";
import { createVortexBossModel } from "./models/createVortexBossModel.js";
import { createWardenModel } from "./models/createWardenModel.js";
import { createWeaponModel } from "./models/createWeaponModel.js";

const ARENA_RADIUS = 32;
const PLAYER_HEIGHT = 1.72;
const PLAYER_RADIUS = 0.82;
const PLAYER_BASE_MAX_HEALTH = 100;
const PLAYER_BASE_SPEED = 13.5;
const PLAYER_BASE_DAMAGE = 28;
const PLAYER_BASE_SHOT_COOLDOWN = 0.12;
const PLAYER_JUMP_FORCE = 8.2;
const PLAYER_GRAVITY = 24;
const PLAYER_PROJECTILE_SPEED = 58;
const PLAYER_PROJECTILE_RADIUS = 0.13;
const PLAYER_PROJECTILE_LIFETIME = 1.15;
const PLAYER_PROJECTILE_COLOR = 0x8df9ff;
const MAX_SHOT_DISTANCE = 52;
const MAX_PROJECTILES = 240;
const ALLY_MAX_DISTANCE = 34;
const ALLY_BASE_MAX_HEALTH = 180;
const MAX_EQUIPPED_ALLIES = 5;
const MOBILE_JOYSTICK_RADIUS = 52;
const MOBILE_LOOK_SENSITIVITY = 0.0032;
const ENEMY_CONTACT_DAMAGE = 11;
const SETTINGS_STORAGE_KEY = "bot-breaker-3d-settings";
const DEV_ACCESS_STORAGE_KEY = "bot-breaker-3d-dev-access";
const BOSS_WAVE = 10;
const SHOP_REST_DURATION = 16;
const MAP_SHIFT_CYCLE = 5;
const SHOP_SKIP_LIMIT = 4;
const SHOP_SKIP_COST = 18;
const SHOP_OFFER_SLOTS = 4;
const PICKUP_LIFETIME = 18;
const PROJECTILE_AXIS = new THREE.Vector3(0, 1, 0);
const WORLD_UP = new THREE.Vector3(0, 1, 0);
const CYCLE_HOLE_RADIUS = 3.2;
const CYCLE_HOLE_DEPTH = 22;
const CYCLE_OPEN_DURATION = 0.85;
const CYCLE_DESCEND_DURATION = 1.55;
const CYCLE_CLOSE_DURATION = 0.8;
const PORTAL_SENTINEL_RISE_DURATION = 1.1;
const PORTAL_SENTINEL_GRAB_DURATION = 0.9;
const PORTAL_SENTINEL_THROW_DURATION = 0.88;
const PORTAL_OPEN_DURATION = 1.05;
const PORTAL_BLACKOUT_DURATION = 1.15;
const PORTAL_WAKE_DURATION = 1.1;
const BOSS_SHIELD_COLOR = 0x8df9ff;
const WORLD_ACT_LENGTH = 4;
const FINAL_CUTSCENE_LINES = [
  "...",
  "pense que caeria antes",
  "pero sigues de pie",
  "el vacio no perdona",
  "Null Sentinel Overheat se quiebra... y aun asi apunta",
  "carga un ataque final",
  "disparo seco: el mercader aparece",
  "la escopeta truena. el sentinel cae.",
];
const FINAL_CUTSCENE_DURATIONS = [1.2, 1.35, 1.35, 1.5, 1.8, 1.4, 1.4, 1.6];
const FINAL_STATIC_DURATION = 1.05;
const EPILOGUE_SIDE_LIMIT = 4.9;
const EPILOGUE_WHITEOUT_DURATION = 1.85;
const EPILOGUE_END_Z = -46;
const CREDITS_DURATION = 13.8;
const TRAILER_DURATION = 11.5;
const TRAILER_TITLE_START = 8.3;
const CREDITS_BOSS_STEP = 1.15;
const WAVE_REVEAL_TRIGGER_SECONDS = 26;
const WAVE_REVEAL_DURATION = 8;
const WAVE_REVEAL_MESSAGE_DURATION = 3.8;
const MERCHANT_DIALOGUE_DURATION = 3.4;
const CREDITS_BOSS_REEL = [
  { name: "Aegis Prime", colorA: "#7cf5ff", colorB: "#9f86ff" },
  { name: "Harbinger Fang", colorA: "#ff7a3d", colorB: "#ff5d7a" },
  { name: "Null Sentinel", colorA: "#8df9ff", colorB: "#7cf5ff" },
  { name: "Vortex Regent", colorA: "#25ffd7", colorB: "#7cff91" },
  { name: "Forge Warlord", colorA: "#ff7a3d", colorB: "#ffb347" },
  { name: "Glacier Sovereign", colorA: "#b9f7ff", colorB: "#8df9ff" },
  { name: "Neon Wraith", colorA: "#25ffd7", colorB: "#ffa41b" },
  { name: "Radlord Prime", colorA: "#8dff7a", colorB: "#2bff5a" },
  { name: "Void Archon", colorA: "#8a6cff", colorB: "#9f86ff" },
  { name: "Inferno Tyrant", colorA: "#ff6b2f", colorB: "#ffc14b" },
  { name: "Null Sentinel Overheat", colorA: "#ff6b2f", colorB: "#ff8a4a" },
];

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function getDeviceFingerprint() {
  if (typeof navigator === "undefined" || typeof screen === "undefined") {
    return "unknown";
  }

  const parts = [
    navigator.userAgent,
    navigator.platform,
    navigator.language,
    `${screen.width}x${screen.height}`,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ];
  return hashString(parts.join("|"));
}

function isGalaxyA32Device() {
  if (typeof navigator === "undefined") {
    return false;
  }
  const ua = navigator.userAgent ?? "";
  return /SM-A32|Galaxy A32|A32/i.test(ua);
}

function isMobileBrowserDevice() {
  if (typeof navigator === "undefined") {
    return false;
  }
  if (typeof navigator.userAgentData?.mobile === "boolean") {
    return navigator.userAgentData.mobile;
  }
  const ua = navigator.userAgent ?? "";
  return /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
}

const PLAYER_WEAPONS = {
  pistol: {
    label: "Pistola",
    cooldownMultiplier: 1,
    damageMultiplier: 1,
    projectileSpeedMultiplier: 1,
    spread: 0.02,
    pellets: 1,
    burst: 1,
    pierceBonus: 0,
    color: PLAYER_PROJECTILE_COLOR,
  },
  burst: {
    label: "Rafaga",
    cooldownMultiplier: 1.18,
    damageMultiplier: 0.62,
    projectileSpeedMultiplier: 1.06,
    spread: 0.03,
    pellets: 1,
    burst: 3,
    pierceBonus: 0,
    color: 0xffa84c,
  },
  shotgun: {
    label: "Escopeta",
    cooldownMultiplier: 1.45,
    damageMultiplier: 0.46,
    projectileSpeedMultiplier: 0.92,
    spread: 0.12,
    pellets: 5,
    burst: 1,
    pierceBonus: 0,
    color: 0xff6be6,
  },
  rail: {
    label: "Rail",
    cooldownMultiplier: 1.85,
    damageMultiplier: 2.25,
    projectileSpeedMultiplier: 1.45,
    spread: 0.008,
    pellets: 1,
    burst: 1,
    pierceBonus: 2,
    color: 0x7a9cff,
  },
  smg: {
    label: "SMG Vector",
    cooldownMultiplier: 0.58,
    damageMultiplier: 0.48,
    projectileSpeedMultiplier: 0.98,
    spread: 0.05,
    pellets: 1,
    burst: 1,
    pierceBonus: 0,
    color: 0x66ffd7,
  },
  plasma: {
    label: "Plasma Duo",
    cooldownMultiplier: 1.18,
    damageMultiplier: 0.86,
    projectileSpeedMultiplier: 0.92,
    spread: 0.05,
    pellets: 2,
    burst: 1,
    pierceBonus: 0,
    color: 0xa77dff,
  },
};

const ALLY_DEFS = {
  "scout-drone": {
    label: "Scout Drone",
    labelEn: "Scout Drone",
    unlockCost: 12,
    color: 0x8df9ff,
    maxHealth: ALLY_BASE_MAX_HEALTH,
    damage: 14,
    fireCooldown: 0.18,
    projectileSpeed: 50,
    fireRange: 30,
    preferredDistance: 3.8,
    moveSpeed: 8.4,
    hitRadius: 1.08,
  },
  "guard-drone": {
    label: "Guard Drone",
    labelEn: "Guard Drone",
    unlockCost: 18,
    color: 0x7cff91,
    maxHealth: ALLY_BASE_MAX_HEALTH + 40,
    damage: 16,
    fireCooldown: 0.26,
    projectileSpeed: 48,
    fireRange: 31,
    preferredDistance: 4.4,
    moveSpeed: 8.9,
    hitRadius: 1.12,
  },
  "medic-drone": {
    label: "Medic Drone",
    labelEn: "Medic Drone",
    unlockCost: 26,
    color: 0x8fb5ff,
    maxHealth: ALLY_BASE_MAX_HEALTH + 10,
    damage: 12,
    fireCooldown: 0.22,
    projectileSpeed: 47,
    fireRange: 29,
    preferredDistance: 4.9,
    moveSpeed: 8.1,
    hitRadius: 1.05,
  },
};

const DIFFICULTY_PRESETS = {
  easy: {
    label: "Facil",
    description: "Menos bots activos, spawns mas lentos y loot defensivo mas frecuente.",
    initialSpawnDelay: 1.25,
    spawnIntervalMin: 0.95,
    spawnIntervalMax: 1.45,
    totalEnemyBase: 3,
    totalEnemyGrowth: 0.9,
    simultaneousBase: 2,
    simultaneousGrowth: 0.2,
    maxSimultaneous: 4,
    pickupInterval: 10,
  },
  normal: {
    label: "Normal",
    description: "Balanceado para la experiencia base del shooter.",
    initialSpawnDelay: 0.9,
    spawnIntervalMin: 0.62,
    spawnIntervalMax: 1.08,
    totalEnemyBase: 4,
    totalEnemyGrowth: 1,
    simultaneousBase: 3,
    simultaneousGrowth: 0.26,
    maxSimultaneous: 6,
    pickupInterval: 13,
  },
  hard: {
    label: "Dificil",
    description: "Mas spawns, menos descanso y mucha mas presion en la arena.",
    initialSpawnDelay: 0.55,
    spawnIntervalMin: 0.38,
    spawnIntervalMax: 0.8,
    totalEnemyBase: 5,
    totalEnemyGrowth: 1.15,
    simultaneousBase: 4,
    simultaneousGrowth: 0.34,
    maxSimultaneous: 8,
    pickupInterval: 16,
  },
};

const WORLD_ORDER = [
  "arena",
  "rift",
  "forge",
  "vault",
  "neon",
  "biograve",
  "citadel",
  "helltrack",
];

const WORLD_DEFS = {
  arena: {
    label: "The Scrapyard",
    menuLabel: "Mundo 1",
    startCycle: 1,
    description: "La run base con el roster inicial y el primer boss de rotacion.",
    unlockHint: "Disponible desde el inicio.",
  },
  rift: {
    label: "Sector Rift",
    menuLabel: "Mundo 2",
    startCycle: MAP_SHIFT_CYCLE,
    description: "Arrancas en el acto 2 con enemigos del vacio y bosses mas pesados.",
    unlockHint: `Cruza el portal del ciclo ${MAP_SHIFT_CYCLE} para desbloquearlo.`,
  },
  forge: {
    label: "Ashen Forge",
    menuLabel: "Mundo 3",
    startCycle: MAP_SHIFT_CYCLE + WORLD_ACT_LENGTH,
    description: "Forjas vivas, brasas industriales y oleadas mas brutales.",
    unlockHint: `Sobrevive hasta el ciclo ${MAP_SHIFT_CYCLE + WORLD_ACT_LENGTH} para desbloquearlo.`,
  },
  vault: {
    label: "Frozen Vault",
    menuLabel: "Mundo 4",
    startCycle: MAP_SHIFT_CYCLE + WORLD_ACT_LENGTH * 2,
    description: "Una camara helada donde los bots disparan con precision fria.",
    unlockHint: `Llega al ciclo ${MAP_SHIFT_CYCLE + WORLD_ACT_LENGTH * 2} para desbloquearlo.`,
  },
  neon: {
    label: "Neon Wastes",
    menuLabel: "Mundo 5",
    startCycle: MAP_SHIFT_CYCLE + WORLD_ACT_LENGTH * 3,
    description: "Ruinas electricas con presion veloz y reflejos agresivos.",
    unlockHint: `Abre la ruta del ciclo ${MAP_SHIFT_CYCLE + WORLD_ACT_LENGTH * 3} para desbloquearlo.`,
  },
  biograve: {
    label: "Bio Grave",
    menuLabel: "Mundo 6",
    startCycle: MAP_SHIFT_CYCLE + WORLD_ACT_LENGTH * 4,
    description: "Pods organicos, toxina y una arena que parece viva.",
    unlockHint: `Supera Neon Wastes hasta el ciclo ${MAP_SHIFT_CYCLE + WORLD_ACT_LENGTH * 4}.`,
  },
  citadel: {
    label: "Void Citadel",
    menuLabel: "Mundo 7",
    startCycle: MAP_SHIFT_CYCLE + WORLD_ACT_LENGTH * 5,
    description: "Bastion del vacio con energia oscura y bosses elite.",
    unlockHint: `Resiste hasta el ciclo ${MAP_SHIFT_CYCLE + WORLD_ACT_LENGTH * 5} para desbloquearlo.`,
  },
  helltrack: {
    label: "Hell Track",
    menuLabel: "Mundo 8",
    startCycle: MAP_SHIFT_CYCLE + WORLD_ACT_LENGTH * 6,
    description: "La pista infernal final. Fuego, metal y el cierre definitivo de la run.",
    unlockHint: `Cruza Void Citadel y alcanza el ciclo ${MAP_SHIFT_CYCLE + WORLD_ACT_LENGTH * 6}.`,
  },
};

const FINAL_BOSS_CYCLE = WORLD_DEFS.helltrack.startCycle + WORLD_ACT_LENGTH - 1;
const FINAL_HELL_BOSS_HEALTH = 9000;
const FINAL_HELL_BOSS_SHIELD = 2000;

const ENEMY_DEFS = {
  scout: {
    label: "Scout",
    maxHealth: 35,
    score: 120,
    speed: 8,
    fireRange: 18,
    preferredMinRange: 8,
    preferredMaxRange: 15,
    shotCooldown: 1.05,
    projectileSpeed: 25,
    damage: 9,
    projectileRadius: 0.16,
    projectileColor: 0x5cf2ff,
    hitRadius: 1.05,
    baseHeight: 1.9,
    targetOffsetY: 0,
    muzzleOffsetY: 0.06,
    coinReward: 1,
  },
  brute: {
    label: "Brute",
    maxHealth: 95,
    score: 240,
    speed: 4.8,
    fireRange: 11,
    preferredMinRange: 4,
    preferredMaxRange: 9,
    shotCooldown: 1.7,
    projectileSpeed: 19,
    damage: 15,
    projectileRadius: 0.28,
    projectileColor: 0xff6b57,
    hitRadius: 1.55,
    baseHeight: 0.05,
    targetOffsetY: 1.6,
    muzzleOffsetY: 1.45,
    coinReward: 1,
  },
  specter: {
    label: "Specter",
    maxHealth: 54,
    score: 180,
    speed: 5.6,
    fireRange: 26,
    preferredMinRange: 16,
    preferredMaxRange: 22,
    shotCooldown: 2.2,
    projectileSpeed: 29,
    damage: 18,
    projectileRadius: 0.18,
    projectileColor: 0xffd166,
    hitRadius: 1.18,
    baseHeight: 0.18,
    targetOffsetY: 1.9,
    muzzleOffsetY: 2.08,
    coinReward: 1,
  },
  lancer: {
    label: "Lancer",
    maxHealth: 48,
    score: 170,
    speed: 7.2,
    fireRange: 23,
    preferredMinRange: 10,
    preferredMaxRange: 18,
    shotCooldown: 1.25,
    projectileSpeed: 31,
    damage: 12,
    projectileRadius: 0.16,
    projectileColor: 0x8df9ff,
    hitRadius: 1.02,
    baseHeight: 1.3,
    targetOffsetY: 0.18,
    muzzleOffsetY: 0.16,
    coinReward: 1,
  },
  warden: {
    label: "Warden",
    maxHealth: 130,
    score: 280,
    speed: 3.9,
    fireRange: 20,
    preferredMinRange: 8,
    preferredMaxRange: 15,
    shotCooldown: 1.95,
    projectileSpeed: 22,
    damage: 13,
    projectileRadius: 0.2,
    projectileColor: 0xffd166,
    hitRadius: 1.62,
    baseHeight: 0.05,
    targetOffsetY: 1.4,
    muzzleOffsetY: 1.52,
    coinReward: 1,
  },
  swarm: {
    label: "Swarm",
    maxHealth: 22,
    score: 110,
    speed: 9.8,
    fireRange: 9,
    preferredMinRange: 2.4,
    preferredMaxRange: 6.2,
    shotCooldown: 0.95,
    projectileSpeed: 24,
    damage: 8,
    projectileRadius: 0.14,
    projectileColor: 0xff78d1,
    hitRadius: 0.88,
    baseHeight: 0.36,
    targetOffsetY: 0.05,
    muzzleOffsetY: 0.18,
    contactDamage: 7,
    coinReward: 1,
  },
  riftstalker: {
    label: "Rift Stalker",
    maxHealth: 62,
    score: 220,
    speed: 8.6,
    fireRange: 16,
    preferredMinRange: 3.4,
    preferredMaxRange: 8.4,
    shotCooldown: 1.08,
    projectileSpeed: 27,
    damage: 12,
    projectileRadius: 0.15,
    projectileColor: 0x7cff91,
    hitRadius: 1.08,
    baseHeight: 0.42,
    targetOffsetY: 0.46,
    muzzleOffsetY: 0.4,
    contactDamage: 10,
    coinReward: 1,
  },
  hexcaster: {
    label: "Hexcaster",
    maxHealth: 78,
    score: 265,
    speed: 4.7,
    fireRange: 31,
    preferredMinRange: 14,
    preferredMaxRange: 22,
    shotCooldown: 1.82,
    projectileSpeed: 30,
    damage: 16,
    projectileRadius: 0.18,
    projectileColor: 0x9f86ff,
    hitRadius: 1.22,
    baseHeight: 1.1,
    targetOffsetY: 1.74,
    muzzleOffsetY: 1.88,
    coinReward: 1,
  },
  emberhound: {
    label: "Ember Hound",
    maxHealth: 44,
    score: 165,
    speed: 9.4,
    fireRange: 16,
    preferredMinRange: 6,
    preferredMaxRange: 12,
    shotCooldown: 0.85,
    projectileSpeed: 28,
    damage: 9,
    projectileRadius: 0.15,
    projectileColor: 0xff7a3d,
    hitRadius: 1.02,
    baseHeight: 0.4,
    targetOffsetY: 1.05,
    muzzleOffsetY: 1.02,
    coinReward: 1,
  },
  slaggunner: {
    label: "Slag Gunner",
    maxHealth: 96,
    score: 240,
    speed: 4.5,
    fireRange: 24,
    preferredMinRange: 10,
    preferredMaxRange: 18,
    shotCooldown: 1.55,
    projectileSpeed: 22,
    damage: 14,
    projectileRadius: 0.2,
    projectileColor: 0xffb347,
    hitRadius: 1.28,
    baseHeight: 1.05,
    targetOffsetY: 1.78,
    muzzleOffsetY: 1.66,
    coinReward: 1,
  },
  frostling: {
    label: "Frostling",
    maxHealth: 52,
    score: 190,
    speed: 8.2,
    fireRange: 18,
    preferredMinRange: 7,
    preferredMaxRange: 13,
    shotCooldown: 1.05,
    projectileSpeed: 26,
    damage: 10,
    projectileRadius: 0.16,
    projectileColor: 0xb9f7ff,
    hitRadius: 1.06,
    baseHeight: 0.38,
    targetOffsetY: 1.12,
    muzzleOffsetY: 1.08,
    coinReward: 1,
  },
  cryocaster: {
    label: "Cryocaster",
    maxHealth: 92,
    score: 270,
    speed: 4.1,
    fireRange: 26,
    preferredMinRange: 12,
    preferredMaxRange: 20,
    shotCooldown: 1.7,
    projectileSpeed: 24,
    damage: 15,
    projectileRadius: 0.2,
    projectileColor: 0x8df9ff,
    hitRadius: 1.26,
    baseHeight: 1.06,
    targetOffsetY: 1.86,
    muzzleOffsetY: 1.72,
    coinReward: 1,
  },
  neonrunner: {
    label: "Neon Runner",
    maxHealth: 58,
    score: 205,
    speed: 9.2,
    fireRange: 18,
    preferredMinRange: 6,
    preferredMaxRange: 12,
    shotCooldown: 0.95,
    projectileSpeed: 28,
    damage: 11,
    projectileRadius: 0.16,
    projectileColor: 0x25ffd7,
    hitRadius: 1.04,
    baseHeight: 0.36,
    targetOffsetY: 1.08,
    muzzleOffsetY: 1.04,
    coinReward: 1,
  },
  neoncaster: {
    label: "Neon Caster",
    maxHealth: 98,
    score: 290,
    speed: 4.3,
    fireRange: 26,
    preferredMinRange: 12,
    preferredMaxRange: 20,
    shotCooldown: 1.65,
    projectileSpeed: 24,
    damage: 15,
    projectileRadius: 0.2,
    projectileColor: 0xffa41b,
    hitRadius: 1.28,
    baseHeight: 1.04,
    targetOffsetY: 1.84,
    muzzleOffsetY: 1.7,
    coinReward: 1,
  },
  radstalker: {
    label: "Rad Stalker",
    maxHealth: 60,
    score: 210,
    speed: 8.4,
    fireRange: 18,
    preferredMinRange: 7,
    preferredMaxRange: 13,
    shotCooldown: 1.05,
    projectileSpeed: 26,
    damage: 11,
    projectileRadius: 0.16,
    projectileColor: 0x8dff7a,
    hitRadius: 1.08,
    baseHeight: 0.38,
    targetOffsetY: 1.1,
    muzzleOffsetY: 1.06,
    coinReward: 1,
  },
  sporebruiser: {
    label: "Spore Bruiser",
    maxHealth: 120,
    score: 310,
    speed: 3.8,
    fireRange: 22,
    preferredMinRange: 9,
    preferredMaxRange: 16,
    shotCooldown: 1.6,
    projectileSpeed: 22,
    damage: 16,
    projectileRadius: 0.22,
    projectileColor: 0x77c75a,
    hitRadius: 1.34,
    baseHeight: 1.12,
    targetOffsetY: 1.9,
    muzzleOffsetY: 1.76,
    coinReward: 1,
  },
  hellfiend: {
    label: "Hell Fiend",
    maxHealth: 78,
    score: 240,
    speed: 9.2,
    fireRange: 17,
    preferredMinRange: 6,
    preferredMaxRange: 12,
    shotCooldown: 1,
    projectileSpeed: 29,
    damage: 13,
    projectileRadius: 0.18,
    projectileColor: 0xff6b2f,
    hitRadius: 1.06,
    baseHeight: 0.36,
    targetOffsetY: 0.9,
    muzzleOffsetY: 0.98,
    contactDamage: 11,
    coinReward: 1,
  },
  hellcaster: {
    label: "Hell Caster",
    maxHealth: 120,
    score: 320,
    speed: 4.6,
    fireRange: 28,
    preferredMinRange: 12,
    preferredMaxRange: 20,
    shotCooldown: 1.65,
    projectileSpeed: 26,
    damage: 17,
    projectileRadius: 0.21,
    projectileColor: 0xff8a3d,
    hitRadius: 1.34,
    baseHeight: 0.52,
    targetOffsetY: 1.64,
    muzzleOffsetY: 1.72,
    coinReward: 1,
  },
  voidreaver: {
    label: "Void Reaver",
    maxHealth: 72,
    score: 230,
    speed: 8.8,
    fireRange: 16,
    preferredMinRange: 5,
    preferredMaxRange: 11,
    shotCooldown: 1.1,
    projectileSpeed: 28,
    damage: 12,
    projectileRadius: 0.17,
    projectileColor: 0x8a6cff,
    hitRadius: 1.04,
    baseHeight: 0.34,
    targetOffsetY: 0.9,
    muzzleOffsetY: 0.98,
    contactDamage: 10,
    coinReward: 1,
  },
  voidseer: {
    label: "Void Seer",
    maxHealth: 110,
    score: 300,
    speed: 4.4,
    fireRange: 28,
    preferredMinRange: 12,
    preferredMaxRange: 20,
    shotCooldown: 1.7,
    projectileSpeed: 26,
    damage: 16,
    projectileRadius: 0.2,
    projectileColor: 0x7a5cff,
    hitRadius: 1.32,
    baseHeight: 0.5,
    targetOffsetY: 1.6,
    muzzleOffsetY: 1.68,
    coinReward: 1,
  },
};

const ENEMY_MODEL_FACTORIES = {
  scout: createScoutModel,
  brute: createBruteModel,
  specter: createSpecterModel,
  lancer: createLancerModel,
  warden: createWardenModel,
  swarm: createSwarmModel,
  riftstalker: createRiftStalkerModel,
  hexcaster: createHexcasterModel,
  emberhound: createEmberHoundModel,
  slaggunner: createSlagGunnerModel,
  frostling: createFrostlingModel,
  cryocaster: createCryocasterModel,
  neonrunner: createNeonRunnerModel,
  neoncaster: createNeonCasterModel,
  radstalker: createRadStalkerModel,
  sporebruiser: createSporeBruiserModel,
  hellfiend: createHellFiendModel,
  hellcaster: createHellCasterModel,
  voidreaver: createVoidReaverModel,
  voidseer: createVoidSeerModel,
};

const BOSS_DEFS = {
  aegis: {
    label: "Aegis Prime",
    maxHealth: 520,
    score: 1800,
    speed: 3.4,
    fireRange: 28,
    preferredMinRange: 10,
    preferredMaxRange: 18,
    shotCooldown: 2.8,
    projectileSpeed: 26,
    damage: 16,
    projectileRadius: 0.24,
    projectileColor: 0xff8c42,
    hitRadius: 2.7,
    baseHeight: 0.48,
    targetOffsetY: 2.4,
    muzzleOffsetY: 2.35,
    contactDamage: 19,
    coinReward: 1,
    attackPattern: "burst",
    movementStyle: "duelist",
    meleeRange: 3.2,
  },
  harbinger: {
    label: "Harbinger Fang",
    maxHealth: 470,
    score: 1900,
    speed: 4.7,
    fireRange: 20,
    preferredMinRange: 5.6,
    preferredMaxRange: 10.8,
    shotCooldown: 2.2,
    projectileSpeed: 27,
    damage: 15,
    projectileRadius: 0.22,
    projectileColor: 0xff5d7a,
    hitRadius: 2.45,
    baseHeight: 0.38,
    targetOffsetY: 2.08,
    muzzleOffsetY: 2.06,
    contactDamage: 24,
    coinReward: 1,
    attackPattern: "shotgun",
    movementStyle: "hunter",
    meleeRange: 3.6,
  },
  sentinel: {
    label: "Null Sentinel",
    maxHealth: 560,
    score: 1980,
    speed: 3.2,
    fireRange: 34,
    preferredMinRange: 15,
    preferredMaxRange: 23,
    shotCooldown: 2.45,
    projectileSpeed: 32,
    damage: 17,
    projectileRadius: 0.18,
    projectileColor: 0x7cf5ff,
    hitRadius: 2.5,
    baseHeight: 1.18,
    targetOffsetY: 2.9,
    muzzleOffsetY: 2.7,
    contactDamage: 16,
    coinReward: 1,
    attackPattern: "fan",
    movementStyle: "sentinel",
    meleeRange: 2.8,
  },
  vortex: {
    label: "Vortex Regent",
    maxHealth: 510,
    score: 2080,
    speed: 5.2,
    fireRange: 30,
    preferredMinRange: 11,
    preferredMaxRange: 17,
    shotCooldown: 2,
    projectileSpeed: 31,
    damage: 14,
    projectileRadius: 0.19,
    projectileColor: 0x7cff91,
    hitRadius: 2.38,
    baseHeight: 1.08,
    targetOffsetY: 2.48,
    muzzleOffsetY: 2.36,
    contactDamage: 20,
    coinReward: 1,
    attackPattern: "twin",
    movementStyle: "orbiter",
    meleeRange: 3,
  },
  behemoth: {
    label: "Siege Behemoth",
    maxHealth: 690,
    score: 2300,
    speed: 2.7,
    fireRange: 26,
    preferredMinRange: 8,
    preferredMaxRange: 14,
    shotCooldown: 3.4,
    projectileSpeed: 23,
    damage: 21,
    projectileRadius: 0.3,
    projectileColor: 0xffd166,
    hitRadius: 3.05,
    baseHeight: 0.18,
    targetOffsetY: 2.2,
    muzzleOffsetY: 2.32,
    contactDamage: 28,
    coinReward: 1,
    attackPattern: "artillery",
    movementStyle: "juggernaut",
    meleeRange: 3.8,
  },
  forgewarlord: {
    label: "Forge Warlord",
    maxHealth: 640,
    score: 2350,
    speed: 4.1,
    fireRange: 26,
    preferredMinRange: 7,
    preferredMaxRange: 13,
    shotCooldown: 2.05,
    projectileSpeed: 29,
    damage: 17,
    projectileRadius: 0.22,
    projectileColor: 0xff7a3d,
    hitRadius: 2.55,
    baseHeight: 0.42,
    targetOffsetY: 2.18,
    muzzleOffsetY: 2.06,
    contactDamage: 26,
    coinReward: 2,
    attackPattern: "shotgun",
    movementStyle: "hunter",
    meleeRange: 3.6,
  },
  glacier: {
    label: "Glacier Sovereign",
    maxHealth: 720,
    score: 2600,
    speed: 4.6,
    fireRange: 30,
    preferredMinRange: 12,
    preferredMaxRange: 18,
    shotCooldown: 2.1,
    projectileSpeed: 28,
    damage: 18,
    projectileRadius: 0.22,
    projectileColor: 0xb9f7ff,
    hitRadius: 2.6,
    baseHeight: 0.46,
    targetOffsetY: 2.42,
    muzzleOffsetY: 2.26,
    contactDamage: 22,
    coinReward: 2,
    attackPattern: "fan",
    movementStyle: "sentinel",
    meleeRange: 3.2,
  },
  neonwraith: {
    label: "Neon Wraith",
    maxHealth: 700,
    score: 2550,
    speed: 5.4,
    fireRange: 30,
    preferredMinRange: 10,
    preferredMaxRange: 17,
    shotCooldown: 1.95,
    projectileSpeed: 30,
    damage: 17,
    projectileRadius: 0.22,
    projectileColor: 0x25ffd7,
    hitRadius: 2.55,
    baseHeight: 0.44,
    targetOffsetY: 2.4,
    muzzleOffsetY: 2.2,
    contactDamage: 22,
    coinReward: 2,
    attackPattern: "twin",
    movementStyle: "orbiter",
    meleeRange: 3.2,
  },
  voidarchon: {
    label: "Void Archon",
    maxHealth: 820,
    score: 2900,
    speed: 4.6,
    fireRange: 34,
    preferredMinRange: 12,
    preferredMaxRange: 20,
    shotCooldown: 2.15,
    projectileSpeed: 30,
    damage: 19,
    projectileRadius: 0.23,
    projectileColor: 0x8a6cff,
    hitRadius: 2.75,
    baseHeight: 0.54,
    targetOffsetY: 2.5,
    muzzleOffsetY: 2.32,
    contactDamage: 24,
    coinReward: 2,
    attackPattern: "portalstorm",
    movementStyle: "riftlord",
    meleeRange: 3.5,
  },
  infernotyrant: {
    label: "Inferno Tyrant",
    maxHealth: 900,
    score: 3200,
    speed: 4.2,
    fireRange: 32,
    preferredMinRange: 10,
    preferredMaxRange: 18,
    shotCooldown: 2.05,
    projectileSpeed: 32,
    damage: 22,
    projectileRadius: 0.26,
    projectileColor: 0xff6b2f,
    hitRadius: 2.9,
    baseHeight: 0.5,
    targetOffsetY: 2.6,
    muzzleOffsetY: 2.45,
    contactDamage: 28,
    coinReward: 3,
    attackPattern: "artillery",
    movementStyle: "juggernaut",
    meleeRange: 3.9,
  },
  radlord: {
    label: "Radlord Prime",
    maxHealth: 760,
    score: 2750,
    speed: 4.4,
    fireRange: 28,
    preferredMinRange: 10,
    preferredMaxRange: 16,
    shotCooldown: 2.1,
    projectileSpeed: 28,
    damage: 18,
    projectileRadius: 0.23,
    projectileColor: 0x8dff7a,
    hitRadius: 2.7,
    baseHeight: 0.5,
    targetOffsetY: 2.46,
    muzzleOffsetY: 2.32,
    contactDamage: 24,
    coinReward: 2,
    attackPattern: "portalstorm",
    movementStyle: "riftlord",
    meleeRange: 3.4,
  },
  abyssal: {
    label: "Abyss Sovereign",
    maxHealth: 760,
    score: 2750,
    speed: 4.2,
    fireRange: 32,
    preferredMinRange: 9,
    preferredMaxRange: 16,
    shotCooldown: 2.3,
    projectileSpeed: 29,
    damage: 18,
    projectileRadius: 0.24,
    projectileColor: 0x9f86ff,
    hitRadius: 2.84,
    baseHeight: 0.94,
    targetOffsetY: 2.76,
    muzzleOffsetY: 2.62,
    contactDamage: 24,
    coinReward: 2,
    attackPattern: "portalstorm",
    movementStyle: "riftlord",
    meleeRange: 3.4,
  },
  sentinel_apex: {
    label: "Null Sentinel Overheat",
    maxHealth: FINAL_HELL_BOSS_HEALTH,
    score: 12500,
    speed: 4.9,
    fireRange: 38,
    preferredMinRange: 10,
    preferredMaxRange: 18,
    shotCooldown: 1.46,
    projectileSpeed: 35,
    damage: 28,
    projectileRadius: 0.24,
    projectileColor: 0xff6b2f,
    hitRadius: 3.18,
    baseHeight: 1.28,
    targetOffsetY: 3.15,
    muzzleOffsetY: 2.98,
    contactDamage: 34,
    coinReward: 8,
    attackPattern: "apocalypse",
    movementStyle: "tyrant",
    meleeRange: 4.2,
    shieldOverride: FINAL_HELL_BOSS_SHIELD,
  },
};

const BOSS_MODEL_FACTORIES = {
  aegis: createBossModel,
  harbinger: createHarbingerBossModel,
  sentinel: createSentinelBossModel,
  vortex: createVortexBossModel,
  behemoth: createBehemothBossModel,
  forgewarlord: createHarbingerBossModel,
  glacier: createSentinelBossModel,
  neonwraith: createVortexBossModel,
  voidarchon: createAbyssBossModel,
  radlord: createAbyssBossModel,
  abyssal: createAbyssBossModel,
  infernotyrant: createBehemothBossModel,
  sentinel_apex: createSentinelBossModel,
};

const BOSS_ROTATION = ["aegis", "harbinger", "sentinel", "vortex", "abyssal", "behemoth"];
const WORLD_BOSS_POOLS = {
  arena: ["aegis", "harbinger", "sentinel", "vortex"],
  rift: ["abyssal", "behemoth", "sentinel", "harbinger"],
  forge: ["forgewarlord", "behemoth", "abyssal"],
  vault: ["glacier"],
  neon: ["neonwraith"],
  biograve: ["radlord", "abyssal", "behemoth"],
  citadel: ["voidarchon", "abyssal"],
  helltrack: ["infernotyrant", "behemoth"],
};

const SHOP_UPGRADES = {
  damage: {
    label: "Overclock de dano",
    description: "+6 de dano por disparo.",
    baseCost: 8,
    costStep: 4,
    maxLevel: 5,
    category: "core",
  },
  fireRate: {
    label: "Servo de cadencia",
    description: "Disparas mas rapido.",
    baseCost: 10,
    costStep: 5,
    maxLevel: 4,
    category: "core",
  },
  maxShield: {
    label: "Capacidad de escudo",
    description: "+20 al maximo de escudo y recuperas parte al comprarlo.",
    baseCost: 7,
    costStep: 4,
    maxLevel: 5,
    category: "core",
  },
  loot: {
    label: "Nucleo defensivo",
    description: "El loot de defensa cura mas y aparece antes.",
    baseCost: 6,
    costStep: 4,
    maxLevel: 5,
    category: "core",
  },
  projectileSpeed: {
    label: "Bobina aceleradora",
    description: "+15% velocidad de proyectil por nivel.",
    baseCost: 7,
    costStep: 5,
    maxLevel: 4,
    category: "core",
  },
  pierce: {
    label: "Nucleo perforante",
    description: "Tus disparos atraviesan +1 enemigo.",
    baseCost: 12,
    costStep: 6,
    maxLevel: 3,
    category: "core",
  },
  killShield: {
    label: "Recarga de escudo",
    description: "+2 de escudo por baja.",
    baseCost: 8,
    costStep: 5,
    maxLevel: 4,
    category: "core",
  },
  damageResist: {
    label: "Resistencia a dano",
    description: "Recibes menos dano al ser atacado.",
    baseCost: 9,
    costStep: 5,
    maxLevel: 5,
    category: "core",
  },
  hitShield: {
    label: "Reactor vampirico",
    description: "Recuperas escudo cada vez que impactas un disparo.",
    baseCost: 10,
    costStep: 5,
    maxLevel: 4,
    category: "core",
  },
  mobility: {
    label: "Servos de movilidad",
    description: "Aumenta tu velocidad de movimiento.",
    baseCost: 8,
    costStep: 4,
    maxLevel: 4,
    category: "core",
  },
  weaponBurst: {
    label: "Modulo de rafaga",
    description: "Equipa una rafaga de 3 tiros rapidos.",
    baseCost: 16,
    costStep: 0,
    maxLevel: 1,
    category: "weapon",
    weaponMode: "burst",
  },
  weaponShotgun: {
    label: "Canon escopeta",
    description: "Equipa una escopeta de 5 perdigones.",
    baseCost: 18,
    costStep: 0,
    maxLevel: 1,
    category: "weapon",
    weaponMode: "shotgun",
  },
  weaponRail: {
    label: "Rail compacto",
    description: "Disparo lento, dano brutal y perfora.",
    baseCost: 20,
    costStep: 0,
    maxLevel: 1,
    category: "weapon",
    weaponMode: "rail",
  },
  weaponSMG: {
    label: "SMG Vector",
    description: "Cadencia brutal, recoil alto y dano por bala bajo.",
    baseCost: 19,
    costStep: 0,
    maxLevel: 1,
    category: "weapon",
    weaponMode: "smg",
  },
  weaponPlasma: {
    label: "Plasma Duo",
    description: "Dispara doble proyectil de plasma con spread controlado.",
    baseCost: 21,
    costStep: 0,
    maxLevel: 1,
    category: "weapon",
    weaponMode: "plasma",
  },
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randRange(min, max) {
  return min + Math.random() * (max - min);
}

function shuffleInPlace(list) {
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function smoothstep01(value) {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

function getMapIdForCycle(cycleCount) {
  const safeCycle = Math.max(1, cycleCount);
  let activeWorldId = WORLD_ORDER[0];

  for (const worldId of WORLD_ORDER) {
    if (safeCycle >= WORLD_DEFS[worldId].startCycle) {
      activeWorldId = worldId;
    } else {
      break;
    }
  }

  return activeWorldId;
}

function pickWeightedEnemy(elapsed, wave, cycleCount) {
  const weights = new Map([
    ["scout", 6],
    ["brute", elapsed > 16 || wave > 2 ? 4 : 1],
    ["specter", elapsed > 24 || wave > 4 ? 3 : 1],
  ]);
  const boost = (type, value) => {
    if (!weights.has(type)) {
      return;
    }
    weights.set(type, Math.max(1, (weights.get(type) ?? 1) + value));
  };

  if (cycleCount >= 2) {
    weights.set("lancer", elapsed > 10 || wave > 1 ? 4 : 1);
  }

  if (cycleCount >= 3) {
    weights.set("warden", elapsed > 18 || wave > 3 ? 3 : 1);
  }

  if (cycleCount >= 4) {
    weights.set("swarm", elapsed > 8 || wave > 0 ? 5 : 2);
  }

  if (cycleCount >= 5) {
    weights.set("riftstalker", elapsed > 10 || wave > 1 ? 5 : 2);
    weights.set("hexcaster", elapsed > 18 || wave > 2 ? 4 : 1);
  }

  const worldId = getMapIdForCycle(cycleCount);
  if (worldId === "forge") {
    weights.set("emberhound", elapsed > 6 || wave > 0 ? 6 : 3);
    weights.set("slaggunner", elapsed > 12 || wave > 2 ? 3 : 1);
    boost("brute", 3);
    boost("warden", 4);
    boost("swarm", 2);
  } else if (worldId === "vault") {
    weights.set("frostling", elapsed > 6 || wave > 0 ? 6 : 3);
    weights.set("cryocaster", elapsed > 14 || wave > 2 ? 3 : 1);
    boost("specter", 3);
    boost("lancer", 3);
    boost("hexcaster", 2);
  } else if (worldId === "neon") {
    weights.set("neonrunner", elapsed > 6 || wave > 0 ? 6 : 3);
    weights.set("neoncaster", elapsed > 14 || wave > 2 ? 3 : 1);
    boost("scout", 2);
    boost("lancer", 4);
    boost("swarm", 4);
  } else if (worldId === "biograve") {
    weights.set("radstalker", elapsed > 6 || wave > 0 ? 6 : 3);
    weights.set("sporebruiser", elapsed > 14 || wave > 2 ? 3 : 1);
    boost("brute", 2);
    boost("swarm", 3);
    boost("riftstalker", 4);
    boost("hexcaster", 2);
  } else if (worldId === "citadel") {
    weights.set("voidreaver", elapsed > 6 || wave > 0 ? 6 : 3);
    weights.set("voidseer", elapsed > 14 || wave > 2 ? 3 : 1);
    boost("riftstalker", 4);
    boost("hexcaster", 4);
    boost("specter", 2);
  } else if (worldId === "helltrack") {
    weights.set("hellfiend", elapsed > 6 || wave > 0 ? 6 : 3);
    weights.set("hellcaster", elapsed > 14 || wave > 2 ? 3 : 1);
    boost("brute", 3);
    boost("warden", 4);
    boost("riftstalker", 3);
  }

  const pool = Array.from(weights.entries()).map(([type, weight]) => ({ type, weight }));

  const total = pool.reduce((sum, entry) => sum + entry.weight, 0);
  let cursor = Math.random() * total;

  for (const entry of pool) {
    cursor -= entry.weight;
    if (cursor <= 0) {
      return entry.type;
    }
  }

  return "scout";
}

function getCycleUnlockText(cycleCount) {
  if (cycleCount === 2) {
    return "Nuevos enemigos desbloqueados: Lancer.";
  }

  if (cycleCount === 3) {
    return "Nuevos enemigos desbloqueados: Warden.";
  }

  if (cycleCount === 4) {
    return "Nuevos enemigos desbloqueados: Swarm.";
  }

  if (cycleCount === 5) {
    return "Nuevos enemigos desbloqueados: Rift Stalker y Hexcaster. El portal al mapa Rift se abrio.";
  }

  if (cycleCount === WORLD_DEFS.forge.startCycle) {
    return "Nuevo mundo desbloqueado: Ashen Forge. Enemigos nuevos: Ember Hound y Slag Gunner.";
  }

  if (cycleCount === WORLD_DEFS.vault.startCycle) {
    return "Nuevo mundo desbloqueado: Frozen Vault. Enemigos nuevos: Frostling y Cryocaster.";
  }

  if (cycleCount === WORLD_DEFS.neon.startCycle) {
    return "Nuevo mundo desbloqueado: Neon Wastes. Enemigos nuevos: Neon Runner y Neon Caster.";
  }

  if (cycleCount === WORLD_DEFS.biograve.startCycle) {
    return "Nuevo mundo desbloqueado: Bio Grave. Enemigos nuevos: Rad Stalker y Spore Bruiser.";
  }

  if (cycleCount === WORLD_DEFS.citadel.startCycle) {
    return "Nuevo mundo desbloqueado: Void Citadel. Enemigos nuevos: Void Reaver y Void Seer.";
  }

  const worldUnlockId = WORLD_ORDER.find((worldId) => {
    if (worldId === "arena" || worldId === "rift") {
      return false;
    }
    return WORLD_DEFS[worldId].startCycle === cycleCount;
  });

  if (worldUnlockId) {
    return `Nuevo mundo desbloqueado: ${WORLD_DEFS[worldUnlockId].label}. ${WORLD_DEFS[worldUnlockId].description}`;
  }

  if (cycleCount === FINAL_BOSS_CYCLE) {
    return "Ultimo ciclo de Hell Track: Null Sentinel Overheat desperto y quiere cerrar la run contigo adentro.";
  }

  if (cycleCount >= WORLD_DEFS.helltrack.startCycle) {
    return "Hell Track esta activo: fuego, metal y oleadas infernales.";
  }

  if (cycleCount >= WORLD_DEFS.citadel.startCycle) {
    return "Void Citadel esta activa: el vacio refuerza a los enemigos a distancia.";
  }

  if (cycleCount >= WORLD_DEFS.biograve.startCycle) {
    return "Bio Grave esta activo: la arena late y empuja una mezcla toxica de bots.";
  }

  if (cycleCount >= WORLD_DEFS.neon.startCycle) {
    return "Neon Wastes esta activo: los enemigos veloces ganan prioridad en las oleadas.";
  }

  if (cycleCount >= WORLD_DEFS.vault.startCycle) {
    return "Frozen Vault esta activo: precision fria y presion constante.";
  }

  if (cycleCount >= WORLD_DEFS.forge.startCycle) {
    return "Ashen Forge esta activo: llegan oleadas mas pesadas y agresivas.";
  }

  if (cycleCount > 4) {
    return `Todos los enemigos desbloqueados pueden aparecer. Zona activa: ${WORLD_DEFS[getMapIdForCycle(cycleCount)].label}.`;
  }

  return "Primer ciclo activo: Scout, Brute y Specter estan en la arena.";
}

function getBossTypeForCycle(cycleCount) {
  const safeCycle = Math.max(1, cycleCount);
  if (safeCycle === FINAL_BOSS_CYCLE) {
    return "sentinel_apex";
  }

  const worldId = getMapIdForCycle(safeCycle);
  const pool = WORLD_BOSS_POOLS[worldId] ?? BOSS_ROTATION;
  const cycleOffset = Math.max(0, safeCycle - (WORLD_DEFS[worldId]?.startCycle ?? 1));
  return pool[cycleOffset % pool.length];
}

function getBossPlanForCycle(cycleCount) {
  const safeCycle = Math.max(1, cycleCount);
  const cycleTier = safeCycle - 1;
  const type = getBossTypeForCycle(safeCycle);
  const base = BOSS_DEFS[type];

  if (type === "sentinel_apex") {
    return {
      type,
      cycle: safeCycle,
      cycleTier,
      base,
      def: {
        ...base,
        maxHealth: FINAL_HELL_BOSS_HEALTH,
        shieldOverride: FINAL_HELL_BOSS_SHIELD,
        displayLabel: `${base.label} | Final`,
      },
    };
  }

  const healthScale = 1 + cycleTier * 0.22;
  const damageScale = 1 + cycleTier * 0.16;
  const speedScale = 1 + Math.min(cycleTier * 0.035, 0.28);
  const cooldownScale = Math.max(0.58, 1 - cycleTier * 0.05);
  const projectileScale = 1 + Math.min(cycleTier * 0.045, 0.36);
  const impactScale = 1 + cycleTier * 0.14;
  const scoreScale = 1 + cycleTier * 0.14;
  const radiusScale = 1 + Math.min(cycleTier * 0.025, 0.18);

  return {
    type,
    cycle: safeCycle,
    cycleTier,
    base,
    def: {
      ...base,
      maxHealth: Math.round(base.maxHealth * healthScale),
      score: Math.round(base.score * scoreScale),
      speed: Number((base.speed * speedScale).toFixed(2)),
      shotCooldown: Number(Math.max(0.72, base.shotCooldown * cooldownScale).toFixed(2)),
      projectileSpeed: Number((base.projectileSpeed * projectileScale).toFixed(2)),
      damage: Math.round(base.damage * damageScale),
      projectileRadius: Number((base.projectileRadius * radiusScale).toFixed(2)),
      contactDamage: Math.round(base.contactDamage * impactScale),
      coinReward: (base.coinReward ?? 1) + Math.floor(cycleTier / 2),
      displayLabel: `${base.label} | Ciclo ${safeCycle}`,
    },
  };
}

function getCycleBossText(cycleCount) {
  const plan = getBossPlanForCycle(cycleCount);

  if (plan.type === "sentinel_apex") {
    return `Boss del ciclo: ${plan.base.label} con ${FINAL_HELL_BOSS_HEALTH} de vida y ${FINAL_HELL_BOSS_SHIELD} de escudo.`;
  }

  if (plan.cycleTier === 0) {
    return `Boss del ciclo: ${plan.base.label}.`;
  }

  const healthBoost = Math.round((plan.def.maxHealth / plan.base.maxHealth - 1) * 100);
  return `Boss del ciclo: ${plan.base.label}, reforzado con +${healthBoost}% de vida.`;
}

function getCyclePreviewText(cycleCount) {
  return `${getCycleUnlockText(cycleCount)} ${getCycleBossText(cycleCount)}`;
}

function raySphereIntersection(origin, direction, center, radius) {
  const offset = origin.clone().sub(center);
  const a = direction.dot(direction);
  const b = 2 * offset.dot(direction);
  const c = offset.dot(offset) - radius * radius;
  const discriminant = b * b - 4 * a * c;

  if (discriminant < 0) {
    return null;
  }

  const root = Math.sqrt(discriminant);
  const t0 = (-b - root) / (2 * a);
  const t1 = (-b + root) / (2 * a);

  if (t0 > 0) {
    return t0;
  }

  if (t1 > 0) {
    return t1;
  }

  return null;
}

function segmentSphereIntersection(start, end, center, radius) {
  const delta = end.clone().sub(start);
  const maxDistance = delta.length();

  if (maxDistance <= 0.0001) {
    return null;
  }

  const direction = delta.normalize();
  const distance = raySphereIntersection(start, direction, center, radius);

  if (distance === null || distance > maxDistance) {
    return null;
  }

  return distance;
}

export class Game {
  constructor(root) {
    this.root = root;
    this.clock = new THREE.Clock();
    this.mouseSensitivity = 0.0023;
    this.isTouchDevice = this.detectTouchDevice();
    this.isMobileBrowser = isMobileBrowserDevice();
    this.installPromptEvent = null;
    this.installPromptBound = false;
    this.installDismissed = false;
    this.isStandaloneApp =
      window.matchMedia?.("(display-mode: standalone)")?.matches ||
      window.navigator.standalone === true;
    this.settings = this.loadSettings();
    this.dev = {
      allowed: false,
      enabled: false,
      fingerprint: "",
    };
    this.raycaster = new THREE.Raycaster();
    this.screenPointer = new THREE.Vector2(-10, -10);
    this.shopPointer = {
      x: 0,
      y: 0,
      hoveredUpgrade: null,
      hoveringNpc: false,
      items: [],
      npc: null,
      group: null,
    };

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    root.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050816);
    this.scene.fog = new THREE.Fog(0x050816, 18, 72);

    this.camera = new THREE.PerspectiveCamera(
      72,
      window.innerWidth / window.innerHeight,
      0.1,
      140,
    );
    this.camera.rotation.order = "YXZ";

    this.enemyGroup = new THREE.Group();
    this.allyGroup = new THREE.Group();
    this.projectileGroup = new THREE.Group();
    this.effectGroup = new THREE.Group();
    this.pickupGroup = new THREE.Group();
    this.shopGroup = new THREE.Group();
    this.transitionGroup = new THREE.Group();
    this.epilogueGroup = new THREE.Group();
    this.cutsceneGroup = new THREE.Group();
    this.scene.add(
      this.enemyGroup,
      this.allyGroup,
      this.projectileGroup,
      this.effectGroup,
      this.pickupGroup,
      this.shopGroup,
      this.transitionGroup,
      this.epilogueGroup,
      this.cutsceneGroup,
    );

    this.enemies = [];
    this.allies = [];
    this.projectiles = [];
    this.effects = [];
    this.pickups = [];
    this.inputs = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      shoot: false,
    };
    this.mobileControls = {
      active: false,
      moveTouchId: null,
      lookTouchId: null,
      fireTouchId: null,
      joystickRadius: MOBILE_JOYSTICK_RADIUS,
      joystickCenter: new THREE.Vector2(),
      joystickVector: new THREE.Vector2(),
      lookLast: new THREE.Vector2(),
      lookSensitivity: MOBILE_LOOK_SENSITIVITY,
    };

    this.pointerLocked = false;
    this.gameStarted = false;
    this.gameOver = false;
    this.phase = "combat";
    this.elapsed = 0;
    this.wave = 0;
    this.cycleCount = 0;
    this.spawnTimer = 0;
    this.defenseLootTimer = 0;
    this.score = 0;
    this.kills = 0;
    this.coins = 0;
    this.wavePlan = null;
    this.currentBoss = null;
    this.bossPhaseSpawned = false;
    this.bossPhaseResolved = false;
    this.shop = {
      restTimer: 0,
      readyToResume: false,
      skipUses: 0,
      message: "Compra mejoras antes del siguiente ciclo.",
      offers: [],
    };
    this.finalCutscene = {
      active: false,
      timer: 0,
      lineIndex: 0,
      stage: "lines",
      sceneStarted: false,
      sceneShot: false,
    };
    this.epilogue = {
      active: false,
      endZ: EPILOGUE_END_Z,
      wallHit: false,
      whiteoutTimer: 0,
      cityBuildings: [],
      trailerPortals: [],
      trailerEnemies: [],
    };
    this.postgame = {
      creditsTimer: 0,
      trailerTimer: 0,
      creditsIndex: 0,
    };
    this.waveReveal = {
      waveStartElapsed: 0,
      triggered: false,
      active: false,
      activeTimer: 0,
      messageTimer: 0,
    };
    this.merchantDialogue = {
      timer: 0,
    };
    this.hazardAlert = {
      timer: 0,
      textEs: "",
      textEn: "",
    };
    this.bossHazards = {
      radiationTsunami: null,
      lavaPillars: [],
      acidSnowStorm: null,
      aegisLockdown: null,
      nullGridCollapse: null,
    };
    this.currentMapId = "arena";
    this.pendingMapId = "arena";
    this.cycleTransition = {
      active: false,
      stage: "idle",
      mode: "hole",
      timer: 0,
      mapApplied: false,
      nextMapId: "arena",
      specialIntro: false,
      holePosition: new THREE.Vector3(0, 0, 0),
      cover: null,
      voidDisk: null,
      rim: null,
      shaft: null,
      bottomGlow: null,
      portalRoot: null,
      portalRing: null,
      portalCore: null,
      portalHalo: null,
      portalSpires: [],
      sentinelRoot: null,
      sentinelModel: null,
      sentinelFireCore: null,
      sentinelFlames: [],
      sentinelGripBeams: [],
      startCamera: new THREE.Vector3(),
      grabCamera: new THREE.Vector3(),
      openCamera: new THREE.Vector3(),
      descendCamera: new THREE.Vector3(),
      startLookAt: new THREE.Vector3(),
      descendLookAt: new THREE.Vector3(),
    };

    this.playerProgress =
      this.settings.persistentUpgrades
        ? this.sanitizePlayerProgress(this.settings.persistentPlayerProgress)
        : this.createDefaultPlayerProgress();
    this.playerWeapon =
      this.settings.persistentUpgrades && PLAYER_WEAPONS[this.settings.persistentWeapon]
        ? this.settings.persistentWeapon
        : "pistol";
    this.allyLoadout = [];
    this.syncAllyLoadoutFromSettings();

    this.player = {
      position: new THREE.Vector3(0, PLAYER_HEIGHT, 18),
      health: PLAYER_BASE_MAX_HEALTH,
      shotCooldown: 0,
      verticalVelocity: 0,
      grounded: true,
      bob: 0,
      recoil: 0,
      damagePulse: 0,
    };
    this.audio = {
      initialized: false,
      unlocked: false,
      context: null,
      compressor: null,
      masterGain: null,
      musicGain: null,
      sfxGain: null,
      baseMasterGain: 0.96,
      baseMusicGain: 0.42,
      baseSfxGain: 0.82,
      isPaused: false,
      nextBeatTime: 0,
      step: 0,
      themeKey: "",
      unlockChimePlayed: false,
      lastPlayerShotAt: -999,
      lastEnemyShotAt: -999,
      lastDamageAt: -999,
      lastImpactAt: -999,
    };

    this.ui = {
      score: document.getElementById("score"),
      wave: document.getElementById("wave"),
      enemies: document.getElementById("enemies"),
      coins: document.getElementById("coins"),
      healthValue: document.getElementById("health-value"),
      healthFill: document.getElementById("health-fill"),
      difficultyLabel: document.getElementById("difficulty-label"),
      bossPanel: document.getElementById("boss-panel"),
      allyPanel: document.getElementById("ally-panel"),
      allyList: document.getElementById("ally-list"),
      bossName: document.getElementById("boss-name"),
      bossHealthValue: document.getElementById("boss-health-value"),
      bossHealthFill: document.getElementById("boss-health-fill"),
      bossShieldValue: document.getElementById("boss-shield-value"),
      bossShieldFill: document.getElementById("boss-shield-fill"),
      waveRevealAlert: document.getElementById("wave-reveal-alert"),
      merchantDialogue: document.getElementById("merchant-dialogue"),
      merchantDialogueText: document.getElementById("merchant-dialogue-text"),
      overlay: document.getElementById("overlay"),
      overlayTitle: document.getElementById("overlay-title"),
      overlayCopy: document.getElementById("overlay-copy"),
      overlayButton: document.getElementById("overlay-button"),
      overlaySkipCycle: document.getElementById("overlay-skip-cycle"),
      overlayDevShop: document.getElementById("overlay-dev-shop"),
      overlayCredits: document.getElementById("overlay-credits"),
      overlayInstallPc: document.getElementById("overlay-install-pc"),
      overlayInstall: document.getElementById("overlay-install"),
      alliesToggle: document.getElementById("allies-toggle"),
      overlayActions: document.querySelector(".overlay__actions"),
      worldPanel: document.getElementById("world-panel"),
      worldProgress: document.getElementById("world-progress"),
      worldHelp: document.getElementById("world-help"),
      worldButtons: Array.from(document.querySelectorAll(".world-option")),
      settingsToggle: document.getElementById("settings-toggle"),
      settingsPanel: document.getElementById("settings-panel"),
      settingsClose: document.getElementById("settings-close"),
      alliesSettingsPanel: document.getElementById("allies-settings-panel"),
      alliesSettingsClose: document.getElementById("allies-settings-close"),
      alliesSettingsList: document.getElementById("allies-settings-list"),
      alliesSettingsHelp: document.getElementById("allies-settings-help"),
      translateToggle: document.getElementById("translate-toggle"),
      translateHelp: document.getElementById("translate-help"),
      persistentUpgradesToggle: document.getElementById("persistent-upgrades-toggle"),
      persistentUpgradesHelp: document.getElementById("persistent-upgrades-help"),
      difficultyHelp: document.getElementById("difficulty-help"),
      difficultyButtons: Array.from(
        document.querySelectorAll(".difficulty-option"),
      ),
      devToggle: document.getElementById("dev-toggle"),
      devGroup: document.getElementById("dev-group"),
      devHelp: document.getElementById("dev-help"),
      devSpawnType: document.getElementById("dev-spawn-type"),
      devSpawnCount: document.getElementById("dev-spawn-count"),
      devSpawnButton: document.getElementById("dev-spawn-button"),
      devWaveInput: document.getElementById("dev-wave-input"),
      devWaveButton: document.getElementById("dev-wave-button"),
      devOneShotToggle: document.getElementById("dev-oneshot-toggle"),
      devInfiniteHealthToggle: document.getElementById("dev-infinite-health-toggle"),
      devUpgradeSelect: document.getElementById("dev-upgrade-select"),
      devUpgradeButton: document.getElementById("dev-upgrade-button"),
      devToolsHelp: document.getElementById("dev-tools-help"),
      shopHud: document.getElementById("shop-hud"),
      shopCoins: document.getElementById("shop-coins"),
      restTimer: document.getElementById("rest-timer"),
      shopMessage: document.getElementById("shop-message"),
      shopContinue: document.getElementById("shop-continue"),
      shopTooltip: document.getElementById("shop-tooltip"),
      shopTooltipTitle: document.getElementById("shop-tooltip-title"),
      shopTooltipDesc: document.getElementById("shop-tooltip-desc"),
      shopTooltipMeta: document.getElementById("shop-tooltip-meta"),
      transitionScreen: document.getElementById("transition-screen"),
      transitionTitle: document.getElementById("transition-screen-title"),
      transitionCopy: document.getElementById("transition-screen-copy"),
      staticScreen: document.getElementById("static-screen"),
      whiteScreen: document.getElementById("white-screen"),
      creditsScreen: document.getElementById("credits-screen"),
      creditsBossName: document.getElementById("credits-boss-name"),
      creditsBossCredit: document.getElementById("credits-boss-credit"),
      creditsSeqText: document.getElementById("credits-seq-text"),
      creditsBossOrb: document.getElementById("credits-boss-orb"),
      trailerTitleScreen: document.getElementById("trailer-title-screen"),
      pauseFlash: document.getElementById("pause-flash"),
      cutsceneSubtitle: document.getElementById("cutscene-subtitle"),
      cutsceneSubtitleText: document.getElementById("cutscene-subtitle-text"),
      mobileControls: document.getElementById("mobile-controls"),
      mobileJoystick: document.getElementById("mobile-joystick"),
      mobileJoystickThumb: document.getElementById("mobile-joystick-thumb"),
      mobileLookZone: document.getElementById("mobile-look-zone"),
      mobileFire: document.getElementById("mobile-fire"),
      mobileJump: document.getElementById("mobile-jump"),
      mobilePause: document.getElementById("mobile-pause"),
    };
    this.overlayWorldSelectActive = false;

    this.setupScene();
    this.buildFinalCutsceneScene();
    this.setupUI();
    this.setupEvents();
    this.resetRun();
    this.animate();
  }

  setupScene() {
    this.hemiLight = new THREE.HemisphereLight(0x94c6ff, 0x0b1322, 1.45);
    this.scene.add(this.hemiLight);

    this.dirLight = new THREE.DirectionalLight(0xffffff, 1.35);
    this.dirLight.position.set(16, 22, 12);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.set(2048, 2048);
    this.dirLight.shadow.camera.left = -36;
    this.dirLight.shadow.camera.right = 36;
    this.dirLight.shadow.camera.top = 36;
    this.dirLight.shadow.camera.bottom = -36;
    this.scene.add(this.dirLight);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(this.ambientLight);

    this.mapGroups = Object.fromEntries(
      WORLD_ORDER.map((worldId) => [worldId, new THREE.Group()]),
    );
    this.scene.add(...WORLD_ORDER.map((worldId) => this.mapGroups[worldId]));
    this.epilogueGroup.visible = false;

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(ARENA_RADIUS, 64),
      new THREE.MeshStandardMaterial({
        color: 0x0d1527,
        roughness: 0.92,
        metalness: 0.18,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.mapGroups.arena.add(floor);

    const innerRing = new THREE.Mesh(
      new THREE.RingGeometry(ARENA_RADIUS - 4.2, ARENA_RADIUS - 3.3, 64),
      new THREE.MeshBasicMaterial({
        color: 0x163760,
        transparent: true,
        opacity: 0.85,
      }),
    );
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = 0.02;
    this.mapGroups.arena.add(innerRing);

    const grid = new THREE.GridHelper(ARENA_RADIUS * 2, 34, 0x29466f, 0x15263d);
    grid.position.y = 0.04;
    this.mapGroups.arena.add(grid);

    for (let i = 0; i < 18; i += 1) {
      const angle = (i / 18) * Math.PI * 2;
      const radius = ARENA_RADIUS - 1.4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const pylon = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.5, 4 + (i % 3) * 1.2, 8),
        new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0x1b2541 : 0x101928,
          emissive: i % 2 === 0 ? 0x5cf2ff : 0xff6b57,
          emissiveIntensity: 0.35,
          metalness: 0.86,
          roughness: 0.34,
        }),
      );

      pylon.position.set(x, 2, z);
      pylon.castShadow = true;
      pylon.receiveShadow = true;
      this.mapGroups.arena.add(pylon);
    }

    const riftFloor = new THREE.Mesh(
      new THREE.CircleGeometry(ARENA_RADIUS, 72),
      new THREE.MeshStandardMaterial({
        color: 0x07100d,
        emissive: 0x0d241e,
        emissiveIntensity: 0.12,
        roughness: 0.9,
        metalness: 0.16,
      }),
    );
    riftFloor.rotation.x = -Math.PI / 2;
    riftFloor.receiveShadow = true;
    this.mapGroups.rift.add(riftFloor);

    const riftRing = new THREE.Mesh(
      new THREE.RingGeometry(ARENA_RADIUS - 5.2, ARENA_RADIUS - 2.8, 72),
      new THREE.MeshBasicMaterial({
        color: 0x7cff91,
        transparent: true,
        opacity: 0.18,
      }),
    );
    riftRing.rotation.x = -Math.PI / 2;
    riftRing.position.y = 0.06;
    this.mapGroups.rift.add(riftRing);

    const riftGrid = new THREE.GridHelper(ARENA_RADIUS * 2, 28, 0x24483d, 0x0e1d18);
    riftGrid.position.y = 0.08;
    this.mapGroups.rift.add(riftGrid);

    for (let i = 0; i < 16; i += 1) {
      const angle = (i / 16) * Math.PI * 2;
      const radius = ARENA_RADIUS - 2.3 + Math.sin(i * 1.4) * 0.8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const crystal = new THREE.Mesh(
        new THREE.OctahedronGeometry(1.1 + (i % 3) * 0.28, 0),
        new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0x9f86ff : 0x7cff91,
          emissive: i % 2 === 0 ? 0x9f86ff : 0x7cff91,
          emissiveIntensity: 0.54,
          roughness: 0.18,
          metalness: 0.78,
        }),
      );
      crystal.position.set(x, 2.1 + (i % 3) * 0.7, z);
      crystal.scale.set(0.7, 1.8 + (i % 4) * 0.32, 0.7);
      crystal.rotation.z = angle * 0.36;
      crystal.castShadow = true;
      crystal.receiveShadow = true;
      this.mapGroups.rift.add(crystal);
    }

    for (let i = 0; i < 10; i += 1) {
      const angle = (i / 10) * Math.PI * 2 + 0.22;
      const radius = ARENA_RADIUS - 8.6;
      const archRoot = new THREE.Group();
      archRoot.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      archRoot.rotation.y = -angle + Math.PI / 2;

      const pillarMaterial = new THREE.MeshStandardMaterial({
        color: 0x1d1a2f,
        roughness: 0.42,
        metalness: 0.72,
      });
      const glowMaterial = new THREE.MeshStandardMaterial({
        color: 0x9f86ff,
        emissive: 0x9f86ff,
        emissiveIntensity: 0.64,
        roughness: 0.14,
        metalness: 0.88,
      });

      const leftPillar = new THREE.Mesh(
        new THREE.BoxGeometry(0.54, 3.8, 0.6),
        pillarMaterial,
      );
      leftPillar.position.set(-1.26, 1.9, 0);
      leftPillar.castShadow = true;
      leftPillar.receiveShadow = true;
      archRoot.add(leftPillar);

      const rightPillar = leftPillar.clone();
      rightPillar.position.x = 1.26;
      archRoot.add(rightPillar);

      const arch = new THREE.Mesh(
        new THREE.TorusGeometry(1.28, 0.18, 12, 28, Math.PI),
        glowMaterial,
      );
      arch.position.y = 3.74;
      arch.rotation.z = Math.PI;
      archRoot.add(arch);

      this.mapGroups.rift.add(archRoot);
    }

    this.buildAdvancedWorlds();

    this.weapon = createWeaponModel();
    this.weapon.position.set(0.38, -0.36, -0.64);
    this.weapon.rotation.set(-0.12, -0.25, -0.02);
    this.camera.add(this.weapon);
    this.scene.add(this.camera);

    this.setupShopScene();
    this.setupCycleTransitionScene();
    this.applyMapTheme("arena");
  }

  createWorldFloor(group, options) {
    const {
      floorColor,
      emissive = 0x000000,
      emissiveIntensity = 0,
      roughness = 0.82,
      metalness = 0.24,
      ringColor,
      ringInner = ARENA_RADIUS - 5.2,
      ringOuter = ARENA_RADIUS - 3.2,
      ringOpacity = 0.2,
      gridPrimary,
      gridSecondary,
      gridDivisions = 30,
    } = options;

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(ARENA_RADIUS, 72),
      new THREE.MeshStandardMaterial({
        color: floorColor,
        emissive,
        emissiveIntensity,
        roughness,
        metalness,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    group.add(floor);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(ringInner, ringOuter, 72),
      new THREE.MeshBasicMaterial({
        color: ringColor,
        transparent: true,
        opacity: ringOpacity,
      }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.05;
    group.add(ring);

    const grid = new THREE.GridHelper(
      ARENA_RADIUS * 2,
      gridDivisions,
      gridPrimary,
      gridSecondary,
    );
    grid.position.y = 0.06;
    group.add(grid);

    return { floor, ring, grid };
  }

  addPerimeterProps(group, count, createProp) {
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2;
      const prop = createProp(i, angle);
      if (prop) {
        group.add(prop);
      }
    }
  }

  buildAdvancedWorlds() {
    this.buildForgeMap();
    this.buildVaultMap();
    this.buildNeonMap();
    this.buildBioGraveMap();
    this.buildCitadelMap();
    this.buildHellTrackMap();
    this.buildEpilogueMap();
    this.buildFinalCutsceneScene();
  }

  buildFinalCutsceneScene() {
    this.cutsceneActors = {
      active: false,
      sentinel: null,
      merchant: null,
      muzzleFlash: null,
      projectile: null,
      projectileVelocity: null,
      chargeProjectile: null,
      fireFlames: [],
      merchantWeapon: null,
    };
    if (this.cutsceneGroup) {
      this.cutsceneGroup.clear();
      this.cutsceneGroup.visible = false;
    }
  }

  spawnFinalCutsceneActors() {
    if (!this.cutsceneGroup || !this.cutsceneActors) {
      return;
    }
    this.cutsceneGroup.clear();
    this.cutsceneGroup.visible = true;

    const sentinel = createSentinelBossModel();
    this.decorateFinalSentinelModel(sentinel);
    sentinel.scale.setScalar(0.9);
    sentinel.position.set(0, 1.6, -6);
    sentinel.rotation.y = Math.PI;

    const merchant = createShopNpcModel();
    merchant.scale.setScalar(0.9);
    merchant.position.set(6.0, 0, -4.35);
    merchant.rotation.y = -Math.PI / 2.1;
    merchant.visible = false;
    if (merchant.userData.rightArm) {
      // Pose the arm forward like a shooter stance.
      merchant.userData.rightArm.rotation.x = -Math.PI / 2;
      merchant.userData.rightArm.position.set(0.95, 1.72, 0.42);
    }
    if (merchant.userData.rightHand) {
      merchant.userData.rightHand.position.set(1.0, 1.68, 1.08);
    }

    const merchantWeapon = createWeaponModel();
    merchantWeapon.scale.setScalar(0.6);
    merchantWeapon.position.set(-0.03, 0.02, 0.18);
    merchantWeapon.rotation.y = -Math.PI / 2;
    merchantWeapon.rotation.x = -0.08;
    merchantWeapon.rotation.z = 0.1;
    merchantWeapon.visible = false;
    if (merchant.userData.rightHand) {
      merchant.userData.rightHand.add(merchantWeapon);
    } else {
      merchant.add(merchantWeapon);
    }

    const muzzleFlash = new THREE.Mesh(
      new THREE.ConeGeometry(0.18, 0.5, 8),
      new THREE.MeshStandardMaterial({
        color: 0xffc14b,
        emissive: 0xff6b2f,
        emissiveIntensity: 1.4,
        transparent: true,
        opacity: 0,
        roughness: 0.15,
        metalness: 0.2,
      }),
    );
    muzzleFlash.position.set(0, 0, -0.84);
    muzzleFlash.rotation.x = Math.PI / 2;
    merchantWeapon.add(muzzleFlash);

    const chargeProjectile = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 14, 14),
      new THREE.MeshStandardMaterial({
        color: 0xffc14b,
        emissive: 0xff6b2f,
        emissiveIntensity: 1.35,
        transparent: true,
        opacity: 0.82,
        roughness: 0.12,
        metalness: 0.2,
      }),
    );
    chargeProjectile.position.set(0, 0.7, -5.2);

    const fireFlames = [];
    for (let i = 0; i < 6; i += 1) {
      const flame = new THREE.Mesh(
        new THREE.ConeGeometry(0.16, 0.7, 6),
        new THREE.MeshStandardMaterial({
          color: 0xffc14b,
          emissive: 0xff6b2f,
          emissiveIntensity: 1.2,
          transparent: true,
          opacity: 0.9,
          roughness: 0.08,
          metalness: 0.15,
        }),
      );
      const angle = (i / 6) * Math.PI * 2;
      flame.position.set(Math.cos(angle) * 2.0, 0.2, Math.sin(angle) * 2.0);
      flame.rotation.z = Math.PI;
      flame.userData.baseHeight = 0.2;
      flame.userData.phase = i * 0.7;
      sentinel.add(flame);
      fireFlames.push(flame);
    }

    const projectile = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0xffc14b,
        emissive: 0xff6b2f,
        emissiveIntensity: 1.3,
        transparent: true,
        opacity: 0,
        roughness: 0.12,
        metalness: 0.2,
      }),
    );
    projectile.position.set(6.05, 1.18, -4.32);

    this.cutsceneGroup.add(sentinel, merchant, chargeProjectile, projectile);
    this.cutsceneActors.active = true;
    this.cutsceneActors.sentinel = sentinel;
    this.cutsceneActors.merchant = merchant;
    this.cutsceneActors.muzzleFlash = muzzleFlash;
    this.cutsceneActors.projectile = projectile;
    this.cutsceneActors.projectileVelocity = new THREE.Vector3(-6.4, 0, -1.2);
    this.cutsceneActors.chargeProjectile = chargeProjectile;
    this.cutsceneActors.fireFlames = fireFlames;
    this.cutsceneActors.merchantWeapon = merchantWeapon;
  }

  hideFinalCutsceneActors() {
    if (this.cutsceneGroup) {
      this.cutsceneGroup.visible = false;
      this.cutsceneGroup.clear();
    }
    if (this.cutsceneActors) {
      this.cutsceneActors.active = false;
      this.cutsceneActors.sentinel = null;
      this.cutsceneActors.merchant = null;
      this.cutsceneActors.muzzleFlash = null;
      this.cutsceneActors.projectile = null;
      this.cutsceneActors.projectileVelocity = null;
      this.cutsceneActors.chargeProjectile = null;
      this.cutsceneActors.fireFlames = [];
      this.cutsceneActors.merchantWeapon = null;
    }
  }

  updateFinalCutsceneScene(dt) {
    if (!this.cutsceneActors?.active) {
      return;
    }
    const { sentinel, merchant, muzzleFlash, projectile, projectileVelocity, chargeProjectile } =
      this.cutsceneActors;
    const showMerchant = this.finalCutscene.lineIndex >= 1;
    if (sentinel) {
      sentinel.rotation.y = Math.PI + Math.sin(this.elapsed * 1.6) * 0.08;
      if (sentinel.userData.core?.material) {
        sentinel.userData.core.material.emissiveIntensity =
          1.1 + Math.sin(this.elapsed * 5.4) * 0.2;
      }
    }
    if (merchant) {
      merchant.position.x = 6.0 + Math.sin(this.elapsed * 1.8) * 0.06;
      merchant.visible = showMerchant;
    }
    if (this.cutsceneActors.merchantWeapon) {
      this.cutsceneActors.merchantWeapon.visible = showMerchant;
    }
    if (muzzleFlash && muzzleFlash.material) {
      muzzleFlash.material.opacity = Math.max(0, muzzleFlash.material.opacity - dt * 6);
      muzzleFlash.scale.setScalar(0.9 + Math.sin(this.elapsed * 12) * 0.12);
    }
    if (Array.isArray(this.cutsceneActors.fireFlames)) {
      for (const flame of this.cutsceneActors.fireFlames) {
        flame.scale.y =
          0.9 + Math.sin(this.elapsed * 7 + (flame.userData.phase ?? 0)) * 0.22;
        flame.position.y =
          (flame.userData.baseHeight ?? 0.2) +
          Math.sin(this.elapsed * 5 + (flame.userData.phase ?? 0)) * 0.1;
      }
    }
    if (projectile && projectile.material?.opacity > 0.01 && projectileVelocity) {
      projectile.position.addScaledVector(projectileVelocity, dt);
      projectile.material.opacity = Math.max(0, projectile.material.opacity - dt * 0.4);
    }

    if (chargeProjectile?.material) {
      const chargeLineIndex = FINAL_CUTSCENE_LINES.indexOf("carga un ataque final");
      const lineDuration =
        FINAL_CUTSCENE_DURATIONS[this.finalCutscene.lineIndex] ?? 1.4;
      const lineProgress = clamp(this.finalCutscene.timer / lineDuration, 0, 1);
      const isChargeLine = this.finalCutscene.lineIndex === chargeLineIndex;
      if (sentinel) {
        const baseScale = isChargeLine ? 0.55 + lineProgress * 1.45 : 0.72;
        const pulse = baseScale + Math.sin(this.elapsed * 9.2) * 0.1;
        chargeProjectile.scale.setScalar(pulse);
        chargeProjectile.position.set(
          sentinel.position.x,
          sentinel.position.y - 0.5 + Math.sin(this.elapsed * 6.4) * 0.06,
          sentinel.position.z + 1.0,
        );
      }
      const glowBoost = isChargeLine ? lineProgress * 1.7 : 0.15;
      chargeProjectile.visible = !this.finalCutscene.sceneShot && this.finalCutscene.lineIndex >= chargeLineIndex;
      chargeProjectile.material.opacity =
        (isChargeLine ? 0.62 + lineProgress * 0.3 : 0.66) + Math.sin(this.elapsed * 8) * 0.08;
      chargeProjectile.material.emissiveIntensity =
        1.2 + glowBoost + Math.sin(this.elapsed * 10.5) * 0.18;
    }

    if (this.camera) {
      const target = new THREE.Vector3(0.6, 1.1, -5.4);
      this.camera.position.lerp(new THREE.Vector3(5.6, 2.4, 1.8), 0.08);
      this.camera.lookAt(target);
    }

  }

  buildEpilogueMap() {
    const group = this.epilogueGroup;
    group.clear();
    group.visible = false;
    this.epilogue.cityBuildings = [];
    this.epilogue.trailerPortals = [];
    this.epilogue.trailerEnemies = [];

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 90),
      new THREE.MeshStandardMaterial({
        color: 0x0b0d14,
        roughness: 0.82,
        metalness: 0.18,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.z = -30;
    floor.receiveShadow = true;
    group.add(floor);

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x121622,
      roughness: 0.7,
      metalness: 0.3,
    });
    for (const x of [-5.2, 5.2]) {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(0.6, 6, 90), wallMaterial);
      wall.position.set(x, 3, -30);
      wall.castShadow = true;
      wall.receiveShadow = true;
      group.add(wall);
    }

    const lampMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a3346,
      roughness: 0.2,
      metalness: 0.8,
    });
    const glowMaterial = new THREE.MeshStandardMaterial({
      color: 0x5cf2ff,
      emissive: 0x5cf2ff,
      emissiveIntensity: 1.1,
      roughness: 0.12,
      metalness: 0.7,
    });
    for (let i = 0; i < 10; i += 1) {
      const z = -8 - i * 8;
      const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), lampMaterial);
      lamp.position.set(-4.3, 2.4, z);
      lamp.castShadow = true;
      group.add(lamp);

      const glow = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), glowMaterial);
      glow.position.set(-4.3, 2.4, z + 0.6);
      group.add(glow);
    }

    // Fake city skyline blocks outside the corridor to sell the "false city" vibe.
    const buildingMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f1320,
      roughness: 0.86,
      metalness: 0.16,
    });
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x22324a,
      emissive: 0x5cf2ff,
      emissiveIntensity: 0.38,
      roughness: 0.18,
      metalness: 0.42,
    });
    for (let i = 0; i < 18; i += 1) {
      const z = -6 - i * 5;
      const height = 6 + (i % 5) * 2.1;
      for (const side of [-1, 1]) {
        const building = new THREE.Mesh(
          new THREE.BoxGeometry(4.2 + (i % 3) * 0.8, height, 3.2 + (i % 2) * 1.2),
          buildingMaterial,
        );
        building.position.set(side * (9.2 + (i % 2) * 1.1), height * 0.5, z);
        building.userData.baseY = building.position.y;
        building.castShadow = true;
        building.receiveShadow = true;
        group.add(building);
        this.epilogue.cityBuildings.push(building);

        const windows = new THREE.Mesh(
          new THREE.BoxGeometry(1.5, Math.max(2.2, height * 0.55), 0.08),
          windowMaterial,
        );
        windows.position.set(
          side * (7.05 + (i % 2) * 1.1),
          Math.max(2.2, height * 0.52),
          z,
        );
        group.add(windows);
      }
    }

    const portalMat = new THREE.MeshStandardMaterial({
      color: 0x7a5cff,
      emissive: 0x9f86ff,
      emissiveIntensity: 0.9,
      transparent: true,
      opacity: 0,
      roughness: 0.15,
      metalness: 0.3,
    });
    const enemyMat = new THREE.MeshStandardMaterial({
      color: 0x0f1020,
      emissive: 0x7a5cff,
      emissiveIntensity: 0.5,
      roughness: 0.38,
      metalness: 0.42,
    });
    for (let i = 0; i < 4; i += 1) {
      const side = i % 2 === 0 ? -1 : 1;
      const z = -14 - i * 10;
      const portal = new THREE.Mesh(new THREE.TorusGeometry(1, 0.12, 12, 30), portalMat.clone());
      portal.position.set(side * 8.1, 1.6, z);
      portal.rotation.y = Math.PI / 2;
      portal.visible = false;
      portal.userData.triggerTime = 3 + i * 1.1;
      group.add(portal);
      this.epilogue.trailerPortals.push(portal);

      const enemy = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.8, 0.8), enemyMat.clone());
      enemy.position.set(side * 8.1, 0.9, z);
      enemy.visible = false;
      enemy.userData.baseY = 0.9;
      enemy.userData.baseZ = z;
      enemy.userData.baseX = side * 8.1;
      enemy.userData.forwardSpeed = 4.2 + i * 0.9;
      enemy.userData.triggerTime = portal.userData.triggerTime + 0.32;
      group.add(enemy);
      this.epilogue.trailerEnemies.push(enemy);
    }
  }

  buildForgeMap() {
    const group = this.mapGroups.forge;
    this.createWorldFloor(group, {
      floorColor: 0x180b08,
      emissive: 0x2a110b,
      emissiveIntensity: 0.18,
      roughness: 0.78,
      metalness: 0.36,
      ringColor: 0xff8c42,
      ringOpacity: 0.22,
      gridPrimary: 0x6d2c16,
      gridSecondary: 0x24100a,
    });

    this.addPerimeterProps(group, 14, (index, angle) => {
      const radius = ARENA_RADIUS - 2.6 + Math.sin(index * 1.1) * 0.4;
      const root = new THREE.Group();
      root.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      root.rotation.y = angle;

      const stack = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.78, 4.8 + (index % 3) * 0.9, 10),
        new THREE.MeshStandardMaterial({
          color: 0x2c2019,
          roughness: 0.52,
          metalness: 0.82,
        }),
      );
      stack.position.y = 2.4;
      stack.castShadow = true;
      stack.receiveShadow = true;
      root.add(stack);

      const core = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.3, 3.8, 10),
        new THREE.MeshStandardMaterial({
          color: 0xff7b36,
          emissive: 0xff7b36,
          emissiveIntensity: 1,
          roughness: 0.18,
          metalness: 0.42,
        }),
      );
      core.position.y = 2.2;
      root.add(core);

      return root;
    });
  }

  buildVaultMap() {
    const group = this.mapGroups.vault;
    this.createWorldFloor(group, {
      floorColor: 0x08131d,
      emissive: 0x0d2432,
      emissiveIntensity: 0.16,
      roughness: 0.68,
      metalness: 0.22,
      ringColor: 0xb9f7ff,
      ringOpacity: 0.26,
      gridPrimary: 0x7fdfff,
      gridSecondary: 0x113044,
    });

    this.addPerimeterProps(group, 16, (index, angle) => {
      const radius = ARENA_RADIUS - 2.4;
      const crystal = new THREE.Mesh(
        new THREE.ConeGeometry(0.9 + (index % 2) * 0.18, 4.4 + (index % 3) * 0.8, 6),
        new THREE.MeshStandardMaterial({
          color: 0xcffbff,
          emissive: 0x8df9ff,
          emissiveIntensity: 0.5,
          roughness: 0.1,
          metalness: 0.56,
        }),
      );
      crystal.position.set(Math.cos(angle) * radius, 2.2, Math.sin(angle) * radius);
      crystal.rotation.z = Math.sin(angle) * 0.22;
      crystal.castShadow = true;
      crystal.receiveShadow = true;
      return crystal;
    });
  }

  buildNeonMap() {
    const group = this.mapGroups.neon;
    this.createWorldFloor(group, {
      floorColor: 0x070b12,
      emissive: 0x101a28,
      emissiveIntensity: 0.18,
      roughness: 0.5,
      metalness: 0.34,
      ringColor: 0x25ffd7,
      ringOpacity: 0.24,
      gridPrimary: 0x25ffd7,
      gridSecondary: 0x153251,
    });

    this.addPerimeterProps(group, 12, (index, angle) => {
      const radius = ARENA_RADIUS - 3.4;
      const root = new THREE.Group();
      root.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      root.rotation.y = -angle;

      const pillar = new THREE.Mesh(
        new THREE.BoxGeometry(1, 5.4, 0.7),
        new THREE.MeshStandardMaterial({
          color: 0x131d2b,
          roughness: 0.28,
          metalness: 0.84,
        }),
      );
      pillar.position.y = 2.7;
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      root.add(pillar);

      const sign = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 0.34, 0.18),
        new THREE.MeshStandardMaterial({
          color: index % 2 === 0 ? 0x25ffd7 : 0xffa41b,
          emissive: index % 2 === 0 ? 0x25ffd7 : 0xffa41b,
          emissiveIntensity: 1.05,
          roughness: 0.16,
          metalness: 0.72,
        }),
      );
      sign.position.set(0, 4.3, 0.46);
      root.add(sign);

      return root;
    });
  }

  buildBioGraveMap() {
    const group = this.mapGroups.biograve;
    this.createWorldFloor(group, {
      floorColor: 0x09140e,
      emissive: 0x17331d,
      emissiveIntensity: 0.22,
      roughness: 0.84,
      metalness: 0.18,
      ringColor: 0x8dff7a,
      ringOpacity: 0.2,
      gridPrimary: 0x507a39,
      gridSecondary: 0x102216,
    });

    this.addPerimeterProps(group, 14, (index, angle) => {
      const radius = ARENA_RADIUS - 3;
      const pod = new THREE.Mesh(
        new THREE.SphereGeometry(1.15 + (index % 2) * 0.18, 14, 14),
        new THREE.MeshStandardMaterial({
          color: 0x4a6e36,
          emissive: 0x77c75a,
          emissiveIntensity: 0.26,
          roughness: 0.82,
          metalness: 0.08,
        }),
      );
      pod.position.set(Math.cos(angle) * radius, 1.5, Math.sin(angle) * radius);
      pod.scale.set(1, 1.2 + (index % 3) * 0.2, 1);
      pod.castShadow = true;
      pod.receiveShadow = true;
      return pod;
    });
  }

  buildCitadelMap() {
    const group = this.mapGroups.citadel;
    this.createWorldFloor(group, {
      floorColor: 0x080810,
      emissive: 0x120d20,
      emissiveIntensity: 0.18,
      roughness: 0.72,
      metalness: 0.34,
      ringColor: 0xb78cff,
      ringOpacity: 0.18,
      gridPrimary: 0x8df9ff,
      gridSecondary: 0x271d3f,
    });

    this.addPerimeterProps(group, 12, (index, angle) => {
      const radius = ARENA_RADIUS - 2.8;
      const obelisk = new THREE.Mesh(
        new THREE.OctahedronGeometry(1.2 + (index % 2) * 0.18, 0),
        new THREE.MeshStandardMaterial({
          color: 0x3d2a64,
          emissive: index % 2 === 0 ? 0x8df9ff : 0xb78cff,
          emissiveIntensity: 0.72,
          roughness: 0.18,
          metalness: 0.84,
        }),
      );
      obelisk.position.set(Math.cos(angle) * radius, 2.6, Math.sin(angle) * radius);
      obelisk.scale.set(0.8, 2.2 + (index % 3) * 0.25, 0.8);
      obelisk.castShadow = true;
      obelisk.receiveShadow = true;
      return obelisk;
    });
  }

  buildHellTrackMap() {
    const group = this.mapGroups.helltrack;
    this.createWorldFloor(group, {
      floorColor: 0x120403,
      emissive: 0x2c0b08,
      emissiveIntensity: 0.24,
      roughness: 0.74,
      metalness: 0.42,
      ringColor: 0xff5028,
      ringOpacity: 0.28,
      gridPrimary: 0xff7b36,
      gridSecondary: 0x35100b,
    });

    this.addPerimeterProps(group, 16, (index, angle) => {
      const radius = ARENA_RADIUS - 2.5;
      const root = new THREE.Group();
      root.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      root.rotation.y = angle;

      const spike = new THREE.Mesh(
        new THREE.ConeGeometry(0.7, 5.2 + (index % 3) * 0.7, 6),
        new THREE.MeshStandardMaterial({
          color: 0x2e1610,
          roughness: 0.44,
          metalness: 0.88,
          emissive: 0xff5b2f,
          emissiveIntensity: 0.34,
        }),
      );
      spike.position.y = 2.6;
      spike.castShadow = true;
      spike.receiveShadow = true;
      root.add(spike);

      const ember = new THREE.Mesh(
        new THREE.SphereGeometry(0.24, 10, 10),
        new THREE.MeshStandardMaterial({
          color: 0xffc14b,
          emissive: 0xffc14b,
          emissiveIntensity: 1.1,
          roughness: 0.08,
          metalness: 0.2,
        }),
      );
      ember.position.y = 5.6;
      root.add(ember);

      return root;
    });
  }

  setupShopScene() {
    this.shopGroup.visible = false;

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(8.8, 9.6, 0.8, 28),
      new THREE.MeshStandardMaterial({
        color: 0x17100a,
        roughness: 0.72,
        metalness: 0.4,
      }),
    );
    platform.position.y = 0.4;
    platform.receiveShadow = true;
    this.shopGroup.add(platform);

    const innerPad = new THREE.Mesh(
      new THREE.CylinderGeometry(7.2, 7.8, 0.24, 28),
      new THREE.MeshStandardMaterial({
        color: 0x24190d,
        roughness: 0.42,
        metalness: 0.62,
        emissive: 0xffb347,
        emissiveIntensity: 0.16,
      }),
    );
    innerPad.position.y = 0.84;
    innerPad.receiveShadow = true;
    this.shopGroup.add(innerPad);

    const counterMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a1d0f,
      roughness: 0.42,
      metalness: 0.82,
    });

    const counter = new THREE.Mesh(
      new THREE.BoxGeometry(9.8, 1.6, 1.8),
      counterMaterial,
    );
    counter.position.set(0, 1.4, -2.5);
    counter.castShadow = true;
    counter.receiveShadow = true;
    this.shopGroup.add(counter);

    const canopy = new THREE.Mesh(
      new THREE.BoxGeometry(11.2, 0.38, 5.2),
      new THREE.MeshStandardMaterial({
        color: 0x1c1410,
        roughness: 0.36,
        metalness: 0.74,
      }),
    );
    canopy.position.set(0, 5.4, -2.1);
    canopy.castShadow = true;
    canopy.receiveShadow = true;
    this.shopGroup.add(canopy);

    for (const x of [-4.7, 4.7]) {
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.24, 4.6, 10),
        counterMaterial,
      );
      pillar.position.set(x, 3.1, -2.1);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      this.shopGroup.add(pillar);
    }

    const sign = new THREE.Mesh(
      new THREE.BoxGeometry(6.2, 0.46, 0.18),
      new THREE.MeshStandardMaterial({
        color: 0xffd166,
        emissive: 0xffd166,
        emissiveIntensity: 0.85,
        roughness: 0.1,
        metalness: 0.92,
      }),
    );
    sign.position.set(0, 4.2, -4.4);
    sign.castShadow = true;
    this.shopGroup.add(sign);

    this.shopPointer.npc = createShopNpcModel();
    this.shopPointer.npc.position.set(0, 0.15, -2.5);
    this.shopGroup.add(this.shopPointer.npc);

    const positions = [
      new THREE.Vector3(-4.6, 0, 2.8),
      new THREE.Vector3(-1.55, 0, 2.1),
      new THREE.Vector3(1.55, 0, 2.1),
      new THREE.Vector3(4.6, 0, 2.8),
    ];

    this.shopPointer.items = positions.map((position) => {
      const entry = this.createShopUpgradeStand("damage", position);
      this.shopGroup.add(entry.root);
      return entry;
    });
    this.rollShopOffers();
  }

  setupCycleTransitionScene() {
    this.transitionGroup.visible = false;

    const holeMaterial = new THREE.MeshStandardMaterial({
      color: 0x030507,
      emissive: 0x07111b,
      emissiveIntensity: 0.45,
      roughness: 0.92,
      metalness: 0.12,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const coverMaterial = new THREE.MeshStandardMaterial({
      color: 0x101829,
      roughness: 0.86,
      metalness: 0.22,
    });
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0x5cf2ff,
      emissive: 0x5cf2ff,
      emissiveIntensity: 0.18,
      roughness: 0.22,
      metalness: 0.82,
      transparent: true,
      opacity: 0,
    });
    const shaftMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a1321,
      emissive: 0x153455,
      emissiveIntensity: 0.18,
      roughness: 0.72,
      metalness: 0.44,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0,
    });
    const glowMaterial = new THREE.MeshStandardMaterial({
      color: 0xffb347,
      emissive: 0xffb347,
      emissiveIntensity: 0.92,
      roughness: 0.14,
      metalness: 0.74,
      transparent: true,
      opacity: 0,
    });
    const portalRingMaterial = new THREE.MeshStandardMaterial({
      color: 0x9f86ff,
      emissive: 0x9f86ff,
      emissiveIntensity: 0.6,
      roughness: 0.12,
      metalness: 0.92,
      transparent: true,
      opacity: 0,
    });
    const portalCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0x7cff91,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });

    const cover = new THREE.Mesh(
      new THREE.CircleGeometry(CYCLE_HOLE_RADIUS + 0.12, 48),
      coverMaterial,
    );
    cover.rotation.x = -Math.PI / 2;
    cover.position.y = 0.06;
    cover.receiveShadow = true;
    this.transitionGroup.add(cover);

    const voidDisk = new THREE.Mesh(
      new THREE.CircleGeometry(CYCLE_HOLE_RADIUS, 48),
      holeMaterial,
    );
    voidDisk.rotation.x = -Math.PI / 2;
    voidDisk.position.y = 0.02;
    this.transitionGroup.add(voidDisk);

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(CYCLE_HOLE_RADIUS + 0.08, 0.16, 14, 42),
      rimMaterial,
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.08;
    this.transitionGroup.add(rim);

    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(CYCLE_HOLE_RADIUS, CYCLE_HOLE_RADIUS, CYCLE_HOLE_DEPTH, 28, 1, true),
      shaftMaterial,
    );
    shaft.position.y = -CYCLE_HOLE_DEPTH / 2;
    this.transitionGroup.add(shaft);

    const bottomGlow = new THREE.Mesh(
      new THREE.CircleGeometry(CYCLE_HOLE_RADIUS * 0.72, 32),
      glowMaterial,
    );
    bottomGlow.rotation.x = -Math.PI / 2;
    bottomGlow.position.y = -CYCLE_HOLE_DEPTH + 0.12;
    this.transitionGroup.add(bottomGlow);

    const portalRoot = new THREE.Group();
    portalRoot.position.set(0, 2.75, 0.8);
    this.transitionGroup.add(portalRoot);

    const portalRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.05, 0.2, 16, 42),
      portalRingMaterial,
    );
    portalRing.rotation.y = Math.PI / 2;
    portalRoot.add(portalRing);

    const portalHalo = new THREE.Mesh(
      new THREE.TorusGeometry(2.5, 0.08, 12, 38),
      portalRingMaterial.clone(),
    );
    portalHalo.rotation.y = Math.PI / 2;
    portalRoot.add(portalHalo);

    const portalCore = new THREE.Mesh(
      new THREE.CircleGeometry(1.82, 32),
      portalCoreMaterial,
    );
    portalRoot.add(portalCore);

    const portalSpires = [];
    for (let i = 0; i < 6; i += 1) {
      const angle = (i / 6) * Math.PI * 2;
      const spire = new THREE.Mesh(
        new THREE.ConeGeometry(0.16, 1.26, 6),
        portalRingMaterial.clone(),
      );
      spire.position.set(Math.cos(angle) * 2.3, Math.sin(angle) * 2.3, 0);
      spire.rotation.z = angle;
      portalRoot.add(spire);
      portalSpires.push(spire);
    }

    const sentinelRoot = new THREE.Group();
    sentinelRoot.visible = false;
    sentinelRoot.position.set(0, 4.4, 1.15);
    this.transitionGroup.add(sentinelRoot);

    const sentinelModel = createSentinelBossModel();
    sentinelModel.scale.setScalar(0.74);
    sentinelModel.rotation.y = Math.PI;
    sentinelRoot.add(sentinelModel);

    for (const mesh of [
      sentinelModel.userData.core,
      sentinelModel.userData.outerRing,
      sentinelModel.userData.leftAntenna,
      sentinelModel.userData.rightAntenna,
    ]) {
      if (!mesh?.material) {
        continue;
      }

      mesh.material = mesh.material.clone();
      mesh.material.color.set(0xff7a2a);
      mesh.material.emissive.set(0xff5a1f);
      mesh.material.emissiveIntensity = 1.2;
    }

    const sentinelFireCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.88, 18, 18),
      new THREE.MeshStandardMaterial({
        color: 0xffa13d,
        emissive: 0xff5a1f,
        emissiveIntensity: 1.25,
        roughness: 0.14,
        metalness: 0.18,
        transparent: true,
        opacity: 0,
      }),
    );
    sentinelFireCore.position.set(0, 1.86, 0);
    sentinelRoot.add(sentinelFireCore);

    const sentinelFlames = [];
    for (let i = 0; i < 6; i += 1) {
      const angle = (i / 6) * Math.PI * 2;
      const flame = new THREE.Mesh(
        new THREE.ConeGeometry(0.3, 1.45, 8),
        new THREE.MeshStandardMaterial({
          color: 0xffb347,
          emissive: 0xff6a21,
          emissiveIntensity: 1.3,
          roughness: 0.08,
          metalness: 0.18,
          transparent: true,
          opacity: 0,
        }),
      );
      flame.position.set(Math.cos(angle) * 1.82, 1.2 + (i % 2) * 0.28, Math.sin(angle) * 1.82);
      flame.rotation.z = randRange(-0.22, 0.22);
      flame.scale.set(0.8, 0.2, 0.8);
      flame.userData.baseHeight = flame.position.y;
      flame.userData.phase = angle;
      sentinelRoot.add(flame);
      sentinelFlames.push(flame);
    }

    const sentinelGripBeams = [-1, 1].map((side) => {
      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.2, 1, 10, 1, true),
        new THREE.MeshStandardMaterial({
          color: 0xffc067,
          emissive: 0xff6a21,
          emissiveIntensity: 1.45,
          roughness: 0.1,
          metalness: 0.16,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
        }),
      );
      beam.visible = false;
      beam.userData.localOffset = new THREE.Vector3(side * 1.46, 1.86, 0.28);
      this.transitionGroup.add(beam);
      return beam;
    });

    this.cycleTransition.cover = cover;
    this.cycleTransition.voidDisk = voidDisk;
    this.cycleTransition.rim = rim;
    this.cycleTransition.shaft = shaft;
    this.cycleTransition.bottomGlow = bottomGlow;
    this.cycleTransition.portalRoot = portalRoot;
    this.cycleTransition.portalRing = portalRing;
    this.cycleTransition.portalCore = portalCore;
    this.cycleTransition.portalHalo = portalHalo;
    this.cycleTransition.portalSpires = portalSpires;
    this.cycleTransition.sentinelRoot = sentinelRoot;
    this.cycleTransition.sentinelModel = sentinelModel;
    this.cycleTransition.sentinelFireCore = sentinelFireCore;
    this.cycleTransition.sentinelFlames = sentinelFlames;
    this.cycleTransition.sentinelGripBeams = sentinelGripBeams;
  }

  updatePortalVisual(dt, openProgress) {
    const transition = this.cycleTransition;
    const progress = clamp(openProgress, 0, 1);

    if (!transition.portalRing || !transition.portalHalo || !transition.portalCore) {
      return;
    }

    transition.portalRing.material.opacity = 0.22 + progress * 0.76;
    transition.portalRing.material.emissiveIntensity = 0.6 + progress * 1;
    transition.portalRing.scale.setScalar(0.1 + progress * 0.9);
    transition.portalHalo.material.opacity = progress * 0.52;
    transition.portalHalo.material.emissiveIntensity = 0.42 + progress * 0.82;
    transition.portalHalo.scale.setScalar(0.16 + progress * 1.18);
    transition.portalCore.material.opacity = 0.1 + progress * 0.72;
    transition.portalCore.scale.setScalar(0.2 + progress * 0.8);
    transition.portalRing.rotation.z += dt * (1.9 + progress * 1.3);
    transition.portalHalo.rotation.z -= dt * (1.2 + progress * 1.2);
    transition.portalCore.rotation.z += dt * (0.5 + progress * 1.1);

    for (const [index, spire] of transition.portalSpires.entries()) {
      spire.material.opacity = progress * 0.78;
      spire.scale.setScalar(0.2 + progress * 0.8);
      spire.rotation.z += dt * (1.4 + index * 0.08 + progress * 1.6);
    }
  }

  setTransitionBeam(beam, start, end, opacity) {
    if (!beam) {
      return;
    }

    const direction = end.clone().sub(start);
    const length = direction.length();
    if (length <= 0.001 || opacity <= 0.01) {
      beam.visible = false;
      beam.material.opacity = 0;
      return;
    }

    beam.visible = true;
    beam.material.opacity = opacity;
    beam.position.copy(start).addScaledVector(direction, 0.5);
    beam.scale.set(1, length, 1);
    beam.quaternion.setFromUnitVectors(PROJECTILE_AXIS, direction.normalize());
  }

  resetTransitionSentinel() {
    const transition = this.cycleTransition;
    if (transition.sentinelRoot) {
      transition.sentinelRoot.visible = false;
      transition.sentinelRoot.position.set(0, 4.4, 1.15);
      transition.sentinelRoot.rotation.set(0, Math.PI, 0);
      transition.sentinelRoot.scale.setScalar(1);
    }

    if (transition.sentinelFireCore?.material) {
      transition.sentinelFireCore.material.opacity = 0;
      transition.sentinelFireCore.material.emissiveIntensity = 1.25;
      transition.sentinelFireCore.scale.setScalar(0.2);
    }

    for (const flame of transition.sentinelFlames) {
      flame.material.opacity = 0;
      flame.scale.set(0.8, 0.2, 0.8);
      flame.position.y = flame.userData.baseHeight ?? flame.position.y;
    }

    for (const beam of transition.sentinelGripBeams) {
      beam.visible = false;
      beam.material.opacity = 0;
      beam.scale.set(1, 0.001, 1);
    }
  }

  updateTransitionSentinelVisual(dt, intensity, beamProgress = 0, grabTargets = null) {
    const transition = this.cycleTransition;
    if (!transition.sentinelRoot || !transition.sentinelModel) {
      return;
    }

    const power = clamp(intensity, 0, 1);
    transition.sentinelRoot.visible = power > 0.01;
    transition.sentinelRoot.rotation.y = Math.PI + Math.sin(this.elapsed * 1.4) * 0.08;

    if (transition.sentinelModel.userData.outerRing) {
      transition.sentinelModel.userData.outerRing.rotation.z += dt * (1.6 + power * 2.2);
    }
    if (transition.sentinelModel.userData.core) {
      const pulse = 1 + power * 0.08 + Math.sin(this.elapsed * 7.2) * 0.05;
      transition.sentinelModel.userData.core.scale.setScalar(pulse);
    }
    if (transition.sentinelModel.userData.leftAntenna) {
      transition.sentinelModel.userData.leftAntenna.rotation.z =
        0.28 + Math.sin(this.elapsed * 4.8) * 0.06;
    }
    if (transition.sentinelModel.userData.rightAntenna) {
      transition.sentinelModel.userData.rightAntenna.rotation.z =
        -0.28 - Math.sin(this.elapsed * 4.8) * 0.06;
    }

    if (transition.sentinelFireCore?.material) {
      transition.sentinelFireCore.material.opacity = 0.12 + power * 0.78;
      transition.sentinelFireCore.material.emissiveIntensity = 1.1 + power * 0.9;
      const firePulse = 0.72 + power * 0.42 + Math.sin(this.elapsed * 8.4) * 0.08;
      transition.sentinelFireCore.scale.setScalar(firePulse);
    }

    for (const [index, flame] of transition.sentinelFlames.entries()) {
      flame.material.opacity = 0.1 + power * 0.76;
      flame.scale.set(
        0.9 + power * 0.22,
        0.45 + power * 1.1 + Math.sin(this.elapsed * 9 + index) * 0.12,
        0.9 + power * 0.18,
      );
      flame.rotation.y += dt * (1.3 + index * 0.16 + power * 1.6);
      flame.position.y =
        (flame.userData.baseHeight ?? flame.position.y) +
        Math.sin(this.elapsed * 5.4 + flame.userData.phase) * 0.12;
    }

    if (grabTargets && beamProgress > 0.01) {
      for (const [index, beam] of transition.sentinelGripBeams.entries()) {
        const localOffset = beam.userData.localOffset ?? new THREE.Vector3();
        const beamStart = transition.sentinelRoot.localToWorld(localOffset.clone());
        this.setTransitionBeam(beam, beamStart, grabTargets[index], beamProgress * 0.84);
      }
      return;
    }

    for (const beam of transition.sentinelGripBeams) {
      beam.visible = false;
      beam.material.opacity = 0;
    }
  }

  applyMapTheme(mapId) {
    if (mapId !== "arena" && mapId !== "epilogue") {
      this.unlockWorld(mapId);
    }
    this.currentMapId = mapId;
    this.pendingMapId = mapId;

    if (this.mapGroups) {
      for (const worldId of WORLD_ORDER) {
        if (this.mapGroups[worldId]) {
          this.mapGroups[worldId].visible = mapId === worldId;
        }
      }
    }
    if (this.epilogueGroup) {
      this.epilogueGroup.visible = mapId === "epilogue";
    }

    const theme = {
      arena: {
        background: 0x050816,
        fog: 0x050816,
        fogNear: 18,
        fogFar: 72,
        hemiColor: 0x94c6ff,
        hemiGround: 0x0b1322,
        hemiIntensity: 1.45,
        dirColor: 0xffffff,
        dirIntensity: 1.35,
        ambient: 0.2,
      },
      rift: {
        background: 0x04060f,
        fog: 0x08110f,
        fogNear: 14,
        fogFar: 62,
        hemiColor: 0x8dffe6,
        hemiGround: 0x09030e,
        hemiIntensity: 1.24,
        dirColor: 0xb8fff1,
        dirIntensity: 1.02,
        ambient: 0.26,
      },
      forge: {
        background: 0x130705,
        fog: 0x190907,
        fogNear: 15,
        fogFar: 64,
        hemiColor: 0xffbb84,
        hemiGround: 0x1a0906,
        hemiIntensity: 1.12,
        dirColor: 0xff9a54,
        dirIntensity: 1.2,
        ambient: 0.24,
      },
      vault: {
        background: 0x05111a,
        fog: 0x081925,
        fogNear: 16,
        fogFar: 68,
        hemiColor: 0xd8feff,
        hemiGround: 0x071019,
        hemiIntensity: 1.3,
        dirColor: 0xaee9ff,
        dirIntensity: 1.16,
        ambient: 0.24,
      },
      neon: {
        background: 0x060b11,
        fog: 0x09111a,
        fogNear: 17,
        fogFar: 70,
        hemiColor: 0x8df9ff,
        hemiGround: 0x07111a,
        hemiIntensity: 1.3,
        dirColor: 0x31ffd8,
        dirIntensity: 1.12,
        ambient: 0.22,
      },
      biograve: {
        background: 0x061008,
        fog: 0x0b1810,
        fogNear: 15,
        fogFar: 64,
        hemiColor: 0xb4ff9a,
        hemiGround: 0x071108,
        hemiIntensity: 1.18,
        dirColor: 0xa0ff74,
        dirIntensity: 1.08,
        ambient: 0.24,
      },
      citadel: {
        background: 0x06040d,
        fog: 0x0b0714,
        fogNear: 14,
        fogFar: 60,
        hemiColor: 0xcdc1ff,
        hemiGround: 0x090510,
        hemiIntensity: 1.22,
        dirColor: 0xa692ff,
        dirIntensity: 1,
        ambient: 0.26,
      },
      helltrack: {
        background: 0x120302,
        fog: 0x1a0604,
        fogNear: 13,
        fogFar: 58,
        hemiColor: 0xffb07a,
        hemiGround: 0x130302,
        hemiIntensity: 1.16,
        dirColor: 0xff5b2f,
        dirIntensity: 1.22,
        ambient: 0.28,
      },
      epilogue: {
        background: 0x05070f,
        fog: 0x05070f,
        fogNear: 10,
        fogFar: 64,
        hemiColor: 0x7aa7ff,
        hemiGround: 0x0a0d1a,
        hemiIntensity: 1.2,
        dirColor: 0x9cc3ff,
        dirIntensity: 1.1,
        ambient: 0.14,
      },
    }[mapId] ?? {
      background: 0x050816,
      fog: 0x050816,
      fogNear: 18,
      fogFar: 72,
      hemiColor: 0x94c6ff,
      hemiGround: 0x0b1322,
      hemiIntensity: 1.45,
      dirColor: 0xffffff,
      dirIntensity: 1.35,
      ambient: 0.2,
    };

    this.scene.background = new THREE.Color(theme.background);
    this.scene.fog = new THREE.Fog(theme.fog, theme.fogNear, theme.fogFar);
    if (this.hemiLight) {
      this.hemiLight.color.set(theme.hemiColor);
      this.hemiLight.groundColor.set(theme.hemiGround);
      this.hemiLight.intensity = theme.hemiIntensity;
    }
    if (this.dirLight) {
      this.dirLight.color.set(theme.dirColor);
      this.dirLight.intensity = theme.dirIntensity;
    }
    if (this.ambientLight) {
      this.ambientLight.intensity = theme.ambient;
    }
  }

  setTransitionScreen(opacity, title = "", copy = "") {
    if (!this.ui.transitionScreen) {
      return;
    }

    const visible = opacity > 0.01;
    this.ui.transitionScreen.hidden = !visible;
    this.ui.transitionScreen.style.opacity = String(clamp(opacity, 0, 1));
    if (this.ui.transitionTitle) {
      this.ui.transitionTitle.textContent = this.translateText(title);
    }
    if (this.ui.transitionCopy) {
      this.ui.transitionCopy.textContent = this.translateText(copy);
    }
  }

  hideTransitionScreen() {
    this.setTransitionScreen(0, "", "");
  }

  showStaticScreen() {
    if (!this.ui.staticScreen) {
      return;
    }
    this.ui.staticScreen.hidden = false;
    this.ui.staticScreen.style.opacity = "1";
  }

  hideStaticScreen() {
    if (!this.ui.staticScreen) {
      return;
    }
    this.ui.staticScreen.hidden = true;
    this.ui.staticScreen.style.opacity = "0";
  }

  showWhiteScreen() {
    if (!this.ui.whiteScreen) {
      return;
    }
    this.ui.whiteScreen.hidden = false;
    this.ui.whiteScreen.style.opacity = "1";
  }

  hideWhiteScreen() {
    if (!this.ui.whiteScreen) {
      return;
    }
    this.ui.whiteScreen.hidden = true;
    this.ui.whiteScreen.style.opacity = "0";
  }

  showCreditsScreen() {
    if (this.ui.creditsScreen) {
      this.ui.creditsScreen.hidden = false;
    }
    this.setCreditsBossSpotlight(0);
  }

  hideCreditsScreen() {
    if (this.ui.creditsScreen) {
      this.ui.creditsScreen.hidden = true;
    }
  }

  setCreditsBossSpotlight(index) {
    const entry = CREDITS_BOSS_REEL[index % CREDITS_BOSS_REEL.length];
    if (!entry) {
      return;
    }
    if (this.ui.creditsBossName) {
      this.ui.creditsBossName.textContent = entry.name;
    }
    if (this.ui.creditsBossCredit) {
      this.ui.creditsBossCredit.textContent = "Modelo por betar + Codex";
    }
    if (this.ui.creditsSeqText) {
      this.ui.creditsSeqText.textContent = `Mostrando boss ${index + 1} / ${CREDITS_BOSS_REEL.length}`;
    }
    if (this.ui.creditsBossOrb) {
      this.ui.creditsBossOrb.style.background = `
        radial-gradient(circle at 50% 38%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0) 28%),
        radial-gradient(circle at 50% 60%, ${entry.colorA}88, ${entry.colorB}55 45%, rgba(0, 0, 0, 0) 72%),
        linear-gradient(135deg, ${entry.colorA}55, ${entry.colorB}55)
      `;
    }
  }

  showTrailerTitleScreen() {
    if (this.ui.trailerTitleScreen) {
      this.ui.trailerTitleScreen.hidden = false;
    }
  }

  hideTrailerTitleScreen() {
    if (this.ui.trailerTitleScreen) {
      this.ui.trailerTitleScreen.hidden = true;
    }
  }

  showCutsceneSubtitle(text) {
    if (this.ui.cutsceneSubtitleText) {
      this.ui.cutsceneSubtitleText.textContent = text ?? "";
    }
    if (this.ui.cutsceneSubtitle) {
      this.ui.cutsceneSubtitle.hidden = false;
    }
  }

  hideCutsceneSubtitle() {
    if (this.ui.cutsceneSubtitle) {
      this.ui.cutsceneSubtitle.hidden = true;
    }
    if (this.ui.cutsceneSubtitleText) {
      this.ui.cutsceneSubtitleText.textContent = "";
    }
  }

  showEpilogueMap() {
    this.applyMapTheme("epilogue");
    if (this.epilogueGroup) {
      this.epilogueGroup.visible = true;
    }
    for (const worldId of WORLD_ORDER) {
      if (this.mapGroups?.[worldId]) {
        this.mapGroups[worldId].visible = false;
      }
    }
  }

  hideEpilogueMap() {
    if (this.epilogueGroup) {
      this.epilogueGroup.visible = false;
    }
  }

  startFinalCutscene() {
    this.phase = "final-cutscene";
    this.finalCutscene.active = true;
    this.finalCutscene.timer = 0;
    this.finalCutscene.lineIndex = 0;
    this.finalCutscene.stage = "lines";
    this.finalCutscene.sceneStarted = false;
    this.finalCutscene.sceneShot = false;
    this.inputs.shoot = false;
    this.weapon.visible = false;
    this.clearCombatEntities();
    this.hideShopWorld();
    this.hideOverlay();
    this.hideFinalCutsceneActors();
    this.hideCutsceneSubtitle();
    this.hideStaticScreen();
    this.hideWhiteScreen();
    this.setTransitionScreen(0, "", "");
    this.showCutsceneSubtitle(FINAL_CUTSCENE_LINES[0]);
    this.spawnFinalCutsceneActors();
    this.finalCutscene.sceneStarted = true;
  }

  updateFinalCutscene(dt) {
    if (!this.finalCutscene.active) {
      return;
    }

    this.finalCutscene.timer += dt;

    if (this.finalCutscene.stage === "lines") {
      const currentLine = FINAL_CUTSCENE_LINES[this.finalCutscene.lineIndex] ?? "";
      this.hideTransitionScreen();
      this.showCutsceneSubtitle(currentLine);
      if (!this.finalCutscene.sceneStarted) {
        this.spawnFinalCutsceneActors();
        this.finalCutscene.sceneStarted = true;
      }
      this.updateFinalCutsceneScene(dt);
      const lastLineIndex = FINAL_CUTSCENE_LINES.length - 1;
      const shotMoment =
        this.finalCutscene.lineIndex === lastLineIndex && this.finalCutscene.timer > 0.45;
      if (shotMoment && !this.finalCutscene.sceneShot) {
        this.finalCutscene.sceneShot = true;
        if (this.cutsceneActors?.muzzleFlash?.material) {
          this.cutsceneActors.muzzleFlash.material.opacity = 1;
        }
        if (this.cutsceneActors?.merchantWeapon) {
          const weaponWorld = new THREE.Vector3();
          if (this.cutsceneActors.muzzleFlash) {
            this.cutsceneActors.muzzleFlash.getWorldPosition(weaponWorld);
          } else {
            this.cutsceneActors.merchantWeapon.getWorldPosition(weaponWorld);
          }
          if (this.cutsceneActors.projectile) {
            this.cutsceneActors.projectile.position.copy(weaponWorld);
          }
        }
        if (this.cutsceneActors?.sentinel) {
          this.cutsceneActors.sentinel.visible = false;
        }
        if (this.cutsceneActors?.projectile?.material) {
          this.cutsceneActors.projectile.material.opacity = 1;
        }
      }
      const duration =
        FINAL_CUTSCENE_DURATIONS[this.finalCutscene.lineIndex] ?? 1.4;
      if (this.finalCutscene.timer >= duration) {
        this.finalCutscene.timer = 0;
        this.finalCutscene.lineIndex += 1;
        if (this.finalCutscene.lineIndex >= FINAL_CUTSCENE_LINES.length) {
          this.finalCutscene.stage = "static";
          this.finalCutscene.timer = 0;
          this.hideCutsceneSubtitle();
          this.hideTransitionScreen();
          this.hideFinalCutsceneActors();
          this.showStaticScreen();
          return;
        }
        const nextLine = FINAL_CUTSCENE_LINES[this.finalCutscene.lineIndex] ?? "";
        this.showCutsceneSubtitle(nextLine);
      }
      return;
    }

    if (this.finalCutscene.stage === "static") {
      if (this.finalCutscene.timer >= FINAL_STATIC_DURATION) {
        this.hideStaticScreen();
        this.startEpilogue();
      }
    }
  }

  startEpilogue() {
    this.finalCutscene.active = false;
    this.finalCutscene.timer = 0;
    this.finalCutscene.lineIndex = 0;
    this.finalCutscene.stage = "lines";
    this.hideTransitionScreen();
    this.hideWhiteScreen();
    this.showEpilogueMap();
    this.phase = "epilogue";
    this.epilogue.wallHit = false;
    this.epilogue.whiteoutTimer = 0;
    this.player.position.set(0, PLAYER_HEIGHT, 8);
    this.player.verticalVelocity = 0;
    this.player.grounded = true;
    this.weapon.visible = true;
    this.inputs.shoot = false;
    this.camera.rotation.set(-0.08, 0, 0);
    this.camera.position.copy(this.player.position);
  }

  startCreditsSequence() {
    this.gameOver = false;
    this.phase = "credits";
    this.postgame.creditsTimer = 0;
    this.postgame.creditsIndex = 0;
    this.inputs.shoot = false;
    document.exitPointerLock();
    this.hideOverlay();
    this.hideCutsceneSubtitle();
    this.hideStaticScreen();
    this.hideWhiteScreen();
    this.hideTrailerTitleScreen();
    this.showCreditsScreen();
  }

  updateCredits(dt) {
    this.postgame.creditsTimer += dt;
    const creditsIndex = Math.floor(this.postgame.creditsTimer / CREDITS_BOSS_STEP);
    if (creditsIndex !== this.postgame.creditsIndex) {
      this.postgame.creditsIndex = creditsIndex;
      this.setCreditsBossSpotlight(creditsIndex);
    }
    if (this.postgame.creditsTimer >= CREDITS_DURATION) {
      this.hideCreditsScreen();
      this.startSequelTrailer();
    }
  }

  startSequelTrailer() {
    this.phase = "sequel-trailer";
    this.postgame.trailerTimer = 0;
    this.inputs.shoot = false;
    this.hideOverlay();
    this.hideTrailerTitleScreen();
    this.showEpilogueMap();
    for (const portal of this.epilogue.trailerPortals) {
      portal.visible = false;
      portal.scale.setScalar(0.01);
      if (portal.material) {
        portal.material.opacity = 0;
      }
    }
    for (const enemy of this.epilogue.trailerEnemies) {
      enemy.visible = false;
      enemy.position.y = enemy.userData.baseY ?? 0.9;
      enemy.position.z = enemy.userData.baseZ ?? enemy.position.z;
      enemy.position.x = enemy.userData.baseX ?? enemy.position.x;
      enemy.rotation.set(0, 0, 0);
      if (enemy.material?.emissiveIntensity !== undefined) {
        enemy.material.emissiveIntensity = 0.5;
      }
    }
    this.player.position.set(0, PLAYER_HEIGHT, 8);
    this.player.verticalVelocity = 0;
    this.player.grounded = true;
    this.camera.position.set(0, 2.6, 11.4);
    this.camera.rotation.set(0, 0, 0);
  }

  updateSequelTrailer(dt) {
    this.postgame.trailerTimer += dt;
    const t = this.postgame.trailerTimer;

    this.camera.position.lerp(new THREE.Vector3(0, 2.3, 6.2), 0.03);
    this.camera.lookAt(new THREE.Vector3(0, 1.8, -18));

    const riseStrength = clamp((t - 0.8) / 4.8, 0, 1);
    for (const [index, building] of this.epilogue.cityBuildings.entries()) {
      const baseY = building.userData.baseY ?? building.position.y;
      const wave = Math.sin(this.elapsed * 1.6 + index * 0.7) * 0.26;
      const lift = riseStrength * (5.8 + (index % 3) * 2.2);
      building.position.y = baseY + lift + wave;
      building.rotation.z = Math.sin(this.elapsed * 0.8 + index) * 0.05 * riseStrength;
    }

    for (const portal of this.epilogue.trailerPortals) {
      const open = clamp((t - (portal.userData.triggerTime ?? 2)) / 0.8, 0, 1);
      portal.visible = open > 0;
      portal.scale.setScalar(Math.max(0.01, open));
      portal.rotation.z += dt * (1.8 + open);
      if (portal.material) {
        portal.material.opacity = open * 0.95;
      }
    }

    for (const enemy of this.epilogue.trailerEnemies) {
      const emerge = clamp((t - (enemy.userData.triggerTime ?? 2.3)) / 1.2, 0, 1);
      enemy.visible = emerge > 0;
      const baseY = enemy.userData.baseY ?? 0.9;
      const baseZ = enemy.userData.baseZ ?? enemy.position.z;
      const baseX = enemy.userData.baseX ?? enemy.position.x;
      const speed = enemy.userData.forwardSpeed ?? 4.5;
      enemy.position.y = baseY + emerge * 1.7;
      enemy.position.z = baseZ + Math.max(0, t - (enemy.userData.triggerTime ?? 2.3)) * speed;
      enemy.position.x = THREE.MathUtils.lerp(baseX, baseX * 0.32, emerge * 0.7);
      enemy.rotation.y = Math.atan2(-enemy.position.x, 1.8);
      if (enemy.material?.emissiveIntensity !== undefined) {
        enemy.material.emissiveIntensity = 0.45 + emerge * 0.45;
      }
    }

    if (t >= TRAILER_TITLE_START) {
      this.showTrailerTitleScreen();
    }

    if (t >= TRAILER_DURATION) {
      this.hideTrailerTitleScreen();
      this.completeHellTrackRun();
    }
  }

  updateEpilogue(dt) {
    this.updatePlayer(dt);
    this.updateHud();
    const hitInvisibleWall = Math.abs(this.player.position.x) >= EPILOGUE_SIDE_LIMIT;
    this.player.position.x = clamp(
      this.player.position.x,
      -EPILOGUE_SIDE_LIMIT,
      EPILOGUE_SIDE_LIMIT,
    );
    if (hitInvisibleWall && !this.epilogue.wallHit) {
      this.epilogue.wallHit = true;
      this.epilogue.whiteoutTimer = 0;
      this.phase = "epilogue-whiteout";
      this.inputs.shoot = false;
      this.showWhiteScreen();
      return;
    }
    if (this.player.position.z <= this.epilogue.endZ) {
      this.completeHellTrackRun();
    }
  }

  updateEpilogueWhiteout(dt) {
    this.epilogue.whiteoutTimer += dt;
    this.updateHud();
    if (this.epilogue.whiteoutTimer >= EPILOGUE_WHITEOUT_DURATION) {
      this.hideWhiteScreen();
      this.completeHellTrackRun();
    }
  }

  getProgressionMapId(cycleCount) {
    return getMapIdForCycle(cycleCount);
  }

  getWorldTransitionCopy(worldId, phase = "wake", specialIntro = false) {
    const label = WORLD_DEFS[worldId]?.label ?? "la siguiente zona";
    if (phase === "blackout") {
      return specialIntro
        ? `Null Sentinel te arroja directo a ${label}.`
        : `El portal te arrastra hacia ${label}.`;
    }

    return specialIntro
      ? `El impacto todavia retumba mientras despiertas en ${label}.`
      : `${label} empieza a desplegarse a tu alrededor.`;
  }

  getCycleReadyCopy(worldId) {
    const label = WORLD_DEFS[worldId]?.label ?? "la arena";
    return `Zona activa: ${label}. ${getCyclePreviewText(this.cycleCount)} El descanso termino y la zona ya preparo otra vez la wave 0. Haz click para volver a bloquear el mouse y seguir.`;
  }

  ensureAudioReady() {
    if (this.audio.initialized) {
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }

    const context = new AudioContextClass();
    const compressor = context.createDynamicsCompressor();
    const masterGain = context.createGain();
    const musicGain = context.createGain();
    const sfxGain = context.createGain();

    compressor.threshold.value = -20;
    compressor.knee.value = 18;
    compressor.ratio.value = 3.5;
    compressor.attack.value = 0.01;
    compressor.release.value = 0.2;

    masterGain.gain.value = this.audio.baseMasterGain;
    musicGain.gain.value = this.audio.baseMusicGain;
    sfxGain.gain.value = this.audio.baseSfxGain;

    musicGain.connect(masterGain);
    sfxGain.connect(masterGain);
    masterGain.connect(compressor);
    compressor.connect(context.destination);

    this.audio.initialized = true;
    this.audio.context = context;
    this.audio.compressor = compressor;
    this.audio.masterGain = masterGain;
    this.audio.musicGain = musicGain;
    this.audio.sfxGain = sfxGain;
    this.audio.nextBeatTime = context.currentTime + 0.05;
    this.audio.step = 0;
  }

  playUnlockChime() {
    if (!this.audio.context) {
      return;
    }

    const now = this.audio.context.currentTime + 0.01;
    this.scheduleTone({
      frequency: 392,
      when: now,
      duration: 0.16,
      volume: 0.11,
      type: "triangle",
    });
    this.scheduleTone({
      frequency: 523,
      when: now + 0.08,
      duration: 0.2,
      volume: 0.14,
      type: "sine",
    });
  }

  resumeAudio() {
    this.ensureAudioReady();
    if (!this.audio.context) {
      return;
    }

    this.audio.context
      .resume()
      .then(() => {
        this.audio.unlocked = this.audio.context?.state === "running";
        if (this.audio.unlocked && this.audio.nextBeatTime < this.audio.context.currentTime) {
          this.audio.nextBeatTime = this.audio.context.currentTime + 0.05;
        }

        if (this.audio.unlocked && !this.audio.unlockChimePlayed) {
          this.audio.unlockChimePlayed = true;
          this.playUnlockChime();
        }
      })
      .catch(() => {});
  }

  setAudioPaused(isPaused) {
    if (!this.audio.context || !this.audio.masterGain || !this.audio.musicGain || !this.audio.sfxGain) {
      return;
    }

    if (this.audio.isPaused === isPaused) {
      return;
    }

    this.audio.isPaused = isPaused;
    const now = this.audio.context.currentTime;
    const masterTarget = isPaused ? 0.15 : this.audio.baseMasterGain;
    const musicTarget = isPaused ? 0 : this.audio.baseMusicGain;
    const sfxTarget = isPaused ? Math.min(this.audio.baseSfxGain, 0.35) : this.audio.baseSfxGain;

    this.audio.masterGain.gain.cancelScheduledValues(now);
    this.audio.musicGain.gain.cancelScheduledValues(now);
    this.audio.sfxGain.gain.cancelScheduledValues(now);

    this.audio.masterGain.gain.setTargetAtTime(masterTarget, now, 0.12);
    this.audio.musicGain.gain.setTargetAtTime(musicTarget, now, 0.12);
    this.audio.sfxGain.gain.setTargetAtTime(sfxTarget, now, 0.12);
  }

  getMusicThemeKey() {
    if (this.phase === "credits") {
      return "infernoBoss";
    }

    if (this.phase === "sequel-trailer") {
      return "riftBoss";
    }

    if (this.phase === "cycle-transition") {
      return "transition";
    }

    if (this.phase === "shop") {
      return "shop";
    }

    const worldThemePrefix = {
      arena: "arena",
      rift: "rift",
      forge: "inferno",
      vault: "frost",
      neon: "neon",
      biograve: "grave",
      citadel: "rift",
      helltrack: "inferno",
    }[this.currentMapId] ?? "arena";

    if (this.currentBoss) {
      return `${worldThemePrefix}Boss`;
    }

    return `${worldThemePrefix}Combat`;
  }

  getMusicProfile(themeKey) {
    const profiles = {
      arenaCombat: {
        stepDuration: 0.28,
        wave: "triangle",
        accentWave: "square",
        melody: [196, 247, 294, 247, 220, 294, 330, 247],
        bass: [98, 98, 123, 98],
      },
      arenaBoss: {
        stepDuration: 0.24,
        wave: "sawtooth",
        accentWave: "square",
        melody: [147, 175, 220, 247, 220, 175, 196, 247],
        bass: [73, 73, 82, 92],
      },
      riftCombat: {
        stepDuration: 0.26,
        wave: "triangle",
        accentWave: "sine",
        melody: [220, 262, 311, 349, 311, 262, 233, 349],
        bass: [110, 104, 117, 98],
      },
      riftBoss: {
        stepDuration: 0.22,
        wave: "sawtooth",
        accentWave: "triangle",
        melody: [165, 196, 233, 277, 247, 196, 233, 311],
        bass: [82, 92, 98, 104],
      },
      infernoCombat: {
        stepDuration: 0.24,
        wave: "sawtooth",
        accentWave: "triangle",
        melody: [147, 175, 196, 220, 196, 175, 147, 233],
        bass: [73, 82, 73, 92],
      },
      infernoBoss: {
        stepDuration: 0.2,
        wave: "square",
        accentWave: "sawtooth",
        melody: [131, 147, 175, 196, 220, 196, 175, 247],
        bass: [65, 73, 82, 87],
      },
      frostCombat: {
        stepDuration: 0.28,
        wave: "triangle",
        accentWave: "sine",
        melody: [262, 294, 349, 392, 349, 294, 262, 330],
        bass: [131, 147, 131, 165],
      },
      frostBoss: {
        stepDuration: 0.22,
        wave: "triangle",
        accentWave: "square",
        melody: [196, 220, 262, 294, 262, 220, 196, 330],
        bass: [98, 110, 123, 131],
      },
      neonCombat: {
        stepDuration: 0.23,
        wave: "square",
        accentWave: "triangle",
        melody: [247, 311, 370, 311, 277, 349, 311, 415],
        bass: [123, 156, 138, 165],
      },
      neonBoss: {
        stepDuration: 0.19,
        wave: "square",
        accentWave: "sawtooth",
        melody: [175, 220, 262, 311, 262, 220, 311, 349],
        bass: [87, 110, 131, 147],
      },
      graveCombat: {
        stepDuration: 0.27,
        wave: "triangle",
        accentWave: "sine",
        melody: [196, 233, 262, 233, 208, 233, 277, 262],
        bass: [98, 117, 104, 131],
      },
      graveBoss: {
        stepDuration: 0.21,
        wave: "sawtooth",
        accentWave: "triangle",
        melody: [147, 175, 208, 233, 208, 175, 233, 262],
        bass: [73, 87, 104, 117],
      },
      shop: {
        stepDuration: 0.34,
        wave: "triangle",
        accentWave: "sine",
        melody: [330, 392, 440, 392, 349, 392, 494, 440],
        bass: [165, 196, 220, 196],
      },
      transition: {
        stepDuration: 0.2,
        wave: "sine",
        accentWave: "triangle",
        melody: [220, 233, 247, 262, 277, 262, 247, 233],
        bass: [110, 117, 124, 131],
      },
    };

    return profiles[themeKey] ?? profiles.arenaCombat;
  }

  scheduleTone({
    frequency,
    when,
    duration,
    volume,
    type = "triangle",
    attack = 0.01,
    release = 0.06,
    targetGain = this.audio.sfxGain,
    detune = 0,
  }) {
    if (!this.audio.context || !targetGain || frequency <= 0) {
      return;
    }

    const safeWhen = Math.max(when, this.audio.context.currentTime + 0.001);
    const oscillator = this.audio.context.createOscillator();
    const gainNode = this.audio.context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, safeWhen);
    oscillator.detune.setValueAtTime(detune, safeWhen);

    gainNode.gain.setValueAtTime(0.0001, safeWhen);
    gainNode.gain.exponentialRampToValueAtTime(volume, safeWhen + attack);
    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      Math.max(safeWhen + attack + 0.01, safeWhen + duration + release),
    );

    oscillator.connect(gainNode);
    gainNode.connect(targetGain);
    oscillator.start(safeWhen);
    oscillator.stop(
      Math.max(safeWhen + attack + 0.02, safeWhen + duration + release + 0.02),
    );
  }

  scheduleMusicStep(profile, when, step) {
    const melodyFrequency = profile.melody[step % profile.melody.length];
    const bassFrequency = profile.bass[step % profile.bass.length];
    const accentStep = step % 4 === 0;

    this.scheduleTone({
      frequency: bassFrequency,
      when,
      duration: profile.stepDuration * 0.9,
      volume: 0.045,
      type: "sine",
      attack: 0.012,
      release: 0.08,
      targetGain: this.audio.musicGain,
    });
    this.scheduleTone({
      frequency: melodyFrequency,
      when: when + profile.stepDuration * 0.06,
      duration: profile.stepDuration * 0.7,
      volume: accentStep ? 0.04 : 0.028,
      type: profile.wave,
      attack: 0.01,
      release: 0.06,
      targetGain: this.audio.musicGain,
    });

    if (accentStep) {
      this.scheduleTone({
        frequency: melodyFrequency * 2,
        when: when + profile.stepDuration * 0.08,
        duration: profile.stepDuration * 0.36,
        volume: 0.018,
        type: profile.accentWave,
        attack: 0.008,
        release: 0.04,
        targetGain: this.audio.musicGain,
      });
    }
  }

  updateAudio(dt) {
    if (!this.audio.initialized || !this.audio.context) {
      return;
    }

    if (this.audio.context.state !== "running") {
      return;
    }

    if (this.audio.isPaused) {
      return;
    }

    if (!this.audio.unlocked) {
      this.audio.unlocked = true;
    }

    const themeKey = this.getMusicThemeKey();
    if (this.audio.themeKey !== themeKey) {
      this.audio.themeKey = themeKey;
      this.audio.step = 0;
      this.audio.nextBeatTime = this.audio.context.currentTime + 0.04;
    }

    const profile = this.getMusicProfile(themeKey);
    while (this.audio.nextBeatTime < this.audio.context.currentTime + 0.16) {
      this.scheduleMusicStep(profile, this.audio.nextBeatTime, this.audio.step);
      this.audio.nextBeatTime += profile.stepDuration;
      this.audio.step += 1;
    }
  }

  playPlayerShotSfx() {
    if (!this.audio.context || !this.audio.unlocked) {
      return;
    }

    const now = this.audio.context.currentTime;
    if (now - this.audio.lastPlayerShotAt < 0.045) {
      return;
    }

    this.audio.lastPlayerShotAt = now;
    this.scheduleTone({ frequency: 760, when: now, duration: 0.05, volume: 0.045, type: "square" });
    this.scheduleTone({
      frequency: 420,
      when: now + 0.01,
      duration: 0.08,
      volume: 0.03,
      type: "triangle",
      attack: 0.004,
      release: 0.05,
    });
  }

  playEnemyShotSfx(isBoss = false) {
    if (!this.audio.context || !this.audio.unlocked) {
      return;
    }

    const now = this.audio.context.currentTime;
    const minGap = isBoss ? 0.08 : 0.16;
    if (now - this.audio.lastEnemyShotAt < minGap) {
      return;
    }

    this.audio.lastEnemyShotAt = now;
    this.scheduleTone({
      frequency: isBoss ? 210 : 260,
      when: now,
      duration: isBoss ? 0.12 : 0.08,
      volume: isBoss ? 0.05 : 0.026,
      type: isBoss ? "sawtooth" : "square",
      attack: 0.004,
      release: 0.05,
    });
  }

  playDamageSfx() {
    if (!this.audio.context || !this.audio.unlocked) {
      return;
    }

    const now = this.audio.context.currentTime;
    if (now - this.audio.lastDamageAt < 0.14) {
      return;
    }

    this.audio.lastDamageAt = now;
    this.scheduleTone({
      frequency: 132,
      when: now,
      duration: 0.12,
      volume: 0.045,
      type: "sawtooth",
      attack: 0.004,
      release: 0.08,
    });
  }

  playPickupSfx() {
    if (!this.audio.context || !this.audio.unlocked) {
      return;
    }

    const now = this.audio.context.currentTime;
    this.scheduleTone({ frequency: 523, when: now, duration: 0.08, volume: 0.04, type: "triangle" });
    this.scheduleTone({ frequency: 659, when: now + 0.06, duration: 0.12, volume: 0.034, type: "sine" });
  }

  playUpgradeSfx() {
    if (!this.audio.context || !this.audio.unlocked) {
      return;
    }

    const now = this.audio.context.currentTime;
    for (const [index, frequency] of [392, 494, 587].entries()) {
      this.scheduleTone({
        frequency,
        when: now + index * 0.03,
        duration: 0.14,
        volume: 0.032,
        type: "triangle",
      });
    }
  }

  playShieldSfx(isBreak = false) {
    if (!this.audio.context || !this.audio.unlocked) {
      return;
    }

    const now = this.audio.context.currentTime;
    if (!isBreak && now - this.audio.lastImpactAt < 0.06) {
      return;
    }

    this.audio.lastImpactAt = now;
    this.scheduleTone({
      frequency: isBreak ? 420 : 780,
      when: now,
      duration: isBreak ? 0.18 : 0.08,
      volume: isBreak ? 0.05 : 0.034,
      type: isBreak ? "sawtooth" : "triangle",
      attack: 0.004,
      release: 0.08,
    });
    this.scheduleTone({
      frequency: isBreak ? 620 : 980,
      when: now + 0.03,
      duration: isBreak ? 0.16 : 0.07,
      volume: isBreak ? 0.034 : 0.024,
      type: "sine",
      attack: 0.004,
      release: 0.06,
    });
  }

  playKillSfx(isBoss = false) {
    if (!this.audio.context || !this.audio.unlocked) {
      return;
    }

    const now = this.audio.context.currentTime;
    this.scheduleTone({
      frequency: isBoss ? 180 : 220,
      when: now,
      duration: isBoss ? 0.3 : 0.16,
      volume: isBoss ? 0.055 : 0.03,
      type: isBoss ? "sawtooth" : "triangle",
      attack: 0.004,
      release: 0.14,
    });
  }

  playWaveRevealSfx() {
    if (!this.audio.context || !this.audio.unlocked) {
      return;
    }

    const now = this.audio.context.currentTime + 0.01;
    this.scheduleTone({
      frequency: 196,
      when: now,
      duration: 0.12,
      volume: 0.055,
      type: "sawtooth",
      attack: 0.004,
      release: 0.08,
    });
    this.scheduleTone({
      frequency: 294,
      when: now + 0.08,
      duration: 0.12,
      volume: 0.05,
      type: "square",
      attack: 0.004,
      release: 0.08,
    });
    this.scheduleTone({
      frequency: 392,
      when: now + 0.16,
      duration: 0.16,
      volume: 0.048,
      type: "triangle",
      attack: 0.004,
      release: 0.1,
    });
  }

  createShopUpgradeStand(upgradeId, position) {
    const root = new THREE.Group();
    root.position.copy(position);

    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.72, 0.98, 1.42, 10),
      new THREE.MeshStandardMaterial({
        color: 0x211912,
        roughness: 0.44,
        metalness: 0.78,
      }),
    );
    pedestal.position.y = 0.72;
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    root.add(pedestal);

    const plate = new THREE.Mesh(
      new THREE.CylinderGeometry(1.08, 1.18, 0.2, 18),
      new THREE.MeshStandardMaterial({
        color: 0x3b2b18,
        roughness: 0.26,
        metalness: 0.88,
        emissive: 0xffd166,
        emissiveIntensity: 0.12,
      }),
    );
    plate.position.y = 1.48;
    plate.castShadow = true;
    plate.receiveShadow = true;
    root.add(plate);

    const core = this.createShopUpgradeModel(upgradeId);
    core.position.y = 2.34;
    core.userData.shopUpgrade = upgradeId;
    root.add(core);

    root.userData.shopUpgrade = upgradeId;
    root.userData.core = core;
    root.userData.pedestal = pedestal;
    root.userData.plate = plate;

    return { id: upgradeId, root, core, pedestal, plate };
  }

  createShopUpgradeModel(upgradeId) {
    const group = new THREE.Group();

    const accentColors = {
      damage: 0xff755d,
      fireRate: 0x5cf2ff,
      maxShield: 0x8df9ff,
      loot: 0x7cff91,
      projectileSpeed: 0xffc4f2,
      pierce: 0xb7ff6a,
      killShield: 0x7cffd1,
      damageResist: 0x68d2ff,
      hitShield: 0xff8df1,
      mobility: 0xffd166,
      weaponBurst: 0xffa84c,
      weaponShotgun: 0xff6be6,
      weaponRail: 0x7a9cff,
      weaponSMG: 0x66ffd7,
      weaponPlasma: 0xa77dff,
    };

    const color = accentColors[upgradeId] ?? 0xffd166;
    const shellMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e253d,
      roughness: 0.24,
      metalness: 0.82,
    });
    const glowMaterial = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.88,
      roughness: 0.12,
      metalness: 0.92,
    });

    if (upgradeId === "damage") {
      const shard = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.62, 0),
        glowMaterial,
      );
      shard.scale.set(0.8, 1.25, 0.8);
      group.add(shard);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.78, 0.05, 12, 28),
        shellMaterial,
      );
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
    } else if (upgradeId === "fireRate") {
      for (const x of [-0.28, 0, 0.28]) {
        const barrel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 1.1, 12),
          glowMaterial,
        );
        barrel.rotation.z = Math.PI / 2;
        barrel.position.set(x, 0, 0);
        group.add(barrel);
      }
      const casing = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.22, 0.32),
        shellMaterial,
      );
      casing.position.y = -0.22;
      group.add(casing);
    } else if (upgradeId === "maxShield") {
      const orb = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.58, 0),
        glowMaterial,
      );
      group.add(orb);

      const shell = new THREE.Mesh(
        new THREE.TorusGeometry(0.88, 0.08, 12, 24),
        shellMaterial,
      );
      shell.rotation.z = Math.PI / 2;
      group.add(shell);
    } else if (upgradeId === "loot") {
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.44, 16, 16),
        glowMaterial,
      );
      group.add(core);

      const haloA = new THREE.Mesh(
        new THREE.TorusGeometry(0.8, 0.06, 12, 28),
        shellMaterial,
      );
      haloA.rotation.x = Math.PI / 2;
      group.add(haloA);

      const haloB = haloA.clone();
      haloB.rotation.y = Math.PI / 2;
      group.add(haloB);
    } else if (upgradeId === "projectileSpeed") {
      const spike = new THREE.Mesh(
        new THREE.ConeGeometry(0.32, 1.05, 8),
        glowMaterial,
      );
      spike.position.y = 0.2;
      group.add(spike);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.68, 0.08, 12, 24),
        shellMaterial,
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -0.2;
      group.add(ring);
    } else if (upgradeId === "pierce") {
      const spear = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.14, 1.1, 10),
        glowMaterial,
      );
      spear.rotation.z = Math.PI / 2;
      group.add(spear);

      const tip = new THREE.Mesh(
        new THREE.ConeGeometry(0.22, 0.5, 10),
        glowMaterial,
      );
      tip.rotation.z = -Math.PI / 2;
      tip.position.set(0.62, 0, 0);
      group.add(tip);
    } else if (upgradeId === "killShield") {
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.36, 14, 14),
        glowMaterial,
      );
      group.add(orb);

      const cross = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.16, 0.16),
        glowMaterial,
      );
      group.add(cross);

      const crossB = cross.clone();
      crossB.rotation.z = Math.PI / 2;
      group.add(crossB);
    } else if (upgradeId === "damageResist") {
      const shield = new THREE.Mesh(
        new THREE.CylinderGeometry(0.52, 0.7, 0.86, 14),
        glowMaterial,
      );
      shield.position.y = 0.06;
      group.add(shield);

      const plate = new THREE.Mesh(
        new THREE.TorusGeometry(0.68, 0.08, 12, 24),
        shellMaterial,
      );
      plate.rotation.x = Math.PI / 2;
      plate.position.y = -0.12;
      group.add(plate);
    } else if (upgradeId === "hitShield") {
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.34, 14, 14),
        glowMaterial,
      );
      group.add(orb);

      for (const angle of [0, Math.PI / 2]) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.68, 0.06, 12, 24),
          shellMaterial,
        );
        ring.rotation.set(angle, Math.PI / 2, 0);
        group.add(ring);
      }
    } else if (upgradeId === "mobility") {
      const wingL = new THREE.Mesh(
        new THREE.BoxGeometry(0.66, 0.14, 0.24),
        glowMaterial,
      );
      wingL.position.set(-0.34, 0, 0);
      wingL.rotation.z = 0.2;
      group.add(wingL);

      const wingR = wingL.clone();
      wingR.position.x = 0.34;
      wingR.rotation.z = -0.2;
      group.add(wingR);

      const core = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 0.72, 10),
        shellMaterial,
      );
      core.rotation.z = Math.PI / 2;
      group.add(core);
    } else if (upgradeId === "weaponBurst") {
      for (const x of [-0.38, 0, 0.38]) {
        const barrel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.11, 0.11, 0.9, 10),
          glowMaterial,
        );
        barrel.rotation.z = Math.PI / 2;
        barrel.position.set(x, 0.08, 0);
        group.add(barrel);
      }
      const casing = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.24, 0.34),
        shellMaterial,
      );
      casing.position.y = -0.18;
      group.add(casing);
    } else if (upgradeId === "weaponShotgun") {
      const core = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.42, 0.9, 12),
        glowMaterial,
      );
      core.rotation.z = Math.PI / 2;
      group.add(core);

      const guard = new THREE.Mesh(
        new THREE.TorusGeometry(0.58, 0.08, 12, 20),
        shellMaterial,
      );
      guard.rotation.x = Math.PI / 2;
      guard.position.y = -0.12;
      group.add(guard);
    } else if (upgradeId === "weaponRail") {
      const rail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 1.35, 12),
        glowMaterial,
      );
      rail.rotation.z = Math.PI / 2;
      group.add(rail);

      const coil = new THREE.Mesh(
        new THREE.TorusGeometry(0.46, 0.08, 10, 24),
        shellMaterial,
      );
      coil.rotation.y = Math.PI / 2;
      group.add(coil);
    } else if (upgradeId === "weaponSMG") {
      const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 1.15, 12),
        glowMaterial,
      );
      barrel.rotation.z = Math.PI / 2;
      group.add(barrel);

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.86, 0.22, 0.32),
        shellMaterial,
      );
      body.position.y = -0.16;
      group.add(body);

      const mag = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.3, 0.14),
        glowMaterial,
      );
      mag.position.set(-0.08, -0.36, 0);
      group.add(mag);
    } else if (upgradeId === "weaponPlasma") {
      for (const x of [-0.2, 0.2]) {
        const orb = new THREE.Mesh(
          new THREE.SphereGeometry(0.22, 14, 14),
          glowMaterial,
        );
        orb.position.set(x, 0.05, 0);
        group.add(orb);
      }

      const rail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 1, 10),
        shellMaterial,
      );
      rail.rotation.z = Math.PI / 2;
      rail.position.y = -0.18;
      group.add(rail);
    }

    group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.userData.shopUpgrade = upgradeId;
      }
    });

    return group;
  }

  setupUI() {
    this.setupInstallPrompt();
    this.resolveDevAccess();
    this.syncAllyLoadoutFromSettings();
    this.updateTranslationUi();
    this.updatePersistenceUi();
    this.updateDifficultyUi();
    this.updateDevUi();
    this.rebuildAlliesSettingsUi();
    this.populateDevOptions();
    this.updateWorldUi();
    this.updateShopUi();
    this.showOverlay(
      "Bot Breaker 3D",
      this.getMenuOverlayCopy(this.getSelectedWorldId()),
      "Entrar al combate",
      { showSettings: true, showShop: false, showActions: true, showWorldSelect: true },
    );
    this.updateInstallCta();
  }

  setupInstallPrompt() {
    if (this.installPromptBound || !this.isTouchDevice || this.isStandaloneApp) {
      return;
    }

    this.installPromptBound = true;

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      this.installPromptEvent = event;
      this.updateInstallCta();
    });

    window.addEventListener("appinstalled", () => {
      this.installPromptEvent = null;
      this.isStandaloneApp = true;
      this.updateInstallCta();
    });
  }

  canShowInstallPrompt() {
    return (
      this.isTouchDevice &&
      !this.isStandaloneApp &&
      !this.installDismissed &&
      Boolean(this.installPromptEvent)
    );
  }

  updateInstallCta() {
    if (!this.ui?.overlayInstall) {
      return;
    }
    const canShow = this.canShowInstallPrompt();
    this.ui.overlayInstall.hidden = !canShow;
    this.ui.overlayInstall.disabled = !canShow;
    if (canShow) {
      this.ui.overlayInstall.textContent = this.tr("Instalar juego", "Install game");
    }
  }

  async handleInstallPrompt() {
    if (!this.installPromptEvent) {
      return;
    }

    const promptEvent = this.installPromptEvent;
    this.installPromptEvent = null;

    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice?.outcome !== "accepted") {
        this.installDismissed = true;
      }
    } catch {
      this.installDismissed = true;
    }

    this.updateInstallCta();
  }

  setupEvents() {
    window.addEventListener("resize", () => this.onResize());

    window.addEventListener("keydown", (event) => {
      this.resumeAudio();
      if (event.code === "KeyW") this.inputs.forward = true;
      if (event.code === "KeyS") this.inputs.backward = true;
      if (event.code === "KeyA") this.inputs.left = true;
      if (event.code === "KeyD") this.inputs.right = true;
      if (event.code === "Space") {
        event.preventDefault();
        this.tryJump();
      }

      if (event.code === "KeyR") {
        this.resetRun();

        if (this.pointerLocked) {
          this.hideOverlay();
        } else {
          this.requestPointerLock();
        }
      }

      if (event.code === "KeyP" && !event.repeat) {
        this.takeScreenshot();
      }
    });

    window.addEventListener("keyup", (event) => {
      if (event.code === "KeyW") this.inputs.forward = false;
      if (event.code === "KeyS") this.inputs.backward = false;
      if (event.code === "KeyA") this.inputs.left = false;
      if (event.code === "KeyD") this.inputs.right = false;
      if (event.code === "Space") {
        event.preventDefault();
      }
    });

    window.addEventListener("mousedown", (event) => {
      this.resumeAudio();
      if (event.button !== 0 || !this.pointerLocked) {
        return;
      }

      this.inputs.shoot = true;
    });

    window.addEventListener("mouseup", (event) => {
      if (event.button === 0) {
        this.inputs.shoot = false;
      }
    });

    document.addEventListener("mousemove", (event) => {
      if (this.phase === "shop" && !this.pointerLocked) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.screenPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.screenPointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        this.shopPointer.x = event.clientX;
        this.shopPointer.y = event.clientY;
        this.updateShopHover();
        return;
      }

      if (!this.pointerLocked || this.gameOver) {
        return;
      }

      this.camera.rotation.y -= event.movementX * this.mouseSensitivity;
      this.camera.rotation.x -= event.movementY * this.mouseSensitivity;
      this.camera.rotation.x = clamp(this.camera.rotation.x, -1.18, 1.18);
    });

    document.addEventListener("pointerlockchange", () => {
      this.pointerLocked = document.pointerLockElement === this.renderer.domElement;

      if (this.pointerLocked) {
        this.setAudioPaused(false);
        this.hideOverlay();
      } else if (
        !this.gameOver &&
        this.phase !== "shop" &&
        this.phase !== "cycle-transition" &&
        this.phase !== "final-cutscene" &&
        this.phase !== "epilogue" &&
        this.phase !== "epilogue-whiteout" &&
        this.phase !== "credits" &&
        this.phase !== "sequel-trailer"
      ) {
        this.setAudioPaused(true);
        this.showPauseOverlay();
      } else {
        this.setAudioPaused(false);
      }
    });

    this.renderer.domElement.addEventListener("click", () => {
      this.resumeAudio();
      if (this.isTouchDevice) {
        return;
      }
      if (this.phase === "shop" && !this.pointerLocked) {
        this.buyHoveredUpgrade();
        return;
      }

      if (this.phase === "cycle-transition") {
        return;
      }

      if (!this.pointerLocked && !this.gameOver && this.phase !== "shop") {
        this.requestPointerLock();
      }
    });

    this.ui.overlayButton?.addEventListener("click", () => {
      this.resumeAudio();
      if (!this.ui.worldPanel?.hidden) {
        this.resetRun();
        this.requestPointerLock();
        return;
      }

      if (this.gameOver) {
        this.resetRun();
        this.requestPointerLock();
        return;
      }

      this.requestPointerLock();
    });

    this.ui.overlayCredits?.addEventListener("click", () => {
      this.resumeAudio();
      if (this.phase === "victory" && this.gameOver) {
        this.startCreditsSequence();
      }
    });

    this.ui.overlayInstallPc?.addEventListener("click", () => {
      this.resumeAudio();
      this.openPcInstallerPage();
    });

    this.ui.overlayInstall?.addEventListener("click", async () => {
      this.resumeAudio();
      await this.handleInstallPrompt();
    });

    this.ui.settingsToggle?.addEventListener("click", () => {
      this.toggleSettingsPanel();
    });

    this.ui.settingsClose?.addEventListener("click", () => {
      this.toggleSettingsPanel(false);
    });

    this.ui.alliesToggle?.addEventListener("click", () => {
      this.toggleAlliesPanel();
    });

    this.ui.alliesSettingsClose?.addEventListener("click", () => {
      this.toggleAlliesPanel(false);
    });

    this.ui.alliesSettingsList?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      const actionButton = target.closest("[data-ally-action]");
      if (!(actionButton instanceof HTMLButtonElement)) {
        return;
      }

      const allyId = actionButton.dataset.allyId;
      const action = actionButton.dataset.allyAction;
      if (!allyId || !action) {
        return;
      }

      this.resumeAudio();
      if (action === "unlock") {
        this.unlockAllyFromMenu(allyId);
      } else if (action === "toggle-equip") {
        this.toggleAllyEquipFromMenu(allyId);
      }
    });

    this.ui.translateToggle?.addEventListener("click", () => {
      this.settings.language = this.settings.language === "en" ? "es" : "en";
      this.saveSettings();
      this.updateTranslationUi();
      this.updatePersistenceUi();
      this.updateDifficultyUi();
      this.updateWorldUi();
      this.updateDevUi();
      this.updateShopUi();
      if (this.ui.overlayTitle) {
        this.ui.overlayTitle.textContent = this.translateText(this.ui.overlayTitle.textContent);
      }
      if (this.ui.overlayCopy) {
        this.ui.overlayCopy.textContent = this.translateText(this.ui.overlayCopy.textContent);
      }
      if (this.ui.overlayButton) {
        this.ui.overlayButton.textContent = this.translateText(this.ui.overlayButton.textContent);
      }
      this.updateInstallCta();
    });

    this.ui.persistentUpgradesToggle?.addEventListener("click", () => {
      const next = !this.settings.persistentUpgrades;
      this.settings.persistentUpgrades = next;
      if (next) {
        this.settings.persistentPlayerProgress = { ...this.playerProgress };
        this.settings.persistentWeapon = this.playerWeapon;
      } else {
        this.settings.persistentPlayerProgress = this.createDefaultPlayerProgress();
        this.settings.persistentWeapon = "pistol";
      }
      this.saveSettings();
      this.updatePersistenceUi();
    });

    for (const button of this.ui.difficultyButtons) {
      button.addEventListener("click", () => {
        const { difficulty } = button.dataset;
        if (difficulty) {
          this.setDifficulty(difficulty);
        }
      });
    }

    this.ui.devToggle?.addEventListener("click", () => {
      this.toggleDevMode();
    });

    this.ui.devSpawnButton?.addEventListener("click", () => {
      this.resumeAudio();
      if (!this.isDevModeActive()) {
        return;
      }
      const type = this.ui.devSpawnType?.value;
      const count = Number(this.ui.devSpawnCount?.value ?? 1);
      if (type) {
        this.spawnDevEnemies(type, count);
      }
    });

    this.ui.devWaveButton?.addEventListener("click", () => {
      this.resumeAudio();
      if (!this.isDevModeActive()) {
        return;
      }
      const value = Number(this.ui.devWaveInput?.value ?? 0);
      this.setDevWave(value);
    });

    this.ui.devOneShotToggle?.addEventListener("click", () => {
      this.resumeAudio();
      if (!this.isDevModeActive()) {
        return;
      }
      this.settings.devOneShot = !this.settings.devOneShot;
      this.saveSettings();
      this.updateDevUi();
    });

    this.ui.devInfiniteHealthToggle?.addEventListener("click", () => {
      this.resumeAudio();
      if (!this.isDevModeActive()) {
        return;
      }
      this.settings.devInfiniteHealth = !this.settings.devInfiniteHealth;
      this.saveSettings();
      this.updateDevUi();
    });

    this.ui.devUpgradeButton?.addEventListener("click", () => {
      this.resumeAudio();
      if (!this.isDevModeActive()) {
        return;
      }
      const upgradeId = this.ui.devUpgradeSelect?.value;
      if (upgradeId) {
        this.applyDevUpgrade(upgradeId);
      }
    });

    for (const button of this.ui.worldButtons) {
      button.addEventListener("click", () => {
        const worldId = button.dataset.world;
        if (worldId) {
          this.setSelectedWorld(worldId);
        }
      });
    }

    this.ui.shopContinue?.addEventListener("click", () => {
      this.resumeAudio();
      if (this.phase !== "shop") {
        return;
      }

      if (!this.shop.readyToResume) {
        this.beginCycleTransition();
        return;
      }

      this.requestPointerLock();
    });

    this.ui.overlaySkipCycle?.addEventListener("click", () => {
      this.resumeAudio();
      this.skipCurrentCycle();
    });

    this.ui.overlayDevShop?.addEventListener("click", () => {
      this.resumeAudio();
      this.skipToShop();
    });

    this.setupTouchControls();
  }

  setupTouchControls() {
    if (!this.isTouchDevice) {
      return;
    }

    this.ui.mobileControls?.removeAttribute("hidden");
    this.updateMobileControlsVisibility();

    this.ui.mobileJoystick?.addEventListener(
      "touchstart",
      (event) => this.onMobileJoystickStart(event),
      { passive: false },
    );
    this.ui.mobileJoystick?.addEventListener(
      "touchmove",
      (event) => this.onMobileJoystickMove(event),
      { passive: false },
    );
    this.ui.mobileJoystick?.addEventListener(
      "touchend",
      (event) => this.onMobileJoystickEnd(event),
      { passive: false },
    );
    this.ui.mobileJoystick?.addEventListener(
      "touchcancel",
      (event) => this.onMobileJoystickEnd(event),
      { passive: false },
    );

    this.ui.mobileLookZone?.addEventListener(
      "touchstart",
      (event) => this.onMobileLookStart(event),
      { passive: false },
    );
    this.ui.mobileLookZone?.addEventListener(
      "touchmove",
      (event) => this.onMobileLookMove(event),
      { passive: false },
    );
    this.ui.mobileLookZone?.addEventListener(
      "touchend",
      (event) => this.onMobileLookEnd(event),
      { passive: false },
    );
    this.ui.mobileLookZone?.addEventListener(
      "touchcancel",
      (event) => this.onMobileLookEnd(event),
      { passive: false },
    );

    this.ui.mobileFire?.addEventListener(
      "touchstart",
      (event) => this.onMobileFireStart(event),
      { passive: false },
    );
    this.ui.mobileFire?.addEventListener(
      "touchend",
      (event) => this.onMobileFireEnd(event),
      { passive: false },
    );
    this.ui.mobileFire?.addEventListener(
      "touchcancel",
      (event) => this.onMobileFireEnd(event),
      { passive: false },
    );

    this.ui.mobileJump?.addEventListener(
      "touchstart",
      (event) => this.onMobileJump(event),
      { passive: false },
    );

    this.ui.mobilePause?.addEventListener(
      "touchstart",
      (event) => this.onMobilePause(event),
      { passive: false },
    );
  }

  detectTouchDevice() {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return false;
    }
    const hasTouchPoints = navigator.maxTouchPoints > 0;
    const hasCoarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches === true;

    // Evita activar HUD movil en laptops tactiles con puntero fino.
    return hasCoarsePointer || (hasTouchPoints && this.isMobileBrowser);
  }

  isMobileGameplayActive() {
    if (!this.isTouchDevice || !this.mobileControls.active || this.gameOver) {
      return false;
    }
    const blockedPhase =
      this.phase === "shop" ||
      this.phase === "cycle-transition" ||
      this.phase === "final-cutscene" ||
      this.phase === "epilogue-whiteout" ||
      this.phase === "credits" ||
      this.phase === "sequel-trailer";
    return !blockedPhase;
  }

  setMobileGameplayActive(active) {
    if (!this.isTouchDevice) {
      return;
    }
    this.mobileControls.active = Boolean(active);
    if (!this.mobileControls.active) {
      this.resetMobileInput();
    }
    this.updateMobileControlsVisibility();
  }

  updateMobileControlsVisibility() {
    if (!this.ui.mobileControls) {
      return;
    }
    const overlayVisible = this.ui.overlay?.classList.contains("overlay--visible");
    const blockedPhase =
      this.phase === "shop" ||
      this.phase === "cycle-transition" ||
      this.phase === "final-cutscene" ||
      this.phase === "epilogue" ||
      this.phase === "epilogue-whiteout" ||
      this.phase === "credits" ||
      this.phase === "sequel-trailer";
    const shouldShow =
      this.isTouchDevice &&
      this.mobileControls.active &&
      !overlayVisible &&
      !this.gameOver &&
      !blockedPhase;

    this.ui.mobileControls.hidden = !shouldShow;
  }

  getTouchByIdentifier(touchList, identifier) {
    if (!touchList) {
      return null;
    }
    for (let i = 0; i < touchList.length; i += 1) {
      const touch = touchList[i];
      if (touch.identifier === identifier) {
        return touch;
      }
    }
    return null;
  }

  updateMobileMovementFromVector() {
    const threshold = 0.18;
    const x = this.mobileControls.joystickVector.x;
    const y = this.mobileControls.joystickVector.y;
    this.inputs.left = x < -threshold;
    this.inputs.right = x > threshold;
    this.inputs.forward = y < -threshold;
    this.inputs.backward = y > threshold;
  }

  resetMobileJoystickThumb() {
    if (this.ui.mobileJoystickThumb) {
      this.ui.mobileJoystickThumb.style.transform = "translate(-50%, -50%)";
    }
  }

  resetMobileInput() {
    this.mobileControls.moveTouchId = null;
    this.mobileControls.lookTouchId = null;
    this.mobileControls.fireTouchId = null;
    this.mobileControls.joystickVector.set(0, 0);
    this.inputs.forward = false;
    this.inputs.backward = false;
    this.inputs.left = false;
    this.inputs.right = false;
    this.inputs.shoot = false;
    this.resetMobileJoystickThumb();
  }

  onMobileJoystickStart(event) {
    event.preventDefault();
    if (!this.isMobileGameplayActive() || this.mobileControls.moveTouchId !== null) {
      return;
    }
    const touch = event.changedTouches[0];
    if (!touch) {
      return;
    }
    const rect = this.ui.mobileJoystick?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    this.mobileControls.moveTouchId = touch.identifier;
    this.mobileControls.joystickCenter.set(rect.left + rect.width / 2, rect.top + rect.height / 2);
    this.onMobileJoystickMove(event);
  }

  onMobileJoystickMove(event) {
    event.preventDefault();
    if (!this.isMobileGameplayActive() || this.mobileControls.moveTouchId === null) {
      return;
    }
    const touch = this.getTouchByIdentifier(event.touches, this.mobileControls.moveTouchId);
    if (!touch) {
      return;
    }

    const dx = touch.clientX - this.mobileControls.joystickCenter.x;
    const dy = touch.clientY - this.mobileControls.joystickCenter.y;
    const radius = this.mobileControls.joystickRadius;
    const length = Math.hypot(dx, dy);
    const scale = length > radius ? radius / length : 1;
    const clampedX = dx * scale;
    const clampedY = dy * scale;

    this.mobileControls.joystickVector.set(clampedX / radius, clampedY / radius);
    this.updateMobileMovementFromVector();
    if (this.ui.mobileJoystickThumb) {
      this.ui.mobileJoystickThumb.style.transform = `translate(calc(-50% + ${clampedX}px), calc(-50% + ${clampedY}px))`;
    }
  }

  onMobileJoystickEnd(event) {
    event.preventDefault();
    if (this.mobileControls.moveTouchId === null) {
      return;
    }
    const ended = this.getTouchByIdentifier(event.changedTouches, this.mobileControls.moveTouchId);
    if (!ended) {
      return;
    }
    this.mobileControls.moveTouchId = null;
    this.mobileControls.joystickVector.set(0, 0);
    this.updateMobileMovementFromVector();
    this.resetMobileJoystickThumb();
  }

  onMobileLookStart(event) {
    event.preventDefault();
    if (!this.isMobileGameplayActive() || this.mobileControls.lookTouchId !== null) {
      return;
    }
    const touch = event.changedTouches[0];
    if (!touch) {
      return;
    }
    this.mobileControls.lookTouchId = touch.identifier;
    this.mobileControls.lookLast.set(touch.clientX, touch.clientY);
  }

  onMobileLookMove(event) {
    event.preventDefault();
    if (!this.isMobileGameplayActive() || this.mobileControls.lookTouchId === null) {
      return;
    }
    const touch = this.getTouchByIdentifier(event.touches, this.mobileControls.lookTouchId);
    if (!touch) {
      return;
    }

    const dx = touch.clientX - this.mobileControls.lookLast.x;
    const dy = touch.clientY - this.mobileControls.lookLast.y;
    this.mobileControls.lookLast.set(touch.clientX, touch.clientY);

    this.camera.rotation.y -= dx * this.mobileControls.lookSensitivity;
    this.camera.rotation.x -= dy * this.mobileControls.lookSensitivity;
    this.camera.rotation.x = clamp(this.camera.rotation.x, -1.18, 1.18);
  }

  onMobileLookEnd(event) {
    event.preventDefault();
    if (this.mobileControls.lookTouchId === null) {
      return;
    }
    const ended = this.getTouchByIdentifier(event.changedTouches, this.mobileControls.lookTouchId);
    if (!ended) {
      return;
    }
    this.mobileControls.lookTouchId = null;
  }

  onMobileFireStart(event) {
    event.preventDefault();
    if (!this.isMobileGameplayActive() || this.mobileControls.fireTouchId !== null) {
      return;
    }
    const touch = event.changedTouches[0];
    if (!touch) {
      return;
    }
    this.mobileControls.fireTouchId = touch.identifier;
    this.inputs.shoot = true;
  }

  onMobileFireEnd(event) {
    event.preventDefault();
    if (this.mobileControls.fireTouchId === null) {
      return;
    }
    const ended = this.getTouchByIdentifier(event.changedTouches, this.mobileControls.fireTouchId);
    if (!ended) {
      return;
    }
    this.mobileControls.fireTouchId = null;
    this.inputs.shoot = false;
  }

  onMobileJump(event) {
    event.preventDefault();
    if (!this.isMobileGameplayActive()) {
      return;
    }
    this.tryJump();
  }

  onMobilePause(event) {
    event.preventDefault();
    if (!this.isMobileGameplayActive()) {
      return;
    }
    this.triggerMobilePauseFlash();
    this.showPauseOverlay(this.tr("Pausa tactica", "Tactical pause"));
  }

  openPcInstallerPage() {
    const url = "/pc-installer.html";
    window.open(url, "_blank", "noopener,noreferrer");
  }

  triggerMobilePauseFlash() {
    const flash = this.ui.pauseFlash;
    if (!flash) {
      return;
    }

    flash.classList.remove("is-active");
    void flash.offsetWidth;
    flash.classList.add("is-active");
  }

  takeScreenshot() {
    if (!this.renderer || !this.scene || !this.camera) {
      return;
    }

    try {
      this.renderer.render(this.scene, this.camera);
      const dataUrl = this.renderer.domElement.toDataURL("image/png");
      const link = document.createElement("a");
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      link.download = `bot-breaker-${stamp}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.warn("No se pudo capturar la pantalla.", error);
    }
  }

  requestPointerLock() {
    this.resumeAudio();
    if (this.isTouchDevice) {
      this.setMobileGameplayActive(true);
      this.setAudioPaused(false);
      this.hideOverlay();
      return;
    }
    this.renderer.domElement.requestPointerLock();
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (this.isTouchDevice && this.mobileControls.moveTouchId !== null) {
      const rect = this.ui.mobileJoystick?.getBoundingClientRect();
      if (rect) {
        this.mobileControls.joystickCenter.set(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
        );
      }
    }
  }

  createDefaultPlayerProgress() {
    return {
      damage: 0,
      fireRate: 0,
      maxShield: 0,
      loot: 0,
      projectileSpeed: 0,
      pierce: 0,
      killShield: 0,
      damageResist: 0,
      hitShield: 0,
      mobility: 0,
      weaponBurst: 0,
      weaponShotgun: 0,
      weaponRail: 0,
      weaponSMG: 0,
      weaponPlasma: 0,
    };
  }

  sanitizeAllyList(rawList) {
    if (!Array.isArray(rawList)) {
      return [];
    }
    const unique = [];
    for (const value of rawList) {
      if (typeof value !== "string" || !ALLY_DEFS[value] || unique.includes(value)) {
        continue;
      }
      unique.push(value);
    }
    return unique;
  }

  getAllyLabel(allyId) {
    const def = ALLY_DEFS[allyId];
    if (!def) {
      return allyId;
    }
    return this.isEnglishUi() ? def.labelEn ?? def.label : def.label;
  }

  syncAllyLoadoutFromSettings() {
    const equipped = this.sanitizeAllyList(this.settings.equippedAllies).slice(
      0,
      MAX_EQUIPPED_ALLIES,
    );
    this.settings.equippedAllies = equipped;
    this.allyLoadout = equipped
      .filter((allyId) => this.isDevModeActive() || this.settings.unlockedAllies.includes(allyId))
      .map((allyId) => ({
        id: allyId,
        label: this.getAllyLabel(allyId),
      }));
  }

  isAllyUnlocked(allyId) {
    if (this.isDevModeActive()) {
      return true;
    }
    return this.settings.unlockedAllies.includes(allyId);
  }

  isAllyEquipped(allyId) {
    return this.settings.equippedAllies.includes(allyId);
  }

  rebuildAlliesSettingsUi() {
    if (!this.ui.alliesSettingsList) {
      return;
    }

    this.ui.alliesSettingsList.innerHTML = "";
    const allyEntries = Object.entries(ALLY_DEFS);
    const unlockedCount = allyEntries.filter(([allyId]) => this.isAllyUnlocked(allyId)).length;
    const equippedCount = this.settings.equippedAllies.length;

    for (const [allyId, def] of allyEntries) {
      const unlocked = this.isAllyUnlocked(allyId);
      const equipped = this.isAllyEquipped(allyId);
      const card = document.createElement("article");
      card.className = "ally-unlock";

      const name = document.createElement("h4");
      name.textContent = this.getAllyLabel(allyId);

      const stats = document.createElement("p");
      stats.className = "ally-unlock__stats";
      stats.textContent = this.tr(
        `Vida ${def.maxHealth} • Dano ${def.damage}`,
        `Health ${def.maxHealth} • Damage ${def.damage}`,
      );

      const status = document.createElement("p");
      status.className = "ally-unlock__status";
      if (!unlocked) {
        status.textContent = this.tr(
          `Bloqueado • ${def.unlockCost} monedas`,
          `Locked • ${def.unlockCost} coins`,
        );
      } else if (equipped) {
        status.textContent = this.tr("Equipado", "Equipped");
      } else {
        status.textContent = this.tr("Desbloqueado", "Unlocked");
      }

      const action = document.createElement("button");
      action.className = "ally-unlock__button";
      action.dataset.allyAction = unlocked ? "toggle-equip" : "unlock";
      action.dataset.allyId = allyId;
      action.textContent = !unlocked
        ? this.tr("Desbloquear", "Unlock")
        : equipped
          ? this.tr("Quitar", "Unequip")
          : this.tr("Equipar", "Equip");
      action.disabled = Boolean(
        unlocked && !equipped && equippedCount >= MAX_EQUIPPED_ALLIES,
      );

      card.append(name, stats, status, action);
      this.ui.alliesSettingsList.appendChild(card);
    }

    if (this.ui.alliesSettingsHelp) {
      this.ui.alliesSettingsHelp.textContent = this.tr(
        `Aliados equipados: ${equippedCount} / ${MAX_EQUIPPED_ALLIES}. Desbloqueados: ${unlockedCount} / ${allyEntries.length}.`,
        `Equipped allies: ${equippedCount} / ${MAX_EQUIPPED_ALLIES}. Unlocked: ${unlockedCount} / ${allyEntries.length}.`,
      );
    }
  }

  unlockAllyFromMenu(allyId) {
    const def = ALLY_DEFS[allyId];
    if (!def || this.isAllyUnlocked(allyId)) {
      return;
    }

    if (!this.isDevModeActive() && this.coins < def.unlockCost) {
      this.showPauseOverlay(
        this.tr(
          `Te faltan ${def.unlockCost - this.coins} monedas para desbloquear ${this.getAllyLabel(allyId)}.`,
          `You need ${def.unlockCost - this.coins} more coins to unlock ${this.getAllyLabel(allyId)}.`,
        ),
      );
      return;
    }

    if (!this.isDevModeActive()) {
      this.coins -= def.unlockCost;
    }

    this.settings.unlockedAllies = this.sanitizeAllyList([
      ...this.settings.unlockedAllies,
      allyId,
    ]);
    if (
      !this.settings.equippedAllies.includes(allyId) &&
      this.settings.equippedAllies.length < MAX_EQUIPPED_ALLIES
    ) {
      this.settings.equippedAllies = [...this.settings.equippedAllies, allyId];
    }

    this.syncAllyLoadoutFromSettings();
    this.saveSettings();
    this.rebuildAlliesSettingsUi();
    this.updateHud();
  }

  toggleAllyEquipFromMenu(allyId) {
    if (!ALLY_DEFS[allyId] || !this.isAllyUnlocked(allyId)) {
      return;
    }

    const equipped = this.sanitizeAllyList(this.settings.equippedAllies);
    const index = equipped.indexOf(allyId);
    if (index >= 0) {
      equipped.splice(index, 1);
    } else {
      if (equipped.length >= MAX_EQUIPPED_ALLIES) {
        this.showPauseOverlay(
          this.tr(
            `Solo puedes equipar ${MAX_EQUIPPED_ALLIES} aliados a la vez.`,
            `You can equip only ${MAX_EQUIPPED_ALLIES} allies at once.`,
          ),
        );
        return;
      }
      equipped.push(allyId);
    }

    this.settings.equippedAllies = equipped;
    this.syncAllyLoadoutFromSettings();
    this.saveSettings();
    this.rebuildAlliesSettingsUi();
    this.updateHud();
  }

  sanitizePlayerProgress(rawProgress) {
    const progress = this.createDefaultPlayerProgress();
    if (!rawProgress || typeof rawProgress !== "object") {
      return progress;
    }

    for (const [upgradeId, config] of Object.entries(SHOP_UPGRADES)) {
      const value = Number(rawProgress[upgradeId] ?? 0);
      const safeValue = clamp(Math.round(Number.isFinite(value) ? value : 0), 0, config.maxLevel);
      progress[upgradeId] = safeValue;
    }

    return progress;
  }

  persistRunProgress() {
    if (!this.settings.persistentUpgrades) {
      return;
    }
    this.settings.persistentPlayerProgress = { ...this.playerProgress };
    this.settings.persistentWeapon = PLAYER_WEAPONS[this.playerWeapon] ? this.playerWeapon : "pistol";
    this.saveSettings();
  }

  loadSettings() {
    const fallback = {
      difficulty: "normal",
      selectedWorldId: "arena",
      unlockedWorldIds: ["arena"],
      language: "es",
      unlockedAllies: [],
      equippedAllies: [],
      persistentUpgrades: false,
      persistentPlayerProgress: null,
      persistentWeapon: "pistol",
      devMode: false,
      devOneShot: false,
      devInfiniteHealth: true,
    };

    try {
      const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!raw) {
        return fallback;
      }

      const parsed = JSON.parse(raw);
      const difficulty =
        parsed?.difficulty && DIFFICULTY_PRESETS[parsed.difficulty]
          ? parsed.difficulty
          : fallback.difficulty;
      const unlockedWorldIds = Array.isArray(parsed?.unlockedWorldIds)
        ? WORLD_ORDER.filter((worldId) => parsed.unlockedWorldIds.includes(worldId))
        : [];

      if (!unlockedWorldIds.includes("arena")) {
        unlockedWorldIds.unshift("arena");
      }

      const selectedWorldId =
        typeof parsed?.selectedWorldId === "string" &&
        unlockedWorldIds.includes(parsed.selectedWorldId)
          ? parsed.selectedWorldId
          : fallback.selectedWorldId;

      return {
        difficulty,
        selectedWorldId,
        unlockedWorldIds,
        language: parsed?.language === "en" ? "en" : "es",
        unlockedAllies: this.sanitizeAllyList(parsed?.unlockedAllies),
        equippedAllies: this.sanitizeAllyList(parsed?.equippedAllies).slice(
          0,
          MAX_EQUIPPED_ALLIES,
        ),
        persistentUpgrades: Boolean(parsed?.persistentUpgrades),
        persistentPlayerProgress: this.sanitizePlayerProgress(parsed?.persistentPlayerProgress),
        persistentWeapon:
          typeof parsed?.persistentWeapon === "string" && PLAYER_WEAPONS[parsed.persistentWeapon]
            ? parsed.persistentWeapon
            : "pistol",
        devMode: Boolean(parsed?.devMode),
        devOneShot: Boolean(parsed?.devOneShot),
        devInfiniteHealth: parsed?.devInfiniteHealth !== false,
      };
    } catch {
      return fallback;
    }
  }

  saveSettings() {
    try {
      window.localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(this.settings),
      );
    } catch {
      // Ignore storage problems and keep runtime settings.
    }
  }

  resolveDevAccess() {
    const fingerprint = getDeviceFingerprint();
    this.dev.fingerprint = fingerprint;
    const hasA32DevAccess = isGalaxyA32Device();
    let stored = null;

    try {
      stored = window.localStorage.getItem(DEV_ACCESS_STORAGE_KEY);
      if (!stored) {
        const host = window.location?.hostname ?? "";
        const protocol = window.location?.protocol ?? "";
        const canAutoEnroll =
          protocol === "file:" ||
          host === "" ||
          host === "localhost" ||
          host === "127.0.0.1";
        if (canAutoEnroll) {
          window.localStorage.setItem(DEV_ACCESS_STORAGE_KEY, fingerprint);
          stored = fingerprint;
        }
      }
    } catch {
      stored = null;
    }

    this.dev.allowed = hasA32DevAccess || stored === fingerprint;
    if (hasA32DevAccess && !this.settings.devMode) {
      this.settings.devMode = true;
      this.saveSettings();
    }
    if (!this.dev.allowed && this.settings.devMode) {
      this.settings.devMode = false;
      this.saveSettings();
    }
    this.dev.enabled = Boolean(this.settings.devMode && this.dev.allowed);
  }

  isDevModeActive() {
    return this.dev.enabled;
  }

  toggleDevMode(force = null) {
    if (!this.dev.allowed) {
      return;
    }

    const next = force === null ? !this.settings.devMode : Boolean(force);
    this.settings.devMode = next;
    this.dev.enabled = next;
    this.saveSettings();
    this.updateDevUi();
    this.updateWorldUi();
    this.refreshShopObjects();
  }

  spawnDevEnemies(type, count = 1) {
    if (!this.isDevModeActive()) {
      return;
    }
    if (!ENEMY_DEFS[type]) {
      return;
    }
    const safeCount = clamp(Math.round(count || 1), 1, 12);
    for (let i = 0; i < safeCount; i += 1) {
      this.spawnEnemy(type);
    }
  }

  setDevWave(value) {
    if (!this.isDevModeActive()) {
      return;
    }
    const targetWave = clamp(Math.round(value || 0), 0, BOSS_WAVE);
    if (this.phase === "shop" || this.phase === "transition" || this.phase === "final-cutscene") {
      return;
    }
    this.clearCombatEntities();
    this.currentBoss = null;
    this.wavePlan = null;
    this.bossPhaseSpawned = false;
    if (targetWave >= BOSS_WAVE) {
      this.startBossWave();
    } else {
      this.startRegularWave(targetWave);
    }
    this.updateHud();
  }

  updateDevUi() {
    if (this.ui.devGroup) {
      this.ui.devGroup.hidden = !this.dev.allowed;
    }

    if (this.ui.devToggle) {
      this.ui.devToggle.textContent = this.isDevModeActive()
        ? this.tr("Modo dev: activado", "Dev mode: enabled")
        : this.tr("Modo dev: desactivado", "Dev mode: disabled");
      this.ui.devToggle.classList.toggle("is-active", this.isDevModeActive());
    }

    if (this.ui.devHelp) {
      this.ui.devHelp.textContent = this.isDevModeActive()
        ? this.tr(
            "Dev activo: tienda gratis y todos los mapas disponibles.",
            "Dev enabled: free shop and every map available.",
          )
        : this.tr("Dev apagado: reglas normales.", "Dev disabled: normal rules.");
    }

    const devActive = this.isDevModeActive();
    if (this.ui.devSpawnType) this.ui.devSpawnType.disabled = !devActive;
    if (this.ui.devSpawnCount) this.ui.devSpawnCount.disabled = !devActive;
    if (this.ui.devSpawnButton) this.ui.devSpawnButton.disabled = !devActive;
    if (this.ui.devWaveInput) this.ui.devWaveInput.disabled = !devActive;
    if (this.ui.devWaveButton) this.ui.devWaveButton.disabled = !devActive;
    if (this.ui.devUpgradeSelect) this.ui.devUpgradeSelect.disabled = !devActive;
    if (this.ui.devUpgradeButton) this.ui.devUpgradeButton.disabled = !devActive;
    if (this.ui.devToolsHelp) {
      this.ui.devToolsHelp.textContent = devActive
        ? this.tr(
            "Dev activo: spawnea enemigos, salta waves y aplica mejoras al vuelo.",
            "Dev enabled: spawn enemies, skip waves, and apply upgrades instantly.",
          )
        : this.tr("Activa modo dev para usar los atajos.", "Enable dev mode to use shortcuts.");
    }

    if (this.ui.devOneShotToggle) {
      const enabled = Boolean(this.settings.devOneShot);
      this.ui.devOneShotToggle.textContent = enabled
        ? this.tr("One shot: activado", "One shot: enabled")
        : this.tr("One shot: desactivado", "One shot: disabled");
      this.ui.devOneShotToggle.classList.toggle("is-active", enabled);
      this.ui.devOneShotToggle.disabled = !devActive;
    }

    if (this.ui.devInfiniteHealthToggle) {
      const enabled = this.settings.devInfiniteHealth !== false;
      this.ui.devInfiniteHealthToggle.textContent = enabled
        ? this.tr("Vida infinita: activada", "Infinite health: enabled")
        : this.tr("Vida infinita: desactivada", "Infinite health: disabled");
      this.ui.devInfiniteHealthToggle.classList.toggle("is-active", enabled);
      this.ui.devInfiniteHealthToggle.disabled = !devActive;
    }

    this.syncAllyLoadoutFromSettings();
    this.rebuildAlliesSettingsUi();
  }

  populateDevOptions() {
    if (!this.ui.devSpawnType) {
      return;
    }
    this.ui.devSpawnType.innerHTML = "";
    const entries = Object.entries(ENEMY_DEFS).map(([id, def]) => ({
      id,
      label: def.label ?? id,
    }));
    entries.sort((a, b) => a.label.localeCompare(b.label));
    for (const entry of entries) {
      const option = document.createElement("option");
      option.value = entry.id;
      option.textContent = entry.label;
      this.ui.devSpawnType.appendChild(option);
    }

    if (this.ui.devUpgradeSelect) {
      this.ui.devUpgradeSelect.innerHTML = "";
      const upgradeEntries = Object.entries(SHOP_UPGRADES).map(([id, config]) => ({
        id,
        label: this.getUpgradeLabel(id),
      }));
      upgradeEntries.sort((a, b) => a.label.localeCompare(b.label));
      for (const entry of upgradeEntries) {
        const option = document.createElement("option");
        option.value = entry.id;
        option.textContent = entry.label;
        this.ui.devUpgradeSelect.appendChild(option);
      }
    }
  }

  applyDevUpgrade(upgradeId) {
    if (!this.isDevModeActive()) {
      return;
    }
    if (!SHOP_UPGRADES[upgradeId]) {
      return;
    }

    this.buyUpgrade(upgradeId);
    this.updateHud();
  }

  getDifficultyPreset() {
    return DIFFICULTY_PRESETS[this.settings.difficulty] ?? DIFFICULTY_PRESETS.normal;
  }

  getWorldStartCycle(worldId) {
    return WORLD_DEFS[worldId]?.startCycle ?? WORLD_DEFS.arena.startCycle;
  }

  isWorldUnlocked(worldId) {
    if (worldId === "arena") {
      return true;
    }

    if (this.isDevModeActive()) {
      return true;
    }

    return this.settings.unlockedWorldIds.includes(worldId);
  }

  getSelectedWorldId() {
    if (this.isDevModeActive() && WORLD_DEFS[this.settings.selectedWorldId]) {
      return this.settings.selectedWorldId;
    }

    if (this.isWorldUnlocked(this.settings.selectedWorldId)) {
      return this.settings.selectedWorldId;
    }

    this.settings.selectedWorldId = "arena";
    this.saveSettings();
    return "arena";
  }

  unlockWorld(worldId) {
    if (!WORLD_DEFS[worldId] || this.isWorldUnlocked(worldId)) {
      return;
    }

    this.settings.unlockedWorldIds = [
      ...this.settings.unlockedWorldIds,
      worldId,
    ];
    this.saveSettings();
    this.updateWorldUi();
  }

  setSelectedWorld(worldId) {
    if (!WORLD_DEFS[worldId]) {
      return;
    }

    if (!this.isDevModeActive() && !this.isWorldUnlocked(worldId)) {
      return;
    }

    this.settings.selectedWorldId = worldId;
    this.saveSettings();
    this.updateWorldUi();

    if (
      this.ui.overlayCopy &&
      !this.gameOver &&
      !this.pointerLocked &&
      this.ui.overlay?.classList.contains("overlay--visible") &&
      !this.ui.worldPanel?.hidden
    ) {
      this.ui.overlayCopy.textContent = this.getMenuOverlayCopy(worldId);
    }
  }

  getMenuOverlayCopy(worldId) {
    const selectedWorldId = WORLD_DEFS[worldId] ? worldId : "arena";
    const world = WORLD_DEFS[selectedWorldId];

    if (world.startCycle > 1) {
      const base = `Click para bloquear el mouse y arrancar en ${world.label}. Empiezas directo desde el ciclo ${world.startCycle}. ${getCycleBossText(world.startCycle)} Derrota al boss de la wave 10 para abrir la tienda.`;
      return this.translateText(this.isDevModeActive() ? `${base} Modo dev activo.` : base);
    }

    const base = `Click para bloquear el mouse y empezar la run. ${getCyclePreviewText(world.startCycle)} Derrota al boss de la wave 10 para abrir la tienda.`;
    return this.translateText(this.isDevModeActive() ? `${base} Modo dev activo.` : base);
  }

  updateWorldUi() {
    const selectedWorldId = this.getSelectedWorldId();
    const unlockedCount = this.isDevModeActive()
      ? WORLD_ORDER.length
      : WORLD_ORDER.filter((worldId) => this.isWorldUnlocked(worldId)).length;

    if (this.ui.worldProgress) {
      this.ui.worldProgress.textContent = this.translateText(
        `${unlockedCount} / ${WORLD_ORDER.length} mundos`,
      );
    }

    if (this.ui.worldHelp) {
      this.ui.worldHelp.textContent = this.translateText(this.isDevModeActive()
        ? `Dev activo: puedes elegir cualquier mundo. Destino actual: ${WORLD_DEFS[selectedWorldId].label}.`
        : `Destino guardado: ${WORLD_DEFS[selectedWorldId].label}. El boton principal abre una run nueva en ese mundo.`);
    }

    for (const button of this.ui.worldButtons) {
      const worldId = button.dataset.world;
      const world = WORLD_DEFS[worldId];
      if (!world) {
        continue;
      }

      const unlocked = this.isDevModeActive() || this.isWorldUnlocked(worldId);
      const active = worldId === selectedWorldId;
      button.disabled = !unlocked;
      button.classList.toggle("is-active", active);
      button.classList.toggle("is-locked", !unlocked);
      button.setAttribute("aria-pressed", active ? "true" : "false");

      const status = button.querySelector(".world-option__status");
      if (status) {
        status.textContent = this.translateText(!unlocked
          ? world.unlockHint
          : active
            ? `Seleccionado. Arrancas desde el ciclo ${world.startCycle}.`
            : world.description);
      }
    }
  }

  isEnglishUi() {
    return this.settings.language === "en";
  }

  tr(es, en) {
    return this.isEnglishUi() ? en : es;
  }

  translateText(text) {
    if (typeof text !== "string" || !text) {
      return text;
    }

    const entries = [
      ["Configuracion", "Settings"],
      ["Ocultar ajustes", "Hide settings"],
      ["Entrar al combate", "Enter combat"],
      ["Nueva run", "New run"],
      ["Reintentar", "Retry"],
      ["Pausa tactica", "Tactical pause"],
      ["Nuevo ciclo listo", "New cycle ready"],
      ["Run terminada", "Run ended"],
      ["Hell Track despejada", "Hell Track cleared"],
      ["Saltar ciclo (ilimitado)", "Skip cycle (unlimited)"],
      ["Saltar ciclo no disponible", "Skip cycle unavailable"],
      ["Ir a la tienda", "Go to shop"],
      ["Creditos", "Credits"],
      ["Monedas", "Coins"],
      ["Reinicio", "Reset"],
      ["Comenzar ya", "Start now"],
      ["Equipada", "Equipped"],
      ["Comprada", "Purchased"],
      ["Click para comprar", "Click to buy"],
      ["Te faltan", "Missing"],
      ["Costo", "Cost"],
      ["Nivel", "Level"],
      ["MAX", "MAX"],
      ["Modo dev activo.", "Dev mode enabled."],
      ["Modo dev", "Dev mode"],
      ["activado", "enabled"],
      ["desactivado", "disabled"],
      ["Vida infinita", "Infinite health"],
      ["Dev activo", "Dev enabled"],
      ["Activa modo dev para usar los atajos.", "Enable dev mode to use shortcuts."],
      ["Pasa el mouse sobre una mejora y haz click para comprarla.", "Hover an upgrade and click to buy it."],
      ["Compra mejoras antes del siguiente ciclo.", "Buy upgrades before the next cycle."],
      ["boss", "boss"],
      ["wave", "wave"],
      ["escudo", "shield"],
      ["dano", "damage"],
      ["mundo", "world"],
      ["mundos", "worlds"],
    ];

    const toEn = this.isEnglishUi();
    let out = text;
    for (const [es, en] of entries) {
      const from = toEn ? es : en;
      const to = toEn ? en : es;
      if (!from || !to) {
        continue;
      }
      out = out.split(from).join(to);
    }

    out = out
      .replace(/(\d+)\s*monedas/gi, toEn ? "$1 coins" : "$1 monedas")
      .replace(/(\d+)\s*mundos/gi, toEn ? "$1 worlds" : "$1 mundos");
    return out;
  }

  getUpgradeLabel(upgradeId) {
    const config = SHOP_UPGRADES[upgradeId];
    if (!config) {
      return upgradeId;
    }
    if (!this.isEnglishUi()) {
      return config.label;
    }

    const labels = {
      damage: "Damage Overclock",
      fireRate: "Fire Rate Servo",
      maxShield: "Shield Capacity",
      loot: "Defensive Core",
      projectileSpeed: "Accelerator Coil",
      pierce: "Piercing Core",
      killShield: "Shield Recharge",
      damageResist: "Damage Resistance",
      hitShield: "Vampiric Reactor",
      mobility: "Mobility Servos",
      weaponBurst: "Burst Module",
      weaponShotgun: "Shotgun Cannon",
      weaponRail: "Compact Rail",
      weaponSMG: "SMG Vector",
      weaponPlasma: "Plasma Duo",
    };
    return labels[upgradeId] ?? config.label;
  }

  getUpgradeDescription(upgradeId) {
    const config = SHOP_UPGRADES[upgradeId];
    if (!config) {
      return "";
    }
    if (!this.isEnglishUi()) {
      return config.description;
    }

    const descriptions = {
      damage: "+6 damage per shot.",
      fireRate: "You shoot faster.",
      maxShield: "+20 max shield and partial refill on purchase.",
      loot: "Defensive loot heals more and appears sooner.",
      projectileSpeed: "+15% projectile speed per level.",
      pierce: "Your shots pierce +1 enemy.",
      killShield: "+2 shield per kill.",
      damageResist: "You take less damage when attacked.",
      hitShield: "Restore shield every time your shots hit.",
      mobility: "Increases your movement speed.",
      weaponBurst: "Equip a 3-shot burst weapon.",
      weaponShotgun: "Equip a 5-pellet shotgun.",
      weaponRail: "Slow shot, brutal damage, pierces.",
      weaponSMG: "Very high fire rate, lower per-shot damage.",
      weaponPlasma: "Fires two plasma projectiles with controlled spread.",
    };
    return descriptions[upgradeId] ?? config.description;
  }

  updateTranslationUi() {
    const english = this.isEnglishUi();
    document.documentElement.lang = english ? "en" : "es";

    if (this.ui.translateToggle) {
      this.ui.translateToggle.textContent = english ? "Language: English" : "Idioma: Espanol";
      this.ui.translateToggle.classList.toggle("is-active", english);
    }
    if (this.ui.translateHelp) {
      this.ui.translateHelp.textContent = english
        ? "Switch the main interface between English and Spanish."
        : "Cambia la interfaz principal entre Espanol e Ingles.";
    }

    const settingTitle = this.root.querySelector(".settings-panel__header h3");
    if (settingTitle) {
      settingTitle.textContent = this.tr("Configuracion de la partida", "Match settings");
    }
    const alliesSettingTitle = this.root.querySelector(".allies-settings-panel .settings-panel__header h3");
    if (alliesSettingTitle) {
      alliesSettingTitle.textContent = this.tr("Aliados desbloqueables", "Unlockable allies");
    }
    const alliesSettingEyebrow = this.root.querySelector(".allies-settings-panel .overlay__eyebrow");
    if (alliesSettingEyebrow) {
      alliesSettingEyebrow.textContent = this.tr("Aliados", "Allies");
    }
    const settingLabels = this.root.querySelectorAll(".setting-group__label");
    if (settingLabels[0]) {
      settingLabels[0].textContent = this.tr("Dificultad", "Difficulty");
    }
    if (settingLabels[1]) {
      settingLabels[1].textContent = this.tr("Aliados", "Allies");
    }
    if (settingLabels[2]) {
      settingLabels[2].textContent = this.tr("Modo dev", "Dev mode");
    }
    const worldTitle = this.root.querySelector(".world-panel__header h3");
    if (worldTitle) {
      worldTitle.textContent = this.tr("Rutas desbloqueadas", "Unlocked routes");
    }
    const worldEyebrow = this.root.querySelector(".world-panel .overlay__eyebrow");
    if (worldEyebrow) {
      worldEyebrow.textContent = this.tr("Seleccion de mundo", "World selection");
    }
    const hudModeLabel = this.root.querySelector(".hud__mode");
    if (hudModeLabel) {
      hudModeLabel.childNodes[0].textContent = this.tr("Dificultad ", "Difficulty ");
    }

    const hudTips = this.root.querySelectorAll(".hud__tips p");
    if (hudTips[0]) hudTips[0].innerHTML = "<kbd>WASD</kbd> " + this.tr("moverse", "move");
    if (hudTips[1]) hudTips[1].innerHTML = "<kbd>Espacio</kbd> " + this.tr("saltar", "jump");
    if (hudTips[2]) hudTips[2].innerHTML = "<kbd>Mouse</kbd> " + this.tr("apuntar", "aim");
    if (hudTips[3]) hudTips[3].innerHTML = "<kbd>Click</kbd> " + this.tr("disparar", "shoot");
    if (hudTips[4]) hudTips[4].innerHTML = "<kbd>R</kbd> " + this.tr("reiniciar run", "restart run");
    if (hudTips[5]) hudTips[5].innerHTML = "<kbd>P</kbd> " + this.tr("captura", "screenshot");

    const statLabels = this.root.querySelectorAll(".hud-card span");
    if (statLabels[0]) statLabels[0].textContent = this.tr("Score", "Score");
    if (statLabels[1]) statLabels[1].textContent = this.tr("Wave", "Wave");
    if (statLabels[2]) statLabels[2].textContent = this.tr("Enemies", "Enemies");
    if (statLabels[3]) statLabels[3].textContent = this.tr("Coins", "Coins");

    const healthLabel = this.root.querySelector(".health__label span");
    if (healthLabel) {
      healthLabel.textContent = this.tr("Shield", "Shield");
    }
    const allyHudTitle = this.root.querySelector(".ally-panel__title");
    if (allyHudTitle) {
      allyHudTitle.textContent = this.tr("Aliados", "Allies");
    }

    if (this.ui.settingsToggle && !this.ui.settingsPanel?.hidden) {
      this.ui.settingsToggle.textContent = this.tr("Ocultar ajustes", "Hide settings");
    } else if (this.ui.settingsToggle) {
      this.ui.settingsToggle.textContent = this.tr("Configuracion", "Settings");
    }

    if (this.ui.overlayDevShop) {
      this.ui.overlayDevShop.textContent = this.tr("Ir a la tienda", "Go to shop");
    }
    if (this.ui.overlayCredits) {
      this.ui.overlayCredits.textContent = this.tr("Creditos", "Credits");
    }
    if (this.ui.overlayInstallPc) {
      this.ui.overlayInstallPc.textContent = this.tr("Instalar en PC", "Install on PC");
    }
    if (this.ui.alliesToggle && !this.ui.alliesSettingsPanel?.hidden) {
      this.ui.alliesToggle.textContent = this.tr("Ocultar aliados", "Hide allies");
    } else if (this.ui.alliesToggle) {
      this.ui.alliesToggle.textContent = this.tr("Aliados", "Allies");
    }
    if (this.ui.overlaySkipCycle && this.ui.overlaySkipCycle.hidden) {
      this.ui.overlaySkipCycle.textContent = this.tr("Saltar ciclo", "Skip cycle");
    }

    if (this.ui.devSpawnButton) {
      this.ui.devSpawnButton.textContent = this.tr("Spawnear", "Spawn");
    }
    if (this.ui.devWaveButton) {
      this.ui.devWaveButton.textContent = this.tr("Ir a wave", "Go to wave");
    }
    if (this.ui.devUpgradeButton) {
      this.ui.devUpgradeButton.textContent = this.tr("Aplicar mejora", "Apply upgrade");
    }
    if (this.ui.mobileFire) {
      this.ui.mobileFire.textContent = this.tr("Disparo", "Fire");
    }
    if (this.ui.mobileJump) {
      this.ui.mobileJump.textContent = this.tr("Salto", "Jump");
    }

    if (this.ui.alliesSettingsHelp && this.ui.alliesSettingsList?.children.length === 0) {
      this.ui.alliesSettingsHelp.textContent = this.tr(
        "Desbloquea aliados con monedas y equipalos para la run.",
        "Unlock allies with coins and equip them for the run.",
      );
    }

    this.populateDevOptions();
    this.rebuildAlliesSettingsUi();
  }

  updatePersistenceUi() {
    if (!this.ui.persistentUpgradesToggle) {
      return;
    }

    const enabled = Boolean(this.settings.persistentUpgrades);
    this.ui.persistentUpgradesToggle.textContent = enabled
      ? this.tr("Mejoras persistentes: activadas", "Persistent upgrades: enabled")
      : this.tr("Mejoras persistentes: desactivadas", "Persistent upgrades: disabled");
    this.ui.persistentUpgradesToggle.classList.toggle("is-active", enabled);

    if (this.ui.persistentUpgradesHelp) {
      this.ui.persistentUpgradesHelp.textContent = enabled
        ? this.tr(
            "Las mejoras se guardan al morir y al iniciar nueva run.",
            "Upgrades are kept when you die and when starting a new run.",
          )
        : this.tr(
            "Las mejoras se reinician al morir, como run roguelike clasica.",
            "Upgrades reset on death, like a classic roguelike run.",
          );
    }
  }

  setDifficulty(difficulty) {
    if (!DIFFICULTY_PRESETS[difficulty]) {
      return;
    }

    this.settings.difficulty = difficulty;
    this.saveSettings();
    this.updateDifficultyUi();

    if (this.ui.overlayCopy && !this.pointerLocked && !this.gameOver) {
      this.ui.overlayCopy.textContent =
        this.tr(
          "La dificultad cambia cuantos spawns enemigos aparecen y que tan seguido te presionan.",
          "Difficulty changes how many enemy spawns appear and how often they pressure you.",
        );
    }
  }

  updateDifficultyUi() {
    const preset = this.getDifficultyPreset();
    const english = this.isEnglishUi();
    const labelMap = {
      easy: english ? "Easy" : "Facil",
      normal: english ? "Normal" : "Normal",
      hard: english ? "Hard" : "Dificil",
    };
    const descMap = {
      easy: english
        ? "Fewer active bots, slower spawns, and more frequent defensive loot."
        : "Menos bots activos, spawns mas lentos y loot defensivo mas frecuente.",
      normal: english
        ? "Balanced for the base shooter experience."
        : "Balanceado para la experiencia base del shooter.",
      hard: english
        ? "More spawns, less breathing room, and much more arena pressure."
        : "Mas spawns, menos descanso y mucha mas presion en la arena.",
    };

    if (this.ui.difficultyLabel) {
      this.ui.difficultyLabel.textContent = labelMap[this.settings.difficulty] ?? preset.label;
    }

    if (this.ui.difficultyHelp) {
      this.ui.difficultyHelp.textContent =
        descMap[this.settings.difficulty] ?? preset.description;
    }

    for (const button of this.ui.difficultyButtons) {
      const active = button.dataset.difficulty === this.settings.difficulty;
      if (button.dataset.difficulty) {
        button.textContent = labelMap[button.dataset.difficulty] ?? button.textContent;
      }
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    }
  }

  toggleSettingsPanel(forceValue) {
    if (!this.ui.settingsPanel) {
      return;
    }

    const shouldOpen =
      typeof forceValue === "boolean" ? forceValue : this.ui.settingsPanel.hidden;

    if (shouldOpen) {
      this.toggleAlliesPanel(false);
    }

    this.ui.settingsPanel.hidden = !shouldOpen;
    if (this.ui.overlay) {
      this.ui.overlay.classList.toggle("overlay--settings", shouldOpen);
    }
    if (this.ui.worldPanel) {
      this.ui.worldPanel.hidden = shouldOpen ? true : !this.overlayWorldSelectActive;
    }

    if (this.ui.settingsToggle) {
      this.ui.settingsToggle.textContent = shouldOpen
        ? this.tr("Ocultar ajustes", "Hide settings")
        : this.tr("Configuracion", "Settings");
    }
  }

  toggleAlliesPanel(forceValue) {
    if (!this.ui.alliesSettingsPanel) {
      return;
    }

    const shouldOpen =
      typeof forceValue === "boolean" ? forceValue : this.ui.alliesSettingsPanel.hidden;

    if (shouldOpen && this.ui.settingsPanel && !this.ui.settingsPanel.hidden) {
      this.toggleSettingsPanel(false);
    }

    this.ui.alliesSettingsPanel.hidden = !shouldOpen;
    if (this.ui.overlay) {
      this.ui.overlay.classList.toggle("overlay--allies", shouldOpen);
    }
    if (this.ui.worldPanel) {
      this.ui.worldPanel.hidden = shouldOpen ? true : !this.overlayWorldSelectActive;
    }

    if (this.ui.alliesToggle) {
      this.ui.alliesToggle.textContent = shouldOpen
        ? this.tr("Ocultar aliados", "Hide allies")
        : this.tr("Aliados", "Allies");
    }

    if (shouldOpen) {
      this.rebuildAlliesSettingsUi();
    }
  }

  updateShopUi() {
    if (this.ui.shopCoins) {
      this.ui.shopCoins.textContent = this.isDevModeActive() ? "∞" : String(this.coins);
    }

    if (this.ui.restTimer) {
      const seconds = Math.max(0, Math.ceil(this.shop.restTimer));
      this.ui.restTimer.textContent = `${seconds}s`;
    }

    if (this.ui.shopMessage) {
      this.ui.shopMessage.textContent = this.translateText(this.shop.message);
    }

    if (this.ui.shopContinue) {
      this.ui.shopContinue.textContent = this.shop.readyToResume
        ? this.tr("Entrar al combate", "Enter combat")
        : this.tr("Comenzar ya", "Start now");
    }

    if (this.shopPointer.hoveredUpgrade) {
      this.updateShopTooltip(this.shopPointer.hoveredUpgrade);
    }
  }

  getCycleSkipCost() {
    return SHOP_SKIP_COST;
  }

  getRemainingCycleSkips() {
    if (this.isDevModeActive()) {
      return Infinity;
    }
    return Math.max(0, SHOP_SKIP_LIMIT - (this.shop.skipUses ?? 0));
  }

  getUsedCycleSkips() {
    return clamp(this.shop.skipUses ?? 0, 0, SHOP_SKIP_LIMIT);
  }

  getPauseOverlayCopy(statusMessage = "") {
    const base =
      "Haz click en el boton o en la pantalla para volver a la arena.";
    const skipInfo = this.isDevModeActive()
      ? "Dev activo: saltos de ciclo ilimitados."
      : `Saltar ciclo cuesta ${this.getCycleSkipCost()} monedas. Usos: ${this.getUsedCycleSkips()} / ${SHOP_SKIP_LIMIT}.`;
    return statusMessage ? `${statusMessage} ${skipInfo}` : `${base} ${skipInfo}`;
  }

  showPauseOverlay(statusMessage = "") {
    this.showOverlay(
      "Pausa tactica",
      this.getPauseOverlayCopy(statusMessage),
      "Volver al combate",
      { showSettings: true, showActions: true, showCycleSkip: true, showDevShop: true, showAllies: true },
    );
  }

  skipCurrentCycle() {
    if (this.phase !== "combat" && this.phase !== "boss") {
      return;
    }

    if (!this.isDevModeActive() && this.getRemainingCycleSkips() <= 0) {
      this.showPauseOverlay("Ya agotaste los 4 saltos de esta run.");
      return;
    }

    if (!this.isDevModeActive() && this.cycleCount >= FINAL_BOSS_CYCLE) {
      this.showPauseOverlay("No puedes saltar el ciclo final.");
      return;
    }

    const cost = this.getCycleSkipCost();
    if (!this.isDevModeActive() && this.coins < cost) {
      this.showPauseOverlay(`Te faltan ${cost - this.coins} monedas para saltar este ciclo.`);
      return;
    }

    if (!this.isDevModeActive()) {
      this.coins -= cost;
      this.shop.skipUses += 1;
    }
    this.inputs.shoot = false;
    this.updateHud();
    this.beginCycleTransition();
  }

  skipToShop() {
    if (!this.isDevModeActive()) {
      return;
    }
    if (this.phase !== "combat" && this.phase !== "boss") {
      return;
    }
    if (this.gameOver) {
      return;
    }
    this.openShopPhase();
  }

  getUpgradeCost(upgrade) {
    const config = SHOP_UPGRADES[upgrade];
    if (!config) {
      return Infinity;
    }

    if (this.isDevModeActive()) {
      return 0;
    }

    return config.baseCost + this.playerProgress[upgrade] * config.costStep;
  }

  buyUpgrade(upgrade) {
    const config = SHOP_UPGRADES[upgrade];
    if (!config) {
      return;
    }
    const label = this.getUpgradeLabel(upgrade);

    if (this.playerProgress[upgrade] >= config.maxLevel) {
      if (config.category === "weapon") {
        this.playerWeapon = config.weaponMode ?? this.playerWeapon;
        this.shop.message = `${label} ${this.tr("equipada.", "equipped.")}`;
        this.persistRunProgress();
        this.playUpgradeSfx();
        this.updateShopUi();
        this.updateHud();
        this.refreshShopObjects();
        return;
      }
      this.shop.message = `${label} ${this.tr("ya esta al maximo.", "is already maxed.")}`;
      this.updateShopUi();
      return;
    }

    const cost = this.getUpgradeCost(upgrade);
    if (!this.isDevModeActive()) {
      if (this.coins < cost) {
        this.shop.message = this.tr(
          `Te faltan ${cost - this.coins} monedas para ${label}.`,
          `You need ${cost - this.coins} more coins for ${label}.`,
        );
        this.updateShopUi();
        return;
      }
      this.coins -= cost;
    }

    if (config.category === "weapon") {
      this.playerProgress[upgrade] = Math.min(
        config.maxLevel,
        (this.playerProgress[upgrade] ?? 0) + 1,
      );
      this.playerWeapon = config.weaponMode ?? this.playerWeapon;
      this.shop.message = `${label} ${this.tr("equipada.", "equipped.")}`;
      this.persistRunProgress();
      this.playUpgradeSfx();
      this.updateShopUi();
      this.updateHud();
      this.refreshShopObjects();
      return;
    }

    this.playerProgress[upgrade] += 1;

    if (upgrade === "maxShield") {
      this.player.health = Math.min(this.getMaxShield(), this.player.health + 20);
    }

    this.shop.message = `${label} ${this.tr("mejorado.", "upgraded.")}`;
    this.persistRunProgress();
    this.playUpgradeSfx();
    this.updateShopUi();
    this.updateHud();
    this.refreshShopObjects();
  }

  getMaxShield() {
    return PLAYER_BASE_MAX_HEALTH + this.playerProgress.maxShield * 20;
  }

  getBossShieldMax(def) {
    if (typeof def.shieldOverride === "number") {
      return def.shieldOverride;
    }
    return Math.round(this.getMaxShield() * 1.1 + def.maxHealth * 0.42);
  }

  getWeaponConfig() {
    return PLAYER_WEAPONS[this.playerWeapon] ?? PLAYER_WEAPONS.pistol;
  }

  getBaseShotDamage() {
    return PLAYER_BASE_DAMAGE + this.playerProgress.damage * 6;
  }

  getShotCooldownBase() {
    const base = Math.max(
      0.055,
      PLAYER_BASE_SHOT_COOLDOWN - this.playerProgress.fireRate * 0.014,
    );
    return base * (this.getWeaponConfig().cooldownMultiplier ?? 1);
  }

  getShotDamage() {
    return this.getBaseShotDamage() * (this.getWeaponConfig().damageMultiplier ?? 1);
  }

  getPlayerProjectileSpeed() {
    const speedBoost = 1 + this.playerProgress.projectileSpeed * 0.15;
    return (
      PLAYER_PROJECTILE_SPEED *
      speedBoost *
      (this.getWeaponConfig().projectileSpeedMultiplier ?? 1)
    );
  }

  getPlayerPierceCount() {
    return (this.playerProgress.pierce ?? 0) + (this.getWeaponConfig().pierceBonus ?? 0);
  }

  getKillShieldBonus() {
    return (this.playerProgress.killShield ?? 0) * 2;
  }

  getHitShieldBonus() {
    return (this.playerProgress.hitShield ?? 0) * 1.4;
  }

  getDamageResistanceMultiplier() {
    const resistance = clamp((this.playerProgress.damageResist ?? 0) * 0.07, 0, 0.6);
    return 1 - resistance;
  }

  getPlayerMoveSpeed() {
    return PLAYER_BASE_SPEED * (1 + (this.playerProgress.mobility ?? 0) * 0.06);
  }

  getShieldPickupValue() {
    return 22 + this.playerProgress.loot * 8;
  }

  getNextLootDelay() {
    const preset = this.getDifficultyPreset();
    const reduction = this.playerProgress.loot * 0.8;
    return Math.max(5, preset.pickupInterval - reduction) * randRange(0.84, 1.14);
  }

  getBossSummonPool(mapId = this.currentMapId) {
    const themedPools = {
      arena: ["scout", "brute", "specter"],
      rift: ["riftstalker", "hexcaster", "specter"],
      forge: ["brute", "warden", "swarm", "emberhound", "slaggunner"],
      vault: ["frostling", "cryocaster"],
      neon: ["scout", "lancer", "swarm", "neonrunner", "neoncaster"],
      biograve: ["brute", "swarm", "riftstalker", "hexcaster", "radstalker", "sporebruiser"],
      citadel: ["riftstalker", "hexcaster", "voidreaver", "voidseer"],
      helltrack: ["brute", "warden", "riftstalker", "hellfiend", "hellcaster"],
    };

    return themedPools[mapId] ?? themedPools.arena;
  }

  decorateFinalSentinelModel(model) {
    if (model.userData.core?.material) {
      model.userData.core.material.color.set(0xff8a4a);
      model.userData.core.material.emissive.set(0xff8a4a);
      model.userData.core.material.emissiveIntensity = 1.45;
      model.userData.core.scale.setScalar(1.18);
    }

    if (model.userData.outerRing?.material) {
      model.userData.outerRing.material.color.set(0x2f1713);
      model.userData.outerRing.material.emissive.set(0xff5b2f);
      model.userData.outerRing.material.emissiveIntensity = 0.92;
      model.userData.outerRing.scale.setScalar(1.12);
    }

    for (const key of ["leftAntenna", "rightAntenna"]) {
      if (model.userData[key]?.material) {
        model.userData[key].material.color.set(0x4a2114);
        model.userData[key].material.emissive.set(0xff7a3d);
        model.userData[key].material.emissiveIntensity = 0.82;
      }
    }

    const crown = new THREE.Mesh(
      new THREE.TorusGeometry(2.25, 0.1, 12, 32),
      new THREE.MeshStandardMaterial({
        color: 0xff7a3d,
        emissive: 0xff7a3d,
        emissiveIntensity: 1.15,
        roughness: 0.12,
        metalness: 0.78,
      }),
    );
    crown.rotation.x = Math.PI / 2;
    crown.position.y = 0.18;
    model.add(crown);

    const flames = [];
    for (let i = 0; i < 6; i += 1) {
      const flame = new THREE.Mesh(
        new THREE.ConeGeometry(0.18, 0.82, 6),
        new THREE.MeshStandardMaterial({
          color: 0xffc14b,
          emissive: 0xff6b2f,
          emissiveIntensity: 1.2,
          transparent: true,
          opacity: 0.92,
          roughness: 0.06,
          metalness: 0.14,
        }),
      );
      const angle = (i / 6) * Math.PI * 2;
      flame.position.set(Math.cos(angle) * 2.2, 0.2, Math.sin(angle) * 2.2);
      flame.rotation.z = Math.PI;
      flame.userData.baseHeight = 0.2;
      flame.userData.phase = i * 0.8;
      model.add(flame);
      flames.push(flame);
    }

    model.userData.overheatCrown = crown;
    model.userData.overheatFlames = flames;
  }

  decorateForgeWarlordModel(model) {
    const glowColor = new THREE.Color(0xff7a3d);
    const armorColor = new THREE.Color(0x3a1a12);

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }
      if (!child.material) {
        return;
      }
      child.material = child.material.clone();
      child.material.color.set(armorColor);
      if (child.material.emissive) {
        child.material.emissive.set(glowColor);
        child.material.emissiveIntensity = 1.05;
      }
    });

    if (model.userData.core?.material) {
      model.userData.core.material = model.userData.core.material.clone();
      model.userData.core.material.color.set(0xffb347);
      model.userData.core.material.emissive.set(glowColor);
      model.userData.core.material.emissiveIntensity = 1.2;
    }

    if (model.userData.leftBlade?.material) {
      model.userData.leftBlade.material = model.userData.leftBlade.material.clone();
      model.userData.leftBlade.material.color.set(glowColor);
      model.userData.leftBlade.material.emissive.set(glowColor);
      model.userData.leftBlade.material.emissiveIntensity = 1.05;
    }

    if (model.userData.rightBlade?.material) {
      model.userData.rightBlade.material = model.userData.rightBlade.material.clone();
      model.userData.rightBlade.material.color.set(glowColor);
      model.userData.rightBlade.material.emissive.set(glowColor);
      model.userData.rightBlade.material.emissiveIntensity = 1.05;
    }
  }

  decorateGlacierBossModel(model) {
    const glowColor = new THREE.Color(0xb9f7ff);
    const armorColor = new THREE.Color(0x0f1928);

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }
      if (!child.material) {
        return;
      }
      child.material = child.material.clone();
      child.material.color.set(armorColor);
      if (child.material.emissive) {
        child.material.emissive.set(glowColor);
        child.material.emissiveIntensity = 1.05;
      }
    });

    if (model.userData.core?.material) {
      model.userData.core.material = model.userData.core.material.clone();
      model.userData.core.material.color.set(glowColor);
      model.userData.core.material.emissive.set(glowColor);
      model.userData.core.material.emissiveIntensity = 1.25;
    }

    if (model.userData.outerRing?.material) {
      model.userData.outerRing.material = model.userData.outerRing.material.clone();
      model.userData.outerRing.material.color.set(0xd8feff);
      model.userData.outerRing.material.emissive.set(glowColor);
      model.userData.outerRing.material.emissiveIntensity = 1.1;
    }
  }

  decorateNeonWraithModel(model) {
    const glowColor = new THREE.Color(0x25ffd7);
    const accentColor = new THREE.Color(0xffa41b);

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }
      if (!child.material) {
        return;
      }
      child.material = child.material.clone();
      if (child.material.emissive) {
        child.material.emissive.set(glowColor);
        child.material.emissiveIntensity = 1.05;
      }
    });

    if (model.userData.core?.material) {
      model.userData.core.material = model.userData.core.material.clone();
      model.userData.core.material.color.set(glowColor);
      model.userData.core.material.emissive.set(glowColor);
      model.userData.core.material.emissiveIntensity = 1.25;
    }

    if (model.userData.halo?.material) {
      model.userData.halo.material = model.userData.halo.material.clone();
      model.userData.halo.material.color.set(accentColor);
      model.userData.halo.material.emissive.set(accentColor);
      model.userData.halo.material.emissiveIntensity = 1.15;
    }
  }

  decorateRadlordModel(model) {
    const glowColor = new THREE.Color(0x8dff7a);
    const armorColor = new THREE.Color(0x0f1f14);

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }
      if (!child.material) {
        return;
      }
      child.material = child.material.clone();
      child.material.color.set(armorColor);
      if (child.material.emissive) {
        child.material.emissive.set(glowColor);
        child.material.emissiveIntensity = 1.05;
      }
    });

    if (model.userData.heart?.material) {
      model.userData.heart.material = model.userData.heart.material.clone();
      model.userData.heart.material.color.set(0xb4ff8f);
      model.userData.heart.material.emissive.set(glowColor);
      model.userData.heart.material.emissiveIntensity = 1.4;
    }

    if (model.userData.halo?.material) {
      model.userData.halo.material = model.userData.halo.material.clone();
      model.userData.halo.material.color.set(0x2b4a34);
      model.userData.halo.material.emissive.set(glowColor);
      model.userData.halo.material.emissiveIntensity = 0.8;
    }

    const orbGroup = new THREE.Group();
    const orbMaterial = new THREE.MeshStandardMaterial({
      color: 0x6cff77,
      emissive: 0x2bff5a,
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0.78,
      roughness: 0.18,
      metalness: 0.4,
    });
    for (let i = 0; i < 12; i += 1) {
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), orbMaterial);
      const angle = (i / 12) * Math.PI * 2;
      const radius = 2.2;
      orb.position.set(Math.cos(angle) * radius, 0.3, Math.sin(angle) * radius);
      orb.userData.phase = i * 0.6;
      orbGroup.add(orb);
    }
    orbGroup.position.y = 0.15;
    model.add(orbGroup);
    model.userData.radOrbiters = orbGroup;
  }

  decorateVoidArchonModel(model) {
    const glowColor = new THREE.Color(0x8a6cff);
    const armorColor = new THREE.Color(0x0b0f1f);

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }
      if (!child.material) {
        return;
      }
      child.material = child.material.clone();
      child.material.color.set(armorColor);
      if (child.material.emissive) {
        child.material.emissive.set(glowColor);
        child.material.emissiveIntensity = 1.1;
      }
    });

    if (model.userData.heart?.material) {
      model.userData.heart.material = model.userData.heart.material.clone();
      model.userData.heart.material.color.set(0xb49bff);
      model.userData.heart.material.emissive.set(glowColor);
      model.userData.heart.material.emissiveIntensity = 1.45;
    }

    const orbiters = new THREE.Group();
    const orbMaterial = new THREE.MeshStandardMaterial({
      color: 0x7a5cff,
      emissive: 0x8a6cff,
      emissiveIntensity: 1.15,
      transparent: true,
      opacity: 0.82,
      roughness: 0.12,
      metalness: 0.5,
    });
    for (let i = 0; i < 10; i += 1) {
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), orbMaterial);
      const angle = (i / 10) * Math.PI * 2;
      const radius = 2.1;
      orb.position.set(Math.cos(angle) * radius, 0.25, Math.sin(angle) * radius);
      orb.userData.phase = i * 0.7;
      orbiters.add(orb);
    }
    orbiters.position.y = 0.2;
    model.add(orbiters);
    model.userData.voidOrbiters = orbiters;
  }

  decorateInfernoTyrantModel(model) {
    const glowColor = new THREE.Color(0xff6b2f);
    const armorColor = new THREE.Color(0x2a120c);

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }
      if (!child.material) {
        return;
      }
      child.material = child.material.clone();
      child.material.color.set(armorColor);
      if (child.material.emissive) {
        child.material.emissive.set(glowColor);
        child.material.emissiveIntensity = 1.05;
      }
    });

    if (model.userData.core?.material) {
      model.userData.core.material = model.userData.core.material.clone();
      model.userData.core.material.color.set(0xffa24b);
      model.userData.core.material.emissive.set(glowColor);
      model.userData.core.material.emissiveIntensity = 1.4;
    }

    const flames = [];
    for (let i = 0; i < 6; i += 1) {
      const flame = new THREE.Mesh(
        new THREE.ConeGeometry(0.2, 0.9, 6),
        new THREE.MeshStandardMaterial({
          color: 0xffc14b,
          emissive: 0xff6b2f,
          emissiveIntensity: 1.2,
          transparent: true,
          opacity: 0.9,
          roughness: 0.08,
          metalness: 0.15,
        }),
      );
      const angle = (i / 6) * Math.PI * 2;
      flame.position.set(Math.cos(angle) * 2.4, 0.3, Math.sin(angle) * 2.4);
      flame.rotation.z = Math.PI;
      flame.userData.baseHeight = 0.3;
      flame.userData.phase = i * 0.7;
      model.add(flame);
      flames.push(flame);
    }

    model.userData.infernoFlames = flames;
  }

  spawnBossMinions(enemy, count) {
    const activeRegularEnemies = this.enemies.filter((entry) => !entry.isBoss).length;
    const spawnBudget = Math.max(0, Math.min(count, 7 - activeRegularEnemies));
    if (spawnBudget <= 0) {
      return;
    }

    const pool = this.getBossSummonPool();
    for (let i = 0; i < spawnBudget; i += 1) {
      const type = pool[Math.floor(Math.random() * pool.length)];
      this.spawnEnemy(type);
    }
  }

  tryJump() {
    const canControl =
      this.pointerLocked || (this.isTouchDevice && this.isMobileGameplayActive());
    if (
      !canControl ||
      this.gameOver ||
      this.phase === "shop" ||
      this.phase === "cycle-transition"
    ) {
      return;
    }

    if (!this.player.grounded) {
      return;
    }

    this.player.grounded = false;
    this.player.verticalVelocity = PLAYER_JUMP_FORCE;
    this.player.bob = 0;
  }

  isUpgradeAvailable(upgradeId) {
    const config = SHOP_UPGRADES[upgradeId];
    if (!config) {
      return false;
    }
    const level = this.playerProgress[upgradeId] ?? 0;
    return level < config.maxLevel;
  }

  rollShopOffers() {
    const allIds = Object.keys(SHOP_UPGRADES);
    const eligible = allIds.filter((upgradeId) => this.isUpgradeAvailable(upgradeId));

    if (eligible.length === 0) {
      eligible.push(...allIds);
    }

    const pool =
      eligible.length >= SHOP_OFFER_SLOTS
        ? [...eligible]
        : [
            ...eligible,
            ...allIds.filter((upgradeId) => !eligible.includes(upgradeId)),
          ];

    shuffleInPlace(pool);
    const offers = pool.slice(0, SHOP_OFFER_SLOTS);
    this.applyShopOffers(offers);
  }

  applyShopOffers(offers) {
    this.shop.offers = offers;

    for (const [index, entry] of this.shopPointer.items.entries()) {
      const upgradeId = offers[index] ?? null;
      this.setShopStandUpgrade(entry, upgradeId);
    }

    this.setHoveredShopUpgrade(null);
    this.refreshShopObjects();
  }

  setShopStandUpgrade(entry, upgradeId) {
    if (!entry?.root) {
      return;
    }

    if (!upgradeId) {
      entry.root.visible = false;
      entry.id = null;
      return;
    }

    entry.root.visible = true;
    entry.id = upgradeId;
    entry.root.userData.shopUpgrade = upgradeId;

    if (entry.core) {
      entry.root.remove(entry.core);
    }

    const core = this.createShopUpgradeModel(upgradeId);
    core.position.y = 2.34;
    core.userData.shopUpgrade = upgradeId;
    entry.root.add(core);
    entry.core = core;
    entry.root.userData.core = core;
  }

  refreshShopObjects() {
    for (const entry of this.shopPointer.items) {
      if (!entry?.id || !entry.root.visible) {
        continue;
      }
      const level = this.playerProgress[entry.id];
      const config = SHOP_UPGRADES[entry.id];
      const isMaxed = level >= config.maxLevel;
      const affordable = this.coins >= this.getUpgradeCost(entry.id);

      entry.core.scale.setScalar(entry.id === this.shopPointer.hoveredUpgrade ? 1.14 : 1);
      entry.plate.material.emissiveIntensity = entry.id === this.shopPointer.hoveredUpgrade
        ? 0.48
        : affordable
          ? 0.2
          : 0.08;
      entry.pedestal.material.emissive = new THREE.Color(
        isMaxed ? 0x40536a : affordable ? 0xffd166 : 0x3b2b18,
      );
      entry.pedestal.material.emissiveIntensity = isMaxed ? 0.26 : affordable ? 0.12 : 0.04;
    }
  }

  getUpgradePreview(upgradeId) {
    const config = SHOP_UPGRADES[upgradeId];
    if (!config) {
      return null;
    }

    const level = this.playerProgress[upgradeId];
    const cost = this.getUpgradeCost(upgradeId);
    const isMaxed = level >= config.maxLevel;
    const isWeapon = config.category === "weapon";
    const label = this.getUpgradeLabel(upgradeId);
    const description = this.getUpgradeDescription(upgradeId);

    let meta = `Nivel ${level} / ${config.maxLevel}`;
    if (isMaxed) {
      meta += " • MAX";
    } else {
      meta += ` • Costo ${cost} monedas`;
      if (this.coins < cost) {
        meta += ` • Te faltan ${cost - this.coins}`;
      } else {
        meta += " • Click para comprar";
      }
    }

    if (isWeapon) {
      if (isMaxed) {
        meta = this.playerWeapon === config.weaponMode ? "Equipada" : "Comprada";
      } else {
        meta = `Costo ${cost} monedas`;
        if (this.coins < cost) {
          meta += ` â€¢ Te faltan ${cost - this.coins}`;
        } else {
          meta += " â€¢ Click para comprar";
        }
      }
    }

    if (this.isDevModeActive() && !isMaxed) {
      meta = isWeapon ? "Dev activo â€¢ Click para equipar" : "Dev activo â€¢ Gratis";
    }

    return {
      title: label,
      description,
      meta,
    };
  }

  getRandomMerchantDialogue() {
    const common = [
      this.tr("Hoy el metal vale mas que la suerte.", "Today steel is worth more than luck."),
      this.tr("Tengo mejoras finas, tu traes las monedas.", "I bring premium upgrades, you bring the coins."),
      this.tr("Ese boss no cae solo, invierte bien.", "That boss won't fall alone, invest smart."),
      this.tr("Si respiras, aun puedes ganar la run.", "If you're breathing, you can still win the run."),
      this.tr("No vendo milagros, vendo ventaja.", "I don't sell miracles, I sell advantage."),
      this.tr("Compra rapido, el portal no espera.", "Buy fast, the portal won't wait."),
      this.tr("Overheat no perdona errores.", "Overheat does not forgive mistakes."),
      this.tr("Apunta al escudo primero, luego al ego.", "Break the shield first, then break its ego."),
    ];
    const rare = [
      this.tr("Escuche al vacio susurrar tu nombre.", "I heard the void whisper your name."),
      this.tr("Si Radlord duda, tu disparas.", "If Radlord hesitates, you fire."),
      this.tr("Hoy las monedas pesan como destino.", "Today coins weigh like destiny."),
      this.tr("Hay runs que se recuerdan por siglos.", "Some runs are remembered for centuries."),
    ];
    const legendary = [
      this.tr("Leyenda: el jugador que vence al vacio sin retroceder.", "Legend: the player who beats the void without stepping back."),
      this.tr("Te vi derribar a Overheat. Eso no lo logra cualquiera.", "I saw you take down Overheat. Not everyone can do that."),
      this.tr("Destino marcado: romperas el siguiente mundo tambien.", "Marked destiny: you will break the next world too."),
    ];

    const roll = Math.random();
    let rarity = "common";
    let pool = common;
    if (roll < 0.08) {
      rarity = "legendary";
      pool = legendary;
    } else if (roll < 0.28) {
      rarity = "rare";
      pool = rare;
    }

    const line = pool[Math.floor(Math.random() * pool.length)];
    const tag = rarity === "legendary"
      ? this.tr("[LEGENDARIO]", "[LEGENDARY]")
      : rarity === "rare"
        ? this.tr("[RARO]", "[RARE]")
        : this.tr("[COMUN]", "[COMMON]");
    return `${tag} ${line}`;
  }

  isHoveringShopNpc() {
    if (this.phase !== "shop" || !this.shopGroup.visible || !this.shopPointer.npc) {
      return false;
    }

    this.raycaster.setFromCamera(this.screenPointer, this.camera);
    const hits = this.raycaster.intersectObjects([this.shopPointer.npc], true);
    return hits.length > 0;
  }

  triggerMerchantDialogue() {
    const line = this.getRandomMerchantDialogue();
    this.shop.message = line;
    if (this.ui.merchantDialogueText) {
      this.ui.merchantDialogueText.textContent = line;
    }
    if (this.ui.merchantDialogue) {
      this.ui.merchantDialogue.hidden = false;
    }
    this.merchantDialogue.timer = MERCHANT_DIALOGUE_DURATION;
    this.updateShopUi();
    this.playUpgradeSfx();
  }

  updateMerchantDialogue(dt) {
    if (this.phase !== "shop") {
      this.merchantDialogue.timer = 0;
      if (this.ui.merchantDialogue) {
        this.ui.merchantDialogue.hidden = true;
      }
      return;
    }

    if (this.merchantDialogue.timer <= 0) {
      if (this.ui.merchantDialogue) {
        this.ui.merchantDialogue.hidden = true;
      }
      return;
    }

    this.merchantDialogue.timer = Math.max(0, this.merchantDialogue.timer - dt);
    if (this.merchantDialogue.timer <= 0 && this.ui.merchantDialogue) {
      this.ui.merchantDialogue.hidden = true;
    }
  }

  updateShopHover() {
    if (this.phase !== "shop" || !this.shopGroup.visible) {
      this.shopPointer.hoveringNpc = false;
      this.setHoveredShopUpgrade(null);
      return;
    }

    this.raycaster.setFromCamera(this.screenPointer, this.camera);
    const visibleItems = this.shopPointer.items.filter(
      (entry) => entry.root.visible && entry.id,
    );
    const intersections = this.raycaster.intersectObjects(
      visibleItems.map((entry) => entry.root),
      true,
    );

    let hoveredUpgrade = null;
    for (const hit of intersections) {
      let current = hit.object;
      while (current) {
        if (current.userData?.shopUpgrade) {
          hoveredUpgrade = current.userData.shopUpgrade;
          break;
        }
        current = current.parent;
      }

      if (hoveredUpgrade) {
        break;
      }
    }

    this.shopPointer.hoveringNpc = this.isHoveringShopNpc();
    this.setHoveredShopUpgrade(hoveredUpgrade);
  }

  setHoveredShopUpgrade(upgradeId) {
    this.shopPointer.hoveredUpgrade = upgradeId;
    this.renderer.domElement.style.cursor =
      this.phase === "shop" && (upgradeId || this.shopPointer.hoveringNpc) ? "pointer" : "default";

    if (!upgradeId) {
      this.hideShopTooltip();
      this.shop.message = this.shopPointer.hoveringNpc
        ? this.tr("Haz click en el vendedor para un consejo.", "Click the merchant for a tip.")
        : "Pasa el mouse sobre una mejora y haz click para comprarla.";
      this.updateShopUi();
      this.refreshShopObjects();
      return;
    }

    const preview = this.getUpgradePreview(upgradeId);
    if (preview && this.ui.shopMessage) {
      this.shop.message = preview.meta;
    }

    this.updateShopTooltip(upgradeId);
    this.updateShopUi();
    this.refreshShopObjects();
  }

  updateShopTooltip(upgradeId) {
    const preview = this.getUpgradePreview(upgradeId);
    if (!preview || !this.ui.shopTooltip) {
      return;
    }

    if (this.ui.shopTooltipTitle) {
      this.ui.shopTooltipTitle.textContent = this.translateText(preview.title);
    }
    if (this.ui.shopTooltipDesc) {
      this.ui.shopTooltipDesc.textContent = this.translateText(preview.description);
    }
    if (this.ui.shopTooltipMeta) {
      this.ui.shopTooltipMeta.textContent = this.translateText(preview.meta);
    }

    const width = Math.min(300, window.innerWidth - 24);
    const left = Math.min(
      Math.max(12, this.shopPointer.x + 18),
      window.innerWidth - width - 12,
    );
    const top = Math.min(
      Math.max(12, this.shopPointer.y + 18),
      window.innerHeight - 170,
    );

    this.ui.shopTooltip.style.left = `${left}px`;
    this.ui.shopTooltip.style.top = `${top}px`;
    this.ui.shopTooltip.hidden = false;
  }

  hideShopTooltip() {
    if (this.ui.shopTooltip) {
      this.ui.shopTooltip.hidden = true;
    }
  }

  buyHoveredUpgrade() {
    if (!this.shopPointer.hoveredUpgrade) {
      if (this.isHoveringShopNpc()) {
        this.triggerMerchantDialogue();
      }
      return;
    }

    this.buyUpgrade(this.shopPointer.hoveredUpgrade);
  }

  showShopWorld() {
    this.shopGroup.visible = true;
    this.weapon.visible = false;
    if (this.isTouchDevice) {
      this.resetMobileInput();
      this.updateMobileControlsVisibility();
    }
    this.screenPointer.set(-10, -10);
    this.shopPointer.hoveredUpgrade = null;
    this.shopPointer.hoveringNpc = false;
    this.merchantDialogue.timer = 0;
    if (this.ui.merchantDialogue) {
      this.ui.merchantDialogue.hidden = true;
    }

    this.camera.position.set(0, 4.25, 12.4);
    this.camera.lookAt(0, 2.3, 0.8);
    this.camera.updateProjectionMatrix();

    if (this.ui.shopHud) {
      this.ui.shopHud.hidden = false;
    }

    this.hideShopTooltip();
    this.refreshShopObjects();
  }

  hideShopWorld() {
    this.shopGroup.visible = false;
    this.weapon.visible = true;
    if (this.isTouchDevice) {
      this.updateMobileControlsVisibility();
    }
    this.shopPointer.hoveredUpgrade = null;
    this.shopPointer.hoveringNpc = false;
    this.merchantDialogue.timer = 0;
    if (this.ui.merchantDialogue) {
      this.ui.merchantDialogue.hidden = true;
    }
    this.renderer.domElement.style.cursor = "default";
    this.hideShopTooltip();
    if (this.ui.shopHud) {
      this.ui.shopHud.hidden = true;
    }
  }

  updateShopScene(dt) {
    if (!this.shopGroup.visible) {
      return;
    }

    const npc = this.shopPointer.npc;
    if (npc) {
      npc.userData.leftArm.rotation.z = Math.sin(this.elapsed * 1.8) * 0.14;
      npc.userData.rightArm.rotation.z = -Math.sin(this.elapsed * 1.8) * 0.14;
      npc.userData.halo.rotation.z += dt * 0.8;
      npc.userData.head.rotation.y = Math.sin(this.elapsed * 0.9) * 0.12;
    }

    for (const [index, entry] of this.shopPointer.items.entries()) {
      if (!entry.root.visible) {
        continue;
      }
      const hoverBoost = entry.id === this.shopPointer.hoveredUpgrade ? 0.14 : 0;
      entry.core.position.y =
        2.34 + Math.sin(this.elapsed * 1.7 + index) * (0.16 + hoverBoost * 0.2);
      entry.core.rotation.y += dt * (0.75 + index * 0.12);
      entry.plate.rotation.y -= dt * 0.4;
    }
  }

  hideCycleTransitionWorld() {
    const transition = this.cycleTransition;
    transition.active = false;
    transition.stage = "idle";
    transition.mode = "hole";
    transition.timer = 0;
    transition.mapApplied = false;
    transition.specialIntro = false;
    transition.nextMapId = this.currentMapId;
    this.transitionGroup.visible = false;

    if (transition.cover) {
      transition.cover.scale.setScalar(1);
    }
    if (transition.voidDisk) {
      transition.voidDisk.material.opacity = 0;
    }
    if (transition.rim) {
      transition.rim.material.opacity = 0;
      transition.rim.material.emissiveIntensity = 0.18;
    }
    if (transition.shaft) {
      transition.shaft.material.opacity = 0;
    }
    if (transition.bottomGlow) {
      transition.bottomGlow.material.opacity = 0;
    }
    if (transition.portalRing) {
      transition.portalRing.material.opacity = 0;
      transition.portalRing.material.emissiveIntensity = 0.6;
      transition.portalRing.scale.setScalar(0.1);
    }
    if (transition.portalHalo) {
      transition.portalHalo.material.opacity = 0;
      transition.portalHalo.material.emissiveIntensity = 0.6;
      transition.portalHalo.scale.setScalar(0.1);
    }
    if (transition.portalCore) {
      transition.portalCore.material.opacity = 0;
      transition.portalCore.scale.setScalar(0.1);
    }
    for (const spire of transition.portalSpires) {
      spire.material.opacity = 0;
      spire.scale.setScalar(0.1);
    }

    this.resetTransitionSentinel();

    this.hideTransitionScreen();
    this.hideCutsceneSubtitle();
    this.weapon.visible = true;
  }

  resetRun() {
    const startWorldId = this.getSelectedWorldId();
    const startCycle = this.getWorldStartCycle(startWorldId);

    this.hideCycleTransitionWorld();
    this.clearCombatEntities();

    this.score = 0;
    this.kills = 0;
    this.coins = 0;
    this.cycleCount = Math.max(0, startCycle - 1);
    this.elapsed = 0;
    this.gameOver = false;
    this.gameStarted = true;
    this.phase = "combat";
    this.currentBoss = null;
    this.wavePlan = null;
    this.bossPhaseSpawned = false;
    this.bossPhaseResolved = false;
    this.finalCutscene.active = false;
    this.finalCutscene.timer = 0;
    this.finalCutscene.lineIndex = 0;
    this.finalCutscene.stage = "lines";
    this.finalCutscene.sceneStarted = false;
    this.finalCutscene.sceneShot = false;
    this.hideCutsceneSubtitle();
    this.hideStaticScreen();
    this.hideWhiteScreen();
    this.hideCreditsScreen();
    this.hideTrailerTitleScreen();
    this.hideFinalCutsceneActors();
    this.epilogue.active = false;
    this.epilogue.wallHit = false;
    this.epilogue.whiteoutTimer = 0;
    this.postgame.creditsTimer = 0;
    this.postgame.trailerTimer = 0;
    this.postgame.creditsIndex = 0;
    this.waveReveal.waveStartElapsed = 0;
    this.waveReveal.triggered = false;
    this.waveReveal.active = false;
    this.waveReveal.activeTimer = 0;
    this.waveReveal.messageTimer = 0;
    this.camera.position.set(0, 5, 12);
    this.camera.rotation.set(0, 0, 0);
    this.hideEpilogueMap();
    if (this.settings.persistentUpgrades) {
      this.playerProgress = this.sanitizePlayerProgress(this.settings.persistentPlayerProgress);
      this.playerWeapon =
        PLAYER_WEAPONS[this.settings.persistentWeapon] ? this.settings.persistentWeapon : "pistol";
    } else {
      this.playerProgress = this.createDefaultPlayerProgress();
      this.playerWeapon = "pistol";
    }
    this.shop = {
      restTimer: 0,
      readyToResume: false,
      skipUses: 0,
      message: "Compra mejoras antes del siguiente ciclo.",
    };

    this.startCycle(true);
    this.updateShopUi();

    if (!this.pointerLocked) {
      this.showOverlay(
        "Bot Breaker 3D",
        this.getMenuOverlayCopy(startWorldId),
        "Entrar al combate",
        { showSettings: true, showShop: false, showActions: true, showWorldSelect: true },
      );
    }
  }

  startCycle(resetPosition = false, options = {}) {
    const { deferMapTheme = false } = options;
    this.clearCombatEntities();
    this.hideCycleTransitionWorld();
    this.hideShopWorld();

    this.cycleCount += 1;
    this.phase = "combat";
    this.wave = 0;
    this.wavePlan = null;
    this.currentBoss = null;
    this.bossPhaseSpawned = false;
    this.bossPhaseResolved = false;
    this.shop.restTimer = 0;
    this.shop.readyToResume = false;
    this.shop.message = "Compra mejoras antes del siguiente ciclo.";

    this.camera.rotation.set(-0.08, 0, 0);

    this.player.position.set(0, PLAYER_HEIGHT, 18);
    this.player.health = this.getMaxShield();
    this.player.shotCooldown = 0;
    this.player.verticalVelocity = 0;
    this.player.grounded = true;
    this.player.bob = 0;
    this.player.recoil = 0;
    this.player.damagePulse = 0;
    this.camera.position.copy(this.player.position);
    this.spawnRunAllies();

    this.pendingMapId = this.getProgressionMapId(this.cycleCount);
    if (!deferMapTheme) {
      this.applyMapTheme(this.pendingMapId);
    }

    this.defenseLootTimer = this.getNextLootDelay();
    this.startRegularWave(0);
    this.updateHud();
  }

  startRegularWave(wave) {
    this.phase = "combat";
    this.wave = wave;
    this.waveReveal.waveStartElapsed = this.elapsed;
    this.waveReveal.triggered = false;
    this.waveReveal.active = false;
    this.waveReveal.activeTimer = 0;
    this.waveReveal.messageTimer = 0;
    this.wavePlan = {
      totalToSpawn: this.getWaveEnemyTotal(wave),
      spawned: 0,
      aliveLimit: this.getWaveAliveLimit(wave),
    };
    this.spawnTimer =
      wave === 0 ? this.getDifficultyPreset().initialSpawnDelay : this.getNextSpawnDelay();
  }

  startBossWave() {
    this.phase = "boss";
    this.wave = BOSS_WAVE;
    this.waveReveal.waveStartElapsed = this.elapsed;
    this.waveReveal.triggered = false;
    this.waveReveal.active = false;
    this.waveReveal.activeTimer = 0;
    this.waveReveal.messageTimer = 0;
    this.wavePlan = null;
    this.currentBoss = null;
    this.bossPhaseSpawned = false;
    this.bossPhaseResolved = false;
    this.spawnTimer = 0.8;
  }

  getWaveEnemyTotal(wave) {
    const preset = this.getDifficultyPreset();
    return Math.max(
      3,
      Math.round(preset.totalEnemyBase + wave * preset.totalEnemyGrowth),
    );
  }

  getWaveAliveLimit(wave) {
    const preset = this.getDifficultyPreset();
    return Math.min(
      preset.maxSimultaneous,
      Math.round(preset.simultaneousBase + wave * preset.simultaneousGrowth),
    );
  }

  getNextSpawnDelay() {
    const preset = this.getDifficultyPreset();
    const haste = clamp(this.wave * 0.03, 0, 0.22);
    const minDelay = Math.max(0.22, preset.spawnIntervalMin - haste);
    const maxDelay = Math.max(minDelay + 0.05, preset.spawnIntervalMax - haste * 1.2);
    return randRange(minDelay, maxDelay);
  }

  clearCombatEntities() {
    this.clearBossHazards();
    this.clearEntities(this.allies, this.allyGroup);
    this.clearEntities(this.enemies, this.enemyGroup);
    this.clearEntities(this.projectiles, this.projectileGroup);
    this.clearEntities(this.effects, this.effectGroup);
    this.clearEntities(this.pickups, this.pickupGroup);

    this.allies = [];
    this.enemies = [];
    this.projectiles = [];
    this.effects = [];
    this.pickups = [];
    this.rebuildAllyHud();
  }

  clearEntities(list, parent) {
    for (const entry of list) {
      if (entry.mesh) {
        parent.remove(entry.mesh);
      }

      if (entry.root) {
        parent.remove(entry.root);
      }
    }
  }

  clearBossHazards() {
    if (this.bossHazards.radiationTsunami?.mesh) {
      this.effectGroup.remove(this.bossHazards.radiationTsunami.mesh);
    }
    if (this.bossHazards.radiationTsunami?.safeMesh) {
      this.effectGroup.remove(this.bossHazards.radiationTsunami.safeMesh);
    }
    if (this.bossHazards.radiationTsunami?.frontMesh) {
      this.effectGroup.remove(this.bossHazards.radiationTsunami.frontMesh);
    }
    if (this.bossHazards.radiationTsunami?.safeGlowMesh) {
      this.effectGroup.remove(this.bossHazards.radiationTsunami.safeGlowMesh);
    }
    if (this.bossHazards.radiationTsunami?.safeBeaconMesh) {
      this.effectGroup.remove(this.bossHazards.radiationTsunami.safeBeaconMesh);
    }
    this.bossHazards.radiationTsunami = null;

    for (const pillar of this.bossHazards.lavaPillars) {
      if (pillar.base) {
        this.effectGroup.remove(pillar.base);
      }
      if (pillar.column) {
        this.effectGroup.remove(pillar.column);
      }
      if (pillar.glow) {
        this.effectGroup.remove(pillar.glow);
      }
    }
    this.bossHazards.lavaPillars = [];

    const acidStorm = this.bossHazards.acidSnowStorm;
    if (acidStorm) {
      if (acidStorm.blizzardDome) {
        this.effectGroup.remove(acidStorm.blizzardDome);
      }
      if (acidStorm.blizzardCloud) {
        this.effectGroup.remove(acidStorm.blizzardCloud);
      }
      if (acidStorm.acidRainShell) {
        this.effectGroup.remove(acidStorm.acidRainShell);
      }
      if (acidStorm.safeRoof) {
        this.effectGroup.remove(acidStorm.safeRoof);
      }
      if (acidStorm.safeRoofRing) {
        this.effectGroup.remove(acidStorm.safeRoofRing);
      }
      if (acidStorm.safeRoofBeacon) {
        this.effectGroup.remove(acidStorm.safeRoofBeacon);
      }
    }
    this.bossHazards.acidSnowStorm = null;
    const aegisLockdown = this.bossHazards.aegisLockdown;
    if (aegisLockdown) {
      if (aegisLockdown.enemy) {
        aegisLockdown.enemy.aegisLockdownActive = false;
      }
      for (const marker of aegisLockdown.markers) {
        if (marker.ring) {
          this.effectGroup.remove(marker.ring);
        }
        if (marker.glow) {
          this.effectGroup.remove(marker.glow);
        }
      }
    }
    this.bossHazards.aegisLockdown = null;

    const nullGrid = this.bossHazards.nullGridCollapse;
    if (nullGrid) {
      if (nullGrid.enemy) {
        nullGrid.enemy.nullOverheatTimer = 0;
      }
      for (const cell of nullGrid.cells) {
        this.effectGroup.remove(cell.base);
        this.effectGroup.remove(cell.outline);
      }
    }
    this.bossHazards.nullGridCollapse = null;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const dt = Math.min(this.clock.getDelta(), 0.033);
    const canRunPostgame = this.phase === "credits" || this.phase === "sequel-trailer";

    if (this.gameStarted && (!this.gameOver || canRunPostgame)) {
      this.updateAudio(dt);
      if (this.phase === "shop") {
        this.updateShopPhase(dt);
      } else if (this.phase === "cycle-transition") {
        this.updateCycleTransition(dt);
      } else if (this.phase === "final-cutscene") {
        this.updateFinalCutscene(dt);
      } else if (this.phase === "epilogue") {
        this.updateEpilogue(dt);
      } else if (this.phase === "epilogue-whiteout") {
        this.updateEpilogueWhiteout(dt);
      } else if (this.phase === "credits") {
        this.updateCredits(dt);
      } else if (this.phase === "sequel-trailer") {
        this.updateSequelTrailer(dt);
      } else if (this.pointerLocked || this.isMobileGameplayActive()) {
        this.update(dt);
      } else if (this.player.damagePulse > 0) {
        this.player.damagePulse = Math.max(0, this.player.damagePulse - dt * 2);
      }
    } else if (this.player.damagePulse > 0) {
      this.player.damagePulse = Math.max(0, this.player.damagePulse - dt * 2);
    }

    this.renderer.render(this.scene, this.camera);
  }

  update(dt) {
    this.elapsed += dt;

    this.updatePlayer(dt);
    this.updateWaveSpawning(dt);
    this.updateAllies(dt);
    this.updateWaveRevealSystem(dt);
    this.updateEnemies(dt);
    this.updateWaveRevealMarkers(dt);
    this.updateProjectiles(dt);
    this.updatePickups(dt);
    this.updateEffects(dt);
    this.updateBossHazards(dt);
    this.updateHud();
  }

  updateShopPhase(dt) {
    this.elapsed += dt;
    this.updateShopScene(dt);
    this.updateMerchantDialogue(dt);

    if (this.shop.readyToResume) {
      return;
    }

    this.shop.restTimer = Math.max(0, this.shop.restTimer - dt);
    this.updateShopUi();

    if (this.shop.restTimer <= 0) {
      this.beginCycleTransition();
    }
  }

  beginCycleTransition() {
    const nextCycle = this.cycleCount + 1;
    const nextMapId = this.getProgressionMapId(nextCycle);
    const mapChanged = nextMapId !== this.currentMapId;
    const useSentinelIntro =
      mapChanged &&
      nextMapId === "rift" &&
      this.currentMapId === "arena" &&
      nextCycle === MAP_SHIFT_CYCLE;

    this.startNextCycle({ deferMapTheme: mapChanged });
    this.phase = "cycle-transition";
    this.inputs.shoot = false;
    this.ui.overlay?.classList.remove("overlay--visible");
    this.hideShopWorld();
    this.weapon.visible = false;

    const transition = this.cycleTransition;
    transition.active = true;
    transition.stage = useSentinelIntro ? "sentinel-rise" : "opening";
    transition.mode = mapChanged ? "portal" : "hole";
    transition.timer = 0;
    transition.mapApplied = !mapChanged;
    transition.nextMapId = nextMapId;
    transition.specialIntro = useSentinelIntro;
    transition.holePosition.set(0, 0, 0);
    this.hideTransitionScreen();
    this.resetTransitionSentinel();

    if (mapChanged) {
      transition.startCamera.set(0, 4.25, 12.4);
      transition.grabCamera.set(0, 3.92, 9.75);
      transition.openCamera.set(0, 3.6, 7.1);
      transition.descendCamera.set(
        this.player.position.x,
        PLAYER_HEIGHT * 0.58,
        this.player.position.z,
      );
      transition.startLookAt.set(0, 2.8, 0.8);
      transition.descendLookAt.set(
        this.player.position.x,
        PLAYER_HEIGHT * 1.12,
        this.player.position.z - 8,
      );
    } else {
      transition.startCamera.set(0, 6.4, 9.4);
      transition.grabCamera.set(0, 6.4, 9.4);
      transition.openCamera.set(0, 4.6, 4.3);
      transition.descendCamera.set(0, -14.8, 0.72);
      transition.startLookAt.set(0, 0.24, 0);
      transition.descendLookAt.set(0, -18.2, 0);
    }

    this.transitionGroup.visible = true;
    this.transitionGroup.position.copy(transition.holePosition);
    transition.cover.scale.setScalar(1);
    transition.voidDisk.material.opacity = 0;
    transition.rim.material.opacity = 0;
    transition.rim.material.emissiveIntensity = 0.18;
    transition.shaft.material.opacity = 0;
    transition.bottomGlow.material.opacity = 0;
    transition.portalRing.material.opacity = 0;
    transition.portalRing.scale.setScalar(0.1);
    transition.portalHalo.material.opacity = 0;
    transition.portalHalo.scale.setScalar(0.1);
    transition.portalCore.material.opacity = 0;
    transition.portalCore.scale.setScalar(0.1);
    for (const spire of transition.portalSpires) {
      spire.material.opacity = 0;
      spire.scale.setScalar(0.1);
    }

    this.camera.position.copy(transition.startCamera);
    this.camera.lookAt(transition.startLookAt);
    this.camera.updateProjectionMatrix();
  }

  updateCycleTransition(dt) {
    this.elapsed += dt;

    const transition = this.cycleTransition;
    if (!transition.active) {
      return;
    }

    if (transition.mode === "portal") {
      transition.timer += dt;

      if (transition.stage === "sentinel-rise") {
        const progress = smoothstep01(transition.timer / PORTAL_SENTINEL_RISE_DURATION);
        const sentinelPos = new THREE.Vector3(-0.3, 6.8, 1.6).lerp(
          new THREE.Vector3(0, 4.55, 1.18),
          progress,
        );
        const sentinelScale = 0.84 + progress * 0.18;
        transition.sentinelRoot.position.copy(sentinelPos);
        transition.sentinelRoot.scale.setScalar(sentinelScale);

        this.updatePortalVisual(dt, progress * 0.26);
        this.updateTransitionSentinelVisual(dt, 0.38 + progress * 0.52);

        this.camera.position.lerpVectors(
          transition.startCamera,
          transition.grabCamera,
          progress * 0.28,
        );
        this.camera.lookAt(
          sentinelPos.x,
          sentinelPos.y - 0.4 + Math.sin(this.elapsed * 2.2) * 0.08,
          sentinelPos.z - 1.2,
        );

        if (progress >= 1) {
          transition.stage = "sentinel-grab";
          transition.timer = 0;
        }
        return;
      }

      if (transition.stage === "sentinel-grab") {
        const progress = smoothstep01(transition.timer / PORTAL_SENTINEL_GRAB_DURATION);
        const sentinelPos = new THREE.Vector3(0, 4.55, 1.18).lerp(
          new THREE.Vector3(0, 4.08, 5.42),
          progress,
        );
        transition.sentinelRoot.position.copy(sentinelPos);
        transition.sentinelRoot.scale.setScalar(1.02 + progress * 0.12);

        const grabTargets = [
          transition.grabCamera.clone().add(new THREE.Vector3(-0.72, -0.62, -0.92)),
          transition.grabCamera.clone().add(new THREE.Vector3(0.72, -0.62, -0.92)),
        ];

        this.updatePortalVisual(dt, 0.24 + progress * 0.24);
        this.updateTransitionSentinelVisual(
          dt,
          0.88 + progress * 0.12,
          0.2 + progress * 0.8,
          grabTargets,
        );

        this.camera.position.lerpVectors(
          transition.startCamera,
          transition.grabCamera,
          progress,
        );
        this.camera.lookAt(
          sentinelPos.x,
          sentinelPos.y - 0.55,
          sentinelPos.z - 1.8,
        );

        if (progress >= 1) {
          transition.stage = "sentinel-throw";
          transition.timer = 0;
        }
        return;
      }

      if (transition.stage === "sentinel-throw") {
        const progress = smoothstep01(transition.timer / PORTAL_SENTINEL_THROW_DURATION);
        const sentinelPos = new THREE.Vector3(0, 4.08, 5.42).lerp(
          new THREE.Vector3(2.8, 5.2, 2.3),
          progress,
        );
        transition.sentinelRoot.position.copy(sentinelPos);
        transition.sentinelRoot.scale.setScalar(1.14 - progress * 0.12);

        const beamTargets = [
          transition.grabCamera.clone().add(new THREE.Vector3(-0.2, -0.18, -0.35)),
          transition.grabCamera.clone().add(new THREE.Vector3(0.2, -0.18, -0.35)),
        ];

        this.updatePortalVisual(dt, 0.48 + progress * 0.52);
        this.updateTransitionSentinelVisual(
          dt,
          1 - progress * 0.28,
          1 - progress,
          beamTargets,
        );

        this.camera.position.lerpVectors(
          transition.grabCamera,
          transition.openCamera,
          progress,
        );
        this.camera.lookAt(
          transition.startLookAt.x,
          transition.startLookAt.y,
          transition.startLookAt.z,
        );

        if (progress >= 1) {
          this.resetTransitionSentinel();
          transition.stage = "blackout";
          transition.timer = 0;
        }
        return;
      }

      if (transition.stage === "opening") {
        const progress = smoothstep01(transition.timer / PORTAL_OPEN_DURATION);
        this.updatePortalVisual(dt, progress);

        this.camera.position.lerpVectors(
          transition.startCamera,
          transition.openCamera,
          progress,
        );
        this.camera.lookAt(transition.startLookAt);

        if (progress >= 1) {
          transition.stage = "blackout";
          transition.timer = 0;
        }
        return;
      }

      if (transition.stage === "blackout") {
        const progress = smoothstep01(transition.timer / PORTAL_BLACKOUT_DURATION);
        this.updatePortalVisual(dt, 1);

        if (!transition.mapApplied && progress >= 0.58) {
          this.applyMapTheme(transition.nextMapId);
          transition.mapApplied = true;
          this.camera.position.copy(transition.descendCamera);
          this.camera.lookAt(transition.descendLookAt);
        }

        this.setTransitionScreen(
          progress,
          progress > 0.58 ? "Despertando..." : "",
          progress > 0.58
            ? this.getWorldTransitionCopy(
                transition.nextMapId,
                "blackout",
                transition.specialIntro,
              )
            : "",
        );

        if (progress >= 1) {
          transition.stage = "wake";
          transition.timer = 0;
        }
        return;
      }

      const progress = smoothstep01(transition.timer / PORTAL_WAKE_DURATION);
      const finalLookAt = new THREE.Vector3(
        this.player.position.x,
        PLAYER_HEIGHT * 1.02,
        this.player.position.z - 8,
      );
      const wakeLookAt = transition.descendLookAt.clone().lerp(finalLookAt, progress);

      this.camera.position.lerpVectors(
        transition.descendCamera,
        this.player.position,
        progress,
      );
      this.camera.lookAt(wakeLookAt);
      this.setTransitionScreen(
        1 - progress,
        progress < 0.75 ? "Despertando..." : "",
        progress < 0.75
          ? this.getWorldTransitionCopy(transition.nextMapId, "wake", transition.specialIntro)
          : "",
      );

      if (progress >= 1) {
        this.finishCycleTransition();
      }
      return;
    }

    transition.timer += dt;
    const holeTarget = transition.holePosition.clone();

    if (transition.stage === "opening") {
      const progress = smoothstep01(transition.timer / CYCLE_OPEN_DURATION);
      const coverScale = Math.max(0.001, 1 - progress);
      transition.cover.scale.setScalar(coverScale);
      transition.voidDisk.material.opacity = 0.48 + progress * 0.42;
      transition.rim.material.opacity = 0.2 + progress * 0.7;
      transition.rim.material.emissiveIntensity = 0.22 + progress * 0.9;
      transition.shaft.material.opacity = progress * 0.9;
      transition.bottomGlow.material.opacity = progress * 0.95;
      transition.rim.rotation.z += dt * 1.6;

      this.camera.position.lerpVectors(
        transition.startCamera,
        transition.openCamera,
        progress,
      );
      this.camera.lookAt(holeTarget.x, 0.16 - progress * 0.8, holeTarget.z);

      if (progress >= 1) {
        transition.stage = "descending";
        transition.timer = 0;
      }
      return;
    }

    if (transition.stage === "descending") {
      const progress = smoothstep01(transition.timer / CYCLE_DESCEND_DURATION);
      transition.rim.rotation.z += dt * 2.4;
      transition.bottomGlow.rotation.z -= dt * 1.9;
      transition.rim.material.emissiveIntensity = 1.1 + Math.sin(this.elapsed * 6) * 0.18;
      transition.bottomGlow.material.emissiveIntensity =
        0.78 + Math.sin(this.elapsed * 3.8) * 0.16;

      this.camera.position.lerpVectors(
        transition.openCamera,
        transition.descendCamera,
        progress,
      );
      this.camera.lookAt(transition.descendLookAt);

      if (progress >= 1) {
        transition.stage = "closing";
        transition.timer = 0;
      }
      return;
    }

    const progress = smoothstep01(transition.timer / CYCLE_CLOSE_DURATION);
    transition.cover.scale.setScalar(Math.max(0.001, progress));
    transition.voidDisk.material.opacity = (1 - progress) * 0.84;
    transition.rim.material.opacity = 0.85 - progress * 0.6;
    transition.rim.material.emissiveIntensity = 0.96 - progress * 0.52;
    transition.bottomGlow.material.opacity = 0.95 - progress * 0.7;
    transition.rim.rotation.z += dt * 1.2;

    this.camera.position.copy(transition.descendCamera);
    this.camera.lookAt(holeTarget.x, 0.2, holeTarget.z);

    if (progress >= 1) {
      this.finishCycleTransition();
    }
  }

  finishCycleTransition() {
    const transition = this.cycleTransition;
    if (!transition.mapApplied) {
      this.applyMapTheme(transition.nextMapId);
    }
    this.resetTransitionSentinel();
    transition.active = false;
    transition.stage = "idle";
    transition.timer = 0;
    transition.specialIntro = false;
    this.transitionGroup.visible = false;
    this.hideTransitionScreen();
    this.weapon.visible = true;
    this.phase = "combat";

    this.camera.rotation.set(-0.08, 0, 0);
    this.camera.position.copy(this.player.position);
    this.camera.updateProjectionMatrix();

    this.showOverlay(
      "Nuevo ciclo listo",
      this.getCycleReadyCopy(transition.nextMapId),
      "Entrar al combate",
      { showSettings: false, showShop: false, showActions: true },
    );
  }

  updateWaveSpawning(dt) {
    if (this.phase === "combat" && this.wavePlan) {
      let activeRegularEnemies = this.enemies.filter((enemy) => !enemy.isBoss).length;
      const needsReinforcementPack =
        this.wavePlan.spawned > 0 &&
        this.wavePlan.spawned < this.wavePlan.totalToSpawn &&
        activeRegularEnemies === 0;

      if (needsReinforcementPack) {
        while (
          this.wavePlan.spawned < this.wavePlan.totalToSpawn &&
          activeRegularEnemies < this.wavePlan.aliveLimit
        ) {
          const type = pickWeightedEnemy(this.elapsed, this.wave, this.cycleCount);
          this.spawnEnemy(type);
          this.wavePlan.spawned += 1;
          activeRegularEnemies += 1;
        }
        this.spawnTimer = this.getNextSpawnDelay();
      } else {
        this.spawnTimer -= dt;
      }

      if (
        this.spawnTimer <= 0 &&
        this.wavePlan.spawned < this.wavePlan.totalToSpawn &&
        activeRegularEnemies < this.wavePlan.aliveLimit
      ) {
        const type = pickWeightedEnemy(this.elapsed, this.wave, this.cycleCount);
        this.spawnEnemy(type);
        this.wavePlan.spawned += 1;
        activeRegularEnemies += 1;
        this.spawnTimer = this.getNextSpawnDelay();
      }

      if (
        this.wavePlan.spawned >= this.wavePlan.totalToSpawn &&
        activeRegularEnemies === 0
      ) {
        if (this.wave >= BOSS_WAVE - 1) {
          this.startBossWave();
        } else {
          this.startRegularWave(this.wave + 1);
        }
      }
    } else if (
      this.phase === "boss" &&
      !this.currentBoss &&
      !this.bossPhaseSpawned &&
      !this.bossPhaseResolved
    ) {
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0) {
        this.spawnBoss();
      }
    }
  }

  updateWaveRevealSystem(dt) {
    if (this.hazardAlert.timer > 0) {
      this.hazardAlert.timer = Math.max(0, this.hazardAlert.timer - dt);
      if (this.hazardAlert.timer <= 0) {
        this.hazardAlert.textEs = "";
        this.hazardAlert.textEn = "";
      }
    }

    if (this.waveReveal.messageTimer > 0) {
      this.waveReveal.messageTimer = Math.max(0, this.waveReveal.messageTimer - dt);
    }

    if (this.phase !== "combat" && this.phase !== "boss") {
      this.waveReveal.active = false;
      this.waveReveal.activeTimer = 0;
      return;
    }

    const hasTargets = this.enemies.length > 0;
    if (!hasTargets) {
      if (this.waveReveal.active) {
        this.waveReveal.active = false;
        this.waveReveal.activeTimer = 0;
      }
      return;
    }

    const elapsedInWave = Math.max(0, this.elapsed - this.waveReveal.waveStartElapsed);
    if (!this.waveReveal.triggered && elapsedInWave >= WAVE_REVEAL_TRIGGER_SECONDS) {
      this.waveReveal.triggered = true;
      this.waveReveal.active = true;
      this.waveReveal.activeTimer = WAVE_REVEAL_DURATION;
      this.waveReveal.messageTimer = WAVE_REVEAL_MESSAGE_DURATION;
      this.playWaveRevealSfx();
    }

    if (this.waveReveal.active) {
      this.waveReveal.activeTimer = Math.max(0, this.waveReveal.activeTimer - dt);
      if (this.waveReveal.activeTimer <= 0) {
        this.waveReveal.active = false;
      }
    }
  }

  updateWaveRevealMarkers(dt) {
    const revealActive =
      this.waveReveal.active &&
      (this.phase === "combat" || this.phase === "boss");

    for (const enemy of this.enemies) {
      const marker = enemy.revealMarker;
      if (!marker) {
        continue;
      }

      marker.ring.visible = revealActive;
      marker.arrowRoot.visible = revealActive;
      if (!revealActive) {
        continue;
      }

      const pulse = 0.7 + Math.sin(this.elapsed * 7 + marker.pulsePhase) * 0.22;
      marker.ring.material.opacity = 0.3 + pulse * 0.28;
      marker.ring.scale.setScalar(0.9 + pulse * 0.22);

      marker.arrowRoot.position.y = marker.baseArrowY + Math.sin(this.elapsed * 4 + marker.pulsePhase) * 0.18;
      marker.arrowRoot.rotation.y += dt * 2.7;
      marker.orb.material.opacity = 0.55 + pulse * 0.32;
      marker.orb.material.emissiveIntensity = 1 + pulse * 0.44;
    }
  }

  findSpawnPosition(
    minDistance = 12,
    minRadius = ARENA_RADIUS - 10,
    maxRadius = ARENA_RADIUS - 4,
  ) {
    let angle = randRange(0, Math.PI * 2);
    let radius = randRange(minRadius, maxRadius);
    let x = Math.cos(angle) * radius;
    let z = Math.sin(angle) * radius;

    while (Math.hypot(x - this.player.position.x, z - this.player.position.z) < minDistance) {
      angle = randRange(0, Math.PI * 2);
      radius = randRange(minRadius, maxRadius);
      x = Math.cos(angle) * radius;
      z = Math.sin(angle) * radius;
    }

    return new THREE.Vector3(x, 0, z);
  }

  createEnemyRevealMarker(root, def, isBoss = false) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(isBoss ? 1.22 : 0.8, isBoss ? 1.58 : 1.1, 24),
      new THREE.MeshBasicMaterial({
        color: 0xff5656,
        transparent: true,
        opacity: 0.48,
        side: THREE.DoubleSide,
      }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -def.baseHeight + 0.05;
    ring.visible = false;
    root.add(ring);

    const arrowRoot = new THREE.Group();
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(isBoss ? 0.28 : 0.2, isBoss ? 0.86 : 0.68, 12),
      new THREE.MeshStandardMaterial({
        color: 0xff7a7a,
        emissive: 0xff4c4c,
        emissiveIntensity: 1.1,
        roughness: 0.3,
        metalness: 0.05,
      }),
    );
    cone.rotation.x = Math.PI;
    arrowRoot.add(cone);

    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(isBoss ? 0.16 : 0.12, 12, 12),
      new THREE.MeshStandardMaterial({
        color: 0xffb0b0,
        emissive: 0xff6c6c,
        emissiveIntensity: 1.2,
        transparent: true,
        opacity: 0.82,
      }),
    );
    orb.position.y = isBoss ? 0.5 : 0.4;
    arrowRoot.add(orb);

    const baseArrowY = (def.targetOffsetY ?? 2) + (isBoss ? 1.65 : 1.2);
    arrowRoot.position.y = baseArrowY;
    arrowRoot.visible = false;
    root.add(arrowRoot);

    return {
      ring,
      arrowRoot,
      orb,
      baseArrowY,
      pulsePhase: randRange(0, Math.PI * 2),
    };
  }

  createAllyModel(color = 0x8df9ff) {
    const root = new THREE.Group();

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.46, 14, 14),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.9,
        roughness: 0.2,
        metalness: 0.55,
      }),
    );
    core.castShadow = true;
    core.receiveShadow = true;
    root.add(core);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.72, 0.08, 12, 24),
      new THREE.MeshStandardMaterial({
        color: 0x1b2946,
        emissive: color,
        emissiveIntensity: 0.56,
        roughness: 0.34,
        metalness: 0.7,
      }),
    );
    ring.rotation.x = Math.PI / 2;
    ring.castShadow = true;
    ring.receiveShadow = true;
    root.add(ring);

    root.userData.core = core;
    root.userData.ring = ring;
    return root;
  }

  rebuildAllyHud() {
    if (!this.ui.allyList || !this.ui.allyPanel) {
      return;
    }

    this.ui.allyList.innerHTML = "";
    for (const ally of this.allies) {
      const item = document.createElement("div");
      item.className = "ally-item";

      const label = document.createElement("p");
      label.className = "ally-item__label";
      const name = document.createElement("span");
      name.textContent = ally.label;
      const value = document.createElement("strong");
      value.textContent = `${Math.ceil(ally.health)} / ${ally.maxHealth}`;
      label.append(name, value);

      const bar = document.createElement("div");
      bar.className = "ally-item__bar";
      const fill = document.createElement("div");
      fill.className = "ally-item__fill";
      bar.appendChild(fill);

      item.append(label, bar);
      this.ui.allyList.appendChild(item);

      ally.uiValue = value;
      ally.uiFill = fill;
    }

    this.ui.allyPanel.hidden = this.allies.length === 0;
  }

  spawnRunAllies() {
    this.clearEntities(this.allies, this.allyGroup);
    this.allies = [];
    const count = Math.min(MAX_EQUIPPED_ALLIES, this.allyLoadout.length);
    for (let i = 0; i < count; i += 1) {
      const slot = this.allyLoadout[i];
      const def = ALLY_DEFS[slot.id];
      if (!def) {
        continue;
      }
      const model = this.createAllyModel(def.color);
      const root = new THREE.Group();
      root.add(model);
      root.position.set(
        this.player.position.x + Math.cos((Math.PI * 2 * i) / Math.max(1, count)) * 2.4,
        1.36,
        this.player.position.z + Math.sin((Math.PI * 2 * i) / Math.max(1, count)) * 2.4,
      );
      this.allyGroup.add(root);

      this.allies.push({
        id: slot.id,
        label: this.getAllyLabel(slot.id),
        root,
        model,
        orbitOffset: (Math.PI * 2 * i) / Math.max(1, count),
        speed: def.moveSpeed,
        preferredDistance: def.preferredDistance,
        fireRange: def.fireRange,
        fireCooldown: def.fireCooldown,
        shotCooldown: randRange(0.12, def.fireCooldown),
        maxHealth: def.maxHealth,
        health: def.maxHealth,
        hitRadius: def.hitRadius,
        damage: def.damage,
        projectileSpeed: def.projectileSpeed,
        projectileColor: def.color,
        uiValue: null,
        uiFill: null,
      });
    }

    this.rebuildAllyHud();
  }

  updateAllies(dt) {
    if (this.phase !== "combat" && this.phase !== "boss") {
      return;
    }

    for (const [index, ally] of this.allies.entries()) {
      ally.shotCooldown = Math.max(0, ally.shotCooldown - dt);
      const orbitAngle = this.elapsed * 0.95 + ally.orbitOffset + index * 0.3;
      const targetPos = new THREE.Vector3(
        this.player.position.x + Math.cos(orbitAngle) * ally.preferredDistance,
        1.36,
        this.player.position.z + Math.sin(orbitAngle) * ally.preferredDistance,
      );
      const toTarget = targetPos.sub(ally.root.position);
      if (toTarget.lengthSq() > 0.01) {
        ally.root.position.addScaledVector(toTarget.normalize(), ally.speed * dt);
      }

      const radius = Math.hypot(ally.root.position.x, ally.root.position.z);
      if (radius > ARENA_RADIUS - 1.8) {
        const scale = (ARENA_RADIUS - 1.8) / Math.max(0.001, radius);
        ally.root.position.x *= scale;
        ally.root.position.z *= scale;
      }

      ally.root.position.y = 1.32 + Math.sin(this.elapsed * 3.2 + index) * 0.16;
      if (ally.model?.userData?.ring) {
        ally.model.userData.ring.rotation.z += dt * 2.4;
      }

      let bestEnemy = null;
      let bestDistance = Infinity;
      for (const enemy of this.enemies) {
        const distance = ally.root.position.distanceTo(enemy.root.position);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestEnemy = enemy;
        }
      }

      if (!bestEnemy) {
        continue;
      }

      ally.root.lookAt(
        bestEnemy.root.position.x,
        bestEnemy.root.position.y + bestEnemy.def.targetOffsetY,
        bestEnemy.root.position.z,
      );

      if (ally.shotCooldown <= 0 && bestDistance <= ally.fireRange) {
        this.fireAllyShot(ally, bestEnemy);
        ally.shotCooldown = ally.fireCooldown;
      }
    }
  }

  fireAllyShot(ally, enemy) {
    if (this.projectiles.length >= MAX_PROJECTILES) {
      return;
    }

    const origin = ally.root.position.clone().add(new THREE.Vector3(0, 0.3, 0));
    const target = enemy.root.position
      .clone()
      .add(new THREE.Vector3(0, enemy.def.targetOffsetY ?? 1.5, 0));
    const direction = target.sub(origin).normalize();

    const projectileMaterial = new THREE.MeshStandardMaterial({
      color: ally.projectileColor,
      emissive: ally.projectileColor,
      emissiveIntensity: 1.15,
      roughness: 0.14,
      metalness: 0.25,
    });

    const radius = 0.11;
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.58, radius * 0.9, radius * 5.8, 10),
      projectileMaterial,
    );
    mesh.position.copy(origin);
    mesh.castShadow = true;
    mesh.quaternion.setFromUnitVectors(PROJECTILE_AXIS, direction);
    this.projectileGroup.add(mesh);

    this.projectiles.push({
      mesh,
      owner: "ally",
      velocity: direction.clone().multiplyScalar(ally.projectileSpeed ?? 50),
      damage: ally.damage,
      radius,
      ttl: 1.05,
      travel: 0,
      color: ally.projectileColor,
      pierce: 0,
    });
  }

  damageAlly(ally, amount) {
    ally.health = Math.max(0, ally.health - amount);
    if (ally.health > 0) {
      return;
    }

    this.allyGroup.remove(ally.root);
    this.allies = this.allies.filter((entry) => entry !== ally);
    this.spawnExplosion(ally.root.position.clone(), 0x8df9ff);
    this.rebuildAllyHud();
  }

  spawnEnemy(type) {
    const def = ENEMY_DEFS[type];
    const model = ENEMY_MODEL_FACTORIES[type]();
    const root = new THREE.Group();
    root.add(model);
    const revealMarker = this.createEnemyRevealMarker(root, def, false);

    const spawnPosition = this.findSpawnPosition();
    root.position.set(spawnPosition.x, def.baseHeight, spawnPosition.z);
    this.enemyGroup.add(root);

    this.enemies.push({
      type,
      isBoss: false,
      def,
      root,
      model,
      health: def.maxHealth,
      fireCooldown: randRange(0.3, def.shotCooldown),
      orbitSign: Math.random() > 0.5 ? 1 : -1,
      bobOffset: randRange(0, Math.PI * 2),
      flash: 0,
      revealMarker,
    });
  }

  decorateBossModelByType(type, model) {
    if (type === "sentinel_apex") {
      this.decorateFinalSentinelModel(model);
    }
    if (type === "forgewarlord") {
      this.decorateForgeWarlordModel(model);
    }
    if (type === "glacier") {
      this.decorateGlacierBossModel(model);
    }
    if (type === "neonwraith") {
      this.decorateNeonWraithModel(model);
    }
    if (type === "radlord") {
      this.decorateRadlordModel(model);
    }
    if (type === "voidarchon") {
      this.decorateVoidArchonModel(model);
    }
    if (type === "infernotyrant") {
      this.decorateInfernoTyrantModel(model);
    }
  }

  setBossModelOpacity(model, opacity = 1) {
    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !child.material) {
        return;
      }
      const material = child.material;
      material.transparent = opacity < 0.999;
      material.opacity = opacity;
    });
  }

  clearHarbingerShadows(enemy) {
    if (!enemy?.harbingerShadows?.length) {
      return;
    }
    for (const shadow of enemy.harbingerShadows) {
      this.effectGroup.remove(shadow);
    }
    enemy.harbingerShadows = [];
  }

  spawnBoss() {
    const bossPlan = getBossPlanForCycle(this.cycleCount);
    const def = bossPlan.def;
    const model = BOSS_MODEL_FACTORIES[bossPlan.type]();
    this.decorateBossModelByType(bossPlan.type, model);
    const root = new THREE.Group();
    root.add(model);
    const revealMarker = this.createEnemyRevealMarker(root, def, true);

    const spawnPosition = this.findSpawnPosition(20, ARENA_RADIUS - 12, ARENA_RADIUS - 7);
    root.position.set(spawnPosition.x, def.baseHeight, spawnPosition.z);
    this.enemyGroup.add(root);
    const shieldMax = this.getBossShieldMax(def);

    const boss = {
      type: bossPlan.type,
      isBoss: true,
      bossLabel: bossPlan.base.label,
      displayLabel: def.displayLabel,
      bossPattern: bossPlan.base.attackPattern,
      movementStyle: bossPlan.base.movementStyle,
      meleeRange: bossPlan.base.meleeRange,
      cycleTier: bossPlan.cycleTier,
      def,
      root,
      model,
      shieldMax,
      shield: shieldMax,
      health: def.maxHealth,
      fireCooldown: Math.max(0.85, def.shotCooldown * 0.66),
      orbitSign: Math.random() > 0.5 ? 1 : -1,
      bobOffset: randRange(0, Math.PI * 2),
      flash: 0,
      burstShotsRemaining: 0,
      burstGap: 0,
      portalVolleyStep: 0,
      summonCooldown: bossPlan.type === "sentinel_apex" ? 7.2 : Infinity,
      scrapyardSummonCooldown:
        bossPlan.type === "sentinel" && this.currentMapId === "arena" ? 8.8 : Infinity,
      novaCooldown: bossPlan.type === "sentinel_apex" ? 4.4 : Infinity,
      meteorCooldown: bossPlan.type === "sentinel_apex" ? 6.6 : Infinity,
      lavaPillarCooldown: bossPlan.type === "sentinel_apex" ? 8.4 : Infinity,
      bossSpawnCooldown: bossPlan.type === "sentinel_apex" ? 11.6 : Infinity,
      tsunamiCooldown: bossPlan.type === "radlord" ? 8.8 : Infinity,
      glacierStormCooldown: bossPlan.type === "glacier" ? 7.6 : Infinity,
      aegisLockdownCooldown: bossPlan.type === "aegis" ? 8.4 : Infinity,
      aegisLockdownActive: false,
      harbingerHuntCooldown: bossPlan.type === "harbinger" ? 7.8 : Infinity,
      harbingerHuntTimer: 0,
      harbingerDashDone: false,
      harbingerExposedTimer: 0,
      harbingerShadows: [],
      nullGridCooldown: bossPlan.type === "sentinel" ? 9.6 : Infinity,
      nullOverheatTimer: 0,
      rage: false,
      revealMarker,
    };

    this.bossPhaseSpawned = true;
    this.currentBoss = boss;
    this.enemies.push(boss);
  }

  applyBossMovement(enemy, distance, direction, strafe, move, dt) {
    const { def, model, movementStyle } = enemy;

    if (movementStyle === "duelist") {
      if (distance < def.preferredMinRange) {
        move.addScaledVector(direction, -0.8);
      } else if (distance > def.preferredMaxRange) {
        move.addScaledVector(direction, 0.75);
      }

      move.addScaledVector(strafe, 0.4 * enemy.orbitSign);
      model.userData.leftArm.rotation.x =
        Math.sin(this.elapsed * 2.2 + enemy.bobOffset) * 0.22;
      model.userData.rightArm.rotation.x =
        Math.cos(this.elapsed * 2.2 + enemy.bobOffset) * 0.22;
      model.userData.ring.rotation.z += dt * 1.2;
      return;
    }

    if (movementStyle === "hunter") {
      if (distance > def.preferredMaxRange) {
        move.addScaledVector(direction, 1.16);
      } else if (distance < def.preferredMinRange) {
        move.addScaledVector(direction, -0.22);
      }

      move.addScaledVector(strafe, 0.2 * enemy.orbitSign);
      model.userData.leftBlade.rotation.z =
        0.88 + Math.sin(this.elapsed * 4.6 + enemy.bobOffset) * 0.24;
      model.userData.rightBlade.rotation.z =
        -0.88 - Math.sin(this.elapsed * 4.6 + enemy.bobOffset) * 0.24;
      model.userData.spine.rotation.y += dt * 2.3;
      model.userData.core.material.emissiveIntensity =
        0.82 + Math.sin(this.elapsed * 6 + enemy.bobOffset) * 0.16;
      return;
    }

    if (movementStyle === "sentinel") {
      if (distance < def.preferredMinRange) {
        move.addScaledVector(direction, -1.08);
      } else if (distance > def.preferredMaxRange) {
        move.addScaledVector(direction, 0.48);
      }

      move.addScaledVector(strafe, 0.52 * enemy.orbitSign);
      model.userData.outerRing.rotation.z += dt * 1.36;
      model.userData.leftAntenna.rotation.z =
        0.24 + Math.sin(this.elapsed * 2.2 + enemy.bobOffset) * 0.12;
      model.userData.rightAntenna.rotation.z =
        -0.24 - Math.sin(this.elapsed * 2.2 + enemy.bobOffset) * 0.12;
      model.userData.core.material.emissiveIntensity =
        0.9 + Math.sin(this.elapsed * 3.2 + enemy.bobOffset) * 0.14;
      return;
    }

    if (movementStyle === "tyrant") {
      const rageBoost = enemy.rage ? 0.24 : 0;
      if (distance < def.preferredMinRange) {
        move.addScaledVector(direction, -(0.28 + rageBoost));
      } else if (distance > def.preferredMaxRange) {
        move.addScaledVector(direction, 0.92 + rageBoost);
      } else {
        move.addScaledVector(direction, 0.22 + rageBoost * 0.4);
      }

      move.addScaledVector(strafe, (0.58 + rageBoost) * enemy.orbitSign);
      if (Math.sin(this.elapsed * 1.4 + enemy.bobOffset) > 0.84) {
        move.addScaledVector(direction, 0.42 + rageBoost * 0.55);
      }

      if (model.userData.outerRing) {
        model.userData.outerRing.rotation.z += dt * (2.4 + rageBoost * 4.2);
      }
      if (model.userData.core) {
        model.userData.core.material.emissiveIntensity =
          1.08 + Math.sin(this.elapsed * 7.4 + enemy.bobOffset) * 0.22 + rageBoost * 0.9;
      }
      if (model.userData.leftAntenna) {
        model.userData.leftAntenna.rotation.z =
          0.34 + Math.sin(this.elapsed * 5 + enemy.bobOffset) * 0.18;
      }
      if (model.userData.rightAntenna) {
        model.userData.rightAntenna.rotation.z =
          -0.34 - Math.sin(this.elapsed * 5 + enemy.bobOffset) * 0.18;
      }
      if (model.userData.overheatCrown) {
        model.userData.overheatCrown.rotation.z += dt * (1.4 + rageBoost * 3.4);
      }
      if (Array.isArray(model.userData.overheatFlames)) {
        for (const flame of model.userData.overheatFlames) {
          flame.scale.y =
            0.9 + Math.sin(this.elapsed * 8 + (flame.userData.phase ?? 0)) * 0.2 + rageBoost;
          flame.position.y =
            (flame.userData.baseHeight ?? 0.2) +
            Math.sin(this.elapsed * 6 + (flame.userData.phase ?? 0)) * 0.1;
        }
      }
      return;
    }

    if (movementStyle === "orbiter") {
      if (distance < def.preferredMinRange) {
        move.addScaledVector(direction, -0.66);
      } else if (distance > def.preferredMaxRange) {
        move.addScaledVector(direction, 0.86);
      }

      move.addScaledVector(strafe, 0.92 * enemy.orbitSign);
      model.userData.topRing.rotation.z += dt * 2.8;
      model.userData.bottomRing.rotation.x -= dt * 3.2;
      model.userData.leftPod.position.y = 2.46 + Math.sin(this.elapsed * 4.2) * 0.16;
      model.userData.rightPod.position.y = 2.46 - Math.sin(this.elapsed * 4.2) * 0.16;
      model.userData.halo.rotation.y += dt * 4.1;
      return;
    }

    if (movementStyle === "riftlord") {
      if (distance < def.preferredMinRange) {
        move.addScaledVector(direction, -0.42);
      } else if (distance > def.preferredMaxRange) {
        move.addScaledVector(direction, 0.94);
      }

      move.addScaledVector(strafe, 0.74 * enemy.orbitSign);
      model.userData.halo.rotation.z += dt * 2.6;
      model.userData.crown.rotation.y -= dt * 1.3;
      model.userData.shellRing.rotation.x += dt * 1.7;
      model.userData.heart.material.emissiveIntensity =
        0.82 + Math.sin(this.elapsed * 4.2 + enemy.bobOffset) * 0.18;
      for (const [index, tendril] of model.userData.tendrils.entries()) {
        tendril.rotation.z += Math.sin(this.elapsed * 2 + index) * 0.004;
      }
      for (const [index, shard] of model.userData.shards.entries()) {
        shard.rotation.y += dt * (2.4 + index * 0.2);
      }
      if (model.userData.radOrbiters) {
        model.userData.radOrbiters.rotation.y += dt * 2.1;
        for (const orb of model.userData.radOrbiters.children) {
          const phase = orb.userData.phase ?? 0;
          orb.position.y = 0.2 + Math.sin(this.elapsed * 2.8 + phase) * 0.22;
          const pulse = 0.85 + Math.sin(this.elapsed * 3.4 + phase) * 0.25;
          orb.scale.setScalar(pulse);
        }
      }
      if (model.userData.voidOrbiters) {
        model.userData.voidOrbiters.rotation.y -= dt * 2.4;
        for (const orb of model.userData.voidOrbiters.children) {
          const phase = orb.userData.phase ?? 0;
          orb.position.y = 0.22 + Math.sin(this.elapsed * 3 + phase) * 0.18;
          const pulse = 0.9 + Math.sin(this.elapsed * 3.6 + phase) * 0.22;
          orb.scale.setScalar(pulse);
        }
      }
      if (Array.isArray(model.userData.infernoFlames)) {
        for (const flame of model.userData.infernoFlames) {
          flame.scale.y =
            0.9 + Math.sin(this.elapsed * 7 + (flame.userData.phase ?? 0)) * 0.22;
          flame.position.y =
            (flame.userData.baseHeight ?? 0.3) +
            Math.sin(this.elapsed * 5 + (flame.userData.phase ?? 0)) * 0.1;
        }
      }
      return;
    }

    if (distance > def.preferredMaxRange) {
      move.addScaledVector(direction, 0.94);
    } else if (distance < def.preferredMinRange) {
      move.addScaledVector(direction, -0.5);
    }

    move.addScaledVector(strafe, 0.14 * enemy.orbitSign);
    model.userData.cannon.rotation.z = Math.sin(this.elapsed * 1.8 + enemy.bobOffset) * 0.08;
    model.userData.leftDrum.rotation.x += dt * 2.4;
    model.userData.rightDrum.rotation.x += dt * 2.4;
    model.userData.core.material.emissiveIntensity =
      0.78 + Math.sin(this.elapsed * 2.4 + enemy.bobOffset) * 0.12;
  }

  updateBossAttack(enemy, playerDistance, dt) {
    const { def, bossPattern, cycleTier } = enemy;
    const canSpawnVolley = this.projectiles.length < MAX_PROJECTILES - 20;

    if (bossPattern === "burst") {
      if (enemy.type === "aegis") {
        enemy.aegisLockdownCooldown -= dt;
        if (enemy.aegisLockdownCooldown <= 0) {
          this.triggerAegisLockdown(enemy);
          enemy.aegisLockdownCooldown = enemy.rage ? 11.2 : 13.8;
        }

        if (enemy.aegisLockdownActive) {
          enemy.burstShotsRemaining = 0;
          enemy.burstGap = 0;
          enemy.fireCooldown = Math.max(enemy.fireCooldown, 0.24);
          return;
        }
      }

      if (enemy.burstShotsRemaining > 0) {
        enemy.burstGap -= dt;
        if (enemy.burstGap <= 0) {
          this.fireEnemyShot(enemy, { spread: 0.06, yawOffset: randRange(-0.04, 0.04) });
          enemy.burstShotsRemaining -= 1;
          enemy.burstGap = 0.16;
        }
      } else if (enemy.fireCooldown <= 0 && playerDistance <= def.fireRange) {
        if (!canSpawnVolley) {
          enemy.fireCooldown = def.shotCooldown * 0.6;
          return;
        }
        enemy.burstShotsRemaining = 3 + Math.floor(cycleTier / 4);
        enemy.burstGap = 0;
        enemy.fireCooldown = def.shotCooldown;
      }
      return;
    }

    if (bossPattern === "shotgun") {
      if (enemy.type === "harbinger") {
        enemy.harbingerHuntCooldown -= dt;
        if (enemy.harbingerExposedTimer > 0) {
          enemy.harbingerExposedTimer = Math.max(0, enemy.harbingerExposedTimer - dt);
        }

        if (enemy.harbingerHuntCooldown <= 0 && enemy.harbingerHuntTimer <= 0) {
          this.triggerHarbingerRazorHunt(enemy);
          enemy.harbingerHuntCooldown = enemy.rage ? 10.6 : 12.4;
        }

        if (enemy.harbingerHuntTimer > 0) {
          enemy.harbingerHuntTimer = Math.max(0, enemy.harbingerHuntTimer - dt);
          const huntProgress = 1 - enemy.harbingerHuntTimer / Math.max(0.001, enemy.harbingerHuntDuration);
          this.setBossModelOpacity(enemy.model, 0.28 + huntProgress * 0.18);

          const shadowSpin = this.elapsed * 2.2;
          for (const [index, shadow] of enemy.harbingerShadows.entries()) {
            const angle = shadowSpin + index * ((Math.PI * 2) / Math.max(1, enemy.harbingerShadows.length));
            shadow.position.x = enemy.root.position.x + Math.cos(angle) * 2.2;
            shadow.position.z = enemy.root.position.z + Math.sin(angle) * 2.2;
            shadow.position.y = enemy.root.position.y + 0.15;
          }

          if (!enemy.harbingerDashDone && enemy.harbingerHuntTimer <= 0.68) {
            const dashDir = this.player.position.clone().sub(enemy.root.position);
            dashDir.y = 0;
            if (dashDir.lengthSq() > 0.001) {
              dashDir.normalize();
              enemy.root.position.addScaledVector(dashDir, 5.8);
              const radius = Math.hypot(enemy.root.position.x, enemy.root.position.z);
              if (radius > ARENA_RADIUS - 2.6) {
                const ratio = (ARENA_RADIUS - 2.6) / Math.max(0.001, radius);
                enemy.root.position.x *= ratio;
                enemy.root.position.z *= ratio;
              }
            }
            if (playerDistance <= enemy.meleeRange + 1.2) {
              this.damagePlayer(def.contactDamage * 1.15);
            }
            enemy.harbingerDashDone = true;
          }

          if (enemy.harbingerHuntTimer <= 0) {
            this.clearHarbingerShadows(enemy);
            this.setBossModelOpacity(enemy.model, 1);
            enemy.harbingerExposedTimer = 2;
            this.pushHazardAlert(
              "Harbinger expuesto: castiga ahora.",
              "Harbinger exposed: punish now.",
              1.6,
            );
          }

          enemy.burstShotsRemaining = 0;
          enemy.burstGap = 0;
          enemy.fireCooldown = Math.max(enemy.fireCooldown, 0.24);
          return;
        }

        this.setBossModelOpacity(enemy.model, 1);
      }

      if (enemy.fireCooldown <= 0 && playerDistance <= def.fireRange) {
        if (!canSpawnVolley) {
          enemy.fireCooldown = def.shotCooldown * 0.6;
          return;
        }
        for (const yawOffset of [-0.22, -0.11, 0, 0.11, 0.22]) {
          this.fireEnemyShot(enemy, {
            spread: 0.012,
            yawOffset,
            damageMultiplier: yawOffset === 0 ? 0.72 : 0.42,
            projectileSpeedMultiplier: 1.05,
            originOffset: { y: 0.08 },
          });
        }
        enemy.fireCooldown = def.shotCooldown * randRange(0.94, 1.08);
      }
      return;
    }

    if (bossPattern === "fan") {
      if (enemy.type === "sentinel") {
        enemy.nullGridCooldown -= dt;
        if (enemy.nullGridCooldown <= 0) {
          this.triggerNullGridCollapse(enemy);
          enemy.nullGridCooldown = enemy.rage ? 12.2 : 14.4;
        }
        if (enemy.nullOverheatTimer > 0) {
          enemy.nullOverheatTimer = Math.max(0, enemy.nullOverheatTimer - dt);
          enemy.burstShotsRemaining = 0;
          enemy.burstGap = 0;
          enemy.fireCooldown = Math.max(enemy.fireCooldown, 0.28);
          return;
        }
      }

      if (enemy.type === "glacier") {
        enemy.glacierStormCooldown -= dt;
        if (enemy.glacierStormCooldown <= 0) {
          this.triggerGlacierAcidSnowStorm(enemy);
          enemy.glacierStormCooldown = enemy.rage ? 12.8 : 15.4;
        }

        const acidStorm = this.bossHazards.acidSnowStorm;
        const blizzardPhaseActive =
          acidStorm &&
          acidStorm.timer < acidStorm.introDuration + acidStorm.warningDuration;
        if (blizzardPhaseActive) {
          enemy.burstShotsRemaining = 0;
          enemy.burstGap = 0;
          enemy.fireCooldown = Math.max(enemy.fireCooldown, 0.22);
          return;
        }
      }

      if (enemy.type === "sentinel" && this.currentMapId === "arena") {
        enemy.scrapyardSummonCooldown -= dt;
        if (enemy.scrapyardSummonCooldown <= 0) {
          this.spawnBossMinions(enemy, cycleTier >= 3 ? 3 : 2);
          this.spawnImpact(
            enemy.root.position.clone().add(new THREE.Vector3(0, 1.6, 0)),
            0x7cf5ff,
            14,
            0.9,
          );
          enemy.scrapyardSummonCooldown = cycleTier >= 3 ? 10.4 : 12.8;
        }
      }

      if (enemy.fireCooldown <= 0 && playerDistance <= def.fireRange) {
        if (!canSpawnVolley) {
          enemy.fireCooldown = def.shotCooldown * 0.6;
          return;
        }
        const yawOffsets =
          cycleTier >= 4
            ? [-0.34, -0.18, -0.08, 0, 0.08, 0.18, 0.34]
            : [-0.26, -0.12, 0, 0.12, 0.26];
        for (const yawOffset of yawOffsets) {
          this.fireEnemyShot(enemy, {
            spread: 0.014,
            yawOffset,
            damageMultiplier: yawOffset === 0 ? 0.8 : 0.52,
            projectileSpeedMultiplier: 1.08,
            pitchOffset: Math.abs(yawOffset) > 0.2 ? 0.03 : 0,
          });
        }
        enemy.fireCooldown = def.shotCooldown;
      }
      return;
    }

    if (bossPattern === "twin") {
      if (enemy.burstShotsRemaining > 0) {
        enemy.burstGap -= dt;
        if (enemy.burstGap <= 0) {
          const side = enemy.burstShotsRemaining % 2 === 0 ? -0.74 : 0.74;
          this.fireEnemyShot(enemy, {
            spread: 0.016,
            yawOffset: side * 0.08,
            projectileSpeedMultiplier: 1.12,
            originOffset: { x: side, y: 0.08 },
          });

          if (cycleTier >= 3) {
            this.fireEnemyShot(enemy, {
              spread: 0.022,
              yawOffset: -side * 0.04,
              damageMultiplier: 0.7,
              projectileSpeedMultiplier: 1.08,
              originOffset: { x: -side * 0.34, y: 0.12 },
            });
          }

          enemy.burstShotsRemaining -= 1;
          enemy.burstGap = 0.12;
        }
      } else if (enemy.fireCooldown <= 0 && playerDistance <= def.fireRange) {
        if (!canSpawnVolley) {
          enemy.fireCooldown = def.shotCooldown * 0.6;
          return;
        }
        enemy.burstShotsRemaining = 4 + Math.min(2, Math.floor(cycleTier / 3));
        enemy.burstGap = 0;
        enemy.fireCooldown = def.shotCooldown;
      }
      return;
    }

    if (bossPattern === "portalstorm") {
      let tsunamiActive = false;
      if (enemy.type === "radlord") {
        enemy.tsunamiCooldown -= dt;
        if (enemy.tsunamiCooldown <= 0) {
          this.triggerRadlordTsunami(enemy);
          enemy.tsunamiCooldown = 9.2;
        }
        tsunamiActive = Boolean(this.bossHazards.radiationTsunami);
      }

      if (tsunamiActive) {
        enemy.burstShotsRemaining = 0;
        enemy.burstGap = 0;
        enemy.portalVolleyStep = 0;
        enemy.fireCooldown = Math.max(enemy.fireCooldown, 0.24);
        return;
      }

      if (enemy.burstShotsRemaining > 0) {
        enemy.burstGap -= dt;
        if (enemy.burstGap <= 0) {
          const volleyPatterns = [
            [-0.22, 0, 0.22],
            [-0.12, 0.12],
            [-0.32, 0, 0.32],
          ];
          const volley = volleyPatterns[enemy.portalVolleyStep % volleyPatterns.length];
          for (const yawOffset of volley) {
            this.fireEnemyShot(enemy, {
              spread: 0.016,
              yawOffset,
              damageMultiplier: yawOffset === 0 ? 0.92 : 0.58,
              projectileSpeedMultiplier: 1.12,
              radiusMultiplier: yawOffset === 0 ? 1.18 : 1,
            });
          }
          enemy.portalVolleyStep += 1;
          enemy.burstShotsRemaining -= 1;
          enemy.burstGap = 0.22;
        }
      } else if (enemy.fireCooldown <= 0 && playerDistance <= def.fireRange) {
        if (!canSpawnVolley) {
          enemy.fireCooldown = def.shotCooldown * 0.6;
          return;
        }
        enemy.portalVolleyStep = 0;
        enemy.burstShotsRemaining = 3 + Math.min(2, Math.floor(cycleTier / 3));
        enemy.burstGap = 0;
        enemy.fireCooldown = def.shotCooldown;
      }
      return;
    }

    if (bossPattern === "apocalypse") {
      enemy.summonCooldown -= dt;
      enemy.novaCooldown -= dt;
      enemy.meteorCooldown -= dt;
      enemy.lavaPillarCooldown -= dt;
      enemy.bossSpawnCooldown -= dt;

      if (enemy.shield <= 0) {
        enemy.rage = true;
      }

      if (enemy.summonCooldown <= 0) {
        this.spawnBossMinions(enemy, enemy.rage ? 4 : 3);
        enemy.summonCooldown = enemy.rage ? 6.8 : 9.4;
      }

      if (enemy.novaCooldown <= 0) {
        this.spawnRadialBossVolley(enemy, enemy.rage ? 14 : 10, {
          damageMultiplier: enemy.rage ? 0.82 : 0.64,
          projectileSpeedMultiplier: enemy.rage ? 1.08 : 0.92,
          radiusMultiplier: enemy.rage ? 1.18 : 1.04,
          lift: enemy.rage ? 0.06 : 0.03,
        });
        enemy.novaCooldown = enemy.rage ? 3.5 : 5.2;
      }

      if (enemy.meteorCooldown <= 0) {
        this.spawnHellMeteorVolley(enemy, enemy.rage ? 6 : 4);
        enemy.meteorCooldown = enemy.rage ? 5.8 : 7.8;
      }

      if (enemy.lavaPillarCooldown <= 0) {
        this.triggerOverheatLavaPillars(enemy, enemy.rage ? 5 : 3);
        enemy.lavaPillarCooldown = enemy.rage ? 5.2 : 7.2;
      }

      if (enemy.bossSpawnCooldown <= 0) {
        if (Math.random() <= (enemy.rage ? 0.35 : 0.22)) {
          this.spawnOverheatSupportBoss();
        }
        enemy.bossSpawnCooldown = enemy.rage ? 9.2 : 12.4;
      }

      if (enemy.burstShotsRemaining > 0) {
        enemy.burstGap -= dt;
        if (enemy.burstGap <= 0) {
          const yawOffsets = enemy.rage
            ? [-0.28, -0.12, 0, 0.12, 0.28]
            : [-0.18, 0, 0.18];
          for (const yawOffset of yawOffsets) {
            this.fireEnemyShot(enemy, {
              spread: enemy.rage ? 0.014 : 0.018,
              yawOffset,
              damageMultiplier: yawOffset === 0 ? 1 : 0.7,
              projectileSpeedMultiplier: enemy.rage ? 1.12 : 1.02,
              radiusMultiplier: yawOffset === 0 ? 1.22 : 1,
            });
          }
          enemy.burstShotsRemaining -= 1;
          enemy.burstGap = enemy.rage ? 0.12 : 0.18;
        }
      } else if (enemy.fireCooldown <= 0 && playerDistance <= def.fireRange + 4) {
        enemy.burstShotsRemaining = enemy.rage ? 4 : 3;
        enemy.burstGap = 0;
        enemy.fireCooldown = def.shotCooldown;
      }
      return;
    }

    if (enemy.burstShotsRemaining > 0) {
      enemy.burstGap -= dt;
      if (enemy.burstGap <= 0) {
        const side = enemy.burstShotsRemaining % 2 === 0 ? -0.48 : 0.48;
        this.fireEnemyShot(enemy, {
          spread: 0.01,
          yawOffset: side * 0.04,
          damageMultiplier: 1.35,
          projectileSpeedMultiplier: 0.84,
          radiusMultiplier: 1.45,
          ttl: 5.6,
          originOffset: { x: side, y: 0.2, z: 0.34 },
        });
        enemy.burstShotsRemaining -= 1;
        enemy.burstGap = 0.38;
      }
    } else if (enemy.fireCooldown <= 0 && playerDistance <= def.fireRange) {
      enemy.burstShotsRemaining = cycleTier >= 2 ? 2 : 1;
      enemy.burstGap = 0;
      enemy.fireCooldown = def.shotCooldown;
    }
  }

  updatePlayer(dt) {
    this.player.shotCooldown = Math.max(0, this.player.shotCooldown - dt);
    this.player.recoil = Math.max(0, this.player.recoil - dt * 7);
    this.player.damagePulse = Math.max(0, this.player.damagePulse - dt * 2.4);

    const inputX = Number(this.inputs.right) - Number(this.inputs.left);
    const inputZ = Number(this.inputs.forward) - Number(this.inputs.backward);

    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3(-forward.z, 0, forward.x).normalize();
    const moveDirection = new THREE.Vector3();
    moveDirection.addScaledVector(forward, inputZ);
    moveDirection.addScaledVector(right, inputX);

    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize();
      if (this.player.grounded) {
        this.player.bob += dt * 12;
      }
    }

    this.player.position.addScaledVector(moveDirection, this.getPlayerMoveSpeed() * dt);

    if (!this.player.grounded || this.player.verticalVelocity > 0) {
      this.player.verticalVelocity -= PLAYER_GRAVITY * dt;
      this.player.position.y += this.player.verticalVelocity * dt;

      if (this.player.position.y <= PLAYER_HEIGHT) {
        this.player.position.y = PLAYER_HEIGHT;
        this.player.verticalVelocity = 0;
        this.player.grounded = true;
      }
    }

    const playerRadius = ARENA_RADIUS - 2;
    const horizontalDistance = Math.hypot(
      this.player.position.x,
      this.player.position.z,
    );

    if (horizontalDistance > playerRadius) {
      const ratio = playerRadius / horizontalDistance;
      this.player.position.x *= ratio;
      this.player.position.z *= ratio;
    }

    const bobOffset = Math.sin(this.player.bob) * 0.05;
    this.camera.position.set(
      this.player.position.x,
      this.player.position.y + bobOffset,
      this.player.position.z,
    );

    this.weapon.position.set(
      0.38,
      -0.36 - bobOffset * 1.2 - this.player.recoil * 0.16,
      -0.64 + this.player.recoil * 0.2,
    );
    this.weapon.rotation.set(
      -0.12 + this.player.recoil * 0.28,
      -0.25,
      -0.02 - Math.sin(this.player.bob) * 0.02,
    );

    if (this.inputs.shoot && this.player.shotCooldown <= 0) {
      this.firePlayerShot();
    }
  }

  updateEnemies(dt) {
    const playerGround = new THREE.Vector3(
      this.player.position.x,
      0,
      this.player.position.z,
    );

    for (let index = this.enemies.length - 1; index >= 0; index -= 1) {
      const enemy = this.enemies[index];
      const { def, root, model } = enemy;

      enemy.fireCooldown -= dt;
      enemy.flash = Math.max(0, enemy.flash - dt * 4);

      const enemyGround = new THREE.Vector3(root.position.x, 0, root.position.z);
      const toPlayer = playerGround.clone().sub(enemyGround);
      const distance = Math.max(0.001, toPlayer.length());
      const direction = toPlayer.normalize();
      const strafe = new THREE.Vector3(-direction.z, 0, direction.x);
      const move = new THREE.Vector3();

      if (enemy.type === "scout") {
        if (distance > def.preferredMaxRange) {
          move.add(direction);
        } else if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.8);
        }

        move.addScaledVector(strafe, 0.95 * enemy.orbitSign);
        model.rotation.y += dt * 3.8;
        const spinPart = model.userData.spinPart;
        if (spinPart) {
          spinPart.rotation.z += dt * 4.6;
        }
      } else if (enemy.type === "brute") {
        move.addScaledVector(direction, distance > def.preferredMaxRange ? 1 : 0.4);
        model.userData.leftArm.rotation.x =
          Math.sin(this.elapsed * 4 + enemy.bobOffset) * 0.18;
        model.userData.rightArm.rotation.x =
          Math.cos(this.elapsed * 4 + enemy.bobOffset) * 0.18;
      } else if (enemy.type === "specter") {
        if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.9);
        } else if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 0.65);
        }

        move.addScaledVector(strafe, 0.55 * enemy.orbitSign);
        model.userData.upperRing.rotation.y += dt * 1.5;
        model.userData.lowerRing.rotation.x -= dt * 1.9;
      } else if (enemy.type === "lancer") {
        if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 1.05);
        } else if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.62);
        }

        move.addScaledVector(strafe, 0.88 * enemy.orbitSign);
        model.rotation.z = Math.sin(this.elapsed * 5 + enemy.bobOffset) * 0.18;
        model.userData.ring.rotation.x += dt * 4.2;
      } else if (enemy.type === "warden") {
        if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 0.92);
        } else if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.35);
        }

        move.addScaledVector(strafe, 0.16 * enemy.orbitSign);
        model.userData.shieldPlate.rotation.y = Math.sin(this.elapsed * 1.8) * 0.05;
        model.userData.shieldPlate.material.emissiveIntensity =
          0.42 + Math.sin(this.elapsed * 2.8 + enemy.bobOffset) * 0.12;
      } else if (enemy.type === "swarm") {
        if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 1.28);
        } else if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.22);
        }

        move.addScaledVector(strafe, 0.72 * enemy.orbitSign);
        model.rotation.y += dt * 4.6;
        model.userData.halo.rotation.z += dt * 5.5;
      } else if (enemy.type === "riftstalker") {
        if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 1.22);
        } else if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.16);
        }

        move.addScaledVector(strafe, 0.62 * enemy.orbitSign);
        model.userData.tail.rotation.x =
          -Math.PI / 2 + Math.sin(this.elapsed * 7 + enemy.bobOffset) * 0.24;
        model.userData.fin.rotation.z += dt * 4.8;
        model.userData.frontLeftClaw.rotation.z =
          0.42 + Math.sin(this.elapsed * 8 + enemy.bobOffset) * 0.1;
        model.userData.frontRightClaw.rotation.z =
          -0.42 - Math.sin(this.elapsed * 8 + enemy.bobOffset) * 0.1;
      } else if (enemy.type === "hexcaster") {
        if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.92);
        } else if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 0.44);
        }

        move.addScaledVector(strafe, 0.78 * enemy.orbitSign);
        model.userData.ring.rotation.z += dt * 2.4;
        model.userData.lowerRing.rotation.x -= dt * 1.8;
        for (const [index, crystal] of model.userData.crystals.entries()) {
          crystal.rotation.y += dt * (2.2 + index * 0.4);
          crystal.position.y = [1.12, 1.12, 1.98][index] + Math.sin(this.elapsed * 3 + index) * 0.1;
        }
      } else if (enemy.type === "emberhound") {
        if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 1.25);
        } else if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.5);
        }

        move.addScaledVector(strafe, 0.7 * enemy.orbitSign);
        if (model.userData.tail) {
          model.userData.tail.rotation.x =
            -Math.PI / 2 + Math.sin(this.elapsed * 8 + enemy.bobOffset) * 0.32;
        }
        if (model.userData.core?.material) {
          model.userData.core.material.emissiveIntensity =
            0.8 + Math.sin(this.elapsed * 6 + enemy.bobOffset) * 0.2;
        }
      } else if (enemy.type === "slaggunner") {
        if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 0.72);
        } else if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.22);
        }

        move.addScaledVector(strafe, 0.18 * enemy.orbitSign);
        if (model.userData.cannon) {
          model.userData.cannon.rotation.z = Math.sin(this.elapsed * 1.6 + enemy.bobOffset) * 0.08;
        }
        if (model.userData.leftDrum) {
          model.userData.leftDrum.rotation.x += dt * 2.2;
        }
        if (model.userData.rightDrum) {
          model.userData.rightDrum.rotation.x += dt * 2.2;
        }
        if (model.userData.core?.material) {
          model.userData.core.material.emissiveIntensity =
            0.72 + Math.sin(this.elapsed * 2.4 + enemy.bobOffset) * 0.14;
        }
      } else if (enemy.type === "frostling") {
        if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 1.1);
        } else if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.6);
        }

        move.addScaledVector(strafe, 0.8 * enemy.orbitSign);
        const spinPart = model.userData.spinPart;
        if (spinPart) {
          spinPart.rotation.z += dt * 4.4;
        }
      } else if (enemy.type === "cryocaster") {
        if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.7);
        } else if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 0.4);
        }

        move.addScaledVector(strafe, 0.52 * enemy.orbitSign);
        if (model.userData.ring) {
          model.userData.ring.rotation.z += dt * 2.2;
        }
        if (Array.isArray(model.userData.shards)) {
          for (const [index, shard] of model.userData.shards.entries()) {
            shard.rotation.y += dt * (2 + index * 0.3);
          }
        }
      } else if (enemy.type === "neonrunner") {
        if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 1.18);
        } else if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.6);
        }

        move.addScaledVector(strafe, 0.88 * enemy.orbitSign);
        if (model.userData.leftBlade) {
          model.userData.leftBlade.rotation.z =
            0.6 + Math.sin(this.elapsed * 6 + enemy.bobOffset) * 0.24;
        }
        if (model.userData.rightBlade) {
          model.userData.rightBlade.rotation.z =
            -0.6 - Math.sin(this.elapsed * 6 + enemy.bobOffset) * 0.24;
        }
      } else if (enemy.type === "neoncaster") {
        if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.7);
        } else if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 0.4);
        }

        move.addScaledVector(strafe, 0.5 * enemy.orbitSign);
        if (model.userData.halo) {
          model.userData.halo.rotation.z += dt * 2.4;
        }
      } else if (enemy.type === "radstalker") {
        if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 1.12);
        } else if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.6);
        }

        move.addScaledVector(strafe, 0.78 * enemy.orbitSign);
        if (model.userData.tail) {
          model.userData.tail.rotation.x =
            -Math.PI / 2 + Math.sin(this.elapsed * 7 + enemy.bobOffset) * 0.26;
        }
      } else if (enemy.type === "hellfiend") {
        if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 1.24);
        } else if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.58);
        }

        move.addScaledVector(strafe, 0.86 * enemy.orbitSign);
        if (model.userData.leftHorn) {
          model.userData.leftHorn.rotation.z =
            0.8 + Math.sin(this.elapsed * 6.8 + enemy.bobOffset) * 0.24;
        }
        if (model.userData.rightHorn) {
          model.userData.rightHorn.rotation.z =
            -0.8 - Math.sin(this.elapsed * 6.8 + enemy.bobOffset) * 0.24;
        }
        if (model.userData.core?.material) {
          model.userData.core.material.emissiveIntensity =
            0.95 + Math.sin(this.elapsed * 5 + enemy.bobOffset) * 0.22;
        }
      } else if (enemy.type === "voidreaver") {
        if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 1.2);
        } else if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.55);
        }

        move.addScaledVector(strafe, 0.9 * enemy.orbitSign);
        if (model.userData.leftBlade) {
          model.userData.leftBlade.rotation.z =
            0.7 + Math.sin(this.elapsed * 6.5 + enemy.bobOffset) * 0.28;
        }
        if (model.userData.rightBlade) {
          model.userData.rightBlade.rotation.z =
            -0.7 - Math.sin(this.elapsed * 6.5 + enemy.bobOffset) * 0.28;
        }
        if (model.userData.core?.material) {
          model.userData.core.material.emissiveIntensity =
            0.9 + Math.sin(this.elapsed * 5 + enemy.bobOffset) * 0.2;
        }
      } else if (enemy.type === "sporebruiser") {
        if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 0.7);
        } else if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.25);
        }

        move.addScaledVector(strafe, 0.2 * enemy.orbitSign);
        if (Array.isArray(model.userData.pods)) {
          for (const [index, pod] of model.userData.pods.entries()) {
            pod.position.y = 1.1 + Math.sin(this.elapsed * 3 + index) * 0.08;
          }
        }
      } else if (enemy.type === "hellcaster") {
        if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.78);
        } else if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 0.42);
        }

        move.addScaledVector(strafe, 0.54 * enemy.orbitSign);
        if (model.userData.ring) {
          model.userData.ring.rotation.z += dt * 2.4;
        }
        if (Array.isArray(model.userData.shards)) {
          for (const [index, shard] of model.userData.shards.entries()) {
            shard.rotation.y += dt * (2.4 + index * 0.4);
          }
        }
      } else if (enemy.type === "voidseer") {
        if (distance < def.preferredMinRange) {
          move.addScaledVector(direction, -0.75);
        } else if (distance > def.preferredMaxRange) {
          move.addScaledVector(direction, 0.42);
        }

        move.addScaledVector(strafe, 0.56 * enemy.orbitSign);
        if (model.userData.ring) {
          model.userData.ring.rotation.z += dt * 2.3;
        }
        if (Array.isArray(model.userData.shards)) {
          for (const [index, shard] of model.userData.shards.entries()) {
            shard.rotation.y += dt * (2.2 + index * 0.4);
          }
        }
      } else if (enemy.isBoss) {
        this.applyBossMovement(enemy, distance, direction, strafe, move, dt);
      }

      for (const other of this.enemies) {
        if (other === enemy) {
          continue;
        }

        const separation = new THREE.Vector3(
          enemy.root.position.x - other.root.position.x,
          0,
          enemy.root.position.z - other.root.position.z,
        );
        const length = separation.length();

        if (length > 0 && length < (enemy.isBoss || other.isBoss ? 4.5 : 2.8)) {
          move.addScaledVector(separation.normalize(), 1.2 / length);
        }
      }

      if (move.lengthSq() > 0.0001) {
        move.normalize();
        root.position.addScaledVector(move, def.speed * dt);
      }

      const maxRadius = ARENA_RADIUS - 1.8;
      const radius = Math.hypot(root.position.x, root.position.z);
      if (radius > maxRadius) {
        const scale = maxRadius / radius;
        root.position.x *= scale;
        root.position.z *= scale;
      }

      const bobAmount = enemy.isBoss ? 0.09 : 0.14;
      root.position.y = def.baseHeight + Math.sin(this.elapsed * 2.8 + enemy.bobOffset) * bobAmount;

      const lookAngle = Math.atan2(
        this.player.position.x - root.position.x,
        this.player.position.z - root.position.z,
      );
      root.rotation.y = lookAngle;

      const playerDistance = Math.hypot(
        this.player.position.x - root.position.x,
        this.player.position.z - root.position.z,
      );

      if (playerDistance < 2.2 && enemy.type === "brute") {
        this.damagePlayer(ENEMY_CONTACT_DAMAGE * dt);
      }

      if (playerDistance < 1.6 && enemy.type === "swarm") {
        this.damagePlayer(def.contactDamage * dt);
      }

      if (playerDistance < 1.9 && enemy.type === "riftstalker") {
        this.damagePlayer(def.contactDamage * dt);
      }

      if (enemy.isBoss && playerDistance < enemy.meleeRange) {
        this.damagePlayer(def.contactDamage * dt);
      }

      // Los aliados solo deben recibir dano por impactos visibles (proyectiles/hazards),
      // no por proximidad silenciosa al enemigo.

      if (enemy.isBoss) {
        this.updateBossAttack(enemy, playerDistance, dt);
      } else if (enemy.type === "neoncaster" && enemy.fireCooldown <= 0 && playerDistance <= def.fireRange) {
        for (const yawOffset of [-0.08, 0, 0.08]) {
          this.fireEnemyShot(enemy, {
            spread: 0.03,
            yawOffset,
            damageMultiplier: yawOffset === 0 ? 0.7 : 0.5,
            projectileSpeedMultiplier: 1.06,
          });
        }
        enemy.fireCooldown = def.shotCooldown * randRange(0.92, 1.08);
      } else if (enemy.type === "cryocaster" && enemy.fireCooldown <= 0 && playerDistance <= def.fireRange) {
        for (const yawOffset of [-0.08, 0, 0.08]) {
          this.fireEnemyShot(enemy, {
            spread: 0.03,
            yawOffset,
            damageMultiplier: yawOffset === 0 ? 0.7 : 0.5,
            projectileSpeedMultiplier: 1.06,
          });
        }
        enemy.fireCooldown = def.shotCooldown * randRange(0.92, 1.08);
      } else if (enemy.type === "hexcaster" && enemy.fireCooldown <= 0 && playerDistance <= def.fireRange) {
        for (const yawOffset of [-0.1, 0, 0.1]) {
          this.fireEnemyShot(enemy, {
            spread: 0.02,
            yawOffset,
            damageMultiplier: yawOffset === 0 ? 0.7 : 0.52,
            projectileSpeedMultiplier: 1.05,
          });
        }
        enemy.fireCooldown = def.shotCooldown * randRange(0.92, 1.08);
      } else if (enemy.type === "voidseer" && enemy.fireCooldown <= 0 && playerDistance <= def.fireRange) {
        for (const yawOffset of [-0.1, 0, 0.1]) {
          this.fireEnemyShot(enemy, {
            spread: 0.02,
            yawOffset,
            damageMultiplier: yawOffset === 0 ? 0.72 : 0.52,
            projectileSpeedMultiplier: 1.08,
          });
        }
        enemy.fireCooldown = def.shotCooldown * randRange(0.9, 1.1);
      } else if (enemy.type === "hellcaster" && enemy.fireCooldown <= 0 && playerDistance <= def.fireRange) {
        for (const yawOffset of [-0.08, 0, 0.08]) {
          this.fireEnemyShot(enemy, {
            spread: 0.03,
            yawOffset,
            damageMultiplier: yawOffset === 0 ? 0.78 : 0.56,
            projectileSpeedMultiplier: 1.06,
          });
        }
        enemy.fireCooldown = def.shotCooldown * randRange(0.9, 1.1);
      } else if (enemy.fireCooldown <= 0 && playerDistance <= def.fireRange) {
        this.fireEnemyShot(enemy, { spread: 0.04 });
        enemy.fireCooldown = def.shotCooldown * randRange(0.88, 1.18);
      }
    }
  }

  spawnEnemyProjectile(enemy, origin, direction, options = {}) {
    if (this.projectiles.length >= MAX_PROJECTILES) {
      return;
    }
    const {
      damageMultiplier = 1,
      projectileSpeedMultiplier = 1,
      radiusMultiplier = 1,
      ttl = enemy.isBoss ? 4.2 : 3,
    } = options;
    const { def } = enemy;
    const projectileRadius = def.projectileRadius * radiusMultiplier;

    const projectileMaterial = new THREE.MeshStandardMaterial({
      color: def.projectileColor,
      emissive: def.projectileColor,
      emissiveIntensity: 1.1,
      roughness: 0.18,
      metalness: 0.15,
    });

    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(projectileRadius, 12, 12),
      projectileMaterial,
    );
    mesh.position.copy(origin);
    mesh.castShadow = true;
    this.projectileGroup.add(mesh);

    this.projectiles.push({
      mesh,
      owner: "enemy",
      velocity: direction.clone().normalize().multiplyScalar(
        def.projectileSpeed * projectileSpeedMultiplier,
      ),
      damage: Math.max(1, Math.round(def.damage * damageMultiplier)),
      radius: projectileRadius,
      ttl,
      travel: 0,
      color: def.projectileColor,
    });
  }

  spawnRadialBossVolley(enemy, count, options = {}) {
    const {
      damageMultiplier = 0.7,
      projectileSpeedMultiplier = 1,
      radiusMultiplier = 1,
      lift = 0.02,
    } = options;
    const origin = new THREE.Vector3(
      enemy.root.position.x,
      enemy.root.position.y + enemy.def.muzzleOffsetY,
      enemy.root.position.z,
    );

    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 + this.elapsed * 0.35;
      const direction = new THREE.Vector3(Math.cos(angle), lift, Math.sin(angle)).normalize();
      this.spawnEnemyProjectile(enemy, origin, direction, {
        damageMultiplier,
        projectileSpeedMultiplier,
        radiusMultiplier,
        ttl: 4.8,
      });
    }

    this.playEnemyShotSfx(true);
  }

  updateBossHazards(dt) {
    if (this.phase !== "combat" && this.phase !== "boss") {
      this.clearBossHazards();
      return;
    }

    const tsunami = this.bossHazards.radiationTsunami;
    if (tsunami) {
      tsunami.timer += dt;
      const progress = clamp(tsunami.timer / tsunami.duration, 0, 1);
      const pulse = 0.7 + Math.sin(this.elapsed * 8) * 0.18;
      tsunami.mesh.material.opacity = (1 - progress * 0.62) * 0.38;
      tsunami.mesh.material.emissiveIntensity = 0.42 + pulse * 0.24;
      tsunami.safeMesh.material.opacity = 0.5 + Math.sin(this.elapsed * 10) * 0.12;
      tsunami.safeMesh.scale.setScalar(1 + Math.sin(this.elapsed * 6) * 0.06);
      tsunami.safeGlowMesh.material.opacity = 0.32 + Math.sin(this.elapsed * 8.5) * 0.1;
      tsunami.safeGlowMesh.scale.setScalar(1 + Math.sin(this.elapsed * 5.2) * 0.08);
      tsunami.safeBeaconMesh.material.emissiveIntensity = 1.25 + Math.sin(this.elapsed * 9) * 0.32;

      const frontScale = Math.max(0.14, 1 - progress * 0.88);
      tsunami.frontMesh.scale.setScalar(frontScale);
      tsunami.frontMesh.material.opacity = 0.82 - progress * 0.42;
      tsunami.frontMesh.material.emissiveIntensity = 1 + Math.sin(this.elapsed * 7.2) * 0.2;
      tsunami.frontMesh.position.y = 1.75 + Math.sin(this.elapsed * 4.6) * 0.08;

      const playerDx = this.player.position.x - tsunami.safeCenter.x;
      const playerDz = this.player.position.z - tsunami.safeCenter.z;
      const playerInSafeZone = Math.hypot(playerDx, playerDz) <= tsunami.safeRadius;
      if (!playerInSafeZone) {
        this.damagePlayer(tsunami.damagePerSecond * dt);
      }

      if (progress >= 1) {
        this.effectGroup.remove(tsunami.mesh);
        this.effectGroup.remove(tsunami.safeMesh);
        this.effectGroup.remove(tsunami.frontMesh);
        this.effectGroup.remove(tsunami.safeGlowMesh);
        this.effectGroup.remove(tsunami.safeBeaconMesh);
        this.bossHazards.radiationTsunami = null;
      }
    }

    for (let i = this.bossHazards.lavaPillars.length - 1; i >= 0; i -= 1) {
      const pillar = this.bossHazards.lavaPillars[i];
      pillar.timer += dt;

      if (pillar.timer < pillar.warnDuration) {
        const warnPulse = 0.36 + Math.sin(this.elapsed * 11 + pillar.phase) * 0.22;
        pillar.base.material.opacity = warnPulse;
        pillar.column.scale.set(1, 0.02, 1);
        pillar.column.material.opacity = 0.15;
        pillar.glow.scale.setScalar(0.42 + warnPulse * 0.2);
      } else {
        const activeTime = pillar.timer - pillar.warnDuration;
        const activeRatio = clamp(activeTime / pillar.activeDuration, 0, 1);
        const decay = 1 - activeRatio;
        pillar.base.material.opacity = 0.28 + decay * 0.14;
        pillar.column.scale.set(1, 0.22 + decay * 0.8, 1);
        pillar.column.material.opacity = 0.5 + decay * 0.36;
        pillar.glow.scale.setScalar(0.74 + Math.sin(this.elapsed * 6 + pillar.phase) * 0.16);

        const dx = this.player.position.x - pillar.position.x;
        const dz = this.player.position.z - pillar.position.z;
        if (Math.hypot(dx, dz) <= pillar.radius) {
          this.damagePlayer(pillar.damagePerSecond * dt);
        }
      }

      if (pillar.timer >= pillar.warnDuration + pillar.activeDuration) {
        this.effectGroup.remove(pillar.base);
        this.effectGroup.remove(pillar.column);
        this.effectGroup.remove(pillar.glow);
        this.bossHazards.lavaPillars.splice(i, 1);
      }
    }

    const acidStorm = this.bossHazards.acidSnowStorm;
    if (acidStorm) {
      acidStorm.timer += dt;
      const { introDuration, warningDuration, acidDuration } = acidStorm;
      const warningStart = introDuration;
      const acidStart = introDuration + warningDuration;
      const totalDuration = acidStart + acidDuration;
      const stormPulse = 0.76 + Math.sin(this.elapsed * 6.4) * 0.2;

      acidStorm.blizzardDome.material.opacity =
        acidStorm.timer < warningStart
          ? 0.2 + stormPulse * 0.12
          : 0.26 + stormPulse * 0.14;
      acidStorm.blizzardDome.material.emissiveIntensity = 0.24 + stormPulse * 0.12;
      acidStorm.blizzardCloud.material.opacity = 0.12 + Math.sin(this.elapsed * 4.8) * 0.06;
      acidStorm.blizzardCloud.rotation.z += dt * 0.16;

      const warningPhase = acidStorm.timer >= warningStart && acidStorm.timer < acidStart;
      if (warningPhase && !acidStorm.warningTriggered) {
        acidStorm.warningTriggered = true;
        this.pushHazardAlert(
          "Alerta: lluvia de nieve acida en camino. Corre al techo seguro.",
          "Warning: acidic snow rain incoming. Get under the safe roof.",
          3.2,
        );
      }

      const roofVisible = acidStorm.timer >= warningStart;
      acidStorm.safeRoof.visible = roofVisible;
      acidStorm.safeRoofRing.visible = roofVisible;
      acidStorm.safeRoofBeacon.visible = roofVisible;
      if (roofVisible) {
        const roofPulse = 0.9 + Math.sin(this.elapsed * 8.6) * 0.2;
        acidStorm.safeRoof.material.opacity = 0.24 + roofPulse * 0.14;
        acidStorm.safeRoof.material.emissiveIntensity = 0.9 + roofPulse * 0.42;
        acidStorm.safeRoofRing.material.opacity = 0.5 + roofPulse * 0.24;
        acidStorm.safeRoofRing.scale.setScalar(0.95 + roofPulse * 0.1);
        acidStorm.safeRoofBeacon.material.emissiveIntensity = 1.1 + roofPulse * 0.45;
      }

      const acidPhase = acidStorm.timer >= acidStart && acidStorm.timer < totalDuration;
      acidStorm.acidRainShell.visible = acidPhase;
      if (acidPhase) {
        const acidPulse = 0.92 + Math.sin(this.elapsed * 12) * 0.18;
        acidStorm.acidRainShell.material.opacity = 0.16 + acidPulse * 0.12;
        acidStorm.acidRainShell.material.emissiveIntensity = 0.66 + acidPulse * 0.3;

        const dx = this.player.position.x - acidStorm.safeCenter.x;
        const dz = this.player.position.z - acidStorm.safeCenter.z;
        const underRoof = Math.hypot(dx, dz) <= acidStorm.safeRadius;
        if (!underRoof) {
          this.damagePlayer(acidStorm.damagePerSecond * dt);
        }
      }

      if (acidStorm.timer >= totalDuration) {
        this.effectGroup.remove(acidStorm.blizzardDome);
        this.effectGroup.remove(acidStorm.blizzardCloud);
        this.effectGroup.remove(acidStorm.acidRainShell);
        this.effectGroup.remove(acidStorm.safeRoof);
        this.effectGroup.remove(acidStorm.safeRoofRing);
        this.effectGroup.remove(acidStorm.safeRoofBeacon);
        this.bossHazards.acidSnowStorm = null;
      }
    }

    const aegisLockdown = this.bossHazards.aegisLockdown;
    if (aegisLockdown) {
      aegisLockdown.timer += dt;
      const enemyAlive = this.enemies.includes(aegisLockdown.enemy);
      if (!enemyAlive) {
        for (const marker of aegisLockdown.markers) {
          this.effectGroup.remove(marker.ring);
          this.effectGroup.remove(marker.glow);
        }
        this.bossHazards.aegisLockdown = null;
      } else {
        const warningPhase = aegisLockdown.timer < aegisLockdown.warningDuration;
        if (warningPhase) {
          for (const marker of aegisLockdown.markers) {
            const pulse = 0.3 + Math.sin(this.elapsed * 10 + marker.phase) * 0.18;
            marker.ring.material.opacity = 0.22 + pulse;
            marker.glow.material.opacity = 0.12 + pulse * 0.5;
            marker.glow.scale.setScalar(0.86 + pulse * 0.16);
          }
        } else {
          while (
            aegisLockdown.nextBlastIndex < aegisLockdown.markers.length &&
            aegisLockdown.timer >=
              aegisLockdown.warningDuration +
                aegisLockdown.nextBlastIndex * aegisLockdown.blastInterval
          ) {
            const marker = aegisLockdown.markers[aegisLockdown.nextBlastIndex];
            marker.ring.material.opacity = 0;
            marker.glow.material.opacity = 0;
            this.spawnExplosion(marker.position.clone(), 0xffb06a);
            if (this.player.position.distanceTo(marker.position) <= marker.radius) {
              this.damagePlayer(aegisLockdown.damagePerBlast);
            }
            aegisLockdown.nextBlastIndex += 1;
          }
        }

        if (aegisLockdown.timer >= aegisLockdown.totalDuration) {
          for (const marker of aegisLockdown.markers) {
            this.effectGroup.remove(marker.ring);
            this.effectGroup.remove(marker.glow);
          }
          aegisLockdown.enemy.aegisLockdownActive = false;
          this.bossHazards.aegisLockdown = null;
        }
      }
    }

    const nullGrid = this.bossHazards.nullGridCollapse;
    if (nullGrid) {
      nullGrid.timer += dt;
      const enemyAlive = this.enemies.includes(nullGrid.enemy);
      if (!enemyAlive) {
        for (const cell of nullGrid.cells) {
          this.effectGroup.remove(cell.base);
          this.effectGroup.remove(cell.outline);
        }
        this.bossHazards.nullGridCollapse = null;
      } else {
        for (const cell of nullGrid.cells) {
          const pulse = 0.34 + Math.sin(this.elapsed * 8 + cell.phase) * 0.2;
          cell.base.material.opacity = cell.blasted ? 0.05 : 0.16 + pulse * 0.4;
          cell.outline.material.opacity = cell.blasted ? 0.08 : 0.3 + pulse * 0.5;
        }

        if (nullGrid.timer >= nullGrid.warningDuration) {
          while (
            nullGrid.nextBlastIndex < nullGrid.hazardIndices.length &&
            nullGrid.timer >=
              nullGrid.warningDuration + nullGrid.nextBlastIndex * nullGrid.chainInterval
          ) {
            const cellIndex = nullGrid.hazardIndices[nullGrid.nextBlastIndex];
            const cell = nullGrid.cells[cellIndex];
            if (cell && !cell.blasted) {
              cell.blasted = true;
              this.spawnExplosion(cell.position.clone(), 0x7cf5ff);
              if (this.player.position.distanceTo(cell.position) <= nullGrid.blastRadius) {
                this.damagePlayer(nullGrid.damagePerBlast);
              }
            }
            nullGrid.nextBlastIndex += 1;
          }
        }

        if (nullGrid.timer >= nullGrid.totalDuration) {
          for (const cell of nullGrid.cells) {
            this.effectGroup.remove(cell.base);
            this.effectGroup.remove(cell.outline);
          }
          if (enemyAlive) {
            nullGrid.enemy.nullOverheatTimer = 2;
            this.pushHazardAlert(
              "Null Sentinel sobrecalentado: es tu ventana.",
              "Null Sentinel overheated: this is your window.",
              1.9,
            );
          }
          this.bossHazards.nullGridCollapse = null;
        }
      }
    }
  }

  triggerGlacierAcidSnowStorm(enemy) {
    if (this.bossHazards.acidSnowStorm) {
      return;
    }

    const safeAngle = randRange(0, Math.PI * 2);
    const safeDistance = randRange(3.8, ARENA_RADIUS - 9.8);
    const safeCenter = new THREE.Vector3(
      Math.cos(safeAngle) * safeDistance,
      0,
      Math.sin(safeAngle) * safeDistance,
    );
    const safeRadius = randRange(3.5, 4.8);
    const roofHeight = 3.2;

    const blizzardDome = new THREE.Mesh(
      new THREE.CylinderGeometry(ARENA_RADIUS - 1.6, ARENA_RADIUS - 1.6, 8.2, 48, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0xb8eaff,
        emissive: 0x94ddff,
        emissiveIntensity: 0.28,
        transparent: true,
        opacity: 0.24,
        side: THREE.DoubleSide,
        roughness: 0.62,
        metalness: 0.05,
      }),
    );
    blizzardDome.position.y = 4.1;
    this.effectGroup.add(blizzardDome);

    const blizzardCloud = new THREE.Mesh(
      new THREE.CircleGeometry(ARENA_RADIUS - 1.8, 52),
      new THREE.MeshBasicMaterial({
        color: 0xd9f2ff,
        transparent: true,
        opacity: 0.14,
        side: THREE.DoubleSide,
      }),
    );
    blizzardCloud.rotation.x = -Math.PI / 2;
    blizzardCloud.position.y = 5.8;
    this.effectGroup.add(blizzardCloud);

    const acidRainShell = new THREE.Mesh(
      new THREE.CylinderGeometry(ARENA_RADIUS - 1.9, ARENA_RADIUS - 1.9, 7.6, 52, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0x8cffb3,
        emissive: 0x62ff9a,
        emissiveIntensity: 0.74,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
        roughness: 0.45,
        metalness: 0.06,
      }),
    );
    acidRainShell.position.y = 3.85;
    acidRainShell.visible = false;
    this.effectGroup.add(acidRainShell);

    const safeRoof = new THREE.Mesh(
      new THREE.CircleGeometry(safeRadius, 32),
      new THREE.MeshStandardMaterial({
        color: 0xd9f7ff,
        emissive: 0xa9f0ff,
        emissiveIntensity: 1.05,
        transparent: true,
        opacity: 0.28,
        side: THREE.DoubleSide,
        roughness: 0.2,
        metalness: 0.16,
      }),
    );
    safeRoof.rotation.x = -Math.PI / 2;
    safeRoof.position.set(safeCenter.x, roofHeight, safeCenter.z);
    safeRoof.visible = false;
    this.effectGroup.add(safeRoof);

    const safeRoofRing = new THREE.Mesh(
      new THREE.TorusGeometry(safeRadius, 0.14, 14, 42),
      new THREE.MeshStandardMaterial({
        color: 0xc1f5ff,
        emissive: 0x9befff,
        emissiveIntensity: 1.2,
        transparent: true,
        opacity: 0.56,
        roughness: 0.2,
        metalness: 0.32,
      }),
    );
    safeRoofRing.rotation.x = Math.PI / 2;
    safeRoofRing.position.set(safeCenter.x, roofHeight + 0.04, safeCenter.z);
    safeRoofRing.visible = false;
    this.effectGroup.add(safeRoofRing);

    const safeRoofBeacon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.22, roofHeight + 0.8, 12),
      new THREE.MeshStandardMaterial({
        color: 0xd8f7ff,
        emissive: 0xa3f1ff,
        emissiveIntensity: 1.3,
        transparent: true,
        opacity: 0.46,
      }),
    );
    safeRoofBeacon.position.set(safeCenter.x, (roofHeight + 0.8) * 0.5, safeCenter.z);
    safeRoofBeacon.visible = false;
    this.effectGroup.add(safeRoofBeacon);

    this.bossHazards.acidSnowStorm = {
      timer: 0,
      introDuration: 2.6,
      warningDuration: 2.1,
      acidDuration: 4.8,
      warningTriggered: false,
      safeCenter,
      safeRadius,
      roofHeight,
      damagePerSecond: enemy.rage ? 28 : 20,
      blizzardDome,
      blizzardCloud,
      acidRainShell,
      safeRoof,
      safeRoofRing,
      safeRoofBeacon,
    };
  }

  triggerAegisLockdown(enemy) {
    if (this.bossHazards.aegisLockdown) {
      return;
    }

    enemy.aegisLockdownActive = true;
    this.pushHazardAlert(
      "Aegis Lockdown: artilleria entrante.",
      "Aegis Lockdown: incoming artillery.",
      2.4,
    );

    const markers = [];
    for (let i = 0; i < 3; i += 1) {
      const targetPos = this.player.position.clone().add(
        new THREE.Vector3(randRange(-4.6, 4.6), 0, randRange(-4.6, 4.6)),
      );
      const radius = Math.hypot(targetPos.x, targetPos.z);
      if (radius > ARENA_RADIUS - 2.8) {
        const ratio = (ARENA_RADIUS - 2.8) / Math.max(0.001, radius);
        targetPos.x *= ratio;
        targetPos.z *= ratio;
      }

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(1, 1.56, 30),
        new THREE.MeshBasicMaterial({
          color: 0xffbf7a,
          transparent: true,
          opacity: 0.42,
          side: THREE.DoubleSide,
        }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(targetPos.x, 0.09, targetPos.z);
      this.effectGroup.add(ring);

      const glow = new THREE.Mesh(
        new THREE.CircleGeometry(0.9, 24),
        new THREE.MeshBasicMaterial({
          color: 0xff9e52,
          transparent: true,
          opacity: 0.28,
          side: THREE.DoubleSide,
        }),
      );
      glow.rotation.x = -Math.PI / 2;
      glow.position.set(targetPos.x, 0.08, targetPos.z);
      this.effectGroup.add(glow);

      markers.push({
        position: targetPos,
        radius: 1.56,
        ring,
        glow,
        phase: i * 0.9,
      });
    }

    this.bossHazards.aegisLockdown = {
      enemy,
      timer: 0,
      warningDuration: 1.45,
      blastInterval: 0.26,
      totalDuration: 2.6,
      nextBlastIndex: 0,
      damagePerBlast: enemy.rage ? 28 : 22,
      markers,
    };
  }

  triggerHarbingerRazorHunt(enemy) {
    if (enemy.harbingerHuntTimer > 0) {
      return;
    }

    this.clearHarbingerShadows(enemy);
    enemy.harbingerHuntDuration = 2.1;
    enemy.harbingerHuntTimer = enemy.harbingerHuntDuration;
    enemy.harbingerDashDone = false;
    this.pushHazardAlert(
      "Razor Hunt: Harbinger se desvanecio.",
      "Razor Hunt: Harbinger has faded.",
      2.2,
    );

    for (let i = 0; i < 3; i += 1) {
      const shadow = new THREE.Mesh(
        new THREE.ConeGeometry(0.62, 2.1, 10),
        new THREE.MeshStandardMaterial({
          color: 0xff7a9d,
          emissive: 0xff4d75,
          emissiveIntensity: 0.85,
          transparent: true,
          opacity: 0.3,
          roughness: 0.45,
          metalness: 0.12,
        }),
      );
      shadow.rotation.x = Math.PI;
      shadow.position.set(enemy.root.position.x, enemy.root.position.y + 0.15, enemy.root.position.z);
      this.effectGroup.add(shadow);
      enemy.harbingerShadows.push(shadow);
    }
  }

  triggerNullGridCollapse(enemy) {
    if (this.bossHazards.nullGridCollapse) {
      return;
    }

    const center = this.player.position.clone();
    center.y = 0;
    const centerRadius = Math.hypot(center.x, center.z);
    if (centerRadius > ARENA_RADIUS - 6.4) {
      const ratio = (ARENA_RADIUS - 6.4) / Math.max(0.001, centerRadius);
      center.x *= ratio;
      center.z *= ratio;
    }

    const cells = [];
    const step = 2.35;
    const offsets = [-1, 0, 1];
    for (const zIndex of offsets) {
      for (const xIndex of offsets) {
        const position = new THREE.Vector3(center.x + xIndex * step, 0, center.z + zIndex * step);
        const radius = Math.hypot(position.x, position.z);
        if (radius > ARENA_RADIUS - 2.6) {
          const ratio = (ARENA_RADIUS - 2.6) / Math.max(0.001, radius);
          position.x *= ratio;
          position.z *= ratio;
        }

        const base = new THREE.Mesh(
          new THREE.PlaneGeometry(1.7, 1.7),
          new THREE.MeshBasicMaterial({
            color: 0x8feeff,
            transparent: true,
            opacity: 0.25,
            side: THREE.DoubleSide,
          }),
        );
        base.rotation.x = -Math.PI / 2;
        base.position.set(position.x, 0.08, position.z);
        this.effectGroup.add(base);

        const outline = new THREE.Mesh(
          new THREE.RingGeometry(0.72, 0.88, 4),
          new THREE.MeshBasicMaterial({
            color: 0x6fdfff,
            transparent: true,
            opacity: 0.42,
            side: THREE.DoubleSide,
          }),
        );
        outline.rotation.x = -Math.PI / 2;
        outline.position.set(position.x, 0.09, position.z);
        this.effectGroup.add(outline);

        cells.push({
          position,
          base,
          outline,
          blasted: false,
          phase: randRange(0, Math.PI * 2),
        });
      }
    }

    const candidateIndices = shuffleInPlace(cells.map((_, index) => index)).slice(0, 5);
    this.pushHazardAlert(
      "Null Grid Collapse: evita las celdas marcadas.",
      "Null Grid Collapse: avoid marked cells.",
      2.8,
    );

    this.bossHazards.nullGridCollapse = {
      enemy,
      timer: 0,
      warningDuration: 1.55,
      chainInterval: 0.24,
      totalDuration: 3.2,
      nextBlastIndex: 0,
      blastRadius: 1.25,
      damagePerBlast: enemy.rage ? 22 : 16,
      hazardIndices: candidateIndices,
      cells,
    };
  }

  pushHazardAlert(textEs, textEn, duration = 2.8) {
    this.hazardAlert.textEs = textEs;
    this.hazardAlert.textEn = textEn;
    this.hazardAlert.timer = Math.max(this.hazardAlert.timer, duration);
  }

  triggerRadlordTsunami(enemy) {
    if (this.bossHazards.radiationTsunami) {
      return;
    }

    const safeAngle = randRange(0, Math.PI * 2);
    const safeDistance = randRange(4.5, ARENA_RADIUS - 9.5);
    const safeCenter = new THREE.Vector3(
      Math.cos(safeAngle) * safeDistance,
      0,
      Math.sin(safeAngle) * safeDistance,
    );
    const safeRadius = randRange(4.2, 6.2);

    const wave = new THREE.Mesh(
      new THREE.CircleGeometry(ARENA_RADIUS - 1.2, 72),
      new THREE.MeshStandardMaterial({
        color: 0x2cff6f,
        emissive: 0x29e866,
        emissiveIntensity: 0.62,
        transparent: true,
        opacity: 0.36,
        roughness: 0.58,
        metalness: 0.04,
      }),
    );
    wave.rotation.x = -Math.PI / 2;
    wave.position.set(0, 0.05, 0);
    this.effectGroup.add(wave);

    const safeRing = new THREE.Mesh(
      new THREE.RingGeometry(safeRadius * 0.92, safeRadius, 48),
      new THREE.MeshBasicMaterial({
        color: 0xc9ffe9,
        transparent: true,
        opacity: 0.56,
        side: THREE.DoubleSide,
      }),
    );
    safeRing.rotation.x = -Math.PI / 2;
    safeRing.position.set(safeCenter.x, 0.06, safeCenter.z);
    this.effectGroup.add(safeRing);

    const safeGlow = new THREE.Mesh(
      new THREE.CircleGeometry(safeRadius * 0.86, 42),
      new THREE.MeshBasicMaterial({
        color: 0x73ffcf,
        transparent: true,
        opacity: 0.34,
        side: THREE.DoubleSide,
      }),
    );
    safeGlow.rotation.x = -Math.PI / 2;
    safeGlow.position.set(safeCenter.x, 0.05, safeCenter.z);
    this.effectGroup.add(safeGlow);

    const safeBeacon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.24, 2.8, 12),
      new THREE.MeshStandardMaterial({
        color: 0x9dffe4,
        emissive: 0x69ffd1,
        emissiveIntensity: 1.26,
        transparent: true,
        opacity: 0.72,
      }),
    );
    safeBeacon.position.set(safeCenter.x, 1.5, safeCenter.z);
    this.effectGroup.add(safeBeacon);

    const waveFront = new THREE.Mesh(
      new THREE.TorusGeometry(ARENA_RADIUS - 1.8, 0.68, 18, 72),
      new THREE.MeshStandardMaterial({
        color: 0x9affc3,
        emissive: 0x7effb4,
        emissiveIntensity: 1.02,
        transparent: true,
        opacity: 0.82,
        roughness: 0.22,
        metalness: 0.08,
      }),
    );
    waveFront.rotation.x = Math.PI / 2;
    waveFront.position.set(0, 1.75, 0);
    this.effectGroup.add(waveFront);

    this.bossHazards.radiationTsunami = {
      timer: 0,
      duration: 4.4,
      safeCenter,
      safeRadius,
      damagePerSecond: enemy.rage ? 35 : 24,
      mesh: wave,
      safeMesh: safeRing,
      safeGlowMesh: safeGlow,
      safeBeaconMesh: safeBeacon,
      frontMesh: waveFront,
    };
  }

  triggerOverheatLavaPillars(enemy, count = 3) {
    const spawnCount = Math.max(1, count);
    for (let i = 0; i < spawnCount; i += 1) {
      const aroundPlayer = this.player.position.clone().add(
        new THREE.Vector3(randRange(-8.2, 8.2), 0, randRange(-8.2, 8.2)),
      );
      const radius = Math.hypot(aroundPlayer.x, aroundPlayer.z);
      if (radius > ARENA_RADIUS - 2.2) {
        const ratio = (ARENA_RADIUS - 2.2) / Math.max(0.001, radius);
        aroundPlayer.x *= ratio;
        aroundPlayer.z *= ratio;
      }

      const base = new THREE.Mesh(
        new THREE.RingGeometry(1.1, 1.72, 36),
        new THREE.MeshBasicMaterial({
          color: 0xff6b2f,
          transparent: true,
          opacity: 0.34,
          side: THREE.DoubleSide,
        }),
      );
      base.rotation.x = -Math.PI / 2;
      base.position.set(aroundPlayer.x, 0.08, aroundPlayer.z);
      this.effectGroup.add(base);

      const column = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 1.08, 6.8, 18),
        new THREE.MeshStandardMaterial({
          color: 0xff7a38,
          emissive: 0xff5d24,
          emissiveIntensity: 0.95,
          transparent: true,
          opacity: 0.16,
        }),
      );
      column.position.set(aroundPlayer.x, 3.2, aroundPlayer.z);
      this.effectGroup.add(column);

      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.62, 12, 12),
        new THREE.MeshStandardMaterial({
          color: 0xffb35d,
          emissive: 0xff7a32,
          emissiveIntensity: 1.1,
          transparent: true,
          opacity: 0.62,
        }),
      );
      glow.position.set(aroundPlayer.x, 0.6, aroundPlayer.z);
      this.effectGroup.add(glow);

      this.bossHazards.lavaPillars.push({
        timer: 0,
        warnDuration: 0.92,
        activeDuration: enemy.rage ? 2.8 : 2.2,
        radius: enemy.rage ? 2.1 : 1.78,
        damagePerSecond: enemy.rage ? 52 : 38,
        position: aroundPlayer,
        base,
        column,
        glow,
        phase: randRange(0, Math.PI * 2),
      });
    }
  }

  getSummonedBossAliveCount() {
    let count = 0;
    for (const enemy of this.enemies) {
      if (enemy.isBoss && enemy.summonedBoss) {
        count += 1;
      }
    }
    return count;
  }

  spawnOverheatSupportBoss() {
    if (!this.currentBoss || this.currentBoss.type !== "sentinel_apex") {
      return false;
    }
    if (this.getSummonedBossAliveCount() >= 1) {
      return false;
    }

    const summonPool = ["infernotyrant", "behemoth", "voidarchon"];
    const bossType = summonPool[Math.floor(Math.random() * summonPool.length)];
    const base = BOSS_DEFS[bossType];
    if (!base) {
      return false;
    }

    const def = {
      ...base,
      maxHealth: Math.round(base.maxHealth * 0.45),
      shieldOverride: Math.round((base.shieldOverride ?? 0) * 0.4),
      score: Math.round(base.score * 0.55),
      coinReward: Math.max(2, Math.round((base.coinReward ?? 2) * 0.75)),
      contactDamage: Math.round(base.contactDamage * 0.82),
      damage: Math.round(base.damage * 0.86),
    };
    const model = BOSS_MODEL_FACTORIES[bossType]();
    this.decorateBossModelByType(bossType, model);

    const root = new THREE.Group();
    root.add(model);
    const revealMarker = this.createEnemyRevealMarker(root, def, true);
    const spawnPos = this.findSpawnPosition(16, ARENA_RADIUS - 12, ARENA_RADIUS - 6);
    root.position.set(spawnPos.x, def.baseHeight, spawnPos.z);
    this.enemyGroup.add(root);

    const shieldMax = Math.max(0, def.shieldOverride ?? 0);
    const supportBoss = {
      type: bossType,
      isBoss: true,
      summonedBoss: true,
      bossLabel: `${base.label} (invocado)`,
      displayLabel: `${base.label} (invocado)`,
      bossPattern: base.attackPattern,
      movementStyle: base.movementStyle,
      meleeRange: base.meleeRange,
      cycleTier: this.currentBoss.cycleTier,
      def,
      root,
      model,
      shieldMax,
      shield: shieldMax,
      health: def.maxHealth,
      fireCooldown: Math.max(0.8, def.shotCooldown * 0.8),
      orbitSign: Math.random() > 0.5 ? 1 : -1,
      bobOffset: randRange(0, Math.PI * 2),
      flash: 0,
      burstShotsRemaining: 0,
      burstGap: 0,
      portalVolleyStep: 0,
      summonCooldown: Infinity,
      novaCooldown: Infinity,
      meteorCooldown: Infinity,
      lavaPillarCooldown: Infinity,
      bossSpawnCooldown: Infinity,
      tsunamiCooldown: Infinity,
      rage: false,
      revealMarker,
    };

    this.enemies.push(supportBoss);
    return true;
  }

  spawnHellMeteorVolley(enemy, count) {
    for (let i = 0; i < count; i += 1) {
      const origin = new THREE.Vector3(
        this.player.position.x + randRange(-6.5, 6.5),
        randRange(9.5, 12.8),
        this.player.position.z + randRange(-6.5, 6.5),
      );
      const target = this.player.position.clone().add(
        new THREE.Vector3(randRange(-1.4, 1.4), -0.24, randRange(-1.4, 1.4)),
      );
      const direction = target.sub(origin).normalize();
      this.spawnEnemyProjectile(enemy, origin, direction, {
        damageMultiplier: enemy.rage ? 0.96 : 0.76,
        projectileSpeedMultiplier: enemy.rage ? 1.18 : 1.04,
        radiusMultiplier: enemy.rage ? 1.26 : 1.08,
        ttl: 5.2,
      });
    }

    this.playEnemyShotSfx(true);
  }

  fireEnemyShot(enemy, options = {}) {
    const {
      spread = 0.04,
      damageMultiplier = 1,
      projectileSpeedMultiplier = 1,
      radiusMultiplier = 1,
      ttl = enemy.isBoss ? 4.2 : 3,
      yawOffset = 0,
      pitchOffset = 0,
      originOffset = null,
    } = options;
    const { def, root } = enemy;
    const origin = new THREE.Vector3(
      root.position.x,
      root.position.y + def.muzzleOffsetY,
      root.position.z,
    );

    if (originOffset) {
      const rotatedOffset = new THREE.Vector3(
        originOffset.x ?? 0,
        originOffset.y ?? 0,
        originOffset.z ?? 0,
      ).applyAxisAngle(WORLD_UP, root.rotation.y);
      origin.add(rotatedOffset);
    }

    const target = this.player.position.clone();
    target.y -= 0.34;

    const direction = target.sub(origin).normalize();
    const horizontal = new THREE.Vector3(-direction.z, 0, direction.x);
    if (horizontal.lengthSq() < 0.0001) {
      horizontal.set(1, 0, 0);
    } else {
      horizontal.normalize();
    }
    const vertical = new THREE.Vector3().crossVectors(horizontal, direction).normalize();

    direction.addScaledVector(horizontal, yawOffset);
    direction.addScaledVector(vertical, pitchOffset);
    direction.x += randRange(-spread, spread);
    direction.y += randRange(-spread * 0.6, spread * 0.6);
    direction.z += randRange(-spread, spread);
    direction.normalize();

    this.spawnEnemyProjectile(enemy, origin, direction, {
      damageMultiplier,
      projectileSpeedMultiplier,
      radiusMultiplier,
      ttl,
    });

    this.playEnemyShotSfx(enemy.isBoss);
  }

  getSpreadDirection(baseDirection, spread) {
    const direction = baseDirection.clone();
    if (spread <= 0) {
      return direction;
    }

    const right = new THREE.Vector3().crossVectors(direction, WORLD_UP);
    if (right.lengthSq() < 0.0001) {
      right.set(1, 0, 0);
    } else {
      right.normalize();
    }
    const up = new THREE.Vector3().crossVectors(right, direction).normalize();

    direction.addScaledVector(right, randRange(-spread, spread));
    direction.addScaledVector(up, randRange(-spread, spread));
    direction.normalize();
    return direction;
  }

  spawnPlayerProjectile(origin, direction, options = {}) {
    if (this.projectiles.length >= MAX_PROJECTILES) {
      return;
    }
    const {
      damage,
      speed,
      radius,
      ttl,
      color = PLAYER_PROJECTILE_COLOR,
      pierce = 0,
    } = options;

    const projectileMaterial = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 1.25,
      roughness: 0.08,
      metalness: 0.62,
    });

    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.58, radius * 0.9, radius * 5.8, 10),
      projectileMaterial,
    );
    mesh.position.copy(origin);
    mesh.castShadow = true;
    mesh.quaternion.setFromUnitVectors(PROJECTILE_AXIS, direction);
    this.projectileGroup.add(mesh);

    this.projectiles.push({
      mesh,
      owner: "player",
      velocity: direction.clone().multiplyScalar(speed),
      damage,
      radius,
      ttl,
      travel: 0,
      color,
      pierce,
    });
  }

  firePlayerShot() {
    this.player.shotCooldown = this.getShotCooldownBase();
    this.player.recoil = 1;

    const origin = this.camera.getWorldPosition(new THREE.Vector3());
    const direction = this.camera.getWorldDirection(new THREE.Vector3()).normalize();
    const muzzleOffset = new THREE.Vector3(0.08, -0.08, -0.78).applyQuaternion(
      this.camera.quaternion,
    );
    const spawnPoint = origin.clone().add(muzzleOffset);

    const weapon = this.getWeaponConfig();
    const pellets = weapon.pellets ?? 1;
    const burst = weapon.burst ?? 1;
    const spread = weapon.spread ?? 0;
    const damage = this.getShotDamage();
    const speed = this.getPlayerProjectileSpeed();
    const pierce = this.getPlayerPierceCount();
    const color = weapon.color ?? PLAYER_PROJECTILE_COLOR;

    let tracerSpawned = false;
    for (let b = 0; b < burst; b += 1) {
      for (let p = 0; p < pellets; p += 1) {
        const shotDirection = this.getSpreadDirection(direction, spread);
        this.spawnPlayerProjectile(spawnPoint, shotDirection, {
          damage,
          speed,
          radius: PLAYER_PROJECTILE_RADIUS,
          ttl: PLAYER_PROJECTILE_LIFETIME,
          color,
          pierce,
        });

        if (!tracerSpawned) {
          this.spawnTracer(
            spawnPoint,
            spawnPoint.clone().addScaledVector(shotDirection, 0.8),
          );
          tracerSpawned = true;
        }
      }
    }

    this.playPlayerShotSfx();
  }

  damageEnemy(enemy, amount, position) {
    if (this.isDevModeActive() && this.settings.devOneShot) {
      enemy.shield = 0;
      enemy.health = 0;
      amount = enemy.def.maxHealth ?? 9999;
    }

    if (enemy.type === "aegis" && enemy.aegisLockdownActive) {
      this.spawnImpact(position, BOSS_SHIELD_COLOR, 8, 0.68);
      return;
    }

    if (enemy.type === "harbinger" && enemy.harbingerExposedTimer > 0) {
      amount *= 1.45;
    }
    if (enemy.type === "sentinel" && enemy.nullOverheatTimer > 0) {
      amount *= 1.35;
    }

    if (enemy.isBoss && enemy.shield > 0) {
      enemy.shield = Math.max(0, enemy.shield - amount);
      enemy.flash = 0.52;
      this.spawnImpact(position, BOSS_SHIELD_COLOR, 10, 0.82);

      if (enemy.shield <= 0) {
        const breakPosition = enemy.root.position.clone().add(
          new THREE.Vector3(0, Math.max(1.2, enemy.def.targetOffsetY ?? 1.4), 0),
        );
        if (enemy.type === "sentinel_apex") {
          enemy.rage = true;
          enemy.novaCooldown = Math.min(enemy.novaCooldown, 0.6);
          enemy.meteorCooldown = Math.min(enemy.meteorCooldown, 1.2);
        }
        this.spawnExplosion(breakPosition, BOSS_SHIELD_COLOR);
        this.playShieldSfx(true);
      } else {
        this.playShieldSfx(false);
      }
      return;
    }

    enemy.health -= amount;
    enemy.flash = 0.45;
    this.spawnImpact(position, enemy.def.projectileColor, 8, 0.72);

    if (enemy.health > 0) {
      return;
    }

    this.kills += 1;
    this.score += enemy.def.score;
    this.coins += enemy.def.coinReward ?? 1;
    this.player.health = Math.min(
      this.getMaxShield(),
      this.player.health + 3 + this.getKillShieldBonus(),
    );

    this.removeEnemy(enemy);
    this.spawnExplosion(enemy.root.position.clone(), enemy.def.projectileColor);
    this.playKillSfx(enemy.isBoss);

    if (enemy.isBoss && !enemy.summonedBoss) {
      this.bossPhaseResolved = true;
      if (enemy.type === "sentinel_apex") {
        this.startFinalCutscene();
      } else {
        this.openShopPhase();
      }
    }
  }

  removeEnemy(enemy) {
    if (enemy.type === "harbinger") {
      this.clearHarbingerShadows(enemy);
      this.setBossModelOpacity(enemy.model, 1);
    }
    this.enemyGroup.remove(enemy.root);
    this.enemies = this.enemies.filter((entry) => entry !== enemy);

    if (this.currentBoss === enemy) {
      this.currentBoss = null;
    }
  }

  openShopPhase() {
    this.phase = "shop";
    this.inputs.shoot = false;
    this.player.position.y = PLAYER_HEIGHT;
    this.player.verticalVelocity = 0;
    this.player.grounded = true;
    this.shop.restTimer = SHOP_REST_DURATION;
    this.shop.readyToResume = false;
    this.shop.message = "Pasa el mouse sobre una mejora y haz click para comprarla.";
    this.rollShopOffers();

    this.clearEntities(this.projectiles, this.projectileGroup);
    this.projectiles = [];
    this.clearEntities(this.pickups, this.pickupGroup);
    this.pickups = [];

    document.exitPointerLock();
    this.showShopWorld();
    this.updateShopUi();
    this.ui.overlay?.classList.remove("overlay--visible");
  }

  completeHellTrackRun() {
    this.gameOver = true;
    this.phase = "victory";
    this.inputs.shoot = false;
    this.player.position.y = PLAYER_HEIGHT;
    this.player.verticalVelocity = 0;
    this.player.grounded = true;
    this.hideEpilogueMap();
    this.clearEntities(this.projectiles, this.projectileGroup);
    this.projectiles = [];
    document.exitPointerLock();
    this.hideShopWorld();
    this.hideTransitionScreen();
    this.hideCutsceneSubtitle();
    this.hideStaticScreen();
    this.hideWhiteScreen();
    this.hideCreditsScreen();
    this.hideTrailerTitleScreen();
    this.hideFinalCutsceneActors();
    this.showOverlay(
      "Hell Track despejada",
      "Derrotaste a Null Sentinel Overheat y sobreviviste al cierre final de la run. El ultimo mundo ya quedo limpio, pero puedes volver a cualquier ruta desbloqueada desde el menu.",
      "Nueva run",
      { showSettings: true, showActions: true, showWorldSelect: true, showCredits: true },
    );
  }

  startNextCycle(options = {}) {
    this.startCycle(false, options);
    this.shop.readyToResume = true;
    this.updateShopUi();
  }

  damagePlayer(amount) {
    if (this.gameOver) {
      return;
    }
    if (this.isDevModeActive() && this.settings.devInfiniteHealth !== false) {
      return;
    }

    const finalDamage = amount * this.getDamageResistanceMultiplier();
    this.player.health = Math.max(0, this.player.health - finalDamage);
    this.player.damagePulse = 1;
    this.playDamageSfx();

    if (this.player.health > 0) {
      return;
    }

    this.gameOver = true;
    this.inputs.shoot = false;
    document.exitPointerLock();
    this.showOverlay(
      "Run terminada",
      `Score final: ${this.score}. Juntaste ${this.coins} monedas y derrotaste ${this.kills} enemigos. Presiona R o usa el boton para volver a empezar.`,
      "Reintentar",
      { showSettings: true, showShop: false, showActions: true, showWorldSelect: true },
    );
  }

  updateProjectiles(dt) {
    for (let i = this.projectiles.length - 1; i >= 0; i -= 1) {
      const projectile = this.projectiles[i];
      const previousPosition = projectile.mesh.position.clone();
      projectile.ttl -= dt;
      projectile.mesh.position.addScaledVector(projectile.velocity, dt);
      const stepDistance = previousPosition.distanceTo(projectile.mesh.position);
      projectile.travel += stepDistance;

      if (projectile.owner === "player" || projectile.owner === "ally") {
        let hitEnemy = null;
        let hitPoint = null;
        let hitDistance = Infinity;

        for (const enemy of this.enemies) {
          const center = new THREE.Vector3(
            enemy.root.position.x,
            enemy.root.position.y + enemy.def.targetOffsetY,
            enemy.root.position.z,
          );
          const distance = segmentSphereIntersection(
            previousPosition,
            projectile.mesh.position,
            center,
            enemy.def.hitRadius + projectile.radius * 0.45,
          );

          if (distance !== null && distance < hitDistance) {
            hitDistance = distance;
            hitEnemy = enemy;
            hitPoint = previousPosition
              .clone()
              .lerp(projectile.mesh.position, distance / stepDistance);
          }
        }

        if (hitEnemy && hitPoint) {
          this.damageEnemy(hitEnemy, projectile.damage, hitPoint);
          if (projectile.owner === "player") {
            const hitShield = this.getHitShieldBonus();
            if (hitShield > 0) {
              this.player.health = Math.min(this.getMaxShield(), this.player.health + hitShield);
            }
          }
          if (projectile.pierce && projectile.pierce > 0) {
            projectile.pierce -= 1;
            const nudge = projectile.velocity.clone().normalize();
            projectile.mesh.position.copy(hitPoint).addScaledVector(nudge, 0.2);
            projectile.travel += 0.2;
          } else {
            this.projectileGroup.remove(projectile.mesh);
            this.projectiles.splice(i, 1);
            continue;
          }
        }
      }

      if (projectile.owner === "enemy") {
        let allyWasHit = false;
        for (const ally of this.allies) {
          const dxA = projectile.mesh.position.x - ally.root.position.x;
          const dyA = projectile.mesh.position.y - ally.root.position.y;
          const dzA = projectile.mesh.position.z - ally.root.position.z;
          const allyDistance = Math.sqrt(dxA * dxA + dyA * dyA + dzA * dzA);
          if (allyDistance < ally.hitRadius + projectile.radius) {
            this.damageAlly(ally, projectile.damage);
            this.spawnImpact(projectile.mesh.position.clone(), projectile.color, 5, 0.45);
            this.projectileGroup.remove(projectile.mesh);
            this.projectiles.splice(i, 1);
            allyWasHit = true;
            break;
          }
        }

        if (allyWasHit || !this.projectiles[i]) {
          continue;
        }

        const dx = projectile.mesh.position.x - this.player.position.x;
        const dy =
          projectile.mesh.position.y - (this.player.position.y - PLAYER_HEIGHT * 0.38);
        const dz = projectile.mesh.position.z - this.player.position.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < PLAYER_RADIUS + projectile.radius) {
          this.spawnImpact(projectile.mesh.position.clone(), projectile.color, 7, 0.54);
          this.damagePlayer(projectile.damage);
          this.projectileGroup.remove(projectile.mesh);
          this.projectiles.splice(i, 1);
          continue;
        }
      }

      const horizontalDistance = Math.hypot(
        projectile.mesh.position.x,
        projectile.mesh.position.z,
      );
      if (
        projectile.ttl <= 0 ||
        ((projectile.owner === "player" || projectile.owner === "ally") &&
          projectile.travel >= MAX_SHOT_DISTANCE) ||
        horizontalDistance > ARENA_RADIUS + 6 ||
        projectile.mesh.position.y < -2 ||
        projectile.mesh.position.y > 18
      ) {
        if (projectile.owner === "player" || projectile.owner === "ally") {
          this.spawnImpact(projectile.mesh.position.clone(), projectile.color, 4, 0.18);
        }
        this.projectileGroup.remove(projectile.mesh);
        this.projectiles.splice(i, 1);
      }
    }
  }

  updatePickups(dt) {
    if ((this.phase === "combat" || this.phase === "boss") && this.pickups.length === 0) {
      this.defenseLootTimer -= dt;
      if (this.defenseLootTimer <= 0) {
        this.spawnDefenseLoot();
        this.defenseLootTimer = this.getNextLootDelay();
      }
    }

    for (let i = this.pickups.length - 1; i >= 0; i -= 1) {
      const pickup = this.pickups[i];
      pickup.ttl -= dt;
      pickup.mesh.rotation.y += dt * 1.8;
      pickup.mesh.position.y = pickup.baseY + Math.sin(this.elapsed * 2.6 + pickup.phase) * 0.35;

      const distance = pickup.mesh.position.distanceTo(this.player.position);
      if (distance < 1.8) {
        this.collectPickup(pickup, i);
        continue;
      }

      if (pickup.ttl <= 0) {
        this.pickupGroup.remove(pickup.mesh);
        this.pickups.splice(i, 1);
        this.defenseLootTimer = this.getNextLootDelay();
      }
    }
  }

  spawnDefenseLoot() {
    const spawnPosition = this.findSpawnPosition(8, 6, ARENA_RADIUS - 5);
    const mesh = this.createShieldPickupModel();
    mesh.position.set(spawnPosition.x, 1.3, spawnPosition.z);
    this.pickupGroup.add(mesh);

    this.pickups.push({
      type: "shield",
      mesh,
      ttl: PICKUP_LIFETIME,
      baseY: 1.3,
      phase: randRange(0, Math.PI * 2),
      value: this.getShieldPickupValue(),
    });
  }

  collectPickup(pickup, index) {
    if (pickup.type === "shield") {
      this.player.health = Math.min(
        this.getMaxShield(),
        this.player.health + pickup.value,
      );
      this.spawnImpact(pickup.mesh.position.clone(), 0x7cff91, 12, 0.72);
      this.playPickupSfx();
    }

    this.pickupGroup.remove(pickup.mesh);
    this.pickups.splice(index, 1);
    this.defenseLootTimer = this.getNextLootDelay();
  }

  createShieldPickupModel() {
    const group = new THREE.Group();
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x7cff91,
      emissive: 0x7cff91,
      emissiveIntensity: 0.86,
      roughness: 0.16,
      metalness: 0.55,
    });
    const shellMaterial = new THREE.MeshStandardMaterial({
      color: 0x17324a,
      roughness: 0.28,
      metalness: 0.84,
    });

    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.48, 0), coreMaterial);
    group.add(core);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.82, 0.08, 12, 28),
      shellMaterial,
    );
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.04, 12, 24),
      coreMaterial,
    );
    halo.rotation.z = Math.PI / 2;
    group.add(halo);

    group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return group;
  }

  spawnTracer(start, end) {
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineBasicMaterial({
      color: 0xeef4ff,
      transparent: true,
      opacity: 0.95,
    });

    const mesh = new THREE.Line(geometry, material);
    this.effectGroup.add(mesh);
    this.effects.push({ mesh, ttl: 0.05, fade: true });
  }

  spawnImpact(position, color, count, force) {
    for (let i = 0; i < count; i += 1) {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.09, 0.09, 0.16),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 1,
          roughness: 0.24,
          metalness: 0.12,
        }),
      );

      mesh.position.copy(position);
      mesh.castShadow = true;
      this.effectGroup.add(mesh);

      const direction = new THREE.Vector3(
        randRange(-1, 1),
        randRange(0.2, 1.2),
        randRange(-1, 1),
      ).normalize();

      this.effects.push({
        mesh,
        velocity: direction.multiplyScalar(force * randRange(1.6, 3.2)),
        ttl: randRange(0.18, 0.45),
        gravity: 2.6,
      });
    }
  }

  spawnExplosion(position, color) {
    this.spawnImpact(position.clone().add(new THREE.Vector3(0, 1.2, 0)), color, 18, 1.1);
    this.spawnImpact(position.clone().add(new THREE.Vector3(0, 0.8, 0)), 0xffffff, 10, 0.7);
  }

  updateEffects(dt) {
    for (let i = this.effects.length - 1; i >= 0; i -= 1) {
      const effect = this.effects[i];
      effect.ttl -= dt;

      if (effect.velocity) {
        effect.velocity.y -= (effect.gravity ?? 0) * dt;
        effect.mesh.position.addScaledVector(effect.velocity, dt);
        effect.mesh.rotation.x += dt * 9;
        effect.mesh.rotation.y += dt * 11;
      }

      if (effect.fade && effect.mesh.material?.opacity !== undefined) {
        effect.mesh.material.opacity = clamp(effect.ttl / 0.05, 0, 1);
      }

      if (effect.ttl <= 0) {
        this.effectGroup.remove(effect.mesh);
        this.effects.splice(i, 1);
      }
    }
  }

  updateHud() {
    if (this.ui.score) this.ui.score.textContent = String(this.score);
    if (this.ui.wave) this.ui.wave.textContent = `W-${this.wave}`;
    if (this.ui.enemies) this.ui.enemies.textContent = String(this.enemies.length);
    if (this.ui.coins) {
      this.ui.coins.textContent = this.isDevModeActive() ? "∞" : String(this.coins);
    }
    if (this.ui.healthValue) {
      this.ui.healthValue.textContent = String(Math.ceil(this.player.health));
    }

    if (this.ui.healthFill) {
      const percent = clamp(this.player.health / this.getMaxShield(), 0, 1) * 100;
      this.ui.healthFill.style.width = `${percent}%`;
      this.ui.healthFill.style.filter =
        this.player.health < this.getMaxShield() * 0.35
          ? "saturate(1.1) brightness(1.05) hue-rotate(-38deg)"
          : "none";
    }

    if (this.ui.waveRevealAlert) {
      if (this.hazardAlert.timer > 0) {
        this.ui.waveRevealAlert.textContent = this.tr(
          this.hazardAlert.textEs,
          this.hazardAlert.textEn,
        );
      } else {
        this.ui.waveRevealAlert.textContent = this.tr(
          "La oleada tarda: se revelaron las ubicaciones enemigas.",
          "Wave is taking too long: enemy locations have been revealed.",
        );
      }
      const showRevealAlert =
        (this.waveReveal.messageTimer > 0 || this.hazardAlert.timer > 0) &&
        (this.phase === "combat" || this.phase === "boss");
      this.ui.waveRevealAlert.hidden = !showRevealAlert;
    }

    if (this.ui.allyPanel && this.ui.allyList) {
      const canShowAllies =
        (this.phase === "combat" || this.phase === "boss") && this.allies.length > 0;
      this.ui.allyPanel.hidden = !canShowAllies;

      for (const ally of this.allies) {
        if (!ally.uiValue || !ally.uiFill) {
          this.rebuildAllyHud();
          break;
        }
      }

      for (const ally of this.allies) {
        if (ally.uiValue) {
          ally.uiValue.textContent = `${Math.ceil(ally.health)} / ${ally.maxHealth}`;
        }
        if (ally.uiFill) {
          const allyPercent = clamp(ally.health / Math.max(1, ally.maxHealth), 0, 1) * 100;
          ally.uiFill.style.width = `${allyPercent}%`;
          ally.uiFill.style.filter =
            ally.health < ally.maxHealth * 0.32
              ? "saturate(1.08) brightness(1.05) hue-rotate(-28deg)"
              : "none";
        }
      }
    }

    if (this.currentBoss && this.enemies.includes(this.currentBoss)) {
      this.ui.bossPanel?.removeAttribute("hidden");
      const bossShield = Math.max(0, this.currentBoss.shield ?? 0);
      const bossShieldMax = Math.max(1, this.currentBoss.shieldMax ?? 1);
      const shieldBroken = bossShield <= 0;
      if (this.ui.bossName) {
        this.ui.bossName.textContent =
          this.currentBoss.displayLabel ?? this.currentBoss.def.label;
      }

      if (this.ui.bossHealthValue) {
        this.ui.bossHealthValue.textContent = `${Math.ceil(this.currentBoss.health)} / ${this.currentBoss.def.maxHealth}`;
      }

      if (this.ui.bossHealthFill) {
        const bossPercent =
          clamp(this.currentBoss.health / this.currentBoss.def.maxHealth, 0, 1) * 100;
        this.ui.bossHealthFill.style.width = `${bossPercent}%`;
        this.ui.bossHealthFill.style.opacity = shieldBroken ? "1" : "0.7";
        this.ui.bossHealthFill.style.filter = shieldBroken
          ? "none"
          : "saturate(0.42) brightness(0.76)";
      }

      if (this.ui.bossShieldValue) {
        this.ui.bossShieldValue.textContent = shieldBroken
          ? "Roto"
          : `${Math.ceil(bossShield)} / ${bossShieldMax}`;
      }

      if (this.ui.bossShieldFill) {
        const shieldPercent = clamp(bossShield / bossShieldMax, 0, 1) * 100;
        this.ui.bossShieldFill.style.width = `${shieldPercent}%`;
        this.ui.bossShieldFill.style.opacity = shieldBroken ? "0.2" : "1";
        this.ui.bossShieldFill.style.filter = shieldBroken
          ? "saturate(0.35) brightness(0.65)"
          : "none";
      }
    } else {
      this.ui.bossPanel?.setAttribute("hidden", "");
    }

    this.updateMobileControlsVisibility();
  }

  showOverlay(title, copy, buttonLabel, options = {}) {
    const {
      showSettings = true,
      showActions = true,
      showWorldSelect = false,
      showCycleSkip = false,
      showDevShop = false,
      showCredits = false,
      showAllies = false,
      showPcInstall = true,
    } = options;

    this.ui.overlay?.classList.add("overlay--visible");
    this.ui.overlay?.classList.remove("overlay--settings");
    this.ui.overlay?.classList.remove("overlay--allies");
    this.setMobileGameplayActive(false);
    if (this.ui.overlayTitle) this.ui.overlayTitle.textContent = this.translateText(title);
    if (this.ui.overlayCopy) this.ui.overlayCopy.textContent = this.translateText(copy);
    if (this.ui.overlayButton) this.ui.overlayButton.textContent = this.translateText(buttonLabel);
    if (this.ui.overlayActions) this.ui.overlayActions.hidden = !showActions;
    if (this.ui.overlaySkipCycle) {
      const usedSkips = this.getUsedCycleSkips();
      const skipCounter = `${usedSkips}/${SHOP_SKIP_LIMIT}`;
      const canUseSkip = this.isDevModeActive()
        ? true
        : this.getRemainingCycleSkips() > 0 && this.cycleCount < FINAL_BOSS_CYCLE;
      this.ui.overlaySkipCycle.hidden = !showCycleSkip;
      this.ui.overlaySkipCycle.textContent = canUseSkip
        ? this.isDevModeActive()
          ? this.tr("Saltar ciclo (ilimitado)", "Skip cycle (unlimited)")
          : this.tr(
              `Saltar ciclo ${skipCounter} (${this.getCycleSkipCost()} monedas)`,
              `Skip cycle ${skipCounter} (${this.getCycleSkipCost()} coins)`,
            )
        : this.tr(
            `Saltar ciclo no disponible (${skipCounter})`,
            `Skip cycle unavailable (${skipCounter})`,
          );
      this.ui.overlaySkipCycle.disabled = !showCycleSkip || !canUseSkip;
    }
    if (this.ui.overlayDevShop) {
      const canShowDevShop = showDevShop && this.isDevModeActive();
      this.ui.overlayDevShop.hidden = !canShowDevShop;
      this.ui.overlayDevShop.disabled = !canShowDevShop;
    }
    if (this.ui.overlayCredits) {
      this.ui.overlayCredits.hidden = !showCredits;
      this.ui.overlayCredits.disabled = !showCredits;
    }
    if (this.ui.overlayInstallPc) {
      const canShowPcInstall = showPcInstall;
      this.ui.overlayInstallPc.hidden = !canShowPcInstall;
      this.ui.overlayInstallPc.disabled = !canShowPcInstall;
      if (canShowPcInstall) {
        this.ui.overlayInstallPc.textContent = this.tr("Instalar en PC", "Install on PC");
      }
    }
    if (this.ui.worldPanel) this.ui.worldPanel.hidden = !showWorldSelect;
    this.overlayWorldSelectActive = showWorldSelect;
    if (this.ui.settingsToggle) {
      this.ui.settingsToggle.hidden = !showSettings;
      this.ui.settingsToggle.style.display = showSettings ? "inline-flex" : "none";
    }
    if (this.ui.settingsPanel) this.ui.settingsPanel.hidden = true;
    if (this.ui.alliesSettingsPanel) this.ui.alliesSettingsPanel.hidden = true;
    if (this.ui.settingsToggle) {
      this.ui.settingsToggle.textContent = this.tr("Configuracion", "Settings");
    }
    if (this.ui.alliesToggle) {
      this.ui.alliesToggle.hidden = !showAllies;
      this.ui.alliesToggle.style.display = showAllies ? "inline-flex" : "none";
      this.ui.alliesToggle.textContent = this.tr("Aliados", "Allies");
    }
    this.rebuildAlliesSettingsUi();
    this.updateWorldUi();
    this.updateInstallCta();
    this.hideShopWorld();
    this.updateMobileControlsVisibility();
  }

  hideOverlay() {
    if (this.phase === "shop") {
      return;
    }

    this.ui.overlay?.classList.remove("overlay--visible");
    this.ui.overlay?.classList.remove("overlay--allies");
    if (this.ui.settingsPanel) this.ui.settingsPanel.hidden = true;
    if (this.ui.alliesSettingsPanel) this.ui.alliesSettingsPanel.hidden = true;
    if (this.ui.settingsToggle) {
      this.ui.settingsToggle.textContent = this.tr("Configuracion", "Settings");
      this.ui.settingsToggle.hidden = false;
      this.ui.settingsToggle.style.display = "inline-flex";
    }
    if (this.ui.alliesToggle) {
      this.ui.alliesToggle.textContent = this.tr("Aliados", "Allies");
    }
    if (this.ui.overlayActions) this.ui.overlayActions.hidden = false;
    if (this.isTouchDevice) {
      const playablePhase = this.phase === "combat" || this.phase === "boss";
      if (!this.gameOver && playablePhase) {
        this.setMobileGameplayActive(true);
      } else {
        this.updateMobileControlsVisibility();
      }
    }
  }
}
