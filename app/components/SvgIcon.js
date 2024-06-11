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