import { useEffect } from 'react';
import { CanvasTexture, Color, LinearFilter, Mesh, NoToneMapping, OrthographicCamera, PlaneGeometry, RGBAFormat, Scene, ShaderMaterial, SRGBColorSpace, TextureLoader, UnsignedByteType, Vector2, WebGLRenderTarget, WebGLRenderer } from 'three';

const trailVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const trailFragment = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uPrevious;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform vec2 uPreviousPointer;
  uniform float uDecay;
  uniform float uRadius;
  uniform float uStrength;
  uniform float uStamp;
  void main() {
    vec4 previous = texture2D(uPrevious, vUv);
    float intensity = previous.b * uDecay;
    vec2 flow = (previous.rg * 2.0 - 1.0) * uDecay;
    vec2 pixel = vUv * uResolution;
    vec2 start = uPreviousPointer * uResolution;
    vec2 finish = uPointer * uResolution;
    vec2 segment = finish - start;
    float lengthSquared = max(dot(segment, segment), 0.0001);
    float along = clamp(dot(pixel - start, segment) / lengthSquared, 0.0, 1.0);
    float distanceToPath = length(pixel - (start + along * segment));
    float stamp = exp(-(distanceToPath * distanceToPath) / (2.0 * uRadius * uRadius)) * uStrength * uStamp;
    vec2 direction = normalize(segment + vec2(0.0001, 0.0001));
    flow += direction * stamp;
    intensity = max(intensity, stamp);
    flow = clamp(flow, vec2(-1.0), vec2(1.0));
    gl_FragColor = vec4(flow * 0.5 + 0.5, intensity, 1.0);
  }
`;

const contentVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const contentFragment = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uContent;
  uniform sampler2D uTrail;
  uniform vec2 uResolution;
  uniform vec2 uUvScale;
  uniform float uOpacity;
  uniform float uIsImage;
  uniform float uTime;
  uniform float uSeed;
  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  void main() {
    vec2 screenUv = gl_FragCoord.xy / uResolution;
    vec4 trail = texture2D(uTrail, screenUv);
    float strength = clamp(trail.b * 1.35, 0.0, 1.0);
    vec2 flow = trail.rg * 2.0 - 1.0;
    vec2 direction = normalize(flow + vec2(0.00001, 0.00001));
    vec2 baseUv = (vUv - 0.5) * uUvScale + 0.5;
    float irregularity = mix(0.72, 1.28, hash21(floor(vUv * vec2(11.0, 8.0)) + uSeed));
    float edgeGrip = smoothstep(0.0, 0.18, baseUv.x) * smoothstep(1.0, 0.82, baseUv.x);
    vec2 drag = direction * strength * irregularity * edgeGrip * (uIsImage > 0.5 ? 0.075 : 0.16);
    vec2 draggedUv = baseUv - drag;
    vec4 crisp = texture2D(uContent, baseUv);
    vec4 smeared = texture2D(uContent, draggedUv);
    vec4 color = mix(crisp, smeared, strength);
    color.a *= uOpacity;
    gl_FragColor = color;
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function makeTextTexture(element) {
  const rect = element.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const style = getComputedStyle(element);
  const fontSize = Number.parseFloat(style.fontSize) || rect.height;
  const paddingX = Math.max(10, fontSize * 0.14);
  const paddingY = Math.max(8, fontSize * 0.1);
  const drawWidth = rect.width + paddingX * 2;
  const drawHeight = rect.height + paddingY * 2;
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.ceil(drawWidth * dpr));
  canvas.height = Math.max(1, Math.ceil(drawHeight * dpr));
  const context = canvas.getContext('2d');
  if (!context) return null;
  context.scale(dpr, dpr);
  context.font = style.font;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = style.color;
  if ('letterSpacing' in context) context.letterSpacing = style.letterSpacing;
  context.fillText(element.textContent.trim(), drawWidth / 2, drawHeight / 2, rect.width + paddingX);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  return { texture, paddingX, paddingY };
}

export default function FluidDisplacementEffect() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let renderer;
    let canvas;
    let raf = 0;
    let activeUntil = 0;
    let stampPending = false;
    let lastEventTime = 0;
    let hasPointer = false;
    let previous = new Vector2(0.5, 0.5);
    let pointer = new Vector2(0.5, 0.5);
    let strength = 0.35;
    let ready = false;
    const entries = new Map();
    const savedVisibility = new Map();
    const pendingImageLoads = new Map();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    const trailScene = new Scene();
    let trailMaterial;
    let trailPlane;
    let contentScene;
    let contentGeometry;
    let targets = [];
    let readTarget;
    let writeTarget;
    const resolution = new Vector2(1, 1);
    const loader = new TextureLoader();
    loader.setCrossOrigin('anonymous');

    const renderTrailPass = () => {
      trailMaterial.uniforms.uPrevious.value = readTarget.texture;
      trailMaterial.uniforms.uResolution.value.copy(resolution);
      trailMaterial.uniforms.uPointer.value.copy(pointer);
      trailMaterial.uniforms.uPreviousPointer.value.copy(previous);
      trailMaterial.uniforms.uStrength.value = strength;
      trailMaterial.uniforms.uStamp.value = stampPending ? 1 : 0;
      renderer.setRenderTarget(writeTarget);
      renderer.render(trailScene, camera);
      renderer.setRenderTarget(null);
      const oldRead = readTarget;
      readTarget = writeTarget;
      writeTarget = oldRead;
      stampPending = false;
      previous.copy(pointer);
    };

    const setMeshRect = (entry) => {
      const rect = entry.element.getBoundingClientRect();
      const paddingX = entry.paddingX || 0;
      const paddingY = entry.paddingY || 0;
      const drawRect = {
        left: rect.left - paddingX,
        top: rect.top - paddingY,
        width: rect.width + paddingX * 2,
        height: rect.height + paddingY * 2,
      };
      const width = window.innerWidth;
      const height = window.innerHeight;
      const visible = rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < height && rect.right > 0 && rect.left < width;
      entry.mesh.visible = visible;
      if (!visible) return;
      entry.mesh.position.set(
        2 * (drawRect.left + drawRect.width / 2 + entry.offset.x) / width - 1,
        1 - 2 * (drawRect.top + drawRect.height / 2 + entry.offset.y) / height,
        0,
      );
      entry.mesh.scale.set(drawRect.width / width, drawRect.height / height, 1);
      entry.material.uniforms.uOpacity.value = entry.kind === 'image' ? Number.parseFloat(getComputedStyle(entry.element).opacity) || 1 : 1;
    };

    const schedule = (duration = 1600) => {
      activeUntil = Math.max(activeUntil, performance.now() + duration);
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const draw = (now) => {
      raf = 0;
      if (!ready) return;
      renderTrailPass();
      contentScene.children.forEach((mesh, index) => {
        const entry = targets[index];
        if (entry) {
          if (entry.kind === 'text') {
            entry.velocity.x += -entry.offset.x * 0.065;
            entry.velocity.y += -entry.offset.y * 0.065;
            entry.velocity.multiplyScalar(0.78);
            entry.offset.add(entry.velocity);
            if (entry.offset.lengthSq() < 0.004 && entry.velocity.lengthSq() < 0.004) {
              entry.offset.set(0, 0);
              entry.velocity.set(0, 0);
            }
          }
          setMeshRect(entry);
          entry.material.uniforms.uTrail.value = readTarget.texture;
          entry.material.uniforms.uResolution.value.copy(resolution);
          entry.material.uniforms.uTime.value = now * 0.001;
        }
      });
      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(contentScene, camera);
      if (now < activeUntil) raf = requestAnimationFrame(draw);
    };

    const makeEntry = (element, kind, source) => {
      const texture = source.texture || source;
      if (!ready) { texture.dispose(); return; }
      const rect = element.getBoundingClientRect();
      const material = new ShaderMaterial({
        uniforms: {
          uContent: { value: texture },
          uTrail: { value: readTarget.texture },
          uResolution: { value: resolution.clone() },
          uUvScale: { value: new Vector2(1, 1) },
          uOpacity: { value: kind === 'image' ? Number.parseFloat(getComputedStyle(element).opacity) || 1 : 1 },
          uIsImage: { value: kind === 'image' ? 1 : 0 },
          uTime: { value: 0 },
          uSeed: { value: Math.random() * 100 },
        },
        vertexShader: contentVertex,
        fragmentShader: contentFragment,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      });
      if (kind === 'image') {
        const planeRatio = rect.width / Math.max(rect.height, 1);
        const imageRatio = element.naturalWidth / Math.max(element.naturalHeight, 1);
        if (imageRatio > planeRatio) material.uniforms.uUvScale.value.x = planeRatio / imageRatio;
        else material.uniforms.uUvScale.value.y = imageRatio / planeRatio;
        if (!savedVisibility.has(element)) savedVisibility.set(element, element.style.visibility);
        element.style.visibility = 'hidden';
      } else {
        if (!savedVisibility.has(element)) savedVisibility.set(element, element.style.visibility);
        element.style.visibility = 'hidden';
      }
      const mesh = new Mesh(contentGeometry, material);
      mesh.renderOrder = targets.length + 1;
      contentScene.add(mesh);
      const entry = {
        element, kind, texture, material, mesh,
        paddingX: source.paddingX || 0,
        paddingY: source.paddingY || 0,
        offset: new Vector2(),
        velocity: new Vector2(),
        magnetism: 0.78 + Math.random() * 0.5,
      };
      targets.push(entry);
      entries.set(element, entry);
      schedule(100);
    };

    const loadImageTarget = (element) => {
      if (!ready || entries.has(element) || element.dataset.fluidLoading) return;
      element.dataset.fluidLoading = 'true';
      loader.load(element.currentSrc || element.src, (texture) => {
        element.removeAttribute('data-fluid-loading');
        texture.colorSpace = SRGBColorSpace;
        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;
        makeEntry(element, 'image', texture);
      }, undefined, () => element.removeAttribute('data-fluid-loading'));
    };

    const syncTargets = () => {
      if (!ready) return;
      const elements = [
        ...document.querySelectorAll('.wordmark-base [data-fluid-text]'),
        ...document.querySelectorAll('img[data-fluid-image]'),
      ];
      elements.forEach((element) => {
        if (entries.has(element) || element.dataset.fluidLoading) return;
        if (element.matches('[data-fluid-text]')) {
          const texture = makeTextTexture(element);
          if (texture) makeEntry(element, 'text', texture);
        } else {
          if (element.complete && element.naturalWidth) loadImageTarget(element);
          else if (!pendingImageLoads.has(element)) {
            const onLoad = () => {
              pendingImageLoads.delete(element);
              loadImageTarget(element);
            };
            pendingImageLoads.set(element, onLoad);
            element.addEventListener('load', onLoad, { once: true });
          }
        }
      });
      targets.forEach((entry, index) => { entry.mesh.renderOrder = index + 1; });
      schedule(100);
    };

    const resize = () => {
      if (!renderer || !ready) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.getDrawingBufferSize(resolution);
      readTarget.setSize(resolution.x, resolution.y);
      writeTarget.setSize(resolution.x, resolution.y);
      trailMaterial.uniforms.uResolution.value.copy(resolution);
      syncTargets();
      schedule(100);
    };

    const onPointerMove = (event) => {
      const next = new Vector2(event.clientX / Math.max(innerWidth, 1), 1 - event.clientY / Math.max(innerHeight, 1));
      if (!hasPointer) {
        pointer.copy(next);
        previous.copy(next);
        hasPointer = true;
        strength = 0.28;
        stampPending = true;
        schedule(1700);
        return;
      }
      const dx = event.clientX - pointer.x * innerWidth;
      const dy = event.clientY - (1 - pointer.y) * innerHeight;
      const elapsed = Math.max(8, performance.now() - lastEventTime);
      const speed = Math.hypot(dx, dy) / elapsed;
      lastEventTime = performance.now();
      previous.copy(pointer);
      pointer.copy(next);
      strength = Math.min(0.92, 0.18 + speed * 0.42);
      targets.forEach((entry) => {
        if (entry.kind !== 'text') return;
        const rect = entry.element.getBoundingClientRect();
        const nearestX = Math.max(rect.left, Math.min(event.clientX, rect.right));
        const nearestY = Math.max(rect.top, Math.min(event.clientY, rect.bottom));
        const distance = Math.hypot(event.clientX - nearestX, event.clientY - nearestY);
        const influence = Math.exp(-(distance * distance) / (2 * 74 * 74));
        if (influence < 0.025) return;
        const randomPull = 0.82 + Math.sin(entry.material.uniforms.uSeed.value * 12.7 + event.clientX * 0.013) * 0.18;
        entry.velocity.x += dx * influence * entry.magnetism * randomPull * 0.34;
        entry.velocity.y += dy * influence * entry.magnetism * randomPull * 0.34;
        const length = entry.offset.length();
        if (length > 72) entry.offset.multiplyScalar(72 / length);
      });
      stampPending = true;
      schedule(2200);
    };

    const onScroll = () => schedule(100);

    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance', premultipliedAlpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = SRGBColorSpace;
      renderer.toneMapping = NoToneMapping;
      canvas = renderer.domElement;
      canvas.className = 'fluid-displacement-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      document.body.appendChild(canvas);

      renderer.getDrawingBufferSize(resolution);
      const targetOptions = { minFilter: LinearFilter, magFilter: LinearFilter, format: RGBAFormat, type: UnsignedByteType, depthBuffer: false, stencilBuffer: false };
      readTarget = new WebGLRenderTarget(resolution.x, resolution.y, targetOptions);
      writeTarget = new WebGLRenderTarget(resolution.x, resolution.y, targetOptions);
      renderer.setRenderTarget(readTarget);
      renderer.setClearColor(new Color(0.5, 0.5, 0), 0);
      renderer.clear(true, true, true);
      renderer.setRenderTarget(writeTarget);
      renderer.clear(true, true, true);
      renderer.setRenderTarget(null);
      renderer.setClearColor(0x000000, 0);
      trailMaterial = new ShaderMaterial({
        uniforms: {
          uPrevious: { value: readTarget.texture }, uResolution: { value: resolution.clone() },
          uPointer: { value: pointer.clone() }, uPreviousPointer: { value: previous.clone() },
          uDecay: { value: 0.943 }, uRadius: { value: 38 }, uStrength: { value: strength }, uStamp: { value: 0 },
        },
        vertexShader: trailVertex, fragmentShader: trailFragment, depthTest: false, depthWrite: false, toneMapped: false,
      });
      trailPlane = new Mesh(new PlaneGeometry(2, 2), trailMaterial);
      trailScene.add(trailPlane);
      contentScene = new Scene();
      contentGeometry = new PlaneGeometry(2, 2);
      ready = true;
      const init = () => { if (ready) { syncTargets(); schedule(100); } };
      if (document.fonts?.ready) document.fonts.ready.then(init);
      else init();
      window.addEventListener('resize', resize, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      const observer = new MutationObserver(() => syncTargets());
      observer.observe(document.body, { childList: true, subtree: true });

      const cleanup = () => {
        ready = false;
        observer.disconnect();
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('pointermove', onPointerMove);
        cancelAnimationFrame(raf);
        pendingImageLoads.forEach((onLoad, element) => element.removeEventListener('load', onLoad));
        savedVisibility.forEach((visibility, element) => { element.style.visibility = visibility; });
        targets.forEach((entry) => { entry.material.dispose(); entry.texture.dispose(); });
        contentGeometry?.dispose();
        trailPlane?.geometry.dispose();
        trailMaterial?.dispose();
        readTarget?.dispose();
        writeTarget?.dispose();
        renderer?.dispose();
        canvas?.remove();
      };
      window.__fluidDisplacementCleanup = cleanup;
    } catch (error) {
      ready = false;
      canvas?.remove();
      savedVisibility.forEach((visibility, element) => { element.style.visibility = visibility; });
      renderer?.dispose();
      console.warn('WebGL fluid displacement is unavailable; using the undistorted page.', error);
    }

    return () => {
      if (window.__fluidDisplacementCleanup) {
        const cleanup = window.__fluidDisplacementCleanup;
        delete window.__fluidDisplacementCleanup;
        cleanup();
      }
    };
  }, []);

  return null;
}
