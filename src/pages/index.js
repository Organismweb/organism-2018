import React, {Component} from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import titleFontFile from '../fonts/cormorant-garamond-bold.json'
import subTitleFontFile from '../fonts/barlow-regular.json'
import * as PIXI from 'pixi.js'
import cloudTexture from '../images/clouds.jpg'

class IndexPage extends Component {
  init() {
    const canvas = this.canvas
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const screenXCenter = width / 2
    const screenYCenter = height / 2

    const app = new PIXI.Application(width, height, {
      resolution: 2,
      autoResize: true,
      backgroundColor: 0x000000,
    })
    canvas.appendChild(app.view)

    const createTextContainer = (containerName) => {
      // Container
      const container = new PIXI.Container()
      container.width = width
      container.height = height
      container.backgroundColor = 0x000000
      app.stage.addChild(container)

      // Background rectangle
      const square = new PIXI.Graphics()
      square.beginFill(0x000000, 1)
      square.drawRect(0, 0, width, height)
      container.addChild(square)

      // Create Title
      const titleStyle = new PIXI.TextStyle({
        fontFamily: 'Cormorant Garamond',
        fontSize: 124,
        fontWeight: '400',
        fill: '#FF001F',
        padding: 10,
      })
      const title = new PIXI.Text('Organism', titleStyle)
      title.anchor.set(0.5)
      title.y = screenYCenter - 50
      title.x = screenXCenter
      container.addChild(title)

      // Create Subtitle
      const subTitleStyle = new PIXI.TextStyle({
        fontFamily: 'Barlow',
        fontSize: 26,
        fontWeight: 'bold',
        fill: '#ffffff',
        padding: 10,
      })
      const subTitle = new PIXI.Text('DIGITAL INNOVATION', subTitleStyle)
      subTitle.anchor.set(0.5)
      subTitle.y = screenYCenter + 70
      subTitle.x = screenXCenter
      container.addChild(subTitle)
      return container
    }
    const containerOne = createTextContainer()

    const displacementSprite = new PIXI.Sprite.fromImage(cloudTexture)
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)
    containerOne.filters = [displacementFilter]
    displacementSprite.anchor.set(0.5)
    displacementSprite.x = screenXCenter
    displacementSprite.y = screenYCenter
    displacementFilter.scale.x = 100
    displacementFilter.scale.y = 100
    containerOne.addChild(displacementSprite)

    const containerTwo = createTextContainer()
    // Background rectangle
    const circle = new PIXI.Graphics()
    circle.beginFill(0xffffff, 1)
    circle.drawCircle(screenXCenter - 210, screenYCenter, 200, 200)
    circle.endFill()
    containerTwo.addChild(circle)
    containerTwo.mask = circle
    // Ticker
    app.ticker.add((delta) => {
      displacementSprite.rotation += 0.01 * delta
    })
  }
  componentWillReceiveProps(nextProps) {
    // Init the pixi app when fonts are loaded globally.
    if (nextProps.fontsLoaded === true) {
      this.init()
    }
  }
  render() {
    return (
      <React.Fragment>
        <div ref={(canvas) => (this.canvas = canvas)} />
      </React.Fragment>
    )
  }
}

export default IndexPage
