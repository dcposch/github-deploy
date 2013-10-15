Github Update
=======

Simple deploy hook for Github. 

Whenever you push to Github, you can configure it to POST to your server for you.
This tiny Node.js program listens for such posts, runs a shell script, then emails you the output.

You can use it for automatic deployment, testing, and so on.

It runs only when you push to master by default, but you can change that. 
For example, I've used it for projects where every push to the "production" branch results in an auto deploy.

#### Quick start

* Clone this repo. <br/>
  (Or preferably, fork+clone, so you can track your own deploy script more easily.)
* Copy the nginx configuration file to `/etc/nginx/sites-enabled`. <br/>
  **Edit it to fill in your actual host name. Restart nginx.**
* **Edit `index.js`, fill in your own details.**
* Run the deploy hook: `node index.js`
* Go to your Github repo, Settings, Service Hooks, then Webhook URLS.<br/> 
  Enter `http://<your host name>/github-deploy`, then click Test.
* Does it work? Node should print something. 

##### Congratulations, you have a deploy hook

* **Edit `update.sh` to actually do something**<br/> 
  Automatic deployment, continuous integration, whatever floats your boat.<br/> 
  Just run `./update.sh` to test it out.
* Make a commit! Push it to Github. <br/>
  Does your script still work? You should get an email with the output.
* Run Node for real this time, maybe with `nohup` or `screen`. 

