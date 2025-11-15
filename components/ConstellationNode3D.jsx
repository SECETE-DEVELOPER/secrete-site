'use client';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useInteraction } from '../context/InteractionContext';

export function ConstellationNode({ id, position, taskType = 'generic', onComplete = () => {} }) {
  const meshRef = useRef(null);
  const glowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { unlockNode } = useInteraction();

  const completeTask = () => {
    if (isCompleted) return;
    console.log(`✅ Node completed: ${id}`);
    setIsCompleted(true);
    unlockNode(id);
    onComplete(id);
  };

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.003;
    meshRef.current.rotation.y += 0.005;

    if (glowRef.current) {
      const intensity = isCompleted ? 2 : isHovered ? 1.5 : 0.8;
      glowRef.current.material.emissiveIntensity = intensity;
    }
  });

  const handlePointerEnter = (e) => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const handlePointerLeave = (e) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    completeTask();
  };

  const getNodeColor = () => {
    if (isCompleted) return '#ff1493';
    if (isHovered) return '#ff69b4';
    return '#ff1493';
  };

  const color = getNodeColor();

  return (
    <group position={position}>
      {/* Main interactive mesh */}
      <mesh
        ref={meshRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        scale={2}
        castShadow
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 2.5 : 1.2}
          wireframe={false}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef} scale={isHovered ? 2.8 : 2.4} raycast={() => null}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isHovered ? 0.5 : 0.2}
        />
      </mesh>
    </group>
  );
}
