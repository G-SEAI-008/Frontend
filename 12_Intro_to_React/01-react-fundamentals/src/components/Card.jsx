// # Komponenten-Komposition mit children
// * children macht die Card zu einer wiederverwendbaren Hülle für beliebige Inhalte zwischen ihren öffnenden und schließenden Tags.
const Card = (props) => {
  console.log(props);

  // ! children kann mehrere Elemente enthalten; die Card sollte deshalb keinen einzelnen Inhaltstyp voraussetzen.
  return <div className='bg-cyan-500'>{props.children}</div>;
};
export default Card;
