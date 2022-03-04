import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';


document.addEventListener('DOMContentLoaded', init);
const api = new ExcursionsAPI();

function init() {
    console.log('DOM');
    loadExcursions();
    addExcursions();
    removeExcursions();
    updateExcursions();
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
    const excursionPrototype = findPrototype();
    const ulEl = findUl();
    clearElement(ulEl);
    ulEl.appendChild(excursionPrototype);
    data.forEach((item) => {
        const liEl = excursionPrototype.cloneNode(true);
        liEl.dataset.id = item.id
        const title = liEl.querySelector(".excursions__title");
        const description = liEl.querySelector(".excursions__description");
        const adultPrice = liEl.querySelector(".exursions__price-adult");
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
    const form = document.querySelector(".form");
    form.addEventListener("submit", event => {
    event.preventDefault();
        const {name, description, adultPrice, childPrice} = event.target.elements;
        const data = {
            name: name.value, description: description.value, adultPrice: adultPrice.value, childPrice: childPrice.value
        };
        api.addData(data)
        .catch(err => console.error(err))
        .finally( () => loadExcursions() );
    form.reset();
    });
}

// REMOVE EXCURSIONS

function removeExcursions() {
    const ulEl = findUl();
    ulEl.addEventListener("click", (e) => {
      e.preventDefault();
      const targetEl = e.target;
      if(targetEl.classList.contains('excursions__field-input--remove')) {
        const parentEl = findItemRoot(targetEl)
        console.log(parentEl);
        const id = getIdFromRoot(parentEl);
        api.removeData(id)
          .catch((err) => console.error(err))
          .finally( loadExcursions() );
      }
    
    });
}
  
 // UPDATE EXCURSIONS 

 function updateExcursions() {
    const ulEl = findUl();
    ulEl.addEventListener("click", (e) => {
        const targetEl = e.target;
        if (targetEl.classList.contains("excursions__field-input--update")) {
            const parentEl = findItemRoot(targetEl);
            const spanList = findItemSpans(parentEl);
            const isEditable = [...spanList].every((span) => span.isContentEditable);
            if (isEditable) {
                const id = getIdFromRoot(parentEl);
                const data = {
                    name: spanList[0].innerText,
                    description: spanList[1].innerText,
                    adultPrice: spanList[2].innerText,
                    childPrice: spanList[3].innerText,
                };
                api.updateData(data, id)
                .catch((err) => console.error(err))
                // .finally(() => {
                targetEl.innerText = "edytuj";
                spanList.forEach((span) => (span.contentEditable = false));
                // });
            } 
            else {
                targetEl.innerText = "zapisz";
                spanList.forEach((span) => (span.contentEditable = true));
            }
        }
    });
}

function findUl() {
    return document.querySelector(".panel__excursions");
}

function findPrototype() {
    return document.querySelector(".excursions__item--prototype");
}

function clearElement(element) {
    element.innerHTML = '';
}

function getIdFromRoot(item) {
    return item.dataset.id;
}

function findItemRoot(targetElement) {
    return targetElement.parentElement.parentElement.parentElement;
}

function findItemSpans (itemRoot) {
    return itemRoot.querySelectorAll("span");
}



















