import React, { Component } from 'react';
import './Home.css';

//- - - - -IMAGES- - - - -\\
import Header from '../../assets/Illustration.svg';
import Services from '../../assets/bloco_services.svg';
import Footer from '../../assets/bloco_final_image.svg';
import Lupa from '../../assets/lupa.png';
import Comida1 from '../../assets/comida_1.svg';
import Comida2 from '../../assets/comida_2.svg';
import Comida3 from '../../assets/comida_3.svg';
import Comida4 from '../../assets/comida_4.svg';
import Blog1 from '../../assets/blog_image_1.svg';
import Blog2 from '../../assets/bloco_image_2.svg';
import Blog3 from '../../assets/bloco_image_3.svg';
import Blog4 from '../../assets/bloco_image_4.svg';
import Person1 from '../../assets/Person1.PNG';
import Person2 from '../../assets/Person2.PNG';
import Person3 from '../../assets/Person3.PNG';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            Recepies: [
                {
                    Title: "Broccoli Salad with Bacon",
                    Img: Comida1,
                }, {
                    Title: "Classic Beef Burgers",
                    Img: Comida2,
                }, {
                    Title: "Classic Potato Salad",
                    Img: Comida3,
                }, {
                    Title: "Cherry Cobbler on the Grill",
                    Img: Comida4,
                }
            ],

            RecepiesComFiltro: [],

            Blog: [
                {
                    Title: 'Quick-start guide to nuts and seeds',
                    Img: Blog1,
                    Person: Person1,
                    PersonName: "Kevin Ibrahim"
                },
                {
                    Title: 'Nutrition: Tips for Improving Your Health',
                    Img: Blog2,
                    Person: Person2,
                    PersonName: "Mike Jackson"
                },
                {
                    Title: 'The top 10 benefits of eating healthy',
                    Img: Blog3,
                    Person: Person3,
                    PersonName: "Bryan McGregor"
                },
                {
                    Title: 'Quick-start guide to nuts and seeds',
                    Img: Blog4,
                    Person: Person1,
                    PersonName: "Neymar Jr"
                },
            ],

            menu: false,
            mostrarTexto: false,
            widthTela: window.screen.width,
            buscar: "",
        }
    }

    abrirMenu = () => {
        this.setState({ menu: !this.state.menu });
    }

    atualizaEstado(event) {
        this.setState({ buscar: event.target.value }, () => {
            this.FiltrarHemocentro();
        });
    }

    FiltrarHemocentro() {
        let listaFiltrada = this.state.Recepies;

        if (this.state.buscar !== "") {
            listaFiltrada = listaFiltrada.filter(
                x =>
                    x.Title.toLowerCase().includes(this.state.buscar.toLowerCase())
            );
        }

        this.setState({ RecepiesComFiltro: listaFiltrada });

    }

    componentDidMount() {
        this.setState({ RecepiesComFiltro: this.state.Recepies })
        console.log(this.state.widthTela);
    }
    render() {
        return (
            <>
                <nav className="Nav_Home" >
                    <div className="Nav_Title" >
                        <h2> Healthy Food </h2>
                    </div>
                    {this.state.widthTela >= 550 ? (
                        <div className="Nav_SubTitle" >
                            <a href="">HEALTHY RECIPES</a>
                            <a href="#Blog">BLOG</a>
                            <a href="">JOIN</a>
                            <a href="/Cadastro">REGISTER</a>
                        </div>
                    ) : (
                        <div>
                            <button
                                className="btn_Menu"
                                onClick={() => this.abrirMenu()}

                            >
                                <spam>=</spam>
                            </button>

                            {this.state.menu == true ? (
                                <div className="Nav_Menu" >
                                    <a href="">HEALTHY RECIPES</a>
                                    <a href="#Blog">BLOG</a>
                                    <a href="">JOIN</a>
                                    <a href="/Cadastro">REGISTER</a>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    )}

                </nav>

                <header className="Header_Home" >
                    <div className="DivForm_HeaderHome" >
                        <h1 className="h1_FormHeaderHome"> Ready for<br />Trying a new<br />recipe?</h1>

                        <form className="Form_HeaderHome">
                            <input
                                className="Input_FormHeaderHome"
                                type="search"
                                placeholder="Search healthy recipes"
                                onChange={this.atualizaEstado.bind(this)}
                            />

                            <button className="Btn_FormHeaderHome"
                                type="button"
                            >
                                <img src={Lupa} height="20" />
                            </button>
                        </form>
                    </div>

                    <img src={Header} className="illustration" />
                </header>

                <section className="Body_Home">

                    <h1>Our Best Recipes</h1>

                    <p>Far far away, behind the word mountains, far from the countries<br />Vokalia and Consonantia, there live the blind texts.</p>

                    <div className="Div_CardsBodyHome">
                        {this.state.RecepiesComFiltro.map(x => {
                            return (
                                <div className="Card_BodyHome">

                                    <img src={x.Img} className="img_CardBodyHome" />

                                    <div className="Card_Description">
                                        <h3>{x.Title}</h3>

                                        <button
                                            className="Btn_CardBodyHome"
                                            type="button"
                                        >
                                            <spam style={{ color: "white" }}>See Recipe</spam>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>

                </section>

                <section className="Services_BodyHome">

                    <img src={Services} />


                    {this.state.widthTela >= 650 ? (
                        <div className="TextServices_BodyHome">
                            <h1>The best services ready <br />To serve you</h1>
                            <p>Far far away, behind the word mountains, far from
                                the countries Vokalia and Consonantia, there live the
                                blind texts.
                            </p>
                            <p>
                                Separated they live in Bookmarksgrove right at the
                                coast of the Semantics, a large language ocean.
                            </p>
                            <p>
                                A small river named Duden flows by their place and
                                supplies it with the necessary regelialia.
                            </p>
                            <button
                                className="Btn_ServicesBodyHome"
                                type="button"
                            >
                                <spam style={{ color: "white" }}>Know More</spam>
                            </button>
                        </div>
                    ) : (
                        <div className="TextServices_BodyHome">
                            <h1>The best services ready <br />To serve you</h1>
                            <button
                                className="Btn_ServicesBodyHome"
                                type="button"
                                onClick={() => this.setState({ mostrarTexto: !this.state.mostrarTexto })}
                            >
                                <spam style={{ color: "white" }}>Know More</spam>
                            </button>
                        </div>
                    )}
                </section>
                {this.state.mostrarTexto == true ? (
                    <div className="div_MostrarTexto">
                        <p>Far far away, behind the word mountains, far from
                            the countries Vokalia and Consonantia, there live the
                            blind texts.
                        </p>
                        <br />
                        <p>
                            Separated they live in Bookmarksgrove right at the
                            coast of the Semantics, a large language ocean.
                        </p>
                        <br />
                        <p>
                            A small river named Duden flows by their place and
                            supplies it with the necessary regelialia.
                        </p>
                    </div>
                ) : (<div></div>)}

                <section className="Body_Home" id="Blog">

                    <h1>Read Our Blog</h1>

                    <p>Far far away, behind the word mountains, far from the countries<br />Vokalia and Consonantia, there live the blind texts.</p>

                    <div className="Blog_CardsBodyHome">
                        {this.state.Blog.map(x => {
                            return (
                                <div className="Card_BlogHome">

                                    <img src={x.Img} className="img_CardBlogHome" />

                                    <div className="Card_DescriptionBlog">
                                        <h3>{x.Title}</h3>

                                        <div className="SubDiv_CardDescriptionBlog">
                                            <img src={x.Person} />
                                            <p>{x.PersonName}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>

                </section>

                <section className="FooterBody_Home">
                    <div className="DivForm_HeaderHome" >
                        <h4 className="h1_FormHeaderHome"> Join our membership <br />to get special offer</h4>

                        <form className="Form_HeaderHome">
                            <input
                                className="Input_FormHeaderHome"
                                type="search"
                                placeholder="Search healthy recipes"
                            />

                            <button className="Btn_FormHeaderHome"
                                type="button"
                            >
                                <img src={Lupa} height="20" />
                            </button>
                        </form>
                    </div>
                    <img src={Footer} className="illustration" />

                </section>

                <footer className="Footer">
                    <p>© Copyrights 2019 Stack. All Rights Reserved.</p>
                    <div>
                        <p>Privacy Policy</p>
                        <p>Terms and Conditions</p>
                    </div>
                </footer>

            </>
        );
    }
}

export default Home;