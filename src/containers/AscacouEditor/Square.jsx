import mkClasses from '~/lib/mkClasses';
import '../Board/Square.scss';

const Square = ({ coord, value, selectedCoord }) => {
  let content = 'EMPTY';
  let alert = false;
  switch (value) {
    case '1':
    case 'n':
      content = 'BLACK';
      break;
    case '2':
    case 'b':
      content = 'WHITE';
      break;
    case '3':
    case 'x':
    case 'X':
      content = 'BLOCKED';
      break;
    case '4':
    case 'N':
      content = 'BLACK';
      alert = true;
      break;
    case '5':
    case 'B':
      content = 'WHITE';
      alert = true;
      break;
  }
  if (alert) {
    content = content + 'x';
  }

  const className = mkClasses('Square', `xy-${coord}`, `c-${content}`, {
    Selected: selectedCoord === coord,
  });
  return <div {...{ className }}></div>;
};

export default Square;
