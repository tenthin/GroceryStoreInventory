// JavaScript Assignment: Grocery Store Inventory and Billing System

// Step 1: Define Product Objects
// Define at least 4 product objects, each with the following properties:
// - name (string): The product’s name.
// - price (number): The cost of one unit of the product.
// - quantity (number): The number of units available in stock.
// - discount (number): The percentage discount available on this product (e.g., 10 for 10% off).
// - lowStockThreshold (number): The quantity threshold to determine if stock is low.

// Example:
// let product1 = { name: "Apples", price: 1.5, quantity: 20, discount: 10, lowStockThreshold: 10 };
// Define product2, product3, product4 similarly with unique values for each product.

let product1 = {name:"Apple", price: 4.0, quantity: 5, discount: 10, lowStockThreshold: 5};
let product2 = {name:"Banana", price: 2.0, quantity: 15, discount: 20, lowStockThreshold:75};
let product3 = {name:"Orange", price: 9.0, quantity: 50, discount: 5, lowStockThreshold: 6};
let product4 = {name:"Pineapple", price: 10.0, quantity: 35, discount: 10, lowStockThreshold: 10};
let product5 = {name:"Mango", price: 3.0, quantity: 25, discount: 10, lowStockThreshold: 5};



// Step 2: Store Products in Array
// Once you’ve defined each product, store them all in an array named products.
let products = [product1 , product2, product3, product4, product5];


// Step 3: Calculate Total Cost After Discount with Discount Tiering
// Create a function named calculateTotalCost that takes a product object as input and calculates
// the total cost for all units of that product after applying its discount.
// Note that the discount may change based on the quantity:
// - For medium-sized orders, add an additional 5% discount.
// - For larger orders, apply an additional 10% discount.
// Inside the function, use this adjusted discount to calculate the total cost and return the result.

function calculateTotalCost(product) {
    // Initialize a variable for the discount.
    let discount = product.discount;

    // Adjust the discount based on quantity.
    // (Hint: Use conditional statements to check for medium-sized or large order quantities to add the extra discount.)

    if (product.quantity >= 10 && product.quantity <= 50) {
        //medium sized quantity is between 10 and 50
        discount += 5;
    }else if (product.quantity > 50){
        //large sized quantity is greater than 50
        discount += 10;
    }
    // Calculate and return the total cost after applying the adjusted discount.
    // Use the product's price, quantity, and discount to find this value.
    const totalCost = product.price * product.quantity * (1 - discount / 100);

    return totalCost;
}

// Step 4: Determine Low Stock
// Create a function named isLowStock that checks if a product's quantity is below its lowStockThreshold.
// If the quantity is lower than the threshold, return true to indicate low stock; otherwise, return false.

function isLowStock(product) {
    // Compare the product quantity with its lowStockThreshold and return the appropriate value.
    if (product.quantity < product.lowStockThreshold) {
        return true; 
    } else {
        return false;
    }
}


// Step 5: Calculate Total Revenue
// Create a function named calculateTotalRevenue that calculates the overall revenue for all products.
// To do this, you’ll need to loop through each product in the products array and add up the total cost of each.

function calculateTotalRevenue(products) {
    // Initialize a variable to store the total revenue.
    let totalRevenue = 0;

    // Loop through each product in the products array.
    for(let i = 0; i < products.length; i++){
        // For each product, add its total cost (calculated by the calculateTotalCost function) to the total revenue.
        totalRevenue += calculateTotalCost(products[i]);
    }

    // Return the calculated total revenue.
    return totalRevenue;
}


// Step 6: Calculate Average Price
// Create a function named calculateAveragePrice to find the average unit price of all products.
// Use the price of each product and the number of products to calculate this value.

function calculateAveragePrice(products) {
    // Initialize a variable to store the total of all prices.
    let totalPrice = 0;

    // Loop through each product to add its price to the total.
for(let i = 0; i< products.length; i++){
    totalPrice += products[i].price;
}
    // Calculate and return the average price by dividing the total by the number of products.
    let averagePrice = totalPrice/products.length;
    return averagePrice;
}


// Step 7: Display Product and Store Summaries
// Create a function named displaySummary that outputs the product details and store summary in the HTML.
// This function will update the webpage to show information on each product, the total revenue, and average price.

function displaySummary(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear existing content

    // Loop through each product to display its details
    products.forEach(product => {
        // Calculate the total cost of the product after discount.
        const totalCost = calculateTotalCost(product);

        // Check if the product has low stock and prepare a low stock message if true.
        const lowStockMessage = isLowStock(product) ? " (Low Stock)" : "";

        // Create a new div element for each product to display its details.
        const productItem = document.createElement("div");
        productItem.className = "product-item";
        productItem.innerHTML = `
            <strong>${product.name}</strong><br>
            Unit Price: $${product.price.toFixed(2)}<br>
            Quantity: ${product.quantity}<br>
            Discount: ${product.discount}%<br>
            Total Cost After Discount: $${totalCost.toFixed(2)} <span class="${isLowStock(product) ? "low-stock" : ""}">${lowStockMessage}</span>
        `;
        productList.appendChild(productItem);
    });

    // Display total revenue and average price by calling the appropriate functions.
    document.getElementById("total-revenue").textContent = `$${calculateTotalRevenue(products).toFixed(2)}`;
    document.getElementById("average-price").textContent = `$${calculateAveragePrice(products).toFixed(2)}`;
}

// Execute displaySummary to populate the page with initial data
displaySummary(products);
