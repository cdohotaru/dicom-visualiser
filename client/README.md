## Project setup

# Requirements:
- a Linux machine (this has been tested on Ubuntu 20.04)
- administrative access on the machine to setup Nginx and Orthanc

# Orthanc installation

Follow the steps here: [https://book.orthanc-server.com/faq/debian-daemon.html](https://book.orthanc-server.com/faq/debian-daemon.html)
Test your installation by typing Orthanc in the command line

If you get a SQLite database cannot be created just restart your machine. If the ports are already in use (after restart) and Orthanc errors, just kill those
processes and start Orthanc again from command line. 

Refer to the documentation for other errors: [https://book.orthanc-server.com/index.html](https://book.orthanc-server.com/index.html)

# Nginx setup

Install nginx on your machine: [https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04).

Orthanc doesn't support CORS out of the box so the web client needs to be proxied through Nginx. 
The nginx config can be found in the setup folder. You can simply place it on the conf.d folder assuming you are using the default nginx config

The nginx config is the same as the one used here: [https://book.orthanc-server.com/faq/nginx.html#nginx](https://book.orthanc-server.com/faq/nginx.html#nginx)

### Important note

This is not a professional installation of Orthanc or Nginx and the steps here are for illustration purposes.


