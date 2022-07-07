import {
  DirectoryItemContainer,
  Body
} from "./directory-item.styles";

const DirectoryItem = ({category}) => {
  const { title, imageUrl } = category;

  return (
    <DirectoryItemContainer>
      <div className="background-image" style={
        { backgroundImage: `url(${imageUrl})` }
      } />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem
