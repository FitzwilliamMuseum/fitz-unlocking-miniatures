
export const isExternalUrl = (url: string): boolean => {
    var pattern = /^((http|https|ftp):\/\/)/;
    return pattern.test(url)
};

const urlSafeRegex = /[^a-zA-Z0-9_. ]/g;

export function urlSafeString(subject: string): string {
    return subject.replace(urlSafeRegex, '-');
}