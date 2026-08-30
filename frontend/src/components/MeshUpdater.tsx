import { useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { MeshDict, CharRefsType } from '../data/Types';
import { modeKey } from './Context/SelectionContext';
import gsap from 'gsap';

interface MeshUpdaterParams {
  modeSelected: number;
  buildingSelected: number;
  floorHighlighted: number;
  floorSelected: number;
  wallMeshRefs: React.MutableRefObject<MeshDict>;
  roofRefs: React.MutableRefObject<MeshDict>;
  artifactMeshRefs: React.MutableRefObject<MeshDict>;
  charRefs: React.MutableRefObject<CharRefsType>;
  materialMapped: React.MutableRefObject<{ [meshName: string]: THREE.Material | THREE.Material[] }>;
  transparent_mat: THREE.MeshPhongMaterial;
  default_mat: THREE.Material;
  default_transparent_mat: THREE.Material;
}

export const useMeshUpdater = ({
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
}: MeshUpdaterParams) => {
  const applyTransparentMat = useCallback(
    (mesh: THREE.Mesh) => {
      if (!Array.isArray(mesh.material)) {
        mesh.material = transparent_mat;
      }
    },
    [transparent_mat],
  );

  const applyLowOpacityMat = useCallback(
    (mesh: THREE.Mesh) => {
      if (!Array.isArray(mesh.material)) {
        mesh.material = default_transparent_mat;
      }
    },
    [default_transparent_mat],
  );

  const applyDefaultMat = useCallback(
    (mesh: THREE.Mesh) => {
      if (!Array.isArray(mesh.material)) {
        mesh.material = default_mat;
      }
    },
    [default_mat],
  );

  useEffect(() => {
    if (modeSelected === modeKey['exterior']) {
      Object.keys(roofRefs.current).forEach((name) => {
        roofRefs.current[name].material = materialMapped.current[name];
      });
      Object.keys(wallMeshRefs.current).forEach((name) => {
        wallMeshRefs.current[name].material = materialMapped.current[name];
      });
      Object.keys(artifactMeshRefs.current).forEach((name) => {
        //artifactMeshRefs.current[name].material = materialMapped.current[name];
        artifactMeshRefs.current[name].visible = true;
      });
    } else if (modeSelected === modeKey['navigation']) {
      Object.keys(wallMeshRefs.current).forEach((name) => {
        applyTransparentMat(wallMeshRefs.current[name]);
      });
      Object.keys(roofRefs.current).forEach((name) => {
        applyTransparentMat(roofRefs.current[name]);
      });
      Object.keys(artifactMeshRefs.current).forEach((name) => {
        //applyTransparentMat(artifactMeshRefs.current[name]);
        artifactMeshRefs.current[name].visible = false;
      });
      if (floorSelected !== 0) {
        Object.keys(roofRefs.current).forEach((name) => {
          applyTransparentMat(roofRefs.current[name]);
        });
        Object.keys(wallMeshRefs.current).forEach((name) => {
          parseInt(name[3]) === floorSelected
            ? applyDefaultMat(wallMeshRefs.current[name])
            : applyTransparentMat(wallMeshRefs.current[name]);
        });
      }
    } else if (modeSelected === modeKey['building']) {
      Object.keys(wallMeshRefs.current).forEach((name) => {
        applyDefaultMat(wallMeshRefs.current[name]);
      });
      Object.keys(roofRefs.current).forEach((name) => {
        applyTransparentMat(roofRefs.current[name]);
      });
      Object.keys(artifactMeshRefs.current).forEach((name) => {
        //applyTransparentMat(artifactMeshRefs.current[name]);
        artifactMeshRefs.current[name].visible = false;
      });
      if (buildingSelected === 0) {
        // No building selected
        Object.keys(wallMeshRefs.current).forEach((name) => {
          applyDefaultMat(wallMeshRefs.current[name]);
        });
        Object.keys(roofRefs.current).forEach((name) => {
          applyDefaultMat(roofRefs.current[name]);
        });
      } else {
        // Any one of building selected
        Object.keys(wallMeshRefs.current).forEach((name) => {
          if (!name.includes(`m${buildingSelected.toString()}`)) {
            applyTransparentMat(wallMeshRefs.current[name]);
          }
        });

        Object.keys(roofRefs.current).forEach((name) => {
          applyTransparentMat(roofRefs.current[name]);

          if (buildingSelected === 2 && (name === 'monash_icon' || name === 'monash_icon_1')) {
            roofRefs.current['monash_icon'].material = transparent_mat;
            roofRefs.current['monash_icon_1'].material = transparent_mat;
          }
        });

        if (floorHighlighted === 0) {
          Object.keys(wallMeshRefs.current).forEach((name) => {
            if (name.includes(`m${buildingSelected.toString()}`)) {
              applyLowOpacityMat(wallMeshRefs.current[name]);
            }
          });
        } else {
          const floorMeshName = `m${buildingSelected.toString()}-${floorHighlighted.toString()}`;
          Object.keys(wallMeshRefs.current).forEach((name) => {
            applyTransparentMat(wallMeshRefs.current[name]);
          });
          Object.keys(wallMeshRefs.current).forEach((name) => {
            if (name.includes(floorMeshName)) {
              applyLowOpacityMat(wallMeshRefs.current[name]);
            }
          });
        }
      }
    }
  }, [modeSelected, buildingSelected, floorHighlighted, floorSelected]);

  // useEffect(() => {
  //   if (floorSelected !== 0){
  //     Object.keys(charRefs.current).forEach((Number(building)) => {
  //       Object.keys(charRefs.current[building]).forEach((floor) => {

  //       });
  //     });
  //   }
  // }, [floorSelected, charRefs])
};
