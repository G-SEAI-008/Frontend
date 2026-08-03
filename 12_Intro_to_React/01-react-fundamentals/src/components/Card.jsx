const Card = (props) => {
  console.log(props);

  return <div className='bg-cyan-500'>{props.children}</div>;
};
export default Card;
