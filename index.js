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
        res.end(util.inspect({
            fields: fields,
            files: files
        }));
    });
};

var fieldsToHtmlIfKeys = function (fields) {
    if (!fields) return;

    var text = '';
    var borderStyle = '';

    if (fields.color) {
        text += `<div style="color:${fields.color};">`;
        borderStyle = `border: 5px dotted ${fields.color};`;
    }
    if (fields.name) {
        text += `<div>${fields.name}</div>`;
    }
    if (fields.color) {
        text += '</div>';
    }

    if (fields.image) {
        text += `<br /><div style="width:33%; ${borderStyle}"><img src=${fields.image} /></div><br /><br /><br />`;
    }

    return text;
}

var server = http.createServer(processAllFieldsOfTheForm);

var port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server listening on ${port}`);