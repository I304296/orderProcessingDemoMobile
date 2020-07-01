export default function StoreUserInfo(context) {
	let appSettings = context.nativescript.appSettingsModule;
	let appId = context.evaluateTargetPath('#Application/#ClientData/#Property:MobileServiceAppId');
	if (appSettings.hasKey(`${appId}-UserName`)) {
		// If we have already stored the current user info don't fetch it again
		return Promise.resolve();
	}

	let userInfoUrl = `/mobileservices/application/${appId}/roleservice/application/${appId}/v2/Me`;
	let params = {
		'method': 'GET'
	};
	//console.log(userInfoUrl);
	return context.sendMobileServiceRequest(userInfoUrl, params).then(r => {
			if (r && r.statusCode === 200 && r.content) {
				const userInfo = JSON.parse(r.content.toString());
				appSettings.setString(`${appId}-UserId`, userInfo.id);
				appSettings.setString(`${appId}-UserName`, userInfo.userName);
				appSettings.setString(`${appId}-UserGivenName`, userInfo.name.givenName);
				appSettings.setString(`${appId}-UserFamilyName`, userInfo.name.familyName);
				appSettings.setString(`${appId}-UserEmail`, userInfo.emails[0].value);
				appSettings.setString(`${appId}-UserFullName`, `${userInfo.name.givenName} ${userInfo.name.familyName}`);
				console.log('Stored User Info');
				return Promise.resolve();
			}
		},
		(error) => {
			console.log(error.toString());
		});
}