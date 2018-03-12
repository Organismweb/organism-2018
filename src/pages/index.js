import React, {Component} from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import * as THREE from 'three'
import titleFontFile from '../fonts/cormorant-garamond-bold.json'
import subTitleFontFile from '../fonts/barlow-regular.json'

class IndexPage extends Component {
  componentDidMount() {
    const canvas = this.canvas
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const screenXCenter = width / 2
    const screenYCenter = height / 2

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0b0b0b)

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 500)

    // Renderer
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize(width, height)

    // Ambient light
    const ambientLight = new THREE.AmbientLight( 0x404040, 0.5 ); 
    ambientLight.name = 'Ambient Light'
    scene.add( ambientLight );

    // Directional light
    const pointerLight = new THREE.PointLight(0xffffff, 0.5)
    pointerLight.name = 'Pointer Light'
    scene.add( pointerLight )
  
    // Title font
    let fontLoader = new THREE.FontLoader()
    const titleFont = fontLoader.parse(titleFontFile)
    
    const titleText = 'Organism'
    const titleMaterial = new THREE.MeshBasicMaterial( {
      color: new THREE.Color(0xFF001F),
    })
    const titleShapes = titleFont.generateShapes( titleText, 42);
    const titleGeo = new THREE.ShapeGeometry( titleShapes )

    titleGeo.computeBoundingBox()
    titleGeo.center()

    const title = new THREE.Mesh( titleGeo, titleMaterial )
    title.position.z = -400

    scene.add( title )
    
    // Subtitle font
    const subTitleFont = fontLoader.parse(subTitleFontFile)
    const subTitleText = 'DIGITAL INNOVATION'
    const subTitleMaterial = new THREE.MeshBasicMaterial( {
      color: new THREE.Color(0xFFFFFF),
    })
    const subTitleShapes = subTitleFont.generateShapes( subTitleText, 10);
    const subTitleGeo = new THREE.ShapeGeometry( subTitleShapes )
    subTitleGeo.computeBoundingBox()
    subTitleGeo.center()
    const subTitle = new THREE.Mesh( subTitleGeo, subTitleMaterial )
    subTitle.position.z = -400
    subTitle.position.y = -44
    scene.add( subTitle )

    // sphere
    const sphereGeo = new THREE.SphereGeometry( 10, 200, 200 );
    const sphereMaterial = new THREE.MeshPhongMaterial( {
      color: 0xffffff,
   
    } );
    const sphere = new THREE.Mesh( sphereGeo, sphereMaterial );
    sphere.position.z = -40
    sphere.position.x = -11
    sphere.position.y = -3
    scene.add( sphere );


    window.scene = scene
    window.THREE = THREE

    const animate = () => {
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()
  }
  render() {
    return (
      <React.Fragment>
        <canvas ref={ canvas => this.canvas = canvas } />
      </React.Fragment>
    )
  }
}

export default IndexPage


