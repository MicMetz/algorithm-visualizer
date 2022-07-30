import React, {useMemo, useRef, useState} from 'react';
// import {MathUtils}                        from 'three';
import face1                              from './assets/face1.jpg';
import face2                              from './assets/face2.jpg';
import face3                              from './assets/face3.jpg';
import face4                              from './assets/face4.jpg';
import face5                              from './assets/face5.jpg';
import face6                              from './assets/face6.jpg';
import {useFrame}                         from 'react-three-fiber';
// import {useCubeTexture}                   from '@react-three/drei';
import * as THREE                         from 'three';




export default function Dice6({count, position = [0, 0, 0], rotation = [0, 0, 0]}) {
  const mesh                = useRef();
  const [active, setActive] = useState(false);
  // const texture             = useMemo(() => new TextureLoader().load(face1), []);
  // const texture             = useCubeTexture([face1, face2, face3, face4, face5, face6]);


  return (
      /* <mesh ref = {mesh}>
       <boxGeometry
       attach = {'geometry'}
       width = {5} height = {2} depth = {5}
       castShadow = {true} receiveShadow = {true}
       />
       <meshStandardMaterial attachArray = {'material'} color = {0xff0ff0}/>
       <meshStandardMaterial attachArray = {'material'} color = {0xff0ff0}/>
       <meshStandardMaterial attachArray = {'material'} color = {0xff0ff0}/>
       <meshStandardMaterial attachArray = {'material'} color = {0xff0ff0}/>
       <meshStandardMaterial attachArray = {'material'} color = {0xff0ff0}/>
       <meshStandardMaterial attachArray = {'material'} color = {0xff0ff0}/>
       </mesh> */
      <mesh
          ref = {mesh}
          position = {position}
          rotation = {rotation}
          onClick = {() => setActive(!active)}
      >
        <boxBufferGeometry attach = {'geometry'} width = {5} height = {5}/>
        <meshBasicMaterial attach = "material" transparent side = {THREE.DoubleSide}>
          {/* <primitive attach = "map" object = {texture}/> */}
        </meshBasicMaterial>
      </mesh>
  );
}
