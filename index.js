var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');

var processAllFieldsOfTheForm = function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        var text = fieldsToHtmlIfKeys(fields);
        res.write(text);
        res.end(`<pre>${util.inspect({
            fields: fields,
            files: files
        })}</pre>`);
    });
};

var fieldsToHtmlIfKeys = function (fields) {
    if (!fields) return;

    var text = '';
    var borderStyle = '';

    if (fields.color) {
        text += `<div style="color:${fields.color};">`;
        borderStyle = `border: 5px ${fields['border-style'] || 'inset'} ${fields.color};`;
    }
    if (fields.name) {
        var tag = fields.tag || 'h1';
        text += `<${tag}>${fields.name}</${tag}>`;
    }
    if (fields.color) {
        text += '</div>';
    }

    if (fields.image) {
        text += `<br /><div><img src=${fields.image} style="width:33%; ${borderStyle}"/></div><br /><br /><br />`;
    }

    return text;
}

var server = http.createServer(processAllFieldsOfTheForm);

var port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server listening on ${port}`);