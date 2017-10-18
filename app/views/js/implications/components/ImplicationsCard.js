import React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

import colors from '../../colors'

export default class ImplicationsCard  extends React.Component {

  render () {

    return <div className="" >
	    <Card style={{borderRadius: '6px'}}>
        <CardHeader 
        title={this.props.title}
        titleColor={colors.A400}
        style={{backgroundColor: colors.A100, borderRadius: '6px 6px 0 0'}}/>
       <CardText>
        <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
          {this.props.children}
        </div>
      </CardText>
     </Card>
    </div>
  }
}


ImplicationsCard.propTypes = {
    title: React.PropTypes.string,    
    body: React.PropTypes.string

}
