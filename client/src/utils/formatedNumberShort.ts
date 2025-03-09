export function formatedNumber(int:number) {
    const lenght = int.toString().length;

    if(lenght >= 10 && lenght > 7) {
        return `${formatedThouthon((+int.toString().slice(0, -8) / 10)).toString().slice(0, 4)} B`
    }
    if(lenght <= 9 && lenght > 6) {
        return `${(formatedThouthon(+int.toString().slice(0, -5) / 10)).toString()} M`
    }
    if(lenght <= 6 && lenght > 3) {
        return `${formatedThouthon(+int.toString().slice(0, -2) / 10).toString()}K`
    }

    return int;
}

function formatedThouthon(int:number) {
    return int.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}