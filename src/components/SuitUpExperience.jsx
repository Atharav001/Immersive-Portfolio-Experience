import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const smooth = (value) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};

function makeSkinTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const context = canvas.getContext('2d');
  const gradient = context.createLinearGradient(0, 0, 256, 256);
  gradient.addColorStop(0, '#d8a17f');
  gradient.addColorStop(0.48, '#bb8065');
  gradient.addColorStop(1, '#8d5849');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 15000; i += 1) {
    const shade = Math.random() > 0.5 ? 255 : 50;
    context.fillStyle = `rgba(${shade},${shade * 0.82},${shade * 0.68},${Math.random() * 0.035})`;
    context.fillRect(Math.random() * 256, Math.random() * 256, 1.2, 1.2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeHand(skin, nail, geometries) {
  const hand = new THREE.Group();
  const palm = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 32), skin);
  palm.scale.set(0.77, 0.98, 0.34);
  palm.position.set(0, 0.02, 0);
  hand.add(palm);

  const addSegment = (from, to, radiusTop, radiusBottom) => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radiusTop, radiusBottom, length, 18, 1),
      skin,
    );
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    mesh.castShadow = true;
    hand.add(mesh);
    const joint = new THREE.Mesh(new THREE.SphereGeometry(radiusBottom * 1.02, 18, 16), skin);
    joint.position.copy(end);
    joint.castShadow = true;
    hand.add(joint);
    geometries.push(mesh.geometry, joint.geometry);
  };

  const fingerBases = [-0.55, -0.19, 0.19, 0.55];
  const lengths = [1.02, 1.27, 1.19, 1.00];
  const spreads = [-0.27, -0.10, 0.12, 0.28];
  fingerBases.forEach((x, finger) => {
    const length = lengths[finger];
    const baseY = 0.72 - Math.abs(x) * 0.08;
    const radii = [0.145, 0.122, 0.098, 0.075];
    for (let segment = 0; segment < 3; segment += 1) {
      const y0 = baseY + (length * segment) / 3;
      const y1 = baseY + (length * (segment + 1)) / 3;
      const x0 = x + spreads[finger] * (segment / 3) ** 2;
      const x1 = x + spreads[finger] * ((segment + 1) / 3) ** 2;
      addSegment([x0, y0, 0], [x1, y1, 0], radii[segment], radii[segment + 1]);
    }
    const tipX = x + spreads[finger];
    const tipY = baseY + length;
    const fingertip = new THREE.Mesh(new THREE.SphereGeometry(0.084, 18, 16), skin);
    fingertip.scale.set(0.9, 1.13, 0.83);
    fingertip.position.set(tipX, tipY, 0.005);
    hand.add(fingertip);
    const fingernail = new THREE.Mesh(new THREE.SphereGeometry(0.052, 20, 16), nail);
    fingernail.scale.set(0.78, 1.13, 0.28);
    fingernail.position.set(tipX, tipY - 0.012, 0.074);
    hand.add(fingernail);
    geometries.push(fingertip.geometry, fingernail.geometry);
  });

  // Thumb angles out from the palm with three natural, tapered segments.
  addSegment([-0.59, 0.03, 0.02], [-0.86, 0.34, 0.02], 0.19, 0.205);
  addSegment([-0.86, 0.34, 0.02], [-1.13, 0.63, 0.015], 0.145, 0.17);
  addSegment([-1.13, 0.63, 0.015], [-1.34, 0.87, 0.01], 0.105, 0.13);
  const thumbNail = new THREE.Mesh(new THREE.SphereGeometry(0.052, 20, 16), nail);
  thumbNail.scale.set(0.82, 1.15, 0.3);
  thumbNail.position.set(-1.34, 0.89, 0.07);
  hand.add(thumbNail);

  const wrist = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.52, 0.82, 32, 1), skin);
  wrist.position.set(0, -1.05, 0);
  wrist.castShadow = true;
  hand.add(wrist);
  geometries.push(palm.geometry, wrist.geometry, thumbNail.geometry);
  hand.traverse((child) => { if (child.isMesh) child.castShadow = true; });
  return hand;
}

function createScene(canvas) {
  const scene = new THREE.Scene();
  scene.background = null;
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.15, 10.4);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const world = new THREE.Group();
  scene.add(world);

  const skinTexture = makeSkinTexture();
  const skin = new THREE.MeshStandardMaterial({ map: skinTexture, bumpMap: skinTexture, bumpScale: 0.028, color: 0xe4b19a, roughness: 0.57, metalness: 0.02 });
  const nail = new THREE.MeshStandardMaterial({ color: 0xe1b8a8, roughness: 0.34 });
  const armorRed = new THREE.MeshPhysicalMaterial({ color: 0xa71919, metalness: 0.82, roughness: 0.24, clearcoat: 1, clearcoatRoughness: 0.1 });
  const armorGold = new THREE.MeshPhysicalMaterial({ color: 0xd6a638, metalness: 0.86, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.12 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x252a31, metalness: 0.88, roughness: 0.31 });
  const blueLight = new THREE.MeshBasicMaterial({ color: 0x72eaff, transparent: true, opacity: 0.8 });
  const geometries = [];
  const hand = new THREE.Group();
  const proceduralHand = makeHand(skin, nail, geometries);
  hand.add(proceduralHand);
  world.add(hand);

  const handLoader = new GLTFLoader();
  let loadedHand = null;
  handLoader.load('/models/posable-right-hand.glb', (gltf) => {
    loadedHand = gltf.scene;
    const originalBounds = new THREE.Box3().setFromObject(loadedHand);
    const originalSize = originalBounds.getSize(new THREE.Vector3());
    const originalCenter = originalBounds.getCenter(new THREE.Vector3());
    const scale = 3.9 / Math.max(originalSize.x, originalSize.y, originalSize.z);
    loadedHand.scale.setScalar(scale);
    loadedHand.position.set(-originalCenter.x * scale, -originalCenter.y * scale, -originalCenter.z * scale);
    loadedHand.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;
      // The library's baked preview material renders cyan in our dark scene.
      // Keep its anatomical mesh, and use the scene's warm procedural skin shader.
      child.material = skin;
    });
    const orientation = new THREE.Group();
    orientation.rotation.z = -Math.PI / 2;
    orientation.position.y = 0.45;
    orientation.add(loadedHand);
    hand.remove(proceduralHand);
    hand.add(orientation);
  }, undefined, (error) => {
    console.warn('Rigged hand model could not be loaded; using the procedural fallback.', error);
  });

  const armorParts = [];
  const addArmor = (name, size, target, material, order, bevel = 0.06) => {
    const group = new THREE.Group();
    const shell = new THREE.Mesh(new RoundedBoxGeometry(size[0], size[1], size[2], 4, bevel), material);
    shell.castShadow = true;
    shell.receiveShadow = true;
    group.add(shell);
    const seam = new THREE.Mesh(new RoundedBoxGeometry(size[0] * 0.68, size[1] * 0.045, size[2] * 1.02, 3, 0.018), armorGold);
    seam.position.z = size[2] * 0.53;
    group.add(seam);
    group.position.set(target[0] + (Math.random() > 0.5 ? 1 : -1) * (3.2 + Math.random() * 1.4), target[1] + 1.2 + Math.random() * 2, target[2] - 0.8);
    group.rotation.set((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
    hand.add(group);
    geometries.push(shell.geometry, seam.geometry);
    armorParts.push({ name, group, target: new THREE.Vector3(...target), start: group.position.clone(), startRotation: group.rotation.clone(), order });
    return group;
  };

  // First arrival is the palm repulsor, then the segmented finger shells, palm, and wrist.
  const repulsor = addArmor('repulsor', [0.46, 0.46, 0.13], [0, 0.25, 0.42], darkMetal, 0);
  const repulsorRing = new THREE.Mesh(new THREE.TorusGeometry(0.205, 0.027, 12, 48), armorGold);
  repulsorRing.position.set(0, 0, 0.1);
  repulsor.add(repulsorRing);
  const repulsorCore = new THREE.Mesh(new THREE.CircleGeometry(0.168, 48), blueLight);
  repulsorCore.position.set(0, 0, 0.105);
  repulsor.add(repulsorCore);
  const repulsorHaloMaterial = new THREE.MeshBasicMaterial({ color: 0x47ddff, transparent: true, opacity: 0.25, side: THREE.DoubleSide });
  const repulsorHalo = new THREE.Mesh(new THREE.CircleGeometry(0.34, 48), repulsorHaloMaterial);
  repulsorHalo.position.set(0, 0.25, 0.49);
  hand.add(repulsorHalo);
  geometries.push(repulsorRing.geometry, repulsorCore.geometry, repulsorHalo.geometry);

  const fingers = [
    { x: -0.53, tip: -0.80, base: 0.77, length: 1.02, width: 0.235 },
    { x: -0.19, tip: -0.29, base: 0.77, length: 1.27, width: 0.25 },
    { x: 0.19, tip: 0.31, base: 0.75, length: 1.19, width: 0.245 },
    { x: 0.53, tip: 0.81, base: 0.72, length: 1.00, width: 0.23 },
  ];
  fingers.forEach((finger, index) => {
    for (let segment = 0; segment < 3; segment += 1) {
      const y = finger.base + (finger.length * (segment + 0.5)) / 3;
      const x = finger.x + (finger.tip - finger.x) * ((segment + 0.5) / 3) ** 2;
      addArmor(`finger-${index}-${segment}`, [finger.width * (1 - segment * 0.12), finger.length / 3.15, 0.12], [x, y, 0.16], segment === 1 ? armorGold : armorRed, 1 + index * 0.42 + segment * 0.12, 0.035);
    }
  });
  addArmor('thumb-shell', [0.24, 0.44, 0.12], [-0.99, 0.47, 0.19], armorRed, 2.1, 0.04);
  addArmor('palm-shell', [1.22, 0.95, 0.19], [0, -0.02, 0.30], armorRed, 2.55, 0.1);
  addArmor('wrist-cuff', [0.97, 0.53, 0.26], [0, -0.97, 0.27], armorGold, 2.9, 0.09);
  addArmor('forearm-guard', [0.86, 0.82, 0.22], [0, -1.62, 0.23], armorRed, 3.2, 0.08);

  const ambient = new THREE.HemisphereLight(0xced7ff, 0x211014, 1.15);
  scene.add(ambient);
  const key = new THREE.SpotLight(0xffe7c2, 180, 30, Math.PI / 5, 0.48, 1.2);
  key.position.set(4.5, 5.8, 7);
  key.target = world;
  key.castShadow = true;
  scene.add(key, key.target);
  const cool = new THREE.SpotLight(0x48cfff, 120, 25, Math.PI / 4, 0.55, 1.4);
  cool.position.set(-4.2, 0.5, 4.5);
  cool.target = world;
  scene.add(cool, cool.target);
  const rim = new THREE.PointLight(0xf34427, 70, 16);
  rim.position.set(0, 2.8, -3);
  scene.add(rim);
  const repulsorLight = new THREE.PointLight(0x4cdfff, 0, 5);
  repulsorLight.position.set(0, 0.25, 0.85);
  scene.add(repulsorLight);

  const count = window.innerWidth < 700 ? 380 : 720;
  const positions = new Float32Array(count * 3);
  const basePositions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const radius = 2.1 + Math.random() * 3.8;
    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = (Math.random() - 0.5) * 6.8;
    const z = (Math.random() - 0.5) * 3.2;
    basePositions.set([x, y, z], i * 3);
    positions.set([x, y, z], i * 3);
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0xb8d7dc, size: 0.026, transparent: true, opacity: 0.62, depthWrite: false, sizeAttenuation: true }));
  scene.add(particles);
  geometries.push(particleGeometry);

  const pointer = new THREE.Vector2(0, 0);
  const pointerWorld = new THREE.Vector3();
  const targetProgress = { value: 0 };
  let currentProgress = 0;
  const resize = () => {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.position.z = width < 700 ? 14.5 : 10.4;
    hand.position.x = width < 700 ? 0.1 : 0;
    hand.position.y = width < 700 ? -0.28 : 0;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };
  const updateScroll = () => {
    const rect = canvas.parentElement.parentElement.getBoundingClientRect();
    const range = Math.max(1, rect.height - window.innerHeight);
    targetProgress.value = clamp01(-rect.top / range);
  };
  const onPointerMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  resize();
  updateScroll();

  let raf = 0;
  let isInView = false;
  const clock = new THREE.Clock();
  const render = () => {
    if (!isInView) return;
    raf = requestAnimationFrame(render);
    const time = clock.getElapsedTime();
    currentProgress += (targetProgress.value - currentProgress) * 0.075;
    const p = currentProgress;
    hand.rotation.y = Math.sin(time * 0.34) * 0.12 + pointer.x * 0.13 + p * Math.PI;
    hand.rotation.x = Math.sin(time * 0.26) * 0.035 + pointer.y * 0.055;
    hand.rotation.z = Math.sin(time * 0.18) * 0.025;
    hand.position.y = Math.sin(time * 0.8) * 0.045;
    world.rotation.y = pointer.x * 0.045;

    let connectionGlow = 0;
    armorParts.forEach((part) => {
      const arrival = smooth((p - (0.12 + part.order * 0.205)) / 0.2);
      const arc = Math.sin(arrival * Math.PI) * 0.34;
      const impact = smooth((arrival - 0.88) / 0.06) * (1 - smooth((arrival - 0.97) / 0.03));
      connectionGlow = Math.max(connectionGlow, impact);
      part.group.position.lerpVectors(part.start, part.target, arrival);
      part.group.position.z += arc;
      part.group.rotation.set(
        THREE.MathUtils.lerp(part.startRotation.x, 0, arrival),
        THREE.MathUtils.lerp(part.startRotation.y, 0, arrival),
        THREE.MathUtils.lerp(part.startRotation.z, 0, arrival),
      );
      part.group.scale.setScalar(0.78 + arrival * 0.22);
    });

    const repulsorProgress = smooth((p - 0.09) / 0.18);
    const pulse = 0.72 + Math.sin(time * 4.2) * 0.18;
    repulsor.visible = p > 0.04;
    repulsor.scale.setScalar(0.65 + repulsorProgress * 0.35);
    repulsorCore.material.opacity = 0.3 + repulsorProgress * 0.7;
    repulsorCore.scale.setScalar(pulse);
    repulsorHalo.visible = repulsorProgress > 0.1;
    repulsorHalo.material.opacity = Math.max(0, (0.12 + Math.sin(time * 3) * 0.08) * repulsorProgress);
    repulsorHalo.scale.setScalar(1 + Math.sin(time * 3.2) * 0.08);
    repulsorLight.intensity = repulsorProgress * (24 + Math.sin(time * 4) * 4);
    key.intensity = 120 + Math.sin(time * 0.75) * 26 + p * 25 + connectionGlow * 55;
    cool.intensity = 62 + p * 55 + Math.sin(time * 0.9 + 1) * 15 + connectionGlow * 28;
    rim.intensity = 24 + p * 72 + connectionGlow * 40;

    pointerWorld.set(pointer.x, pointer.y, 0.1).unproject(camera);
    const attribute = particleGeometry.attributes.position;
    for (let i = 0; i < count; i += 1) {
      const index = i * 3;
      const x = basePositions[index];
      const y = basePositions[index + 1];
      const z = basePositions[index + 2];
      const dx = x - pointerWorld.x;
      const dy = y - pointerWorld.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const force = distance < 1.15 ? (1 - distance / 1.15) * 0.34 : 0;
      attribute.array[index] = x + (distance ? (dx / distance) * force : 0) + Math.sin(time * 0.45 + i) * 0.025;
      attribute.array[index + 1] = y + (distance ? (dy / distance) * force : 0) + Math.cos(time * 0.35 + i * 0.7) * 0.03;
      attribute.array[index + 2] = z + Math.sin(time * 0.3 + i * 1.2) * 0.04;
    }
    attribute.needsUpdate = true;
    renderer.render(scene, camera);
  };
  const observer = new IntersectionObserver(([entry]) => {
    isInView = entry.isIntersecting;
    cancelAnimationFrame(raf);
    if (isInView) render();
  }, { threshold: 0 });
  observer.observe(canvas.closest('.suitup-story'));

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    window.removeEventListener('resize', resize);
    window.removeEventListener('scroll', updateScroll);
    window.removeEventListener('pointermove', onPointerMove);
    geometries.forEach((geometry) => geometry.dispose());
    [skin, nail, armorRed, armorGold, darkMetal, blueLight, repulsorHaloMaterial, particles.material].forEach((material) => material.dispose());
    skinTexture.dispose();
    if (loadedHand) {
      loadedHand.traverse((child) => {
        if (!child.isMesh) return;
        child.geometry?.dispose();
        (Array.isArray(child.material) ? child.material : [child.material]).forEach((material) => material.dispose());
      });
    }
    renderer.dispose();
  };
}

export default function SuitUpExperience() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return undefined;
    return createScene(canvasRef.current);
  }, []);

  return (
    <section className="suitup-story" aria-label="A hand suits up with a futuristic armored gauntlet">
      <div className="suitup-sticky">
        <div className="suitup-atmosphere" />
        <canvas ref={canvasRef} className="suitup-canvas" aria-hidden="true" />
        <div className="suitup-copy">
          <p className="suitup-eyebrow">THE MAKING OF ME · 01</p>
          <h2>Built by what<br />I put my hands to.</h2>
          <p className="suitup-caption">Curiosity becomes craft. One piece at a time.</p>
        </div>
        <div className="suitup-instruction">SCROLL TO SUIT UP <span>↓</span></div>
        <div className="suitup-side-note">A PERSONAL ORIGIN STORY<br />01 — BENGALURU, INDIA</div>
      </div>
    </section>
  );
}
