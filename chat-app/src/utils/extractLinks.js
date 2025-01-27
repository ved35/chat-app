export function extractLinks(inputString) {
   
    const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*\b/g;
    const linkArray = [];
    
    // Replace URLs with a span containing a clickable anchor link
    const modifyString = inputString.replace(urlRegex, (url) => {
        const urlObject = new URL(url);  
        const domain = urlObject.hostname; 
        linkArray.push(url); 
        return `<span class="text-primary underline"><a href="${url}" target="_blank">${domain}</a></span>`;
    });

    return {
        originalString: modifyString,
        links: linkArray,
    };
}
