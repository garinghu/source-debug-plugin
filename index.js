
var path = require('path')
var sheller = require('./lib/shell')

function SourceDebugPlugin (options) {
  this.folderName = options[0]
  this.options = options[1]
  this.shell = new sheller(this.folderName)
}

SourceDebugPlugin.prototype.apply = function (compiler) {
  
  this.shell.shellMkdir()
  // for webpack4
  if(compiler.compiler){
    compiler = compiler.compiler
  }

  for(var key in compiler.options.resolve.alias){
      for(var urlKey in this.options){
          if(key == urlKey){
              this.shell.shellClone(this.options[urlKey])
              compiler.options.resolve.alias[key] = path.resolve(__dirname, '../../' + this.folderName + '/' + getGitFolderName(this.options[urlKey]))
          }
      }
  }

}


function getGitFolderName (url) {
    var s = url.split('/')
    return s[s.length - 1].match(/(\S*)(\.git)$/)[1]
}

module.exports = SourceDebugPlugin