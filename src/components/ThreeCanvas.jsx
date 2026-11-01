import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Exact 3D Glossy Liquid Torus Knot from yannesidibe.com
 * Positioned in the center of the hero between the names
 */
export default function ThreeCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5.2;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Torus Knot Geometry & MeshPhysicalMaterial
    // Exact args from yannesidibe.com: [.8, .8, 100, 100], color: #121469
    const geometry = new THREE.TorusKnotGeometry(0.85, 0.75, 128, 32, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x181a7a,
      emissive: 0x07082e,
      roughness: 0.12,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transmission: 0.35,
      ior: 1.35,
      thickness: 3.5,
      specularIntensity: 1.2,
      specularColor: new THREE.Color(0xffffff),
    });

    const torusMesh = new THREE.Mesh(geometry, material);
    scene.add(torusMesh);

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa87cff, 3.0);
    dirLight2.position.set(-5, -3, 2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x6366f1, 4, 10);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // 5. Mouse Interaction & Inertia
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.4;
      mouse.targetY = y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia rotation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      torusMesh.rotation.x = elapsedTime * 0.28 + mouse.y * 0.8;
      torusMesh.rotation.y = elapsedTime * 0.35 + mouse.x * 0.8;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] pointer-events-none z-0 overflow-hidden"
    />
  );
}
