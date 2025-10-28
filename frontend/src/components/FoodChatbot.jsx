import React, { useState } from 'react';

export function FoodChatbot() {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today? You can ask about food, recipes, or nutrition.", user: "Foodbot 🤖" },
    ]);
    const [userInput, setUserInput] = useState("");
    const [showInfo, setShowInfo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // SECURITY NOTE: In production, API keys should be stored in environment variables
    // and requests should go through your backend server, not directly from the client
    const GROQ_API_KEY = "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";

    const isValidQuery = (query) => {
        const keywords = [
            'food', 'recipe', 'recipes', 'nutrition', 'nutritional', 'ingredients', 'meal', 
            'cooking', 'diet', 'calories', 'healthy', 'cuisine', 'gourmet', 'dining', 
            'snacks', 'breakfast', 'lunch', 'dinner', 'beverages', 'drinks', 'dessert', 
            'appetizer', 'entree', 'soup', 'salad', 'vegan', 'vegetarian', 'gluten-free', 
            'organic', 'keto', 'paleo', 'protein', 'fiber', 'vitamins', 'minerals', 
            'carbs', 'sugar', 'fat', 'taste', 'flavors', 'spices', 'herbs', 'bakery', 
            'dairy', 'fast food', 'street food', 'gourmet', 'dish', 'eat', 'delicious'
        ];
        return keywords.some(keyword => query.toLowerCase().includes(keyword));
    };

    const formatResponse = (text) => {
        const lines = text.split('\n').filter(line => line.trim() !== "");
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {lines.map((line, idx) => {
                    if (line.trim().match(/^[\*\-•]/)) {
                        return (
                            <li key={idx} style={{ marginLeft: '20px' }}>
                                {line.replace(/^[\*\-•]\s*/, '').trim()}
                            </li>
                        );
                    }
                    if (line.trim().match(/^\d+\./)) {
                        return (
                            <li key={idx} style={{ marginLeft: '20px', listStyleType: 'decimal' }}>
                                {line.replace(/^\d+\.\s*/, '').trim()}
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

    const handleUserInput = async () => {
        if (!userInput.trim()) return;

        const userMessage = { text: userInput, user: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        if (!isValidQuery(userInput)) {
            const errorMessage = {
                text: "Sorry, I can only assist with questions related to food, recipes, or nutrition.",
                user: "Foodbot 🤖"
            };
            setMessages((prev) => [...prev, errorMessage]);
            setUserInput("");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful food and nutrition assistant. Provide clear, accurate information about food, recipes, nutrition, and cooking. Keep responses concise and well-formatted.'
                        },
                        {
                            role: 'user',
                            content: userInput
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1000,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.error('API Error Details:', errorData);
                throw new Error(`API Error: ${response.status} - ${errorData?.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();
            const botResponseText = data.choices[0]?.message?.content || "Sorry, I couldn't understand that.";
            const botMessage = { text: botResponseText, user: "Foodbot 🤖" };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error fetching from Groq API:", error);
            let errorText = "Sorry, I couldn't process that. ";
            if (error.message.includes('401')) {
                errorText += "The API key appears to be invalid or expired.";
            } else if (error.message.includes('429')) {
                errorText += "Rate limit exceeded. Please try again in a moment.";
            } else if (error.message.includes('400')) {
                errorText += "Invalid request. The model might not be available.";
            } else {
                errorText += "Please try again later.";
            }
            const errorMessage = {
                text: errorText,
                user: "Foodbot 🤖"
            };
            setMessages((prev) => [...prev, errorMessage]);
        }

        setUserInput("");
        setIsLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleUserInput();
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            padding: '2rem 1rem'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
            }}>
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowInfo(!showInfo)}
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <h1 style={{ color: 'white', margin: 0 }}>Food Chatbot 🍕</h1>
            </div>

            {/* Info Panel */}
            {showInfo && (
                <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    padding: '20px 30px',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginBottom: '1rem',
                    width: '90%',
                    maxWidth: '600px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                    <h3 style={{ margin: 0 }}>About This Chatbot</h3>
                    <p style={{ margin: 0 }}>This chatbot can help with questions related to food, recipes, and nutrition.</p>
                    <h4 style={{ margin: '10px 0 5px 0' }}>Include keywords like:</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        <li>food, recipe, ingredients</li>
                        <li>nutrition, calories, healthy</li>
                        <li>vegan, keto, paleo</li>
                        <li>meal, cooking, diet</li>
                        <li>dessert, beverage, salad, soup</li>
                        <li>vitamins, minerals, carbs, fat</li>
                    </ul>
                    <p style={{ margin: '5px 0 0 0' }}>
                        <em>Example:</em> <strong>"What are some high protein vegetarian meals?"</strong>
                    </p>
                </div>
            )}

            {/* Input Form */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'center',
                marginBottom: '1rem'
            }}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="🔍 Ask about food, recipes, or nutrition..."
                    disabled={isLoading}
                    style={{
                        width: '60vw',
                        maxWidth: '600px',
                        height: '50px',
                        borderRadius: '15px',
                        padding: '10px 15px',
                        fontSize: '1rem',
                        border: 'none',
                        outline: 'none',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                />
                <button
                    onClick={handleUserInput}
                    disabled={isLoading || !userInput.trim()}
                    style={{
                        color: 'white',
                        backgroundColor: '#4CAF50',
                        width: '120px',
                        height: '50px',
                        borderRadius: '15px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: isLoading || !userInput.trim() ? 'not-allowed' : 'pointer',
                        border: 'none',
                        opacity: isLoading || !userInput.trim() ? 0.5 : 1,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        if (!isLoading && userInput.trim()) {
                            e.target.style.transform = 'scale(1.05)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    Send
                </button>
            </div>

            {/* Messages Area */}
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#333',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '20px',
                maxHeight: '400px',
                overflowY: 'auto',
                borderRadius: '12px',
                width: '90%',
                maxWidth: '700px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            textAlign: msg.user === "user" ? 'right' : 'left',
                            marginBottom: '20px'
                        }}
                    >
                        <strong style={{ color: msg.user === "user" ? '#667eea' : '#4CAF50' }}>
                            {msg.user === "Foodbot 🤖" ? "Foodbot 🤖" : "You"}:
                        </strong>
                        <div style={{
                            marginLeft: msg.user === "user" ? '0' : '10px',
                            backgroundColor: msg.user === "user" ? '#e3f2fd' : '#f1f8e9',
                            padding: '10px 15px',
                            borderRadius: '10px',
                            display: 'inline-block',
                            maxWidth: '100%'
                        }}>
                            {msg.user === "Foodbot 🤖" ? formatResponse(msg.text) : msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div style={{ textAlign: 'left', marginTop: '10px' }}>
                        <strong style={{ color: '#4CAF50' }}>Foodbot 🤖:</strong>
                        <div style={{
                            marginLeft: '10px',
                            marginTop: '5px',
                            backgroundColor: '#f1f8e9',
                            padding: '10px 15px',
                            borderRadius: '10px',
                            display: 'inline-block'
                        }}>
                            <span>Typing</span>
                            <span style={{ animation: 'blink 1.5s infinite' }}>.</span>
                            <span style={{ animation: 'blink 1.5s infinite 0.2s' }}>.</span>
                            <span style={{ animation: 'blink 1.5s infinite 0.4s' }}>.</span>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes blink {
                    0%, 20% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }

                @media screen and (max-width: 768px) {
                    input[type="text"] {
                        width: 100% !important;
                        margin-bottom: 10px;
                    }
                    button {
                        width: 100% !important;
                    }
                }
            `}</style>
        </div>
    );
}
