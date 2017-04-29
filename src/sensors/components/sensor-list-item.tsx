import * as React from 'preact';

export const SensorListItem = ({id, resolution}) => (
    <div style={{ margin: '5px', padding: '5px' }}>
        <span>{id}</span>
        <span>({resolution})</span>
    </div>
)