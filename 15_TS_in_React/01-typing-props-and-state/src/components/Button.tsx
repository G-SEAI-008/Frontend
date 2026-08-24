// type ButtonProps = {
//   children: React.ReactNode;
//   //   onClick: () => void;
//   onClick: React.MouseEventHandler<HTMLButtonElement>;
//   className?: string;
// };

// const Button = ({ children, onClick, className }: ButtonProps) => {
//   return (
//     <button className={`myBtn ${className}`} onClick={onClick}>
//       {children}
//     </button>
//   );
// };

type IntrinsicButtonProps = Omit<React.ComponentProps<'button'>, 'onDrag' | 'onDrop'> & {
  username: string;
};

const Button = ({ username, children, onClick, className, ...rest }: IntrinsicButtonProps) => {
  return (
    <button className={`myBtn ${className ?? ''}`} onClick={onClick} {...rest}>
      {username}: {children}
    </button>
  );
};

export default Button;
