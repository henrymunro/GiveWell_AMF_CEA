import React from 'react'

import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

import colors from '../../colors'

export default class ResearcherDropdown extends React.Component {

	handleChange (event, key, value) {
		this.props.onChange(value)
	}

  render () {


    return <div>
    	<DropDownMenu 
    	value={this.props.selected} 
    	onChange={this.handleChange.bind(this)}
        labelStyle={{color: colors.A400}}
        selectedMenuItemStyle={{color: colors.A300}}
    	iconStyle={{fill: colors.A400}}>
	    	<MenuItem value={'Median'} primaryText={'Median'} />
	    	<MenuItem value={'Mean'} primaryText={'Mean'} />
	        {this.props.researchers.map((res, key) => {
	        	return <MenuItem value={res} key={key} primaryText={res} />
	        })}
        </DropDownMenu>

    </div>
  }
}

ResearcherDropdown.propTypes = {
    researchers: React.PropTypes.array,
    selected: React.PropTypes.string,
    onChange: React.PropTypes.func

}
