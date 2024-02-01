const IceCreamImage = ({ iceCreamId }: { iceCreamId: number }) => {
  const iceCreamImage = `${process.env.PUBLIC_URL}/ice-cream-images/ice-cream-${iceCreamId}.svg`;
  return iceCreamId ? <img src={iceCreamImage} alt="" /> : null;
};

export default IceCreamImage;
