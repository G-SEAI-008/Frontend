// type PostProps = {
//   params: Promise<{ id: string }>;
// };

const Post = async ({ params }: PageProps<'/post/[id]'>) => {
  const { id } = await params;

  return (
    <div>
      <h1>Post: {id}</h1>
    </div>
  );
};

export default Post;
