require('shelljs/global');
var path = require('path')

function Sheller (options) {
    this.folderName = options
}

Sheller.prototype.shellMkdir = function () {
    if (!which('git')) {
        echo('Sorry, this script requires git');
        exit(1);
    }
    cd(path.resolve(__dirname, '../../../'))
    mkdir(this.folderName)
}


Sheller.prototype.shellClone =  function (url) {
    
    cd(path.resolve(__dirname, '../../../'))
    cd(this.folderName)
    exec(`git clone ${url}`)
    
}



module.exports = Sheller