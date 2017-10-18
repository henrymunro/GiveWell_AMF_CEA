import React from 'react'

import FontIcon from 'material-ui/FontIcon'

import colors from '../../colors'

export default class ImplicationsCardBodyEntry extends React.Component {

  constructor (props) {
    super(props)
    this.startFadeOut = this.startFadeOut.bind(this)
    this.state = {
      increase: false,
      decrease: false
    }
  }

  // Lifecycle hook to see if number has increase/decreased and provide feedback
  componentWillReceiveProps(nextProps) {

    if(nextProps.value > this.props.value){
      this.setState({increase: true, decrease: false})
      return this.startFadeOut()
    } 

    if(nextProps.value < this.props.value){
      this.setState({increase: false, decrease: true})
      return this.startFadeOut()
    } 

    this.setState({increase: false, decrease: false})
    return this.startFadeOut() 
    
  }

  startFadeOut() {
    const self = this
    setTimeout(() => {
      self.setState({increase: false, decrease: false})
    }, 700)
  }


  render () {

    // Show top border if not the first element in the list
    let divStyle = {minHeight: '10px'}
    if (!this.props.top) {
      divStyle.paddingTop = '5px'
      divStyle.borderTop = `1px ${colors.A200} solid`
    }

    // Value change feedback elements
    const iconStyles = {
        // marginRight: '5px',
        fontSize: '14px'
      }

    const goodColor = 'rgb(37, 183, 0)'
    const badColor = 'rgb(255, 0, 0)'


    let arrowStyle
    if (this.state.increase) {
      arrowStyle = Object.assign({}, iconStyles, {color: this.props.increaseBad ? badColor: goodColor})
    }
    if (this.state.decrease) {
      arrowStyle = Object.assign({}, iconStyles, {color: this.props.increaseBad ? goodColor: badColor})
    }

    const {increase, decrease} = this.state
    const arrowElement = (increase || decrease ) && <FontIcon 
                        className="material-icons fadeOut"  
                        style={arrowStyle}>
                          {increase && 'arrow_upwards'}
                          {decrease && 'arrow_downwards'}
                        </FontIcon>

    return <div style={divStyle} className='cf'>
      <div style={{float: 'left'}}>
        {this.props.title}
      </div>
        <div style={{float: 'right'}}>
          {this.props.unit}{this.props.value}
        </div>
        <div style={{float: 'right'}}>
          {arrowElement}
        </div>
      </div>
  }
}



ImplicationsCardBodyEntry.propTypes = {
    title: React.PropTypes.string,    
    value: React.PropTypes.number,
    unit: React.PropTypes.string,
    top: React.PropTypes.bool,
    increaseBad: React.PropTypes.bool

}
