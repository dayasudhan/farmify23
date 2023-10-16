import React from 'react';
import { Image, List, Rating } from 'semantic-ui-react';
import Link from 'next/link';
const baseURL = '/buyer/product/item?id=';
const Item = (props) => {
  console.log("props",props)
  const imageUrl = props.data.image_urls ? props.data.image_urls[0] : null;
  return (
    <div>
      <div className="product-grid6">
        <div className="product-image6">
      
      {imageUrl && (
        <Image src={imageUrl} size="medium" as="a" href={baseURL + props.data.id} />
      )}
 
        </div>
        <div className="product-content">
          <h3 className="ui header">
            <Link href={baseURL + props.data.id}>
             {props.data?.name}
            </Link>

            <div className="sub header">{props.data?.description}</div>
          </h3>
          <Rating icon="star" defaultRating={5} maxRating={5} />
          <br />
          <br />
          <div className="price">{props.data?.price}</div>
        </div>
        <List className="social" horizontal>
          <List.Item>
            <List.Icon circular name="eye" size="large" />
          </List.Item>
          <List.Item>
            <List.Icon circular name="heart" size="large" />
          </List.Item>
          <List.Item>
            <List.Icon circular name="cart arrow down" size="large" />
          </List.Item>
        </List>
      </div>
    </div>
  );
};

export default Item;
