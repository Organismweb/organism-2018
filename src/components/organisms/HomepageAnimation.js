import React, {Component} from 'react'
import cloudTexture from '../../images/clouds.jpg'
import bubbleMaskImage from '../../images/oval-mask.png'
import bubbleImage from '../../images/oval.png'
class HomepageAnimation extends Component {
 
    init() {
      // Importing like this because Gatsby is exportet with window set as null.
      if (typeof window !== 'undefined') {
        const PIXI = require('pixi.js')
      }
      const canvas = this.canvas
      const width = document.documentElement.clientWidth
      const height = document.documentElement.clientHeight
  
      const app = new PIXI.Application(width, height, {
        resolution: 2,
        autoResize: true,
        backgroundColor: 0x0B0B0B,
      })
      canvas.appendChild(app.view)

      const screenXCenter = width / 2
      const screenYCenter = height / 2
      
      // This function creates a container with the Organims copy
      // and the copy is manipulated based on the containerName.
      // Right now the first container is created using no name and the second
      // Is using number 2 for name.
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
        // Set title content based on containerName
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
        // Set subTitle based on containerName
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
      
      // Create the container with text content without any distort
      const containerOne = createTextContainer(2)
      containerOne.y = 20
      containerOne.x = 120
      
      // Create the second container with content and distort added to the container
      const containerTwo = createTextContainer()
      const displacementSprite = new PIXI.Sprite.fromImage(cloudTexture)
      const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)
      containerTwo.filters = [displacementFilter]

      displacementSprite.anchor.set(0.5)
      displacementSprite.x = screenXCenter
      displacementSprite.y = screenYCenter

      displacementFilter.scale.x = 100
      displacementFilter.scale.y = 100

      containerTwo.addChild(displacementSprite)
      
      // Create container for the bubble
      const bubbleContainer = new PIXI.Container();
      app.stage.addChild(bubbleContainer)
      
      const createBubble = (resources) => {
        // Create bubble
        const bubble = new PIXI.Sprite.fromImage(bubbleImage)
        
        // Setting new bubble dimensions
        const bubbleWidth = resources.bubble.texture.orig.width / 1.3
        const bubbleHeight = resources.bubble.texture.orig.height / 1.3

        bubble.width = bubbleWidth
        bubble.height = bubbleHeight
        bubble.anchor.set(0.5)

        bubbleContainer.addChild(bubble)
        bubbleContainer.filters = [displacementFilter]
        
        return bubble
      }

      // Bubble sprite mask
      let bubbleMaskSprite;
      let bubbleOne
      let bubbleTwo
      let bubbleThree

      const loader = new PIXI.loaders.Loader()
      // Using the loader to get images with dimensions.
      loader.add('bubbleMask', bubbleMaskImage)
            .add('bubble', bubbleImage)
      loader.load( (loader, resources) => {

        // Setting new bubble mask dimensions
        bubbleMaskSprite = new PIXI.Sprite(resources.bubbleMask.texture)
        const bubbleMaskWidth = resources.bubbleMask.texture.orig.width / 1.6
        const bubbleMaskHeight = resources.bubbleMask.texture.orig.height / 1.6
        bubbleMaskSprite.width = bubbleMaskWidth
        bubbleMaskSprite.height = bubbleMaskHeight
        bubbleMaskSprite.anchor.set(0.5)
        // Positioning the bubble mask
        bubbleMaskSprite.x = screenXCenter - 255
        bubbleMaskSprite.y = screenYCenter    
        containerTwo.addChild(bubbleMaskSprite)
        // Mask the distorted container with the bubble sprite
        containerTwo.mask = bubbleMaskSprite
        
        bubbleOne = createBubble(resources)
        // Bubble positioning
        bubbleOne.x = screenXCenter - 290
        bubbleOne.y = screenYCenter
        // Bubble opacity and distort filter
        bubbleOne.alpha = 0.8

        bubbleTwo = createBubble(resources)
        bubbleTwo.x = width - 200
        bubbleTwo.y = 100

        bubbleThree = createBubble(resources)
        bubbleThree.x = screenXCenter + 300
        bubbleThree.y = screenYCenter + 500
        bubbleThree.width = bubbleThree.width / 1.6
        bubbleThree.height = bubbleThree.height / 1.6
      })
  
      // Ticker
      // TODO: Dont use rotation for the sprite displacement, randomize the position change.
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
  
  export default HomepageAnimation
  