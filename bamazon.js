// initialize dependecies
var mysql = require('mysql');
var inquirer = require('inquirer');


// initialize the connection variable to sync with a mysql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "bamazonDB"
})

// create the connection with the server and load the product data
connection.connect(function (err) {
    if (err) {
        console.log("error connect: " + err.stack)
    }
    loadProducts()
});


// loads products from DB
function loadProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // displays items in table
        console.table(res);

        // prompts the customer to choice of item
        promptCustomerForItem(res);
    })

};

// prompt the user for ID
function promptCustomerForItem(products){
    inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: "input",
        name: "itemID",
        message: "Choose the item ID of what you're searching for: "
    }
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    
    if (answers.itemID){
        checkInventory()
    }

  });

};


// prompt customer for quantity
function promptCustomerForQuantity(){
    inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  });

};

// Purchase function

function purchaseItem(){
    inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: "input",
        name: "purchase",
        message: "what would you like to purchase from the list?"
    }
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  });

};

// check inventory to see if the user choice exists in the inventory (for loop with comparison)(if/else)
function checkInventory(){
    connection.query(
        "SELECT id FROM products WHERE ?",
        {
            
        }

    )

};

// check for user to quit the program (optional)
function checkForExit(){
    inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  }); 

};