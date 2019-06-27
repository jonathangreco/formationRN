import React from 'react';
import {StyleSheet} from 'react-native';
import Video from "react-native-video";
import PropTypes from 'prop-types';

export default class VideoComponent extends React.Component {
  callback = () => {
    this.props.onVideoEnd(this.props.uri);
  };

  render() {
    // Juste pour l'exemple d'un paramètre optionnel
    let size = 20;

    if (this.props.size) {
      size = this.props.size;
    }

    console.log(size);
    return (
      <Video controls={this.props.controls}
             onEnd={() => this.callback()}
             source={{uri: this.props.uri}}
             style={styles.video}/>
    );
  }
}

VideoComponent.propTypes = {
  controls: PropTypes.bool.isRequired,
  size: PropTypes.number,
  uri: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  video: {
    flex: 1, width: 300, height: 300
  }
});
