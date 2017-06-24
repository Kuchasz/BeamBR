import * as React from 'preact';
import {css} from 'glamor';

export class Menu extends React.Component<any, any>{
    render(){
        return (<div {...css({display: 'flex', flexDirection: 'column'})}>
            {...this.props.children}
        </div>);
    }
};