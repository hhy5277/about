import { graphql } from 'gatsby'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
export default class ContentTemplate extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    public componentDidMount(): void {
        if (document) {
            document.getElementsByTagName('body')[0].setAttribute('style', 'background-image:none')
        }

        if (window.location.pathname.includes('/docs/server')) {
            const results = document.getElementsByClassName('see-result')
            const res = Array.from(results)
            if (res.length > 0) {
                res.map(el => {
                    el.addEventListener('click', () => {
                        this.toggleCodeBlock(el)
                    })
                })
            }
        }
    }

    public toggleCodeBlock(el: Element): void {
        const sibling = el.nextElementSibling
        const style = sibling.getAttribute('style')
        if (style === 'display:none') {
            el.nextElementSibling.setAttribute('style', 'display:block')
        } else if (style === 'display:block') {
            el.nextElementSibling.setAttribute('style', 'display:none')
        }
    }

    public render(): JSX.Element | null {
        const md = this.props.data.markdownRemark
        const content = md.html
        const excerpt = md.excerpt
        const title = md.frontmatter.title
        return (
            <Layout location={this.props.location}>
                <div>
                    <Helmet>
                        <title>{title}</title>
                        <meta property="og:title" content={title} />
                        <meta name="twitter:title" content={title} />
                        <meta name="twitter:description" content={excerpt} />
                        <meta property="og:description" content={excerpt} />
                        <meta name="description" content={excerpt} />
                    </Helmet>
                    <section className="content-page__title">
                        <h1>{title}</h1>
                    </section>
                    <section className="content-page__body">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </section>
                </div>
            </Layout>
        )
    }
}

export const pageQuery = graphql`
    query contentTemplate($fileSlug: String) {
        markdownRemark(fields: { slug: { eq: $fileSlug } }) {
            frontmatter {
                title
            }
            html
            excerpt
            fields {
                slug
            }
        }
    }
`
