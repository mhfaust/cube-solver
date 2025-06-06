
type CubeIconProps = {
  height?: number;
  width?: number;
  className?: string;
};

const CubeIcon = ({ height, width, className }: CubeIconProps) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      {...width && { width: `${width}px`}} 
      {...height && { height: `${height}px`}} 
      className={className}
      viewBox="0 0 490.452 490.452"
    >
<path d="M245.226,0L43.836,126.814v236.823l201.39,126.814l201.39-126.814V126.814L245.226,0z M403.465,135.095l-158.239,99.643
	L86.987,135.095l158.239-99.643L403.465,135.095z M73.836,162.267l156.39,98.477v184.81l-156.39-98.478V162.267z M260.226,445.555
	v-184.81l156.39-98.478v184.81L260.226,445.555z"/>
  </svg>
  );
};

export default CubeIcon;