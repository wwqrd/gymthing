import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { map, uniq } from 'lodash';
import Groups from '../components/Groups';
import './Home.css';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { addGroup: false };
  }

  onAddGroup = () => {
    this.setState({ addGroup: true });
  }

  render() {
    return (
      <div className="home">
        { this.state.addGroup && <Redirect to="/group/new" /> }
        <button className="home__add-new" onClick={this.onAddGroup}>Create new group</button>
        <div className="home__groups" >
          <Groups groups={this.props.groups} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const exercises = state.exercises;
  const groups = uniq(map(exercises, 'group'));

  console.log({ groups });

  return {
    groups,
  };
}

export default connect(mapStateToProps)(Home);
