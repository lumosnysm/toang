const origin = "http://localhost:3000"

const Path = {
  root: () => `${origin}`,
  sign_in: () => `${origin}/users/sign_in`,
  sign_up: () => `${origin}/users`,
  log_out: () => `${origin}/users/sign_out`,
  get_nodes: () => `${origin}/nodes_nearby_data`
}

export default Path;
