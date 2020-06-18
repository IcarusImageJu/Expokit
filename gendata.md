### GEOLOCATION
* field1: "geolocation"
* field2: country code
* field3: state / province code
* field4: city

###  BUTTONS
* field1: "button"
* field2: name
* field3: description
* field4: geolocation ids
* field5: active true/false
* field6: type
	* 0: parent
	* 1: field
	* 2: checklist
	* 3: document 
* field7: button data according to type [optional]
	* Type Parent: N/A
	* Type Field: JSON `{fields: [{"name": "", "text": ""},{"name": "", "text": ""}, ...]}`
	* Type Checklist: TO BE DEFINED
	* Type Document: mediaId of document
* field8: parent button id [optional]
* field9: global true/false
* field10: country
* field11: province
* field12: city
* field13: is parent
* field14: position
* field15: location id
* field16: original id

### CHECKLISTS
* field1: "checklist"
* field2: name
* field3: locationId
* field4: additional info (optional)
* field5: button id
* field6: is generic (true/false)
* field7: is active (true/false)
* field8: checklist questions JSON 
	* `{"questions": [
		{
			name:
			description: 
			responseType: 
			pictureOption: (true/false)
			NFCValidation: (true/false)
			NFCTag: NFC tag id
		},
		{...}
		]}`
	* response types:
		* text: field
		* confirm: checkbox
		* yes-no: radio
* field9: reminder recurrence (daily, weekly, monthly, yearly)
* field10: reminder recurrence value
	* if yearly: day of year ([01-12]-[01-31]) + time (PSQL format = `MM-DD HH:MI AM`)
	* if monthly: day of month ([1-31]) + time (PSQL format = `DD HH:MI AM`)
	* if weekly: day of week ([1-7]) + time (PSQL format = `ID HH:MI AM`)
	* if daily: time (PSQL format = `HH:MI AM`)
* field11: reminder recurrence (if deficiencies) (daily, weekly, monthly, yearly)
* field12: reminder recurrence value (if deficiencies)
	* if yearly: day of year ([01-12]-[01-31]) + time (PSQL format = `MM-DD HH:MI AM`)
	* if monthly: day of month ([1-31]) + time (PSQL format = `DD HH:MI AM`)
	* if weekly: day of week ([1-7]) + time (PSQL format = `ID HH:MI AM`)
	* if daily: time (PSQL format = `HH:MI AM`)
* field13: reminder emails JSON `{contacts:[{name:"", email:""}, {...}, ...]}`

**NB**: field10 and 12 follow the [PSQL Timestamp conversion format](https://www.postgresqltutorial.com/postgresql-date-functions/postgresql-to_timestamp/):

* `MM` is a 1-based month
* `DD` is a character day of the month
* `D` is the day of the week where 1 is Monday and 7 is Sunday
* `HH` is the time based with 12 hours
* `MI` is the minutes
* `AM` is the meridiem indicator

### NFC TAG
* field1: "nfc"
* field2: name
* field3: code
* field4: location id
* field5: checklist id
* field6: question number
* field7: active
* field8: owner person id
* field9: is assigned
  
### LOCATION
* field1: "location"
* field2: name
* field3: info JSON 
	* information: [
		{
			title: select from list
			description: 
		},
		{...}
	* ]
* field4: street number
* field5: street name
* field6: city,
* field7: province,
* field8: zip
* field9: country
* field10: comma-separated list of user ids (creator id always first)
* field11: contact JSON
	* contacts: [
		{
			firstName:
			lastName:
			company:
			role:
				0: TO BE DEFINED
				...
			phone:
			email:
		}
	* ]
* field12: activated
* field13: completed
* field14: building overview info JSON
	* overview: [
		{
			title:
			description
		},
		...
	]
* field15: site plans JSON
	* sitePlan: [
		{
			title:
			mediaId:
			filename:
		}, 
		...
	]
* field16: documents
* field17: QR code JSON
	* `{title: STRING, line1: STRING, line2: STRING, line3: STRING}`
* field18; Emergency access JSON
	* `{
		permission: BOOL,
		fullAccess: BOOL,
		specificAccess: [
			ButtonID
		]
	}`
	

### Responses
* field1: "response"
* field2: checklist id
* field3: checklist json with responses
	* `{"questions": [
		{
			name:
			description: 
			responseType: 
			response:
			pictureOption: (true/false)
			picture:
			NFCValidation: (true/false)
			NFCTag: NFC tag id
			NFCValidated:
			deficiency:
		},
		{...}
		]}`
* field4: has deficiencies
* field5: location id
* dateField1: completed time

### Notifications
* field1: "notification"
* field2: location id
* field3: type
	* 0: response
	* 1: reminder
* field4: seen (true / false)
* field5: has deficiencies (for response type only)
* datefield1: date dispatched