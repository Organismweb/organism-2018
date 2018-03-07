import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import { font } from '../components/_settings/_variables'
import * as PIXI from 'pixi.js'


class IndexPage extends Component {
  componentDidMount() {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight

   
    

  }
  render(){
    return(
      <AnimationSection>
        <AnimationContainer innerRef={ mount => this.mount = mount } />
        <AnimationContent>
          <AnimationTitle>Organism</AnimationTitle>
        </AnimationContent>
      </AnimationSection>
    )
  }
}

export default IndexPage

const AnimationSection = styled.section`
  position: relative;
  background-color: black;
`

const AnimationContainer = styled.div`
  position: relative;
  z-index: 10;
`

const AnimationContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 0;
  h1 {
    margin: auto;
  }
`

const AnimationTitle = styled.h1`
  font-family: ${font.family.secondary};
  font-size: 6rem;
  color: white;
`



