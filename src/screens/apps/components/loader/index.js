import ContentLoader from "react-content-loader";

const DataTableLoader = props => (
  <ContentLoader
    width="100%"
    height={400}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="25" y="20" rx="5" ry="5" width="97%" height="20" /> 
    <rect x="25" y="60" rx="5" ry="5" width="97%" height="20" /> 
    <rect x="25" y="100" rx="5" ry="5" width="97%" height="20" /> 
    <rect x="25" y="140" rx="5" ry="5" width="97%" height="20" /> 
    <rect x="25" y="180" rx="5" ry="5" width="97%" height="20" /> 
    <rect x="25" y="220" rx="5" ry="5" width="97%" height="20" /> 
    <rect x="25" y="260" rx="5" ry="5" width="97%" height="20" /> 
    
  </ContentLoader>
)

export default DataTableLoader;