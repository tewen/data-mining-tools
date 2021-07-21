# Module: "url"

### Functions

* cleanUrl
* domainAndSuffixFromUrl
* isLiveUrl
* isParkingPage
* isStaticErrorPage
* isSuccess

## Functions

###  cleanUrl

▸ **cleanUrl**(`url`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *string*

___

###  domainAndSuffixFromUrl

▸ **domainAndSuffixFromUrl**(`url`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *string*

___

###  isLiveUrl

▸ **isLiveUrl**(`url`: string, `__namedParameters`: object): *Promise‹boolean›*

**Parameters:**

▪ **url**: *string*

▪`Default value`  **__namedParameters**: *object*= {}

Name | Type | Default |
------ | ------ | ------ |
`parkingPageCheck` | boolean | true |
`timeout` | number | 10000 |

**Returns:** *Promise‹boolean›*

___

###  isParkingPage

▸ **isParkingPage**(`url`: string): *Promise‹boolean›*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹boolean›*

___

###  isStaticErrorPage

▸ **isStaticErrorPage**(`html`: string): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`html` | string |

**Returns:** *boolean*

___

### `Const` isSuccess

▸ **isSuccess**(`status`: number): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`status` | number |

**Returns:** *boolean*s
