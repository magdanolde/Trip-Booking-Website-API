import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';


document.addEventListener('DOMContentLoaded', init);
const api = new ExcursionsAPI();

function init() {
    console.log('DOM');
    loadExcursions();
    addExcursions();
    // removeExcursions();
    // editExcursions();
}

// LOAD EXCURSIONS

function loadExcursions() {
    api.loadData()
        .then(data => {insertExcursions(data);
        })
        .catch((err) => console.error(err));
}

// INSERT EXCURSIONS

function insertExcursions (data) {
    const excursionPrototype = document.querySelector(".excursions__item--prototype");
    const ulEl = document.querySelector(".panel__excursions");
    data.forEach((item) => {
        const liEl = excursionPrototype.cloneNode(true);
        liEl.dataset.id = item.id;
        const title = liEl.querySelector(".excursions__title");
        const description = liEl.querySelector(".excursions__description");
        const adultPrice = liEl.querySelector(".exursions__price-adult");
        console.log(adultPrice);
        const childPrice = liEl.querySelector(".exursions__price-child");
        title.textContent = item.name;
        description.textContent = item.description;
        adultPrice.textContent = item.adultPrice;
        childPrice.textContent = item.childPrice;
        liEl.classList.remove("excursions__item--prototype");
        ulEl.appendChild(liEl);
  
  });

}

// ADD EXCURSIONS

function addExcursions() {
    const form = document.querySelector('.form');
    form.addEventListener("submit", event => {
    event.preventDefault();
        const {name, description, adultPrice, childPrice} = event.target.elements;
        const data = {
            name: name.value, description: description.value, adultPrice: adultPrice.value, childPrice: childPrice.value
        };
        api.addData(data)
        .catch(err => console.error(err))
        .finally( () => loadExcursions() );
    });
}
  
  























