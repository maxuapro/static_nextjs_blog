import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Post from '../components/Post'
import {sortByDate} from '../utils'

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Maxua PRO</title>
        <meta name='keywords' content='web development, propgramming' />
      </Head>
      <div className="posts">
        {props.posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  )
}


export async function getStaticProps() {
  // Get files from the post directory
  const files = fs.readdirSync(path.join('posts'))

  // Get slug and frontmatter from posts ----------------
  const posts = files.map(filename => {
    // create a slug
    const slug = filename.replace('.md', '')
    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    // !!! Here we are taking ONLY data from Gray-Matter, by doing destructuring  !!!
    // AND renaming data to frontmatter
    const { data: frontmatter } = matter(markdownWithMeta)


    return {
      slug,
      frontmatter
    }

  }) // ------------------------------------------------



  return {
    props: {
      posts: posts.sort(sortByDate)
    }
  }
}
