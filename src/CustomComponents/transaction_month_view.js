var React = require("react-native");
var CommonMethods = require("../common_methods");
var TransactionItemView = require("./transaction_item");
var StringConstants = require("../config");
var TransactionTypeTotalItem = require("./transaction_type_total_item");

var {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,

} = React;


//in this component pass the month and year as props to show the list of month's transaction
var List= React.createClass({

  componentDidMount:function()
  {
    this.setState({
      transaction:this.props.transaction,
      month:this.props.month,
      year:this.props.year,
      transactionType:this.props.transactionType,
      transactionTypeTotal:this.props.transactionTypeTotal,

    })
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState(nextProps);
  },
  getInitialState:function()
  {
    return {
      month:12,
      isCategoryView:false,

    }
  },
  render:function()
  {
    return <View style = {[styles.container,{ marginTop:this.props.marginTop}] }>
      <View style = {[styles.monthView,]}>
        <Text style={styles.monthText}>
          Expenses of {this.state.transactionType} for {CommonMethods.getMonth(this.state.month)} {this.state.year}
        </Text>

      </View>
      <ScrollView style = {[styles.scrollView, ]}>
        {this.monthTransactionList()}
      </ScrollView>
      <View style = {[styles.totalView,]}>
        <Text style={styles.totalText}>
          {this.getTotal()}
        </Text>
      </View>


    </View>;
  },


  getTotal:function()
  {
    var value = 0;

    if (this.props.total)
      value = this.props.total;
    value = "Total " + CommonMethods.getCurrencySymbol()+ " " + value;

    return value;
  },

  showTransactionTypeView:function(transactionType, transactionTypeTotal) {
    this.props.navigator.push({
      name:StringConstants.NAVIGATOR.TRANSACTIONVIEW,
      passProps:{
        transaction:this.state.transaction,
        transactionType:transactionType,
        month:this.state.month,
        year:this.state.year,
        total:transactionTypeTotal,
      }
    })
  },
  monthTransactionList:function()
  {

    if (this.state.transaction) {
      var monthTransactionItem = this.state.transaction.getTransactionMonthExpenseList(this.state.transactionType, this.state.month, this.state.year);
      var that = this;
      return monthTransactionItem.map(function(transactionItem, index) {
        return <TransactionItemView key = {index} key1 = {index} transactionItem = {transactionItem} deleteButtonPressed = {that.props.deleteButtonPressed} />
      });}
    },

  });

  var styles = StyleSheet.create({
    container:{
      flex:7,
      backgroundColor:"beige"
    },
    monthView:{
      height:30,
      justifyContent:"space-between",
      alignItems:"center",
      flexDirection:"row",
      backgroundColor:"#3F51B5"

    },
    monthText:{
      fontSize:20,
      fontWeight:"bold",
      color:"white"
    },
    totalView:{
      height:30,
      alignItems:"flex-end",
      backgroundColor:"lightpink"
    },
    totalText:{
      fontSize:20,
      fontWeight:"bold",
      color:"red",
    },
    scrollView:{

    },
    changeViewButton:{
      backgroundColor:"hotpink",
      marginRight:5,
      padding:5,
      borderRadius:5,
    },
    changeViewText:{
      color:"white",
      fontWeight:"bold"
    },
    transactionTotalContainer: {
      flex:1,

    }

  })
  module.exports = List;
