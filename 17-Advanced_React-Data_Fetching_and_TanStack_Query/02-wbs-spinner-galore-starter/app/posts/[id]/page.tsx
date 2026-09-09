import PostDetail from '../../../components/PostDetail';

// TODO 2: Starte den API-Aufruf und übergib die Promise an PostDetail.
// TODO 4: Umschließe die Komponente mit Suspense und einem Loading-Fallback.
// Die URL-Parameter bekommst du als params: Promise<{ id: string }>.
// Mache die Page async und lies die ID mit: const { id } = await params;
export default function Page() {
  return (
    <>
      <h1>Ein Post</h1>
      <PostDetail />
    </>
  );
}
