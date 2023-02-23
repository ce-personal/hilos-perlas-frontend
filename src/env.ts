import IShopingCart from "./utils/interface/localstorage/IShopingCart";

const env = {
    // API_URL: "https://localhost:44368",
    API_MAPS_KEY: "AIzaSyCbNiuwg2ODvUYr5606E8CUd_YTRDnma1w",
    API_URL: 'https://hilos-perlas.azurewebsites.net',

    company: {
        name: "De hilos y perlas",
        motto: "El límite lo pones tú",
        logo: "/assets/Logo.png"
    },

    localStorage: {
        shoppingCart: Array<IShopingCart>,

        values: {
            shoppingCart: "shoppingCart",
            ubication: "ubication"
        }
    }
}

export default env;