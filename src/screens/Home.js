import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import Sets from '../components/Sets';
import './Home.css';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { addSet: false };
  }

  onAddSet = () => {
    this.setState({ addSet: true });
  }

  render() {

    console.log(this.props);
    return (
      <div className="home">
        { this.state.addSet && <Redirect to="/set/new" /> }
        <button className="home__add-new" onClick={this.onAddSet}>Create new set</button>
        <div className="home__sets" >
          {/* <Sets sets={this.props.sets} /> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sets: state.sets,
  };
}

export default connect(mapStateToProps)(Home);
