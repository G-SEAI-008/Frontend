import { getPosts } from './_lib/api';
import PostList from './PostList';

const Page = async () => {
  const posts = await getPosts();

  return (
    <>
      <h1>100 Posts</h1>
      <ul className='grid'>
        {posts.map((post) => (
          <PostList key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};

export default Page;
