import { logger } from "@/logger"
import { remark } from 'remark';
import html from 'remark-html';


async function getPostBySlug(slug) {
    const response = await fetch(`http://localhost:3042/posts?slug=${slug}`)
    if (!response.ok) {
        logger.error('Ops, alguma coisa deu errado');
        return {}
    }

    logger.info("Post by slug com sucesso")

    const data = await response.json()
    if (data.lenght == 0) {
        return {}
    }

    const post = data[0]
    const processedContent = await remark()
        .use(html)
        .process(post.markdown);
    const contentHtml = processedContent.toString();
    post.markdown = contentHtml
    return post
}

const PagePost = async ({ params }) => {
    const post = await getPostBySlug(params.slug)
    return (
        <>
            <h1 style={{ color: 'white' }}>{post.title}</h1>
            <div style={{ padding: 16, background: 'white' }} dangerouslySetInnerHTML={{ __html: post.markdown }} />
        </>
    )
}

export default PagePost