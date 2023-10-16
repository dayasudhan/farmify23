import React from 'react';
import { Table, Image, Button } from 'semantic-ui-react';
import Link from 'next/link';

const TableExampleCollapsing = () => {
  return (
    <div>
      <Table columns={6}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Product Name</Table.HeaderCell>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Unit Price</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Image src="https://demo.opencart.com/image/cache/catalog/demo/macbook_1-47x47.jpg" />
            </Table.Cell>
            <Table.Cell>Mac Book</Table.Cell>
            <Table.Cell>Product 16</Table.Cell>
            <Table.Cell>10</Table.Cell>
            <Table.Cell>Rs 1000</Table.Cell>
            <Table.Cell>Rs 10000</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Image src="https://demo.opencart.com/image/cache/catalog/demo/iphone_1-47x47.jpg" />
            </Table.Cell>
            <Table.Cell>IPhone</Table.Cell>
            <Table.Cell>10X</Table.Cell>
            <Table.Cell>10</Table.Cell>
            <Table.Cell>Rs 2000</Table.Cell>
            <Table.Cell>Rs 20000</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.Cell>Sub Total</Table.Cell>
            <Table.Cell>30000</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.Cell>GST</Table.Cell>
            <Table.Cell>5000</Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell textAlign="left">Total</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">35000</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <div style={{ display: 'flex' }}>
        <a href="/buyer/checkout/checkout">
          <Button color="primary" style={{ marginLeft: 'auto' }}>
            Buy
          </Button>
        </a>
      </div>
    </div>
  );
};

export default TableExampleCollapsing;
