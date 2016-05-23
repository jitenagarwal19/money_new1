
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

//calling all the required files
var StringConstants = require("./src/config");
//I have created Transaction class to store the array of values that i will be using.
var Transaction1 = require("./src/transaction");
var styles = require("./src/styles");
var ListPopover = require("./src/list_popover");
var TransactionItem = require("./src/CustomComponents/transaction_item");
var MonthExpenseListView = require("./src/CustomComponents/month_expense_list_view");
var TypesOfTransaction = StringConstants.typesOfTransaction;
var TypeOfTransactionIcon = require("./src/CustomComponents/transaction_type_icon");
var CommonMethods = require("./src/common_methods");
var SettingScreen = require("./src/year_view_screen");

var MoneyNavigator = React.createClass({
  renderScene(route, navigator) {
    if (route.name === "start") {
      return <Money navigator = {navigator} {...route.passProps}/ >
      } else if (route.name === "yearview") {
        return <SettingScreen navigator = {navigator} {...route.passProps} />
      } else if (route.name == "monthview") {
        return <MonthExpenseListView navigator = {navigator} {...route.passProps}/>
      }


    },
    configureScene(route, routeStack) {
      return Navigator.SceneConfigs.FloatFromBottom;
    },
    render() {
      return (
        <Navigator
          configureScene={this.configureScene}
          style={{flex:1}}
          renderScene={this.renderScene}
          initialRoute={{name:"start"}}
          navigationBar={<Navigator.NavigationBar style = {styles.nav} routeMapper = {NavigationBarRouteMapper}/>}
          />
      );
    }
  })

  var NavigationBarRouteMapper = {
    RightButton:function(route, navigator, index, navState) {
      if (route.onPress) {
        return (
          <TouchableHighlight onPress={() => route.onPress()}>
            <Text style={styles.rightNavButtonText}>
              {route.rightText || "Right Button"}

            </Text>
          </TouchableHighlight>
        )
      }
    },
    LeftButton(route, navigator, index, navState) {
      if (index > 0) {
        return (
          <TouchableHighlight
            underlayColor = "transparent"
            onPress = {() => {if (index > 0) {navigator.pop()}}}
            >
            <Text style={styles.leftNavButtonText}>Back</Text>
          </TouchableHighlight>
        )} else {
          return null;
        }
      },

      Title(route, navigator, index, navState) {

        return <Text style = { styles.title }> {this.getTitleString(route.name)} </Text>
      },
      getTitleString(name) {
        if (name === "yearview") {
          return "Year View " + (new Date()).getFullYear();
        } else if (name === "monthview") {
          return "Month View"
        }
        else {
          return "Expense Management";
        }
      }
    }


    var Money = React.createClass({
      transaction:"",
      initTransactionsCalledOnce:false,
      shouldUpdateStateBool:true,

      componentDidMount() {
        //this where i need to load the data from disk.
        AsyncStorage.getItem(StringConstants.TRANSACTION_ARRAY)
        .then((tranasctions) => {this.initTransactions(tranasctions)})
        .catch((error) =>{console.log("error2 " + error);
          this.initTransactions(null)});
        },
        shouldComponentUpdate: function(nextProps, nextState) {
          return this.shouldUpdateStateBool;
        },

        //here i am passing the value that is being retrieved from the local storage if no value is retrieved undefined will be passed and new object will be created
        initTransactions:function(value)
        {
          if (!this.initTransactionsCalledOnce) {
            this.initTransactionsCalledOnce = true;
            this.transaction = new Transaction1(value);
            this.setState({transaction:this.transaction});
          }
        },

        getInitialState:function() {
          return {
            //this is the value for the field 1
            expenseName:"",
            //this is value for the field 2
            value:"",
            note:"",
            transactionType: StringConstants.SELECT_TRANSACTION_TYPE,
            isPopOverListVisible:true,
          };
        },

        render:function() {

          return <View style = {styles.container}>
            {this.renderSaveView()}
            {this.renderExtraButtons()}
            {this.renderListView()}
          </View>
        },


        renderSaveView:function() {
          return <View style = {[styles.saveView,]}>
            <View style = {[styles.textInputView, ]}>
              <TextInput style={[styles.textInput, this.border("burlywood")]} placeholder="Expense Name" autoCapitalize = 'words' onChangeText={(text)=>{this.shouldUpdateStateBool = false; this.setState({expenseName:text.trim()})}} ref = {(component) => {this._expenseNameTextInput = component}} maxLength={15}/>
              <TextInput style = {[styles.textInput, this.border("burlywood")]} placeholder="Value" onChangeText={(text)=>{this.shouldUpdateStateBool = false; this.setState({value:text.trim()})}} keyboardType="decimal-pad" ref = {(component) => {this._valueTextInput = component}}/>
            </View>
            <TextInput style = {[styles.textInput, this.border("burlywood")]} placeholder= "Note" onChangeText ={(text)=>{this.shouldUpdateStateBool = false; this.setState({note:text.trim()})}} ref = {(component) => this._noteInputText = component} maxLength={30} />
            {this.renderSaveButtons()}
          </View>;
        },
        renderSaveButtons:function() {

          return <View style = {[styles.textInputView, ]} >
            {this.renderTouchableHighlight(StringConstants.typesOfTransaction.foodType)}
            {this.renderTouchableHighlight(StringConstants.typesOfTransaction.travelType)}
            {this.renderTouchableHighlight(StringConstants.typesOfTransaction.shoppingType)}
            {this.renderTouchableHighlight(StringConstants.typesOfTransaction.homeType)}
            {this.renderTouchableHighlight(StringConstants.typesOfTransaction.otherType)}
          </View>;
        },
        renderTouchableHighlight:function(typeOfTransaction) {
          return <TouchableHighlight style = {[styles.saveButton,]} onPress={()=>this.handleSavePress(typeOfTransaction)} underlayColor = {"white"}>
            <TypeOfTransactionIcon typeOfTransaction = {typeOfTransaction} style = {{height:55, width:55, borderRadius:15}}/>
          </TouchableHighlight>
        },
        renderListView:function() {

          this.DeleteUtility.setThat(this);
          var currDate = new Date();
          return <MonthExpenseListView style = {styles.listViewStyle} transaction = {this.transaction} month = {currDate.getMonth()} year = {currDate.getFullYear()} deleteButtonPressed ={this.DeleteUtility} />

        },
        renderExtraButtons:function() {
          return <View style = {[styles.extraButtonViewStyle, ]} >

            <TouchableHighlight style = {[styles.extraButtonStyle, this.border("orange")]} onPress={this.showYearView} underlayColor = {"white"}>
              <View style={styles.extraButtonViewView}>
                <Image
                  resizeMode="cover"
                  style={[{height:30,width: 30,}]}
                  source={StringConstants.calenderImage}
                  />
                <Text style={styles.extraButtonTextStyle}>
                  {StringConstants.YEARVIEW}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        },
        clearText:function()
        {
          if (this._expenseNameTextInput && this._valueTextInput) {
            this._expenseNameTextInput.setNativeProps({text:""});
            this._valueTextInput.setNativeProps({text:""});
            this._noteInputText.setNativeProps({text:""});
            this.shouldUpdateStateBool = false;
            this.setState({
              note:"",
              expenseName:"",
              value:"",
            });
          } else {
            console.log("Error while clearing text");
          }
        },
        //this utility is being passed to the month_list_view and then eventually to the individual transaction_item view
        DeleteUtility:{
          that:"",
          setThat(money1) {
            this.that = money1;
          },
          deleteThisTransaction:function(transactionItem) {
          
            this.that.transaction.deleteTransaction(transactionItem);
            this.that.shouldUpdateStateBool = true;
            this.that.setState({transaction:this.that.transaction});
            AsyncStorage.setItem(StringConstants.TRANSACTION_ARRAY, JSON.stringify(this.that.transaction.getTransactionArray()));
          },

        },


        handleSavePress:function(typeOfTransaction) {

          this.shouldUpdateStateBool = true;
          //here i am trying to show the dialog if something goes wrong
          var shouldShowDialog = false;
          var dialogString = "Please enter ";
          if (this.state.expenseName === "") {
            shouldShowDialog = true;
            dialogString += "Expense Name";
          } else if (this.state.value === "") {
            shouldShowDialog = true;
            dialogString += " Expense Amount";
          } else if (isNaN(this.state.value)) {
            dialogString += " Valid number in Expense Amount";
            shouldShowDialog = true;
          }
          if (shouldShowDialog) {
            CommonMethods.showSingleButtonAlert({title:"Invalid Value(s)", message:dialogString, buttonText:"OK", buttonFunction:function(){}})
            //if any of the field is empty you can show a message or dialog or something
          } else {
            //if everything is alright save it.
            this.transaction.putNewTransaction(this.state.expenseName, this.state.value, typeOfTransaction.name, this.state.note);
            this.setState({transaction:this.transaction});
            // AsyncStorage.setItem()

            AsyncStorage.setItem(StringConstants.TRANSACTION_ARRAY, JSON.stringify(this.transaction.getTransactionArray()));
            this.clearText();
          }
        },


        border:function(color)
        {
          return {
            borderColor: color,
            borderWidth: 1
          };
        },

        showYearView:function() {
          this.props.navigator.push({
            name:'yearview',
            passProps:{
              transaction:this.transaction,
            }
          })
        },
      });
  AppRegistry.registerComponent('weather', () => MoneyNavigator);
