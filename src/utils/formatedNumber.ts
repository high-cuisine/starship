export function formatedNumber(int:number) {
    const lenght = int.toString().length - 1;

    if(lenght > 8) {
        return `${(int / 1000000000).toString().slice(0, 4)} billion`
    }
    if(int > 6) {
        return `${(int / 100000000).toString().slice(0, 4)} mln`
    }
}