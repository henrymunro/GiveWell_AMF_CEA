import React from 'react'
import TextField from 'material-ui/TextField'
import NumericInput from 'react-numeric-input'

export default class ParamsInputValue extends React.Component {

	updateParamValue (valueAsNumber, valueAsString) {
		this.props.onUpdate({paramName: this.props.paramName, value: valueAsNumber})
	}

	formatUnits (num) {
		// Adds units to the numeric fields
		const {unit} = this.props
		if (unit === '$') {
			return '$'+num 
		} else if (unit === '%') {
			return`${num}%`
		}
		return unit ? `${num} ${this.props.unit}` : num
	}

  render () {

  	const inputStyle = {
        input: {
            marginBottom: 0,
            height: '25px'
        }
    }


    return <div  data-tip data-for={this.props.paramName}>
			{this.props.unit === '%' ? <NumericInput 
				onChange={this.updateParamValue.bind(this)}
				min={0}
				max={100}
				value={this.props.value}
			    disabled={this.props.constant}
			    style={inputStyle}
			    format={this.formatUnits.bind(this)}/> :
				<NumericInput 
				onChange={this.updateParamValue.bind(this)}
				value={this.props.value}
			    disabled={this.props.constant}
			    style={inputStyle}
			    format={this.formatUnits.bind(this)}/>
			  }
    </div>
  }
}

ParamsInputValue.propTypes = {
	paramName: React.PropTypes.string,
    value: React.PropTypes.number,
    unit: React.PropTypes.string, 
    onUpdate: React.PropTypes.func,
    constant: React.PropTypes.bool

}
