import React, { useEffect, useState } from 'react';
import './CalorieEstimation.css';
import { assets } from '../assets/frontend_assets/assets';
export const NutritionFetcher = () => {
    const [nutritionData, setNutritionData] = useState([]);
    const [error, setError] = useState(null);
    const [foodInputs, setFoodInputs] = useState([{ food: '', quantity: '' }]);
    const [loading, setLoading] = useState(false);
    const [foodQuery, setFoodQuery] = useState('');
    const [showInfo, setShowInfo] = useState(false);
    const apiKey = '0S3tnIX82GmJZocmC72OUA==BXqW47D6hZxAcROy';

    const fetchNutritionData = async (query) => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
                method: 'GET',
                headers: {
                    'X-Api-Key': apiKey,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch nutrition data');
            }
            const data = await response.json();
            setNutritionData(data.items || []);
            setError(null);
        } catch (error) {
            setError(error.message);
            setNutritionData([]);
        } finally {
            setLoading(false);
        }
    };
    const handleInputChange = (index, field, value) => {
        const newInputs = [...foodInputs];
        newInputs[index][field] = value;
        setFoodInputs(newInputs);
    };

    const addFoodInput = () => {
        setFoodInputs([...foodInputs, { food: '', quantity: '' }]);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        const validEntries = foodInputs
            .filter(entry => entry.food.trim() !== '')
            .map(entry => `${entry.quantity ? entry.quantity + ' ' : ''}${entry.food.trim()}`);

        if (validEntries.length > 0) {
            const query = validEntries.join(', ');
            setFoodQuery(query);
            fetchNutritionData(query);
        }
    };
    return (
        <div className="nutrition-fetcher">
            <form onSubmit={handleSearch}>
                <div className="info-section">
                          <img
                            className='info-icon'
                            src={assets.info}
                            alt="Cooking Video Info"
                            onClick={() => setShowInfo(!showInfo)}
                          />
                          {showInfo && (
                            <div className="info-text" style = {{padding:"40px"}}>
                            <h3>🥗 About This Nutrition Estimation Tool</h3>
                            <p>
                              This tool assists you in estimating the nutritional content of various foods, helping you make informed dietary choices. Whether you're tracking calories for weight management or monitoring specific nutrients, this tool provides valuable insights.
                            </p>
                            <h4>🔍 Suggested Inputs:</h4>
                            <ul>
                              <li><strong>Food Items:</strong> chicken breast, brown rice, broccoli, almonds</li>
                              <li><strong>Quantities:</strong> 100g, 1 cup, 2 slices, 1 tablespoon, 2 ounces , 3.. </li>
                            </ul>
                            <p><em>Example:</em> <strong>"150g grilled salmon, 1 cup quinoa, 1 cup steamed broccoli, 2 ounces banana juice"</strong></p>
                          </div>
                          )}
                        </div>
                <h1 style={{ color: 'black' , marginBottom: "20px" , marginLeft: "24vw"}} className='nutrition_header'>Nutrition Estimation</h1>
                <div className="input-group-container">
                    {foodInputs.map((input, index) => (
                        <div key={index} className="input-pair">
                            <input
                                type="text"
                                placeholder="Food name (e.g., Chicken)"
                                value={input.food}
                                onChange={(e) => handleInputChange(index, 'food', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Quantity (e.g., 200g)"
                                value={input.quantity}
                                onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="button" className="add-btn" onClick={addFoodInput}>+ Add Food</button>
                    <button type="submit" style = {{padding:"5px",color:"white",backgroundColor:"blue"}}>👇 Search</button>
                </div>
            </form>

            <h3 style={{ color: 'black' }}>Nutrition Data for: {foodQuery}</h3>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                nutritionData.length > 0 ? (
                    <table className="nutrition-table">
                        <thead>
                            <tr>
                                <th>Food Item</th>
                                <th>Calories</th>
                                <th>Sugar【grm】</th>
                                <th>Fiber【grm】</th>
                                <th>Serving size【grm】</th>
                                <th>Total fat【grm】</th>
                                <th>Protein【grm】</th>
                                <th>Sodium【mg】</th>
                                <th>Potassium【mg】</th>
                                <th>Cholesterol【mg】</th>
                                <th>Total Carbs【grm】</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nutritionData.map((nutrient, index) => (
                                <tr key={index}>
                                    <td>{nutrient.name}</td>
                                    <td>{nutrient.calories}</td>
                                    <td>{nutrient.sugar_g}</td>
                                    <td>{nutrient.fiber_g}</td>
                                    <td>{nutrient.serving_size_g}</td>
                                    <td>{nutrient.fat_total_g}</td>
                                    <td>{nutrient.protein_g}</td>
                                    <td>{nutrient.sodium_mg}</td>
                                    <td>{nutrient.potassium_mg}</td>
                                    <td>{nutrient.cholesterol_mg}</td>
                                    <td>{nutrient.carbohydrates_total_g}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data found.</p>
                )
            )}
        </div>
    );
};
