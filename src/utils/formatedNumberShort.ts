export function formatedNumber(int:number) {
    const lenght = int.toString().length - 1;

    if(lenght > 8) {
        return `${formatedThouthon((int / 100000)).toString().slice(0, 4)} B`
    }
    if(int > 6) {
        return `${(formatedThouthon(int / 1000)).toString()} M`
    }

    return int;
}

function formatedThouthon(int:number) {
    return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}