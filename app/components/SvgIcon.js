import Svg, { Path } from 'react-native-svg';


const icons = {
  home: (color) => (
    <Svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke={color}  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Path d="M5 12l-2 0l9 -9l9 9l-2 0" />
      <Path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <Path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </Svg>
  ),
  task: (color) => (
    <Svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke={color}  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Path d="M9 6l11 0" />
      <Path d="M9 12l11 0" />
      <Path d="M9 18l11 0" />
      <Path d="M5 6l0 .01" />
      <Path d="M5 12l0 .01" />
      <Path d="M5 18l0 .01" />
    </Svg>
  ),
  defaultIcon: (color) =>(
    <Svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke={color}  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Path d="M5 12l-2 0l9 -9l9 9l-2 0" />
      <Path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <Path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </Svg>
  )
};

export default function SvgIcon({ name, color = '#9261F2' }) {
  const svgIcon = icons[name] || icons.defaultIcon;
  return svgIcon(color);
}