defmodule FluxSocketWeb.ChatChannel do
  use Phoenix.Channel
  alias FluxSocket.Accounts

  def join("chat:lobby", _params, socket) do
    if socket.assigns.current_user_id do
      send(self(), :after_join)
      {:ok, assign(socket, :user_email, get_user_email(socket))}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def join("chat:" <> _private_room_id, _params, socket) do
    if socket.assigns.current_user_id do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_info(:after_join, socket) do
    broadcast_from!(socket, "user_joined", %{
      email: socket.assigns.user_email,
      message: "#{socket.assigns.user_email} joined the chat"
    })
    
    push(socket, "welcome", %{
      message: "Welcome to the chat!"
    })
    
    {:noreply, socket}
  end

  # Handle incoming messages
  def handle_in("new_message", %{"body" => body}, socket) do
    broadcast!(socket, "new_message", %{
      body: body,
      email: socket.assigns.user_email
    })
    
    {:noreply, socket}
  end

  def terminate(_reason, socket) do
    broadcast_from!(socket, "user_left", %{
      email: socket.assigns.user_email,
      message: "#{socket.assigns.user_email} left the chat"
    })
    :ok
  end

  defp get_user_email(socket) do
    socket.assigns.current_user_id
    |> Accounts.get_user!()
    |> Map.get(:email)
  end
end