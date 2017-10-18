import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import colors from '../../colors'


export default class ParamsInputName extends React.Component {
 
 constructor (props) {
    super(props)
    this.state = {
    	hintDialogOpen: false,
    	nameHover: false,
    }
  }

  handleOpen () {
    this.props.hint && this.setState({hintDialogOpen: true})
  }

  handleClose () {
    this.props.hint && this.setState({hintDialogOpen: false})
  }

  onNameEnter () {
  	this.props.hint && this.setState({nameHover: true})
  }

  onNameLeave () {
  	this.props.hint && this.setState({nameHover: false})
  }


  render () {

  	const dialogActions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose.bind(this)}
        style={{color: colors.A300}}
      />,
    ]

    return <div>
        <p 
        onClick={this.handleOpen.bind(this)}
        onMouseEnter={this.onNameEnter.bind(this)}
        onMouseLeave={this.onNameLeave.bind(this)}
        style={this.props.hint ? {cursor: "pointer", color: this.state.nameHover&& colors.A300, fontSize: '0.9rem'} : {fontSize: '0.9rem'}}>
        	{this.props.paramName}:
        </p>
        <Dialog
          title={this.props.paramName}
          actions={dialogActions}
          modal={false}
          open={this.state.hintDialogOpen}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
          actionsContainerStyle={{backgroundColor: colors.A500, borderRadius: '0 0 6px 6px'}}
          bodyStyle={{color: colors.A200, fontSize: '1rem'}}
          paperProps={{style: {borderRadius: '6px'}}}
          titleStyle={{
            backgroundColor: colors.A100, 
            color: colors.A400,
            borderRadius: '6px 6px 0 0',
            fontSize: '1.5rem'
          }}
        >
        	<i>{
	          	this.props.hint.split("\n").map((paragraph, key) => {
	            	return <div 
		            	key={key} 
		            	style={{paddingTop: '10px'}}>
		            		{paragraph}
	            	</div>
	        	})}
        	</i>
        </Dialog>
    </div>
  }
}

ParamsInputName.propTypes = {
    paramName: React.PropTypes.string,    
    hint: React.PropTypes.string


}
