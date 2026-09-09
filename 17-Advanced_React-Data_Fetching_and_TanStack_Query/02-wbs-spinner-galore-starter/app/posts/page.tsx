import PostList from '../../components/PostList';

// TODO 2: Lade die Posts mit await in dieser Server Page.
// Zeige für jeden Post eine PostPreview mit fertigen Daten als Prop.
// Die Ladeanzeige übernimmt die vorhandene app/loading.tsx.
export default function Page() {
  return (
    <>
      <h1>100 Posts</h1>
      <PostList />
    </>
  );
}
