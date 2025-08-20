const datauri = require("datauri");
const path = require("path");

exports.getDataUri = (file)=>{
    const parser = new dataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName,file.buffer);
}