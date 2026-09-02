import Link from 'next/link';

export default function Home() {
  const posts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' },
    { id: 4, title: 'Post 4' },
    { id: 5, title: 'Post 5' },
  ];

  return (
    <div>
      <h1>HOME</h1>
      {/* <Counter /> */}
      {posts.map((p) => (
        <Link href={`/post/${p.id}`} key={p.id}>
          <h2>{p.title}</h2>
        </Link>
      ))}
    </div>
  );
}
