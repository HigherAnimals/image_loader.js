image_loader.js
=======

An image loading class.

Usage
-----

    new ImageLoader(
      // An array of image paths.
      ['/my_media/first.png', '/my_media/second.gif', '/my_media/etc.jpg'],
      // A callback to execute when all images have loaded.
      function (images) {
        for (var i = 0; i < images.length; i++) {
          document.body.appendChild(images[i]);
        }
      },
      // A callback to execute when each image loads.
      function (image, index, numCompleted, numTotal) {
        console.log('Which image loaded?', img.src);
        console.log('What was its index?', index);
        console.log('How many have loaded so far?', numCompleted);
        console.log('How many were requested originally?', numTotal);
      },
      // A callback to execute during an on load error.
      function (e) {
        console.log('Uh oh!');
      }
    );

And just omit any unwanted callbacks with ```null```.

The ImageLoader instance also reports the precent done with
```image_loader.getPercent()```.  This can be useful in the callback for each individual image, e.g. for setting a progress bar.

license
-------

See `LICENSE` file.

> Copyright (c) 2011 John Davidson
