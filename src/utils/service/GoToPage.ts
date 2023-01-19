const goToElement = (event: any) => {
    const target = (event.target as any as HTMLButtonElement).dataset.ref;
    const element: HTMLElement = document.getElementById(target);
    
    window.scrollTo({
        top: element.offsetTop,
        left: 0,
        behavior: 'smooth'
    });
};

export {
    goToElement
}