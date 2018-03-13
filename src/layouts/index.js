import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import WebFont from 'webfontloader'
import styled, {injectGlobal} from 'styled-components'
import '../components/_settings/_base'
class TemplateWrapper extends Component {
  state = {
    fontsLoaded: false,
  }
  componentWillMount() {
    const WebFontConfig = {
      google: {
        families: ['Barlow', 'Cormorant Garamond'],
      },
      active: () => {
        this.setState({fontsLoaded: true})
      },
    }
    WebFont.load(WebFontConfig)
  }
  render() {
    return (
      <MainContainer>
        <Helmet
          title="Gatsby Default Starter"
          meta={[
            {name: 'description', content: 'Sample'},
            {name: 'keywords', content: 'sample, something'},
          ]}
        />
        {this.props.children({...this.props, fontsLoaded: this.state.fontsLoaded})}
      </MainContainer>
    )
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

const MainContainer = styled.div`
  position: relative;
`

export default TemplateWrapper
