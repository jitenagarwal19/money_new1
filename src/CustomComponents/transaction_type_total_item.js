var React = require("react-native");

var {
  StyleSheet,
  Text,
  View,
  Image,
} = React;


var CommonMethods = require("../common_methods");
var StringConstant = require("../config");
// in this component pass the transaction type and total amount.
module.exports = React.createClass({


  render: function()
  {
    var transactionType = StringConstant.getTypeFromName(this.props.transactionType);
    return <View style = {[styles.container, {backgroundColor:transactionType.color}]}>
      <View style={styles.leftView}>
        <Image
          style={styles.imageStyle}
          source={transactionType.image}
          />
        <Text style={styles.transactionName}>
          {transactionType.name}
        </Text>
      </View>

      <Text style={styles.transactionTotal}>
        {CommonMethods.getCurrencySymbol()} {this.getTotal()}
      </Text>

    </View>;
  },
  getTotal:function() {
    if ((this.props.totalOfType))
    return this.props.totalOfType;
    else
    return 0;
  },
});


var styles = StyleSheet.create({
  container:{
    flex:1,
    borderRadius:10,
    flexDirection:"row",
    height:50,
    alignItems:'center',
    justifyContent:"space-between"
  },
  imageStyle:{
    height:40,
    width:40,
    margin:5,
  },
  transactionName:{
    fontSize:20,
    marginLeft: 10,
  },
  transactionTotal:{
    fontSize:20,
  },
  leftView:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
  },
});
