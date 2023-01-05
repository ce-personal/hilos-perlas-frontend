import React from "react";
import { IPropCardProduct } from "../../../utils/interface/components/ICardProduct";
import { calculateScore } from "../../../utils/service/ScoreService";

import "./CardProduct.scss";

class CardProduct extends React.Component<IPropCardProduct> {
    render(): React.ReactNode {
        return (
            <main className="card-product" data-background-color={this.props.background}>
                <div className="list-files">
                    {
                        this.props.product.listFile?.map(a => (
                            <img key={a.id} src={a.stringFile} alt={a.id + " No cargo correctamente"} />
                        ))
                    }
                </div>

                <div className="description">
                    <h3 className="card-title">{this.props.product.name}</h3>
                    <p className="price">{this.props.product.price}</p>
                </div>

                <div className="score-and-shopping">
                    <div className="score">
                        {
                            [1, 2, 3, 4, 5].map(a => (
                                calculateScore(this.props.product.listScore) < a ? <img key={a} src={`assets/gen/start-disabled-${this.props.background}.svg`} alt="" /> : <img key={a} src="/assets/gen/start-active.svg" alt="" />
                            ))
                        }
                    </div>
                    <div className="shoping">
                        {this.props.button}
                    </div>
                </div>
            </main>
        )
    }
}


export default CardProduct;