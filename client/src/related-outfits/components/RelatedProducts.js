import React, { useState, useLayoutEffect, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import RelatedCarousel from './RelatedCarousel.js';
import RelatedModal from './RelatedModal.js';
import { Container, Modal, Button } from 'react-bootstrap';
import { getRelatedProducts } from '../actions/relatedActions.js';
import store from '../../store.js';
import '../styles/related.css';

const RelatedProducts = ({ product }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const currentProduct = useSelector(state => state.currentProduct);
  const [modalData, setModalData] = useState([]);
  const [comparisonProductName, setComparisonProductName] = useState('');
  // const currentThumbnail = useSelector(state => state.productStyles.results[0].photos[0].thumbnail_url);
  // const productIds = useSelector(state => state.relatedIds.ids);
  // let products = useSelector(state => state.related.productDetails || []  );
  const { id } = product;

  const [ productDetails, setProductDetails ] = useState(null);
  useEffect(() => {
    getRelatedProducts(id)
    .then(response => {
      console.log('we got here', response)
      setProductDetails(response)
    })
  }, [id]);

  // let modalTableData;
  // var modalTableData = [];

  const updateModalData = (data) => setModalData(data);
  const updateComparisonProductName = (name) => setComparisonProductName(name);

  // modal data creator
  const handleOpen = (compareProduct) => {
    let featuresData = [];
    let featuresUsed = {};
    console.log('features used: ', featuresUsed);

    let currentFeatures = currentProduct.features;
    let compareFeatures = compareProduct.features;

    let currentIdCounter = 1;

    for (let i = 0; i < currentFeatures.length; i++) {

      let data = {id: 0, property1: '', feature: '', property2: ''};
      let curFeatures = currentFeatures[i];
      data.feature = curFeatures.feature
      featuresUsed[curFeatures.feature] = i;

      if (curFeatures.value !== null) {
        data.property1 = curFeatures.value;
      } else {
        data.property1 = '✓';
      }
      data.id = currentIdCounter;
      currentIdCounter++;

      if (Object.keys(data).length !== 0) {
        featuresData.push(data);
      }
    }

    for (let i = 0; i < compareFeatures.length; i++) {
      let data = {id: 0, property1: '', feature: '', property2: ''};
      let compFeatures = compareFeatures[i];

      if (featuresUsed[compFeatures.feature]) {
        if (compFeatures.value !== null) {
          featuresData[featuresUsed[compFeatures.feature]].product2 = compFeatures.value;
        } else {
          featuresData[featuresUsed[compFeatures.feature]].product2 = '✓';
        }
      } else {
        data.feature = compFeatures.feature;
        if (compFeatures.value !== null) {
          data.property2 = compFeatures.value;
        } else {
          data.property2 = '✓';
        }
      }
      data.id = currentIdCounter;
      currentIdCounter++;

      if (Object.keys(data).length !== 0) {
        featuresData.push(data);
      }
    }

    console.log('featuresData: ', featuresData);
    updateModalData(featuresData);
    updateComparisonProductName(compareProduct.name);
    // modalTableData = featuresData;
    // console.log('modal table data: ', modalTableData);
    return setShow(true);

  }

  // console.log('modal data: ', modalData);

  // const tableProducts = [
  //   { id: 1, product1: '', feature: 'Features', product2: ''},
  //   { id: 2, product1: '✓', feature: 'Does the Job', produc2: 'Meh'},
  //   { id: 3, product1: '✓', feature: 'Impresses Strangers', produc2: '✓'},
  //   { id: 4, product1: 'They\'re never impressed.', feature: 'Impresses Friends', produc2: 'See left'},
  //   { id: 5, product1: 'Taco Bell', feature: 'Date Material', produc2: '✓✓✓'},
  //   { id: 6, product1: 'Do you know the deceased?', feature: 'Can Be Worn at a Funeral', produc2: 'Do you care about the deceased?'}
  // ];

  const modalTableColumns = [
    {
      dataField: 'id',
      text: '',
      hidden: true
    },
    {
      dataField: 'product1',
      text: ''
    },
    {
      dataField: 'feature',
      text: 'Features',
      style: { backgroundColor: 'lightgray'}
    },
    {
      dataField: 'property2',
      text: ''
    }
  ];

  const handleClose = () => setShow(false);

  return (
    <>
    {productDetails ? <RelatedCarousel products={productDetails} handleOpen={handleOpen} /> : <div></div>}

    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>COMPARE PRODUCTS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ padding: "20px", textAlign: "center"}}>
          <BootstrapTable keyField="id" data={modalData} columns={modalTableColumns} headerClasses="modalHeader" rowClasses="modalRows" />
          {/* <BootstrapTable keyField="id" data={tableProducts} columns={columns} headerClasses="modalHeader" rowClasses="modalRows" /> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
     <Button variant="primary" onClick={handleClose}>Close</Button>
   </Modal.Footer>
   </Modal>
   </>
  )
}

var mapStateToProps = (state) => ({
  product: state.currentProduct
});

var mapDispatchToProps = (dispatch) => {
  return {
    getRelatedProducts: (id) => dispatch(getRelatedProducts(id)),
  };
};

let RelatedProductsContainer = connect(
  mapStateToProps,
  null
)(RelatedProducts);

export default RelatedProductsContainer;
