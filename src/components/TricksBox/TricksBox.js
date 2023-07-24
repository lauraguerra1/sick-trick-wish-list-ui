import Trick from '../Trick/Trick';
import './TricksBox.css';
const TricksBox = ({ tricks }) => {
  const trickEls = tricks.map((trick) => (
    <Trick key={trick.id} trick={trick} />
  ));
  return <section className="tricks-box">{trickEls}</section>;
};

export default TricksBox;
