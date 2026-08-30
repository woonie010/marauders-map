import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF, Sphere } from '@react-three/drei';
import { MeshDict, PlaneDict, SelectedPerson, CharRefsType } from '../../data/Types';
import { FloorButtons } from '../Buttons/FloorButton';
import { BuildingButtons } from '../Buttons/BuildingButton';
import { WallGroup, PlaneGroup, RoofGroup } from '../../data/Constants';
import { useCoordinateManager } from '../CoordinateManager';
import { modeKey, useSelection } from '../Context/SelectionContext';
import { useMeshUpdater } from '../MeshUpdater';
import TrackingManager from '@/app/tracking/TrackingManager';
import CharacterRenderer from './CharacterRenderer';
import FloorInfoCard from './FloorInfoCard';
import { Html } from '@react-three/drei';

interface SchoolProps {
  onPersonSelect?: (person: { personKey: string; info: any }) => void; // Define the prop type for onPersonSelect
  isMain: boolean;
  personData?: any;
}

const artifactMeshNames = ['a1', 'a2', 'a3'];

/**
 * Model Component
 *
 * This component loads and renders a 3D school model, allowing interaction with characters and buildings.
 * It uses react-three-fiber for rendering and manages various mesh groups for walls, roofs, and planes.
 */
const Model = ({ onPersonSelect, isMain, personData }: SchoolProps) => {
  const gltf = useGLTF('/models/school.glb');
  const {
    modeSelected,
    buildingSelected,
    setBuildingSelected,
    floorHighlighted,
    floorSelected,
    setPersonSelected,
    setFloorHighlighted,
    setFloorSelected,
    setIsOrthographic,
    setTwoDChosen,
  } = useSelection(); // Use context

  const wallMeshRefs = useRef<MeshDict>({});
  const roofRefs = useRef<MeshDict>({});
  const planeRefs = useRef<MeshDict>({});
  const planeCoordRefs = useRef<PlaneDict>({});
  const artifactMeshRefs = useRef<MeshDict>({});

  const wallMeshNames = useMemo(() => {
    return new Set(Object.values(WallGroup).flatMap((group) => Object.values(group)));
  }, []);

  const roofMeshNames = useMemo(() => {
    return new Set(Object.values(RoofGroup));
  }, []);

  const planeMeshNames = useMemo(() => {
    return new Set(Object.values(PlaneGroup));
  }, []);

  const characterModel = useGLTF('/models/character.glb');
  const testChar = useGLTF('/models/character copy.glb');
  const [loaded, setLoaded] = useState(false);

  const charRefs = useRef<CharRefsType>({});
  const { transformedCoords, personInfo } = useCoordinateManager(planeRefs, planeCoordRefs);
  const [selectedPersonKey, setSelectedPersonKey] = useState<string | null>(null);

  const transparent_mat = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: 0xeeeee4,
      opacity: 0.1,
      transparent: true,
    });
  }, []);

  const default_mat = gltf.materials['Default'];

  const materialMapped = useRef<{ [meshName: string]: THREE.Material | THREE.Material[] }>({});

  const default_transparent_mat = gltf.materials['Default'].clone();
  default_transparent_mat.transparent = true;
  default_transparent_mat.opacity = 0.5;

  // Loading meshe references into respective containers
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        materialMapped.current[mesh.name] = mesh.material;

        if (mesh.name[0] === 'm') {
          wallMeshRefs.current[mesh.name] = mesh;
        }
        if (mesh.name[0] === 'a') {
          artifactMeshRefs.current[mesh.name] = mesh;
        }
        if (mesh.name[0] === 'r') {
          roofRefs.current[mesh.name] = mesh;
        }
        if (mesh.name[0] === 'f') {
          mesh.visible = false;
          planeRefs.current[mesh.name] = mesh;

          let position = new THREE.Vector3();
          position.setFromMatrixPosition(mesh.matrixWorld);

          let boxSize = new THREE.Vector3();
          let planeBoundingBox = new THREE.Box3().setFromObject(mesh);
          planeBoundingBox.getSize(boxSize);

          planeCoordRefs.current[mesh.name] = { pos: position, size: { x: boxSize.x, z: boxSize.z } };
        }

        if (!isMain) {
          mesh.material = transparent_mat;
        }
      }
    });
    setLoaded(true);
  }, [gltf]);

  if (isMain) {
    useMeshUpdater({
      modeSelected,
      buildingSelected,
      floorHighlighted,
      floorSelected,
      wallMeshRefs,
      roofRefs,
      artifactMeshRefs,
      charRefs,
      materialMapped,
      transparent_mat,
      default_mat,
      default_transparent_mat,
    });
  }

  const initBuildingSelection = (buildingNum: number) => {
    if (buildingNum === buildingSelected) {
      setBuildingSelected(0);
      setFloorHighlighted(0);
    } else {
      setBuildingSelected(buildingNum);
    }
  };

  const initFloorSelection = (meshName: string) => {
    const selectedFloor = Number(meshName[3]);
    selectedFloor === floorHighlighted ? setFloorHighlighted(0) : setFloorHighlighted(selectedFloor);
  };

  const handleCharacterClick = (personKey: string) => {
    // If the clicked person is different from the currently selected one
    if (personKey !== selectedPersonKey) {
      // Reset the previously selected character to green, if any
      if (selectedPersonKey) {
        const prevInfo = personInfo[selectedPersonKey];
        const prevMesh = charRefs.current[prevInfo.building][prevInfo.level].find(
          (mesh) => mesh.userData.personKey === selectedPersonKey,
        );

        // Change the color of the previously selected character to green
        if (prevMesh && prevMesh.material instanceof THREE.MeshStandardMaterial) {
          prevMesh.material.color.set('green');
        }
      }

      // Set the new character to red
      const newInfo = personInfo[personKey];
      const newMesh = charRefs.current[newInfo.building][newInfo.level].find(
        (mesh) => mesh.userData.personKey === personKey,
      );

      // Set the person as selected
      setPersonSelected(newMesh);

      // Update the selected person key
      setSelectedPersonKey(personKey);

      // Pass the selected person's info to the parent
      onPersonSelect({
        personKey,
        info: personInfo[personKey], 
      });
    } else {
      // If the same person was clicked again
      const currentInfo = personInfo[personKey];
      const currentMesh = charRefs.current[currentInfo.building][currentInfo.level].find(
        (mesh) => mesh.userData.personKey === personKey,
      );

      // Change the color of the same character back to green
      if (currentMesh && currentMesh.material instanceof THREE.MeshStandardMaterial) {
        currentMesh.material.color.set('green');
      }

      // Reset the selected person and the key
      setPersonSelected(null);
      setSelectedPersonKey(null); // Reset the key to allow re-selecting the same person
      onPersonSelect(null); // Close the info box
    }
  };

  useEffect(() => {
    const updatedKeys = new Set(Object.keys(transformedCoords));

    // Iterate through transformedCoords to update charRefs
    Object.keys(transformedCoords).forEach((personKey) => {
      const info = personInfo[personKey]; // Retrieve building and level info

      // Initialize charRefs for this building and floor if not already done
      if (!charRefs.current[info.building]) {
        charRefs.current[info.building] = {};
      }
      if (!charRefs.current[info.building][info.level]) {
        charRefs.current[info.building][info.level] = []; // Initialize as an empty array
      }

      // Search for the person's mesh across all buildings and floors
      let previousBuilding, previousLevel, existingPersonMesh;

      // Loop through all buildings and floors to find the existing person mesh
      Object.keys(charRefs.current).forEach((building: any) => {
        Object.keys(charRefs.current[building]).forEach((floor: any) => {
          const personMeshIndex = charRefs.current[building][floor].findIndex(
            (mesh) => mesh.userData.personKey === personKey,
          );
          if (personMeshIndex !== -1) {
            existingPersonMesh = charRefs.current[building][floor][personMeshIndex];
            previousBuilding = Number(building);
            previousLevel = Number(floor);
          }
        });
      });

      if (existingPersonMesh) {
        // Check if the building or level has changed
        if (previousBuilding !== info.building || previousLevel !== info.level) {
          // Building or level has changed, remove the existing mesh and create a new one

          // Remove the existing mesh from the old building/level
          charRefs.current[previousBuilding][previousLevel] = charRefs.current[previousBuilding][previousLevel].filter(
            (mesh) => mesh.userData.personKey !== personKey,
          );

          // Now, we will create a new mesh for the updated building/level
          const newPersonMesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 32), // Example sphere geometry
            new THREE.MeshStandardMaterial({ color: 'green' }), // Example material
          );

          newPersonMesh.userData.personKey = personKey; // Store the personKey on the mesh

          // Position the new mesh at the updated coordinates
          const coord = transformedCoords[personKey];
          newPersonMesh.position.set(coord.x, coord.y, coord.z);

          // Initialize the new building and level in charRefs if necessary
          if (!charRefs.current[info.building]) {
            charRefs.current[info.building] = {};
          }
          if (!charRefs.current[info.building][info.level]) {
            charRefs.current[info.building][info.level] = [];
          }

          // Store the new mesh in the new building/level
          charRefs.current[info.building][info.level].push(newPersonMesh);
        } else {
          // Building or level did not change, just update the position of the existing mesh
          const coord = transformedCoords[personKey];
          existingPersonMesh.position.set(coord.x, coord.y, coord.z);
        }
      } else {
        // If the person's mesh does not exist, create a new one
        const personMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.5, 32, 32), // Example sphere geometry
          new THREE.MeshStandardMaterial({ color: 'green' }), // Example material
        );

        personMesh.userData.personKey = personKey; // Store the personKey on the mesh

        // Position the mesh based on the transformed coordinates
        const coord = transformedCoords[personKey];
        personMesh.position.set(coord.x, coord.y, coord.z);

        // Add the new mesh for the person under the building and floor
        charRefs.current[info.building][info.level].push(personMesh);
      }
    });

    // Iterate through charRefs and remove persons who no longer exist in transformedCoords
    Object.keys(charRefs.current).forEach((building: any) => {
      Object.keys(charRefs.current[building]).forEach((floor: any) => {
        charRefs.current[building][floor] = charRefs.current[building][floor].filter((mesh) => {
          if (!updatedKeys.has(mesh.userData.personKey)) {
            return false; // Remove the mesh
          }
          return true; // Keep the mesh if the person still exists
        });
      });
    });
  }, [transformedCoords, personInfo]);

  return (
    <>
      <primitive object={gltf.scene} />
      {isMain && modeSelected === 2 && buildingSelected !== 0 && (
        <FloorButtons onClick={initFloorSelection} building={buildingSelected} />
      )}
      isMain && <BuildingButtons onClick={initBuildingSelection} building={buildingSelected} />
      {isMain &&
        Object.keys(charRefs.current).map((building: any) =>
          Object.keys(charRefs.current[building]).map((floor: any) =>
            charRefs.current[building][floor].map((personMesh, index) => (
              <primitive
                key={`${building}-${floor}-${index}`}
                object={personMesh}
                scale={0.2}
                onClick={() => handleCharacterClick(personMesh.userData.personKey)} // Access the personKey from userData
              />
            )),
          ),
        )}
      {modeSelected === modeKey['building'] && <FloorInfoCard charRef={charRefs} />}
      {!isMain && loaded && <TrackingManager data={personData} />}
      {isMain && loaded && <CharacterRenderer charRef={charRefs} />}
    </>
  );
};

export default Model;
