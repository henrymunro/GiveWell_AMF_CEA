import React from 'react'
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'

import * as selectors from '../reducer'
import actions from '../actions'
import paramsInputActions from '../../paramsInput/actions'


import ResearcherDropDown from './researcherDropDown'

import colors from '../../colors'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'


@connect((store, ownProps) => {
  return {

    distinctResearchers: selectors.getDistinctResearchers(store),
    selectedResearcher: selectors.getSelectedResearcher(store)

  }
}, Object.assign({}, paramsInputActions, actions))

export default class ResetValues extends React.Component {

  constructor (props) {
      super(props)
      this.state = {
        researcherChanged: false
      }
  }
  
  updateSelectedResearcher (researcherName) {
    this.props.updateSelectedResearcher({researcherName})
    this.setState({researcherChanged: true})
  }

  setModelValuesToResearcherValues () {
    this.setState({researcherChanged: false})
    if (this.props.selectedResearcher === 'Median'){
      return this.props.setModelValuesToMedian()
    }

    if (this.props.selectedResearcher === 'Mean'){
      return this.props.setModelValuesToMean()
    }

    this.props.setModelValuesToResearcherValues({researcherName: this.props.selectedResearcher})
  }

  render () {

    return <div className="">
      <Card style={{borderRadius: '6px', background: colors.A100, color: colors.A400, fontWeight: 500}}>
        <div className='cf'>
          <div style={{float: 'left', paddingTop: '20px', paddingLeft: '15px'}}>
            <div>RESET MODEL VALUES: </div>
          </div>
          <div style={{float:'left'}}>
            <ResearcherDropDown 
              researchers={this.props.distinctResearchers} 
              selected={this.props.selectedResearcher} 
              onChange={this.updateSelectedResearcher.bind(this)} />          
          </div>
          <div style={{float: 'right', paddingTop: '10px', paddingRight: '15px', minWidth: '40px'}}>
            <FlatButton 
              label="UPDATE" 
              onClick={this.setModelValuesToResearcherValues.bind(this)} 
              backgroundColor={colors.A500}
              hoverColor={colors.A300}
              style={{color: colors.A200, visibility: this.state.researcherChanged ? 'visible' : 'hidden'}}/>       
          </div>
        </div>
      </Card>
    </div>
  }
}
