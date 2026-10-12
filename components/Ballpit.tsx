import React, { useEffect, useRef } from 'react';
import {
  Vector3 as a,
  MeshPhysicalMaterial as c,
  InstancedMesh as d,
  Timer as e,
  AmbientLight as f,
  SphereGeometry as g,
  ShaderChunk as h,
  Scene as i,
  Color as l,
  Object3D as m,
  SRGBColorSpace as n,
  MathUtils as o,
  PMREMGenerator as p,
  Vector2 as r,
  WebGLRenderer as s,
  PerspectiveCamera as t,
  PointLight as u,
  ACESFilmicToneMapping as v,
  Plane as w,
  Raycaster as y
} from 'three';
import { RoomEnvironment as z } from 'three/examples/jsm/environments/RoomEnvironment.js';

class x {
  #e: any;
  canvas!: HTMLCanvasElement;
  camera!: any;
  cameraMinAspect?: number;
  cameraMaxAspect?: number;
  cameraFov!: number;
  maxPixelRatio?: number;
  minPixelRatio?: number;
  scene!: any;
  renderer!: any;
  #t: any;
  size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
  render = this.#i;
  onBeforeRender = (_h: any) => {};
  onAfterRender = (_h: any) => {};
  onAfterResize = (_size: any) => {};
  #s = false;
  #n = false;
  isDisposed = false;
  #o: any;
  #r: any;
  #a: any;
  #c = new (e as any)();
  #h = { elapsed: 0, delta: 0 };
  #l: any;
  constructor(eParam: any) {
    this.#e = { ...eParam };
    this.#m();
    this.#d();
    this.#p();
    this.resize();
    this.#g();
  }
  #m() {
    this.camera = new t();
    this.cameraFov = this.camera.fov;
  }
  #d() {
    this.scene = new i();
  }
  #p() {
    if (this.#e.canvas) {
      this.canvas = this.#e.canvas;
    } else if (this.#e.id) {
      this.canvas = document.getElementById(this.#e.id) as HTMLCanvasElement;
    } else {
      console.error('Three: Missing canvas or id parameter');
    }
    if (this.canvas) {
      this.canvas.style.display = 'block';
    }
    const eParam = {
      canvas: this.canvas,
      powerPreference: 'high-performance',
      ...(this.#e.rendererOptions ?? {})
    };
    this.renderer = new s(eParam);
    this.renderer.outputColorSpace = n;
  }
  #g() {
    if (!(this.#e.size instanceof Object)) {
      window.addEventListener('resize', this.#f.bind(this));
      if (this.#e.size === 'parent' && this.canvas.parentNode) {
        this.#r = new ResizeObserver(this.#f.bind(this));
        this.#r.observe(this.canvas.parentNode as Element);
      }
    }
    this.#o = new IntersectionObserver(this.#u.bind(this), {
      root: null,
      rootMargin: '0px',
      threshold: 0
    });
    this.#o.observe(this.canvas);
    document.addEventListener('visibilitychange', this.#v.bind(this));
  }
  #y() {
    window.removeEventListener('resize', this.#f.bind(this));
    this.#r?.disconnect();
    this.#o?.disconnect();
    document.removeEventListener('visibilitychange', this.#v.bind(this));
  }
  #u(entries: any) {
    this.#s = entries[0].isIntersecting;
    this.#s ? this.#w() : this.#z();
  }
  #v() {
    if (this.#s) {
      document.hidden ? this.#z() : this.#w();
    }
  }
  #f() {
    if (this.#a) clearTimeout(this.#a);
    this.#a = setTimeout(this.resize.bind(this), 100);
  }
  resize() {
    let widthVal: number, heightVal: number;
    if (this.#e.size instanceof Object) {
      widthVal = this.#e.size.width;
      heightVal = this.#e.size.height;
    } else if (this.#e.size === 'parent' && this.canvas.parentNode) {
      widthVal = (this.canvas.parentNode as HTMLElement).offsetWidth;
      heightVal = (this.canvas.parentNode as HTMLElement).offsetHeight;
    } else {
      widthVal = window.innerWidth;
      heightVal = window.innerHeight;
    }
    this.size.width = widthVal;
    this.size.height = heightVal;
    this.size.ratio = widthVal / heightVal;
    this.#x();
    this.#b();
    this.onAfterResize(this.size);
  }
  #x() {
    this.camera.aspect = this.size.width / this.size.height;
    if (this.camera.isPerspectiveCamera && this.cameraFov) {
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
        this.#A(this.cameraMinAspect);
      } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
        this.#A(this.cameraMaxAspect);
      } else {
        this.camera.fov = this.cameraFov;
      }
    }
    this.camera.updateProjectionMatrix();
    this.updateWorldSize();
  }
  #A(eParam: number) {
    const tVal = Math.tan(o.degToRad(this.cameraFov / 2)) / (this.camera.aspect / eParam);
    this.camera.fov = 2 * o.radToDeg(Math.atan(tVal));
  }
  updateWorldSize() {
    if (this.camera.isPerspectiveCamera) {
      const eVal = (this.camera.fov * Math.PI) / 180;
      this.size.wHeight = 2 * Math.tan(eVal / 2) * this.camera.position.length();
      this.size.wWidth = this.size.wHeight * this.camera.aspect;
    } else if (this.camera.isOrthographicCamera) {
      this.size.wHeight = this.camera.top - this.camera.bottom;
      this.size.wWidth = this.camera.right - this.camera.left;
    }
  }
  #b() {
    this.renderer.setSize(this.size.width, this.size.height);
    this.#t?.setSize(this.size.width, this.size.height);
    let eVal = window.devicePixelRatio;
    if (this.maxPixelRatio && eVal > this.maxPixelRatio) {
      eVal = this.maxPixelRatio;
    } else if (this.minPixelRatio && eVal < this.minPixelRatio) {
      eVal = this.minPixelRatio;
    }
    this.renderer.setPixelRatio(eVal);
    this.size.pixelRatio = eVal;
  }
  get postprocessing() {
    return this.#t;
  }
  set postprocessing(eVal: any) {
    this.#t = eVal;
    this.render = eVal.render.bind(eVal);
  }
  #w() {
    if (this.#n) return;
    const animate = () => {
      this.#l = requestAnimationFrame(animate);
      if (this.#c.update) this.#c.update();
      this.#h.delta = this.#c.getDelta ? this.#c.getDelta() : 0.016;
      this.#h.elapsed += this.#h.delta;
      this.onBeforeRender(this.#h);
      this.render();
      this.onAfterRender(this.#h);
    };
    this.#n = true;
    if (this.#c.reset) this.#c.reset();
    animate();
  }
  #z() {
    if (this.#n) {
      cancelAnimationFrame(this.#l);
      this.#n = false;
    }
  }
  #i() {
    this.renderer.render(this.scene, this.camera);
  }
  clear() {
    this.scene.traverse((eVal: any) => {
      if (eVal.isMesh && typeof eVal.material === 'object' && eVal.material !== null) {
        Object.keys(eVal.material).forEach(tVal => {
          const item = eVal.material[tVal];
          if (item !== null && typeof item === 'object' && typeof item.dispose === 'function') {
            item.dispose();
          }
        });
        eVal.material.dispose();
        eVal.geometry.dispose();
      }
    });
    this.scene.clear();
  }
  dispose() {
    this.#y();
    this.#z();
    if (this.#c.dispose) this.#c.dispose();
    this.clear();
    this.#t?.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.isDisposed = true;
  }
}

const b = new Map(),
  A = new r();
let R = false;
function S(eParam: any) {
  const tObj = {
    position: new r(),
    nPosition: new r(),
    hover: false,
    touching: false,
    onEnter() {},
    onMove() {},
    onClick() {},
    onLeave() {},
    ...eParam
  };
  (function (domElem: any, tVal: any) {
    if (!b.has(domElem)) {
      b.set(domElem, tVal);
      if (!R) {
        document.body.addEventListener('pointermove', M);
        document.body.addEventListener('pointerleave', L);
        document.body.addEventListener('click', C);

        document.body.addEventListener('touchstart', TouchStart, { passive: false });
        document.body.addEventListener('touchmove', TouchMove, { passive: false });
        document.body.addEventListener('touchend', TouchEnd, { passive: false });
        document.body.addEventListener('touchcancel', TouchEnd, { passive: false });

        R = true;
      }
    }
  })(eParam.domElement, tObj);
  tObj.dispose = () => {
    const tVal = eParam.domElement;
    b.delete(tVal);
    if (b.size === 0) {
      document.body.removeEventListener('pointermove', M);
      document.body.removeEventListener('pointerleave', L);
      document.body.removeEventListener('click', C);

      document.body.removeEventListener('touchstart', TouchStart);
      document.body.removeEventListener('touchmove', TouchMove);
      document.body.removeEventListener('touchend', TouchEnd);
      document.body.removeEventListener('touchcancel', TouchEnd);

      R = false;
    }
  };
  return tObj;
}

function M(e: MouseEvent) {
  A.x = e.clientX;
  A.y = e.clientY;
  processInteraction();
}

function processInteraction() {
  for (const [elem, tVal] of b) {
    const rect = elem.getBoundingClientRect();
    if (D(rect)) {
      P(tVal, rect);
      if (!tVal.hover) {
        tVal.hover = true;
        tVal.onEnter(tVal);
      }
      tVal.onMove(tVal);
    } else if (tVal.hover && !tVal.touching) {
      tVal.hover = false;
      tVal.onLeave(tVal);
    }
  }
}

function C(e: MouseEvent) {
  A.x = e.clientX;
  A.y = e.clientY;
  for (const [elem, tVal] of b) {
    const rect = elem.getBoundingClientRect();
    P(tVal, rect);
    if (D(rect)) tVal.onClick(tVal);
  }
}

function L() {
  for (const tVal of b.values()) {
    if (tVal.hover) {
      tVal.hover = false;
      tVal.onLeave(tVal);
    }
  }
}

function TouchStart(e: TouchEvent) {
  if (e.touches.length > 0) {
    e.preventDefault();
    A.x = e.touches[0].clientX;
    A.y = e.touches[0].clientY;

    for (const [elem, tVal] of b) {
      const rect = elem.getBoundingClientRect();
      if (D(rect)) {
        tVal.touching = true;
        P(tVal, rect);
        if (!tVal.hover) {
          tVal.hover = true;
          tVal.onEnter(tVal);
        }
        tVal.onMove(tVal);
      }
    }
  }
}

function TouchMove(e: TouchEvent) {
  if (e.touches.length > 0) {
    e.preventDefault();
    A.x = e.touches[0].clientX;
    A.y = e.touches[0].clientY;

    for (const [elem, tVal] of b) {
      const rect = elem.getBoundingClientRect();
      P(tVal, rect);

      if (D(rect)) {
        if (!tVal.hover) {
          tVal.hover = true;
          tVal.touching = true;
          tVal.onEnter(tVal);
        }
        tVal.onMove(tVal);
      } else if (tVal.hover && tVal.touching) {
        tVal.onMove(tVal);
      }
    }
  }
}

function TouchEnd() {
  for (const [, tVal] of b) {
    if (tVal.touching) {
      tVal.touching = false;
      if (tVal.hover) {
        tVal.hover = false;
        tVal.onLeave(tVal);
      }
    }
  }
}

function P(eParam: any, tRect: any) {
  const { position: iPos, nPosition: sPos } = eParam;
  iPos.x = A.x - tRect.left;
  iPos.y = A.y - tRect.top;
  sPos.x = (iPos.x / tRect.width) * 2 - 1;
  sPos.y = (-iPos.y / tRect.height) * 2 + 1;
}
function D(eRect: any) {
  const { x: tX, y: iY } = A;
  const { left: sL, top: nT, width: oW, height: rH } = eRect;
  return tX >= sL && tX <= sL + oW && iY >= nT && iY <= nT + rH;
}

const { randFloat: k, randFloatSpread: E } = o;
const F = new a();
const I = new a();
const O = new a();
const V = new a();
const B = new a();
const N = new a();
const _ = new a();
const j = new a();
const H = new a();
const T = new a();

class W {
  config: any;
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  center = new a();
  constructor(eParam: any) {
    this.config = eParam;
    this.positionData = new Float32Array(3 * eParam.count).fill(0);
    this.velocityData = new Float32Array(3 * eParam.count).fill(0);
    this.sizeData = new Float32Array(eParam.count).fill(1);
    this.#R();
    this.setSizes();
  }
  #R() {
    const { config: eConf, positionData: tPos } = this;
    this.center.toArray(tPos, 0);
    for (let idx = 1; idx < eConf.count; idx++) {
      const sIdx = 3 * idx;
      tPos[sIdx] = E(2 * eConf.maxX);
      tPos[sIdx + 1] = E(2 * eConf.maxY);
      tPos[sIdx + 2] = E(2 * eConf.maxZ);
    }
  }
  setSizes() {
    const { config: eConf, sizeData: tSize } = this;
    tSize[0] = eConf.size0;
    for (let idx = 1; idx < eConf.count; idx++) {
      tSize[idx] = k(eConf.minSize, eConf.maxSize);
    }
  }
  update(eDelta: any) {
    const { config: tConf, center: iCenter, positionData: sPos, sizeData: nSize, velocityData: oVel } = this;
    let rIdx = 0;
    if (tConf.controlSphere0) {
      rIdx = 1;
      F.fromArray(sPos, 0);
      F.lerp(iCenter, 0.1).toArray(sPos, 0);
      V.set(0, 0, 0).toArray(oVel, 0);
    }
    for (let idx = rIdx; idx < tConf.count; idx++) {
      const base = 3 * idx;
      I.fromArray(sPos, base);
      B.fromArray(oVel, base);
      B.y -= eDelta.delta * tConf.gravity * nSize[idx];
      B.multiplyScalar(tConf.friction);
      B.clampLength(0, tConf.maxVelocity);
      I.add(B);
      I.toArray(sPos, base);
      B.toArray(oVel, base);
    }
    for (let idx = rIdx; idx < tConf.count; idx++) {
      const base = 3 * idx;
      I.fromArray(sPos, base);
      B.fromArray(oVel, base);
      const radius = nSize[idx];
      for (let jdx = idx + 1; jdx < tConf.count; jdx++) {
        const otherBase = 3 * jdx;
        O.fromArray(sPos, otherBase);
        N.fromArray(oVel, otherBase);
        const otherRadius = nSize[jdx];
        _.copy(O).sub(I);
        const dist = _.length();
        const sumRadius = radius + otherRadius;
        if (dist < sumRadius) {
          const overlap = sumRadius - dist;
          j.copy(_)
            .normalize()
            .multiplyScalar(0.5 * overlap);
          H.copy(j).multiplyScalar(Math.max(B.length(), 1));
          T.copy(j).multiplyScalar(Math.max(N.length(), 1));
          I.sub(j);
          B.sub(H);
          I.toArray(sPos, base);
          B.toArray(oVel, base);
          O.add(j);
          N.add(T);
          O.toArray(sPos, otherBase);
          N.toArray(oVel, otherBase);
        }
      }
      if (tConf.controlSphere0) {
        _.copy(F).sub(I);
        const dist = _.length();
        const sumRadius0 = radius + nSize[0];
        if (dist < sumRadius0) {
          const diff = sumRadius0 - dist;
          j.copy(_.normalize()).multiplyScalar(diff);
          H.copy(j).multiplyScalar(Math.max(B.length(), 2));
          I.sub(j);
          B.sub(H);
        }
      }
      if (Math.abs(I.x) + radius > tConf.maxX) {
        I.x = Math.sign(I.x) * (tConf.maxX - radius);
        B.x = -B.x * tConf.wallBounce;
      }
      if (tConf.gravity === 0) {
        if (Math.abs(I.y) + radius > tConf.maxY) {
          I.y = Math.sign(I.y) * (tConf.maxY - radius);
          B.y = -B.y * tConf.wallBounce;
        }
      } else if (I.y - radius < -tConf.maxY) {
        I.y = -tConf.maxY + radius;
        B.y = -B.y * tConf.wallBounce;
      }
      const maxBoundary = Math.max(tConf.maxZ, tConf.maxSize);
      if (Math.abs(I.z) + radius > maxBoundary) {
        I.z = Math.sign(I.z) * (tConf.maxZ - radius);
        B.z = -B.z * tConf.wallBounce;
      }
      I.toArray(sPos, base);
      B.toArray(oVel, base);
    }
  }
}

class Y extends c {
  uniforms: any;
  onBeforeCompile2?: (shader: any) => void;

  constructor(eParam?: any) {
    super(eParam);
    this.uniforms = {
      thicknessDistortion: { value: 0.1 },
      thicknessAmbient: { value: 0 },
      thicknessAttenuation: { value: 0.1 },
      thicknessPower: { value: 2 },
      thicknessScale: { value: 10 }
    };
    (this.defines as any).USE_UV = '';
    this.onBeforeCompile = (shaderParam: any) => {
      Object.assign(shaderParam.uniforms, this.uniforms);
      shaderParam.fragmentShader =
        '\n        uniform float thicknessPower;\n        uniform float thicknessScale;\n        uniform float thicknessDistortion;\n        uniform float thicknessAmbient;\n        uniform float thicknessAttenuation;\n      ' +
        shaderParam.fragmentShader;
      shaderParam.fragmentShader = shaderParam.fragmentShader.replace(
        'void main() {',
        '\n        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {\n          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));\n          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;\n          #ifdef USE_COLOR\n            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;\n          #else\n            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;\n          #endif\n          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;\n        }\n\n        void main() {\n      '
      );
      const tStr = h.lights_fragment_begin.replaceAll(
        'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
        '\n          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);\n        '
      );
      shaderParam.fragmentShader = shaderParam.fragmentShader.replace('#include <lights_fragment_begin>', tStr);
      if (this.onBeforeCompile2) this.onBeforeCompile2(shaderParam);
    };
  }
}

const X = {
  count: 200,
  colors: ['#00CFFF', '#7C3AED', '#FFD700', '#F97316'],
  ambientColor: 0xffffff,
  ambientIntensity: 1,
  lightIntensity: 200,
  materialParams: {
    metalness: 0.5,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.15
  },
  minSize: 0.5,
  maxSize: 1,
  size0: 1,
  gravity: 0.5,
  friction: 0.9975,
  wallBounce: 0.95,
  maxVelocity: 0.15,
  maxX: 5,
  maxY: 5,
  maxZ: 2,
  controlSphere0: false,
  followCursor: true
};

const U = new m();

class Z extends d {
  config: any;
  physics: W;
  ambientLight!: any;
  light!: any;

  constructor(eRenderer: any, tConfig = {}) {
    const iConfig: any = { ...X, ...tConfig };
    const sRoom = new z();
    const nTex = new p(eRenderer).fromScene(sRoom).texture;
    const oGeom = new g();
    const rMat = new Y({ envMap: nTex, ...iConfig.materialParams });
    rMat.envMapRotation.x = -Math.PI / 2;
    super(oGeom, rMat, iConfig.count);
    this.config = iConfig;
    this.physics = new W(iConfig);
    this.#S();
    this.setColors(iConfig.colors);
  }
  #S() {
    this.ambientLight = new f(this.config.ambientColor, this.config.ambientIntensity);
    this.add(this.ambientLight);
    this.light = new u(this.config.colors[0], this.config.lightIntensity);
    this.add(this.light);
  }
  setColors(eColors: any) {
    if (Array.isArray(eColors) && eColors.length > 1) {
      const tPalette = (function (colorsArr: any[]) {
        let tArr: any[], iCols: any[];
        function setColors(cols: any[]) {
          tArr = cols;
          iCols = [];
          tArr.forEach(col => {
            iCols.push(new l(col));
          });
        }
        setColors(colorsArr);
        return {
          setColors,
          getColorAt: function (ratio: number, out = new l()) {
            const scaled = Math.max(0, Math.min(1, ratio)) * (tArr.length - 1);
            const idx = Math.floor(scaled);
            const start = iCols[idx];
            if (idx >= tArr.length - 1) return start.clone();
            const alpha = scaled - idx;
            const end = iCols[idx + 1];
            out.r = start.r + alpha * (end.r - start.r);
            out.g = start.g + alpha * (end.g - start.g);
            out.b = start.b + alpha * (end.b - start.b);
            return out;
          }
        };
      })(eColors);

      for (let idx = 0; idx < this.count; idx++) {
        this.setColorAt(idx, tPalette.getColorAt(idx / this.count));
        if (idx === 0) {
          this.light.color.copy(tPalette.getColorAt(idx / this.count));
        }
      }
      if (this.instanceColor) {
        this.instanceColor.needsUpdate = true;
      }
    }
  }
  update(eDelta: any) {
    this.physics.update(eDelta);
    for (let idx = 0; idx < this.count; idx++) {
      U.position.fromArray(this.physics.positionData, 3 * idx);
      if (idx === 0 && this.config.followCursor === false) {
        U.scale.setScalar(0);
      } else {
        U.scale.setScalar(this.physics.sizeData[idx]);
      }
      U.updateMatrix();
      this.setMatrixAt(idx, U.matrix);
      if (idx === 0) this.light.position.copy(U.position);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}

function createBallpit(eCanvas: HTMLCanvasElement, tConfig: any = {}) {
  const iThree = new x({
    canvas: eCanvas,
    size: 'parent',
    rendererOptions: { antialias: true, alpha: true }
  });
  let sSpheres: Z;
  iThree.renderer.toneMapping = v;
  iThree.camera.position.set(0, 0, 20);
  iThree.camera.lookAt(0, 0, 0);
  iThree.cameraMaxAspect = 1.5;
  iThree.resize();
  initialize(tConfig);
  const nRaycaster = new y();
  const oPlane = new w(new a(0, 0, 1), 0);
  const rVec = new a();
  let cPaused = false;

  eCanvas.style.touchAction = 'none';
  eCanvas.style.userSelect = 'none';
  (eCanvas.style as any).webkitUserSelect = 'none';

  const hInteraction = S({
    domElement: eCanvas,
    onMove() {
      nRaycaster.setFromCamera(hInteraction.nPosition, iThree.camera);
      iThree.camera.getWorldDirection(oPlane.normal);
      nRaycaster.ray.intersectPlane(oPlane, rVec);
      sSpheres.physics.center.copy(rVec);
      sSpheres.config.controlSphere0 = true;
    },
    onLeave() {
      sSpheres.config.controlSphere0 = false;
    }
  });
  function initialize(cfg: any) {
    if (sSpheres) {
      iThree.clear();
      iThree.scene.remove(sSpheres);
    }
    sSpheres = new Z(iThree.renderer, cfg);
    iThree.scene.add(sSpheres);
  }
  iThree.onBeforeRender = (eDelta: any) => {
    if (!cPaused && sSpheres) sSpheres.update(eDelta);
  };
  iThree.onAfterResize = (eSize: any) => {
    if (sSpheres) {
      sSpheres.config.maxX = eSize.wWidth / 2;
      sSpheres.config.maxY = eSize.wHeight / 2;
    }
  };
  return {
    three: iThree,
    get spheres() {
      return sSpheres;
    },
    setCount(cnt: number) {
      initialize({ ...sSpheres.config, count: cnt });
    },
    updateConfig(newProps: any) {
      if (newProps.count !== undefined && newProps.count !== sSpheres.config.count) {
        initialize({ ...sSpheres.config, ...newProps });
      } else {
        Object.assign(sSpheres.config, newProps);
        if (newProps.colors) {
          sSpheres.setColors(sSpheres.config.colors);
        }
        if (newProps.minSize !== undefined || newProps.maxSize !== undefined || newProps.size0 !== undefined) {
          sSpheres.physics.setSizes();
        }
      }
    },
    togglePause() {
      cPaused = !cPaused;
    },
    dispose() {
      hInteraction.dispose();
      iThree.dispose();
    }
  };
}

export interface BallpitProps {
  className?: string;
  followCursor?: boolean;
  count?: number;
  colors?: string[] | number[];
  ambientColor?: number | string;
  ambientIntensity?: number;
  lightIntensity?: number;
  minSize?: number;
  maxSize?: number;
  size0?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  maxVelocity?: number;
  maxX?: number;
  maxY?: number;
  maxZ?: number;
  controlSphere0?: boolean;
}

export const Ballpit: React.FC<BallpitProps> = ({
  className = '',
  followCursor = true,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spheresInstanceRef = useRef<any>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      spheresInstanceRef.current = createBallpit(canvas, { followCursor, ...props });
    } catch (err) {
      console.warn("Ballpit canvas creation failed:", err);
    }

    return () => {
      if (spheresInstanceRef.current) {
        try {
          spheresInstanceRef.current.dispose();
        } catch (_) {}
        spheresInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (spheresInstanceRef.current) {
      spheresInstanceRef.current.updateConfig({ followCursor, ...props });
    }
  }, [props, followCursor]);

  return <canvas className={className} ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default Ballpit;
