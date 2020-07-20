import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            charData:this.props.chartData
        }
    }

    static defaultProps = {
        
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'top',
        

    }

    render() {
        return (

            <div className='chart' style={{width:'70vw', marginLeft:'-11.5vw', marginTop:'-5vh'}}>
                <Pie
                
                    data={this.state.charData}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            fontSize: 25
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        },
                        
                    }}
                />
            </div>

        )
    }
}

export default Chart;