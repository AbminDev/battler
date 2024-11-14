import React from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

const RiveAnimation = ({ stateMachineName, triggerName }) => {
    const { RiveComponent, rive } = useRive({
        src: '../../assets/Skeleton.riv',
        stateMachines: stateMachineName ? [stateMachineName] : [],
        autoplay: true,
    });

    const triggerInput = useStateMachineInput(
        rive,
        stateMachineName,
        triggerName
    );

    console.log('TRIGGER INPUT->', triggerInput);
    const triggerAnimation = () => {
        if (triggerInput) {
            triggerInput.fire();
        }
    };

    return (
        <div onMouseEnter={triggerAnimation}>
            <RiveComponent style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default RiveAnimation;
