import { graphql, useStaticQuery } from 'gatsby';

const useSiteMetadata = () => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        name
                        navbarLinks {
                            name
                            link
                        }
                    }
                }
            }
        `,
    );
    return site.siteMetadata;
};

export default useSiteMetadata;
