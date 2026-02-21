'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Environment, PerspectiveCamera } from '@react-three/drei';

function GarageScene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 4]} intensity={2} color="#d4b4ff" />
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[28, 1, 28]} />
        <meshStandardMaterial color="#111216" />
      </mesh>
      <mesh position={[0, 0.9, -8]}>
        <boxGeometry args={[14, 3, 0.2]} />
        <meshStandardMaterial emissive="#4ec9ff" emissiveIntensity={1.2} color="#202228" />
      </mesh>
      <mesh position={[-2, 0.2, 2]}>
        <boxGeometry args={[3.8, 1, 2]} />
        <meshStandardMaterial color="#cf1f25" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[3, 0.2, 2]}>
        <boxGeometry args={[3.8, 1, 2]} />
        <meshStandardMaterial color="#f3bf1c" metalness={0.8} roughness={0.2} />
      </mesh>
      <Sky sunPosition={[100, 8, 10]} />
      <Environment preset="night" />
    </>
  );
}

export function SceneCanvas() {
  return (
    <div className="h-[70vh] w-full overflow-hidden rounded-2xl border border-zinc-800">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[8, 4, 10]} />
        <GarageScene />
        <OrbitControls enablePan enableZoom maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
}
