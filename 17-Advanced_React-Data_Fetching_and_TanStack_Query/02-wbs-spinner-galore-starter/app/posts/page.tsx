import PostList from './PostList';

// TODO 2: Lade die Posts mit await in dieser Server Page.
// Erstelle PostPreview.tsx neben dieser Page und übergib pro Post fertige Daten als Prop.
// Die Ladeanzeige übernimmt die vorhandene app/loading.tsx.
const Page = () => {
  return (
    <>
      <h1>100 Posts</h1>
      <PostList />
    </>
  );
};

export default Page;
