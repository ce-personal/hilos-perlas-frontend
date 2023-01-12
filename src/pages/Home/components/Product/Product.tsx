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
                { date: new Date(), description: '', id: '2', name: 'Todos', recordId: '1' },
                { date: new Date(), description: '', id: '3', name: 'Deporte', recordId: '1' },
                { date: new Date(), description: '', id: '4', name: 'Mujer', recordId: '1' },
                { date: new Date(), description: '', id: '5', name: 'Hombre', recordId: '1' },
            ],
            listProductByCategoryId: []
        }
    }

    loadProductByCategoryId(mouseEvent: React.MouseEvent<HTMLAnchorElement, Event>) {
        Array.from(document.querySelectorAll(`*[data-category-id]`)).map(a => a.classList.remove("active"));
        (mouseEvent.target as HTMLElement).classList.add("active");
        
        const products: IProduct[] = [
            // @ts-ignore
            { id: '1', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Pulsera bonita', price: 'C$ 100', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/image-1.png' } ] },
            // @ts-ignore
            { id: '2', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Combo cadena', price: 'C$ 80', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/image-2.png' } ] },
            // @ts-ignore
            { id: '3', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Chapas plateadas', price: 'C$ 120', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/image-3.png' } ] },
            // @ts-ignore
            { id: '4', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Pulsera corazón', price: 'C$ 130', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/image-4.png' } ] },
            // @ts-ignore
            { id: '5', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Pulseras amistad', price: 'C$ 180', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/image-5.png' } ] },
            // @ts-ignore
            { id: '6', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Pulsera de perla', price: 'C$ 90', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/image-6.png' } ] },
            // @ts-ignore
            { id: '7', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Set amistad', price: 'C$ 120', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/image-7.png' } ] },
            // @ts-ignore
            { id: '8', categoryId: '1', customProductId: '1', date: new Date(), description: '', name: 'Pulsera estrella ', price: 'C$ 90', quantity: 1, recordId: '1', listFile: [ { stringFile: '/assets/product/image-8.png' } ] },
        ];

        this.setState({ listProductByCategoryId: products })
    }

    printProductByCategoryId(categoryId: string) {
        const listProduct = this.state.listProductByCategoryId.filter(a => a.categoryId === categoryId);
        let appendReturn = [];

        for (const item of listProduct) {
            appendReturn.push(<CardProduct background={backgroundCardProduct.white} button={<a href="/">Ordena</a>} product={item} key={item.id}/>);
        }

        return appendReturn;
    }

    render(): React.ReactNode {
        return (
            <main className="list-product">
                <div className="container">
                    <div className="info-product">
                        <h1>Nuestros podructos</h1>
                        <p>Cada uno de nuestros productos creados con la mejor calidad posible y una gran emoción de apego con el producto dando un gran resultado. </p>
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