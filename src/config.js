
var foodImage = require("../images/food.png");
var checkImage = require("../images/check.png");
var homeImage = require("../images/home.png");
var shoppingImage = require("../images/shopping.png");
var travelImage = require("../images/travel.png");
var settingsImage = require("../images/settings.png");
var calenderImage = require("../images/calender.png");
var StringConstants = {
  EMPTY_INPUT_TEXT:"Please Enter Text And Witness Magic",
  INSTRUCTION:"Text Entered will be Saved",
  KEY:"Key",
  TRANSACTIONS:"tranasctions",
  TRANSACTION_ARRAY:"transactionArray",
  SELECT_TRANSACTION_TYPE:"Select Transaction Type",
  CATEGORIES:"Categories",
  TRANSACTIONS:"TRANSACTIONS",
  SETTINGBUTTON:"Settings",
  YEARVIEW:"Year At View",
  NAVIGATOR:{
    YEARVIEW:"yearview",
    START:"start",
    MONTHVIEW:"monthview",
    TRANSACTIONVIEW:"transactionview",
  },
  nameTypeOfTransaction:["Food", "Travel", "Shopping", "Home", "Other"],
    settingImage:settingsImage,
  calenderImage:calenderImage,
  typesOfTransaction: {
    foodType: {
      name:"Food",
      color:"#FF9100",
      image:foodImage,
    },
    travelType: {
      name:"Travel",
      color:"#C6FF00",
      image:travelImage,
    },
    shoppingType: {
      name:"Shopping",
      image:shoppingImage,
      color:"#1DE9B6",
    },
    homeType: {
      name:"Home",
      image:homeImage,
      color:"#00E5FF",
    },
    otherType: {
      name: "Other",
      image:checkImage,
      color:"#D500F9",
    },
  },
  getTypeFromName:function(nameOfTransaction)
  {

    var keys = Object.keys(this.typesOfTransaction);
    length = keys.length;
    var i = 0;
    for (i = 0; i < length; i++) {
      if (keys[i].toLowerCase().includes([nameOfTransaction.toLowerCase()]))
        return this.typesOfTransaction[keys[i]];
    }


  },

}

module.exports = StringConstants;
