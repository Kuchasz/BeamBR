import * as React from 'preact';
import {connect} from 'preact-redux';

interface Props {

}

interface State {
    points: {x: number, y: number}[];
}

class VisualizationView extends React.Component<any, any> {

    constructor() {
        super();
        this.state = {
            points: []
        };

        let direction = 1;
        let previos = {x: 0, y: Math.floor(Math.random() * 800)};

        setInterval(() => {
            let potential = {x: 0, y: ( previos.y + direction * Math.floor(Math.random() * 20) - 10) % 600};
            previos = potential;
            this.setState({points: [...this.state.points, potential]})
        }, 100);
    }

    canvas: HTMLCanvasElement;

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas() {
        const ctx = this.canvas.getContext('2d');
        ctx.fillRect(0, 0, 800, 600);

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'red';

        ctx.beginPath();

        for (var i = 0; i < this.state.points.length; i++) {
            ctx.lineTo(800 / this.state.points.length * i, this.state.points[i].y);
        }

        ctx.stroke();
    }

    render() {
        return (
            <div>
                <canvas ref={(canvas: HTMLCanvasElement) => this.canvas = canvas} width={800} height={600}/>
            </div>)
    }
}
;

export const Visualization = connect()(VisualizationView);