// initialize dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// state the connection credentials to the database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "bamazonDB"
});

// start the connection
connection.connect(function (err) {
    if (err) {
        console.log("error connect: " + err.stack)
    }
    // start the function that presents the items in the database
    loadProducts();
});



function loadProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        // throw error if there's a problem
        if (err) throw err;
        // otherwise, present a table of the items
        console.table(res);
        promptUserID();
    });

}

function promptUserID() {
    inquirer
        .prompt([
            /* Pass your questions in here */
            {
                type: "input",
                name: "itemID",
                message: "Search by ID for the product you're looking for: "
            }
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
            if (answers.itemID) {
                connection.query("SELECT id, product_name, dept_name, price, stock_quantity FROM products WHERE ?",
                    {
                        id: answers.itemID
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        purchaseItem(answers.itemID);
                    });
            } else {
                console.log("Sorry that item is unavailable. \n");
                loadProducts();
            }
        });
};

function purchaseItem(a) {
    inquirer
        .prompt([
            /* Pass your questions in here */
            {
                type: "input",
                name: "amount",
                message: "How many would you like to buy?"
            }
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
            console.log("you would like to buy " + answers.amount + " from our stock");
            if (answers.amount > 0) {
                console.log("You want more than one with id of ", a);
                connection.query("SELECT * FROM products WHERE ?",
                    {
                        id: a
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                         let newQuantity = res[0].stock_quantity - answers.amount;
                         if (res[0].stock_quantity >= answers.amount){
                        connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                id: a
                            }],
                            function (err) {
                                if (err) throw err;
                                // then...
                                console.log("Your purchase is: $" + newQuantity * a + "\n");
                                console.log(a + " products purchased! \n");
                                loadProducts();
                        })} else {
                            console.log("Unable to get that quantity. Please wait for our next shipment!");
                            loadProducts();
                        };
                    });
               
                
            }
        });
}
