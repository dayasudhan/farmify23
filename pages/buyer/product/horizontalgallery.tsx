import React, { useState, useEffect } from 'react';
import { Image, Segment, Container, Button } from 'semantic-ui-react';

const ImageGallery = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // You can use currentIndex to fetch data or perform other actions when the index changes.
  }, [currentIndex]);

  const handlePrevClick = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  };

  const handleNextClick = () => {
    if (imageUrls) setCurrentIndex(Math.min(currentIndex + 1, imageUrls.length - 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Container>
      <Segment style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button
            icon="arrow left"
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
            style={{ marginBottom: '10px' }}
          />
          <Image
            src={imageUrls && imageUrls[currentIndex]}
            size="large"
            style={{ maxWidth: '100%' }}
          />
          <Button
            icon="arrow right"
            onClick={handleNextClick}
            disabled={imageUrls && currentIndex === imageUrls.length - 1}
            style={{ marginTop: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          {imageUrls &&
            imageUrls.map((url, index) => (
              <Image
                key={index}
                src={url}
                size="tiny" // Set the size of the thumbnail images
                style={{ margin: '0 5px', cursor: 'pointer' }}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
        </div>
      </Segment>
    </Container>
  );
};

export default ImageGallery;
