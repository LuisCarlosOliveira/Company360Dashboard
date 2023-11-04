import React from 'react';
import './login.css';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      finance: "",
      email: "",
      password: "",
      error: ""
    }

    localStorage.setItem("type", "sales");
    this.state.finance = localStorage.getItem("type");
    document.title = "Engenheiros das Peles, Lda"
  }

  handleSignIn = async e => {
    e.preventDefault();

    const { email, password } = this.state;
  
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e password para entrar!" });
    } else {
     if (email == "luis") {
       localStorage.setItem("type", "armazem"); 
       window.location.href = '/home';
     } else if (email == "jaques"){
      localStorage.setItem("type", "sales"); 
      window.location.href = '/home';
     } else if (email == "hugo"){
      localStorage.setItem("type", "finance");
      window.location.href = '/home';
     }
     else{
      this.setState({ error: "User Inválido!" });
     } 
    }
  };

  render() {

    return (

      <div className="container-fluid position-relative d-flex p-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-6 col-md-8 login-box">
              <div className="col-lg-12 login-key">
                <i className="fa fa-key" aria-hidden="true"></i>
              </div>
              <div className="col-lg-12 login-title">
                Engenheiros das Peles, Lda
              </div>

              <div className="col-lg-12 login-form">
                <div className="col-lg-12 login-form">
                  <form onSubmit={this.handleSignIn}>
                    <div className="form-group">
                      <label className="form-control-label">USERNAME</label>
                      <input type="text" className="form-control" onChange={e => this.setState({ email: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-control-label">PASSWORD</label>
                      <input type="password" className="form-control" onChange={e => this.setState({ password: e.target.value })} />
                    </div>
                    <div>
                      {this.state.error && <p>{this.state.error}</p>}<br />
                    </div>

                    <div className="col-lg-12 loginbttm">
                      <div className="col-lg-6 login-btm login-text">

                      </div>
                      <div className="col-lg-6 login-btm login-button">
                        <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-3 col-md-2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login