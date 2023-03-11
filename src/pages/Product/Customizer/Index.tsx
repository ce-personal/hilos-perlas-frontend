/* eslint-disable */


import { Button, Paper, Typography } from '@mui/material';

import React from 'react';
import "./Index.scss";

import Header from '../../../components/Header/Header';
import StepByCustomizer from './Components/Steps';
import ImageListForStep from './Components/ImageListForStep';
import { IPiece, IPropCustomizer, IStateCustomizer } from '../../../utils/interface/components/IProduct';
import axios from 'axios';
import env from '../../../env';
import CanvasImages from './Components/CanvasImage';
import { getDownloadURL, getStorage, ref, StringFormat, uploadBytes, uploadString } from 'firebase/storage';
import appFireBase from '../../../utils/register-firebase';


class Customizer extends React.Component<IPropCustomizer, IStateCustomizer> {

    constructor(props: any) {
        super(props);

        this.state = {
            listPart: [],
            listPartSelected: [],
            listPartSelectedBuy: [],

            stepSelected: 0,
            completed: {},

            stringFile: {
                // step0: "https://firebasestorage.googleapis.com/v0/b/nothing-01-01-01.appspot.com/o/images%2FPSX_20230222_180804.png?alt=media&token=f64ff86d-93b6-4fad-8292-b8a79cf0e2eb",
                step0: "",
                step1: "",
                step2: ""
            }
        };

        document.body.style.backgroundColor = "#f5f5f5";
        document.body.style.overflowX = 'hidden';

        this.changeListPartSelected = this.changeListPartSelected.bind(this);
        this.getFileByPartId = this.getFileByPartId.bind(this);
    }

    componentDidMount(): void {
        if (!localStorage.user) return alert("Para usar esta funcionalidad necesitas tener una cuenta creada o iniciar sesión.");
        

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


    async getFileByPartId(partId: string, step: number) {
        const part = await axios.get(`${env.API_URL}/Part/GetPartByPartId`, { params: { partId } });
        const listFile = await axios.get(`${env.API_URL}/Part/GetListFileByPartId`, { params: { partId } });
        let listFileSeleted = [];

        if (listFile.data.length > 1) {
            const promptValue = prompt(part.data.description);
            if (promptValue == "") return alert("Se necesita un valor.");

            for (const letter of promptValue.split("")) {
                const letterModel = listFile.data.find(a => a.name.toLowerCase() == letter.toLowerCase());
                if (letterModel) listFileSeleted.push(letterModel);
            }
        }

        else {
            listFileSeleted.push(listFile.data[0]);
        }


        let listPart: Array<IPiece> = [];

        for (const item of listFileSeleted) {
            switch (step) {
                case 0: 
                    (window as any).addImageStep0InCanvas(item.file.stringFile);
                    break
                
                case 1: {
                    const part = await (window as any).addImageStep1InCanvas(item.file.stringFile);
                    listPart.push(part);
                    break;
                }
                
                case 2: 
                    (window as any).addImageStep2InCanvas(item.file.stringFile);            
                    break;
            }
        }


        let last = listPart[0];
        for (const item of listPart) {
            if (last == item) continue;
            
            item.x = last.x + item.width;
            last = item;
        }

        
        (window as any).reOrderImageByStep(listPart);
        

        for (const item of listFileSeleted) {
            item.step = step;
        }


        if (step == 0) {
            let exist = this.state.listPartSelectedBuy.find(a => a.id == listFileSeleted[0].id);
            if (exist) return;
        } 

        let listPartSelected = this.state.listPartSelectedBuy;
        listPartSelected = [...listPartSelected, ...listFileSeleted];
        


        this.setState({ listPartSelectedBuy: listPartSelected });


        const objComplete = this.state.completed;
        objComplete[step] = true;
        this.setState(objComplete);
    }



    async continueProduct() {
        const isConfirm = window.confirm("Estás seguro que deseas cnotinuar con la solicitud del producto dado. (El resultado final no será exacta, pero si muy parecido)");
        if (!isConfirm) return;


        const step0 = this.state.listPartSelectedBuy.filter(a => a.step == 0);
        const step1 = this.state.listPartSelectedBuy.filter(a => a.step == 1);
        const step2 = this.state.listPartSelectedBuy.filter(a => a.step == 2);

        let totalFactura = 0;
        let factura = "";
        factura = "Resultado de su producto: \n";

        factura += `    Hilo: ${step0[0].part.name} - (C$ ${step0[0].part.price}) \n`;
        totalFactura += step0[0].part.price;
        
        for (const item of step1) {
            factura += `    Perla: ${item.part.name} - (C$ ${item.part.price}) \n`;
            totalFactura += item.part.price;
        }
        
        
        for (const item of step2) {
            factura += `    Decoraciónes: ${item.part.name} - (C$ ${item.part.price}) \n`;
            totalFactura += item.part.price;
        }


        factura += `Total (sin envio): C$ ${totalFactura}.`;
        confirm(factura);



        const storage = getStorage(appFireBase);
        const storageRef = ref(storage, 'images/custom/' + new Date());
        

        // @ts-ignore
        // const canvasImage = document.querySelector(".canvas-customizer").toDataURL();

        // await uploadString(storageRef, canvasImage, StringFormat.BASE64);
        // const responseDownLoad = await getDownloadURL(storageRef);     

        const formData = new FormData();
        formData.append("clientId", JSON.parse(localStorage.user).id);
        formData.append("factura", factura);
        // formData.append("image", responseDownLoad);

        await axios.post(`${env.API_URL}/Part/SendProductCustom`, formData);

    
        alert("Se recomienda enviar la imagen a hilosyperlas5@gmail.com y ahi obtendra mayor detalle");
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
                            step0File={this.state?.stringFile.step0}
                            step1File={this.state?.stringFile.step1}
                            step2File={this.state?.stringFile.step2}
                        />

                    </div>

                    <div className="col-2">
                        <Typography variant='h6' textAlign={'center'} marginTop="8px">Modifica todo a su gusto</Typography>

                        <div className='custom-section'>
                            <ImageListForStep index={this.state.stepSelected} onChangeImage={this.getFileByPartId} listPart={this.state.listPartSelected}/>
                        </div>

                        <StepByCustomizer completed={this.state.completed} changeListPartSelected={this.changeListPartSelected} />
                    </div>
                </main>

                

                <Button onClick={() => this.continueProduct()} variant='outlined' style={{ position: 'absolute', right: 'calc(50% + 12px)', bottom: '12px' }}>Agregar y seguir comprando</Button>
            </React.Fragment>
        );
    }
}

export default Customizer;