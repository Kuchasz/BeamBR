import * as React from 'preact';
import {css} from 'glamor';

export const MenuItem = ({text, isActive, onClick}: { text: string, isActive: boolean, onClick: () => void }) => (
    <div onClick={onClick} {...css({fontWeight: isActive ? 500 : 100, transition: 'all 0.25s', color: 'white', fontFamily: 'Segoe UI', background: isActive ? '#214955' : null, ':hover': {background: '#226773'}, cursor: 'pointer', padding: isActive ? '12px 24px' : '12px'})}>
        <span>{text}</span>
    </div>);