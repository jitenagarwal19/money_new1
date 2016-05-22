
var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,

  Image,
} = React;
//pass the type of transaction in this component as props and image icon will be renedered with name at the bottom
module.exports = React.createClass({
  setNativeProps (nativeProps) {
    if (nativeProps && this._root)
      this._root.setNativeProps(nativeProps);
  },
  render:function()
  {
    return <View style={[styles.container, this.props.style, {backgroundColor:this.props.typeOfTransaction.color,}]}>
      <Image
        resizeMode="cover"
        style={[styles.image, {height:this.props.style.height / 2, width:this.props.style.width / 2,}]}
        source={this.props.typeOfTransaction.image}
        />
      <Text style = {styles.text}>
        {this.props.typeOfTransaction.name}
      </Text>
    </View>;
  }
});
var styles = StyleSheet.create({
  container:{
    alignItems:"center",
    justifyContent:"center",
    borderWidth:0,

  },
  image:{
    tintColor:"black"

  },
  text:{
    fontSize:10
  },

})
