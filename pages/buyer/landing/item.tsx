import React from 'react';
import { Image, List } from 'semantic-ui-react';
import Link from 'next/link';

const baseURL = '/buyer/product/item?id=';

const Item = (props) => {
  const imageUrl = props.data.image_urls ? props.data.image_urls[0] : null;

  return (
    <div className="product-item">
      <div className="product-image">
        {imageUrl && (
          <Image src={imageUrl} size="medium" as="a" href={baseURL + props.data.id} />
        )}
      </div>
      <div className="product-details">
        <h3>
          <Link href={baseURL + props.data.id}>
            {props.data?.name}
          </Link>
        </h3>
        <p>{props.data?.description}</p>
        <p>
          Rate: {props.data?.price}, {props.data?.district}
        </p>
      </div>
      <List className="product-actions" horizontal>
        <List.Item>
          <Link href={baseURL + props.data.id}>
            <List.Icon circular name="cart arrow down" size="large" />
          </Link>
        </List.Item>
      </List>
    </div>
  );
};

export default Item;
