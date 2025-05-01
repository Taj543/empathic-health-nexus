
import { useState } from "react";
import { Send } from "lucide-react";
import { BottomNavigation } from "@/components/health/BottomNavigation";

const MedicalAI = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your Medical AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: "I understand your concern. Based on the symptoms you described, this could be related to several conditions. Let me ask you a few more questions to provide better guidance.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-16 flex flex-col">
      <header className="px-6 py-4 bg-white border-b border-gray-200">
        <h1 className="text-xl font-bold">Medical AI Assistant</h1>
        <p className="text-sm text-gray-500">Ask any health-related questions</p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === "user"
                  ? "bg-health-primary text-white rounded-tr-none"
                  : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
              }`}
            >
              <p>{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.role === "user" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="px-4 py-2 bg-white border-t border-gray-200 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your health question..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-health-primary"
        />
        <button
          type="submit"
          className="bg-health-primary text-white rounded-full w-10 h-10 flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </form>

      <BottomNavigation />
    </div>
  );
};

export default MedicalAI;
