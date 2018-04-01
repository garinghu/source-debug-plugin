var path = require('path')
var sheller = require('./lib/shell')

function SourceDebugPlugin (options) {
  this.folderName = arguments[0]
  this.options = arguments[1]
  this.shell = new sheller(this.folderName)
}

SourceDebugPlugin.prototype.apply = function (compiler) {
  
  this.shell.shellMkdir()
  // for webpack4
  if(compiler.compiler){
    compiler = compiler.compiler
  }

  for(var key in compiler.options.resolve.alias){
      for(var index in this.options){
            if(this.options[index][key]){
                let originalUrl = compiler.options.resolve.alias[key]
                let nowUrl = path.resolve(__dirname, '../../' + this.folderName + '/' + getGitFolderName(this.options[index][key]))
                this.shell.shellClone(this.options[index][key])
                compiler.options.resolve.alias[key] = nowUrl
                if(this.options[index].transform){
                    let transform = this.options[index].transform
                    for(var index in transform){
                        this.shell.shellMv(nowUrl, transform[index].from, transform[index].to)
                    }
                }
            }
        }
    }
}


function getGitFolderName (url) {
    var s = url.split('/')
    return s[s.length - 1].match(/(\S*)(\.git)$/)[1]
}

module.exports = SourceDebugPlugin
