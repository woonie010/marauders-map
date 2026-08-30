import React, { useEffect, useState, useRef } from 'react';
import { floorFocusAttr } from '@/data/Constants';
import { BuildingFocusAttr } from '@/data/Constants';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, OrthographicCamera, MapControls } from '@react-three/drei';
import { modeKey, useSelection } from '../Context/SelectionContext';
import gsap from 'gsap';

/**
 * Camera Component
 *
 * This component manages the camera behavior in a 3D scene. It switches between
 * Perspective and Orthographic cameras and handles camera transitions, controls,
 * and animations based on the user's interactions and selected modes.
 */
export function Camera() {
  const { camera } = useThree();
  const {
    setBuildingSelected,
    setFloorSelected,
    buildingSelected,
    modeSelected,
    floorSelected,
    twoDChosen,
    isOrthographic,
    setIsOrthographic,
    controlsOff,
    setControlsOff,
  } = useSelection();
  const [controlEnabled, setControlEnabled] = useState(Boolean);
  const [initialPosition, setInitialPosition] = useState(
    new THREE.Vector3(-4.525791085806981, 8.885890377828867, -17.71298875564382),
  );
  const [initialRotation, setInitialRotation] = useState(
    new THREE.Euler(-2.665369601781471, -0.3100012833156949, -2.9855165928672185),
  );
  const [prevOrthoPos, setPrevOrthoPos] = useState(new THREE.Vector3(0, 20, 0));
  const [prevOrthoRot, setPrevOrthoRot] = useState(new THREE.Euler(-Math.PI / 2, 0, 0));
  const [prevOrthoPan, setPrevOrthoPan] = useState(new THREE.Vector3(0, 0, 0));
  const [prevOrbitPan, setprevOrbitPan] = useState(new THREE.Vector3(0, 0, 0));
  const [prevOrthoZoom, setPrevOrthoZoom] = useState(30);
  const mapControlsRef = useRef<any>(null);
  const orbitControlsRef = useRef<any>(null);

  // Log camera once on mount
  useEffect(() => {
    if (camera.name === 'Perspective Cam') {
      if (!controlsOff) {
        gsapTo(camera.position, initialPosition, 1, () => setControlsOff(false));
        gsapTo(camera.rotation, initialRotation);
      } else {
        camera.position.set(prevOrthoPos.x, prevOrthoPos.y, prevOrthoPos.z);
        camera.rotation.set(prevOrthoRot.x, prevOrthoRot.y, prevOrthoRot.z);
        gsapTo(camera.position, initialPosition, 1, () => {
          setControlsOff(false);
        });
        gsapTo(camera.rotation, initialRotation);
      }
    }
    if (camera.name === 'Orthographic Cam') {
      camera.position.set(prevOrthoPos.x, prevOrthoPos.y, prevOrthoPos.z);
      camera.rotation.set(prevOrthoRot.x, prevOrthoRot.y, prevOrthoRot.z);
      camera.zoom = prevOrthoZoom;
      camera.updateProjectionMatrix();
      if (mapControlsRef.current !== null) {
        mapControlsRef.current.target.set(prevOrthoPan.x, prevOrthoPan.y, prevOrthoPan.z);
      }
    }
  }, [camera]);

  const gsapTo = (
    sourceVec: THREE.Vector3 | THREE.Euler,
    targetVec: THREE.Vector3 | THREE.Euler,
    duration = 1,
    onComplete?: () => void,
  ) => {
    gsap.to(sourceVec, {
      x: targetVec.x,
      y: targetVec.y,
      z: targetVec.z,
      duration: duration,
      onUpdate: () => camera.updateProjectionMatrix(),
      onComplete: onComplete,
    });
  };

  // Handles actions upon changes in building selected
  useEffect(() => {
    if (buildingSelected !== 0) {
      setInitialPosition(camera.position.clone());
      setInitialRotation(camera.rotation.clone());
      const targetPosition = BuildingFocusAttr[buildingSelected].pos as THREE.Vector3;
      const targetRotation = BuildingFocusAttr[buildingSelected].rotation as THREE.Euler;

      // Animate camera position and rotation using gsap
      gsapTo(camera.position, targetPosition);
      gsapTo(camera.rotation, targetRotation);
      setControlEnabled(false);
    } else {
      // Animate camera back to the initial position and rotation when buildingSelected is 0
      gsapTo(camera.position, initialPosition);
      gsapTo(camera.rotation, initialRotation);
      setControlEnabled(true);
    }
  }, [buildingSelected]);

  useEffect(() => {
    if (modeSelected !== modeKey['building']) {
      setBuildingSelected(0);
      setFloorSelected(0);
    }
  }, [modeSelected]);

  // Handles actions upon choosing 2D or 3D mode
  useEffect(() => {
    // 2D Mode chosen
    if (twoDChosen && modeSelected === modeKey['navigation']) {
      setControlsOff(true);
      setInitialPosition(camera.position.clone());
      setInitialRotation(camera.rotation.clone());
      setprevOrbitPan(orbitControlsRef.current.target);
      const targetPosition = prevOrthoPos;
      const targetRotation = prevOrthoRot;

      gsapTo(camera.position, targetPosition, 1, () => setIsOrthographic(true));
      gsapTo(camera.rotation, targetRotation);
    }
    // 3D Mode chosen
    else if (!twoDChosen && mapControlsRef.current !== null) {
      let orthoPosZoomConsidered = camera.position.clone();
      orthoPosZoomConsidered.y = (1 / camera.zoom) * 600;
      setPrevOrthoPos(orthoPosZoomConsidered);
      setPrevOrthoRot(camera.rotation.clone());
      setPrevOrthoZoom(camera.zoom);

      mapControlsRef.current ? setPrevOrthoPan(mapControlsRef.current.target) : null;
      setIsOrthographic(false);
      setControlEnabled(true);
    }
    if (twoDChosen && modeSelected !== modeKey['navigation']) {
      setIsOrthographic(false);
      setControlEnabled(true);
    }
  }, [twoDChosen, modeSelected]);

  return (
    <>
      {!isOrthographic ? (
        <PerspectiveCamera makeDefault name={'Perspective Cam'} />
      ) : (
        <OrthographicCamera makeDefault name={'Orthographic Cam'} near={0.1} far={1000} zoom={100} />
      )}
      {!controlsOff && (
        <OrbitControls
          makeDefault
          ref={orbitControlsRef}
          enablePan={(controlEnabled && modeSelected === modeKey['navigation']) || floorSelected !== 0}
          screenSpacePanning={!(modeSelected === modeKey['navigation'])}
          rotateSpeed={0.3}
          target={prevOrbitPan}
          enableRotate={controlEnabled}
        />
      )}
      {isOrthographic && <MapControls ref={mapControlsRef} maxPolarAngle={0} rotateSpeed={0.5} />}
    </>
  );
}
