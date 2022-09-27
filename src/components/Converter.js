import React, { useState, useEffect } from "react";
import IngredientList from './IngredientList';

export default function Converter() {

    // List of volume units usable for conversion
    const volumeList = [
        "Liters",
        "Milliliters",
        "Gallons (US)",
        "Quarts (US)",
        "Pints (US)",
        "Cups (US)",
        "Fluid Ounces (US)",
        "Tablespoons (US)",
        "Teaspoons (US)",
    ];

    // List of weight units usable for conversion
    const weightList = [
        "Grams",
        "Kilograms",
        "Pounds (US)",
        "Ounces (US)",
    ];

    // [VOLUME START UNIT] Calculation to multiply by for gram related conversions (volume to gram, or gram to kilogram)
    const calcList = {
        Liters: 1000,
        Milliliters: 1,
        GallonsUS: 3785.41178,
        QuartsUS: 946.352946,
        PintsUS: 473.176473,
        CupsUS: 236.588236,
        FluidOuncesUS: 29.57353,
        TablespoonsUS: 14.786765,
        TeaspoonsUS: 4.928922,
        Grams: 1,
        Kilograms: 0.001,
        PoundsUS: 0.002205,
        OuncesUS: 0.035274,
    }

    // [WEIGHT START UNIT] Calculation to multiply by for gram related conversions (weight to gram, or gram to volume)
    const calcListWeight = {
        Liters: 0.001,
        Milliliters: 1,
        GallonsUS: 0.000264,
        QuartsUS: 0.001057,
        PintsUS: 0.002113,
        CupsUS: 0.004227,
        FluidOuncesUS: 0.033814,
        TablespoonsUS: 0.067628,
        TeaspoonsUS: 0.202884,
        Grams: 1,
        Kilograms: 1000,
        PoundsUS: 453.59237,
        OuncesUS: 28.349523,
    }

    // Assigning the initial calcState to default values, these will change depending on user input for the form
    const [calcState, setCalcState] = useState({
        amount: 1,
        startUnit: "Cups (US)",
        ingredient: "",
        endUnit: "Grams",
    });

    // Assigning the initial unitState to volume, will change depending on if user wants volume>weight or weight>volume
    const [unitState, setUnitState] = useState("volume");

    // Assigning the initial ConvertToUnitState to weight, will change depending on if user wants volume>weight or weight>volume
    const [convertToUnitState, setConvertToUnitState] = useState("weight");

    // Destructuring the properties of calcState
    const { amount, startUnit, ingredient, endUnit } = calcState;

    // Assigning startUnitState to the hiddenElement class, will change state between invisible and visible when opening dropdown menu
    const [startUnitState, setStartUnitState] = useState("hiddenElement");

    // Assigning endUnitState to the hiddenElement class, will change state between invisible and visible when opening dropdown menu
    const [endUnitState, setEndUnitState] = useState("hiddenElement");

    // Assigning ingredientState to empty value, will change state between invisible and visible when focusing/typing on ingredient input field
    const [ingredientState, setIngredientState] = useState("");

    // Assigning ingredientSelectState to empty value, will change state to display bouncing animation when user selects item from ingredient list
    const [ingredientSelectState, setIngredientSelectState] = useState("");

    // Assigning clickedState to an object of empty values, will change each property value to a class name once focused/selected, making it change appearance
    const [clickedState, setClickedState] = useState({start: "", ingredient: "", end: ""});

    // Assigning bounceState to an object of empty values, will change each property value to a class name when either switch or convert buttons are clicked to play animation
    const [bounceState, setBounceState] = useState({switch: "", convert: ""})

    // Assigning msgAnimState to an empty value, will change value to make success/error message appear when submit button is pressed
    const [msgAnimState, setMsgAnimState] = useState("")

    // Assigning msgSwitchState to an empty value, will change value when message switches between success and error types after a first result
    const [msgSwitchState, setMsgSwitchState] = useState("")

    // Assigning disclaimerMoveState to an object with class values, these will control the animation which changes the disclaimer position when a message is visible
    const [disclaimerMoveState, setDisclaimerMoveState] = useState({ result: "disclaimerMoveAnim", error: "disclaimerMoveAnimError"})


    // State which defines the message shown to user after converting a value
    const [messageState, setMessageState] = useState({
        amountM: "",
        startUnitM: "",
        ingredientM: "", 
        resultM: "",
        endUnitM: "",
    });

    // Array of ingredients and their density's from the IngredientList component
    let infoList = IngredientList();

    // Empty array which will be populated by the ingredients in IngredientList component
    let ingredientInfoArray = [];

    // For loop which will push all objects from IngredientList component into the ingredientInfoArray
    for (var key in infoList.list) {
        if (infoList.list.hasOwnProperty(key)) {
            ingredientInfoArray.push([
                infoList.list[key].name,
                infoList.list[key].density,
            ])
        }
    };

    // Assigning ingredientSearch to an empty array, will populate when user types characters which match to ingredients in the ingredient list
    const [ingredientSearch, setIngredientSearch] = useState([]);

    // useEffect which controls the population of ingredient list items in the ingredient drop down
    useEffect(() => {
        // If the search field is empty, set the search array to empty to display no items
        if (ingredient === "") {
            setIngredientSearch([]);
            return;
        } else {
            /* If there is something in the search field, filter the names in the ingredient array by
            whats typed inside of the search field, set both values to lowercase to avoid matching conflicts */
            const results = ingredientInfoArray.filter(ingredientItem =>
                ingredientItem[0].toLowerCase().includes(ingredient.toLowerCase())
            );
            setIngredientSearch(results);
        }
    }, [ingredient]);


    // [VOLUME START UNIT] Reference values for unit calculations

    // Gallons (US) to grams
    // grams = gallons × 3,785.41178 × ingredient density
    // gallonGramCalc = 3785.41178;

    // Quarts (US) to grams
    // grams = quarts × 946.352946 × ingredient density
    // quartGramCalc = 946.352946;

    // Pints (US) to grams
    // grams = pints × 473.176473 × ingredient density
    // pintGramCalc = 473.176473;

    // Cups (US) to grams
    // grams = cups × 236.588236 × ingredient density
    // cupGramCalc = 236.588236;

    // Fluid ounces (US) to grams
    // grams = fluid ounces × 29.57353 × ingredient density
    // flOzGramsCalc = 29.57353;

    // Liters to grams
    // grams = liters × 1000 × ingredient density
    // literGramCalc = 1000;

    // Tablespoons (US) to grams
    // grams = tablespoons × 14.786765 × ingredient density
    // tablespGramCalc = 14.786765;

    // Teaspoons (US) to grams
    // grams = teaspoons × 4.928922 × ingredient density
    // tspGramCalc = 4.928922;

    // Milliliters to grams
    // grams = milliliters × ingredient density
    // mlGramCalc = 1;

    
    // [WEIGHT START UNIT] Reference values for unit calculations

    // Grams to kilograms
    // kilograms = grams x 0.001
    // gToKg = 0.001;

    // Grams to pounds
    // pounds = grams × 0.002205
    // gToLb = 0.002205;

    // Grams to ounces
    // ounces = grams × 0.035274
    // gToOz = 0.035274;


    // Formula reference for density based calculation

    // Volume = Mass ÷ Density
    // (5grams ÷ 0.7) = 7.142857 ml
    // Example: Millileters = amount of grams ÷ ingredient density

    // Function which converts weight to volume by dividing the unit value by the density value (intended for gram/density)
    function unitToVolume(unit, density) {

        let result = unit / density;
        return result;
    };

    /* Function which converts volume to weight by multiplying the unit value by the calculation value
    and then multiplying by the density value (intended for ml x calculation x density)
    */
    function unitToWeight(unit, calculation, density) {

        let result = unit * calculation * density;
        return result;
    };

    /* Function which converts a weight value to another weight value by multiplying the weight value by
    the weightCalc. For example this would convert grams to kilograms (intended for gram x weightCalc)
    */
    function weightToWeight(weight, weightCalc) {

        let result = weight * weightCalc;
        return result;
    };

    /* Event handler function which will convert the start unit to the end unit value and display a message based on
    if its a successful conversion or an error based on different error conditions
    */
    const handleSubmit = (e) => {
        // Preventing the page from refreshing which is the default behaviour of form submit
        e.preventDefault();

        // Defining empty variables which will have values assigned to them based on different conditions met in the function
        let convertUnit;
        let convertStartUnit;
        let convertEndUnit;
        let convertCalc;
        let convertCalcWeight;
        let convertDensity;
        let conversionResult;
        let conversionRoundedResult;
        let converstionNewWeightResult;

        // Function which will round the final result
        function roundResult(sourceResult) {
            
            // Result is rounded, will only show up to the 2nd decimal point (ex: 23.63)
            conversionRoundedResult = sourceResult.toFixed(2);

            // Checks if at least one result has been given from the converter and if previous result was unsuccessful
            if (/\d/.test(messageState.resultM) === false && messageState.resultM !== "") {

                // Sets the values from converter form and resulting number to display as a message
                setMessageState({ ...messageState,
                    amountM: calcState.amount,
                    startUnitM: calcState.startUnit,
                    ingredientM: calcState.ingredient,
                    resultM: conversionRoundedResult,
                    endUnitM: calcState.endUnit,
                })

                // If convert button has already been clicked once, then container bounce animation will play
                changeMessage()

            } else {

                // If abobe check doesnt pass, then just set a new messageState
                // Sets the values from converter form and resulting number to display as a message
                setMessageState({ ...messageState,
                    amountM: calcState.amount,
                    startUnitM: calcState.startUnit,
                    ingredientM: calcState.ingredient,
                    resultM: conversionRoundedResult,
                    endUnitM: calcState.endUnit,
                })
            }
        }

        // Function which will first convert one unit to another and then round the final result
        function convertThenRoundResult(list, listItem, sourceResult) {

            // Grabs the type of calcList and then finds the property value of the listItem
            convertCalcWeight = list[listItem];

            // Source result is then converted to the new unit amount by referencing the value from convertCalcWeight
            converstionNewWeightResult = weightToWeight(sourceResult, convertCalcWeight);
            // Result is then rounded, will only show up to the 2nd decimal point (ex: 23.63)
            conversionRoundedResult = converstionNewWeightResult.toFixed(2);

            // Checks if at least one result has been given from the converter and if previous result was unsuccessful
            if (/\d/.test(messageState.resultM) === false && messageState.resultM !== "") {

                // Sets the values from converter form and resulting number to display as a message
                setMessageState({ ...messageState,
                    amountM: calcState.amount,
                    startUnitM: calcState.startUnit,
                    ingredientM: calcState.ingredient,
                    resultM: conversionRoundedResult,
                    endUnitM: calcState.endUnit,
                })

                // If convert button has already been clicked once, then container bounce animation will play
                changeMessage()

            } else {
                
                // If abobe check doesnt pass, then just set a new messageState
                // Sets the values from converter form and resulting number to display as a message
                setMessageState({ ...messageState,
                    amountM: calcState.amount,
                    startUnitM: calcState.startUnit,
                    ingredientM: calcState.ingredient,
                    resultM: conversionRoundedResult,
                    endUnitM: calcState.endUnit,
                })
            }
        }

        // Function which will display an error message if certain conditions arent met
        function messageError(errorMsg) {
            // Checks if at least one result has been given from the converter and if previous result was successful
            if (/\d/.test(messageState.resultM) && messageState.resultM !== "") {
                // If previous result was successful (is a number) then set new result and play message container animation
                setMessageState({ ...messageState, resultM: errorMsg })
                changeMessage()

            } else {
                // If abobe check doesnt pass, then just set a new result
                setMessageState({ ...messageState, resultM: errorMsg })

            }

        }

        // Checks if the ingredientSearch has any items in the array
        if (!ingredientSearch[0]) {

            // Sets the result as an error message which will display when user hasnt typed anything in ingredient field
            messageError("Please type and select an ingredient from the list")

        }  

        // Checks if the characters typed in the ingredient input field match the top ingredient list item
        else if (!ingredientSearch[0][0] || ingredientSearch[0][0].toLowerCase() !== ingredient.toLowerCase()) {

            // Sets the result as an error message which will display when user's input doesnt match an ingredient
            messageError("Please select an ingredient from the list")

        }

        // Checks if the amount is a valid number/fraction or if the amount field is empty
        else if (/^\d*\.?\d*$/.test(calcState.amount) === false || calcState.amount === "") {

            // Sets the result as an error message which will display when user's amount input isnt a valid number or fraction (ex: 3.14)
            messageError("Please enter a valid amount number")

        }

        // Checks if the starting unit for conversion is a volume unit
        else if (unitState === "volume") {

            // Grabs amount of what user wants to convert entered from amount field
            convertUnit = calcState.amount;
            // Grabs density value of the ingredient the user is attempting to convert
            convertDensity = ingredientSearch[0][1];
            // Grabs the starting unit (ex: Cups (US)) and converts it to name style of calcList object names (ex: CupsUS)
            convertStartUnit = calcState.startUnit.replaceAll(/[ ()]/g, "");
            // Grabs the value of the related start unit (ex: CupsUS has value of 236.588236)
            convertCalc = calcList[convertStartUnit];

            // Assigning conversionResult to the converted value
            conversionResult = unitToWeight(convertUnit, convertCalc, convertDensity);

            // Checks if the end unit is grams
            if (calcState.endUnit === "Grams") {

                // Calls the roundResult function, rounds result and sets resultState
                roundResult(conversionResult);

            } else {

                // Grabs the ending unit (ex: Pound (US)) and converts it to name style of calcList object names (ex: CupsUS)
                convertEndUnit = calcState.endUnit.replaceAll(/[ ()]/g, "");
                // Calls the convertThenRoundResult function, converts to new unit then rounds result and sets resultState
                convertThenRoundResult(calcList, convertEndUnit, conversionResult)
            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////

        // Checks if the starting unit for conversion is a weight unit
        else if (unitState === "weight") {
            // Grabs amount of what user wants to convert entered from amount field
            convertUnit = calcState.amount;
            // Grabs density value of the ingredient the user is attempting to convert
            convertDensity = ingredientSearch[0][1];
            // Grabs the starting unit (ex: Cups (US)) and converts it to name style of calcList object names (ex: CupsUS)
            convertStartUnit = calcState.startUnit.replaceAll(/[ ()]/g, "");
            // Grabs the ending unit (ex: Pound (US)) and converts it to name style of calcList object names (ex: CupsUS)
            convertEndUnit = calcState.endUnit.replaceAll(/[ ()]/g, "");

            // Checks if the starting unit is grams
            if (calcState.startUnit === "Grams") {

                // This converts the grams into ml
                conversionResult = unitToVolume(convertUnit, convertDensity);

                // Checks if the end unit is milliliters
                if (calcState.endUnit === "Milliliters") {

                    // Calls the roundResult function, rounds result and sets resultState
                    roundResult(conversionResult);

                } else {

                    // Calls the convertThenRoundResult function, converts to new unit then rounds result and sets resultState
                    convertThenRoundResult(calcListWeight, convertEndUnit, conversionResult)
                }

            } else {

                // Grabs the value of the related end unit (ex: CupsUS has value of 236.588236)
                convertCalcWeight = calcListWeight[convertStartUnit];
                // Multiplies original weight value (example: Pounds) into its value in grams
                converstionNewWeightResult = weightToWeight(convertUnit, convertCalcWeight);
                // Devides the new amount of grams by the ingredient density, resulting in converted volume
                conversionResult = unitToVolume(converstionNewWeightResult, convertDensity);

                // Checks if the end unit is milliliters
                if (calcState.endUnit === "Milliliters") {

                    // Calls the roundResult function, rounds result and sets resultState
                    roundResult(conversionResult);

                } else {

                    // Calls the convertThenRoundResult function, converts to new unit then rounds result and sets resultState
                    convertThenRoundResult(calcListWeight, convertEndUnit, conversionResult)
                }
            }
        }
    };

    // Function which handles switching the conversion types between volume and weight
    function changeMode() {

        // Assigning variables to the elements matching the intended id values
        const beforeUnit = document.querySelector('#startUnit');
        const afterUnit = document.querySelector('#endUnit');

        // Setting a new calcState with the start and end units swapped
        setCalcState({ ...calcState, startUnit: afterUnit.innerHTML, endUnit: beforeUnit.innerHTML, });
        setBounceState({ ...bounceState, switch: "bounceClick"})
    }

    // Function which handles message container animation when switching between result and error message types
    function changeMessage() {

        // Defining consts for the html element information from the message container and displayed message
        const containerHtml = document.getElementsByClassName('resultSuccess');
        const messageHtml = document.getElementsByClassName('conversionMessage');

        // If check to prevent errors occuring when function loads before HTML loads
        if (containerHtml[0] && messageHtml[0] && messageHtml[1]) {

            // Defining lets which check if the message container, result message, and error message are hidden
            let containerHiddenCheck = containerHtml[0].classList.contains('hiddenElement')
            let resultHiddenCheck = messageHtml[0].classList.contains('hiddenElement')
            let errorHiddenCheck = messageHtml[1].classList.contains('hiddenElement')

            // Will trigger if message container is visible
            if (!containerHiddenCheck) {
                
                // Will trigger if one of the result or error messages are set to hidden while other is visible
                if ((resultHiddenCheck && !errorHiddenCheck) || (!resultHiddenCheck && errorHiddenCheck)) {

                    // Adds animation class to the message container so it animates when switching message type
                    setMsgSwitchState("msgSwitch")
                }
            }
        }
    }
   

    return (
        <>
            <div className={`convertContainer`}>

                <section className="formContainer">
                    <h1 className='formTitle'>Fun Cooking Converter</h1>

                    <button
                    className={`switchButton ${bounceState.switch}`}
                    onClick={ unitState === "volume" ?
                    () => {
                        setUnitState("weight");
                        setConvertToUnitState("volume")
                        changeMode();
                    } :
                    () => {
                        setUnitState("volume");
                        setConvertToUnitState("weight")
                        changeMode();
                    }}

                    onAnimationEnd={ () => {setBounceState({ ...bounceState, switch: ""})} }
                    
                    >{unitState} ⇄ {convertToUnitState}</button>

                    <form id='conversion-form' onSubmit={handleSubmit}>

                        <div className="amountDiv">
                            <label htmlFor='amount'>Amount</label>
                            <br></br>
                            <input
                                id='amount'
                                type='text'
                                name='amount'
                                value={amount}
                                onChange={(e) =>
                                    setCalcState({ ...calcState, amount: e.target.value })
                                }
                                autoComplete="off"
                                readOnly={false}
                            />
                        </div>

                        <div className="startUnitDiv">
                            <label htmlFor='startUnit'>Unit</label>
                            <br></br>

                            <p
                            tabIndex="1"
                            className={`unitDropdown ${clickedState.start} ${bounceState.switch}`}
                            id="startUnit"
                            value={startUnit}

                            onClick={ startUnitState === "hiddenElement" ?
                            () => {
                                setStartUnitState("animationDrop")
                                setClickedState({ ...clickedState, start: "clickedButton"})
                            } :
                            () => {
                                setStartUnitState("hiddenElement")
                                setClickedState({ ...clickedState, start: ""})
                            }}

                            onBlur={ () => {
                                setStartUnitState("hiddenElement")
                                setClickedState({ ...clickedState, start: ""})
                            }}
                            >
                                {startUnit}
                            </p>

                            <span className={`dropdownArrow backfaceProp ${bounceState.switch}`}>▼</span>

                            <ul
                            className={`unitDropdownList ${startUnitState}`}
                            onAnimationEnd={() => {setStartUnitState("")}}
                            >
                            {unitState === "volume" ?
                            volumeList.map((volume) => (
                                <li
                                className="unitItem"
                                key={volume}
                                onMouseDown={ () => {
                                    setCalcState({ ...calcState, startUnit: volume })
                                    setStartUnitState("hiddenElement")
                                }}
                                >
                                    {volume}
                                </li>
                            )) :
                            weightList.map((weight) => (
                                <li
                                className="unitItem"
                                key={weight}
                                onMouseDown={ () => {
                                    setCalcState({ ...calcState, startUnit: weight })
                                    setStartUnitState("hiddenElement")
                                }}
                                >
                                    {weight}
                                </li>
                            ))
                            }
                            </ul>
                        </div>

                        <div className="ingredientDiv">
                            <label
                            htmlFor='ingredient'
                            onClick={ (e) => {
                                // Prevents clicking label from focusing input (preventing re-fading list)
                                e.preventDefault()
                            }}
                            >Ingredient</label>
                            <br></br>
                            <input
                                id='ingredient'
                                className={ingredientSelectState}
                                name='ingredient'
                                value={ingredient}
                                onChange={

                                ingredientState === "hiddenElement" && ingredientSearch ?
                                (e) => {
                                    // If user is typing from a blank input value, then play dropdown animation
                                    setCalcState({ ...calcState, ingredient: e.target.value })
                                    setIngredientState("animationDrop")
                                } :
                                
                                ingredientState === "" ?
                                (e) => {
                                    /* If there is no ingredient listed from search prior to typing character
                                    but ingredients begin to be listed after typing a character, then it will
                                    play the dropdown animation
                                    */
                                    if (!ingredientSearch[0]) {
                                        setIngredientState("animationDrop")
                                    } 
                                    // Else if to prevent error if no ingredient is listed
                                    // If user deletes character from a fully typed/selected item, animation plays
                                    // Length check to make sure it only applies to fully typed/selected item
                                    else if (ingredient === ingredientSearch[0][0] && ingredientSearch.length <= 1) {
                                        setIngredientState("animationDrop")
                                    }
                                    // After checking for either of above conditions, set the state
                                    setCalcState({ ...calcState, ingredient: e.target.value })
                                } :
                                
                                (e) => {
                                    // If any of the above if checks dont trigger, fallback to safe set states
                                    setCalcState({ ...calcState, ingredient: e.target.value })
                                    //setIngredientState("")
                                }}

                                onClick={ ingredientSearch.length === 0 ?

                                    // If there is no ingredients to display, hide the dropdown element
                                    () => {
                                        setIngredientState("hiddenElement")
                                        setClickedState({ ...clickedState, ingredient: "clickedInput"})
                                    } :

                                    // If the ingredient input is already clicked, dont do anything
                                    clickedState.ingredient === "clickedInput" ?
                                    () => null :

                                    // If the above checks arent true, then play a dropdown animation
                                    () => {
                                        setIngredientState("animationDrop")
                                        setClickedState({ ...clickedState, ingredient: "clickedInput"})
                                    }
                                }
                                onBlur={ () => {
                                    setIngredientState("hiddenElement") 
                                    setClickedState({ ...clickedState, ingredient: ""})
                                }}
                                onAnimationEnd={() => {setIngredientSelectState("")}}
                                autoComplete="off"
                                readOnly={false}
                            />
                            <ul
                            className={
                                // If there are no ingredients to populate dropdown list, hide dropdown
                                ingredientSearch.length === 0 ? "ingredientDropdown hiddenElement" :
                                // If input matches top ingredient and theres no other ingredients to list, hide dropdown
                                (ingredient === ingredientSearch[0][0] && ingredientSearch.length <= 1) || 
                                // If user types characters after having a fully typed/selected item, hide dropdown
                                (ingredient.length > ingredientSearch[0][0].length && ingredientSearch.length <= 1) ?
                                "ingredientDropdown hiddenElement" :
                                `ingredientDropdown ${ingredientState}`
                            }

                            onAnimationEnd={() => {setIngredientState("")}}
                            
                            >
                                {ingredientSearch.map(item => (
                                <li
                                className="ingredientItem"
                                key={item[0]}
                                onMouseDown={ () => {
                                    setCalcState({ ...calcState, ingredient: item[0] })
                                    setIngredientSelectState("bounceClick")
                                }}
                                >
                                    {item[0]}
                                </li>
                                ))}
                            </ul>
                        </div>

                        <div className="endUnitDiv">
                            <label htmlFor='endUnit'>Unit</label>
                            <br></br>

                            <p
                            tabIndex="2"
                            className={`unitDropdown ${clickedState.end} ${bounceState.switch}`}
                            id="endUnit"
                            value={endUnit}

                            onClick={ endUnitState === "hiddenElement" ?
                            () => {
                                setEndUnitState("animationDrop")
                                setClickedState({ ...clickedState, end: "clickedButton"})
                            } :
                            () => {
                                setEndUnitState("hiddenElement")
                                setClickedState({ ...clickedState, end: ""})
                            }}

                            onBlur={ () => {
                                setEndUnitState("hiddenElement")
                                setClickedState({ ...clickedState, end: ""})
                            }}
                            >
                                {endUnit}
                            </p>

                            <span className={
                                // Checks if startUnit dropdown is visible, removes backfaceProp to prevent blurry text
                                clickedState.start === "clickedButton" || 
                                // Checks if ingredient input has been clicked and if the dropdown is visible, removes backfaceProp if so
                                (clickedState.ingredient === "clickedInput" && ingredientSearch[0]) ?
                                `dropdownArrow` :
                                `dropdownArrow backfaceProp ${bounceState.switch}`
                            }
                            >
                                ▼
                            </span>

                            <ul
                            className={`unitDropdownList ${endUnitState}`}
                            onAnimationEnd={() => {setEndUnitState("")}}
                            >
                            {unitState === "weight" ?
                            volumeList.map((volume) => (
                                <li
                                className="unitItem"
                                key={volume}
                                onMouseDown={ () => {
                                    setCalcState({ ...calcState, endUnit: volume })
                                    setEndUnitState("hiddenElement")
                                }}
                                >
                                    {volume}
                                </li>
                            )) :
                            weightList.map((weight) => (
                                <li
                                className="unitItem"
                                key={weight}
                                onMouseDown={ () => {
                                    setCalcState({ ...calcState, endUnit: weight })
                                    setEndUnitState("hiddenElement")
                                }}
                                >
                                    {weight}
                                </li>
                            ))
                            }
                            </ul>
                        </div>

                        <div className="submitContainer">
                            <button
                            type="submit"
                            className={`submitButton ${bounceState.convert}`}

                            onClick={ () => {
                                setBounceState({ ...bounceState, convert: "bounceClick"})
                                setMsgAnimState("msgAnim")
                            }}

                            onAnimationEnd={ () => {setBounceState({ ...bounceState, convert: ""})} }
                            >Convert</button>
                        </div>

                    </form>
                </section>

                <div className="resultContainer">
                    <section className={ messageState.resultM !== "" ?
                    `resultSuccess ${msgSwitchState}` :
                    "resultSuccess hiddenElement"
                    }
                    key={ /\d/.test(messageState.resultM) }
                    >

                        <section className={
                            // Checks if result contains numbers
                            /\d/.test(messageState.resultM) &&
                            // Checks if result has changed from its initial state
                            messageState.resultM !== "" &&
                            // Checks if amount is a valid number or fraction (ex: 3.14)
                            /^\d*\.?\d*$/.test(messageState.amountM) ?
                            "conversionMessage" :
                            "conversionMessage hiddenElement"
                        }
                        >
                            <h2 className={`${msgAnimState}1`}>
                                {messageState.amountM}&nbsp;
                                {
                                // If amount is higher or lower than 1, then display message as normal
                                (messageState.amountM > 1 || messageState.amountM < 1) ?
                                messageState.startUnitM :
                                
                                // If amount is equal to 1, remove plural from start unit (case for (US) units)
                                messageState.startUnitM.includes("(US)") ?
                                messageState.startUnitM.replaceAll("s ", " ") :
                                
                                // If amount is equal to 1, remove plural from start unit (case for all other units)
                                messageState.startUnitM.slice(0, -1) 
                                }
                            </h2>
                            <h1 className={`${msgAnimState}2`}>of</h1>
                            <h2 className={`${msgAnimState}3`}>{messageState.ingredientM}</h2>
                            <h1 className={`${msgAnimState}4`}>is</h1>
                            <h2
                            className={`${msgAnimState}5`}
                            onAnimationEnd={ () => {
                                setMsgAnimState("")
                            }}
                            >
                                {messageState.resultM}&nbsp;

                                {
                                // If result is higher or lower than 1, then display message as normal
                                (messageState.resultM > 1 || messageState.resultM < 1) ?
                                messageState.endUnitM :
                                
                                // If result is equal to 1, remove plural from end unit (case for (US) units)
                                messageState.endUnitM.includes("(US)") ?
                                messageState.endUnitM.replaceAll("s ", " ") :
                                
                                // If result is equal to 1, remove plural from end unit (case for all other units)
                                messageState.endUnitM.slice(0, -1) 
                                }

                            </h2>
                        </section>

                        <section className={
                            // Checks if amount isnt a valid number or fraction (ex: 3.14)
                            /^\d*\.?\d*$/.test(messageState.amountM) === false ||
                            (   
                                // Checks if result has changed from its initial state
                                messageState.resultM !== "" &&
                                // Checks if result contains numbers
                                /\d/.test(messageState.resultM) === false
                            ) ?
                            "conversionMessage" :
                            "conversionMessage hiddenElement"
                        }
                        >
                        <h2
                        className={`${msgAnimState}1`}
                        onAnimationEnd={ () => {
                            setMsgAnimState("")
                        }}
                        >
                            {messageState.resultM}
                        </h2>
                        </section>


                    </section>
                </div>

                <div
                className={
                /^\d*\.?\d*$/.test(messageState.amountM) &&
                /\d/.test(messageState.resultM) &&
                messageState.resultM !== "" ?

                `disclaimerInfo ${disclaimerMoveState.result}` :

                // Checks if amount isnt a valid number or fraction (ex: 3.14)
                /^\d*\.?\d*$/.test(messageState.amountM) === false ||
                (   
                    // Checks if result has changed from its initial state
                    messageState.resultM !== "" &&
                    // Checks if result contains numbers
                    /\d/.test(messageState.resultM) === false
                ) ?

                `disclaimerInfo ${disclaimerMoveState.error}` :

                `disclaimerInfo`
                }
                onAnimationEnd={ () =>{setDisclaimerMoveState({ ...disclaimerMoveState, result: "", error: "" })} }
                >
                    <h3>Note</h3>
                    <p>Characteristics of food change according to humidity, temperature, and how well packed it is. Some values may be rounded.</p>
                    <h4>Density Reference</h4>
                    <a
                    className="sourceButton"
                    href='https://www.fao.org/3/ap815e/ap815e.pdf'
                    target="_blank" rel="noreferrer"
                    >
                        FAO/INFOODS Density Database version 2
                    </a>
                    <h4 className="copyrightMe">Copyright © 2022 Benjamin Basic</h4>
                    <a
                    className="myLinkButton"
                    href='https://github.com/BenBasic'
                    target="_blank" rel="noreferrer"
                    >
                        GitHub
                    </a>
                    <a
                    className="myLinkButton"
                    href='https://www.linkedin.com/in/benbasic/'
                    target="_blank" rel="noreferrer"
                    >
                        LinkedIn
                    </a>
                </div>

            </div>

        </>
    )
}