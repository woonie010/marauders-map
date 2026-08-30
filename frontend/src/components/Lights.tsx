import { Environment, Lightformer } from '@react-three/drei';

const Lights = () => {
  return (
    <group name="lights">
      {/* Environment provides ambient light and background */}
      <Environment preset="sunset" resolution={256}>
        <group>
          {/* Lightformers create custom lights */}
          <Lightformer form="rect" intensity={5} position={[-1, 0, -10]} scale={10} color={'#495057'} />
          <Lightformer form="rect" intensity={5} position={[-10, 2, 1]} scale={10} rotation-y={Math.PI / 2} />
          <Lightformer form="rect" intensity={5} position={[10, 0, 1]} scale={10} rotation-y={Math.PI / 2} />
        </group>
      </Environment>
    </group>
  );
};

export default Lights;
