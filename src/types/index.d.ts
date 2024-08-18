declare module '*.module.css';
declare module '*.module.scss';
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
