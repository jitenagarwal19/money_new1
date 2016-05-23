var React = require('react-native');

var {
  StyleSheet,
  AppRegistry,
  Text,
  View,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
  ScrollView,
  Picker,
  Navigator,
  Image,
} = React;
var CommonMethods = require("./common_methods");
module.exports = React.createClass({
  render: function() {
    var monthWise = this.props.transaction.getMonthWiseTotal();

    return (

      <ScrollView style={styles.monthWiseScrollView}>
        {this.renderMonthWiseList(monthWise)}
      </ScrollView>
    );
  },

  renderMonthWiseList: function(monthWiseList){
    var that = this;
    return monthWiseList.map(function(monthTotal, index) {
      return that.getMonthTotalView(index, 2016, monthTotal); //<MonthView key = {index} month = {index} total = {monthTotal} onPress = {() => {that.showMonthView(index, 2016)}}/>
    });
  },

  showMonthView:function(month, year) {
    this.props.navigator.push({
      name:'monthview',
      passProps:{
        transaction:this.props.transaction,
        month:month,
        year:year,
        marginTop:60,
      }
    })
  },

  getMonthTotalView(month, year, total) {
    return (<TouchableHighlight style={[styles.monthRow, {backgroundColor:CommonMethods.yellowColor[month]}]} onPress= {()=>{this.showMonthView(month, year)}} underlayColor={"white"} key = {month}>
      <View style={styles.monthRowView}>
        <Text style={styles.monthName}>
          {CommonMethods.getMonth(month)}
        </Text>
        <Text style={styles.monthTotal}>
          {CommonMethods.getCurrencySymbol()} {total.total}
        </Text>
      </View>
    </TouchableHighlight>)

  }
})

var MonthView = React.createClass({
  render:function() {


  }

});
var styles  = StyleSheet.create({
  monthWiseScrollView: {
    flex:1,
    marginTop:60,

  },
  monthName: {
    flex:1,
    fontSize:20,
    fontWeight:"bold",
    margin:5,
  },
  monthRowView: {
    flex:1,
    flexDirection:"row",
    height:50,
    justifyContent:"center",
    alignItems:"center",
  },
  monthRow: {
    flexDirection:"row",
    flex:1,
    borderRadius:10,
    borderWidth:1,
    borderColor:"#76FF03"

  },
  monthTotal: {
    fontSize:20,
    fontWeight:"bold",
    margin:5,
  },
});
