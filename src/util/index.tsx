
export const isExternalUrl = (url:string) : boolean => {
    var pattern = /^((http|https|ftp):\/\/)/;
    return pattern.test(url)
};