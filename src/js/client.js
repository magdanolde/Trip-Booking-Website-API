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
    const ulEl = findUl();
    const excursionPrototype = findPrototype();
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
    })
}

function findUl() {
    return document.querySelector(".panel__excursions");
}

function findPrototype() {
    return document.querySelector(".excursions__item--prototype");
}

function getIdFromRoot(item) {
    return item.dataset.id;
}