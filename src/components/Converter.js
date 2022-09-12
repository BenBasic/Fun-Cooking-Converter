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

    // Assigning the initial resultState to volume, will change to a value once a conversion is done
    const [resultState, setResultState] = useState();

    // State for error message which will display on the form if user doesn't use correct input, no value by default
    const [errorMessage, setErrorMessage] = useState("");

    const { amount, startUnit, ingredient, endUnit } = calcState;

    const [startUnitState, setStartUnitState] = useState("hiddenElement");

    const [endUnitState, setEndUnitState] = useState("hiddenElement");

    const [ingredientState, setIngredientState] = useState("");

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
            // Sets the result state to the rounded result, allowing it to display on the page
            setResultState(conversionRoundedResult);
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
            // Sets the result state to the rounded result, allowing it to display on the page
            setResultState(conversionRoundedResult);
            console.log("+++++++++++++++++++++++++FUNCTION convertThenRoundResult HAS OCCURED+++++++++++++++++++++++++")
        }

        if (!ingredientSearch[0]) {
            console.log("NOTHING HERE")
            setResultState("Please type and select an ingredient from the list");
        }  
        else if (!ingredientSearch[0][0] || ingredientSearch[0][0].toLowerCase() !== ingredient.toLowerCase()) {
            console.log("NOTHING HERE 2")
            console.log(ingredient)
            setResultState("Please select an ingredient from the list");
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
        console.log("UNIT SWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPPPPP");
        console.log(calcState);
        console.log(beforeUnit);
        console.log(afterUnit);
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
                    className="switchButton"
                    onClick={ unitState === "volume" ?
                    () => {
                        setUnitState("weight");
                        changeMode();
                    } :
                    () => {
                        setUnitState("volume");
                        changeMode();
                    }
                    }>Change from {unitState}</button>

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
                                autocomplete="off"
                                readonly onfocus="this.removeAttribute('readonly');"
                            />
                        </div>

                        <div className="startUnitDiv">
                            <label htmlFor='startUnit'>Unit:</label>
                            <br></br>

                            <p
                            tabindex="1"
                            className="unitDropdown"
                            id="startUnit"
                            value={startUnit}
                            onClick={ startUnitState === "hiddenElement" ?
                            () => {setStartUnitState("")} :
                            () => {setStartUnitState("hiddenElement")} }
                            onBlur={ () => {setStartUnitState("hiddenElement")} }
                            >
                                {startUnit}
                            </p>
                            <span className="dropdownArrow">▼</span>
                            <ul
                            className={`unitDropdownList ${startUnitState}`}
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
                            <label htmlFor='ingredient'>Ingredient:</label>
                            <br></br>
                            <input
                                id='ingredient'
                                name='ingredient'
                                value={ingredient}
                                onChange={(e) => {
                                    setCalcState({ ...calcState, ingredient: e.target.value })
                                    setIngredientState("")
                                }}
                                onClick={ () => {setIngredientState("") }}
                                onBlur={ () => {setIngredientState("hiddenElement") }}
                                autocomplete="off"
                                readonly onfocus="this.removeAttribute('readonly');"
                            />
                            <ul className={ ingredientSearch.length === 0 ? "ingredientDropdown hiddenElement" :
                            ingredient === ingredientSearch[0][0] || ingredient.length > ingredientSearch[0][0].length ?
                            "ingredientDropdown hiddenElement" :
                            `ingredientDropdown ${ingredientState}`}
                            >
                                {ingredientSearch.map(item => (
                                <li
                                className="ingredientItem"
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
                            tabindex="2"
                            className="unitDropdown"
                            id="endUnit"
                            value={endUnit}
                            onClick={ endUnitState === "hiddenElement" ?
                            () => {setEndUnitState("")} :
                            () => {setEndUnitState("hiddenElement")} }
                            onBlur={ () => {setEndUnitState("hiddenElement")} }
                            >
                                {endUnit}
                            </p>
                            <span className="dropdownArrow">▼</span>
                            <ul
                            className={`unitDropdownList ${endUnitState}`}
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
                            <button type="submit" className='submitButton'>Convert</button>
                        </div>

                    </form>
                </section>
                <h1>{resultState}</h1>
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