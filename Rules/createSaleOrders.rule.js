var clientAPI;

/**
 * Describe this function...
 */
export default function createSaleOrders(clientAPI) {

	var message = "Create Sales Order";
	var title = "Create Sales Order"; //scan_point
	var okCaption = "OK";
	clientAPI.setActionBinding({
		'Message': message,
		'Title': title,
		'OKCaption': okCaption
	});
	return clientAPI.executeAction('/SAPAssetManager/Actions/ZZ_Customer/Z_BarcodeScanner/Z_CheckforPointScanNoMatch.action');
}