/* ============================================================
   Three.js scenes (vanilla THREE r128, global THREE)
   window.Scenes = { nodeNetwork, shield, globe }
   each: (canvas) => cleanup()
   ============================================================ */
(function () {
  const ACCENT = 0x1fb573;
  const ACCENT2 = 0x34d98a;
  const BLUE = 0x2f6dff;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function makeRenderer(canvas) {
    const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    return r;
  }
  function sizeOf(canvas) {
    const p = canvas.parentElement;
    return { w: p.clientWidth || window.innerWidth, h: p.clientHeight || window.innerHeight };
  }
  function rafResize(fn) { let q = false; return () => { if (q) return; q = true; requestAnimationFrame(() => { q = false; fn(); }); }; }

  function runLoop(canvas, frame) {
    let raf = 0, visible = true, running = true;
    const tick = (t) => { if (!running) return; raf = requestAnimationFrame(tick); if (visible) frame(t); };
    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { threshold: 0.01 });
    io.observe(canvas);
    raf = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(raf); io.disconnect(); };
  }

  function makeDot() {
    const c = document.createElement("canvas"); c.width = c.height = 64;
    const x = c.getContext("2d");
    const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.3, "rgba(255,255,255,0.85)"); g.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = g; x.beginPath(); x.arc(32, 32, 32, 0, Math.PI * 2); x.fill();
    return new THREE.CanvasTexture(c);
  }

  // uniform random unit-vector (Vector3.randomDirection polyfill for r128)
  function randDir(v) {
    const z = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, r = Math.sqrt(1 - z * z);
    return v.set(r * Math.cos(th), r * Math.sin(th), z);
  }

  /* ============================================================
     1) HERO GALAXY — additive point-cloud, brand green -> blue
        (replaces the old node-network lines)
     ============================================================ */
  function nodeNetwork(canvas) {
    const renderer = makeRenderer(canvas);
    const scene = new THREE.Scene();
    let { w, h } = sizeOf(canvas);
    const camera = new THREE.PerspectiveCamera(60, w / h, 1, 1000);
    camera.position.set(0, 4, 21);
    renderer.setSize(w, h, false);

    const gu = { time: { value: 0 } };
    const sizes = [], shift = [];
    const pushShift = () => { shift.push(Math.random() * Math.PI, Math.random() * Math.PI * 2, (Math.random() * 0.9 + 0.1) * Math.PI * 0.1, Math.random() * 0.9 + 0.1); };

    const small = window.innerWidth < 720;
    const INNER = small ? 11000 : 30000;
    const OUTER = small ? 22000 : 70000;
    const pts = [];
    for (let i = 0; i < INNER; i++) { sizes.push(Math.random() * 1.5 + 0.5); pushShift(); pts.push(randDir(new THREE.Vector3()).multiplyScalar(Math.random() * 0.5 + 9.5)); }
    for (let i = 0; i < OUTER; i++) {
      const r = 10, R = 40, rand = Math.pow(Math.random(), 1.5);
      const radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
      pts.push(new THREE.Vector3().setFromCylindricalCoords(radius, Math.random() * 2 * Math.PI, (Math.random() - 0.5) * 2));
      sizes.push(Math.random() * 1.5 + 0.5); pushShift();
    }

    const g = new THREE.BufferGeometry().setFromPoints(pts);
    g.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1));
    g.setAttribute("shift", new THREE.Float32BufferAttribute(shift, 4));
    const m = new THREE.PointsMaterial({ size: 0.125, transparent: true, depthTest: false, blending: THREE.AdditiveBlending });
    m.onBeforeCompile = (shader) => {
      shader.uniforms.time = gu.time;
      shader.vertexShader = `
        uniform float time;
        attribute float sizes;
        attribute vec4 shift;
        varying vec3 vColor;
        ${shader.vertexShader}
      `.replace(
        `gl_PointSize = size;`,
        `gl_PointSize = size * sizes;`
      ).replace(
        `#include <color_vertex>`,
        `#include <color_vertex>
          float d = length(abs(position) / vec3(40., 10., 40.));
          d = clamp(d, 0., 1.);
          vColor = mix(vec3(31., 181., 115.), vec3(47., 109., 255.), d) / 255.;
        `
      ).replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>
          float t = time;
          float moveT = mod(shift.x + shift.z * t, PI2);
          float moveS = mod(shift.y + shift.z * t, PI2);
          transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
        `
      );
      shader.fragmentShader = `
        varying vec3 vColor;
        ${shader.fragmentShader}
      `.replace(
        `#include <clipping_planes_fragment>`,
        `#include <clipping_planes_fragment>
          float d = length(gl_PointCoord.xy - 0.5);
        `
      ).replace(
        `vec4 diffuseColor = vec4( diffuse, opacity );`,
        `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d) );`
      );
    };
    const p = new THREE.Points(g, m);
    p.rotation.order = "ZYX";
    p.rotation.z = 0.2;
    scene.add(p);

    const target = new THREE.Vector2(0, 0);
    function onMove(e) { const r = canvas.getBoundingClientRect(); target.set(((e.clientX - r.left) / r.width - 0.5), ((e.clientY - r.top) / r.height - 0.5)); }
    window.addEventListener("pointermove", onMove, { passive: true });

    const clock = new THREE.Clock();
    function frame() {
      const t = clock.getElapsedTime() * 0.5;
      gu.time.value = t * Math.PI;
      p.rotation.y = t * 0.05;
      camera.position.x += (target.x * 6 - camera.position.x) * 0.03;
      camera.position.y += (4 - target.y * 4 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }

    const onResize = () => { const sz = sizeOf(canvas); w = sz.w; h = sz.h; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false); };
    const ro = new ResizeObserver(rafResize(onResize)); ro.observe(canvas.parentElement);
    const stop = reduce ? (frame(), () => {}) : runLoop(canvas, frame);
    return () => { stop(); ro.disconnect(); window.removeEventListener("pointermove", onMove); renderer.dispose(); g.dispose(); m.dispose(); };
  }

  /* ============================================================
     2) SHIELD — layered force-field with vertical scan sweep
     ============================================================ */
  function shield(canvas) {
    const renderer = makeRenderer(canvas);
    const scene = new THREE.Scene();
    let { w, h } = sizeOf(canvas);
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 7.4;
    renderer.setSize(w, h, false);

    const group = new THREE.Group();
    scene.add(group);

    // particle shell
    const N = window.innerWidth < 720 ? 1200 : 2400;
    const pos = new Float32Array(N * 3); const R = 2.5;
    for (let i = 0; i < N; i++) {
      const u = Math.random(), v = Math.random();
      const th = 2*Math.PI*u, ph = Math.acos(2*v-1);
      const r = R * (0.96 + Math.random()*0.08);
      pos[i*3]=r*Math.sin(ph)*Math.cos(th); pos[i*3+1]=r*Math.sin(ph)*Math.sin(th); pos[i*3+2]=r*Math.cos(ph);
    }
    const sprite = makeDot();
    const pGeo = new THREE.BufferGeometry(); pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.055, map: sprite, color: ACCENT2, transparent: true, opacity: 0.92, depthWrite: false, blending: THREE.AdditiveBlending }));
    group.add(pts);

    // outer + inner counter-rotating wireframes
    const outer = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.66, 1)), new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.30, blending: THREE.AdditiveBlending }));
    group.add(outer);
    const inner = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.0, 0)), new THREE.LineBasicMaterial({ color: ACCENT2, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending }));
    group.add(inner);

    // glowing core
    const core = new THREE.Mesh(new THREE.SphereGeometry(1.0, 32, 32), new THREE.MeshBasicMaterial({ color: ACCENT2, transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending }));
    group.add(core);
    const coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: sprite, color: ACCENT2, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
    coreGlow.scale.set(3.4, 3.4, 1); group.add(coreGlow);

    // equator ring + vertical scan ring
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.012, 8, 120), new THREE.MeshBasicMaterial({ color: ACCENT2, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending }));
    ring.rotation.x = Math.PI / 2; group.add(ring);
    const scan = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.02, 8, 120), new THREE.MeshBasicMaterial({ color: 0xeafff4, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending }));
    scan.rotation.x = Math.PI / 2; group.add(scan);

    // orbiting satellites
    const sats = [];
    for (let i = 0; i < 3; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: sprite, color: ACCENT2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false }));
      s.scale.set(0.28, 0.28, 1); group.add(s);
      sats.push({ s, r: 2.9 + i*0.18, sp: 0.7 + i*0.4, ph: i*2.1, tilt: i*0.9 });
    }

    const tilt = new THREE.Vector2(0, 0);
    function onMove(e) { const r = canvas.getBoundingClientRect(); tilt.set(((e.clientX-r.left)/r.width-0.5)*0.8, ((e.clientY-r.top)/r.height-0.5)*0.8); }
    window.addEventListener("pointermove", onMove, { passive: true });

    let tt = 0;
    function frame() {
      tt += 0.016;
      group.rotation.y += 0.0035;
      group.rotation.x += (tilt.y*0.5 - group.rotation.x)*0.04;
      group.rotation.z = Math.sin(tt*0.3)*0.05;
      outer.rotation.y -= 0.003; outer.rotation.x += 0.0012;
      inner.rotation.y += 0.006; inner.rotation.z -= 0.004;
      ring.rotation.z += 0.02;
      const yy = Math.sin(tt*0.9) * R;
      scan.position.y = yy;
      const rad = Math.sqrt(Math.max(0.0001, R*R - yy*yy));
      scan.scale.set(rad/2.5, rad/2.5, 1);
      scan.material.opacity = 0.35 + (1 - Math.abs(yy)/R)*0.6;
      const pulse = 0.12 + Math.sin(tt*1.8)*0.05;
      core.material.opacity = pulse; coreGlow.material.opacity = 0.4 + Math.sin(tt*1.8)*0.18;
      sats.forEach((o) => { const a = tt*o.sp + o.ph; o.s.position.set(Math.cos(a)*o.r, Math.sin(a*0.8)*o.r*0.4, Math.sin(a)*o.r); });
      camera.position.x += (tilt.x*1.2 - camera.position.x)*0.04; camera.lookAt(0,0,0);
      renderer.render(scene, camera);
    }

    const onResize = () => { const sz = sizeOf(canvas); w = sz.w; h = sz.h; camera.aspect = w/h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false); };
    const ro = new ResizeObserver(rafResize(onResize)); ro.observe(canvas.parentElement);
    const stop = reduce ? (frame(), () => {}) : runLoop(canvas, frame);
    return () => { stop(); ro.disconnect(); window.removeEventListener("pointermove", onMove); renderer.dispose(); pGeo.dispose(); sprite.dispose(); };
  }

  /* ============================================================
     3) GLOBE — sized to fit, glowing halo, traveling arc pulses
     ============================================================ */
  function globe(canvas) {
    const renderer = makeRenderer(canvas);
    const scene = new THREE.Scene();
    let { w, h } = sizeOf(canvas);
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 9.2;
    renderer.setSize(w, h, false);

    const sprite = makeDot();

    // soft halo behind globe
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: sprite, color: BLUE, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.scale.set(8.5, 8.5, 1); halo.position.z = -1.5; scene.add(halo);

    const group = new THREE.Group();
    group.rotation.z = 0.35;
    scene.add(group);

    const R = 2.3;
    // graticule dots
    const dotPos = []; const rings = 32;
    for (let i = 1; i < rings; i++) {
      const ph = Math.PI * (i / rings); const rad = Math.sin(ph)*R; const yy = Math.cos(ph)*R;
      const segs = Math.max(6, Math.round(Math.sin(ph)*54));
      for (let j = 0; j < segs; j++) { const th = (j/segs)*Math.PI*2; dotPos.push(Math.cos(th)*rad, yy, Math.sin(th)*rad); }
    }
    const dGeo = new THREE.BufferGeometry(); dGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(dotPos), 3));
    const dots = new THREE.Points(dGeo, new THREE.PointsMaterial({ size: 0.04, map: sprite, color: 0x6e7ea0, transparent: true, opacity: 0.7, depthWrite: false }));
    group.add(dots);

    const atm = new THREE.Mesh(new THREE.SphereGeometry(R*1.03, 48, 48), new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.06, side: THREE.BackSide }));
    group.add(atm);
    const fill = new THREE.Mesh(new THREE.SphereGeometry(R*0.985, 48, 48), new THREE.MeshBasicMaterial({ color: 0x07101f, transparent: true, opacity: 0.9 }));
    group.add(fill);

    // outer HUD ring
    const hud = new THREE.Mesh(new THREE.TorusGeometry(R*1.45, 0.008, 6, 160), new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending }));
    hud.rotation.x = Math.PI*0.46; group.add(hud);

    const cities = [
      [45.46, 9.19],[51.50,-0.12],[40.71,-74.0],[25.20,55.27],[48.85,2.35],
      [55.75,37.61],[1.35,103.81],[-23.55,-46.63],[35.68,139.69],[41.90,12.49],[52.52,13.40],[19.43,-99.13],
    ];
    function ll(lat, lon, rr) { const phi=(90-lat)*Math.PI/180, theta=(lon+180)*Math.PI/180; return new THREE.Vector3(-rr*Math.sin(phi)*Math.cos(theta), rr*Math.cos(phi), rr*Math.sin(phi)*Math.sin(theta)); }
    const markers = [];
    cities.forEach(([la, lo]) => {
      const p = ll(la, lo, R*1.01);
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), new THREE.MeshBasicMaterial({ color: ACCENT2 })); m.position.copy(p); group.add(m);
      const halo2 = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 14), new THREE.MeshBasicMaterial({ color: ACCENT2, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending })); halo2.position.copy(p); group.add(halo2);
      markers.push({ halo: halo2, phase: Math.random()*Math.PI*2 });
    });

    // arcs + traveling pulses
    const arcs = [];
    function arc(a, b) {
      const start = ll(a[0],a[1],R*1.01), end = ll(b[0],b[1],R*1.01);
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(R*(1.2 + start.distanceTo(end)*0.12));
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const gg = new THREE.BufferGeometry().setFromPoints(curve.getPoints(44));
      const line = new THREE.Line(gg, new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending }));
      group.add(line);
      const pulse = new THREE.Sprite(new THREE.SpriteMaterial({ map: sprite, color: 0xeafff4, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false }));
      pulse.scale.set(0.16, 0.16, 1); group.add(pulse);
      arcs.push({ curve, pulse, t: Math.random(), spd: 0.004 + Math.random()*0.006 });
    }
    [[0,1],[1,2],[0,3],[4,5],[2,7],[1,8],[0,9],[3,11],[4,10]].forEach(([i,j]) => arc(cities[i], cities[j]));

    const tilt = new THREE.Vector2(0, 0);
    function onMove(e) { const r = canvas.getBoundingClientRect(); tilt.set(((e.clientX-r.left)/r.width-0.5), ((e.clientY-r.top)/r.height-0.5)); }
    canvas.addEventListener("pointermove", onMove, { passive: true });

    let tt = 0;
    function frame() {
      tt += 0.016;
      group.rotation.y += 0.0024;
      group.rotation.x += (tilt.y*0.5 + 0.12 - group.rotation.x)*0.04;
      hud.rotation.z += 0.004;
      markers.forEach((mk) => { const s = 1 + Math.sin(tt*2 + mk.phase)*0.5; mk.halo.scale.setScalar(s); mk.halo.material.opacity = 0.45 - (s-1)*0.4; });
      arcs.forEach((ar) => { ar.t += ar.spd; if (ar.t >= 1) ar.t = 0; const pp = ar.curve.getPointAt(ar.t); ar.pulse.position.copy(pp); ar.pulse.material.opacity = Math.sin(ar.t*Math.PI); });
      halo.material.opacity = 0.3 + Math.sin(tt*0.8)*0.06;
      renderer.render(scene, camera);
    }

    const onResize = () => { const sz = sizeOf(canvas); w = sz.w; h = sz.h; camera.aspect = w/h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false); };
    const ro = new ResizeObserver(rafResize(onResize)); ro.observe(canvas.parentElement);
    const stop = reduce ? (frame(), () => {}) : runLoop(canvas, frame);
    return () => { stop(); ro.disconnect(); canvas.removeEventListener("pointermove", onMove); renderer.dispose(); dGeo.dispose(); sprite.dispose(); };
  }

  window.Scenes = { nodeNetwork, shield, globe };
})();
