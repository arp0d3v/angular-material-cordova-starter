export function replaceAll(source: string, search: string, replacement: string): string {
    if (source) {
        return source.replace(new RegExp(search, 'g'), replacement);
    }
    return null;
}
export function standardizeNumbers(source: string): string {
    const obj = {
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
        '۰': '0',
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
        '٠': '0',
    };
    Object.keys(obj).forEach(function (key) {
        source = replaceAll(source, key, obj[key]);
    });
    return source;
}
