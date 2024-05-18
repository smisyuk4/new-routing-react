import icon from '../../assets/icons.svg';

export const Icon = ({ id, ...props }) => {
  return (
    <svg {...props}>
      <use href={`${icon}#${id}`}></use>
    </svg>
  );
};
