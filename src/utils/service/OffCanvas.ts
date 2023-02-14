const toggleOffCanvas = (id: string) => {
    const off = document.getElementById(id);
    
    off.parentElement.classList.toggle("open");
    document.body.classList.toggle("off");
    

    if (!document.body.classList.contains("off")) {
        document.body.style.backgroundColor = "transparent";
    }
};

const openOffCanvas = (id: string) => {
    const off = document.getElementById(id);
    
    off.parentElement.classList.add("open");
    document.body.classList.add("off");
}

export {
    toggleOffCanvas,
    openOffCanvas
}