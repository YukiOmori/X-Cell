console.error("SyntaxError: {\n  \"name\": \"x-cell\",\n  \"version\": \"1.0.0\",\n  \"description\": \"world's the most tiny spread sheet\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    “start”: “node index.js” \n    \"build\": \"mkdir -p public/js; browserify client/js/app.js > public/js/bundle.js\",\n    \"watch\": \"watchify client/js/app.js -o public/js/bundle.js\",\n    \"test\": \"jest\"\n    “postinstall”:“”mkdir -p public/js; browserify client/js/app.js > public/js/bundle.js”\n  },\n  \"author\": \"Yuki\",\n  \"license\": \"MIT\",\n  \"dependencies\": {\n    \"express\": \"^4.15.2\",\n    \"browserify\": \"^14.3.0\"\n  },\n  \"devDependencies\": {\n    \"browserify\": \"^14.3.0\",\n    \"jest\": \"^19.0.2\",\n    \"watchify\": \"^3.9.0\"\n  }\n}\n : Unexpected token “ in JSON at position 140");