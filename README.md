# Phoenix Chat Application

A real-time chat application built with Phoenix Framework, featuring user authentication and WebSocket communication.

## Features

- User authentication (registration, login, logout)
- Real-time chat functionality
- User join/leave notifications
- Secure WebSocket connections
- User presence tracking

## Prerequisites

- Elixir 1.14 or later
- Phoenix 1.7 or later
- PostgreSQL
- Node.js and npm for JavaScript dependencies

## Setup

1. Clone the repository:
```bash
git clone <your-repository-url>
cd flux_socket
```

2. Install dependencies:
```bash
# Install Elixir dependencies
mix deps.get

3. Configure the database:
   - Update `config/dev.exs` with your PostgreSQL credentials if needed
   - Create and migrate the database:
```bash
mix ecto.setup
```

4. Start the Phoenix server:
```bash
mix phx.server
```

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Usage

### User Authentication

1. Register a new account at `/users/register`
2. Log in at `/users/log_in`
3. Log out using the logout button in the navigation

### Chat Features

After logging in, you can:

1. Join the chat room automatically check console log
2. See notifications when other users join/leave
3. Send messages in the chat room

#### Sending Messages via Console

For testing or debugging, you can send messages using the browser console:

```javascript
// Method 1: Using the global sendMessage function
sendMessage("Hello, everyone!")

// Method 2: Using the channel directly
channel.push("new_message", { body: "Hello, everyone!" })
```

## Channel Implementation Details

### Server-Side (Elixir)

The chat functionality is implemented in three main files:

1. `lib/flux_socket_web/channels/user_socket.ex`:
   - Handles WebSocket authentication
   - Verifies user tokens
   - Establishes socket connection

2. `lib/flux_socket_web/channels/chat_channel.ex`:
   - Manages chat room joins
   - Broadcasts messages
   - Handles user presence

3. `lib/flux_socket_web/router.ex`:
   - Contains authentication routes
   - Configures socket handlers

### Client-Side (JavaScript)

The chat client is implemented in:

```javascript
// assets/js/user_socket.js
socket.connect()
let channel = socket.channel("chat:lobby", {})

// Listen for various events
channel.on("user_joined", ...)
channel.on("user_left", ...)
channel.on("new_message", ...)
```

## Security

- All WebSocket connections are authenticated using Phoenix Tokens
- User sessions are managed securely
- Passwords are hashed using Bcrypt
- CSRF protection is enabled
- Secure browser headers are configured

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

- Phoenix Framework team for their excellent documentation
- Elixir community for support and resources