import {Socket} from "phoenix"

let socket = null;
let channel = null;  // Make channel global for console access

if (window.userToken) {
  socket = new Socket("/socket", {
    params: {token: window.userToken}
  })
  
  socket.connect()

  channel = socket.channel("chat:lobby", {})
  
  // Listen for join messages from other users
  channel.on("user_joined", (payload) => {
    console.log(payload.message)
    addMessageToChat(payload.message, 'join-message')
  })

  // Listen for leave messages
  channel.on("user_left", (payload) => {
    console.log(payload.message)
    addMessageToChat(payload.message, 'leave-message')
  })

  // Listen for new chat messages
  channel.on("new_message", (payload) => {
    console.log(`${payload.email}: ${payload.body}`)
    addMessageToChat(`${payload.email}: ${payload.body}`, 'chat-message')
  })

  // Listen for welcome message (for the joining user)
  channel.on("welcome", (payload) => {
    console.log(payload.message)
    addMessageToChat(payload.message, 'welcome-message')
  })
  
  // Handle disconnections
  socket.onError(() => addMessageToChat("Connection error!", 'error-message'))
  socket.onClose(() => addMessageToChat("Connection closed!", 'error-message'))

  channel.join()
    .receive("ok", resp => { 
      console.log("Joined successfully", resp)
      // Make the sendMessage function globally available
      window.sendMessage = (message) => {
        channel.push("new_message", { body: message })
          .receive("ok", () => console.log("Message sent successfully"))
          .receive("error", (reasons) => console.log("Message failed", reasons))
      }
    })
    .receive("error", resp => { 
      console.log("Unable to join", resp)
      addMessageToChat("Failed to join chat!", 'error-message')
    })
}

function addMessageToChat(message, className) {
  const messageContainer = document.querySelector("#chat-messages")
  if (messageContainer) {
    const messageElement = document.createElement("div")
    messageElement.className = className
    messageElement.textContent = message
    messageContainer.appendChild(messageElement)
    messageContainer.scrollTop = messageContainer.scrollHeight
  }
}

export default socket