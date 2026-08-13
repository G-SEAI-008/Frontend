const Button = ({ className, children }) => {
  return <button className={`btn btn-primary ${className}`}>{children}</button>;
};
export default Button;
