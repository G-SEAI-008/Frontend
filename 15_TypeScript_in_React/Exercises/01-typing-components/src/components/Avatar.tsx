// components/Avatar.tsx
// This component should receive `url` (string) and `altText` (string)

interface Props {
  url: string;
  altText: string;
}

const Avatar = ({ url, altText }: Partial<Props>) => {
  return <img src={url || 'https://i.pravatar.cc/50'} alt={altText || ''} />;
};

export default Avatar;
