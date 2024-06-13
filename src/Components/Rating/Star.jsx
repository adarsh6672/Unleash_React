const Star = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i}>⭐️</span>);
    }
    return <div>{stars}</div>;
  };

  export default Star;