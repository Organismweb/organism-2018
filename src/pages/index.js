import React, {Component} from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import * as PIXI from 'pixi.js'

import {font} from '../components/_settings/_variables'
import displacementImage from '../images/3DlQqNq.jpg'
import oval from '../images/oval.png'

class IndexPage extends Component {
  componentDidMount() {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const screenXCenter = width / 2
    const screenYCenter = height / 2
    const app = new PIXI.Application(width, height)
    app.stage.interactive = true
    const container = new PIXI.Container()

    this.mount.appendChild(app.view)
    app.stage.addChild(container)

    // Set styling for title a
    const titleStyle = {
      fontFamily: 'Cormorant Garamond',
      fontSize: 132,
      fill: '0xFF001F',
      padding: 100,
      fontWeight: '400',
    }

    // Create and position title
    const titleContainer = new PIXI.Container()
    const title = new PIXI.Text('Organism', titleStyle)
    title.anchor.set(0.5)
    title.x = screenXCenter
    title.y = screenYCenter
    titleContainer.addChild(title)
    container.addChild(titleContainer)

    // Set styling for subtitle
    const subTitleStyle = {
      fontFamily: 'Barlow',
      fontSize: 28,
      fill: '0xFFFFFF',
    }

    // Create and position subtitle
    const subTitle = new PIXI.Text('DIGITAL INNOVATION', subTitleStyle)
    subTitle.anchor.set(0.5)
    subTitle.x = screenXCenter
    subTitle.y = screenYCenter + 110
    container.addChild(subTitle)

    const displacementSprite = PIXI.Sprite.fromImage(displacementImage)
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)
    app.stage.addChild(displacementSprite)

    displacementFilter.scale.x = 100
    displacementFilter.scale.y = 100
    displacementSprite.anchor.set(0.5)

    // Bubble sprite & container
    const bubbleSprite = new PIXI.Sprite.fromImage(oval)

    bubbleSprite.anchor.set(0.5)
    bubbleSprite.y = screenYCenter + 150
    bubbleSprite.x = screenXCenter - 350
    bubbleSprite.filters = [displacementFilter]

    // Add bubble to container
    app.stage.addChild(bubbleSprite)

    // Ticker
    const ticker = new PIXI.ticker.Ticker()
    let count = 0
    ticker.add((delta) => {
      bubbleSprite.scale.x = 1 + Math.sin(count) * 0.03
      bubbleSprite.scale.y = 1 + Math.sin(count) * 0.03
      displacementSprite.rotation += 0.003 * delta
      count += 0.01
    })

    ticker.start()
  }
  render() {
    return (
      <AnimationSection>
        <div ref={(mount) => (this.mount = mount)} />
      </AnimationSection>
    )
  }
}

export default IndexPage

const AnimationSection = styled.section`
  position: relative;
  background-color: black;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`
