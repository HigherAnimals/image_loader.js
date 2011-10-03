var ImageLoader;

/**
 * Creates an instance of the ImageLoader.
 *
 * @constructor
 * @param {Array.<string>=} opt_imagePaths Array of image paths.
 * @param {function(Array.<Image>)=} opt_allback
 *     A callback for all images loading completion; accepts an array of images
 *     in the order of the submitted paths.
 * @param {function(Image, number, number, bumber)=} opt_oneback
 *     A callback for an individual image loading completion; accepts the image,
 *     the index (relative to the submitted paths), the number loaded, and the
 *     total number of images paths originally submitted.
 * @param {function(Event)=} opt_errback A callback for image loading errors.
 * @param {boolean=} opt_wait Will not load immediately if true.
 */
ImageLoader = function (opt_imagePaths, opt_allback, opt_oneback, opt_errback,
    opt_wait) {
  this._imagePaths = opt_imagePaths || [];
  this._images = [];
  this._allback = opt_allback;
  this._oneback = opt_oneback;
  this._errback = opt_errback;
  if (opt_imagePaths && !opt_wait) {
    this.start();
  }
};

/**
 * Returns true if images are presently loading.
 *
 * @return {boolean}
 */
ImageLoader.prototype.isLoading = function () {
  return this._loading;
};

/**
 * Begins loading (if not loading already).
 */
ImageLoader.prototype.start = function () {
  if (this._loading) {
    return;
  }
  this._loading = true;
  this._imagePaths.forEach(function (imagePath, index) {
    this._startImage(imagePath, index);
  }, this);
};

/**
 * @private
 * @param {string} imagePath Path to the image.
 * @param {number} index The index of the image.
 */
ImageLoader.prototype._startImage = function (imagePath, index) {

  var image;

  image = new Image();
  this._images.push(image);
  image.onload = (function (image_loader) {
    return function () {
      image_loader._check(image, index);
    };
  })(this);
  if (this._errback) image.onerror = this._errback;
  image.src = imagePath;
};

/**
 * @private
 * @param {string} imagePath Path to the image.
 * @param {number} index The index of the image.
 */
ImageLoader.prototype._check = function (image, index) {

  var remaining;

  remaining = this._imagePaths.length - ++this._numLoaded;
  if (this._oneback)
    this._oneback(image, index, this._numLoaded, this._imagePaths.length);
  if (this._allback && this._imagePaths.length === this._numLoaded) {
    this._loading = false;
    this._allback(this._images);
  }
};

/**
 * Get the percent of the images completed.
 *
 * @return {number}
 */
ImageLoader.prototype.getPercent = function () {

  var num;

  num = this._imagePaths.length;
  return num ? this._numLoaded/num : NaN;
};

/**
 * Add an image to the list.
 *
 * @param {string} path An image path.
 */
ImageLoader.prototype.addImagePath = function (path) {
  this._imagePaths.push(path);
  if (this._loading)
    this._startImage(path, this._imagePaths.length-1);
};

/**
 * The number of loaded images.
 *
 * @private
 * @type {number}
 */
ImageLoader.prototype._numLoaded = 0;

/**
 * If true, the ImageLoader is still retrieving images.
 *
 * @private
 * @type {boolean}
 */
ImageLoader.prototype._loading = false;

