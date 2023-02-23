import { Button, Paper, Typography } from '@mui/material';

import React from 'react';
import "./Index.scss";

import Header from '../../../components/Header/Header';
import StepByCustomizer from './Components/Steps';
import ImageListForStep from './Components/ImageListForStep';
import { IPropCustomizer, IStateCustomizer } from '../../../utils/interface/components/IProduct';
import axios from 'axios';
import env from '../../../env';
import CanvasImages from './Components/CanvasImage';



// class CanvasManage extends React.Component<any, any> {
//     canvas: HTMLCanvasElement;
//     ctx: CanvasRenderingContext2D;
//     constructor(props) {
//         super(props);


//     }

//     componentDidMount(): void {
//         this.canvas = document.querySelector("#canvas-manage");
//         this.ctx = this.canvas.getContext("2d");


//         this.canvas.width = this.canvas.parentElement.offsetWidth;
//         this.canvas.height = this.canvas.parentElement.offsetHeight;

//         this.addImageStep0InCanvas("https://firebasestorage.googleapis.com/v0/b/nothing-01-01-01.appspot.com/o/images%2FPSX_20230222_180804.png?alt=media&token=b7e54c02-801b-4da1-bf0e-d6b98b874f29?w=248&fit=crop&auto=format");
//         this.addImageStep1InCanvas("https://firebasestorage.googleapis.com/v0/b/nothing-01-01-01.appspot.com/o/images%2F1677111572736.png?alt=media&token=5c570934-91af-48dd-b7bc-65561bfa271f");
//     }

//     addImageStep0InCanvas(stringFile: string) {
//         var image = new Image();
//         image.src = stringFile;
        
        
//         image.onload = () => {
//             const porcentageRadio = (image.height / image.width) * 100; 

//             const width = 300;
//             const height = width * (porcentageRadio / 100);

//             const x = (this.canvas.width / 2) - (width / 2) - 20;
//             const y = (this.canvas.height / 2) - (height / 2);

//             this.ctx.drawImage(image, x, y, width, height);
//         }
//     }

//     addImageStep1InCanvas(stringFile: string) {
//         var image = new Image();
//         image.src = stringFile;
        
        
//         image.onload = () => {
//             const porcentageRadio = (image.height / image.width) * 100; 

//             const width = 80;
//             const height = width * (porcentageRadio / 100);

//             const x = (this.canvas.width / 2) - (width / 2) - 20;
//             const y = (this.canvas.height / 2) - (height / 2);

//             this.ctx.drawImage(image, x, y, width, height);
//         }

//         image.onclick = (a) => console.log(a);
//     }

//     render(): React.ReactNode {
//         return (
//             <canvas id="canvas-manage" style={{ display: 'flex', margin: 'auto', borderRadius: '5px' }}></canvas>
//         )
//     }
// }




class Customizer extends React.Component<IPropCustomizer, IStateCustomizer> {

    constructor(props: any) {
        super(props);

        this.state = {
            listPart: [],
            listPartSelected: [],
            stepSelected: 0,
            completed: {},

            stringFile: {
                step0: "",
                step1: "",
                step2: ""
            }
        };

        document.body.style.backgroundColor = "#f5f5f5";
        this.changeListPartSelected = this.changeListPartSelected.bind(this);
        this.changeStep0 = this.changeStep0.bind(this);
        this.changeStep1 = this.changeStep1.bind(this);
        this.changeStep2 = this.changeStep2.bind(this);
    }

    componentDidMount(): void {
        this.loadListPart();
    }


    async getListPartByStepPart(stepPart: string) {
        const response = await axios.get(`${env.API_URL}/Part/GetListPartByStep?stepPart=${stepPart}`);
        return response;
    }

    async loadListPart() {
        const step0 = await this.getListPartByStepPart('0');
        const step1 = await this.getListPartByStepPart('1');
        const step2 = await this.getListPartByStepPart('2');

        this.setState({ listPart: [ step0.data, step1.data, step2.data ], listPartSelected: step0.data });
    }

    changeListPartSelected(index: number) {
        this.setState({ listPartSelected: this.state.listPart[index], stepSelected: index });
    }

    changeStep0(stringFile) {
        const step = this.state.stringFile;
        step.step0 = stringFile;

        this.setState({ stringFile: step });
        (window as any).addImageStep0InCanvas(stringFile);
        
        const objComplete = this.state.completed;
        objComplete[0] = true;
        this.setState(objComplete);
    }

    changeStep1(stringFile) {
        const step = this.state.stringFile;
        step.step1 = stringFile;

        this.setState({ stringFile: step });
        (window as any).addImageStep1InCanvas(stringFile);

        const objComplete = this.state.completed;
        objComplete[1] = true;
        this.setState(objComplete);
    }

    changeStep2(stringFile) {
        const step = this.state.stringFile;
        step.step2 = stringFile;

        this.setState({ stringFile: step });
        const objComplete = this.state.completed;
        objComplete[2] = true;
        this.setState(objComplete);

        (window as any).addImageStep2InCanvas(stringFile);
    }




    async continueProduct() {
        if (!localStorage.user) return alert("Necesitas una cuenta.");

        const isConfirm = window.confirm("Estás seguro que deseas cnotinuar con la solicitud del producto dado. (El resultado final no será exacta, pero si muy parecido)");
        if (!isConfirm) return;


        const step0 = this.state.listPart[0].find(a => a.fileSecondary.stringFile === this.state.stringFile.step0);
        const step1 = this.state.listPart[1].find(a => a.fileSecondary.stringFile === this.state.stringFile.step1);
        const step2 = this.state.listPart[2].find(a => a.fileSecondary.stringFile === this.state.stringFile.step2);

        

        const result = window.confirm(
            `Resultado de su producto: \n
                ${step0 != null ? `Hilo seleccionado: ${step0.name} - Precio: C$ ${step0.price} \n` : ""}
                ${step1 != null ? `Perla seleccionada: ${step1.name} - Precio: C$ ${step1.price} \n` : ""}
                ${step2 != null ? `Decoración seleccionada: ${step2.name} - Precio: C$ ${step2.price} \n` : ""}
                Total a pagar (sin envio): C$ ${ step0.price + (step1?.price || 0) + (step2?.price || 0) }
            `
        );

        if (!result) return;

        const formData = new FormData();
        const clientId = JSON.parse(localStorage.user).id
        formData.append("part0", step0.id);
        formData.append("part1", step1?.id);
        formData.append("part2", step2?.id);
        formData.append("clientId", clientId);


        await axios.post(`${env.API_URL}/Part/PostSaveProductCustomByPart`, formData);

        alert("Gracias por realizar su pedido. Nos comunicaremos con usted para terminar de planter todo")
    }


    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Paper elevation={3}>
                    <Header />
                </Paper>



                <main className='group-col'>
                    <div className="col-1" style={{ display: 'flex' }}>
                        <CanvasImages 
                            step0File={this.state.stringFile.step0}
                            step1File={this.state.stringFile.step1}
                            step2File={this.state.stringFile.step2}
                        />

                    </div>

                    <div className="col-2">
                        <Typography variant='h6' textAlign={'center'} marginTop="8px">Modifica todo a su gusto</Typography>

                        <div className='custom-section'>
                            <ImageListForStep index={this.state.stepSelected} onChangeImage={[this.changeStep0, this.changeStep1, this.changeStep2]} listPart={this.state.listPartSelected}/>
                        </div>

                        <StepByCustomizer completed={this.state.completed} changeListPartSelected={this.changeListPartSelected} />
                    </div>
                </main>

                <Button onClick={() => this.continueProduct()} variant='outlined' style={{ position: 'absolute', right: 'calc(50% + 12px)', bottom: '12px' }}>Pedir pieza</Button>
            </React.Fragment>
        );
    }
}

export default Customizer;