import React, {Component} from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import HomePageAnimation from '../components/organisms/HomepageAnimation'

class IndexPage extends Component {
  render() {
    return (
      <React.Fragment>
        <HomePageAnimation fontsLoaded={ this.props.fontsLoaded }/>
      </React.Fragment>
    )
  }
}

export default IndexPage
