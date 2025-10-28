// import React, { useState } from 'react';
// import axios from 'axios';
// import './FoodChatbot.css'; 
// import { assets } from '../assets/frontend_assets/assets';
// export const FoodChatbot = () => {
//     const [messages, setMessages] = useState([
//         { text: "Hello! How can I assist you today? You can ask about food, recipes, or nutrition.", user: "Foodbot 🤖" },
//     ]);
//     const [userInput, setUserInput] = useState("");

//     const isValidQuery = (query) => {
//         const keywords = [
//             'food', 'recipe', 'recipes', 'nutrition', 'nutritional', 'ingredients', 'meal', 
//             'cooking', 'diet', 'calories', 'healthy', 'cuisine', 'gourmet', 'dining', 
//             'snacks', 'breakfast', 'lunch', 'dinner', 'beverages', 'drinks', 'dessert', 
//             'appetizer', 'entree', 'soup', 'salad', 'vegan', 'vegetarian', 'gluten-free', 
//             'organic', 'keto', 'paleo', 'protein', 'fiber', 'vitamins', 'minerals', 
//             'carbs', 'sugar', 'fat', 'taste', 'flavors', 'spices', 'herbs', 'bakery', 
//             'dairy', 'fast food', 'street food', 'gourmet'
//           ];
          
//         return keywords.some(keyword => query.toLowerCase().includes(keyword));
//     };

//     const formatResponse = (text) => {
//         const lines = text.split('\n').filter(line => line.trim() !== "");
    
//         return (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                 {lines.map((line, idx) => {
//                     if (line.trim().startsWith('*')) {
//                         return (
//                             <li key={idx} style={{ marginLeft: '20px' }}>
//                                 {line.substring(1).trim()}
//                             </li>
//                         );
//                     }
//                     return (
//                         <p key={idx} style={{ margin: 0, lineHeight: '1.5em' }}>
//                             {line}
//                         </p>
//                     );
//                 })}
//             </div>
//         );
//     };    

//     const handleUserInput = async (e) => {
//         e.preventDefault();

//         const userMessage = { text: userInput, user: "user" };
//         setMessages((prev) => [...prev, userMessage]);

//         if (!isValidQuery(userInput)) {
//             const errorMessage = { text: "Sorry, I can only assist with questions related to food, recipes, or nutrition.", user: "Foodbot 🤖" };
//             setMessages((prev) => [...prev, errorMessage]);
//             setUserInput("");
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBZd2z4MrtmGWwW0c5lq60icZTPj5nxTC8', // Ensure this key is valid
//                 {
//                     contents: [
//                         {
//                             parts: [
//                                 {
//                                     text: userInput,
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );

//             console.log("Response from API:", response.data);

//             const botResponseText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";

//             const botMessage = {
//                 text: botResponseText,
//                 user: "Foodbot 🤖",
//             };
//             setMessages((prev) => [...prev, botMessage]);
//         } catch (error) {
//             console.error("Error fetching from Gemini API:", error);
//             if (error.response) {
//                 console.error("Response error data:", error.response.data);
//             }
//             const errorMessage = { text: "Sorry, I couldn't process that. Please try again later.", user: "Foodbot 🤖" };
//             setMessages((prev) => [...prev, errorMessage]);
//         }

//         setUserInput("");
//     };

//     return (
//         <div className="food-chatbot-container">
//   <div className="food-chatbot-header">
//     <h1>Food Chatbot</h1>
    
//   </div>

//   <form className="food-chatbot-form" onSubmit={handleUserInput}>
//     <input
//       className="food-chatbot-input"
//       type="text"
//       value={userInput}
//       onChange={(e) => setUserInput(e.target.value)}
//       placeholder="🔍 Queries on Food, Recipes and Nutritional values"
//       required
//     />
//     <button className="food-chatbot-button" type="submit">Send</button>
//   </form>

//   <div className="food-chatbot-messages">
//     {messages.map((msg, index) => (
//       <div
//         key={index}
//         className={`food-chatbot-message ${msg.user === "user" ? "user" : ""}`}
//       >
//         <strong>{msg.user === "Foodbot 🤖" ? "Foodbot 🤖" : "You"}:</strong>
//         <div className="food-chatbot-message-content">
//           {msg.user === "Foodbot 🤖" ? formatResponse(msg.text) : msg.text}
//         </div>
//       </div>
//     ))}
//   </div>
// </div>
//     );
// };
import React, { useState } from 'react';
import axios from 'axios';
import './FoodChatbot.css'; 
import { assets } from '../assets/frontend_assets/assets';

export const FoodChatbot = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today? You can ask about food, recipes, or nutrition.", user: "Foodbot 🤖" },
    ]);
    const [userInput, setUserInput] = useState("");
    const [showInfo, setShowInfo] = useState(false);

    const isValidQuery = (query) => {
        const keywords = [
            'food', 'recipe', 'recipes', 'nutrition', 'nutritional', 'ingredients', 'meal', 
            'cooking', 'diet', 'calories', 'healthy', 'cuisine', 'gourmet', 'dining', 
            'snacks', 'breakfast', 'lunch', 'dinner', 'beverages', 'drinks', 'dessert', 
            'appetizer', 'entree', 'soup', 'salad', 'vegan', 'vegetarian', 'gluten-free', 
            'organic', 'keto', 'paleo', 'protein', 'fiber', 'vitamins', 'minerals', 
            'carbs', 'sugar', 'fat', 'taste', 'flavors', 'spices', 'herbs', 'bakery', 
            'dairy', 'fast food', 'street food', 'gourmet'
        ];
        return keywords.some(keyword => query.toLowerCase().includes(keyword));
    };

    const formatResponse = (text) => {
        const lines = text.split('\n').filter(line => line.trim() !== "");
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {lines.map((line, idx) => {
                    if (line.trim().startsWith('*')) {
                        return (
                            <li key={idx} style={{ marginLeft: '20px' }}>
                                {line.substring(1).trim()}
                            </li>
                        );
                    }
                    return (
                        <p key={idx} style={{ margin: 0, lineHeight: '1.5em' }}>
                            {line}
                        </p>
                    );
                })}
            </div>
        );
    };

    const handleUserInput = async (e) => {
        e.preventDefault();
        const userMessage = { text: userInput, user: "user" };
        setMessages((prev) => [...prev, userMessage]);

        if (!isValidQuery(userInput)) {
            const errorMessage = {
                text: "Sorry, I can only assist with questions related to food, recipes, or nutrition.",
                user: "Foodbot 🤖"
            };
            setMessages((prev) => [...prev, errorMessage]);
            setUserInput("");
            return;
        }

        try {
            const response = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC15A6jsuKMmq0fU7lLsEXsl6AEnYOhPP4',
                {
                    contents: [
                        {
                            parts: [{ text: userInput }],
                        },
                    ],
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const botResponseText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
            const botMessage = { text: botResponseText, user: "Foodbot 🤖" };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error fetching from Gemini API:", error);
            const errorMessage = {
                text: "Sorry, I couldn't process that. Please try again later.",
                user: "Foodbot 🤖"
            };
            setMessages((prev) => [...prev, errorMessage]);
        }

        setUserInput("");
    };

    return (
        <div className="food-chatbot-container">
            <div className="food-chatbot-header">
                <img
                className='info-icon'
                style= {{ cursor: "pointer", width: "30px", height: "30px",borderRadius: "50%", marginRight: "10px"}}
                src = {assets.info}
                alt="Food Chatbot info"
                onClick={() => setShowInfo(!showInfo)}
                />
                <h1>Food Chatbot</h1>
            </div>

            {showInfo && (
                <div className="food-chatbot-info-panel" style = {{ backgroundColor: "grey", padding: "20px 30px", borderRadius: "8px",display: "flex", flexDirection: "column", gap: "10px"}}>
                    <h3>About This Chatbot</h3>
                    <p>This chatbot can help with questions related to food, recipes, and nutrition.</p>
                    <h4>Include keywords like:</h4>
                    <ul>
                        <li>food, recipe, ingredients</li>
                        <li>nutrition, calories, healthy</li>
                        <li>vegan, keto, paleo</li>
                        <li>meal, cooking, diet</li>
                        <li>dessert, beverage, salad, soup</li>
                        <li>vitamins, minerals, carbs, fat</li>
                    </ul>
                    <p><em>Example:</em> <strong>"What are some high protein vegetarian meals?"</strong></p>
                </div>
            )}

            <form className="food-chatbot-form" onSubmit={handleUserInput}>
                <input
                    className="food-chatbot-input"
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="🔍 Queries on Food, Recipes and Nutritional values"
                    required
                />
                <button className="food-chatbot-button" type="submit">Send</button>
            </form>

            <div className="food-chatbot-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`food-chatbot-message ${msg.user === "user" ? "user" : ""}`}
                    >
                        <strong>{msg.user === "Foodbot 🤖" ? "Foodbot 🤖" : "You"}:</strong>
                        <div className="food-chatbot-message-content">
                            {msg.user === "Foodbot 🤖" ? formatResponse(msg.text) : msg.text}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

