import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';

const PlyViewer = () => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const loader = new PLYLoader();
    reader.onload = function (event) {
      const geometry = loader.parse(event.target.result);
      const material = new THREE.PointsMaterial({ color: 0x00ff00 });
      const points = new THREE.Points(geometry, material);
      const scene = new THREE.Scene();
      scene.add(points);
      const camera = new THREE.PerspectiveCamera(
        75,
        container.offsetWidth / container.offsetHeight,
        0.1,
        1000,
      );
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild(renderer.domElement);
      camera.position.z = 5;
      const animate = function () {
        requestAnimationFrame(animate);
        points.rotation.x += 0.01;
        points.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <input type="file" ref={inputRef} onChange={handleFileSelect} />
      <div ref={containerRef}></div>
    </>
  );
};

export default PlyViewer;
