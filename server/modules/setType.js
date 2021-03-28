exports.setType = (file) => {
    let extension = ''
    let type = ''
    extension = file.split('.').pop();
    switch (extension) {
        case 'jpg':
            type = 'image/jpg'
            break;
        case 'png':
            type = 'image/png'
            break;
        case 'css':
            type = 'text/css'
            break;
        case 'js':
            type = 'application/javascript'
            break;
        case 'mp3':
            type = 'audio/mpeg'
            break;
        case 'svg':
            type = 'image/svg+xml'
            break;
        default:
            console.log('Error: unknown extension in file ' + file)
            break;
    }
    return type
}