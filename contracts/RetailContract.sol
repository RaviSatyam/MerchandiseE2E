// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

struct Product {
    string product_section;
    string product_name;
    uint product_id;
    uint product_cost;
    uint product_quantity;
}

contract RetailContract {
    mapping(uint => Product) products;
    mapping(string => Product[]) productSection;
    Product[] public productList;
    //uint[] pIdKey;
    uint count;

    function addProduct(
        string memory _product_section,
        string memory _product_name,
        uint _product_id,
        uint _product_cost
    ) public {
        count++;
        Product memory p;
        p.product_section = _product_section;
        p.product_name = _product_name;
        p.product_id = _product_id;
        p.product_cost = _product_cost;
        p.product_quantity = count;
        products[_product_id] = p;
        productList.push(p);
        productSection[_product_section].push(p);
        //pIdKey.push(_product_id);
    }

    function getProductById(
        uint _productID
    )
        public
        view
        returns (
            string memory product_section,
            string memory product_name,
            uint product_cost,
            uint product_quantity
        )
    {
        Product memory p = products[_productID];
        return (
            p.product_section,
            p.product_name,
            p.product_cost,
            p.product_quantity
        );
    }

    function getAllProducts() public view returns (Product[] memory) {
        return productList;
    }

    function getAllProductsBySection(
        string memory _section
    ) public view returns (Product[] memory) {
        return productSection[_section];
    }

    function buyProductById(uint _id) public {
        //delete products[_id];
        for (uint i = 0; i < productList.length; i++) {
            if (productList[i].product_id == _id) {
                delete productList[i];
            }
        }

        string memory sec = products[_id].product_section;
        for (uint i = 0; i < productSection[sec].length; i++) {
            if (productSection[sec][i].product_id == _id) {
                delete productSection[sec][i];
            }
        }
        delete products[_id];

        //delete productSection[products[_id].product_section];
        count--;
    }
    function updateProductById(string memory _product_section,string memory _product_name,uint _product_id,uint _product_cost) public{
        
        Product memory p;
        p.product_section=_product_section;
        p.product_name=_product_name;
        p.product_id=_product_id;
        p.product_cost=_product_cost;
        for(uint i=0;i<productList.length;i++){
            if(productList[i].product_id==_product_id){
                productList[i]=p;
            }
        }

        string memory sec=products[_product_id].product_section;
        for(uint i=0;i<productSection[sec].length;i++){
            if(productSection[sec][i].product_id==_product_id){
                 productSection[sec][i]=p;
            }
        }
        products[_product_id]=p;

        
        count--;
    }
}
