const temperatureUnits = [
    { name: "Celsius", factor: 1 },
    { name: "Fahrenheit", factor: 33.8 },
    { name: "Kelvin", factor: 274.15 },
    { name: "Rankine", factor: 493.47 },
];

const presets = [
    { name: "Celsius to Fahrenheit", inputLeft: "Celsius", inputRight: "Fahrenheit" },
    { name: "Fahrenheit to Celsius", inputLeft: "Fahrenheit", inputRight: "Celsius" },
    { name: "Celsius to Kelvin", inputLeft: "Celsius", inputRight: "Kelvin" },
]

// DOM Elements
let dropdownLeft = document.getElementById('dropdownLeft');
let dropdownRight = document.getElementById('dropdownRight');
let inputLeft = document.getElementById('inputLeft');
let inputRight = document.getElementById('inputRight');
let presetsDropdown = document.getElementById('presets');

// Add Event Listeners
inputLeft.addEventListener('input', convert);
inputRight.addEventListener('input', convert);
dropdownLeft.addEventListener('change', convert);
dropdownRight.addEventListener('change', convert);
presetsDropdown.addEventListener('change', changePreset)

// Add Temperature Units to dropdown
temperatureUnits.forEach(unit => {
    // Create option element for left dropdown
    let optionLeft = createOptionElement(unit.name);
    dropdownLeft.appendChild(optionLeft);
    if (unit.name === "Celsius") {
        optionLeft.setAttribute('selected', 'selected');
    }

    // Create option element for right dropdown
    let optionRight = createOptionElement(unit.name);
    dropdownRight.appendChild(optionRight);
    if (unit.name === "Fahrenheit") {
        optionRight.setAttribute('selected', 'selected');
    }
});

// Add presets dropdown
presets.forEach(preset => {
    let presetOptions = createOptionElement(preset.name);
    presetsDropdown.appendChild(presetOptions);
})

function createOptionElement(unit) {
    let option = document.createElement('option');
    option.innerText = unit;
    option.setAttribute('id', unit.toLowerCase());
    option.setAttribute('value', unit.toLowerCase());
    return option;
};

//Conversion function
function convert() {
    if (isNaN(inputLeft.value) || isNaN(inputRight.value)) {
        alert('Invalid input, please insert a number.')
        return;
    }

    let leftUnit = temperatureUnits.find(unit => unit.name.toLowerCase() === dropdownLeft.value);
    let rightUnit = temperatureUnits.find(unit => unit.name.toLowerCase() === dropdownRight.value);

    let result = inputLeft.value * (rightUnit.factor / leftUnit.factor);

    if (Number.isInteger(result)) {
        // Round to the nearest integer if the result is a whole number
        inputRight.value = result.toFixed(0).toLocaleString();
    } else {
        // Limiting the result to 4 decimal places if it's not a whole number
        inputRight.value = result.toFixed(2).toLocaleString();
    }
}

// Change preset function
function changePreset() {
    let selectedPresetName = presetsDropdown.value.toLowerCase(); // Convert the selected preset name to lowercase
    let selectedPreset = presets.find(preset => preset.name.toLowerCase() === selectedPresetName); // Compare lowercase preset names
    if (selectedPreset) {
        dropdownLeft.value = selectedPreset.inputLeft.toLowerCase();
        dropdownRight.value = selectedPreset.inputRight.toLowerCase();
        convert();
    }
}