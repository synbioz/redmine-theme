## Install dependencies :

~~~bash
npm install -g babel-cli
gem install watch
~~~

## **Watch** and **build** the sources :

~~~bash
npm start
~~~

## Only Build the sources :

~~~bash
npm build_css
npm build_js
npm build
~~~

## Preview

![Aperçu](https://www.synbioz.com/images/articles/20170511/localhost-3000-projects-synbioz(Laptop%20with%20MDPI%20screen).png)

# TODO

- Make the building task dynamic with all Redspot dependencies.

# To update Redspot (not the best solution)

Copy and paste each file of redspot_vuejs/dist
- manifest.js
- vendor.js 
- app.js 

in a DomReady event listener in src/_redspot.js