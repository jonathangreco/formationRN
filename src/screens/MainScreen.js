/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import VideoComponent from "../component/VideoComponent";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as defaultActions from "../actions/defaultActions";
import * as velibActions from "../actions/velibActions";
import Icon from 'react-native-vector-icons/FontAwesome';


class MainScreen extends Component {
  state = {
    videoStatus: "Not ended",
  };

  fetchData = () => {
    let results = fetch(
      "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&facet=overflowactivation&facet=creditcard&facet=kioskstate&facet=station_state"
    );

    results.then(response => {
      response
        .json()
        .then(data => {
          this.setState({
            data: data
          });
        });
    });
  };

  componentDidMount() {
    this.fetchData();
    this.props.actions.acceptCgu(true);
  }

  renderRow = ({item}) => {
    let isBookmarked = (this.props.velib_bookmarked.find(velib => velib.id === item.recordid));
    let jsx = <Icon.Button
      name="plus"
      size={20}
      iconStyle={{marginRight: 0}}
      backgroundColor="green"
      onPress={() => this.props.velibActions.addToBookmark({id : item.recordid, station_name: item.fields.station_name}) }
    />;

    if (isBookmarked) {
      jsx = <Icon.Button
        name="minus"
        size={20}
        iconStyle={{marginRight: 0}}
        backgroundColor="red"
        onPress={() => this.props.velibActions.removeFromBookmark(item.recordid) }
      />
    }
      return (
        <View style={styles.rowItem}>
          <View style={styles.icon}>
            {jsx}
          </View>
          <Text>{item.fields.station_name}</Text>
        </View>
      );
  };

  onVideoEnd = (uri) => {
    this.setState({
      videoStatus: "Vidéo terminée! Avez vous aimé : " + uri
    })
  };

  render() {
    return (
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to React Native!</Text>
            <VideoComponent
              paused={true}
              onVideoEnd={(uri) => this.onVideoEnd(uri)}
              size={30}
              controls={true}
              uri={"https://app.dollycast.io/films/102/maestro_product-1551264704/movie_maestro_product-1551264704_1.mp4"}
            />
            {this.state.data && <FlatList
              data={this.state.data.records}
              renderItem={(item) => this.renderRow(item)}
              keyExtractor={(item) => "" + item.recordid}
              style={styles.listContainer}
              extraData={this.props.velib_bookmarked}
            />}

            <Text style={styles.welcome}>{this.state.videoStatus}</Text>

            <Button
              title="Go to Details"
              onPress={() => this.props.navigation.navigate('HomeScreen')}
            />

          </View>
        </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.defaultReducer.user,
    cgu_accepted: state.defaultReducer.cgu_accepted,
    velib_bookmarked: state.velibReducer.velib_bookmarked
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(defaultActions, dispatch),
    velibActions : bindActionCreators(velibActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {

  },
  rowItem: {
    flexDirection: "row",
    flex: 1,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginRight: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
