/* eslint-disable */


import { Button, Icon, IconButton } from "@mui/material";
import React, { Component } from "react";
import { IPiece, IPropCanvasImage, IStateCanvasImage } from "../../../../utils/interface/components/IProduct";

class CanvasImages extends Component<IPropCanvasImage, IStateCanvasImage> {
    canvas: HTMLCanvasElement;
    ctx;


    constructor(props) {
        super(props);

        this.state = {
            dragIndex: null,
            listPart: []
        };


        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.clearAllAndPrint = this.clearAllAndPrint.bind(this);
        // this.findNewPosition = this.findNewPosition.bind(this);
        this.reOrderImageByStep = this.reOrderImageByStep.bind(this);
    }

    componentDidMount() {
        this.canvas = document.querySelector(".canvas-customizer")
        
        
        this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.height = this.canvas.parentElement.offsetHeight;

        this.ctx = this.canvas.getContext("2d");

        (window as any).addImageStep0InCanvas = this.addImageStep0InCanvas.bind(this);
        (window as any).addImageStep1InCanvas = this.addImageStep1InCanvas.bind(this);
        (window as any).addImageStep2InCanvas = this.addImageStep2InCanvas.bind(this);
        (window as any).reOrderImageByStep = this.reOrderImageByStep.bind(this);
    }

    clearAllAndPrint() {
        if (this.state.listPart.length == 0) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const item of this.state.listPart) {
            this.ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
        }
    }


    addImageStep0InCanvas(stringFile: string) {
        if (!stringFile) return;
        this.clearAllAndPrint();

        var image = new Image();
        image.src = stringFile;
    
    
        image.onload = () => {
            const porcentageRadio = (image.height / image.width) * 100; 

            const width = 300;
            const height = width * (porcentageRadio / 100);

            const x = (this.canvas.width / 2) - (width / 2) - 20;
            const y = (this.canvas.height / 2) - (height / 2);



            const step = {
                porcentageRadio,
                width,
                height, 
                x,
                y,
                image,
                step: 0,
                index: 0
            }

            const obj = this.state.listPart.filter(a => a.step != 0);
            obj.push(step);


            this.setState({ listPart: obj });
            this.ctx.drawImage(image, x, y, width, height);
        }

    }

    addImageStep1InCanvas(stringFile: string) {
        if (!stringFile) return;
        this.clearAllAndPrint();

        let image = new Image();
        image.src = stringFile;
        
        
        return new Promise((resolve) => {
            image.onload = () => {
                const porcentageRadio = (image.height / image.width) * 100; 

                const width = 25;
                const height = width * (porcentageRadio / 100);

                let x = (this.canvas.width / 2) - (width / 2) - 20;
                let y = (this.canvas.height / 2) - (height / 2);


                
                const listPartSort = this.state.listPart.sort((a, b) => a.index - b.index);


                let step = {
                    porcentageRadio,
                    width,
                    height, 
                    x,
                    y,
                    image,
                    step: 1,
                    index: (listPartSort[listPartSort.length - 1]?.index + 1) || 1
                }
            
                const obj = this.state.listPart;
                obj.push(step);
                this.setState({ listPart: obj });

                this.ctx.drawImage(image, x, y, width, height);      

                resolve(step);
            }
    });

    }

    addImageStep2InCanvas(stringFile: string) {
        if (!stringFile) return;
        this.clearAllAndPrint();

        let image = new Image();
        image.src = stringFile;
        
        
        image.onload = () => {
            const porcentageRadio = (image.height / image.width) * 100; 

            const width = 100;
            const height = width * (porcentageRadio / 100);

            const x = (this.canvas.width / 2) - (width / 2) - 20;
            const y = (this.canvas.height / 2) - (height / 2);

            
            const step = {
                porcentageRadio,
                width,
                height, 
                x,
                y,
                image,
                step: 2,
                index: 0
            }

            const obj = this.state.listPart.filter(a => a.step != 2);
            obj.push(step);

            this.setState({ listPart: obj });

            this.ctx.drawImage(image, x, y, width, height);            
        }
    }





    reOrderImageByStep(listPart: Array<IPiece>) {
        if (listPart.length == 0) return;


        let listPartByAnyStep = this.state.listPart.filter(a => a.step != listPart[0].step);
        
        let mismoPaso = this.state.listPart.filter(a => a.step == listPart[0].step && listPart.find(e => e.index != a.index));
        mismoPaso = [...listPart, ...mismoPaso];
        mismoPaso = mismoPaso.sort((a, b) => a.index - b.index);

        listPartByAnyStep = [...listPartByAnyStep, ...mismoPaso];

        this.setState({ listPart: listPartByAnyStep });
        this.clearAllAndPrint();
    }





    handleMouseDown(event) {
        const x = event.clientX - this.canvas.offsetLeft;
        const y = event.clientY - this.canvas.offsetTop;

    
        const piece = this.getPieceTouch(x, y);
        this.setState({ dragIndex: piece });
    }

    handleMouseUp() {
        this.setState({ dragIndex: null });
    }

    handleMouseMove(event) {
        if (this.state.dragIndex == null) return; 

        const x = event.clientX - this.canvas.offsetLeft;
        const y = event.clientY - this.canvas.offsetTop;

        const start = this.state.dragIndex;
        const dx = x - start.x - (start.width / 2);
        const dy = y - start.y - (start.height / 2);



        start.x += dx;
        start.y += dy;

        this.clearAllAndPrint();
    }


    handleTouchStart() {}
    handleTouchEnd() {}
    handleTouchMove() {}



    getPieceTouch(x: number, y: number) {
        for (const item of this.state.listPart) {
            if (x >= item.x &&
                x <= item.x + item.width &&
                y >= item.y &&
                y <= item.y + item.height
            ) 
            {
                if (item.step == 0) continue;

                return item;
            }
        }
    }




    render() {
        return (
            
            <React.Fragment>
                <canvas
                    className="canvas-customizer"
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    onMouseMove={this.handleMouseMove}
                    onTouchStart={this.handleTouchStart}
                    onTouchEnd={this.handleTouchEnd}
                    onTouchMove={this.handleTouchMove}
                    width={300}
                    height={170}
                />

            </React.Fragment>


        );
    }
}


export default CanvasImages;