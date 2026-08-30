import { Euler, Vector3 } from 'three';

export {
  Constants,
  WallGroup,
  PlaneGroup,
  FloorButtonPos,
  RoofGroup,
  BuildingButtonPos,
  BuildingFocusAttr,
  floorFocusAttr,
  glPalette,
  coordPlaneSize,
  coordPlaneOrigin,
};

const Constants = {
  lng_origin: 101.59982,
  lat_origin: 3.062932,
  lng_edge: 101.601329,
  lat_edge: 3.064969,
};

type MeshGroupType = {
  [key: number]: { [key: number]: string };
};

const WallGroup: MeshGroupType = {
  2: {
    1: 'm2-1',
    2: 'm2-2',
    3: 'm2-3',
    4: 'm2-4',
    5: 'm2-5',
    6: 'm2-6',
    7: 'm2-7',
  },
  3: {
    1: 'm3-1',
    2: 'm3-2',
    3: 'm3-3',
    4: 'm3-4',
    5: 'm3-5',
    6: 'm3-6',
    7: 'm3-7',
  },
  4: {
    1: 'm4-1',
    2: 'm4-2',
    3: 'm4-3',
    4: 'm4-4',
    5: 'm4-5',
    6: 'm4-6',
    7: 'm4-7',
    8: 'm4-8',
    9: 'm4-9',
  },
  5: {
    1: 'm5-1',
    2: 'm5-2',
    3: 'm5-3',
    4: 'm5-4',
    5: 'm5-5',
    6: 'm5-6',
    7: 'm5-7',
    8: 'm5-8',
    9: 'm5-9',
  },
  9: {
    1: 'm9-1',
    2: 'm9-2',
    3: 'm9-3',
    4: 'm9-4',
    5: 'm9-5',
    6: 'm9-6',
  },
  6: {
    1: 'm6-1',
    2: 'm6-2',
    3: 'm6-3',
    4: 'm6-4',
    5: 'm6-5',
    6: 'm6-6',
  },
};

const PlaneGroup: MeshGroupType = {
  1: 'f1',
  2: 'f2',
  3: 'f3',
  4: 'f4',
  5: 'f5',
  6: 'f6',
  7: 'f7',
  8: 'f8',
  9: 'f9',
};

const RoofGroup: MeshGroupType = {
  2: 'r2',
  3: 'r3',
  4: 'r4',
  5: 'r5',
  6: 'r6',
  9: 'r9',
  10: 'monash_icon',
  11: 'monash_icon_1',
};

type ButtonPos = [number, number, number];

type FloorBtnPosContainer = {
  [buildingNumber: number]: { [floorNumber: number]: ButtonPos };
};

type BuildingBtnPosContainer = {
  [buildingNumber: number]: ButtonPos;
};

const BuildingButtonPos: BuildingBtnPosContainer = {
  2: [-3, 5, -7],
  3: [5.5, 5, -5],
  4: [5.5, 6, 5],
  5: [0.5, 6, 5],
  6: [-6, 5, 4],
  9: [-3, 4, 0],
};

const FloorButtonPos: FloorBtnPosContainer = {
  2: {
    1: [-6, 1, -6],
    2: [-6, 1.5, -6],
    3: [-6, 2, -6],
    4: [-6, 2.5, -6],
    5: [-6, 3, -6],
    6: [-6, 3.5, -6],
    7: [-6, 4, -6],
  },
  3: {
    1: [6, 1.5, 0],
    2: [6, 2, -0.5],
    3: [6, 2.5, -1],
    4: [6, 3, -1.5],
    5: [6, 3.5, -2],
    6: [6, 4, -2.5],
    7: [6, 4.5, -3],
  },
  4: {
    1: [6, 1.5, 4],
    2: [6, 2, 4.5],
    3: [6, 2.5, 5],
    4: [6, 3, 5.5],
    5: [6, 3.5, 6],
    6: [6, 4, 6.5],
    7: [6, 4.5, 7],
    8: [6, 5, 7.5],
    9: [6, 5.5, 8],
  },
  5: {
    1: [1, 1.5, 4],
    2: [1, 2, 4.5],
    3: [1, 2.5, 5],
    4: [1, 3, 5.5],
    5: [1, 3.5, 6],
    6: [1, 4, 6.5],
    7: [1, 4.5, 7],
    8: [1, 5, 7.5],
    9: [1, 5.5, 8],
  },
  9: {
    1: [-2, 1.5, 0],
    2: [-2, 2, -0.5],
    3: [-2, 2.5, -1],
    4: [-2, 3, -1.5],
    5: [-2, 3.5, -2],
    6: [-2, 4, -2.5],
  },
  6: {
    1: [-6.2, 1.5, 6],
    2: [-5.9, 2, 6.5],
    3: [-5.6, 2.5, 7],
    4: [-5.3, 3, 7.5],
    5: [-5, 3.5, 8],
    6: [-5, 4, 8.5],
  },
};

type Position = {
  x: number;
  y: number;
  z: number;
};

type Rotation = {
  _x: number;
  _y: number;
  _z: number;
};

type BuildingFocusAttr = {
  pos: Vector3;
  rotation: Euler;
};

type FloorFocusAttr = {
  pos: Vector3;
};

type FloorFocusAttrType = {
  [key: number]: FloorFocusAttr;
};

type BuildingFocusAttrType = {
  [key: number]: BuildingFocusAttr;
};

const glPalette: { [key in 0 | 1 | 2]: string } = {
  0: '#111827',
  1: '#000000',
  2: '#000000',
};

type Coordinate = {
  x: number;
  y: number;
  z: number;
};

// Define the type for coordPlaneOrigin
const coordPlaneOrigin: { [key: number]: Coordinate } = {
  1: { x: -10.567272186279297, y: 0, z: 14.482547760009766 },
  2: { x: -10.567272186279297, y: 0.5264431834220886, z: 14.482547760009766 },
  3: { x: -10.567272186279297, y: 1.052886962890625, z: 14.482547760009766 },
  4: { x: -10.567272186279297, y: 1.5793309211730957, z: 14.482547760009766 },
  5: { x: -10.567272186279297, y: 2.1057748794555664, z: 14.482547760009766 },
  6: { x: -10.567272186279297, y: 2.632218360900879, z: 14.482547760009766 },
  7: { x: -10.567272186279297, y: 3.158661365509033, z: 14.482547760009766 },
  8: { x: -10.567272186279297, y: 3.629526138305664, z: 14.482547760009766 },
  9: { x: -10.567272186279297, y: 4.149323463439941, z: 14.482547760009766 },
};

// Define the type for coordPlaneSize
const coordPlaneSize: { x: number; z: number } = {
  x: 19.136865615844727,
  z: 25.06753921508789,
};

const BuildingFocusAttr: BuildingFocusAttrType = {
  2: {
    pos: new Vector3(-4.085850226168772, 3.039084363112881, -15.112404854802378),
    rotation: new Euler(-2.8866136162722515, -0.26588745395330365, -3.0757159369690115),
  },
  3: {
    pos: new Vector3(13.83347586812238, 2.819449360878915, -11.714647240799986),
    rotation: new Euler(-2.9054073825854325, 0.85422799427573, 2.9620606377119287),
  },
  4: {
    pos: new Vector3(14.109413248238218, 3.8588646323764446, 11.071627069628043),
    rotation: new Euler(-0.33537031670078404, 0.8774403338417077, 0.261903908448894),
  },
  5: {
    pos: new Vector3(8.247233742448524, 3.492990200477616, 14.950454667335757),
    rotation: new Euler(-0.2295205877501534, 0.49294058072343316, 0.1101144525656468),
  },
  6: {
    pos: new Vector3(-10.51760017772465, 3.6068324682742383, 17.016540501207416),
    rotation: new Euler(-0.20886903512064856, -0.5438298820781979, -0.10923537248470053),
  },
  9: {
    pos: new Vector3(-6.945799652485606, 4.147764278574444, -6.590618679248505),
    rotation: new Euler(-2.579875882015486, -0.7283513666105773, -2.744886077536955),
  },
};

const floorFocusAttr: FloorFocusAttrType = {
  2: {
    pos: new Vector3(-0.21774107691531763, 10, -8.239484427271282),
  },
  3: {
    pos: new Vector3(7.265721951520112, 10.000002631129773, -4.806408842476452),
  },
  4: {
    pos: new Vector3(7.145158691119331, 9.999995428064143, 4.87965872532691),
  },
  5: {
    pos: new Vector3(2.3317940967754165, 10.000033122308935, 5.6873533903915785),
  },
  6: {
    pos: new Vector3(-5.149067413540745, 9.99999480217161, 5.51526562651841),
  },
  9: {
    pos: new Vector3(-2.162836804434808, 10.00000185449635, -1.3875184847853372),
  },
};
