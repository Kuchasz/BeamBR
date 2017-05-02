import * as React from 'preact';
import {connect} from 'preact-redux';

interface Props {
    data: Data[];
}

interface State {
    points: {x: number, y: number}[];
}

interface Data{
    name: string;
    points: {y: number}[];
}

class VisualizationView extends React.Component<any, any> {

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

        //
        // for (var i = 0; i < this.state.points.length; i++) {
        //     ctx.lineTo(800 / this.state.points.length * i, this.state.points[i].y);
        // }

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