import React, { useState, useEffect } from "react";
import IngredientList from './IngredientList';

export default function Converter() {

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

    const weightList = [
        "Grams",
        "Kilograms",
        "Pounds (US)",
        "Ounces (US)",
    ];

    // Calculation to multiply by for gram related conversions (volume to gram, or gram to kilogram)
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



    const { amount, startUnit, ingredient, endUnit } = calcState;

    const [startUnitState, setStartUnitState] = useState("hiddenElement");

    const [endUnitState, setEndUnitState] = useState("hiddenElement");

    const [ingredientState, setIngredientState] = useState("");

    const [clickedState, setClickedState] = useState({start: "", ingredient: "", end: ""});

    const [bounceState, setBounceState] = useState({switch: "", convert: ""})

    const [msgAnimState, setMsgAnimState] = useState("")

    // State for if the convert button has been pressed at least once. Used for msg transition animation
    const [firstPressState, setFirstPressState] = useState(false)

    const [msgSwitchState, setMsgSwitchState] = useState("")


    // State which defines the message shown to user after converting a value
    const [messageState, setMessageState] = useState({
        amountM: "",
        startUnitM: "",
        ingredientM: "", 
        resultM: "",
        endUnitM: "",
    });

    // const handleChange = event => {
    //     setIngredientSearch(event.target.value);
    // };

    // Array of ingredients and their density's from the IngredientList component
    let infoList = IngredientList();

    let ingredientInfoArray = [];

    console.log(infoList.list);

    console.log(typeof infoList.list);

    for (var key in infoList.list) {
        if (infoList.list.hasOwnProperty(key)) {
            ingredientInfoArray.push([
                infoList.list[key].name,
                infoList.list[key].density,
            ])
        }
    };

    console.log(ingredientInfoArray[0][0])

    const [ingredientSearch, setIngredientSearch] = useState([]);

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

    console.log(ingredientInfoArray);


    /* Originally used 236.588236 for cup but noticed results werent lining up to other calculators until
    using a value of 236.58823648491, this seems to be the correct value but will continue to look into it
    */

    // Gallons (US) to grams
    // grams = gallons × 3,785.41178 × ingredient density
    const gallonGramCalc = 3785.41178;

    // Quarts (US) to grams
    // grams = quarts × 946.352946 × ingredient density
    const quartGramCalc = 946.352946;

    // Pints (US) to grams
    // grams = pints × 473.176473 × ingredient density
    const pintGramCalc = 473.176473;

    // Cups (US) to grams
    // grams = cups × 236.588236 × ingredient density
    const cupGramCalc = 236.588236;

    // Fluid ounces (US) to grams
    // grams = fluid ounces × 29.57353 × ingredient density
    const flOzGramsCalc = 29.57353;

    // Liters to grams
    // grams = liters × 1000 × ingredient density
    const literGramCalc = 1000;

    // Tablespoons (US) to grams
    // grams = tablespoons × 14.786765 × ingredient density
    const tablespGramCalc = 14.786765;

    // Teaspoons (US) to grams
    // grams = teaspoons × 4.928922 × ingredient density
    const tspGramCalc = 4.928922;

    // Milliliters to grams
    // grams = milliliters × ingredient density
    const mlGramCalc = 1;



    // Grams to kilograms
    // kilograms = grams x 0.001
    const gToKg = 0.001;

    // Grams to pounds
    // pounds = grams × 0.002205
    const gToLb = 0.002205;

    // Grams to ounces
    // ounces = grams × 0.035274
    const gToOz = 0.035274;

    // Volume = Mass ÷ Density
    // (5grams ÷ 0.7) = 7.142857 ml
    // Example: Millileters = amount of grams ÷ ingredient density

    function unitToVolume(unit, density) {

        let result = unit / density;
        return result;
    };


    function unitToWeight(unit, calculation, density) {

        let result = unit * calculation * density;
        return result;
    };

    function weightToWeight(weight, weightCalc) {

        let result = weight * weightCalc;
        return result;
    };

    let testMeasure = unitToWeight(1, cupGramCalc, 1.38);

    console.log(unitToWeight(1, cupGramCalc, 1.38));
    console.log(weightToWeight(testMeasure, gToKg));

    console.log(calcState)

    const handleSubmit = (e) => {
        // Preventing the page from refreshing which is the default behaviour of form submit
        e.preventDefault();

        let convertUnit;
        let convertStartUnit;
        let convertEndUnit;
        let convertCalc;
        let convertCalcWeight;
        let convertDensity;
        let conversionResult;
        let conversionRoundedResult;
        let converstionNewWeightResult;
        let converstionNewWeightResultAgain;
        console.log("INGREDIENT SEARCH IS =========")
        console.log(ingredientSearch)

        // Function which will round the final result
        function roundResult(sourceResult) {
            // Result is rounded, will only show up to the 2nd decimal point (ex: 23.63)
            conversionRoundedResult = sourceResult.toFixed(2);

            // Sets the values from converter form and resulting number to display as a message
            setMessageState({ ...messageState,
                amountM: calcState.amount,
                startUnitM: calcState.startUnit,
                ingredientM: calcState.ingredient,
                resultM: conversionRoundedResult,
                endUnitM: calcState.endUnit,
            })
            // If container has already been clicked once, then container bounce animation will play
            changeMessage()
            console.log("!!!!!!!!!!!!!!!!!!!!FUNCTION ROUND RESULT HAS OCCURED!!!!!!!!!!!!!!!!!!!!!!!")
        }

        // Function which will first convert one unit to another and then round the final result
        function convertThenRoundResult(list, listItem, sourceResult) {
            // Grabs the type of calcList and then finds the property value of the listItem
            convertCalcWeight = list[listItem];

            // Source result is then converted to the new unit amount by referencing the value from convertCalcWeight
            converstionNewWeightResult = weightToWeight(sourceResult, convertCalcWeight);
            // Result is then rounded, will only show up to the 2nd decimal point (ex: 23.63)
            conversionRoundedResult = converstionNewWeightResult.toFixed(2);

            console.log("NEW WEIGHT IS !!!!!!!!!");
            console.log(converstionNewWeightResult);
            console.log(conversionRoundedResult);

            // Sets the values from converter form and resulting number to display as a message
            setMessageState({ ...messageState,
                amountM: calcState.amount,
                startUnitM: calcState.startUnit,
                ingredientM: calcState.ingredient,
                resultM: conversionRoundedResult,
                endUnitM: calcState.endUnit,
            })
            // If container has already been clicked once, then container bounce animation will play
            changeMessage()
            console.log("+++++++++++++++++++++++++FUNCTION convertThenRoundResult HAS OCCURED+++++++++++++++++++++++++")
        }

        if (!ingredientSearch[0]) {
            console.log("NOTHING HERE")
            // Sets the result as an error message which will display when user hasnt typed anything in ingredient field
            setMessageState({ ...messageState, resultM: "Please type and select an ingredient from the list" })
            // If container has already been clicked once, then container bounce animation will play
            changeMessage()
        }  
        else if (!ingredientSearch[0][0] || ingredientSearch[0][0].toLowerCase() !== ingredient.toLowerCase()) {
            console.log("NOTHING HERE 2")
            console.log(ingredient)
            // Sets the result as an error message which will display when user's input doesnt match an ingredient
            setMessageState({ ...messageState, resultM: "Please select an ingredient from the list" })
            // If container has already been clicked once, then container bounce animation will play
            changeMessage()
        }
        else if (/^\d*\.?\d*$/.test(calcState.amount) === false || calcState.amount === "") {
            setMessageState({ ...messageState, resultM: "Please enter a valid amount number" })
            // If container has already been clicked once, then container bounce animation will play
            changeMessage()
        }
        else if (unitState === "volume") {
            // Grabs amount of what user wants to convert entered from amount field
            convertUnit = calcState.amount;
            // Grabs density value of the ingredient the user is attempting to convert
            convertDensity = ingredientSearch[0][1];
            // Grabs the starting unit (ex: Cups (US)) and converts it to name style of calcList object names (ex: CupsUS)
            convertStartUnit = calcState.startUnit.replaceAll(/[ ()]/g, "");
            // Grabs the value of the related start unit (ex: CupsUS has value of 236.588236)
            convertCalc = calcList[convertStartUnit];


            console.log("CONVERT THING IS")
            console.log(convertUnit)
            console.log(convertDensity)
            console.log(convertCalc)

            conversionResult = unitToWeight(convertUnit, convertCalc, convertDensity);

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

        else if (unitState === "weight") {
            // Grabs amount of what user wants to convert entered from amount field
            convertUnit = calcState.amount;
            // Grabs density value of the ingredient the user is attempting to convert
            convertDensity = ingredientSearch[0][1];
            // Grabs the starting unit (ex: Cups (US)) and converts it to name style of calcList object names (ex: CupsUS)
            convertStartUnit = calcState.startUnit.replaceAll(/[ ()]/g, "");
            // Grabs the ending unit (ex: Pound (US)) and converts it to name style of calcList object names (ex: CupsUS)
            convertEndUnit = calcState.endUnit.replaceAll(/[ ()]/g, "");


            console.log("CONVERT THING IS")
            console.log(convertUnit)
            console.log(convertDensity)

            if (calcState.startUnit === "Grams") {

                // This converts the grams into ml
                conversionResult = unitToVolume(convertUnit, convertDensity);

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

    console.log("SEARCH STATE")
    //console.log(ingredientSearch[0][0])
    console.log(calcList['Liters'])

    function changeMode() {
        const beforeUnit = document.querySelector('#startUnit');
        const afterUnit = document.querySelector('#endUnit');
        setCalcState({ ...calcState, startUnit: afterUnit.innerHTML, endUnit: beforeUnit.innerHTML, });
        setBounceState({ ...bounceState, switch: "bounceClick"})
        console.log("UNIT SWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPPPPP");
        console.log(calcState);
        console.log(beforeUnit);
        console.log(afterUnit);
    }

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

            // Will trigger if message container is visible and if convert button has been pressed at least once
            if (!containerHiddenCheck && firstPressState === true) {
                
                if ((resultHiddenCheck && !errorHiddenCheck) || (!resultHiddenCheck && errorHiddenCheck)) {
                    console.log("Hidden if triggered")

                    setMsgSwitchState("msgSwitch")
                }
            }
        }


        //setMsgSwitchState("msgSwitch")
    }



    console.log("CHECKING FOR CLASS REF")
    console.log(ingredientSearch)
    console.log(document.querySelector('#startUnit'))
    console.log(document.querySelector('#endUnit'))
   

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
                        changeMode();
                    } :
                    () => {
                        setUnitState("volume");
                        changeMode();
                    }}

                    onAnimationEnd={ () => {setBounceState({ ...bounceState, switch: ""})} }
                    
                    >Change from {unitState}</button>

                    <form id='conversion-form' onSubmit={handleSubmit}>

                        <div className="amountDiv">
                            <label htmlFor='amount'>Amount:</label>
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
                            <label htmlFor='startUnit'>Unit:</label>
                            <br></br>

                            <p
                            tabIndex="1"
                            className={`unitDropdown ${clickedState.start}`}
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

                            <span className="dropdownArrow backfaceProp">▼</span>

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
                            >Ingredient:</label>
                            <br></br>
                            <input
                                id='ingredient'
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

                                }}
                                >
                                    {item[0]}
                                </li>
                                ))}
                            </ul>
                        </div>

                        <div className="endUnitDiv">
                            <label htmlFor='endUnit'>Unit:</label>
                            <br></br>

                            <p
                            tabIndex="2"
                            className={`unitDropdown ${clickedState.end}`}
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
                                `dropdownArrow backfaceProp`
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
                            <h2 className={`${msgAnimState}1`}>{messageState.amountM} {messageState.startUnitM}</h2>
                            <h1 className={`${msgAnimState}2`}>of</h1>
                            <h2 className={`${msgAnimState}3`}>{messageState.ingredientM}</h2>
                            <h1 className={`${msgAnimState}4`}>is</h1>
                            <h2
                            className={`${msgAnimState}5`}
                            onAnimationEnd={ () => {
                                setMsgAnimState("")
                                setFirstPressState(true)
                            }}
                            >
                                {messageState.resultM} {messageState.endUnitM}
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
                            setFirstPressState(true)
                        }}
                        >
                            {messageState.resultM}
                        </h2>
                        </section>


                    </section>
                </div>

            </div>


            <div>
                <h1>Gallons to Grams</h1>
                <h2>{unitToWeight(1, gallonGramCalc, 1.38)}</h2>

                <h1>Quarts to Grams</h1>
                <h2>{unitToWeight(1, quartGramCalc, 1.38)}</h2>

                <h1>Pints to Grams</h1>
                <h2>{unitToWeight(1, pintGramCalc, 1.38)}</h2>

                <h1>Cups to Grams</h1>
                <h2>{unitToWeight(1, cupGramCalc, 1.38)}</h2>

                <h1>Fluid Ounces to Grams</h1>
                <h2>{unitToWeight(1, flOzGramsCalc, 1.38)}</h2>

                <h1>Liters to Grams</h1>
                <h2>{unitToWeight(1, literGramCalc, 1.38)}</h2>

                <h1>Tablespoons to Grams</h1>
                <h2>{unitToWeight(1, tablespGramCalc, 1.38)}</h2>

                <h1>Teaspoons to Grams</h1>
                <h2>{unitToWeight(1, tspGramCalc, 1.38)}</h2>

                <h1>Milliliters to Grams</h1>
                <h2>{unitToWeight(1, mlGramCalc, 1.38)}</h2>

                <h4>-----------------------------</h4>

                <h1>Grams to Ounces</h1>
                <h2>{weightToWeight(testMeasure, gToOz)}</h2>

                <h1>Grams to Pounds</h1>
                <h2>{weightToWeight(testMeasure, gToLb)}</h2>

                <h1>Grams to Kilograms</h1>
                <h2>{weightToWeight(testMeasure, gToKg)}</h2>
            </div>
        </>
    )
}