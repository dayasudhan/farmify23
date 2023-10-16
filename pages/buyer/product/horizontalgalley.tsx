import React, { useState, useEffect } from 'react';
import { Image, Segment, Container, Button } from 'semantic-ui-react';

const ImageGallery = ({imageUrls}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // You can use currentIndex to fetch data or perform other actions when the index changes.
  }, [currentIndex]);

  const handlePrevClick = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  };

  const handleNextClick = () => {
    if(imageUrls)
      setCurrentIndex(Math.min(currentIndex + 1, imageUrls.length - 1));
  };

  return (
    <Container>
      <Segment style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Button icon="arrow left" onClick={handlePrevClick} disabled={currentIndex === 0} />
          <div style={{ overflowX: 'scroll', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {imageUrls && imageUrls.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  size="medium"
                  style={{ marginRight: '100px' }}
                  hidden={index !== currentIndex}
                />
              ))}
            </div>
          </div>
          <Button
            icon="arrow right"
            onClick={handleNextClick}
            disabled={imageUrls && currentIndex === imageUrls.length - 1}
          />
        </div>
      </Segment>
    </Container>
  );
};

export default ImageGallery;
