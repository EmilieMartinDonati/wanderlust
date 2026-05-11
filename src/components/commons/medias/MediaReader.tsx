type MediaType = 'audio' | 'video' | 'image'

interface MediaReaderProps {
  type: MediaType
  src: string
  className?: string
}

const MediaReader = ({ type, src, className = '' }: MediaReaderProps) => {

  console.log('tupe', type);

  let usedComponent: React.ReactNode;
  switch (type) {
    case 'audio':
      usedComponent = <div style={{ border: '2px red solid' }}><audio autoPlay controls preload="auto">
        <source src={src} type="audio/mpeg" />
        <source src={src} type="audio/ogg" />
        <a href={src}>download audio</a>
      </audio></div>
      break;
    case 'video':
      usedComponent = <video
      controls
      width="640"
      height="480"
      poster="initialimage.png"
      autoPlay
      muted>
      <source src={src} type="video/mp4" />
      <source src={src} type="video/webm" />
      <a href={src}>download video</a>
    </video>
      break;
    case 'image':
      usedComponent = <img className={className} src={src} alt=''/>
      break;
  }

  return (
    <div className={className}>
      {usedComponent}
    </div>
  );
}

export default MediaReader;
