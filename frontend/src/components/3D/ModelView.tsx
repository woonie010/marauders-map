'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { Camera } from './Camera';
import React, { useEffect, useState } from 'react';
import Lights from '../Lights';
import School from './School';
import InfoBox from '../PersonInfoBox';
import { SelectedPerson } from '@/data/Types';
import { modeKey, useSelection } from '../Context/SelectionContext';
import { glPalette } from '@/data/Constants';
import gsap from 'gsap';
import * as THREE from 'three';

import ModeButton from '../Buttons/ModeButton';
import ViewModeButton from '../Buttons/ViewModeButton';
import NavFloorButton from '../Buttons/NavFloorButton';
import JsonDropDown from '../Buttons/JsonDropDown';

/**
 * ModelView Component
 *
 * This component renders the main 3D scene with a school model and interactive elements.
 * It includes camera controls, lighting, and background color transitions.
 * Users can select a person in the scene, and an InfoBox will appear displaying their information.
 */
const ModelView = () => {
  const [selectedPerson, setSelectedPerson] = useState<SelectedPerson | null>(null);
  const { modeSelected, glColor, setGlColor, personSelected } = useSelection();

  // Function to handle selection of a person
  const handlePersonSelect = (person: any) => {
    setSelectedPerson(person);
  };

  // Function to close the InfoBox
  const handleCloseInfoBox = () => {
    setSelectedPerson(null); // Set selectedPerson to null to close the InfoBox
    console.log(personSelected);
    if (
      personSelected &&
      !Array.isArray(personSelected.material) &&
      personSelected.material instanceof THREE.MeshStandardMaterial
    ) {
      personSelected.material.color.set('green');
    }
  };

  const UpdateBackgroundColor = () => {
    const { gl } = useThree();

    useEffect(() => {
      const startColor = new THREE.Color();
      gl.getClearColor(startColor); // Get the current clear color

      const endColor = new THREE.Color(glColor);

      gsap.to(startColor, {
        r: endColor.r,
        g: endColor.g,
        b: endColor.b,
        duration: 0.3, // Duration of the transition in seconds
        onUpdate: () => {
          gl.setClearColor(startColor);
        },
        ease: 'power2.inOut', // Easing function for the transition
      });
    }, [glColor, gl]);

    return null;
  };

  useEffect(() => {
    setGlColor(glPalette[modeSelected as 0 | 1 | 2]);
  }, [modeSelected]);

  return (
    <section className="relative h-[100vh] w-full">
      <JsonDropDown />
      <ModeButton />
      <ViewModeButton />
      <NavFloorButton />

      <Canvas
        gl={{ antialias: true }}
        onCreated={(state) => {
          state.gl.setClearColor(glColor); // Change background color here
        }}
      >
        <UpdateBackgroundColor />
        <ambientLight intensity={1} />
        <Lights />
        <Camera />

        <School onPersonSelect={handlePersonSelect} isMain={true} />
      </Canvas>
      {selectedPerson && (
        <InfoBox personKey={selectedPerson.personKey} info={selectedPerson.info} onClose={handleCloseInfoBox} />
      )}
    </section>
  );
};

export default ModelView;
