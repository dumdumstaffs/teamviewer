export const promise = (duration: number, fail?: boolean) => new Promise<void>((resolve, reject) => {
    setTimeout(() => fail ? reject() : resolve(), duration)
})