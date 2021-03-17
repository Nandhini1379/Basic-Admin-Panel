let url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
let responseData = [];
let dataPane = document.getElementById("table-data").childNodes[1].childNodes[1];
let infoContent = document.getElementById("info-content");
let userPlaceholder = document.getElementById("userPlaceholder");
let descrptionPlaceholder = document.getElementById("descrptionPlaceholder");
let addressPlaceholder = document.getElementById("addressPlaceholder");
let cityPlaceholder = document.getElementById("cityPlaceholder");
let statePlaceholder = document.getElementById("statePlaceholder");
let zipPlaceholder = document.getElementById("zipPlaceholder");
let searchBox = document.getElementById("search-box");
let eleRefs = [];
let fNames = [];
let prevEle = null;

fetch(url)
.then(response => response.json())
.then(data => {
    data.forEach(e => responseData.push(e));
    loadData();
});

function loadData() {
    let df = document.createDocumentFragment();
    responseData.forEach(element => {
        let newEle = document.createElement("tr");
        newEle.classList.add("data-row");
        newEle.addEventListener("click", clickHandler);
        newEle.innerHTML = `
        <td class="column1">${element.id}</td>
        <td class="column2">${element.firstName}</td>
        <td class="column3">${element.lastName}</td>
        <td class="column4">${element.email}</td>
        <td class="column5">${element.phone}</td>
        `;
        eleRefs.push(newEle);
        fNames.push(element.firstName);
        df.appendChild(newEle);
    });
    dataPane.appendChild(df);
    searchBox.addEventListener("input", searchHandler);
}

function clickHandler(event) {
    if(prevEle !== null) {
        prevEle.classList.remove("active");
    }
    prevEle =  event.target.parentNode;
    prevEle.classList.add("active")
    if(infoContent.style.display == "") {
        infoContent.style.display = "block";
    }
    for(let i = 0; i < eleRefs.length; i++) {
        if(eleRefs[i] === prevEle) {
            userPlaceholder.innerText = `${responseData[i].firstName} ${responseData[i].lastName}`;
            descrptionPlaceholder.innerText = responseData[i].description;
            addressPlaceholder.innerText = responseData[i].address.streetAddress;
            cityPlaceholder.innerText = responseData[i].address.city;
            statePlaceholder.innerText = responseData[i].address.state;
            zipPlaceholder.innerText = responseData[i].address.zip;
            break;
        }
    }
}

function searchHandler() {
    console.log("searchHandler called!");
    if(searchBox.value == "") {
        eleRefs.forEach(e => e.hidden = false);
    } else {
        for(let i = 0; i < fNames.length; i++) {
            if(!fNames[i].includes(searchBox.value)) {
                eleRefs[i].hidden = true;
            } else {
                eleRefs[i].hidden = false;
            }
        }
    }
}