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
          <div className="image-container">
            <Image src={imageUrl} as="a" href={baseURL + props.data.id} />
          </div>
        )}
      </div>
      <div className="product-details">
        <h3>
          <Link href={baseURL + props.data.id}>{props.data?.name}</Link>
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
      <style jsx>{`
        .product-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        .image-container {
          max-width: 200px;
          max-height: 200px;
          overflow: hidden;
        }
        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .product-details {
          margin-top: 10px;
          text-align: center;
        }
        .product-actions {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default Item;
