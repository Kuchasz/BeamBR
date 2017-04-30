import * as React from 'preact';

export const SensorListItem = ({id, resolution, name}: {id: string, resolution: number, name?: string}) => (
    <div style={{ margin: '5px', padding: '5px' }}>
        <span>{id}({name})</span>
        <span>({resolution})</span>
    </div>
)