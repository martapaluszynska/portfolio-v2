module.exports = {
  siteMetadata: {
    name: `Marta Paluszyńska`,
    tagline: `test = 😹 `,
    navbarLinks: [
      {
        name: 'work',
        link: '/work'
      },
      {
        name: 'life',
        link: '/life'
      },
      {
        name: 'balance',
        link: '/balance'
      },
      {
        name: 'contact',
        link: '/contact'
      },
      {
        name: 'about',
        link: '/'
      },
      {
        name: '404',
        link: '/404'
      },
    ]
  },  
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `lora\:400,700`,
          `lato\:400,700` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    }
  ],
}
