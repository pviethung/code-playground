import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  axis: 'x' | 'y';
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ axis, children }) => {
  let props: ResizableBoxProps;

  if (axis === 'y') {
    props = {
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, 24],
      width: Infinity,
      height: 300,
      resizeHandles: ['s'],
    };
  } else {
    props = {
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      minConstraints: [window.innerWidth * 0.25, Infinity],
      width: window.innerWidth * 0.5,
      height: Infinity,
      resizeHandles: ['e'],
    };
  }

  return <ResizableBox {...props}>{children}</ResizableBox>;
};
export default Resizable;
