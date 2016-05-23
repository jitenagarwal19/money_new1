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
      year:this.props.year
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
          {CommonMethods.getMonth(this.state.month)} {this.state.year}
        </Text>
        {this.changeViewButton()}
      </View>
      {this.renderScrollView()}
      <View style = {[styles.totalView, ]}>
        <Text style={styles.totalText}>
          {this.getTotal()}
        </Text>
      </View>


    </View>;
  },

  renderScrollView:function() {
    return <ScrollView style = {[styles.scrollView, ]}>

      {this.decideWhichView()}

    </ScrollView>;
  },
  decideWhichView :function() {
    if (this.state.isCategoryView)
      return this.monthCategoryList();
    else
      return this.monthTransactionList();
  },
  getButtonText:function()
  {
    if (this.state.isCategoryView)
    return StringConstants.TRANSACTIONS;
    else
    return StringConstants.CATEGORIES;
  },
  changeViewButton:function(){
    return <TouchableHighlight style = {styles.changeViewButton} onPress = {()=>{this.setState({isCategoryView:!this.state.isCategoryView})}} underlayColor = {"orchid"}>
      <Text style = {styles.changeViewText}>
        {this.getButtonText()}
      </Text>
    </TouchableHighlight>
  },
  getTotal:function()
  {
    var value;
    if (this.state.transaction) {
      var currDate = new Date();
      value = this.state.transaction.getTotalForMonth(currDate.getMonth(), currDate.getFullYear());
      value = "Total " + CommonMethods.getCurrencySymbol()+ " " + value;
    }
    return value;
  },
  monthCategoryList :function() {
    var result = this.state.transaction.getTransactionTypeTotal(this.state.month, this.state.year);
    if (result) {
      return StringConstants.nameTypeOfTransaction.map(function(transactionType, index) {
        return <TransactionTypeTotalItem key = {index} transactionType = {transactionType} totalOfType = {result[transactionType]} />
      })
    }
  },
  monthTransactionList:function()
  {

    if (this.state.transaction) {
      var monthTransactionItem = this.state.transaction.getMonthExpenseList(this.state.month, this.state.year);
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
