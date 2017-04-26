import * as React from 'preact';

export const Network = ({name, strength, channel}) => (
    <div>
        <div>{name}({channel})</div>
        <div>{strength}</div>
    </div>
);