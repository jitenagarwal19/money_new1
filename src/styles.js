var React = require("react-native");



var styles = React.StyleSheet.create({
  container1: {
    flex:1,

  },
  container: {
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    marginTop:60,

  },
  saveView: {
    flex:3,

  },
  listViewStyle: {
    flex:15,
  },
  textInput: {
    flex:1,
    height:40,

    margin:2,
    paddingRight: 3,
    textAlign:'center',
  },
  textInputView: {
    flex:2,
    flexDirection:'row',
    justifyContent:"center",
    alignItems:'center'
  },
  saveButton: {
    flex:1,
    margin: 10,
    justifyContent:'center',
    alignItems:'center',
  },
  saveButtonText: {
    color:'white',
    fontWeight:"800",
    fontSize:20,
  },
  listRow: {
    flex:1,
    justifyContent:'space-around',
    flexDirection:'row',
  },
  listColumn: {
    flex:1,
    fontSize:25,
  },
  imageButton: {
    width:50,
    height:50,
  },
  extraButtonViewStyle: {
    flex:1,
    flexDirection:"row",
  },
  extraButtonStyle: {
    flex:1,
    justifyContent:'space-around',
    flexDirection:"column",
    borderRadius:10,
    margin:5,

  },
  extraButtonViewView:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
  extraButtonTextStyle: {
    fontWeight:"bold",
    fontSize:20,
    margin:3
  },
  nav: {
    height: 60,
    backgroundColor:"#efefef",
  },
  leftNavButtonText: {
    fontSize:18,
    marginLeft: 13,
    marginTop:2,
  },
  rightNavButtonText: {
    fontSize:18,
    marginRight:13,
    marginTop:2,
  },
  title: {
    marginTop:2,
    fontSize:16,
  }

});


module.exports = styles;
