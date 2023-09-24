module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/libs', './src', './server'],
        extensions: ['.js', '.model.js', '.json'],
      },
    ],
  ],
};
