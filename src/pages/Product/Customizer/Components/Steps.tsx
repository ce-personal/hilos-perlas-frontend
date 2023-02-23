import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { IPropStepCustomizer, IStateStepCustomizer } from '../../../../utils/interface/components/IProduct';

const steps = ['Selecciona un hilo', 'Seleccione las perlas', 'Selecciona la decoración'];

class StepByCustomizer extends React.Component<IPropStepCustomizer, IStateStepCustomizer> {
    constructor(props: IPropStepCustomizer) {
        super(props);

        this.state = {
            activeStep: 0,
        }

    }

    handleStep(index: number) {
        this.setState({ activeStep: index });
        this.props.changeListPartSelected(index);
        return null;
    }

    render(): React.ReactNode {
        return (
            <main className='step-section'>
                <Box sx={{ width: '100%' }} >
                    <Stepper nonLinear activeStep={this.state.activeStep}>
                        {
                            steps.map((label, index) => (
                                <Step key={label} completed={this.props.completed[index]}>
                                    <StepButton color="inherit" onClick={() => this.handleStep(index)}>
                                        {label}
                                    </StepButton>
                                </Step>
                            ))
                        }
                    </Stepper>
                </Box>
            </main>
        )
    }
}

export default StepByCustomizer;