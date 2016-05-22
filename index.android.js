var React = require("react-native");


var {
  AppRegistry,
  View,
  MapView,
  Text,
  StyleSheet
} = React;

var Api = require('./src/api');

var Weather = React.createClass({
  getInitialState: function() {
    return {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    };

  },

  render: function() {

    return <View style = {styles.container}>
    <MapView style = {styles.map}
      annotations = {[this.state.pin]}
        onRegionChangeComplete = {this.onRegionChangeComplete}
      ></MapView>
    <View style = {styles.messageView}>
        <Text>
          City : {this.state.city}
        </Text>

        <Text style={this.temperatureColor()}>
          Temperature : {this.state.temperature}
        </Text>
        <Text>
          Description: {this.state.description}
        </Text>
      </View>
    </View>;

  },
  temperatureColor: function()
  {
    var color;
    var temp = this.getIntegerTemperature(this.state.temperature)

    if (temp > '20') {
      color = 'green';
    } else if (temp < '20'){
      color = 'blue';
    }
    return {
      color:color
    };
  },
  getIntegerTemperature: function(temperatureString)
  {
    var temp = temperatureString.substring(0, temperatureString.length - 2);
    return eval(temp);
  },

  onRegionChangeComplete: function(region) {
    // console.log(Api.code);
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude

      }

    });
    Api(region.latitude, region.longitude)
    .then((data) => {
      console.log(data);

      this.setState(data);
    });
  }
});

var styles = StyleSheet.create({
  container : {
    flex: 1
  },
  map:{
    flex: 7
  },
  messageView: {
    flex:3,
    justifyContent: 'center',
    alignItems:'center'
  },

});
// function colorAccordingToTemperature()
// {
//   if (this.state.temperature < 10)
//     return 'blue';
//   if (this.state.temperature >= 10)
//     return 'red';
// }

AppRegistry.registerComponent('weather', ()=>Weather);
