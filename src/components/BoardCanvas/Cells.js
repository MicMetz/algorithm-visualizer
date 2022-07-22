import * as React                                            from 'react';
import {useEffect, useRef, useMemo, useState, createContext} from 'react';
import {a}                                                   from '@react-spring/three';
import {useAnimationHook, useGenerateMazeHook, useSolver}    from './Layouts';
import {directions}                                          from '../Algorithms/Maze/Directions';
import {_FindCell}                                           from '../Algorithms/Maze/Tools';
import board                                                 from './Board';
import {BinaryTreeCreation}                                  from '../Algorithms/Maze/Generation/BinaryTreeCreation';
import {
  FLOOR_TYPE, FLOOR_COLOR, WALL_TYPE, WALL_COLOR,
  getColor, GOAL_TYPE, START_TYPE, SELECTED_COLOR,
  BURN_COLOR, PATH_TYPE, PATH_COLOR,
}                                                            from '../../Utility/Colors';
// import {BufferPoints}                                                                                                                       from './Point';
import {Object3D, Color}                                     from 'three';
import * as THREE                                            from 'three';
// import {PointEvent}      from './Point';




const tempOBJ = new THREE.Object3D();



function updateInstancedMeshMatrices({mesh, board, colorAttrib, colorArray}) {
  if (!mesh) {
    return;
  }
  const numPoints = board.length;

  // transform mesh to world space
  for (let i = 0; i < board.length; ++i) {
    const {x, y, z} = board[i];
    tempOBJ.position.set(x, y, z);
    tempOBJ.rotation.set(0.5 * Math.PI, 0, 0); // Look at the origin
    tempCOLOR.set(getColor(board[i].type));
    tempCOLOR.toArray(colorArray, i * 3);
    tempOBJ.updateMatrix();
    mesh.setMatrixAt(i, tempOBJ.matrix);
  }
  colorAttrib.current.needsUpdate = true;
  mesh.instanceMatrix.needsUpdate = true;
}


// function updateInstancedMeshColors({mesh, board}) {
//   for (let i = 0; i < board.length; ++i) {
//     tempCOLOR.set(getColor(board[i].type));
//     mesh.setColorAt(i, tempCOLOR);
//   }
//
//   return {colorAttrib, colorArray};
//
// }


//
// tempCOLOR.update = (color) => {
//   tempCOLOR.current = color;
// }
//
// tempCOLOR.toArray = (color, i) => {
//   let rbg = THREE.Get.toArray(tempCOLOR);
//   color[i] = rbg.r;
//   color[i + 1] = rbg.g;
//   color[i + 2] = rbg.b;
// }
let tempCOLOR = new THREE.Color();

const usePointColorsHook = ({board, selectedPoint}) => {
  console.log('usePointColorsHook');
  const numPoints   = board.length;
  const colorAttrib = useRef();
  const colorArray  = useMemo(() => new Float32Array(numPoints * 3), [
    numPoints,
  ]);
  useEffect(() => {
    for (let i = 0; i < board.length; ++i) {
      tempCOLOR.set(getColor(board[i].type));
      tempCOLOR.toArray(colorArray, i * 3);
    }
    colorAttrib.current.needsUpdate = true;
  }, [board, colorArray]);

  return {colorAttrib, colorArray};
};

const _mouseClickHook = ({board, selectedPoint, onSelectPoint/* , useDrag  */}) => {
  const onMouseDownHandler = useRef([0, 0]);   // Record and maintain the handler for the mouse down event
  const onMouseUpHandler   = useRef([0, 0]);   // Record and maintain the handler for the mouse up event
  const onMouseMoveHandler = useRef([0, 0]);   // Record and maintain the handler for the mouse move event

  /*
   * Pointer Click Down Position
   */
  const setDownPointerCoord = event => {
    onMouseDownHandler.current[0] = event.clientX;  // Mouseclick x coordinate
    onMouseDownHandler.current[1] = event.clientY;  // Mouseclick y coordinate
  };

  /*
   * If the mouse has clicked on a point, if that point is occupied by an
   * interactable object, gather its reference.
   */
  const getClickTarget = event => {
    const {instanceId, clientX, clientY} = event;
    const travelDistance                 = Math.sqrt(
        Math.pow(onMouseDownHandler.current[0] - clientX, 2)
        +
        Math.pow(onMouseDownHandler.current[1] - clientY, 2),
    );

    // Prevents repeat calls to click handler unless drag selection is initiated.
    if (travelDistance > 50) {
      /* if (!useDrag) { */
      event.stopPropagation();
      return;
      // }
    }

    const point = board[instanceId];
    console.log(board[instanceId]);
    console.log('Point clicked: ', point);
    // toggle the point
    if (point === selectedPoint) {
      onSelectPoint(null);
    }
    else {
      onSelectPoint(point);
    }
  };

  return {setDownPointerCoord, getClickTarget};
};




const Cells = ({board, layoutType, mazeType, solverType, selectedPoint, onSelectPoint /*,  useDrag */}) => {
  const meshRef                = useRef();
  const boardRef               = useRef(board);
  const [activeRef, setActive] = useState(false);
  const numPoints              = board.length;



  // @Test
  board[100].type = GOAL_TYPE;
  board[1].type   = START_TYPE;

  useAnimationHook({board, layoutType});

  // useEffect(() => {
  //   console.log('useEffect');
  //   boardRef.current = board;
  //   layoutRef.current = layoutType;
  //   mazeRef.current = mazeType;
  //   solverRef.current = solverType;
  //   pathRef.current = Array.from(board).filter(point => point.type === PATH_TYPE);
  // }, [board, layoutType, mazeType, solverType]);
  useGenerateMazeHook({board, mazeType});
  /*
   const [_Animation] = useSolver({board, solverType,
   onFrame: () => {
   updateInstancedMeshMatrices({mesh: meshRef.current, board});
   },
   }); */

  const {getClickTarget, setDownPointerCoord} = _mouseClickHook({
    board,
    selectedPoint,
    onSelectPoint,
    /* useDrag */
  });

  const {colorAttrib, colorArray} = usePointColorsHook({board, selectedPoint});


  useEffect(() => {
    console.log('Board updated');
    updateInstancedMeshMatrices({mesh: meshRef.current, board, colorAttrib, colorArray});
  }, [board]);



  return (
      <>
        <instancedMesh
            ref = {meshRef}
            args = {[null, null, numPoints]}
            frustumCulled = {false}
            onClick = {getClickTarget}
            onPointerDown = {setDownPointerCoord}
        >
          <boxBufferGeometry attach = "geometry" args = {[0.6, 0.3, 0.6, 18]}>
            <instancedBufferAttribute
                ref = {colorAttrib}
                attachObject = {['attributes', 'color']}
                array = {colorArray}
                itemSize = {3}
            />
          </boxBufferGeometry>
          <meshStandardMaterial
              attach = "material"
              vertexColors = {THREE.VertexColors}
          />
        </instancedMesh>
        {/* {generationInProgress && <a.group */}
        {/*     position = {generationInProgress.interpolate((x, y, z) => [x, y, z])} */}
        {/* />} */}
        {/* <BufferPoints numPoints={numPoints} /> */}
        {/* <BufferPoints numPoints = {numPoints}/> */}
        {selectedPoint && (
            <a.group
                position = {[
                  selectedPoint.x,
                  selectedPoint.y,
                  selectedPoint.z,
                ]}

            >
              <pointLight
                  distance = {6}
                  position = {[0, 0, 0.6]}
                  decay = {30}  // Fast defusion of light. Drop light intensity by half each second. (30 = 1/2^30). No directly select_color leaves the box.
                  intensity = {155}
                  color = {SELECTED_COLOR}
              />
              <pointLight
                  distance = {12}  // With decay: 1, distance = 5 boxes in each direction
                  position = {[0, 0.11, 0.051]}
                  decay = {10}   // Slow defusion of light
                  intensity = {20}
                  color = {BURN_COLOR}
              />
            </a.group>
        )}
      </>

  );
};


export default Cells;



