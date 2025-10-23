import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { startConciergeChat } from '../../services/geminiService';
import type { ChatMessage } from '../../types';
import { SparkleIcon, SendIcon } from '../../constants';
import Spinner from '../Spinner';

const AIConcierge: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chatInstance = startConciergeChat();
        setChat(chatInstance);
        setMessages([{ role: 'model', text: 'Hello! I am your AI Real Estate Concierge. How can I help you find your dream home today?' }]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const sendMessage = useCallback(async () => {
        if (!input.trim() || !chat || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: input });
            const modelMessage: ChatMessage = { role: 'model', text: response.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: ChatMessage = { role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [input, chat, isLoading]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const handleAskForLocation = useCallback(() => {
        if (!chat || isLoading) return;
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const locationPrompt = `The user has shared their location. It is latitude: ${latitude}, longitude: ${longitude}. Please find good Italian restaurants nearby.`;
                const userMessage: ChatMessage = { role: 'user', text: 'Find good Italian restaurants near me.' };
                setMessages(prev => [...prev, userMessage]);
                setIsLoading(true);

                try {
                    const response = await chat.sendMessage({ message: locationPrompt });
                    const modelMessage: ChatMessage = { role: 'model', text: response.text };
                    setMessages(prev => [...prev, modelMessage]);
                } catch (error) {
                     console.error('Error with location prompt:', error);
                    const errorMessage: ChatMessage = { role: 'model', text: 'Sorry, I had trouble processing that location. Please try again.' };
                    setMessages(prev => [...prev, errorMessage]);
                } finally {
                    setIsLoading(false);
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                const errorMessage: ChatMessage = { role: 'model', text: 'I couldn\'t access your location. Please ensure you have location services enabled.' };
                setMessages(prev => [...prev, errorMessage]);
            }
        );
    }, [chat, isLoading]);

    return (
        <div className="flex flex-col h-[75vh] bg-brand-secondary rounded-lg shadow-2xl">
            <div className="p-4 border-b border-brand-accent flex items-center gap-3">
                <SparkleIcon className="w-8 h-8 text-brand-highlight" />
                <h1 className="text-2xl font-bold">AI Concierge</h1>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-brand-highlight-hover text-brand-highlight-text flex items-center justify-center font-bold flex-shrink-0">AI</div>}
                            <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-brand-accent text-white' : 'bg-brand-primary text-brand-text'}`}>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start">
                             <div className="w-8 h-8 rounded-full bg-brand-highlight-hover text-brand-highlight-text flex items-center justify-center font-bold flex-shrink-0">AI</div>
                            <div className="max-w-md p-3 rounded-lg bg-brand-primary">
                                <Spinner size="sm" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="p-4 border-t border-brand-accent">
                <div className="flex items-center gap-2 mb-2">
                    <button onClick={() => setInput("Show me 3-bedroom houses with a pool in Malibu")} className="text-xs bg-brand-accent p-2 rounded-lg hover:bg-brand-light transition">3-bed in Malibu</button>
                    <button onClick={() => setInput("What's the market like in Aspen?")} className="text-xs bg-brand-accent p-2 rounded-lg hover:bg-brand-light transition">Market in Aspen</button>
                    <button onClick={handleAskForLocation} className="text-xs bg-brand-accent p-2 rounded-lg hover:bg-brand-light transition">Restaurants Nearby</button>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about listings, markets, or neighborhoods..."
                        className="flex-grow p-3 rounded-lg bg-brand-accent text-white placeholder-brand-light border-brand-light focus:ring-brand-highlight focus:border-brand-highlight"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                        className="bg-brand-highlight-hover text-brand-highlight-text font-bold p-3 rounded-lg hover:bg-brand-highlight transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                       <SendIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIConcierge;