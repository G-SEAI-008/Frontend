import PostDetail from './PostDetail';

// TODO 2: Lade den Post mit await und zeige Titel und Text direkt in dieser Page.
// Die URL-Parameter bekommst du als params: Promise<{ id: string }>.
// Mache die Page async und lies die ID mit: const { id } = await params;
const Page = () => {
  return (
    <>
      <h1>Ein Post</h1>
      <PostDetail />
    </>
  );
};

export default Page;
