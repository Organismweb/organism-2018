import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import WebFont from 'webfontloader'
import styled, { injectGlobal } from 'styled-components'
import '../components/_settings/_base'
class TemplateWrapper extends Component {
  componentWillMount() {
    WebFont.load({
      google: {
        families: ['Barlow', 'Cormorant Garamond']
      }
    });
  }
  render() {
    return (
      <MainContainer>
        <Helmet
          title="Gatsby Default Starter"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
          { this.props.children() }
      </MainContainer>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

const MainContainer = styled.div`
  position: relative;
`

export default TemplateWrapper
