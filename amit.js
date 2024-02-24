// Retrieve products from Local Storage on page load
document.addEventListener("DOMContentLoaded", function() {
    var storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    }
    
    // Initialize search functionality
    updateSearchFunctionality();
    
    // Add form submission event listener
    document.getElementById("productForm").addEventListener("submit", handleFormSubmission);
});

// Function to search for a product by code
function searchProduct(code) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].code === code) {
            return products[i];
        }
    }
    return null;
}

// Function to display product information
function displayProduct(product) {
    var productInfoDiv = document.getElementById("productInfo");
    if (product) {
        productInfoDiv.innerHTML = `
            <h2>${product.name}</h2>
            <p><strong>Product Code:</strong> ${product.code}</p>
            <p><strong>Type:</strong> ${product.type}</p>
            <p><strong>Material:</strong> ${product.material}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            <img src="${product.image}" alt="${product.name}">
        `;
    } else {
        productInfoDiv.innerHTML = "არ გაქვს დამატებული პროდუქტი.";
    }
}

// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault();

    // Get form values
    var productName = document.getElementById("productName").value;
    var productCode = document.getElementById("productCode").value;
    var productType = document.getElementById("productType").value;
    var productMaterial = document.getElementById("productMaterial").value;
    var productDescription = document.getElementById("productDescription").value;
    var productImage = document.getElementById("productImage").files[0];

    // Check if product with the same code already exists
    var existingProduct = searchProduct(productCode);
    if (existingProduct) {
        alert("არ არის დამატებული პროდუქტი.");
    } else {
        // Simulate saving to server (replace with actual server-side code)
        var product = {
            name: productName,
            code: productCode,
            type: productType,
            material: productMaterial,
            description: productDescription,
            image: productImage ? productImage.name : "" // Assuming you store the filename
        };
        products.push(product); // Add the new product to the array

        // Save products to Local Storage
        localStorage.setItem('products', JSON.stringify(products));

        // Display success message
        alert("Product added successfully!");

        // Reset form
        document.getElementById("productForm").reset();
        
        // Update search functionality
        updateSearchFunctionality();
    }
}

// Function to update search functionality
function updateSearchFunctionality() {
    var searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", function(event) {
        var searchValue = event.target.value.trim();
        if (searchValue.length > 0) {
            var product = searchProduct(searchValue);
            displayProduct(product);
        } else {
            document.getElementById("productInfo").innerHTML = "";
        }
    });
}
