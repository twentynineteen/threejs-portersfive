import React from "react";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Text, ContactShadows } from "@react-three/drei";
import { LayerMaterial, Depth } from 'lamina'
import { Physics, usePlane, useBox } from "@react-three/cannon";
import * as THREE from 'three';
import "./App.css";
import { SphereBufferGeometry } from "three";

function Ball() {
  return (
    <mesh >
      <SphereBufferGeometry attach="geometry" />
      <LayerMaterial
        color="#fff555"
        alpha={1}
        lighting="physical"
        transmission={1}/>
    </mesh>
  )
}

function Box() {
  const [ref, api] = useBox(() => ({mass: 1, position: [0, 10, 0], rotation: [2,15,0]}));
  const displacementMap = useLoader(THREE.TextureLoader, 'map.png')

  
    
  return (
    <mesh onClick={() => {
      api.velocity.set(1, 5, 0);
    }} ref={ref} position={[0,2,0]}>
      <boxBufferGeometry attach="geometry" />
      {/* <meshStandardMaterial 
        attach="material" 
        color="hotpink" 
        // clearcoat={1}
        // sheen={.8}
        // transmission={.2}
        // roughness={1}
        // metalness={0.5}
        // normalMap={displacementMap} 


        /> */}
        <LayerMaterial 
        color="#fe96dc"
        alpha={1}
        lighting="physical"
        transmission={1}/>
    
    </mesh>
  );
}


function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh position={[0,0,0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100,100]}/>
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}
function PlaneVert() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh position={[-20,0,0]} rotation={[0, -100, 0]}>
      <planeBufferGeometry attach="geometry" args={[100,100]}/>
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}
function PlaneVert2() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh position={[25,0,0]} rotation={[0, 100, 0]}>
      <planeBufferGeometry attach="geometry" args={[100,100]}/>
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}

function Camera() {
  const { camera } = useThree()
  // console.log(camera.position);
  return <mesh />
}

function HeroText({ children }) {
  const { width } = useThree((state) => state.viewport)
  return (
    <Text
      position={[0, 1, -2]}
      rotation={[0, 0, 0]}
      lineHeight={0.8}
      font="/Ki-Medium.ttf"
      fontSize={width / 8}
      material-toneMapped={false}
      anchorX="center"
      anchorY="middle"
      >
      {children}
    </Text>
  )
}


export default function App() {
  return (
    <Canvas 
      
      camera={{
        fov: 5,
        near: 0.1,
        far: 1000,
        z: 1,
        position: [0, 10, 60 ],
        
        }
    }>
      <Camera />

      <OrbitControls />
      <ambientLight intensity={0.1}  />
      <ContactShadows opacity={0.6} scale={15} blur={3.5} far={10} resolution={512} color="#000000" />
      <spotLight 
        position={[5,5,1]}
        angle={0.5} 
        // castShadow={true}
        intensity={0.2}
        
        
      />
      <HeroText >Hello</HeroText>
      <Ball />
      <Physics>
      <Box />
      <Plane />
      <PlaneVert />
      <PlaneVert2 />
      </Physics>
    </Canvas>
  );
}
