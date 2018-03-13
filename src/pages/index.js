import React, {Component} from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import titleFontFile from '../fonts/cormorant-garamond-bold.json'
import subTitleFontFile from '../fonts/barlow-regular.json'
import * as PIXI from 'pixi'



class IndexPage extends Component {
  componentDidMount() {
    const canvas = this.canvas
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const screenXCenter = width / 2
    const screenYCenter = height / 2

    const scene = new PIXI.Application(width, height, {
      backgroundColor: 0x1099bb
    })
    canvas.appendChild(app.view)

    const container = new PIXI.Container()
    container.width = width
    container.height = height
    app.addChild(container)

    app.ticker.add( delta => {

    })
  }
  render() {
    return (
      <React.Fragment>
        <canvas ref={(canvas) => (this.canvas = canvas)} />
      </React.Fragment>
    )
  }
}

export default IndexPage
