import React, {  useState } from "react";



function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     // join personal room
//     socket.emit("join", currentUser._id);

//     // receive message
//     socket.on("receiveMessage", (msg) => {
//       if (msg.senderId === selectedUser._id) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [currentUser, selectedUser]);

  const sendMessage = () => {
    console.log("Sending message:", newMessage);
    if (!newMessage.trim()) return;

    const msg = {
      text: newMessage
    };

    setMessages((prev) => [...prev, msg]); 
    setNewMessage("");
  };

  return (
    <div className="chat-container border rounded shadow p-3 bg-white w-50 mx-auto mt-5">
      <h5>Chat with srujan</h5>
      <div className="messages mb-3" style={{ height: "300px", overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="p-2 mb-2 rounded" 
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="btn btn-success" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatPage;
