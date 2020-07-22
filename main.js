function printReceipt(barcodes) {
    filterbarcodes = filterNotExistBarcodes(barcodes);
    var receipt = createReceipt(filterbarcodes);
    console.log(receipt);
}

function createReceipt(barcodes){
    var title = "\n***<store earning no money>Receipt ***\n";
    var content = title;
    var total = 0;
    for(var key in barcodes){
        barcodeInfo = getBarcodeInfo(key);
        var num = barcodes[key];
        var Subtotal = calculate(num,barcodeInfo["price"])
        total+= Subtotal;
        
        content+=`Name: ${barcodeInfo["name"]}, Quantity: ${num}, Unit price: ${barcodeInfo["price"]} (yuan), Subtotal: ${Subtotal} (yuan)\n`;
        
    }
    content+="----------------------\n"+
    "Total: "+ total +" (yuan)\n"+
    "**********************";
    return content;
}

function filterNotExistBarcodes(barcodes){
    barcodes = countTimes(barcodes);
    var filterBarcodes=[];
    for(var key in barcodes){
        if(checkBarcodeExist(key)){
            filterBarcodes[key]=barcodes[key];
        }
    }
    return filterBarcodes;
}

function countTimes(barcodes){
    var mergeConmmon = [];
    for(var i=0;i<barcodes.length;i++){
        if(mergeConmmon.hasOwnProperty(barcodes[i])){
            mergeConmmon[barcodes[i]] += 1;
        }else{
            mergeConmmon[barcodes[i]] = 1;
        }
    }
    return mergeConmmon;
}

function checkBarcodeExist(barcode){
    var isExist =true;
    if(getBarcodeInfo(barcode)==""){
        isExist = false;
    }
    return isExist;
}

function findAllBarcodesData(){
    return [
        {
           'barcode': 'ITEM000000',
           'name': 'Coca-Cola',
           'price': 3
         },
         {
           'barcode': 'ITEM000001',
           'name': 'Sprite',
           'price': 3
         },
         {
           'barcode': 'ITEM000002',
           'name': 'Apple',
           'price': 5
         },
         {
           'barcode': 'ITEM000003',
           'name': 'Litchi',
           'price': 15
         },
         {
           'barcode': 'ITEM000004',
           'name': 'Battery',
           'price': 2
         },
         {
           'barcode': 'ITEM000005',
           'name': 'Instant Noodles',
           'price': 4
         }
     ];
}

function getBarcodeInfo(barcode){
    var barcodesInfo = findAllBarcodesData();
    var barcodeInfo="";
    for(var i=0;i<barcodesInfo.length;i++){
        if(barcodesInfo[i]["barcode"] == barcode){
            barcodeInfo = barcodesInfo[i];
        }
    }
    return barcodeInfo;
}

function calculate(num,price){
    return num*price;
}

module.exports = {
    printReceipt
};
