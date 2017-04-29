import * as React from 'preact';
import {connect} from 'preact-redux';
import {SensorListItem} from './sensor-list-item';

class SensorsListView extends React.Component<any, any>{
    render(){
        return (
            <div>
                <SensorListItem id={'0404032'} resolution={'9bit'}/>
                <SensorListItem id={'04ff3d2'} resolution={'10bit'}/>
                <SensorListItem id={'099bee3'} resolution={'10bit'}/>
                <SensorListItem id={'04ba322'} resolution={'11bit'}/>
                <SensorListItem id={'0bf4e62'} resolution={'9bit'}/>
            </div>
        )
    }
}

export const SensorsList = connect()(SensorsListView);