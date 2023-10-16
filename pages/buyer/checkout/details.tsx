import React from 'react';
import { Segment, Input, Label, Form, Button } from 'semantic-ui-react';

const SegmentExampleNestedSegments = () => (
  <Segment.Group>
    <Segment.Group horizontal>
      <Segment>
        Shipping Details
        <p></p>{' '}
        <Form.Field>
          <Input focus placeholder="Name..." />
        </Form.Field>
        <p></p>
        <Form.Field>
          <Input focus placeholder="Land Mark..." />
        </Form.Field>
        <p></p>
        <Form.Field>
          <Input focus placeholder="Village/City..." />
        </Form.Field>
        <p></p>
        <Form.Field>
          <Input focus placeholder="Address..." />
        </Form.Field>
        <p></p>
        <Form.Field>
          <Input focus placeholder="District..." />
        </Form.Field>
        <p></p>
        <Form.Field>
          <Input focus placeholder="State..." />
        </Form.Field>
        <p></p>
        <Form.Field>
          <Input focus placeholder="Pin Code..." />
        </Form.Field>
        <p></p>
        <Form.Field>
          <Input focus placeholder="Phone Number" />
        </Form.Field>
        <p></p>
        <div style={{ display: 'flex' }}>
          <a href="/buyer/checkout/checkout">
            <Button color="primary" style={{ marginLeft: 'auto' }}>
              Complete Order
            </Button>
          </a>
        </div>
      </Segment>

      {/* <Segment>
        Payment Method (Future mPurpose)
        <Segment.Group>
          <Segment>Middle</Segment>
          <Segment>Middle</Segment>
        </Segment.Group>
      </Segment> */}
    </Segment.Group>
    {/* <Segment.Group horizontal>
      <Segment>
        Delivery Address
        <Segment.Group>
          <Segment>Middle</Segment>
          <Segment>Middle</Segment>
        </Segment.Group>
      </Segment>
      <Segment>
        Shipping Method
        <Segment.Group>
          <Segment>Middle</Segment>
          <Segment>Middle</Segment>
        </Segment.Group>
      </Segment>
    </Segment.Group> */}
  </Segment.Group>
);

export default SegmentExampleNestedSegments;
