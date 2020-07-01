export default function ConfirmTask(context) {
	debugger;
	let dialogs = context.nativescript.uiDialogsModule;

	let pageProxy = context.getPageProxy();
	let task = pageProxy.binding;

	let approveBody = {
		'status': 'COMPLETED',
		'decision': 'confirm',
		'context': task.context
	};

	let params = {
		'method': 'PATCH',
		'header': {
			'Accept': 'application/json',
			'content-type': 'application/json'
		},
		'body': JSON.stringify(approveBody)
	};
	let taskInstance = `/workflowTest/rest/v1/task-instances/${task.InstanceID}`;
	pageProxy.sendMobileServiceRequest(taskInstance, params).then((response) => {
		let result = 'statusCode = ' + response.statusCode;
		if (response.content) {
			result = result + '\n' + response.content.toString();
		}
		console.log(result);
		//dialogs.alert(result);
	}, (error) => {
		let errorMsg = 'error = ' + error.message;
		dialogs.alert(errorMsg)
	});
	return pageProxy.executeAction('/Workflow/Actions/ClosePage.action');
}