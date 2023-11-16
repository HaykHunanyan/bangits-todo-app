module.exports = {
    // ... other webpack configurations
  
    module: {
      rules: [
        // ... other rules
  
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
  };