import { loginUser } from "../lib/auth";
import Router from "next/router";

export default class LoginForm extends React.Component {
  state = {
    email: "Julianne.OConner@kory.org",
    password: "kale.biz",
    error: "",
    isLoading: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const { email, password } = this.state;
    e.preventDefault();
    // clean up the error in the state
    this.setState({ error: "", isLoading: true });
    loginUser(email, password)
      .then(() => {
        Router.push("/profile");
      })
      .catch(this.showError);
  };

  showError = err => {
    console.error(err);
    const error = (err.response && err.response.data) || err.message;
    this.setState({ error, isLoading: false });
  };

  render() {
    const { password, email, error, isLoading } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
        </div>
        <button disabled={isLoading} type="submit">
          {isLoading ? "Sending..." : "Submit"}
        </button>
        {error && <div>{error}</div>}
      </form>
    );
  }
}
