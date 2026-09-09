import PostList from '../../components/PostList';

// TODO 2: Starte den API-Aufruf und übergib die Promise an PostList.
// TODO 4: Umschließe die Komponente mit Suspense und einem Loading-Fallback.
export default function Page() {
  return (
    <>
      <h1>100 Posts</h1>
      <PostList />
    </>
  );
}
