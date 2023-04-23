import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useReader } from '../../hooks/useReader';

function Canvas({ plyFile, jsonFile }) {
  //This custom hook reads the files that were opened with file browser.
  const { arrayBuffer, json } = useReader(plyFile, jsonFile);

  const containerRef = useRef(null);

  //I create and initiate the scene, camera and renderer object with constructor parameters.
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xffffff, 0);

  //Enable mouse to control the camera around the scene.
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  //Animate function is called after I load the files and create the point clouds.
  function animate() {
    //I add the canvas element to my div if no canvas was added, but I could not figure out how to rerender new scene.
    if (containerRef.current.children.length === 0) {
      containerRef.current.appendChild(renderer.domElement);
      controls.update();
      renderer.setSize(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight,
      );
    }
    //This is being called recursively, I guess, to rerender the canvas.
    requestAnimationFrame(() => animate());
    renderer.render(scene, camera);
  }

  useEffect(() => {
    if (arrayBuffer && json) {
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }

      const indices = json.clustersIndices;
      const filters = json.clustersFilter;

      //I prepare the groups in array, this array holds indices for coloring and the color that will be used. Also size of the point rendered.
      //I can easily create more pointcloud groups by adding into this array, as long as I have the indices provided.
      const groups = [
        {
          color: 0x00ff00,
          pointVectors: [],
          indices: indices[0],
          isVisible: filters[0],
          pointSize: 0.005,
        },
        {
          color: 0xffff00,
          pointVectors: [],
          indices: indices[1],
          isVisible: filters[1],
          pointSize: 0.005,
        },
        {
          color: 0xff0000,
          pointVectors: [],
          indices: indices[2],
          isVisible: filters[2],
          pointSize: 0.005,
        },
      ];

      const loader = new PLYLoader();
      //Provided .ply file is loaded into geometry, we will not use this geometry to render the points but rather as a library to pick the points from based on the provided indices in .json file.
      const bufferGeometry = loader.parse(arrayBuffer);

      //We create groups of points from the provided .ply file based on indices.
      for (
        let i = 0;
        i < bufferGeometry.attributes.position.array.length / 3; //We iterate each index and pick the x,y,z coordinates.
        i++
      ) {
        groups.forEach((group) => {
          if (group.indices.includes(i)) {
            group.pointVectors.push(
              new THREE.Vector3(
                bufferGeometry.attributes.position.array[i * 3],
                bufferGeometry.attributes.position.array[i * 3 + 1],
                bufferGeometry.attributes.position.array[i * 3 + 2] - 2, // (-2 was added to shift the pointcloud by 2 in z axis for better viewing).
              ),
            );
          }
        });
      }

      //Then we create new geometry, material and finaly the new point cloud for each group we have.
      //We push this point cloud into the existing scene to render.
      groups.forEach((group) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(
          group.pointVectors,
        );
        const material = new THREE.PointsMaterial({
          color: group.color,
          size: group.pointSize,
        });
        const pointCloud = new THREE.Points(geometry, material);
        if (group.isVisible) {
          scene.add(pointCloud);
        }
      });
      camera.position.z = 1;
      animate();
    }
  }, [arrayBuffer, json]);

  return <div className="canvas-container" ref={containerRef}></div>;
}

Canvas.propTypes = {
  plyFile: PropTypes.object,
  jsonFile: PropTypes.object,
};

export default Canvas;
