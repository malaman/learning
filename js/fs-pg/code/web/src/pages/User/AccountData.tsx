import * as React from 'react';
import { connect } from 'react-redux';

import {Grid, Row, Panel} from 'react-bootstrap';


const InfoItem = ({label, value}: {label: string, value: string}) => {
    return (
        <div>
            <span style={{fontWeight: 'bold'}}>{label}: </span>
            <span>{value}</span>
        </div>
    );
};


interface AccountDataProps {
    info: {
        name: string,
        username: string,
        email: string
    };
};

export class AccountDataClass extends React.Component<AccountDataProps, {}> {

    // static contextTypes = {
    //     router: React.PropTypes.object.isRequired
    // };

    render() {
        return (
          <Grid className='settings'>
              <Row>
                  <h2>Your Account</h2>
                  <Panel header='General'>
                      <InfoItem label='Name' value={this.props.info.name} />
                      <InfoItem label='Username' value={this.props.info.username} />
                      <InfoItem label='Email' value={this.props.info.email} />
                  </Panel>
             </Row>
          </Grid>
      );
    }
}

function mapStateToProps(state) {
    return {
        info: state.user.info
    };
}

export const AccountData = connect(
    mapStateToProps
)(AccountDataClass);
