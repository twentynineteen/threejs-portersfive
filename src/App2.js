import * as THREE from 'three'
import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Text, PresentationControls } from '@react-three/drei'
import { LayerMaterial, Color, Depth, Fresnel } from 'lamina'
import { useControls } from 'leva'

export default function App2() {
  const props = useControls({
    base: { value: '#4fd1ff' },
    colorA: { value: '#8d1a70' },
    colorB: { value: '#ff8f00' }
  })
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [7.5, 0, 5], fov: 55, near: 0.001 }}>
      <Suspense fallback={null}>
        <Bg {...props} />
        {/* <PresentationControls 
            global={false} // Spin globally or by dragging the model
            cursor={true} // Whether to toggle cursor style on drag
            snap={true} // Snap-back to center (can also be a spring config)
            speed={1} // Speed factor
            zoom={2} // Zoom factor when half the polar-max is reached
            rotation={[0, 0.1, 0]} // Default rotation
            polar={[0, Math.PI / 2]} // Vertical limits
            azimuth={[-Infinity, Infinity]} // Horizontal limits
            config={{ mass: 1, tension: 170, friction: 26 }} // Spring config 
            > */}
        <FlowerText {...props} />
        {/* </PresentationControls> */}

        
        <HeroText>Porter's Five Forces</HeroText>
    
        {/* <OrbitControls /> */}
        <pointLight position={[10, 10, 5]} />
        <pointLight position={[-10, -10, -5]} color={props.colorA} />
        <ambientLight intensity={0.4} />
        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  )
}

function HeroText({ children }) {
    const { width } = useThree((state) => state.viewport)
    return (
      <Text
        position={[-1, 0, 0.4]}
        rotation={[0, 180, 0]}
        lineHeight={0.8}
        font="/Ki-Medium.ttf"
        fontSize={width / 8}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle"
        fillOpacity="0.25"
        >
        {children}
      </Text>
    )
  }

function Bg({ base, colorA, colorB }) {
  const mesh = useRef()
  useFrame((state, delta) => {
    mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += delta
  })
  return (
    <mesh ref={mesh} scale={100}>
      <sphereGeometry args={[1, 64, 64]} />
      <LayerMaterial attach="material" side={THREE.BackSide}>
        <Color color={base} alpha={1} mode="normal" />
        <Depth colorA={colorB} colorB={colorA} alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
      </LayerMaterial>
    </mesh>
  )
}

function Flower({ base, colorA, colorB }) {
  const mesh = useRef()
  const depth = useRef()
  useFrame((state, delta) => {
    mesh.current.rotation.z += delta / 2
    depth.current.origin.set(-state.mouse.y, state.mouse.x, 0)
  })
  return (
    <mesh rotation-y={Math.PI / 2} scale={[2, 2, 2]} ref={mesh}>
      <torusKnotGeometry args={[0.4, 0.05, 400, 32, 3, 7]} />
      <LayerMaterial>
        <Color color={base} alpha={1} mode="normal" />
        <Depth colorA={colorB} colorB={colorA} alpha={0.5} mode="normal" near={0} far={3} origin={[1, 1, 1]} />
        <Depth ref={depth} colorA={colorB} colorB="black" alpha={1} mode="lighten" near={0.25} far={2} origin={[1, 0, 0]} />
        <Fresnel mode="softlight" color="white" intensity={0.3} power={2} bias={0} />
      </LayerMaterial>
    </mesh>
  )
}

function FlowerText({ base, colorA, colorB }) {
    const mesh = useRef()
    const depth = useRef()
    useFrame((state, delta) => {
      mesh.current.rotation.y += delta / -600
      depth.current.origin.set(-state.mouse.y, state.mouse.x, 0)
    })
    return (
      <mesh rotation-y={Math.PI / 2} scale={[2, 2, 2]} ref={mesh} position={[0,0,1]}>
        <Text
        position={[1, 0.1, 0.4]}
        rotation={[0, 0, 0]}
        lineHeight={1}
        font="/Ki-Medium.ttf"
        fontSize={1/8}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle"
        
        >Rivalry {"\n"}Among {"\n"}Existing {"\n"}Competitors</Text>
        <Text
        position={[0, 0.8, 0.4]}
        rotation={[0, 0, 0]}
        lineHeight={1}
        font="/Ki-Medium.ttf"
        fontSize={1/8}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle"
        
        >Threat {"\n"}of {"\n"}New {"\n"}Entrants</Text>
        <Text
        position={[-0.8, 0.1, 0.4]}
        rotation={[0, 0, 0]}
        lineHeight={1}
        font="/Ki-Medium.ttf"
        fontSize={1/8}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle"
        
        >Threat {"\n"}of {"\n"}Substitutes</Text>
        <Text
        position={[-0.6, -0.8, 0.4]}
        rotation={[0, 0, 0]}
        lineHeight={1}
        font="/Ki-Medium.ttf"
        fontSize={1/8}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle"
        
        >Bargaining {"\n"}Power {"\n"}of {"\n"}Suppliers</Text>
        <Text
        position={[0.6, -0.8, 0.4]}
        rotation={[0, 0, 0]}
        lineHeight={1}
        font="/Ki-Medium.ttf"
        fontSize={1/8}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle"
        
        >Bargaining {"\n"}Power {"\n"}of {"\n"}Buyers</Text>
        {/* <torusKnotGeometry args={[0.4, 0.05, 400, 32, 3, 7]} /> */}
        <sphereGeometry args={[0.3, 64, 64]} />
        <LayerMaterial>
          <Color color={base} alpha={1} mode="normal" />
          <Depth colorA={colorB} colorB={colorA} alpha={0.5} mode="normal" near={0} far={3} origin={[1, 1, 1]} />
          <Depth ref={depth} colorA={colorB} colorB="black" alpha={1} mode="lighten" near={0.25} far={2} origin={[1, 0, 0]} />
          <Fresnel mode="softlight" color="white" intensity={0.3} power={2} bias={0} />
        </LayerMaterial>
      </mesh>
    )
  }