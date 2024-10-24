defmodule FluxSocket.Repo do
  use Ecto.Repo,
    otp_app: :flux_socket,
    adapter: Ecto.Adapters.Postgres
end
