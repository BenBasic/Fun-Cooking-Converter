import React, { useState } from "react";
import IngredientList from './IngredientList';

export default function Converter() {

    const volumeList = [
        "Liter",
        "Milliliter",
        "Gallon (US)",
        "Quart (US)",
        "Pint (US)",
        "Fluid Ounce (US)",
        "Cups (US)",
        "Tablespoons (US)",
        "Teaspoons (US)",
    ];

    const weightList = [
        "Gram",
        "Kilogram",
        "Pound (US)",
        "Ounce (US)",
    ];

    // Assigning the initial calcState to default values, these will change depending on user input for the form
    const [calcState, setCalcState] = useState({
        amount: 1,
        startUnit: "Cups (US)",
        ingredient: "",
        endUnit: "Grams",
    });

    // Assigning the initial unitState to volume, will change depending on if user wants volume>weight or weight>volume
    const [unitState, setUnitState] = useState("volume")

    // State for error message which will display on the form if user doesn't use correct input, no value by default
    const [errorMessage, setErrorMessage] = useState("");

    const { amount, startUnit, ingredient, endUnit } = calcState;

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

    /* 
        {ingredientInfoArray.map((ingredient) => (
        <option key={ingredient[0]} value={ingredient[0]}>{ingredient[0]}</option>
        ))}
    */

    return (
        <>
            <div className={`convertContainer`}>

                <section className="contactContainer mt-md-5 mt-3">
                    <h1 className='text-center formTitle'>Fun title</h1>
                    <form id='conversion-form'>
                        <div>
                            <label htmlFor='amount'>Amount:</label>
                            <input
                                id='amount'
                                type='text'
                                name='amount'
                                defaultValue={amount}
                            />
                        </div>
                        <div>
                            <label htmlFor='startUnit'>Unit:</label>
                            <select id="startUnit" name="startUnit" defaultValue={startUnit}>
                            {unitState === "volume" ?
                            volumeList.map((volume) => (
                                <option key={volume} value={volume}>{volume}</option>
                            )) :
                            weightList.map((weight) => (
                                <option key={weight} value={weight}>{weight}</option>
                            ))
                            }
                            </select>
                        </div>
                        <div>
                            <label htmlFor='ingredient'>Ingredient:</label>
                            <input
                                id='ingredient'
                                name='ingredient'
                                defaultValue={ingredient}
                            />
                        </div>
                        {errorMessage && (
                            <div>
                                <p className="errorAlert">{errorMessage}</p>
                            </div>
                        )}
                        <div className="submitContainer">
                            <button type="submit" className='submitButton'>Send</button>
                        </div>
                    </form>
                </section>
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