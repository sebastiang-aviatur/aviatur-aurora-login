import { useEffect, useState, useRef } from "react";

export default function SupportButton({ userId =  1}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const intervalRef = useRef(null);

  const toggleSupport = () => {
    setIsOpen(!isOpen);
  };

  // Fetch previous messages
  useEffect(() => {
    if (isOpen) {
      fetch(`/api/support/messages?user=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setMessages(data);
          setUnreadCount(messages.length); // ❌ stale state bug (intentional)
        });
    }
  }, [isOpen]);

  // Polling for new messages
  useEffect(() => {
    if (isOpen) {
      intervalRef.current = setInterval(() => {
        fetch(`/api/support/latest?user=${userId}`)
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              setMessages([...messages, data]); // ❌ stale closure bug
              setUnreadCount(unreadCount + 1);  // ❌ stale closure bug
            }
          });
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Floating Support Button */}
      <button
        onClick={toggleSupport}
        className="fixed top-5 right-5 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition relative"
      >
        💬
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-2 py-0.5">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Support Modal */}
      {isOpen && (
        <div className="fixed top-20 right-5 w-80 h-96 bg-white border border-gray-200 shadow-xl rounded-lg p-4 overflow-y-auto">
          <h4 className="font-semibold mb-3">Support Chat</h4>

          {messages.map((msg, index) => (
            <div key={index} className="mb-2 text-sm">
              <strong>{msg.author}</strong>: {msg.text}
            </div>
          ))}
        </div>
      )}
    </>
  );
}