import React from 'react'

export default class ParamsInputHeading extends React.Component {

  render () {


    return <div style={this.props.style}>
        <h5 style={{fontSize: '1.25rem'}}>{this.props.heading}</h5>
        <div>{this.props.children}</div>
    </div>
  }
}

ParamsInputHeading.propTypes = {
    heading: React.PropTypes.string,
    style: React.PropTypes.object,

}
