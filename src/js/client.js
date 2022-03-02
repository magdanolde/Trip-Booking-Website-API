import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';

const api = new ExcursionsAPI();

loadExcursions();

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
        const id = getIdFromRoot(liEl);
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
    addItem(name, adultNumber, adultPrice, childNumber, childPrice, id)
    });
}

function addItem(name, adultNumber, adultPrice, childNumber, childPrice, id) {
    const item = {
        name: name, adultNumber: adultNumber, adultPrice: adultPrice, childNumber: childNumber, childPrice: childPrice, id: id
    };
    if(!isInCart(item.name)) {
        cart.push(item);
        console.log(cart);
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
        const validedChildNumber = validateExcursionFields(item.childNumber);
        const validedAdultdNumber = validateExcursionFields(item.adultNumber);
        pricesSummary.textContent = "Dorośli:" + " " + `${validedAdultdNumber}` + "x" + " " + `${item.adultPrice}` + "PLN" + "," + " " + "Dzieci:" + " " + `${validedChildNumber}` + "x" + `${item.childPrice}` + "PLN";
        newBasketItem.querySelector(".summary__total-price").textContent = getItemTotal(item.childNumber,item.childPrice, item.adultNumber,item.adultPrice) + " " + "PLN";
        newBasketItem.classList.add('summary__item--new');
    })
    document.querySelector(".order__total-price-value").textContent = getfinalTotal() + " " + "PLN";
}

function validateExcursionFields (num) {
    if (num === "") {
        num = 0;
        }
    const convertednum = convertNumber(num);
    if(!isCorrectNumber(convertednum)) {
        alert ("Mozesz podac tylko liczbe. Jedna z wartosci nie jest liczba");
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
    return cart.indexOf(name) >= 0;
}
