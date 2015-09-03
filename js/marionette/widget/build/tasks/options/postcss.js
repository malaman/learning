module.exports = {
  options: {
      map: true,
      processors: [
          require('autoprefixer-core')({
              browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
          })
      ]
  },
  dist: {
      src: 'frontend/static_files/css/*.css',
      dest: 'frontend/static_files/css/*.css'
  }
};