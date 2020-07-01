export default function fetchToken(context) {
	debugger;
	let dialogs = context.nativescript.uiDialogsModule;

	let pageProxy = context.getPageProxy();
	let task = pageProxy.binding;

	let params = {
		'method': 'GET',
		'header': {
			'X-CSRF-Token': 'Fetch'
		},

	};
	let taskInstance = `/bpmworkflowruntime/v1/xsrf-token`;
	pageProxy.sendMobileServiceRequest(taskInstance, params).then((response) => {
		let result = 'statusCode = ' + response.statusCode;
		if (response.content) {
			result = result + '\n' + response.content.toString();
		}
		console.log(result);
		dialogs.alert(result);
	}, (error) => {
		let errorMsg = 'error = ' + error.message;
		dialogs.alert(errorMsg)
	});
	return pageProxy.executeAction('/zProdCatalogs/Actions/ClosePage.action');
}