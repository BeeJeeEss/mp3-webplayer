exports.setType = (file) => {
    let findDot = false
    let extension = ""
    let type = ''
    let arr = []
    arr = file.split("")
    let dotsCounter = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '.') {
            dotsCounter++
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == ".") {
            if (dotsCounter == 1) {
                findDot = true
            } else {
                dotsCounter--
            }
        }
        if ((findDot) && arr[i] != ".") {
            extension += arr[i]
        }
    }
    if (extension == 'jpg') {
        type = 'image/jpg'
    } else if (extension === 'png') {
        type = 'image/png'
    } else if (extension === 'css') {
        type = 'text/css'
    } else if (extension === 'js') {
        type = 'application/javascript'
    } else if (extension === 'mp3') {
        type = 'audio/mpeg'
    }
    return type
}

