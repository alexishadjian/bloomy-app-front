import Svg, { Path } from 'react-native-svg';


const icons = {
  home: (color, width) => (
    <Svg xmlns="http://www.w3.org/2000/svg"  width={width}  height="24"  viewBox="0 0 24 24"  fill="none"  stroke={color}  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Path d="M5 12l-2 0l9 -9l9 9l-2 0" />
      <Path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <Path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </Svg>
  ),
  task: (color, width) => (
    <Svg xmlns="http://www.w3.org/2000/svg"  width={width}  height="24"  viewBox="0 0 24 24"  fill="none"  stroke={color}  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Path d="M9 6l11 0" />
      <Path d="M9 12l11 0" />
      <Path d="M9 18l11 0" />
      <Path d="M5 6l0 .01" />
      <Path d="M5 12l0 .01" />
      <Path d="M5 18l0 .01" />
    </Svg>
  ),
  delete: (color, width) => (
    <Svg xmlns="http://www.w3.org/2000/svg"  width={width}  height="24"  viewBox="0 0 24 24"  fill="none"  stroke={color}  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
      <Path d="M4 7l16 0" />
      <Path d="M10 11l0 6" />
      <Path d="M14 11l0 6" />
      <Path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <Path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </Svg>
  ),
  edit: (color, width) => (
    <Svg xmlns="http://www.w3.org/2000/svg"  width={width}  height="24"  viewBox="0 0 24 24"  fill="none"  stroke={color}  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
      <Path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
      <Path d="M16 5l3 3" />
    </Svg>
  ),
  add: (color, width) => (
    <Svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height="24"  viewBox="0 0 24 24"  fill="none"  stroke={color}  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
      <Path d="M12 5l0 14" />
      <Path d="M5 12l14 0" />
    </Svg>
  ),
  check: (color, width) => (
    <Svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height="24"  viewBox="0 0 24 24"  fill="none"  stroke={color}  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
      <Path d="M5 12l5 5l10 -10" />
    </Svg> 
  ),
  repeat: (color, width) => (
    <Svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height="24"  viewBox="0 0 24 24"  fill="none"  stroke={color}  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
      <Path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
      <Path d="M20 4v5h-5" />
    </Svg>
  ),
  settings: (color, width) => (
    <Svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height="24"  viewBox="0 0 24 24"  fill="none"  stroke={color}  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
      <Path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    </Svg>
  ),
  parameters: (color, width) => (
    <Svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height="24"  viewBox="0 0 24 24"  fill="none"  stroke={color}  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
      <Path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <Path d="M4 6l8 0" />
      <Path d="M16 6l4 0" />
      <Path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <Path d="M4 12l2 0" />
      <Path d="M10 12l10 0" />
      <Path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <Path d="M4 18l11 0" />
      <Path d="M19 18l1 0" />
    </Svg>
  ),
  default: (color, width) =>(
    <Svg xmlns="http://www.w3.org/2000/svg"  width={width}  height="24"  viewBox="0 0 24 24"  fill="none"  stroke={color}  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Path d="M5 12l-2 0l9 -9l9 9l-2 0" />
      <Path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <Path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </Svg>
  )
};

export default function SvgIcon({ name, color = '#9261F2', width = 24 }) {
  const svgIcon = icons[name] || icons.default;
  return svgIcon(color, width);
}