import ContentLoader from "react-content-loader";

const TextLoader = props => (
  <ContentLoader
    width="100%"
    height="30px"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="100%" height="30" /> 
  </ContentLoader>
)

export default TextLoader;