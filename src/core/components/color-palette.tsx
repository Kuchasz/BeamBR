import * as React from 'preact';

interface Props{
    colors: Color[];
    onChoose: (color: Color) => void;
}

export interface Color{
    hex: string;
}

export const ColorPalette = ({colors}: Props) => (
    <div>
        {colors.map(c => <div onClick={() => this.props.onChoose(c)} style={{width: '10px', height: '10px', background:`#${c.hex}`}}></div>)}
    </div>);