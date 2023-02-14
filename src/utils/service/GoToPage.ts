const goToElement = (event: any) => {
    const target = ((event.currentTarget || event.target) as any as HTMLButtonElement).dataset.ref;
    
    
    let element: HTMLElement = document.getElementById(target);
    if (element == null) {
        setTimeout(() => {
            element = document.getElementById(target);
            redirectToSection(element);
        }, 100);
    }

    else {
        redirectToSection(element);
    }
};

const redirectToSection = (element: HTMLElement) => {
    window.scrollTo({
        top: element.offsetTop,
        left: 0,
        behavior: 'smooth'
    }); 
};

export {
    goToElement
}