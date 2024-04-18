import { Suspense, useRef, useState } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Scroll,
  ScrollControls,
  useScroll,
  Image as ImageImpl,
  Preload,
} from "@react-three/drei";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
} from "./Content/Content";
import "./App.css";

function App() {
  function Image({ c = new THREE.Color(), ...props }) {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    useFrame(() => {
      ref.current.material.color.lerp(
        c.set(hovered ? "white" : "#ccc"),
        hovered ? 0.4 : 0.05
      );
    });
    return (
      <ImageImpl
        ref={ref}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        {...props}
      />
    );
  }
  Image.propTypes = {
    c: PropTypes.object, 
  };


  function Images() {
    const { height, width } = useThree((state) => state.viewport);
    const data = useScroll();
    const group = useRef();

    useFrame(() => {
      group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
      group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
      group.current.children[2].material.zoom =
        1 + data.range(1.15 / 3, 1 / 3) / 3;
      group.current.children[3].material.zoom =
        1 + data.range(1.15 / 3, 1 / 3) / 2;
      group.current.children[4].material.zoom =
        1 + data.range(1.25 / 3, 1 / 3) / 1;
      group.current.children[5].material.zoom =
        1 + data.range(1.8 / 3, 1 / 3) / 3;
      group.current.children[6].material.zoom =
        1 + (1 - data.range(2 / 3, 1 / 3)) / 3;
      group.current.children[7].material.zoom =
        1 + (1 - data.range(2 / 3, 1 / 3)) / 3;
      group.current.children[8].material.zoom =
        1 + data.range(1.15 / 3, 1 / 3) / 3;
      group.current.children[9].material.zoom =
        1 + data.range(1.15 / 3, 1 / 3) / 3;
    });

    return (
      <group ref={group}>
        <Image position={[-1, 0, 0]} scale={[4, height, 1]} url={image1} />
        <Image position={[4, 0, 1]} scale={5} url={image2} />
        <Image position={[-3, -height, 2]} scale={[2, 3, 1]} url={image3} />
        <Image position={[-0.6, -height, 3]} scale={[1, 2, 1]} url={image4} />
        <Image position={[0.75, -height, 3.5]} scale={1.5} url={image5} />
        <Image
          position={[0, -height * 1.5, 2.5]}
          scale={[1.5, 3, 1]}
          url={image6}
        />
        <Image
          position={[0, -height * 2 - height / 4, 0]}
          scale={[width, height / 2, 1]}
          url={image7}
        />
        <Image
          position={[-5, -height * 2.7 - height / 3, 0]}
          scale={[5, height, 1]}
          url={image8}
        />
        <Image
          position={[-2, -height * 3 - height, 2]}
          scale={[3, 3, 1]}
          url={image9}
        />
        <Image
          position={[1.5, -height * 3 - height, 2]}
          scale={[3, 3, 1]}
          url={image10}
        />
      </group>
    );
  }
  return (
    <>
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ScrollControls damping={5} pages={5}>
            <Scroll>
              <Images />
            </Scroll>
            <Scroll html>
              <h1 style={{ position: "absolute", top: "60vh", left: "0.2em" }}>
                Scroll
              </h1>
              <h1 style={{ position: "absolute", top: "120vh", left: "60vw" }}>
                Down
              </h1>
              <h1
                style={{
                  position: "absolute",
                  top: "210.5vh",
                  left: "0.5vw",
                  fontSize: "20vw",
                }}
              >
                Further
              </h1>
              <h1
                style={{
                  position: "absolute",
                  top: "330.5vh",
                  left: "50rem",
                  fontSize: "10vw",
                }}
              >
                For Magic
              </h1>
              <p
                style={{
                  position: "absolute",
                  top: "450.5vh",
                  left: "50rem",
                  fontSize: "2vw",
                }}
              >
                © Copyright Randip Leon
              </p>
            </Scroll>
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
