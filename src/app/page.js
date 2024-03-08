import { CardPost } from "@/components/CardPost";
import styles from './page.module.css';
import { logger } from "@/logger";

async function getAllPost () {
  const response = await fetch('http://localhost:3042/posts')
  if(!response.ok) {
    logger.error('Ops, alufma coisa deu errado' );
    return []
  }
  logger.info("Posts com sucesso")
  return response.json()
}

export default async function Home() {

  const posts = await getAllPost();

  return (
    <main className={styles.main}>

      {posts.map( post => (
       <CardPost post={post} />
      ))}
 
    </main>
  );
}
