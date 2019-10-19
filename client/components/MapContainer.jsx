import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import path from '../config/path';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import Appbar from './appbar'
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import SignUp from './sign_up'
import SignIn from './sign_in'
import { mapStyles } from './map_styles';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      current_user: '',
      nodes_array: []
    }
  }

  componentDidMount() {
    this.setState({
      current_user: this.props.current_user
    });
    this.onLoadNodes();
  }

  onLoadNodes = () => {
    axios.get(path.get_nodes(), {
      params: {lat: 21.027763, lng: 105.834160}
    }).then(res => {
      this.setState({nodes_array: res.data.nodes})
    });
  }

  openModal = () => {
    this.setState({ open: true })
  }

  handleCloseModal = () => {
    this.setState({ open: false })
  }

  handleSignIn = (email,password) => {
    const token = document.getElementsByName('csrf-token')[0].content;
    axios.post(path.sign_in(),{email,password}, {
      headers: {'X-CSRF-Token': token}
    }).then(resp => {
      this.setState({
        current_user: resp.data.current_user
      });
      window.location.href = path.root();
    });
  }

  handleSignUp = (name, email, password) => {
    const token = document.getElementsByName('csrf-token')[0].content;
    axios.post(path.sign_up(), {name,email,password}, {
      headers: {'X-CSRF-Token': token}
    }).then(resp => {
      this.setState({
        current_user: resp.data.current_user
      });
      window.location.href = path.root();
    });
  }

  logout = () => {
    axios.delete(path.log_out()).then(res => {
        window.location.href = path.root()
    });
  }

  calColor = (aqi) => {
    if (aqi < 50 ) return "green";
    else if (aqi < 100) return "yellow";
    else if (aqi < 150) return "orange";
    else if (aqi < 200) return "red";
    else if (aqi < 300) return "purple";
    else return "brown"
  }

  get_new_data = () => {
    console.log(getCenter());
  }

  render() {
    const { classes } = this.props;

    let rightMenu;

    if (!this.state.current_user) {
      rightMenu = <SignUp
                    openModal = {this.openModal}
                    handleSignUp = {this.handleSignUp}
                  />
    }

    return (
      <div>
        <Appbar
          openModal ={this.openModal}
          current_user = {this.state.current_user}
          logout = {this.logout}
        />
        <Grid container spacing={2}>
          <Grid item xs={8} className={classes.maps}>
            <Map
              center={[21.027763, 105.834160]}
              zoom={12}
              attributionControl={true}
              zoomControl={true}
              doubleClickZoom={true}
              scrollWheelZoom={true}
              dragging={true}
              animate={true}
              easeLinearity={0.35}
              onMoveEnd={this.get_new_data()}
            >
              <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
              { this.state.nodes_array && this.state.nodes_array.map((node, index) =>
                <Circle
                  key={index}
                  center={{lat: node.latitude, lng: node.longitude}}
                  fillColor={this.calColor(node.aqius)}
                  stroke={false}
                  radius={500}/>
              )}
            </Map>
          </Grid>
          <Grid item xs={3}>
            {rightMenu}
          </Grid>
        </Grid>

        <Modal
          className={classes.modal}
          open={this.state.open}
          onClose={this.handleCloseModal}
          disableAutoFocus
        >
          <SignIn handleSignIn = {this.handleSignIn} />
        </Modal>
      </div>
    );
  }
}

MapContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(mapStyles)(MapContainer);