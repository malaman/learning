module.exports = {
  options: {
      sourceMap: true
  },
  dist: {
    files: {
      'frontend/static_files/css/main.css': 'build/dist/static_files/scss/main.scss'
    }
  }
};