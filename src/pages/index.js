import React, {Component} from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import titleFontFile from '../fonts/cormorant-garamond-bold.json'
import subTitleFontFile from '../fonts/barlow-regular.json'
import cloudTexture from '../images/clouds.jpg'
import bubbleMaskImage from '../images/oval-mask.png'
import bubbleImage from '../images/oval.png'

class IndexPage extends Component {
 
  
  
  init() {
    if (typeof window !== 'undefined') {
      const PIXI = require('pixi.js')
    }
    const canvas = this.canvas
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const screenXCenter = width / 2
    const screenYCenter = height / 2

    const app = new PIXI.Application(width, height, {
      resolution: 2,
      autoResize: true,
      backgroundColor: 0x0B0B0B,
    })
    canvas.appendChild(app.view)

    const createTextContainer = (containerName) => {
      // Container
      const container = new PIXI.Container()
      container.width = width
      container.height = height
      container.backgroundColor = 0x0B0B0B
      app.stage.addChild(container)

      // Background rectangle
      const square = new PIXI.Graphics()
      square.beginFill(0x0B0B0B, 1)
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
      let title;
      if(containerName === 2) {
        title = new PIXI.Text('anism', titleStyle)
        title.x = screenXCenter
      } else {
        title = new PIXI.Text('Org', titleStyle)
        title.x = screenXCenter - 150
      }
      title.anchor.set(0.5)
      title.y = screenYCenter - 50
      
      container.addChild(title)

      // Create Subtitle
      const subTitleStyle = new PIXI.TextStyle({
        fontFamily: 'Barlow',
        fontSize: 26,
        fontWeight: 'bold',
        fill: '#ffffff',
        padding: 10,
      })
      let subTitle;
      if(containerName === 2) {
        subTitle = new PIXI.Text('INNOVATION', subTitleStyle)
        subTitle.x = screenXCenter - 50
      } else {
        subTitle = new PIXI.Text('DIGITAL', subTitleStyle)
        subTitle.x = screenXCenter - 90
      }
      
      subTitle.anchor.set(0.5)
      subTitle.y = screenYCenter + 70
      
      container.addChild(subTitle)
      return container
    }
    

    const containerTwo = createTextContainer(2)
    containerTwo.y = 20
    containerTwo.x = 120
    
    
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


    const bubbleContainer = new PIXI.Container();
    app.stage.addChild(bubbleContainer)

    // Pixi sprite mask
    let bubbleMaskSprite;
    let bubble
    const loader = new PIXI.loaders.Loader()
    loader.add('bubbleMask', bubbleMaskImage)
          .add('bubble', bubbleImage)
    loader.load( (loader, resources) => {
      bubbleMaskSprite = new PIXI.Sprite(resources.bubbleMask.texture)
      const bubbleMaskWidth = resources.bubbleMask.texture.orig.width / 1.6
      const bubbleMaskHeight = resources.bubbleMask.texture.orig.height / 1.6
      bubbleMaskSprite.width = bubbleMaskWidth
      bubbleMaskSprite.height = bubbleMaskHeight
      bubbleMaskSprite.anchor.set(0.5)
      bubbleMaskSprite.x = screenXCenter - 255
      bubbleMaskSprite.y = screenYCenter    

      containerOne.addChild(bubbleMaskSprite)
      containerOne.mask = bubbleMaskSprite

      // Bubble
      bubble = new PIXI.Sprite.fromImage(bubbleImage)
      bubble.anchor.set(0.5)
      const bubbleWidth = resources.bubble.texture.orig.width / 1.3
      const bubbleHeight = resources.bubble.texture.orig.height / 1.3
      bubble.width = bubbleWidth
      bubble.height = bubbleHeight
      bubble.x = screenXCenter - 290
      bubble.y = screenYCenter
      bubble.alpha = 0.8
      bubbleContainer.addChild(bubble)
      bubbleContainer.filters = [displacementFilter]
     
    })

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
