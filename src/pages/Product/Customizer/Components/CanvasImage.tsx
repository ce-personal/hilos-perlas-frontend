import React, { Component } from "react";
import { IPropCanvasImage, IStateCanvasImage } from "../../../../utils/interface/components/IProduct";

class CanvasImages extends Component<IPropCanvasImage, IStateCanvasImage> {
    canvas: HTMLCanvasElement;
    ctx;
    images = [];

    constructor(props) {
        super(props);

        this.state = {
            dragIndex: null,

            start: {
                1: {
                    width: 0,
                    height: 0,
                    positionX: 0,
                    positionY: 0
                },
                2: {
                    width: 0,
                    height: 0,
                    positionX: 0,
                    positionY: 0
                },
            },

            step0: {
                x: 0,
                y: 0,

                width: 300,
                height: 0,
                porcentageRadio: 0,
                image: null
            }

        };


        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.clearAllAndPrint = this.clearAllAndPrint.bind(this);
    }

    componentDidMount() {
        this.canvas = document.querySelector(".canvas-customizer")
        
        
        this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.height = this.canvas.parentElement.offsetHeight;

        this.ctx = this.canvas.getContext("2d");
        
        this.addImageStep0InCanvas(this.props.step0File);
        this.addImageStep1InCanvas(this.props.step1File);

        (window as any).addImageStep0InCanvas = this.addImageStep0InCanvas.bind(this);
        (window as any).addImageStep1InCanvas = this.addImageStep1InCanvas.bind(this);
        (window as any).addImageStep2InCanvas = this.addImageStep2InCanvas.bind(this);
    }

    clearAllAndPrint() {
        const startGeneral = this.state.start;
        const imgs = this.images;
        if (imgs.length === 0) return;

        const step0 = this.state.step0;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(step0.image, step0.x, step0.y, step0.width, step0.height);
        if (imgs[1]) this.ctx.drawImage(imgs[1], startGeneral[1].positionX, startGeneral[1].positionY, startGeneral[1].width, startGeneral[1].height);
        if (imgs[2]) this.ctx.drawImage(imgs[2], startGeneral[2].positionX, startGeneral[2].positionY, startGeneral[2].width, startGeneral[2].height);
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
            this.setState({
                step0: {
                    porcentageRadio,
                    width,
                    height, 
                    x,
                    y,
                    image
                }
            });

            this.ctx.drawImage(image, x, y, width, height);
            this.images[0] = image;
        }

    }

    addImageStep1InCanvas(stringFile: string) {
        if (!stringFile) return;
        this.images[1] = null;
        this.clearAllAndPrint();

        let image = new Image();
        image.src = stringFile;
        
        
        image.onload = () => {
            const porcentageRadio = (image.height / image.width) * 100; 

            const width = 80;
            const height = width * (porcentageRadio / 100);

            const x = (this.canvas.width / 2) - (width / 2) - 20;
            const y = (this.canvas.height / 2) - (height / 2);

            this.setState({
                start: {
                    "1": {
                        width,
                        height,
                        positionX: x,
                        positionY: y
                    },
                    "2": this.state.start[2]
                }
            })
            this.ctx.drawImage(image, x, y, width, height);
            
            
            this.images[1] = image;
        }

    }

    addImageStep2InCanvas(stringFile: string) {
        if (!stringFile) return;
        this.images[2] = null;
        this.clearAllAndPrint();

        let image = new Image();
        image.src = stringFile;
        
        
        image.onload = () => {
            const porcentageRadio = (image.height / image.width) * 100; 

            const width = 100;
            const height = width * (porcentageRadio / 100);

            const x = (this.canvas.width / 2) - (width / 2) - 20;
            const y = (this.canvas.height / 2) - (height / 2);

            this.setState({
                start: {
                    "1": this.state.start[1],
                    "2": {
                        height, 
                        width,
                        positionX: x,
                        positionY: y
                    },
                }
            })
            this.ctx.drawImage(image, x, y, width, height);
            
            
            this.images[2] = image;
        }

    }


    handleMouseDown(event) {
        const x = event.clientX - this.canvas.offsetLeft;
        const y = event.clientY - this.canvas.offsetTop;

    
        const isMouseValid = this.isMouseInPiece(x, y, 1);
        if (isMouseValid) this.setState({ dragIndex: 1 });
        
        
        const isMouseValid2 = this.isMouseInPiece(x, y, 2);
        if (isMouseValid2) this.setState({ dragIndex: 2 });

    }

    handleMouseUp() {
        this.setState({ dragIndex: null });
    }

    handleMouseMove(event) {
        if (this.state.dragIndex === null) return; 

        const x = event.clientX - this.canvas.offsetLeft;
        const y = event.clientY - this.canvas.offsetTop;

        const start = this.state.start[this.state.dragIndex];
        const dx = x - start.positionX - (start.width / 2);
        const dy = y - start.positionY - (start.height / 2);



        start.positionX += dx;
        start.positionY += dy;

        this.clearAllAndPrint();
    }


    handleTouchStart() {}
    handleTouchEnd() {}
    handleTouchMove() {}



    isMouseInPiece(x: number, y: number, index: number) {
        if (x >= this.state.start[index].positionX &&
            x <= this.state.start[index].positionX + this.state.start[index].width &&
            y >= this.state.start[index].positionY &&
            y <= this.state.start[index].positionY + this.state.start[index].height
        ) 
        {
            return true;
        }
    }

    render() {
        return (
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
        );
    }
}


export default CanvasImages;