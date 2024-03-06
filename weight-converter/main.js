const weightUnits = [
    { name: "Ton", factor: 1e6 },
    { name: "Kilogram", factor: 1e3 },
    { name: "Gram", factor: 1 },
    { name: "Miligram", factor: 1e-3 },
    { name: "Microgram", factor: 1e-6 },
    { name: "Stone", factor: 6350.29 },
    { name: "Pound", factor: 453.59 },
    { name: "Ounce", factor: 28.34 }
];

// DOM Elements
let dropdownLeft = document.getElementById('dropdownLeft');
let dropdownRight = document.getElementById('dropdownRight');
let inputLeft = document.getElementById('inputLeft');
let inputRight = document.getElementById('inputRight');

// Add Event Listeners
inputLeft.addEventListener('input', convert);
inputRight.addEventListener('input', convert);
dropdownLeft.addEventListener('change', convert);
dropdownRight.addEventListener('change', convert);

// Add Weight Units to dropdown
weightUnits.forEach(weightUnit => {
    // Create option element for left dropdown
    let optionLeft = createOptionElement(weightUnit.name);
    dropdownLeft.appendChild(optionLeft);
    if (weightUnit.name === "Kilogram") {
        optionLeft.setAttribute('selected', 'selected');
    }

    // Create option element for right dropdown
    let optionRight = createOptionElement(weightUnit.name);
    dropdownRight.appendChild(optionRight);
    if (weightUnit.name === "Gram") {
        optionRight.setAttribute('selected', 'selected');
    }
});

function createOptionElement(weightUnit) {
    let option = document.createElement('option');
    option.innerText = weightUnit;
    option.setAttribute('id', weightUnit.toLowerCase());
    option.setAttribute('value', weightUnit.toLowerCase());
    return option;
}

// Conversion function
function convert() {
    let leftUnit = weightUnits.find(unit => unit.name.toLowerCase() === dropdownLeft.value);
    let rightUnit = weightUnits.find(unit => unit.name.toLowerCase() === dropdownRight.value);

    let result = inputLeft.value * (leftUnit.factor / rightUnit.factor);

    if (Number.isInteger(result)) {
        // Round to the nearest integer if the result is a whole number
        inputRight.value = result.toFixed(0).toLocaleString();
    } else {
        // Limiting the result to 4 decimal places if it's not a whole number
        inputRight.value = result.toFixed(4).toLocaleString();
    }
}