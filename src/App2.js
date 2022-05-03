import * as THREE from 'three'
import React, { useRef, Suspense, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Text, Billboard } from '@react-three/drei'
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
        <FlowerText {...props} />

        <HeroText>Porter's Five Forces</HeroText>
    
        <OrbitControls />
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
        position={[-10, 0, 0.4]}
        rotation={[0, -180, 0]}
        lineHeight={0.8}
        font="/Ki-Medium.ttf"
        fontSize={width / 8}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle"
        fillOpacity="0.2"
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

// function Flower({ base, colorA, colorB }) {
//   const mesh = useRef()
//   const depth = useRef()
//   useFrame((state, delta) => {
//     mesh.current.rotation.z += delta / 2
//     depth.current.origin.set(-state.mouse.y, state.mouse.x, 0)
//   })
//   return (
//     <mesh rotation-y={Math.PI / 2} scale={[2, 2, 2]} ref={mesh}>
//       <torusKnotGeometry args={[0.4, 0.05, 400, 32, 3, 7]} />
//       <LayerMaterial>
//         <Color color={base} alpha={1} mode="normal" />
//         <Depth colorA={colorB} colorB={colorA} alpha={0.5} mode="normal" near={0} far={3} origin={[1, 1, 1]} />
//         <Depth ref={depth} colorA={colorB} colorB="black" alpha={1} mode="lighten" near={0.25} far={2} origin={[1, 0, 0]} />
//         <Fresnel mode="softlight" color="white" intensity={0.3} power={2} bias={0} />
//       </LayerMaterial>
//     </mesh>
//   )
// }



function BillboardText() {
  const ref = useRef()
    const [hovered, setHover] = useState(false)
    useFrame((state) => {
      ref.current.scale.x = ref.current.scale.y = ref.current.scale.z = THREE.MathUtils.lerp(ref.current.scale.z, hovered ? 1.4: 1, 0.1)
    })

    const forcesText = [
      <>Rivalry {"\n"}Among {"\n"}Existing {"\n"}Competitors</>, 
      <>Threat {"\n"}of {"\n"}New {"\n"}Entrants</>,
      <>Threat {"\n"}of {"\n"}Substitutes</>,
      <>Bargaining {"\n"}Power {"\n"}of {"\n"}Suppliers</>,
      <>Bargaining {"\n"}Power {"\n"}of {"\n"}Buyers</>
     ]
    const forcesPosition = [
      [1, 0.1, 0.4],
      [0, 0.8, 0.4],
      [-0.8, 0.1, 0.4],
      [-0.6, -0.8, 0.4],
      [0.6, -0.8, 0.4]
      

    ]
    // const forcesArray = {
    //   "text": forcesText[i],
    //   "forcesPosition":  forcesPosition[i]
    // }
    
    const text = [];
    const position = [];
    let index = 0;
    for (let i=0; i<forcesText.length; i++) {
      text.push(forcesText[i].props.children);
      position.push(forcesPosition[i]);
      
      index = {i};

      // console.log(forcesPosition[i]);
      
    }
    console.log(position)

    return (
      <Text
            position={position[{index}]}
            rotation={[0, 0, 0]}
            lineHeight={1}
            font="/Ki-Medium.ttf"
            fontSize={1/8}
            material-toneMapped={false}
            anchorX="center"
            anchorY="middle"
            ref={ref}
            onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
            onPointerOut={(e) => setHover(false)}
            >
              {text}
              
          </Text>
    )
}

function FlowerText({ base, colorA, colorB }) {
    const mesh = useRef()
    const depth = useRef()
    useFrame((state, delta) => {
      mesh.current.rotation.y += delta / 2400
      depth.current.origin.set(-state.mouse.y, state.mouse.x, 0)
    })

    

    return (
      <mesh 
      // rotation-y={Math.PI * 2} 
      scale={[2, 2, 2]} 
      ref={mesh} 
      position={[0,0,1]}
      >
        <Billboard
          follow={true}
          lockX={false}
          lockY={false}
          lockZ={false} // Lock the rotation on the z axis (default=false)
        >
          <BillboardText />
          {/* <Text
            position={[1, 0.1, 0.4]}
            rotation={[0, 0, 0]}
            lineHeight={1}
            font="/Ki-Medium.ttf"
            fontSize={1/8}
            material-toneMapped={false}
            anchorX="center"
            anchorY="middle"
            ref={ref}
            onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
            onPointerOut={(e) => setHover(false)}
            >
              Rivalry {"\n"}Among {"\n"}Existing {"\n"}Competitors
          </Text>
          <Text
            position={[0, 0.8, 0.4]}
            rotation={[0, 0, 0]}
            lineHeight={1}
            font="/Ki-Medium.ttf"
            fontSize={1/8}
            material-toneMapped={false}
            anchorX="center"
            anchorY="middle"
            ref={ref}
            onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
            onPointerOut={(e) => setHover(false)}
          >
           Threat {"\n"}of {"\n"}New {"\n"}Entrants
          </Text>
          <Text
            position={[-0.8, 0.1, 0.4]}
            rotation={[0, 0, 0]}
            lineHeight={1}
            font="/Ki-Medium.ttf"
            fontSize={1/8}
            material-toneMapped={false}
            anchorX="center"
            anchorY="middle"
            ref={ref}
            onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
            onPointerOut={(e) => setHover(false)}
            >
              Threat {"\n"}of {"\n"}Substitutes
          </Text>
          <Text
            position={[-0.6, -0.8, 0.4]}
            rotation={[0, 0, 0]}
            lineHeight={1}
            font="/Ki-Medium.ttf"
            fontSize={1/8}
            material-toneMapped={false}
            anchorX="center"
            anchorY="middle"
            ref={ref}
            onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
            onPointerOut={(e) => setHover(false)}
            >
              Bargaining {"\n"}Power {"\n"}of {"\n"}Suppliers
          </Text>
          <Text
            position={[0.6, -0.8, 0.4]}
            rotation={[0, 0, 0]}
            lineHeight={1}
            font="/Ki-Medium.ttf"
            fontSize={1/8}
            material-toneMapped={false}
            anchorX="center"
            anchorY="middle"
            ref={ref}
            onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
            onPointerOut={(e) => setHover(false)}
        
          >
            Bargaining {"\n"}Power {"\n"}of {"\n"}Buyers
          </Text> */}
        </Billboard>
        
          
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