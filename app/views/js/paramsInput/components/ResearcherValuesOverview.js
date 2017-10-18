import React from 'react'

import ReactTooltip from 'react-tooltip'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

export default class ResearcherValuesOverview extends React.Component {

	constructor (props) {
	    super(props)
	    this.onResearcherClick = this.onResearcherClick.bind(this)
	  }

	onResearcherClick(researcherName) {
		this.props.onResearcherClick(researcherName)
	}

	formatUnits (num, unit) {
		// Adds units to the numeric fields
		if (unit === '$') {
			return '$'+num 
		} else if (unit === '%') {
			return`${num}%`
		}
		return unit ? `${num} ${this.props.unit}` : num
	}


  render () {


    return <div>
	        <ReactTooltip id={this.props.paramName}  place="top" type="dark" effect="solid">
			 	{this.props.researcherValues.map((elm, key) => {
			 			return <div key={key}>
			 				{elm.name}: {this.formatUnits(elm.value, this.props.unit)}			 				
			 			</div>
			  		})
				}
			</ReactTooltip>
    </div>
  }
}
/*	        <Table
	        selectable={false}>
			    <TableHeader
			    adjustForCheckbox={false}
			    displaySelectAll={false}>
			      <TableRow>
			        {this.props.researcherValues.map((elm, key) => {
			        	return <TableHeaderColumn key={key}>
			        		<div onClick={() => this.onResearcherClick(elm.name)}>
				        		{elm.name}
			        		</div>
			        	</TableHeaderColumn>
			        })}
			      </TableRow>
			    </TableHeader>
			    <TableBody
			    displayRowCheckbox={false}>
			      <TableRow>
			        {this.props.researcherValues.map((elm, key) => {
			        	return <TableRowColumn key={key}>
				        	<div onClick={() => this.onResearcherClick(elm.name)}>
					        	{elm.value}
					        </div>
			        	</TableRowColumn>
			        })}
			      </TableRow>
	        	</TableBody>
	        </Table>
	        */

ResearcherValuesOverview.propTypes = {
	researcherValues: React.PropTypes.array, 
	unit: React.PropTypes.string,
	onResearcherClick: React.PropTypes.func,
	paramName: React.PropTypes.string
}
