import { useEffect, useState } from 'react';
import { Constants } from '@/data/Constants';
import { Sphere } from '@react-three/drei';
import { useSelection } from '../Context/SelectionContext';
import * as THREE from 'three';
import { CharRefsType } from '@/data/Types';

interface RendererProps {
  charRef: any;
}

/**
 * CharacterRenderer Component
 *
 * This component controls the visibility of characters based on the selected floor and highlights
 * the selected person by changing their color.
 */
const CharacterRenderer = ({ charRef }: RendererProps) => {
  const { floorSelected, personSelected } = useSelection();
  useEffect(() => {
    Object.keys(charRef.current).forEach((building) => {
      Object.keys(charRef.current[building]).forEach((floor) => {
        if (floorSelected == 0) {
          Object.keys(charRef.current[building][floor]).forEach((person) => {
            charRef.current[building][floor][person].visible = true;
          });
        } else if (Number(floor) !== floorSelected) {
          Object.keys(charRef.current[building][floor]).forEach((person) => {
            charRef.current[building][floor][person].visible = false;
          });
        } else {
          Object.keys(charRef.current[building][floor]).forEach((person) => {
            charRef.current[building][floor][person].visible = true;
          });
        }
      });
    });
  }, [floorSelected]);

  useEffect(() => {
    if (
      personSelected &&
      !Array.isArray(personSelected.material) &&
      personSelected.material instanceof THREE.MeshStandardMaterial
    ) {
      personSelected ? personSelected.material.color.set('red') : null;
    }
  }, [personSelected]);

  return null;
};

export default CharacterRenderer;
