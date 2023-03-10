import IShopingCart from "./utils/interface/localstorage/IShopingCart";

const env = {
    API_MAPS_KEY: "AIzaSyCbNiuwg2ODvUYr5606E8CUd_YTRDnma1w",
    // API_URL: "https://localhost:44368",
    API_URL: 'https://de-hilos-y-perlas.azurewebsites.net',
    // API_URL: 'https://734e-143-202-253-244.ngrok.io',

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