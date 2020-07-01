export default function triggerWorkflow(context) {
	var systemID;
	var sUnit;

	debugger;

	let dialogs = context.nativescript.uiDialogsModule;

	let pageProxy = context.getPageProxy();
	let task = pageProxy.binding;
	if (task.System === 'OnPremise') {
		systemID = 'OP';
		sUnit='PC';
	} else {
		systemID = 'CL';
		sUnit='TO';
	}
	
	let userid = context.evaluateTargetPath('#Application/#ClientData/#Property:UserId');

	let productBody = {
		"definitionId": "SalesOrderWorkflow",
		"context": {
			"systemID": task.System,
			"PurchaseOrderByCustomer": "SO from Workflow",
			"Material": task.ProductId,
			"SalesOrganization": task.PlantID,
			"SoldToParty": "17100003",
			"RequestedQuantityUnit": sUnit,
			"RequestedQuantity": task.QuantityUnit,
			"SalesOrderType": "OR",
			"MobileUser": true,
			"EmailID": userid
		}
	};
	
	let destination = 'Workflow_Mobile_SCP';
	let requestPath = destination;

	let params = {
		'method': 'POST',
		'header': {
			'x-smp-appid': 'com.demo.tryout',
			'Content-Type': 'application/json'
		},
		'body': JSON.stringify(productBody)
	};
	let taskInstance = `/workflow/rest/v1/workflow-instances`;
	//	dialogs.alert(params);
	//	console.log(taskInstance);
	//	console.log(params);

	return context.sendMobileServiceRequest(requestPath, params).then(r => {
			if (r && r.statusCode === 201 && r.content) {
				let result = JSON.parse(r.content.toString());
				result = result + '\n' + r.content.toString();
				console.log(result);
				dialogs.confirm({
					title: "Sales Order",
					message: "Thank you for your order! Sales Order is initialized and you will soon receive an Email confirmation.",
					okButtonText: "OK"

				})

				//	dialogs.confirm("Thank you for your order! Sales Order is initialized and you will soon receive an Email confirmation.");
			} else if (r.statusCode === 401) {
				dialogs.alert({
					title: "Sales Order",
					message: "Unauthorized, bad credential.",
					okButtonText: "OK"

				})

			} else {
				dialogs.alert({
					title: "Sales Order",
					message: "Sales Order creation failed, please check workflow monitor for details.",
					okButtonText: "OK"

				})
			}
		},
		(error) => {
			console.log(error.toString());
			let errorMsg = 'error = ' + error.message;
			dialogs.alert(errorMsg)
		});

}