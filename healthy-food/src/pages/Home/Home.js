import React, { Component } from 'react';
import './Home.css';

//- - - - -IMAGES- - - - -\\
import Header from '../../assets/Illustration.svg';
import Lupa from '../../assets/lupa.png';
import Comida1 from '../../assets/comida_1.svg';
import Comida2 from '../../assets/comida_2.svg';
import Comida3 from '../../assets/comida_3.svg';
import Comida4 from '../../assets/comida_4.svg';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            Recepies: [
                {
                    Title: "Broccoli Salad with Bacon",
                    Img: Comida1,
                },{
                    Title: "Classic Beef Burgers",
                    Img: Comida2,
                },{
                    Title: "Classic Potato Salad",
                    Img: Comida3,
                },{
                    Title: "Cherry Cobbler on the Grill",
                    Img: Comida4,
                }
            ]
        }
    }

    render() {
        return (
            <>
                <nav className="Nav_Home" >
                    <div className="Nav_Title" >
                        <h2> Healthy Food </h2>
                    </div>
                    <div className="Nav_SubTitle" >
                        <p>HEALTHY RECIPES</p>
                        <p>BLOG</p>
                        <p>JOIN</p>
                        <p>REGISTER</p>
                    </div>
                </nav>

                <header className="Header_Home" >
                    <div className="DivForm_HeaderHome" >
                        <h1 className="h1_FormHeaderHome"> Ready for<br />Trying a new<br/>recipe?</h1>

                        <form   className="Form_HeaderHome">
                            <input 
                                className="Input_FormHeaderHome"
                                type="search"
                                placeholder="Search healthy recipes"
                            />

                            <button className="Btn_FormHeaderHome">
                                <img src={Lupa} height="20"/>
                            </button>
                        </form>
                    </div>

                    <img src={Header} className="illustration" />
                </header>

                <body   className="Body_Home">
                    
                    <h1>Our Best Recipes</h1>

                    <p>Far far away, behind the word mountains, far from the countries<br/>Vokalia and Consonantia, there live the blind texts.</p>

                    <div    className="Div_CardsBodyHome">
                        {this.state.Recepies.map(x => {
                            return (
                                <div    className="Card_BodyHome">
                                    
                                    <img  src={x.Img}  className="img_CardBodyHome"/>
                                    
                                    <div    className="Card_Description">
                                        <h3>{x.Title}</h3>

                                        <button 
                                            className="Btn_CardBodyHome"
                                            type="button"
                                        >
                                            <spam   style={{color: "white"}}>See Recipe</spam>
                                        </button>
                                    </div>
                                </div>
                            )})
                        }
                    </div>

                </body>

            </>
        );
    }
}

export default Home;