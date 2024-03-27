import { logger } from "@/logger"
import { remark } from 'remark';
import html from 'remark-html';
import db from "../../../../prisma/db";
import { redirect } from "next/navigation";


async function getPostBySlug(slug) {

    try {
        const post = await db.post.findFirst({
            where: {
                slug: slug
            },
            include: {
                author: true
            }
        })

        if(!post) {
            throw new Error(`Post com slug ${slug} não foi encontrado`)
        }

        const processedContent = await remark()
            .use(html)
            .process(post.markdown);
        const contentHtml = processedContent.toString();
        post.markdown = contentHtml
        return post
    } catch (error) {
        logger.error('Fala ao obter o post com slug: ', {
            slug,
            error
        })

        redirect('/not-found')
    }
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