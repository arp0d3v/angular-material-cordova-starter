export function translateError(key: string, inputTitle?: string): string {
    let errorMessage = '';
    if (key == 'required') {
        errorMessage = `${inputTitle} is required.`;
    } else if (key == 'mobilenumber') {
        errorMessage = `${inputTitle} must be 11 numbers length.`;
    }
    return errorMessage;
}
