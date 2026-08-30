import * as THREE from 'three';

export type MeshDict = {
  [key: string]: THREE.Mesh;
};

export type CoordDict = {
  pos: THREE.Vector3;
  size: { x: number; z: number };
};
export type PlaneDict = {
  [key: string]: CoordDict;
};

export interface Coordinate {
  lat: number;
  lng: number;
  level: number; // Correct: level should be a number, not a function
  building: number;
}

export interface PersonCoords {
  [key: string]: Coordinate[];
}

export interface TransformedCoords {
  x: number;
  y: number;
  z: number;
}

export interface PersonTransformedCoords {
  [key: string]: TransformedCoords;
}

// Define a type for the person info
export interface PersonInfo {
  lng: number;
  lat: number;
  level: number;
  building: number;
}
export interface SelectedPerson {
  personKey: string;
  info: PersonInfo;
}
export type CharRefsType = {
  [building: number]: {
    [floor: number]: THREE.Mesh[]; // Storing THREE.Mesh instead of string[]
  };
};
