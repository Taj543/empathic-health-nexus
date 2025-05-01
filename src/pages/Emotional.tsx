
import { useState } from "react";
import { Send, Heart, ThumbsUp } from "lucide-react";
import { BottomNavigation } from "@/components/health/BottomNavigation";

const EmotionalSupport = () => {
  const [mood, setMood] = useState<string | null>(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hi there! I'm your emotional support companion. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleMoodSelection = (selectedMood: string) => {
    setMood(selectedMood);
    
    // Add mood as a user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: `I'm feeling ${selectedMood} today.`,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);

    // Simulate AI response based on mood
    setTimeout(() => {
      let response = "";
      switch (selectedMood) {
        case "Great":
          response = "I'm happy to hear you're feeling great today! What's been going well for you?";
          break;
        case "Good":
          response = "That's good to hear! Is there anything specific that made your day good?";
          break;
        case "Okay":
          response = "Thanks for sharing. Would you like to talk about what's on your mind today?";
          break;
        case "Not Great":
          response = "I'm sorry you're not feeling great. Would it help to talk about what's bothering you?";
          break;
        case "Bad":
          response = "I'm sorry you're having a difficult day. Sometimes sharing what's troubling you can help. I'm here to listen.";
          break;
        default:
          response = "Thank you for sharing how you feel. Is there anything specific you'd like to talk about today?";
      }

      const botMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

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
        content: "Thank you for sharing that with me. It's completely normal to feel the way you do, and I appreciate your openness. Would you like to talk more about your feelings, or perhaps try a mindfulness exercise?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-16 flex flex-col">
      <header className="px-6 py-4 bg-white border-b border-gray-200">
        <h1 className="text-xl font-bold">Emotional Support</h1>
        <p className="text-sm text-gray-500">Your compassionate AI companion</p>
      </header>

      {!mood && (
        <div className="px-6 py-8 flex flex-col items-center">
          <h2 className="text-lg font-medium mb-6">How are you feeling today?</h2>
          <div className="grid grid-cols-3 gap-3 w-full max-w-md">
            {["Great", "Good", "Okay", "Not Great", "Bad"].map((option) => (
              <button
                key={option}
                onClick={() => handleMoodSelection(option)}
                className="p-3 border rounded-lg flex flex-col items-center hover:bg-gray-50"
              >
                {option === "Great" && <ThumbsUp className="text-green-500 mb-2" />}
                {option === "Good" && <ThumbsUp className="text-blue-500 mb-2" />}
                {option === "Okay" && <Heart className="text-yellow-500 mb-2" />}
                {option === "Not Great" && <Heart className="text-orange-500 mb-2" />}
                {option === "Bad" && <Heart className="text-red-500 mb-2" />}
                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={`flex-1 overflow-y-auto px-4 py-4 bg-gray-50 ${!mood ? 'hidden' : ''}`}>
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

      {mood && (
        <form
          onSubmit={handleSubmit}
          className="px-4 py-2 bg-white border-t border-gray-200 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share your thoughts..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-health-primary"
          />
          <button
            type="submit"
            className="bg-health-primary text-white rounded-full w-10 h-10 flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </form>
      )}

      <BottomNavigation />
    </div>
  );
};

export default EmotionalSupport;
