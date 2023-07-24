import './Trick.css'

const Trick = ({trick}) => {
  return (
    <section className='single-trick'>
      <p>{trick.stance} {trick.name}</p>
      <p>Obstacle: {trick.obstacle}</p>
      <p>Link to tutorial:</p>
      <a target="_blank" href={trick.tutorial} >{trick.tutorial}</a>
    </section>
  )
}

export default Trick