import React from "react";
import CardProduct from "../../../../components/Home/CardProduct/CardProduct";
import { backgroundCardProduct } from "../../../../utils/interface/components/ICardProduct";
import { IPropProduct, IStateProduct } from "../../../../utils/interface/components/IProduct";
import IProduct from "../../../../utils/interface/shop/IProduct";
import "./Product.scss";


class Product extends React.Component<IPropProduct, IStateProduct> {
    constructor(props: any) {
        super(props);

        this.state = {
            listCategory: [
                { date: new Date(), description: '', id: '1', name: 'Popular', recordId: '1' },
                { date: new Date(), description: '', id: '2', name: 'All watch', recordId: '1' },
                { date: new Date(), description: '', id: '3', name: 'Sport', recordId: '1' },
                { date: new Date(), description: '', id: '4', name: 'Woman', recordId: '1' },
                { date: new Date(), description: '', id: '5', name: 'Man', recordId: '1' },
                { date: new Date(), description: '', id: '6', name: 'Smart watch', recordId: '1' },
                { date: new Date(), description: '', id: '7', name: 'Brand name', recordId: '1' }
            ],
            listProductByCategoryId: []
        }
    }

    loadProductByCategoryId(mouseEvent: React.MouseEvent<HTMLAnchorElement, Event>) {
        Array.from(document.querySelectorAll(`*[data-category-id]`)).map(a => a.classList.remove("active"));
        (mouseEvent.target as HTMLElement).classList.add("active");
        
        const products: IProduct[] = [
            // @ts-ignore
            { id: '1', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Apple Series 3', price: '$550', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/Apple Series 3.png' } ] },
            // @ts-ignore
            { id: '2', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Blancpain', price: '$550', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/Blancpain.png' } ] },
            // @ts-ignore
            { id: '3', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Audemars Piguet', price: '$550', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/Audemars Piguet.png' } ] },
            // @ts-ignore
            { id: '4', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Frédérique', price: '$550', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/Frédérique.png' } ] },
            // @ts-ignore
            { id: '5', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Audemars Piguet', price: '$550', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/Audemars Piguet.png' } ] },
            // @ts-ignore
            { id: '6', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Frédérique', price: '$550', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/Frédérique.png' } ] },
            // @ts-ignore
            { id: '7', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Apple Series 3', price: '$550', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/Apple Series 3.png' } ] },
            // @ts-ignore
            { id: '8', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Blancpain ', price: '$550', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/Blancpain.png' } ] },
        ];

        this.setState({ listProductByCategoryId: products })
    }

    printProductByCategoryId(categoryId: string) {
        const listProduct = this.state.listProductByCategoryId.filter(a => a.categoryId === categoryId);
        let appendReturn = [];

        for (const item of listProduct) {
            appendReturn.push(<CardProduct background={backgroundCardProduct.white} button={<a href="/">Buy</a>} product={item} key={item.id}/>);
        }

        return appendReturn;
    }

    render(): React.ReactNode {
        return (
            <main className="list-product">
                <div className="container">
                    <div className="info-product">
                        <h1>Our Product</h1>
                        <p>watches have proved themselves from the start in the most extreme conditions imaginable – from the depths of the deepest oceans to the summits of the </p>
                    </div>


                    <ul className="list-category">
                        {
                            this.state.listCategory.map(a => 
                                (
                                    <li key={a.id} data-category-id={a.id} onClick={(e) => this.loadProductByCategoryId(e as any)}>
                                        {a.name}
                                    </li>
                                )
                            )
                        }
                    </ul>

                    <div className="category-element">
                        {
                            this.state.listCategory.map(a => 
                                (
                                    <div key={a.id} className={`product-category-id-${a.id}`}>{this.printProductByCategoryId(a.id)}</div>
                                )
                            )
                        }
                    </div>
                </div>
            </main>
        )
    }
}

export default Product;