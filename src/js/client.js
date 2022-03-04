import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';

const api = new ExcursionsAPI();

loadExcursions();
validateOrderForm();

const cart = [];

// LOAD EXCURSIONS

function loadExcursions() {
    api.loadData()
    .then(data => {insertExcursions(data);
    })
    .catch((err) => console.error(err));
}

function insertExcursions(data) {
    const ulEl = document.querySelector(".excursions");
    const excursionPrototype = document.querySelector(".excursions__item--prototype");
    data.forEach((item) => {
        console.log(item);
        let liEl = excursionPrototype.cloneNode(true);
        const title = liEl.querySelector(".excursions__title");
        const description = liEl.querySelector(".excursions__description");
        const adultPrice = liEl.querySelector(".excursions__adultprice");
        const childPrice = liEl.querySelector(".excursions__childprice");
        title.textContent = item.name;
        description.textContent = item.description;
        adultPrice.textContent = item.adultPrice;
        childPrice.textContent = item.childPrice;
        liEl.dataset.id = item.id;
        liEl.classList.remove("excursions__item--prototype");
        ulEl.appendChild(liEl);
        addExcursions(liEl);
    })
}

// ADD EXCURSIONS TO THE BASKET

function addExcursions(liEl) {
    liEl.querySelector(".excursions__field--submit").addEventListener("click", event => {
        event.preventDefault();
        const adultNumber = liEl.querySelector("input[name=adults]").value;
        const childNumber = liEl.querySelector("input[name=children]").value;
        const name = liEl.querySelector(".excursions__title").textContent;
        const childPrice = liEl.querySelector(".excursions__childprice").textContent;
        const adultPrice = liEl.querySelector(".excursions__adultprice").textContent;
        const id = getIdFromRoot(liEl);
        console.log(id);
        addItem(name, adultNumber, adultPrice, childNumber, childPrice, id);
        liEl.querySelector("form").reset();
    });
}

function addItem(name, adultNumber, adultPrice, childNumber, childPrice, id) {
    const validedChildNumber = validateExcursionFields(childNumber);
    const validedAdultdNumber = validateExcursionFields(adultNumber);
    const item = {
        name: name, adultNumber: validedAdultdNumber, adultPrice: adultPrice, childNumber: validedChildNumber, childPrice: childPrice, id: id
    };
    if(!isInCart(item.name)){
        cart.push(item);
        createBasketItems();
    }   
}

function createBasketItems() {
    const ulEl = findUl();
    const liPrototypeBasket = findPrototype();
    clearElement(ulEl);
    ulEl.appendChild(liPrototypeBasket);
        cart.forEach(function(item) {
            let newBasketItem = liPrototypeBasket.cloneNode(true);
            ulEl.appendChild(newBasketItem);
            newBasketItem.style.display = "block";
            const newTitle = newBasketItem.querySelector(".summary__name");
            const pricesSummary = newBasketItem.querySelector(".summary__prices");
            newTitle.textContent = item.name;
            pricesSummary.textContent = "Dorośli:" + " " + `${item.adultNumber}` + "x" + " " + `${item.adultPrice}` + "PLN" + "," + " " + "Dzieci:" + " " + `${item.childNumber}` + "x" + `${item.childPrice}` + "PLN";
            newBasketItem.querySelector(".summary__total-price").textContent = getItemTotal(item.childNumber,item.childPrice, item.adultNumber,item.adultPrice) + " " + "PLN";
            newBasketItem.classList.remove("summary__item--prototype");
            newBasketItem.classList.add("summary__item--new");
            newBasketItem.dataset.id = item.id;
            removeBasketItem()
    })
    document.querySelector(".order__total-price-value").textContent = getfinalTotal() + " " + "PLN";
}

// REMOVE EXCURSIONS


function removeBasketItem () {
    const ulEl = findUl();
    ulEl.addEventListener("click", e => {
        const parentEl = e.target.parentElement;
        const id = parentEl.dataset.id;
        console.log(id);
        if (e.target.classList.contains('summary__btn-remove')) {
            for (let i = 0; i < cart.length; i += 1) 
                if (cart[i].id === id) {
                cart.splice(i, 1);
                e.target.parentElement.remove();
                console.log(cart);
                console.log(e.target.id);
        }
    }
    createBasketItems();
    })
}



function validateExcursionFields (num) {
    if (num === "") {
        num = 0;
        }
    const convertednum = convertNumber(num);
    if(!isCorrectNumber(convertednum)) {
       return alert ("Mozesz podac tylko liczbe. Jedna z wartosci nie jest liczba");
    }
    return convertednum;
}

function convertNumber (num) {
    const convertedNum = parseFloat(num);
    return convertedNum;
}

function isCorrectNumber (num) {
    if(Number.isNaN(Number(num))) {
        return false;
    }
    return true;
}

function getItemTotal (num1, num2, num3, num4) {
    let result = (num1 * num2) + (num3 * num4)
    return result;
}

function getfinalTotal() {
    let total = 0
    for (let i = 0; i < cart.length; i += 1) {
      total += getItemTotal(cart[i].adultNumber, cart[i].adultPrice, cart[i].childNumber, cart[i].childPrice);
    }
    return total
}


function findUl() {
    return document.querySelector(".panel__summary");
}

function findPrototype() {
    return document.querySelector(".summary__item--prototype");
}

function getIdFromRoot(item) {
    return item.dataset.id;
}

function clearElement(element) {
    element.innerHTML = '';
}

function isInCart(name) {
    return !!cart.find(obj => obj.name === name);
}

// FORM VALIDATION


function validateOrderForm () {
    const submitBtn = document.querySelector(".order__field-submit");
    const nameField = document.querySelector("input[name=name]");
    const surnameField = document.querySelector("input[name=surname]");
    const emailField = document.querySelector("input[name=email]");
    submitBtn.addEventListener("click", e => {
        const errors = [];
        
        if (!emailField.value.includes('@')) {
            errors.push(emailField);
        } else {
            changeBackSettings(emailField);
        }
        
        if (nameField.value.length === 0) {
            errors.push(nameField);
        } else {
            changeBackSettings(nameField);
        }

        if (surnameField.value.length === 0) {
            errors.push(surnameField);
    
        } else {
            changeBackSettings(surnameField);
        }
                  
        if(errors.length > 0) {
            e.preventDefault();
            errors.forEach(function(element) {
            element.style.border = "2px solid red";
            })
        }  

        function placeOrder() {
            const data = {name: nameField.value, surname: surnameField.value, email: emailField.value, order: cart
        };
          
            api
              .addOrder(data)
              .catch((err) => console.error(err))
              .finally();
        }
     
        if(errors.length === 0) {
            e.preventDefault();
            if(cart.length > 0) {
                placeOrder();
                clearCart();
                document.querySelector(".panel__order").reset();
                const totalSumSpan = document.querySelector(".order__total-price-value")
                alert("Dziękujemy za złożenie zamówienia o wartości" + " " + `${totalSumSpan.textContent}` + " " + "Szczegóły zamówienia zostały wysłane na adres e-mail: adres@wpisanywformularzu.pl");
                totalSumSpan.textContent = " ";
            } else {
                alert("Jeszcze nie wybrales zadnej wycieczki. Zapoznaj sie z naszym katalogiem");
            }
        }
    })

}

function changeBackSettings(el) {
    el.style.border = "2px inset grey"
}

function clearCart() {
    const basketItems = document.querySelectorAll(".summary__item--new");
    basketItems.forEach(function(item) {
        item.remove();
    })
}

