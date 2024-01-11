export default (inputText) => {
    // Remove the file extension
    const fileNameWithoutExtension = inputText.replace(/\.[^/.]+$/, '');

    // Split the input string into words
    const words = fileNameWithoutExtension.split('_');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the words back together with spaces
    const result = capitalizedWords.join(' ');

    return result;
}