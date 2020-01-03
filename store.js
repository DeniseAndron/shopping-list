//----- This event will check if the page is loading, will run the if code. if not we want to run that ready function no matter what

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// ---- The function ready contain the buttons , so the buttons will be loading even if the page is not fully loaded
    // ----  select the remove buttons and add an event when you click them
    //we create a loop while i < than the buttons we have , it will loop through all 
    // the actual button and remove from i as a loop
    // ----  corresponds to one of the remove buttons, click event with the function event 
    //  ---- In the moment you click on the button, will erase the parent element of the parent element which is the item from the cart

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

     // We want our total to update according to quantity and we do not want the possibility to input negative numbers
    // The variable input will take any input we put , itteration 
    // change so it listens everytime it changes it' value

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    // --  The Add to Cart button
    // We create a loop for our button with the event click and the function addToCartClicked

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

  //--- While cartitems has something, will loop and will remove everything 
    //--- We called the Cart Total

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

    // -- What to do when the quantity it's changed
    // -- The target of the event will be the actual input element that we need
    // --  If the input it's not a number or if it's less than 0, input has the value 1 when you take out your click from inside

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}


    // --- The function  addToCartClicked from the Add to Cart button
    // --- We need to add the title, the price and the src of the image
    // --- For the source of an image you put src instead of innerText
    // --- We aded the updateCartTotal so the total will update

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

// --- We create a function with the title price and image and with a new element div
    //-- We add them to the cart items
    //--The append will put the cart Row at the end of the Cart Items
    // -- We use innerHTML because we use html inside the the variable
    //--- We took the html of an item from the store.html and we replaced the actual image title and price with the tag for them so will load each element
 // --- If the item already exists, the title, it will put an alert and will exit the execution with the return

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

// --------------    Cart Total   -------------
    // They all have the cart-items class and inside they have the cart-row for each item in the cart
    // We select on all the items and then the 0 , meaning the first item inside, the rows
    // Then we use a loop for cartRows, cartrow will have the syntax of the cartRows
    // We want the cart total to contain the price , we get the element with cartRow from the class where the price is, same with quantity
    // As the Total was set before, we assign 0 to it then we equal total + total and price * quantity , 9 + quantity 2 = 18
    // Replace all '$' with '' then ut parseFloat so that the price element within price is a number with decimals
    // Quantity it's an input so we need the value 

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }

    //---- We take the total class from html and we assign the total from above to it
        // --- We always want the number to have only 2 decimals
        
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}