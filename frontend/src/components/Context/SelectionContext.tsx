'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { glPalette } from '@/data/Constants';
import { Mesh } from 'three';
export { modeKey };

const modeKey = {
  exterior: 0,
  navigation: 1,
  building: 2,
};

// Define the shape of the context
interface SelectionContextType {
  modeSelected: number;
  setModeSelected: (mode: number) => void;
  buildingSelected: number;
  setBuildingSelected: (building: number) => void;
  floorHighlighted: number;
  setFloorHighlighted: (floor: number) => void;
  floorSelected: number;
  setFloorSelected: (floor: number) => void;
  personSelected: Mesh | undefined;
  setPersonSelected: (person: Mesh | undefined) => void;
  isOrthographic: boolean;
  setIsOrthographic: (toggle: boolean) => void;
  twoDChosen: boolean;
  setTwoDChosen: (toggle: boolean) => void;
  controlsOff: boolean;
  setControlsOff: (toggle: boolean) => void;
  glColor: string;
  setGlColor: (newColor: string) => void;
  timeSelected: number;
  setTimeSelected: (time: number) => void;
  jsonSelected: string;
  setJsonSelected: (jsonName: string) => void;
}

// Create the context with default values
const SelectionContext = createContext<SelectionContextType>({
  modeSelected: modeKey['exterior'],
  setModeSelected: () => {},
  buildingSelected: 0,
  setBuildingSelected: () => {},
  floorHighlighted: 0,
  setFloorHighlighted: () => {},
  floorSelected: 0,
  setFloorSelected: () => {},
  personSelected: undefined,
  setPersonSelected: () => {},
  isOrthographic: false,
  setIsOrthographic: () => {},
  twoDChosen: false,
  setTwoDChosen: () => {},
  controlsOff: false,
  setControlsOff: () => {},
  glColor: glPalette[0],
  setGlColor: () => {},
  jsonSelected: '/json_generater/track_test.json',
  setJsonSelected: () => {},
  timeSelected: 0,
  setTimeSelected: () => {},
});

// Define the type for props (including children)
interface SelectionProviderProps {
  children: ReactNode;
}

// Context provider component
export const SelectionProvider: React.FC<SelectionProviderProps> = ({ children }) => {
  const [modeSelected, setModeSelected] = useState<number>(0);
  const [buildingSelected, setBuildingSelected] = useState<number>(0);
  const [floorHighlighted, setFloorHighlighted] = useState<number>(0);
  const [floorSelected, setFloorSelected] = useState<number>(0);
  const [personSelected, setPersonSelected] = useState<Mesh | undefined>(undefined);
  const [isOrthographic, setIsOrthographic] = useState<boolean>(false);
  const [twoDChosen, setTwoDChosen] = useState<boolean>(false);
  const [controlsOff, setControlsOff] = useState<boolean>(false);
  const [glColor, setGlColor] = useState<string>(glPalette[0]);
  const [jsonSelected, setJsonSelected] = useState<string>('/json_generater/track_test.json');
  const [timeSelected, setTimeSelected] = useState<number>(0);

  return (
    <SelectionContext.Provider
      value={{
        modeSelected,
        setModeSelected,
        buildingSelected,
        setBuildingSelected,
        floorHighlighted,
        setFloorHighlighted,
        floorSelected,
        setFloorSelected,
        personSelected,
        setPersonSelected,
        isOrthographic,
        setIsOrthographic,
        twoDChosen,
        setTwoDChosen,
        controlsOff,
        setControlsOff,
        glColor,
        setGlColor,
        jsonSelected,
        setJsonSelected,
        timeSelected,
        setTimeSelected,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

// Custom hook to use the context
export const useSelection = () => {
  return useContext(SelectionContext);
};
