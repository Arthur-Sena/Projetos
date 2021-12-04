import React, { Component } from 'react';
import Axios from 'axios';

import './Cadastro.css';

class Cadastro extends Component {

  constructor() {
    super();
    this.state = {
      nome: "",
      Data: null,
      CPF: null,
      CEP: null,
      logradouro: "",
      bairro: "",
      cidade: "",
      ErroCpf: "",
      ErroCep: "",
      MessageForm: "",
    }
  }

  cadastroNome = (event) => { this.setState({ nome: event.target.value }) }
  cadastroData = (event) => { this.setState({ Data: event.target.value }) }
  cadastroCPF = (event) => { this.setState({ CPF: event.target.value }) }
  cadastroLogradouro = (event) => { this.setState({ logradouro: event.target.value }) }
  cadastroBairro = (event) => { this.setState({ bairro: event.target.value }) }
  cadastroCidade = (event) => { this.setState({ cidade: event.target.value }) }
  cadastroCEP = (event) => {
    this.setState({ CEP: event.target.value }, () => this.state.CEP.length >= 8 ? (this.buscarCep()) : (null))
  }

  buscarCep = () => {
    Axios.get('http://viacep.com.br/ws/' + this.state.CEP + '/json/')
      .then(response => {
        if (response.data.erro != null) {
          this.setState({ ErroCep: "Cep Inválido" })
          this.setState({ logradouro: "" })
          this.setState({ cidade: "" })
          this.setState({ bairro: "" })
        } else {
          this.setState({ logradouro: response.data.logradouro })
          this.setState({ cidade: response.data.localidade })
          this.setState({ bairro: response.data.bairro })
          this.setState({ ErroCep: "" })
        }
      })
      .catch(error => this.setState({ ErroCep: "Cep Inválido" }))
  }

  validarCpf = (strCPF) => {
    var Soma;
    var Resto;
    let i;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

  CadastrarUsuario = () => {
    var ValidadorDeCpf = this.validarCpf(this.state.CPF);

    var UsuarioCadastrado = {
      Nome: this.state.Nome,
      DataDeNascimento: this.state.Data,
      CPF: this.state.CPF,
      CEP: this.state.CEP,
      logradouro: this.state.logradouro,
      cidade: this.state.cidade,
      bairro: this.state.bairro,
    }

    if (ValidadorDeCpf == true) {
      this.setState({ ErroCep: "" })
      localStorage.setItem("Usuario", JSON.stringify(UsuarioCadastrado) )
      document.cookie = "UsuarioCadastrado" + "=" + (JSON.stringify(UsuarioCadastrado)) + "" + "; "+'path=/';

      this.setState({MessageForm : "Usuario Cadastrado"})
    } else {
      this.setState({ ErroCpf: "Cpf Inválido" })
    }
  }

  render() {
    return (
      <div className="Tela_Cadastro">
        <div className="Div_Cadastro">

          <h2>Cadastre-se</h2>

          <form className="Form_Cadastro" onSubmit={() => this.CadastrarUsuario()}>

            <div className="meu-box">
              <input
                type="text"
                className="input-nome"
                onChange={this.cadastroNome}
                value={this.state.nome}
                minLength="5"
                required
              />
              <label class="label-nome">Nome Completo</label>
            </div>

            <div className="meu-box">
              <input
                type="date"
                className="input-nome"
                onChange={this.cadastroData}
                value={this.state.Data}
                required
              />
              <label class="label-nome">Data de Nascimento</label>
            </div>

            <div className="meu-box">
              <p className="MensagemDeErro">{this.state.ErroCpf}</p>
              <input
                className="input-nome"
                type="number"
                pattern="[0-9]+$"
                onChange={this.cadastroCPF}
                value={this.state.CPF}
                minLength="6"
                required
              />
              <label class="label-nome">CPF</label>
            </div>

            <div className="meu-box">
              <p className="MensagemDeErro">{this.state.ErroCep}</p>
              <input
                className="input-nome"
                type="number"
                pattern="/^[0-9]{2}\.[0-9]{3}-[0-9]{3}$/"
                onChange={this.cadastroCEP}
                value={this.state.CEP}
                minLength="8"
                maxLength="8"
                required
              />
              <label class="label-nome">CEP</label>
            </div>

            <div className="meu-box">
              <input
                className="input-nome"
                type="text"
                onChange={this.cadastroLogradouro}
                value={this.state.logradouro}
                required
              />
              <label class="label-nome">Logradouro</label>

            </div>

            <div className="meu-box">
              <input
                className="input-nome"
                type="text"
                onChange={this.cadastroCidade}
                value={this.state.cidade}
                required
              />
              <label class="label-nome">Cidade</label>

            </div>

            <div className="meu-box">
              <input
                className="input-nome"
                type="text"
                onChange={this.cadastroBairro}
                value={this.state.bairro}
                required
              />
              <label class="label-nome">Bairro</label>

            </div>

            <button 
              className="btn_Cadastro"
              type="button"
              onClick={() => this.CadastrarUsuario()}
            >
              <spam>Cadastrar</spam>

            </button>

            <p  className="MenssagemDeConfirmacao">{this.state.MessageForm}</p>
          </form>

        </div>
      </div>
    );
  }
}

export default Cadastro;