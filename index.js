// Load the http module to create an http server.
var http = require('http');
var qs = require('querystring');
var cp = require('child_process');
var fs = require('fs');

var emailRecipients = "example@example.com";
var emailSubject = "Pushed!";

// Make an HTTP server to receive Github Service Hooks
var server = http.createServer(function (request, response) {
    if(request.method == "POST"){
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var vals = qs.parse(body);
            var post = JSON.parse(vals.payload);
            githubDeploy(post);
 
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.end("Thanks!\n");
        });
    }
});

// Listen on port 9998, local connections from Nginx only
server.listen(9998);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:9998/");

function githubDeploy(post){
    console.log("Pushed to "+post.ref);
    if(post.ref != "refs/heads/master"){
        return;
    }

    // update the site
    console.log("Updating")
    var script = cp.spawn("./update.sh")
    var output = "";
    script.stdout.on('data', function(data){
        console.log(data.toString().trim())
        output += data.toString();
    })
    script.stderr.on('data', function(data){
        console.log(data.toString().trim())
        output += data.toString();
    })
    script.on('exit', function(code){
        output += "Exited with code "+code;

        // send an email
        var msg = "Latest commit: "+post.after+
            "\n\n"+post.compare+
            "\n\n"+output;
        sendEmail(emailRecipients, emailSubject, output);
    })
}

function sendEmail(to, subject, body) {
    console.log("Sending mail to "+to);
    fs.writeFile("/tmp/msg", body, function(err){
        if(err) {
            console.log(err);
        } else {
            cp.exec('mail -s "'+subject+'" '+to+' < /tmp/msg', function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log("Done!");
                }
            })
        }
    })
}
