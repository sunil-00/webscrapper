export const afterDelay = (func: Function, delay: number) => {
    let timerId: ReturnType<typeof setTimeout> | undefined;
    
    return function(...args: any[]){
        clearTimeout(timerId);
        timerId = setTimeout(
            () => func(...args),
            delay
        );
    }
}