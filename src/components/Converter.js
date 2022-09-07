import React, { useState } from "react";
import IngredientList from './IngredientList';

export default function Converter() {

    // Assigning the initial calcState to empty values, these will change depending on user input for the form
    const [calcState, setCalcState] = useState({
        amount: 1,
        startUnit: "Cups (US)",
        ingredient: "",
        endUnit: "Grams",
    });

    // State for error message which will display on the form if user doesn't use correct input, no value by default
    const [errorMessage, setErrorMessage] = useState("");

    const { amount, startUnit, ingredient, endUnit } = calcState;

    // Array of ingredients and their density's from the IngredientList component
    let infoList = IngredientList();

    console.log(infoList)


    /* Originally used 236.588236 for cup but noticed results werent lining up to other calculators until
    using a value of 236.58823648491, this seems to be the correct value but will continue to look into it
    */

    const gallonGramCalc = 3785.41178;

    const quartGramCalc = 946.352946;

    const pintGramCalc = 473.176473;

    const cupGramCalc = 236.588236;

    const flOzGramsCalc = 29.57353;

    const literGramCalc = 1000;

    const tablespGramCalc = 14.786765;

    const tspGramCalc = 4.928922;

    const mlGramCalc = 1;

    // Gallons to grams
    // grams = gallons × 3,785.41178 × ingredient density

    // Quarts to grams
    // grams = quarts × 946.352946 × ingredient density

    // Pints to grams
    // grams = pints × 473.176473 × ingredient density

    // Cups to grams
    // grams = cups × 236.588236 × ingredient density

    // Fluid ounces to grams
    // grams = fluid ounces × 29.57353 × ingredient density

    // Liters to grams
    // grams = liters × 1000 × ingredient density

    // Tablespoons to grams
    // grams = tablespoons × 14.786765 × ingredient density

    // Teaspoons to grams
    // grams = teaspoons × 4.928922 × ingredient density

    // Milliliters to grams
    // grams = milliliters × ingredient density

    const gToKg = 0.001;

    const gToLb = 0.002205;

    const gToOz = 0.035274;

    // Grams to kilograms
    // kilograms = grams x 0.001

    // Grams to pounds
    // pounds = grams × 0.002205

    // Grams to ounces
    // ounces = grams × 0.035274



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

    return (
        <>
            <div className={`convertContainer`}>

                <section className="contactContainer mt-md-5 mt-3">
                    <h1 className='text-center formTitle'>Fun title</h1>
                    <form id='conversion-form'>
                        
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